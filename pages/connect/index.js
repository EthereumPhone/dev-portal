import Card from '../../components/Card'
import Button from '../../components/Button'
import Link from '../../components/Link'
import { useWallet } from '../../components/WalletProvider'
import { useRouter } from 'next/router'
import styles from './index.module.css'


const ConnectPage = () => {

  const { connect, isConnected } = useWallet()
  const router = useRouter()

  if (isConnected) {
    router.push('/app/list')
  }

  return (
    <Card
      title="Developer Portal"
      description="Connect your wallet to list or manage your dApp.">

      <div className={styles.body}>

        <Link
          label="Learn about ethOS2"
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
