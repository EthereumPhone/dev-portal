import classes from 'classnames'
import styles from './index.module.css'


const TextInput = ({ label, value = '', onChange, onValueChange, className }) => {

  const handleOnChange = (event) => {
    if (!!onChange) onChange(event)
    if (!!onValueChange) onValueChange(event.target.value)
  }

  return (
    <div className={classes(styles.container, className)}>
      <span className={styles.label}>
        {label}
      </span>
      <input
        className={styles.input}
        value={value}
        onChange={handleOnChange}
      />
    </div>
  )
}

export default TextInput