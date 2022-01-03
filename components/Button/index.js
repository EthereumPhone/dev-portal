import styles from './index.module.css'

export const ButtonType = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',

}

const ButtonStyle = {
  [ButtonType.PRIMARY]: styles.primary,
  [ButtonType.SECONDARY]: styles.secondary
}
const Button = ({ type = ButtonType.PRIMARY, label, onClick, className }) => (
  <button
    className={`${styles.container} ${ButtonStyle[type]} ${className}`}>
      Continue
  </button>
)

export default Button