import config from "config";
import axios from 'axios'

import { authHeader, handleResponse } from '../_helpers'

export const historyService = {
    listHistory,
    uploadFile
}


const listHistoryUrl = `${config.apiUrl}monitor/viewHistory`
const uploadFileUrl = `${config.apiUrl}monitor/uploadFile`


function listHistory(payload) {

    return axios
    .post(listHistoryUrl, payload, {
      headers: authHeader()
    })
    .then(function (response) {
      // handle success
      if (!!response && !!response.data && !!response.data.status)
        return response.data.data
      else return response.data
    })
    .catch(function (error) {
      // handle error
      return error
    })

}

function uploadFile(payload) {

  return axios
  .post(uploadFileUrl, payload, {
    headers: authHeader()
  })
  .then(function (response) {
    // handle success
    if (!!response && !!response.data && !!response.data.status)
      return response.data.data
    else return response.data
  })
  .catch(function (error) {
    // handle error
    return error
  })

}