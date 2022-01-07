import styles from './index.module.css'

const Loader = ({ label = 'Loading...' }) => (
  <div className={styles.container}>
    <div className={styles.circle}>
    </div>
    <span className={styles.label}>
      {label}
    </span>
  </div>
)

export default Loader
