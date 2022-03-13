import Image from 'next/image'
import classes from 'classnames'
import FileInput from '../FileInput'
import iconSrc from './icon.svg'
import styles from './index.module.css'

const ImageUpload = ({ className, imageClassName, onUpload, image, isDisabled = false }) => (
  <FileInput
    className={classes(
      styles.container,
      className,
      { [styles.disabled]: isDisabled }
    )}
    onFileUpload={files => onUpload(files[0])}
    isDisabled={isDisabled}
    accept=".png, .jpg, .jpeg">

    {!!image &&
      <img
        src={URL.createObjectURL(image)}
        className={classes(styles.image, imageClassName)}
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