import { useState } from 'react'
import Card from '../../../components/Card'
import Button from '../../../components/Button'
import TextInput from '../../../components/TextInput'
import styles from './index.module.css'

const AppEditPage = () => {

  const [name, setName] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [apkUrl, setApkUrl] = useState('')
  

  return (
    <div className={styles.container}>
      <Card
        title="List new dApp"
        isBackEnabled={true}>
        
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
        </div>

        <div className={styles.buttons}>
          <Button
            label="Continue"
            onClick={() => {}}
          />
        </div>

      </Card>
    </div>
  )
}

export default AppEditPage