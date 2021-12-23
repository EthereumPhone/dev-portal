import styles from './index.module.css'

const toFriendlyAddress = (address) => {
  const headCharCount = 6
  const tailCharCount = 4

  const headSlice = address.slice(0, headCharCount)
  const tailSlice = address.slice(address.length - tailCharCount, address.length)

  return `${headSlice}...${tailSlice}`
}

const ConnectedButton = ({ address }) => (
  <div className={styles.connected}>
    <span>{toFriendlyAddress(address)}</span>
    <div className={styles.circle}></div>
  </div>
)

const DisconnectedButton = () => (
  <span className={styles.disconnected}>
    Connect Wallet
  </span>
)

const ConnectButton = ({ address, onClick }) => (
  <button
    className={styles.container}
    onClick={onClick}>

    {address &&
      <ConnectedButton address={address} />
    }
    {!address &&
      <DisconnectedButton />
    }
  </button>  
)

export default ConnectButton
