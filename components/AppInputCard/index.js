import { useState, useEffect } from 'react'
import { addFile, addJsonFile } from '../../clients/ipfs.js'
import { startUpload, pinToIpfs } from '../../clients/apk.js'
import Card from '../Card'
import Button from '../Button'
import TextInput from '../TextInput'
import ImageUpload from '../ImageUpload'
import TextArea from '../TextArea'
import styles from './index.module.css'
import { useWallet } from '../WalletProvider/index.js'
import Tooltip from '../Tooltip/index.js'
import FileDrop from '../FileDrop/index.js'
import GcsUpload from 'gcs-browser-upload'
import { useToast } from '../Toast'


const UPLOAD_PIN_DELTA = 90


const AppInputCard = ({ title, backPath, onSubmit }) => {

  const { contract } = useWallet()

  const toastIt = useToast()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [logo, setLogo] = useState(null)
  const [apk, setApk] = useState(null)
  const [apkCid, setApkCid] = useState(null)
  const [apkUploadPercentComplete, setApkUploadPercentComplete] = useState(0)

  const [isComplete, setIsComplete] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)


  const checkIsComplete = () => {
    return name && description && logo && apkCid
  }

  const updateIsComplete = () => {
    setIsComplete(checkIsComplete())
  }

  useEffect(() => {
    updateIsComplete()
  })

  const addAdditionalData = ({ logoCid }) => {
    return addJsonFile({
      logo: logoCid,
      description,

      //TODO:
      developer: 'ethereumphone.org',
      type: 'test-type',
      category: 'test-category',
      images: [
        //'QmRMgMHmekE8y57u4Hm1BwGhyocx9gXkH1hEHjHL5nJsyR'
      ],
      version: '0.0.1'
    })
  }

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

  const submit = async () => {
    const { cid: logoCid } = await addFile(logo)

    const { cid: additionalDataCid } = await addAdditionalData({ logoCid })

    const transaction = await contract.submitDApp(name, apkCid, additionalDataCid)
    await transaction.wait()
  }

  const trySubmit = async () => {
    if (isProcessing) {
      return
    }

    setIsProcessing(true)

    try {
      await submit()
      setIsProcessing(false)
      onSubmit()
    } catch (error) {
      toastIt({ message: 'Transaction failed. Please try again.' })
      setIsProcessing(false)
    }
  }

  return (
    <Card
      title={title}
      isBackEnabled={true}
      backPath={backPath}>

      <div className={styles.inputs}>

        <Tooltip
          content="Add App Icon">
          <ImageUpload
            onUpload={setLogo}
            image={logo}
          />
        </Tooltip>

        <TextInput
          label="Name"
          value={name}
          onValueChange={setName}
        />
        <TextArea
          label="Description"
          value={description}
          onValueChange={setDescription}
        />

        <FileDrop
          title="Upload your .apk file"
          className={styles.apk}
          fileTypes=".apk"
          file={apk}
          onDropped={onApkDropped}
          removeFile={resetApk}
          percentComplete={apkUploadPercentComplete}
        />
      </div>

      <div className={styles.buttons}>
        <Button
          className={styles.continue_button}
          label="Continue"
          isDisabled={!isComplete}
          isProcessing={isProcessing}
          onClick={trySubmit}
      />      
      </div>

    </Card>
  )
}

export default AppInputCard
