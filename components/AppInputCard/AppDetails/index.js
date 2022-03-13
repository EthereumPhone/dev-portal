import TextInput from '../../TextInput'
import ImageUpload from '../../ImageUpload'
import TextArea from '../../TextArea'
import Tooltip from '../../Tooltip/index.js'
import Button from '../../Button'
import styles from './index.module.css'


const AppDetails = ({ logo, setLogo, name, setName, description, setDescription, onNext }) => {

  const isComplete = logo && name && description

  return (
    <div className={styles.container} key="app-details">
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
