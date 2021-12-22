import styles from './index.module.css'

export const ButtonType = {
  PRIMARY: 'PRIMARY'
}

const Button = ({ label, onClick, className }) => (
  <button
    className={`${styles.container} ${className}`}
    onClick={onClick}>
    {label}
  </button>
)

export default Button