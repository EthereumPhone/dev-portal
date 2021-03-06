import { useEffect } from 'react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Link from '../../components/Link'
import { useWallet } from '../../components/WalletProvider'
import { useRouter } from 'next/router'
import styles from './index.module.css'

const DEFAULT_REDIRECT_PATH = '/app/list'

const WHITELISTED_REDIRECT_PATHS = [
  '/app/list',
  '/app/new',
  '/app/details'
]

const isWhitelisted = (path) => (
  WHITELISTED_REDIRECT_PATHS.includes(path)
)

const ConnectPage = () => {
  const { connect, isConnected } = useWallet()
  const router = useRouter()

  const resolveRedirectPath = () => {
    const redirectPath = decodeURI(router.query.redirect) || DEFAULT_REDIRECT_PATH
    const normalizedRedirectPath = redirectPath.split('?')[0]

    return isWhitelisted(normalizedRedirectPath)
      ? redirectPath
      : DEFAULT_REDIRECT_PATH
  }

  const tryRedirectToDestination = () => {
    if (isConnected) {
      const path = resolveRedirectPath()
      router.push(path)
    }
  }

  useEffect(() => {
    tryRedirectToDestination()
  }, [isConnected])

  return (
    <Card
      title="Developer Portal"
      description="Connect your wallet to list or manage your dApp.">

      <div className={styles.body}>

        <Link
          label="Learn about ethOS"
          href="https://ethereumphone.org"
          target="_blank"
        />

        <Button
          label="Connect Wallet"
          onClick={connect}
        />
      </div>

    </Card>
  )
}

export default ConnectPage
