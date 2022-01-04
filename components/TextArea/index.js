import { useRef } from 'react'
import styles from './index.module.css'


const TextArea = ({ label, value = '', onChange, onValueChange }) => {

  const inputRef = useRef(null)

  const focusOnInput = () => {
    inputRef.current && inputRef.current.focus()
  }

  const handleOnChange = (event) => {
    if (!!onChange) onChange(event)
    if (!!onValueChange) onValueChange(event.target.value)
  }

  return (
    <div 
      className={styles.container}
      onClick={focusOnInput}>

      <span className={styles.label}>
        {label}
      </span>
      <textarea
        ref={inputRef}
        className={styles.textarea}
        value={value}
        onChange={handleOnChange}>
      </textarea>

    </div>
  )
}

export default TextArea
