import nextConnect from 'next-connect'
import { StatusCodes } from 'http-status-codes'
import { createClient } from 'urql'
import { mapApps } from '../../../mappers/app'


let client

const resolveClient = () => {
  if (!client) {
    client = createClient({ url: process.env.APP_SUBGRAPH_URL })
  }
  return client
}

const buildQuery = ({ appId }) => (
  `query {
    apps(where: { id: "${appId}" }) {
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


const apiRoute = nextConnect({
  onNoMatch(req, res) {
    res.status(StatusCodes.METHOD_NOT_ALLOWED)
      .json({ error: `Method ${req.method} not allowed` })
  }
})

apiRoute.get(async (req, res) => {
  const client = resolveClient()

  const query = buildQuery({ appId: req.query.id })
  const result = await client.query(query).toPromise()

  const apps = mapApps(result.data.apps)
  res.status(StatusCodes.OK).json(apps[0])
})

export default apiRoute
