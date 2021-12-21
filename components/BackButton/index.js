import Image from 'next/image'
import { withRouter } from 'next/router'
import styles from './index.module.css'
import arrowSrc from './arrow.svg'

const BackButton = ({ router }) => (
  <Image
    className={styles.container}
    src={arrowSrc}
    alt="back"
    onClick={router.back}
  />
)

export default withRouter(BackButton)