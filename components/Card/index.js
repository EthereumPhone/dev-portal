import BackButton from '../BackButton'
import { useRouter } from 'next/router'
import styles from './index.module.css'


const Card = ({ isBackEnabled = false, backPath, title, description, children, className, headerClassName }) => {
  const router = useRouter()

  const tryRedirectToPath = () => {
    backPath && router.push(backPath)
  }

  return (
    <div className={`${styles.container} ${className}`}>
      
      <div className={`${styles.header} ${headerClassName}`}>

        {isBackEnabled &&
          <BackButton
            className={styles.back}
            onClick={tryRedirectToPath}
          />
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
}

export default Card