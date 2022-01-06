import React, { useState, useEffect, useMemo } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import appsContract from '../../contracts'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'


const providerOptions = {
  injected: {
    package: null
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
      pollingInterval: 12000
    }
  }
}

export const WalletContext = React.createContext(null)

export const WalletProvider = ({ children }) => {

  const [state, setState] =  useState({
    modal: null,
    provider: null,
    contract: null,
    isConnecting: false,
    isConnected: false,
    address: ''
  })


  const buildModal = () => {
    const modal = new Web3Modal({
      network: process.env.NEXT_PUBLIC_NETWORK_NAME,
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

    const modalProvider = await state.modal.connect()
    const provider = new ethers.providers.Web3Provider(modalProvider)
    const contract = new ethers.Contract(appsContract.address, appsContract.abi, provider.getSigner())
    const accounts = await provider.listAccounts()

    setState({
      ...state,
      provider,
      contract,
      isConnecting: false,
      isConnected: true,
      address: accounts[0]
    })
  }

  const disconnect = async () => {
    await state.modal.clearCachedProvider()
    await state.provider.close && state.provider.close()

    setState({
      ...state,
      provider: null,
      contract: null,
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
      provider: state.provider,
      contract: state.contract,
      connect,
      disconnect,
    }),
    [state]
  )

  return (
    <WalletContext.Provider value={values}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => {
  const context = React.useContext(WalletContext)

  if (context === undefined) {
    throw new Error('useWallet must be used with WalletProvider')
  }

  return context
}
