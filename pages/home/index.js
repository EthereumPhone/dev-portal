import Head from 'next/head'
import Link from '../../components/Link'
import styles from './index.module.css'

const HomePage = () => (
  <div className={styles.container}>
    <Head>
      <title>ethOS</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <span className={styles.title}>
        !!! Under active development !!!
      </span>

      <Link
        label="App edit view"
        href="/app/edit"
      />

    </main>
  </div>
)

export default HomePage
