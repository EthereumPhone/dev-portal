import Head from 'next/head'
import Link from 'next/link'
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

      <Link href="/app/edit">
        <a className={styles.link}>
          App edit view
        </a>
      </Link>
    </main>
  </div>
)

export default HomePage
