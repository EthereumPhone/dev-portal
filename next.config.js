module.exports = {
  reactStrictMode: true,

  images: {
    domains: ['gateway.ipfs.io'],
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/connect',
        permanent: false
      },
    ]
  }
}
