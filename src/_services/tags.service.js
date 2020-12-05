import config from 'config'
import axios from 'axios'

import { authHeader, handleResponse } from '../_helpers'

export const tagsService = {
  generateTags,
  checkoutUser,
  listTags,
  getModels,
  remove
}

const generateTagsUrl = `${config.apiUrl}tags/save`
const checkoutUserUrl = `${config.apiUrl}git/checkout`
const listTagsUrl = `${config.apiUrl}tags/list`
const getModelsUrl = `${config.apiUrl}tags/getmodel`
const removeTagsUrl = `${config.apiUrl}tags/remove`

function generateTags(payload) {
  return axios
    .post(generateTagsUrl, payload, {
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

function checkoutUser(payload) {
  return axios
    .post(checkoutUserUrl, payload, {
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

function getModels(para) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(para)
  }
  return fetch(getModelsUrl, requestOptions).then(handleResponse)
}

function listTags(para) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(para)
  }
  return fetch(listTagsUrl, requestOptions).then(handleResponse)
}

function remove(record_ids) {
  if (!!record_ids) {
    const payload = {
      ids: [+record_ids]
    }

    return axios
      .post(removeTagsUrl, payload, {
        headers: authHeader(),
        body: payload
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
}
