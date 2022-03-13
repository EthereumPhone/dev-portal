import { useState } from 'react'
import { startUpload, pinToIpfs } from '../../../clients/apk.js'
import { useToast } from '../../Toast'
import Button, { ButtonType } from '../../Button'
import TextInput from '../../TextInput'
import FileDrop from '../../FileDrop/index.js'
import GcsUpload from 'gcs-browser-upload'
import styles from './index.module.css'

const UPLOAD_PIN_DELTA = 90


const AppUpload = ({ version, setVersion, apkCid, setApkCid, onNext, onBack }) => {

  const toastIt = useToast()

  const [apk, setApk] = useState(null)
  const [apkUploadPercentComplete, setApkUploadPercentComplete] = useState(0)

  const isComplete = version && apkCid

  const resetApk = () => {
    setApk(null)
    setApkCid(null)
  }

  const onFileUploaded = async ({ fileName, uploadId }) => {
    try {
      const { cid } = await pinToIpfs({
        uploadId: uploadId,
        apkName: fileName
      })
      setApkUploadPercentComplete(100)
      setApkCid(cid)

    } catch (error) {
      toastIt({ message: 'APK upload failed. Please try uploading again.' })
      resetApk()
    }
  }

  const onChunkUpload = ({ uploadedBytes, totalBytes }) => {
    let percentComplete = Math.round(uploadedBytes / totalBytes * 100)

    if (percentComplete > UPLOAD_PIN_DELTA) {
      percentComplete = UPLOAD_PIN_DELTA
    }

    setApkUploadPercentComplete(percentComplete)
  }

  const onApkDropped = async (file) => {
    
    setApk(file)
    setApkCid(null)
    
    const uploadConfig = await startUpload()

    var upload = new GcsUpload({
      id: uploadConfig.uploadId,
      url: uploadConfig.url,
      file,
      chunkSize: 262144 * 20,
      contentType: 'application/vnd.android.package-archive',
      onChunkUpload
    })

    try {
      await upload.start()
      onFileUploaded({
        fileName: file.name,
        uploadId: uploadConfig.uploadId
      })

    } catch (error) {
      resetApk()
      toastIt({ message: 'APK upload failed. Please try uploading again.' })
    }
  }

  return (
    <div className={styles.container} key="app-upload">
      <FileDrop
        title="Upload your .apk file"
        className={styles.apk}
        fileTypes=".apk"
        file={apk}
        onDropped={onApkDropped}
        removeFile={resetApk}
        percentComplete={apkUploadPercentComplete}
      />

      <TextInput
        label="Version"
        className={styles.version}
        value={version}
        onValueChange={setVersion}
      />

      <div className={styles.buttons}>
        <Button
          className={styles.button}
          label="Back"
          onClick={onBack}
          type={ButtonType.SECONDARY}
        />
        <Button
          className={styles.button}
          label="Next"
          isDisabled={!isComplete}
          onClick={onNext}
          type={ButtonType.PRIMARY}
        />
      </div>

    </div>
  )
}

export default AppUpload
