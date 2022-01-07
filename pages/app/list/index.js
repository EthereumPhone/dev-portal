import { useState, useEffect } from 'react'
import Card from '../../../components/Card'
import Button from '../../../components/Button'
import Loader from '../../../components/Loader'
import { useWallet } from '../../../components/WalletProvider'
import { fetchApps } from '../../../clients/app'
import Image from 'next/image'
import { withRouter } from 'next/router'
import emptyIcon from './empty.svg'
import appIconSrc from './app.svg'
import checkSrc from './check.svg'
import styles from './index.module.css'


const EmptyView = () => (
  <div className={styles.empty}>
    <Image src={emptyIcon} alt="empty" />
    <p className={styles.empty_text}>
      You haven’t listed any dApps yet.<br/>
      Click below to get started. 
    </p>
  </div>
)

const SubmitMessage = () => (
  <div className={styles.submit_message}>
    <div className={styles.submit_check_wrapper}>
      <Image
        src={checkSrc}
        alt="checked"
      />
    </div>
    <div className={styles.submit_message_text_wrapper}>
      <span
        className={styles.submit_message_title}>
          dApp Successfully Submitted
      </span>
      <span
        className={styles.submit_message_description}>
          Please allow a few moments for your dApp to appear here.
      </span>
    </div>
  </div>
)

const AppItem = ({ logoSrc = appIconSrc, name, category, description }) => (
  <div className={styles.app_item}>
    <img
      className={styles.app_item_logo}
      src={logoSrc}
    />
    <div className={styles.app_item_info}>
      <span className={styles.app_item_name}>
        {name}
      </span>
      <span className={styles.app_item_category}>
        {category}
      </span>
      <p className={styles.app_item_description}>
        {description}
      </p>
    </div>
  </div>
)

const ListView = ({ apps }) => (
  <div className={styles.list_view}>
    {apps.map((app, index) => (
      <AppItem
        key={`app-item-${index}`}
        logoSrc={app.logoUrl}
        name={app.appName}
        category={app.category || 'N/A'}
        description={app.description || 'N/A'}
      />
    ))}
  </div>
)

const LoaderView = () => (
  <div className={styles.loader_view}>
    <Loader label="Loading apps..." />
  </div>
)

const ListedApps = ({ router }) => {

  const { address } = useWallet()
  const [apps, setApps] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const isSubmitPending = router.query.pending === '1'

  const resolveApps = async () => {
    setIsLoading(true)

    const apps = await fetchApps({ ownerAddress: address })
    //TODO: Error & Try again

    setApps(apps)
    setIsLoading(false)
  }

  useEffect(async () => {
    resolveApps()
  }, [])

  return (
    <Card
      title="Listed dApps"
      className={styles.card}
      headerClassName={styles.card_header}>

      <div className={styles.body}>

        {isSubmitPending &&
          <SubmitMessage />
        }

        {!apps.length && !isLoading &&
          <EmptyView />
        }

        {!apps.length && isLoading &&
          <LoaderView />
        }

        {!!apps.length &&
          <ListView apps={apps} />
        }
      </div>

      <Button
        className={styles.button}
        label="List New dApp"
        onClick={() => router.push('/app/new')}
      />

    </Card>
  )
}

export const getStaticProps = async () => ({
  props: {
    isProtected: true
  }
})

export default withRouter(ListedApps)
