import config from 'config'
import axios from 'axios'

import { authHeader, handleResponse } from '../_helpers'

export const discoverService = {
    discoverModel
  }

  const discoverURL = `${config.apiUrl}discovery/watch`

  function discoverModel(payload) {

    return axios
      .post(discoverURL, payload, {
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