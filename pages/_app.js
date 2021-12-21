import AppLayout from '../components/AppLayout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default MyApp
