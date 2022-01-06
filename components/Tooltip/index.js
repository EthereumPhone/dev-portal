import { useState } from 'react'
import styles from './index.module.css'


const Tooltip = ({ delayInMs = 100, children, content }) => {

  let timeout

  const [isActive, setIsActive] = useState(false)

  const show = () => {
    timeout = setTimeout(() => {
      setIsActive(true)
    }, delayInMs)
  }

  const hide = () => {
    clearInterval(timeout)
    setIsActive(false)
  }

  return (
    <div
      className={styles.container}
      onMouseEnter={show}
      onMouseLeave={hide}>

      {children}

      {isActive && (
        <div className={styles.content}>
          {content}
        </div>
      )}
    </div>
  )
}

export default Tooltip
