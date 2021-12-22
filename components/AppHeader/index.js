import Logo from '../Logo'
import styles from './index.module.css'

const AppHeader = () => (
  <div className={styles.container}>
    <Logo
      className={styles.logo}
    />
  </div>
)

export default AppHeader