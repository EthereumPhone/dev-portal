import Card from '../../../components/Card'
import Button from '../../../components/Button'
import Image from 'next/image'
import emptyIcon from './empty.svg'
import styles from './index.module.css'


const EmptyView = () => (
  <div className={styles.empty}>
    <Image src={emptyIcon} alt="empty" />
    <p className={styles['empty-text']}>
      You haven't listed any dApps yet.<br/>
      Click below to get started. 
    </p>
  </div>
)

const ListedApps = () => (
   <Card title="Listed dApps">

    <div className={styles.body}>

      <EmptyView />
    </div>

    <Button
      className={styles.button}
      label="List New dApp"
    />

  </Card>
)

export default ListedApps