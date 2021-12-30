import Image from 'next/image'
import { withRouter } from 'next/router'
import styles from './index.module.css'
import arrowSrc from './arrow.svg'

const BackButton = ({ router, className }) => (
  <Image
    className={`${styles.container} ${className}`}
    src={arrowSrc}
    alt="back"
    onClick={router.back}
  />
)

export default withRouter(BackButton)