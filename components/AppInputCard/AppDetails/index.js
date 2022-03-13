import TextInput from '../../TextInput'
import ImageUpload from '../../ImageUpload'
import TextArea from '../../TextArea'
import Tooltip from '../../Tooltip'
import Button from '../../Button'
import { useToast } from '../../Toast'
import { addFile } from '../../../clients/ipfs.js'
import styles from './index.module.css'


const AppDetails = ({ logo, setLogo, setLogoCid, name, setName, description, setDescription, onNext }) => {

  const toastIt = useToast()

  const isComplete = logo && name && description

  const tryUploadLogo = async (file) => {
    try {
      uploadLogo(file)
    } catch (err) {
      toastIt({ message: 'Could not upload logo. Please try again.' })
    }
  }

  const uploadLogo = async (file) => {
    const { cid } = await addFile(file)
    setLogoCid(cid)
    setLogo(file)
  }

  return (
    <div className={styles.container} key="app-details">
      <Tooltip
        content="Add App Icon">
        <ImageUpload
          onUpload={tryUploadLogo}
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

      <div className={styles.buttons}>
        <Button
          className={styles.button}
          label="Next"
          isDisabled={!isComplete}
          onClick={onNext}
        />
      </div>
    </div>
  )
}

export default AppDetails
