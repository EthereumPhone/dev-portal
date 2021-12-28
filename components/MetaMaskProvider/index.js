import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

const ChainIds = {
  ETHEREUM_MAINNET: 1,
  ETHEREUM_RINKEBY: 4
}

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [ChainIds.ETHEREUM_MAINNET, ChainIds.ETHEREUM_RINKEBY]
})

export const MetaMaskContext = React.createContext(null)


export const MetaMaskProvider = ({ children }) => {

  const { active, account, activate, deactivate } = useWeb3React()

  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    connect().then(() => setIsLoading(false))
  }, [])

  const handleIsConnected = useCallback(() => {
    setIsConnected(active)
  }, [active])

  useEffect(() => {
    handleIsConnected()
  }, [handleIsConnected])

  const connect = async () => {
    setIsConnecting(true)

    try {
      await activate(injectedConnector)
      setIsConnecting(false)
    } catch (error) {
      setIsConnecting(false)
    }
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
      isLoading,
      connect,
      isConnected,
      disconnect,
      isConnecting,
      account
    }),
    [isLoading, isConnecting, isConnected, account]
  )

  return (
    <MetaMaskContext.Provider value={values}>
      {children}
    </MetaMaskContext.Provider>
  )
}

export default function useMetaMask() {
  const context = React.useContext(MetaMaskContext)

  if (context === undefined) {
    throw new Error('useMetaMask must be used with MetaMaskProvider')
  }

  return context
}
