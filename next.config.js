module.exports = {
  reactStrictMode: true,

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
