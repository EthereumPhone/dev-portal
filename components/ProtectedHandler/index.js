import { useWallet } from '../WalletProvider'
import { useRouter } from 'next/router'


const ProtectedHandler = ({ children, pageProps }) => {
  const { isConnected } = useWallet()
  const router = useRouter()

  const redirectToConnectPage = () => {
    router.push({
      pathname: '/connect',
      query: {
        redirect: encodeURI(router.pathname)
      }
    })
  }

  if (process.browser && pageProps.isProtected && !isConnected) {
    redirectToConnectPage()
    return null
  }

  return children
}

export default ProtectedHandler
