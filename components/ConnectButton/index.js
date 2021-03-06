import { useWallet } from '../../components/WalletProvider'
import styles from './index.module.css'


const generateFriendlyAddress = (address) => {
  const headCharCount = 6
  const tailCharCount = 4

  const headSlice = address.slice(0, headCharCount)
  const tailSlice = address.slice(address.length - tailCharCount, address.length)

  return `${headSlice}...${tailSlice}`
}

const tryGenerateFriendlyAddress = (address) => (
  address
    ? generateFriendlyAddress(address)
    : 'Address: N/A'
)

const ConnectedButton = ({ address, onClick }) => (
  <div
    className={styles.connected}
    onClick={onClick}>

    <span>{tryGenerateFriendlyAddress(address)}</span>
    <div className={styles.circle}></div>
  </div>
)

const DisconnectedButton = ({ onClick }) => (
  <div 
    className={styles.disconnected}
    onClick={onClick}>

    <span>Connect Wallet</span>
  </div>
)

const ConnectButton = () => {

  const { connect, disconnect, isConnected, address } = useWallet()

  return (
    <button className={styles.container}>

      {isConnected &&
        <ConnectedButton
          address={address}
          onClick={disconnect}
        />
      }
      {!isConnected &&
        <DisconnectedButton
          onClick={connect}
        />
      }
    </button> 
  ) 
}

export default ConnectButton
