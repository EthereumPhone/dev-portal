import { useEffect } from 'react'
import { useWallet } from '../WalletProvider'
import { useRouter } from 'next/router'


const ConnectedPage = ({ children }) => {
  
  const { isConnected } = useWallet()
  const router = useRouter()

  const tryRedirectToConnectPage = () => {
    if (!isConnected) {
      router.push({
        pathname: '/connect',
        query: {
          redirect: encodeURI(router.pathname)
        }
      })
    }
  }

  useEffect(() => {
    tryRedirectToConnectPage()
  }, [isConnected])
  
  return isConnected ? children : null
}

export default ConnectedPage
