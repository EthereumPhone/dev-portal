import Card from '../../../components/Card'
import Button from '../../../components/Button'
import ConnectedPage from '../../../components/ConnectedPage'
import Image from 'next/image'
import emptyIcon from './empty.svg'
import appIconSrc from './app.svg'
import styles from './index.module.css'


const EmptyView = () => (
  <div className={styles.empty}>
    <Image src={emptyIcon} alt="empty" />
    <p className={styles['empty-text']}>
      You haven’t listed any dApps yet.<br/>
      Click below to get started. 
    </p>
  </div>
)

const AppItem = ({ logoSrc = appIconSrc, name, category, description }) => (
  <div className={styles['app-item']}>
    <Image
      className={styles['app-item-logo']}
      src={logoSrc}
    />
    <div className={styles['app-item-info']}>
      <span className={styles['app-item-name']}>
        {name}
      </span>
      <span className={styles['app-item-category']}>
        {category}
      </span>
      <p className={styles['app-item-description']}>
        {description}
      </p>
    </div>
  </div>
)

const ListView = ({ items }) => (
  <div className={styles['list-view']}>
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
      headerClassName={styles['card-header']}>

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