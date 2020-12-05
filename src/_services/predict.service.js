import config from 'config'
import axios from 'axios'

import { authHeader } from '../_helpers'

export const predictService = {
  predictModel
}

const predictUrl = `${config.apiUrl}predict/predict-model`

function predictModel(payload) {
  return axios
    .post(predictUrl, payload, {
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
