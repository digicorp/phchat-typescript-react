import config from 'config'
import axios from 'axios'

import { authHeader } from '../_helpers'

export const dataPrepService = {
  dataPrepModel
}

const dataPrepUrl = `${config.apiUrl}dataPreps/watch`

function dataPrepModel(payload) {
  return axios
    .post(dataPrepUrl, payload, {
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
