import React, { useState, useEffect, useMemo, useCallback } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'


export const WalletContext = React.createContext(null)


export const WalletProvider = ({ children }) => {

  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState('')


  const connect = async () => {

    const providerOptions = {
      injected: {
        package: null
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "https://rinkeby.infura.io/v3/31d8b02dda03471aa9453fd2cda79402"
        }
      }
    };

    const web3Modal = new Web3Modal({
      network: "rinkeby",
      providerOptions
    });

    const provider = await web3Modal.connect()
    //setProvider(provider)
  }

  const disconnect = async () => {
    try {
      await deactivate()
    } catch (error) {
      console.log('Error on disconnect: ', error)
    }
  }

  const values = useMemo(
    () => ({
      isConnecting,
      connect,

      disconnect,
      isConnected,
      account
    }),
    [isConnecting, isConnected, account]
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
