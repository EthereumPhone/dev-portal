import Logo from '../Logo'
import styles from './index.module.css'

const AppHeader = () => (
  <div className={styles['app-header']}>
    <Logo />
  </div>
)

export default AppHeader