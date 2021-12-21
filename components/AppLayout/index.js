import AppHeader from '../AppHeader'
import styles from './index.module.css'

const AppLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <AppHeader />
      <main className={styles.body}>
        {children}
      </main>
    </div>
  )
}

export default AppLayout