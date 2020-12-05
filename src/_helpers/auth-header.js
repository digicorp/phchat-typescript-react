import config from 'config'
import { userService } from '../_services'

const beforeLoginHeaders = {
  'Content-Type': 'application/json',
  'api-key': config.APIKEY,
  'Access-Control-Allow-Origin': '*',
  UDID: getUDID(),
  'device-type': getDeviceType(),
  type: 'web'
}

function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('user'))

  if (user && user.token) {
    return {
      'Content-Type': 'application/json',
      'api-key': config.APIKEY,
      'Access-Control-Allow-Origin': '*',
      id: getUserId(),
      UDID: getUDID(),
      'device-type': getDeviceType(),
      type: 'web',
      Authorization: user.token
    }
  } else {
    return {}
  }
}
// Authorization: "Bearer " + user.token

//#region Helper functions for headers
function handleResponse(response) {
  return response.text().then(text => {
    let result = text && JSON.parse(text)

    const data = !!result.data ? result.data : []
    if (result.statusCode === 401) {
      // auto logout if 401 response returned from api
      userService.logout()
      location.reload(true)
    } else if (!result.status) {
      return Promise.reject(result.error)
    }
    if (!response.ok) {
      const error = (result && result.message) || response.statusText
      return Promise.reject(error)
    }
    return data
  })
}

function getUDID() {
  return window.navigator.userAgent.replace(/\D+/g, '')
}

function getDeviceType() {
  return 'web'
}

function getDomain() {
  return {
    host: config.BASEURL
  }
}

function getUserId() {
  let user = JSON.parse(localStorage.getItem('user'))
  return !!user.id ? user.id : ''
}
//#endregion

export { authHeader, beforeLoginHeaders, handleResponse, getDomain, getUserId }
