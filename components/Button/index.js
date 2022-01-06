import classes from 'classnames'
import styles from './index.module.css'

export const ButtonType = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY'
}

const Styles = {
  [ButtonType.PRIMARY]: styles['primary-button'],
  [ButtonType.SECONDARY]: styles['secondary-button']
}

const Button = ({ label, onClick, className, type = ButtonType.PRIMARY, isDisabled = false, isProcessing = false }) => (
  <button
    className={classes(
      styles.base,
      Styles[type],
      className,
      { [styles.processing]: isProcessing }
    )}
    disabled={isDisabled}
    onClick={onClick}>

    {isProcessing &&
      <span>Working...</span>
    }

    {!isProcessing && label}
  </button>
)

export default Button
