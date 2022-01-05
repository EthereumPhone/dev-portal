import rinkeby from './rinkeby.json'
import mainnet from './mainnet.json'

const contracts = {
  rinkeby,
  mainnet
}

export default contracts[process.env.NEXT_PUBLIC_NETWORK_NAME]
