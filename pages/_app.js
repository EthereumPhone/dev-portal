import AppLayout from '../components/AppLayout'
import { MetaMaskProvider } from '../components/MetaMaskProvider'
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'
import '../styles/globals.css'

function getLibrary(provider, connector) {
  return new ethers.providers.Web3Provider(provider)
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetaMaskProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </MetaMaskProvider>
    </Web3ReactProvider>
  )
}

export default MyApp
