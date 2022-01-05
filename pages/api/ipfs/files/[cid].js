import nextConnect from 'next-connect'
import { StatusCodes } from 'http-status-codes'
const { create } = require('ipfs-http-client')


const encoders = {
  'application/json': (buffer) => (
    JSON.parse(buffer.toString())
  )
}

const resolveEncoder = ({ requestedContentType, onFailedToResolveEncoder }) => {
  const encoder = encoders[requestedContentType]

  if (!encoder) {
    onFailedToResolveEncoder()
    return
  }

  return encoder
}


let client

const resolveClient = () => {
  if (!client) {
    client = create('https://gateway.ipfs.io')
  }
  return client
}

const catFile = async ({ cid, requestedContentType, onFailedToResolveEncoder }) => {
  const client = resolveClient()

  const chunks = []
  for await (const chunk of client.cat(cid)) {
    chunks.push(chunk)
  }
  const buffer = Buffer.concat(chunks)

  const encoder = resolveEncoder({
    requestedContentType,
    onFailedToResolveEncoder
  })

  return encoder(buffer)
}


const apiRoute = nextConnect({
  onNoMatch(req, res) {
    res.status(StatusCodes.METHOD_NOT_ALLOWED)
      .json({ error: `Method ${req.method} not allowed` })
  }
})

apiRoute.get(async (req, res) => {
  
  const file = await catFile({
    cid: req.query.cid,
    requestedContentType: req.headers['accept'],
    onFailedToResolveEncoder: () => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Unsupported content type' })
    }
  })

  res.status(StatusCodes.OK).json(file)
})

export default apiRoute
