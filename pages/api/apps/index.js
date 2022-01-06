import nextConnect from 'next-connect'
import { StatusCodes } from 'http-status-codes'
import { createClient } from 'urql'


const IPFS_GATEWAY_URL = 'https://gateway.ipfs.io/ipfs'


let client

const resolveClient = () => {
  if (!client) {
    client = createClient({ url: process.env.APP_SUBGRAPH_URL })
  }
  return client
}

const buildQuery = ({ appOwner }) => (
  `query {
    apps(where: { appOwner: "${appOwner}" }) {
      id
      appOwner
      appName
      appIPFSHash,
      description,
      developer,
      type,
      category,
      logo,
      version,
      images,
      status
    }
  }`
)


const toUrl = (cid) => (
  `${IPFS_GATEWAY_URL}/${cid}`
)

const mapIpfsResources = (apps = []) => {
  const mapApp = (app) => ({
    apkUrl: toUrl(app.appIPFSHash),
    logoUrl: toUrl(app.logo),
    imageUrls: app.images.map(toUrl),
    ...app
  })
  return apps.map(mapApp)
}


const apiRoute = nextConnect({
  onNoMatch(req, res) {
    res.status(StatusCodes.METHOD_NOT_ALLOWED)
      .json({ error: `Method ${req.method} not allowed` })
  }
})

apiRoute.get(async (req, res) => {
  const client = resolveClient()
  const query = buildQuery({ appOwner: req.query.owner })
  const result = await client.query(query).toPromise()
  const apps = mapIpfsResources(result.data.apps)

  res.status(StatusCodes.OK).json(apps)
})

export default apiRoute
