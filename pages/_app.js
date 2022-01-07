import AppLayout from '../components/AppLayout'
import ProtectedHandler from '../components/ProtectedHandler'
import { WalletProvider } from '../components/WalletProvider'
import '../styles/globals.css'
import '../components/WalletProvider/style.css'


function MyApp({ Component, pageProps }) {
  return (
    <WalletProvider>
      <AppLayout>
        <ProtectedHandler pageProps={pageProps}>
          <Component {...pageProps} />
        </ProtectedHandler>
      </AppLayout>
    </WalletProvider>
  )
}

export default MyApp
