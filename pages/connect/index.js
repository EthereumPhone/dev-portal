import Card from '../../components/Card'
import Button from '../../components/Button'
import Link from '../../components/Link'
import styles from './index.module.css'


const ConnectPage = () => (
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
      />
    </div>

  </Card>
)

export default ConnectPage