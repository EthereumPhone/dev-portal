import styles from './index.module.css'
import BackButton from '../BackButton'


const Card = ({ isBackEnabled = false, title, children }) => (
  <div className={styles.container}>
    
    <div className={styles.header}>
      {isBackEnabled &&
        <BackButton />
      }
      {title &&
        <span className={styles.title}>
          {title}
        </span>
      }
    </div>

    <div className={styles.children}>
      {children}
    </div>
  </div>
)

export default Card