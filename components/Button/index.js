import styles from './index.module.css'

export const ButtonType = {
  PRIMARY: 'PRIMARY'
}

const Button = ({ label, onClick }) => (
  <button
    className={styles.container}
    onClick={onClick}>
    {label}
  </button>
)

export default Button