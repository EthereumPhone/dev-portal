import Button, { ButtonType } from '../../Button'
import ImageUpload from '../../ImageUpload'
import styles from './index.module.css'


const AppScreens = ({ screenshotFiles, setScreenshotFiles, onBack, onNext }) => {

  const screenshotFilesCount = Object.keys(screenshotFiles).length

  const isComplete = screenshotFilesCount > 0

  const addScreenshot = ({ key, file }) => {
    const updatedScreenshots = { ...screenshotFiles, [key]: file }
    setScreenshotFiles(updatedScreenshots)
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
          onUpload={file => addScreenshot({ key: 0, file })}
          image={screenshotFiles[0]}
        />
        <ImageUpload
          className={styles.upload}
          imageClassName={styles.screenshot}
          onUpload={file => addScreenshot({ key: 1, file })}
          image={screenshotFiles[1]}
          isDisabled={screenshotFilesCount < 1}
        />
        <ImageUpload
          className={styles.upload}
          imageClassName={styles.screenshot}
          onUpload={file => addScreenshot({ key: 2, file })}
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
