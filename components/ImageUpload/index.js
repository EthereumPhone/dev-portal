import Image from 'next/image'
import FileInput from '../FileInput'
import iconSrc from './icon.svg'
import styles from './index.module.css'

const ImageUpload = ({ className, onUpload, image }) => (
  <FileInput
    className={`${styles.container} ${className}`}
    onFileUpload={files => onUpload(files[0])}
    accept=".png, .jpg, .jpeg">

    {!!image &&
      <img
        src={URL.createObjectURL(image)}
        className={styles.image}
        alt="uploaded image"
      />
    }

    {!image &&
      <Image 
        className={styles.placeholder}
        src={iconSrc} 
        alt="upload icon"
      />
    }

  </FileInput>
)

export default ImageUpload