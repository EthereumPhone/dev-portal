import styles from './index.module.css'

export const ButtonType = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY'
}

const Styles = {
  [ButtonType.PRIMARY]: styles['primary-button'],
  [ButtonType.SECONDARY]: styles['secondary-button']
}

const Button = ({ label, onClick, className, type = ButtonType.PRIMARY }) => (
  <button
    className={`${styles.base} ${Styles[type]} ${className}`}
    onClick={onClick}>
    {label}
  </button>
)

export default Button
