import AppInputCard from '../../../components/AppInputCard'
import { useRouter } from 'next/router'
import styles from './index.module.css'


const NewAppPage = () => {

  const router = useRouter()

  return (
    <AppInputCard
      title="List new dApp"
      backPath="/app/list"
      onSubmit={() => router.push('/app/list?pending=1')}
    />
  )
}

export const getStaticProps = async () => ({
  props: {
    isProtected: true
  }
})

export default NewAppPage
