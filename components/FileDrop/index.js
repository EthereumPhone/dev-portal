import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import ProgressBar from '../ProgressBar'
import classes from 'classnames'
import uploadSrc from './upload.svg'
import deleteSrc from './delete.svg'
import fileSrc from './file.svg'
import styles from './index.module.css'


const DeleteIcon = ({ onClick }) => (
  <div
    className={styles.delete_icon_wrapper}
    onClick={onClick}>

    <Image
      src={deleteSrc}
      alt="delete icon"
      width="100%"
      height="100%"
    />
  </div>
)

const FileIcon = () => (
  <div className={styles.file_icon_wrapper}>
    <Image
      src={fileSrc}
      alt="file icon"
      width="100%"
      height="100%"
    />
  </div>
)

const Progress = ({ fileName, percentComplete, onDelete }) => (

  <div className={styles.progress}>
  
    <FileIcon />

    <div className={styles.progress_info}>
      <DeleteIcon
        onClick={onDelete}
      />
      <ProgressBar
        label={fileName}
        percentComplete={percentComplete}
      />
    </div>

  </div>
)

const DropzoneContent = ({ onDrop, fileTypes }) => {

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: fileTypes })

  return (
    <div 
      className={classes(
        styles.drop_zone,
        { [styles.drop_zone_active]: isDragActive }
      )}
      {...getRootProps()}>

      <input {...getInputProps()} />

      <div className={styles.upload_icon_wrapper}>
        <Image
          src={uploadSrc}
          alt="upload icon"
          width="100%"
          height="100%"
        />
      </div>

      <p className={styles.instruction}>
        Drag and drop or <span className={styles.instruction_browse}>browse</span> for your file
      </p>
    </div>
  )
}

const FileDrop = ({ title, className, file, onDropped, removeFile, fileTypes = '' }) => {

  const onDrop = useCallback(files => {
    onDropped(files[0])
  }, [])

  return (
    <div className={classes(styles.container, className)}>
      <span className={styles.title}>
        {title}
      </span>

      <DropzoneContent
        onDrop={onDrop}
        fileTypes={fileTypes}
      />

      {file &&
        <Progress
          fileName={file.name}
          percentComplete={100}
          onDelete={removeFile}
        />
      }
    </div>
  )
}

export default FileDrop