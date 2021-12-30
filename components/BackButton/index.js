import Image from 'next/image'
import styles from './index.module.css'
import arrowSrc from './arrow.svg'

const BackButton = ({ className, onClick }) => (
  <Image
    className={`${styles.container} ${className}`}
    src={arrowSrc}
    alt="back"
    onClick={onClick}
  />
)

export default BackButton