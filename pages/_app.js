import AppLayout from '../components/AppLayout'
import { WalletProvider } from '../components/WalletProvider'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return (
    <WalletProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </WalletProvider>
  )
}

export default MyApp
