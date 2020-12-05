import config from 'config'
import axios from 'axios'

import { authHeader, handleResponse } from '../_helpers'

export const deployService = {
    deployModel
  }

  const deployURL = `${config.apiUrl}deploy/watch`

  function deployModel(payload) {

    return axios
      .post(deployURL, payload, {
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