import Logo from '../Logo'
import ConnectButton from '../ConnectButton'
import styles from './index.module.css'


const AppHeader = () => (
  <div className={styles.container}>
    <Logo
      className={styles.logo}
    />
    <ConnectButton />
  </div>
)

export default AppHeader