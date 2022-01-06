import { useRef } from 'react'
import styles from './index.module.css'


const FileInput = ({ children, onUpload, onFileUpload, accept, className }) => {

  const fileInput = useRef(null)

  const onChange = (event) => {
    onUpload && onUpload(event)
    onFileUpload && onFileUpload(event.target.files)
  }

  const onClick = () => {
    fileInput.current.click()
  }

  return (
    <div
      className={`${styles.container} ${className}`}
      onClick={onClick}>

      {children}

      <input
        className={styles.input}
        onChange={onChange}
        accept={accept}
        ref={fileInput}
        type="file"
      />
    </div>
  )
}

export default FileInput
