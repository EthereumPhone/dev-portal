import { useState } from 'react'
import Card from '../../../components/Card'
import Button from '../../../components/Button'
import TextInput from '../../../components/TextInput'
import TextArea from '../../../components/TextArea'
import styles from './index.module.css'
import ConnectedPage from '../../../components/ConnectedPage'

const AppEditPage = () => {

  const [name, setName] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [apkUrl, setApkUrl] = useState('')
  const [description, setDescription] = useState('')


  return (
    <ConnectedPage>
      <Card
        title="List new dApp"
        isBackEnabled={true}
        backPath="/app/list">

        <div className={styles.inputs}>
          <TextInput
            label="Name"
            value={name}
            onValueChange={setName}
          />
          <TextInput
            label="Logo IPFS URL"
            value={logoUrl}
            onValueChange={setLogoUrl}
          />
          <TextInput
            label="APK IPFS URL"
            value={apkUrl}
            onValueChange={setApkUrl}
          />
          <TextArea
            label="Description"
            value={description}
            onValueChange={setDescription}
          />
        </div>

        <div className={styles.buttons}>
          <Button
            className={styles['continue-button']}
            label="Continue"
            onClick={() => { }}
          />
        </div>

      </Card>
    </ConnectedPage>
  )
}

export default AppEditPage