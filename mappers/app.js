const IPFS_GATEWAY_URL = 'https://gateway.ipfs.io/ipfs'

const toUrl = (cid) => (
  `${IPFS_GATEWAY_URL}/${cid}`
)

export const mapApps = (apps = []) => (
  apps.map(mapApp)
)

export const mapApp = (app) => ({
  apkUrl: toUrl(app.appIPFSHash),
  logoUrl: toUrl(app.logo),
  imageUrls: app.images.map(toUrl),
  ...app
})