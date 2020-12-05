import config from 'config'
import { authHeader, beforeLoginHeaders } from '../_helpers'
import axios from 'axios'

export const userService = {
  login,
  register,
  sendMessage,
  logout,
  getAll
}

const loginUrl = `${config.apiUrl}appusers/login`
const registerUrl = `${config.apiUrl}appusers`
const getAllUsersUrl = `${config.apiUrl}appusers`
const sendMessageUrl = `${config.apiUrl}appusers/chats`

function login(email, pwd) {
  const requestOptions = {
    method: 'POST',
    headers: beforeLoginHeaders,
    body: JSON.stringify({
      email,
      pwd
    })
  }
  return fetch(loginUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response.statusText)
      }
      return response.json()
    })
    .then((user) => {
      // login successful if there's a jwt token in the response
      if (user && !!user.id) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user))
      }
      return user
    })
}

function register(name, email, pwd) {
  const payload = { name, email, pwd }
  return axios
    .post(registerUrl, payload, {
      headers: authHeader()
    })
    .then(function (response) {
      // console.log('response :>> ', response)
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

function sendMessage(payload) {
  return axios
    .post(sendMessageUrl, payload, {
      headers: authHeader()
    })
    .then(function (response) {
      console.log('response :>> ', response)
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

function logout() {
  // remove user from local storage to log user out
  // localStorage.removeItem("user");
  localStorage.clear()
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(getAllUsersUrl, requestOptions).then(handleResponse)
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout()
        location.reload(true)
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }
    return data
  })
}
