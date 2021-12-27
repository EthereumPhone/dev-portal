import { useState } from 'react'
import Card from '../../../components/Card'
import Button from '../../../components/Button'
import TextInput from '../../../components/TextInput'
import TextView from '../../../components/TextView'
import Link from 'next/link'

import styles from './index.module.css'

const AppEditPage = () => {

  const [name, setName] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [apkUrl, setApkUrl] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')


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
          <TextInput
            label="Category"
            value={category}
            onValueChange={setCategory}
          />
          <TextView
            label="Description"
            value={description}
            onValueChange={setDescription}
          />
        </div>

        <Link href="../app/listing">
          <div className={styles.buttons}>
            <Button
              label="Continue"
              onClick={() => { }}
            />
          </div>
        </Link>


      </Card>
    </div>
  )
}

export default AppEditPage