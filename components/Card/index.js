import styles from './index.module.css'
import BackButton from '../BackButton'


const Card = ({ isBackEnabled = false, title, description, children }) => (
  <div className={styles.container}>
    
    <div className={styles.header}>

      {isBackEnabled &&
        <BackButton className={styles.back} />
      }

      <div className={styles.info}>
        {title &&
          <span className={styles.title}>
            {title}
          </span>
        }
        {description &&
          <span className={styles.description}>
            {description}
          </span>
        }
      </div>
    </div>

    <div className={styles.children}>
      {children}
    </div>
  </div>
)

export default Card