import Image from 'next/image'
import logoSrc from './logo.svg'
import styles from './index.module.css'

const Logo = ({ className }) => (
  <div className={`${styles.wrapper} ${className}`}>
    <Image
      src={logoSrc}
      alt="logo"  
    />
  </div>
)

export default Logo