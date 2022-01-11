import axios from 'axios'

const extractData = (response) => response.data

export const fetchApps = ({ ownerAddress }) => {
  const params = { owner: ownerAddress }
  
  return axios.get('/api/apps', { params })
    .then(extractData)
}

export const fetchApp = ({ id }) => {
  return axios.get(`/api/apps/${id}`)
    .then(extractData)
}
