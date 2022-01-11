import classes from 'classnames'
import styles from './index.module.css'

const Loader = ({ label = 'Loading...', className }) => (
  <div className={classes(styles.container, className)}>
    <div className={styles.circle}>
    </div>
    <span className={styles.label}>
      {label}
    </span>
  </div>
)

export default Loader
