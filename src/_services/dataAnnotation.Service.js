import config from 'config'
import axios from 'axios'

import { authHeader } from '../_helpers'

export const dataAnnotationService = {
    getXML,
    uploadFile
}

const dataAnnotationUrl = `${config.apiUrl}dataAnnotation/convertJSONData`
const uploadUrl = `${config.apiUrl}dataAnnotation/uploadFile`

function getXML(payload) {
  return axios
    .post(dataAnnotationUrl, payload, {
      headers: authHeader()
    })
    .then(function (response) {
      // handle success
      if (!!response && !!response.data && !!response.data.status)
        return response.data
      else return response.data
    })
    .catch(function (error) {
      // handle error
      return error
    })
}

function uploadFile(payload) {
    return axios
    .post(uploadUrl, payload, {
      headers: authHeader()
    })
    .then(function (response) {
      // handle success
      if (!!response && !!response.data && !!response.data.status)
        return response.data
      else return response.data
    })
    .catch(function (error) {
      // handle error
      return error
    })
}