import nextConnect from 'next-connect'
import { StatusCodes } from 'http-status-codes'
import { create } from 'ipfs-http-client'
import multer from 'multer'
import { captureException } from '@sentry/nextjs'


const resolveSignature = () => {
  const projectId = process.env.INFURA_IPFS_PROJECT_ID
  const projectSecret = process.env.INFURA_IPFS_PROJECT_SECRET
  
  const credentials = Buffer.from(`${projectId}:${projectSecret}`)
  const signature = `Basic ${credentials}`.toString('base64')
  
  return signature
}

const settings = {
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: resolveSignature()
  }
}


let client

const resolveClient = () => {
  if (!client) {
    client = create(settings)
  }
  return client
}


const apiRoute = nextConnect({
  onError: (err, req, res) => {
    captureException(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end()
  },
  onNoMatch(req, res) {
    res.status(StatusCodes.METHOD_NOT_ALLOWED)
      .json({ error: `Method ${req.method} not allowed` })
  }
})

const formMiddleware = multer({ storage: multer.memoryStorage() })
apiRoute.use(formMiddleware.single('file'))

apiRoute.post(async (req, res) => {

  const client = resolveClient()

  const { cid } = await client.add({
    content: req.file.buffer
  })  

  res.status(StatusCodes.OK).json({
    cid: cid.toString()
  })
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default apiRoute
