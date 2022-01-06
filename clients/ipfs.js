import axios from 'axios'

const extractData = (response) => response.data

export const addFile = (file) => {
  const data = new FormData()
  data.append('file', file)
  
  return axios.post('/api/ipfs', data)
    .then(extractData)
}

export const addJsonFile = (obj) => {
  
  const json = JSON.stringify(obj)

  const blob = new Blob([json], {
    type: 'application/json'
  })

  const data = new FormData()
  data.append('file', blob)

  return axios.post('/api/ipfs', data)
    .then(extractData)
}
