import { useState, useEffect } from 'react'
import { addFile, addJsonFile } from '../../clients/ipfs.js'
import Card from '../Card'
import Button from '../Button'
import TextInput from '../TextInput'
import ImageUpload from '../ImageUpload'
import TextArea from '../TextArea'
import styles from './index.module.css'
import { useWallet } from '../WalletProvider/index.js'
import Tooltip from '../Tooltip/index.js'
//import FileDrop from '../FileDrop/index.js'


const AppInputCard = ({ title, backPath, onSubmit }) => {

  const { contract } = useWallet()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [logo, setLogo] = useState(null)
  //const [apk, setApk] = useState(null)
  const [apkCid, setApkCid] = useState('')

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

  const submit = async () => {
    const { cid: logoCid } = await addFile(logo)
    //const { cid: apkCid } = await addFile(apk)
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
      //TODO: error handling
      setIsProcessing(false)
      alert('Error: ', error.message)
      console.log(error)
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
        <TextInput
          label="APK IPFS CID"
          value={apkCid}
          onValueChange={setApkCid}
        />
        <TextArea
          label="Description"
          value={description}
          onValueChange={setDescription}
        />

        {/*
        <FileDrop
          title="Upload your .apk file"
          className={styles.apk}
          fileTypes=".apk"
          file={apk}
          onDropped={file => setApk(file)}
          removeFile={() => setApk(null)}
        />
        */}
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
