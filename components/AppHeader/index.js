import Logo from '../Logo'
import User from '../User'
import styles from './index.module.css'


const AppHeader = () => (
  <div className={styles['app-header']}>
    <Logo />
    <User />
  </div>
)

export default AppHeader