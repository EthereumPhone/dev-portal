import React, { useState, useEffect, useMemo } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'


const providerOptions = {
  injected: {
    package: null
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "31d8b02dda03471aa9453fd2cda79402",
      pollingInterval: 12000
    }
  }
}

export const WalletContext = React.createContext(null)

export const WalletProvider = ({ children }) => {

  const [state, setState] =  useState({
    modal: null,
    provider: null,
    isConnecting: false,
    isConnected: false,
    address: ''
  })


  const buildModal = () => {
    const modal = new Web3Modal({
      network: 'rinkeby',
      cacheProvider: true,
      providerOptions
    })
    setState({ ...state, modal })
  }

  useEffect(buildModal, [])


  const subscribeToEvents = () => {
    state.provider.on('accountsChanged', async (accounts) => {
      setState({ ...state, account: accounts[0] })
    })
  }

  const trySubscribeToEvents = () => {
    if (state.provider) {
      subscribeToEvents()
    }
  }

  useEffect(() => {
    trySubscribeToEvents()
  }, [state.provider])

  const connect = async () => {

    setState({ ...state, isConnecting: true })

    const provider = await state.modal.connect()

    setState({
      ...state,
      provider,
      isConnecting: false,
      isConnected: true,
      address: provider.selectedAddress || provider.accounts[0]
    })
  }

  const disconnect = async () => {
    await state.modal.clearCachedProvider()
    await state.provider.close && state.provider.close()

    setState({
      ...state,
      provider: null,
      isConnecting: false,
      isConnected: false,
      address: ''
    })
  }

  const values = useMemo(
    () => ({
      isConnecting: state.isConnecting,
      isConnected: state.isConnected,
      address: state.address,
      connect,
      disconnect
    }),
    [state]
  )

  return (
    <WalletContext.Provider value={values}>
      {children}
    </WalletContext.Provider>
  )
}

export default function useWallet() {
  const context = React.useContext(WalletContext)

  if (context === undefined) {
    throw new Error('useWallet must be used with WalletProvider')
  }

  return context
}
