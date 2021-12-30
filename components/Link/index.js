import styles from './index.module.css'
import NextLink from 'next/link'


const InternalLink = ({ label, href }) => (
  <NextLink href={href}>
    <a className={styles.container}>
      {label}
    </a>
  </NextLink>
)

const ExternalLink = ({ label, href, target }) => (
  <a
    className={styles.container}
    href={href}
    target={target}>
      {label}
  </a>
)

const Link = ({ label, href, target }) => {

  const isInternal = href && href.startsWith('/')

  return isInternal ? (
    <InternalLink
      label={label}
      href={href}
    />
  ) : (
    <ExternalLink
      label={label}
      href={href}
      target={target}
    />
  )
}

export default Link
