import config from 'config'
import { authHeader, handleResponse } from '../_helpers'

export const monitorService = {
  watch
}

const monitorUrl = `${config.apiUrl}monitor/watch`

function watch(para) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(para)
  }
  return fetch(monitorUrl, requestOptions).then(handleResponse)
}
