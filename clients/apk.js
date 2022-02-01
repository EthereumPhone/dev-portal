import axios from 'axios'

const extractData = (response) => response.data

export const startUpload = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_DEV_API_URL}/apk/uploads`)
    .then(extractData)
}

export const pinToIpfs = ({ uploadId, apkName }) => {
  const body = { uploadId, apkName }
  return axios.post(`${process.env.NEXT_PUBLIC_DEV_API_URL}/apk/pins`, body)
    .then(extractData)
}
