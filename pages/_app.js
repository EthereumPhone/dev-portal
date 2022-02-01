import AppLayout from '../components/AppLayout'
import ProtectedHandler from '../components/ProtectedHandler'
import { WalletProvider } from '../components/WalletProvider'
import { ToastContextProvider } from '../components/Toast'
import '../styles/globals.css'
import '../components/WalletProvider/style.css'
import 'regenerator-runtime/runtime.js'


function MyApp({ Component, pageProps }) {
  return (
    <ToastContextProvider>
      <WalletProvider>
        <AppLayout>
          <ProtectedHandler pageProps={pageProps}>
            <Component {...pageProps} />
          </ProtectedHandler>
        </AppLayout>
      </WalletProvider>
    </ToastContextProvider>
  )
}

export default MyApp
