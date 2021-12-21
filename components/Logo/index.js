import Image from 'next/image'
import logoSrc from './logo.svg'
import styles from './index.module.css'

const Logo = () => (
  <div className={styles.wrapper}>
    <Image
      src={logoSrc}
      alt="logo"  
    />
  </div>
)

export default Logo