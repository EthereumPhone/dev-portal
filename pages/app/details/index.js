import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { fetchApp } from '../../../clients/app'
import Card from '../../../components/Card'
import Loader from '../../../components/Loader'
import Button, { ButtonType } from '../../../components/Button'
import styles from './index.module.css'


const Details = ({ name, logoUrl, category, description }) => (
  <div className={styles.details_wrapper}>

    <div className={styles.details_body}>
      <div className={styles.hero}>
        <img
          className={styles.logo}
          src={logoUrl}
        />
        <div className={styles.details}>
          <p className={styles.title}>
            {name}
          </p>
          <p className={styles.category}>
            {category || 'N/A'}
          </p>
        </div>
      </div>

      <div className={styles.description}>
        <span className={styles.label}>
          Description
        </span>
        <p className={styles.description_text}>
          {description || 'N/A'}  
        </p>
      </div>
    </div>

    <div className={styles.buttons}>
      <Button
        type={ButtonType.SECONDARY}
        label="Edit Listing"
      />
    </div>
  </div>
)

const AppDetails = () => {

  const router = useRouter()

  const [app, setApp] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  if (process.browser && !router.query.id) {
    router.push('/app/list')
    return null
  }
  
  const loadApp = async () => {
    setIsLoading(true)

    const app = await fetchApp({ id: router.query.id })
    setApp(app)

    setIsLoading(false)
  }

  useEffect(() => {
    loadApp()
  }, [])


  return (
    <div className={styles.container}>
      <Card
        title="App Listing"
        isBackEnabled={true}
        backPath="/app/list"
        className={styles.card}
        childrenClassName={styles.card_inner}>

        {isLoading &&
          <Loader
            className={styles.loader}
          />
        }

        {!!app && 
          <Details
            name={app.appName}
            logoUrl={app.logoUrl}
            category={app.category}
            description={app.description}
          />
        }

      </Card>
    </div>
  )
}

export const getStaticProps = async () => ({
  props: {
    isProtected: true
  }
})

export default AppDetails
