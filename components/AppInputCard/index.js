import { useState } from 'react'
import { addJsonFile } from '../../clients/ipfs.js'
import Card from '../Card'
import AppDetails from './AppDetails'
import AppUpload from './AppUpload'
import AppScreens from './AppScreens'
import { useWallet } from '../WalletProvider'
import { useToast } from '../Toast'


const StepId = {
  DETAILS: 0,
  APK: 1,
  SCREENS: 2
}

const AppInputCard = ({ title, backPath, onSubmit }) => {

  const { contract } = useWallet()

  const toastIt = useToast()

  const [stepId, setStepId] = useState(StepId.DETAILS)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [logo, setLogo] = useState(null)
  const [logoCid, setLogoCid] = useState(null)
  const [version, setVersion] = useState('')
  const [apkCid, setApkCid] = useState(null)
  const [screenshotFiles, setScreenshotFiles] = useState({})
  const [screenshotCids, setScreenshotCids] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)


  const addAdditionalData = () => {
    return addJsonFile({
      logo: logoCid,
      description,
      version,
      screenshots: Object.values(screenshotCids)
    })
  }

  const submit = async () => {
    const { cid: additionalDataCid } = await addAdditionalData()
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

      {stepId === StepId.DETAILS &&
        <AppDetails
          name={name}
          logo={logo}
          description={description}
          setName={setName}
          setLogo={setLogo}
          setLogoCid={setLogoCid}
          setDescription={setDescription}
          onNext={() => setStepId(StepId.APK)}
        />
      }

      {stepId === StepId.APK &&
        <AppUpload
          version={version}
          setVersion={setVersion}
          apkCid={apkCid}
          setApkCid={setApkCid}
          onNext={() => setStepId(StepId.SCREENS)}
          onBack={() => setStepId(StepId.DETAILS)}
        />
      }

      {stepId === StepId.SCREENS &&
        <AppScreens
          screenshotFiles={screenshotFiles}
          setScreenshotFiles={setScreenshotFiles}
          screenshotCids={screenshotCids}
          setScreenshotCids={setScreenshotCids}
          onNext={trySubmit}
          onBack={() => setStepId(StepId.UPLOAD)}
          isProcessing={isProcessing}
        />
      }

    </Card>
  )
}

export default AppInputCard
