import Card from '../../../components/Card'
import Button from '../../../components/Button'
import ConnectedPage from '../../../components/ConnectedPage'
import Image from 'next/image'
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
    <Image
      className={styles.app_item_logo}
      src={logoSrc}
      alt="app logo"
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

const ListView = ({ items }) => (
  <div className={styles.list_view}>
    <SubmitMessage />
    {items.map((item, index) => (
      <AppItem
        key={`app-item-${index}`}
        name={item.name}
        category={item.category}
        description={item.description}
      />
    ))}
  </div>
)

const TEST_ITEMS = [
  {
    name: 'Ethereum dApp',
    category: 'Exchange',
    description: 'A short little description goes right here'
  },
  {
    name: 'Ethereum dApp',
    category: 'Exchange',
    description: 'A short little description goes right here'
  },
  {
    name: 'Ethereum dApp',
    category: 'Exchange',
    description: 'A short little description goes right here'
  }
]

const ListedApps = () => (
  <ConnectedPage>
    <Card
      title="Listed dApps"
      className={styles.card}
      headerClassName={styles.card_header}>

      <div className={styles.body}>

        {!TEST_ITEMS.length &&
          <EmptyView />
        }

        {TEST_ITEMS.length &&
          <ListView items={TEST_ITEMS} />
        }
      </div>

      <Button
        className={styles.button}
        label="List New dApp"
      />

    </Card>
  </ConnectedPage>
)

export default ListedApps