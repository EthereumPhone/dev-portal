import Button, { ButtonType } from '../../Button'
import ImageUpload from '../../ImageUpload'
import { useToast } from '../../Toast'
import { addFile } from '../../../clients/ipfs.js'
import styles from './index.module.css'


const AppScreens = ({ screenshotFiles, setScreenshotFiles, screenshotCids, setScreenshotCids, onBack, onNext }) => {

  const toastIt = useToast()

  const screenshotFilesCount = Object.keys(screenshotFiles).length
  const isComplete = screenshotFilesCount > 0

  const tryAddScreenshot = ({ key, file }) => {
    try {
      addScreenshot({ key, file })
    } catch (err) {
      toastIt({ message: 'Could not upload screenshot. Please try again.' })
    }
  }

  const addScreenshot = ({ key, file }) => {
    const { cid } = await addFile(file)
    updateScreenshotFiles({ key, file })
    updateScreenshotCids({ key, cid })
  }

  const updateScreenshotFiles = ({ key, file }) => {
    const updatedFiles = { ...screenshotFiles, [key]: file }
    setScreenshotFiles(updatedFiles)
  }

  const updateScreenshotCids = ({ key, cid }) => {
    const updatedCids = { ...screenshotCids, [key]: cid }
    setScreenshotCids(updatedCids)
  }

  return (
    <div className={styles.container}>
      
      <span className={styles.title}>
        Upload your screenshots
      </span>

      <div className={styles.uploads}>
        <ImageUpload
          className={styles.upload}
          imageClassName={styles.screenshot}
          onUpload={file => tryAddScreenshot({ key: 0, file })}
          image={screenshotFiles[0]}
        />
        <ImageUpload
          className={styles.upload}
          imageClassName={styles.screenshot}
          onUpload={file => tryAddScreenshot({ key: 1, file })}
          image={screenshotFiles[1]}
          isDisabled={screenshotFilesCount < 1}
        />
        <ImageUpload
          className={styles.upload}
          imageClassName={styles.screenshot}
          onUpload={file => tryAddScreenshot({ key: 2, file })}
          image={screenshotFiles[2]}
          isDisabled={screenshotFilesCount < 2}
        />
      </div>

      <div className={styles.buttons}>
        <Button
          className={styles.button}
          label="Back"
          onClick={onBack}
          type={ButtonType.SECONDARY}
        />
        <Button
          className={styles.button}
          label="Submit"
          isDisabled={!isComplete}
          onClick={onNext}
          type={ButtonType.PRIMARY}
        />
      </div>

    </div>
  )
}

export default AppScreens
