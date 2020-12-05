import config from 'config'
import axios from 'axios'

import { authHeader, handleResponse } from '../_helpers'

export const alphapiService = {
  uploadFile,
  generateModel,
  generateDataPrep,
  predictModel,
  deploymentModel,
  discoverModel,
  monitorModel,
  listGeneratedModel,
  listBaseModel,
  listTargetDevice,
  listDataPrepCmd,
  listModelFormat,
  listDeploymentPrecision
}

const AIMiddleware_URL = `${config.apiUrl}alphapiai/AIMiddleware`
const upload_URL = `${config.apiUrl}alphapiai/uploadFile`
const generateDataPrep_URL = `${config.apiUrl}dataPreps/save`
const alphaPIAIList_URL = `${config.apiUrl}alphapiai/list`

function uploadFile(payload) {
  return axios
    .post(upload_URL, payload, {
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

function generateModel(payload) {
  return axios
    .post(AIMiddleware_URL, payload, {
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

function generateDataPrep(payload) {
  return axios
    .post(AIMiddleware_URL, payload, {
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

function predictModel(payload) {
  return axios
    .post(AIMiddleware_URL, payload, {
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

function deploymentModel(payload) {
  return axios
    .post(AIMiddleware_URL, payload, {
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

function discoverModel(payload) {
  return axios
    .post(AIMiddleware_URL, payload, {
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

function monitorModel(payload) {
  return axios
    .post(AIMiddleware_URL, payload, {
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

function listBaseModel() {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      type: 'basemodel'
    })
  }
  return fetch(alphaPIAIList_URL, requestOptions).then(handleResponse)
}

function listTargetDevice(type = 'modelgen', device_type = '') {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      type: 'targetDevice',
      device_type,
      filterIn: ['api_type', ['both', type]]
    })
  }
  return fetch(alphaPIAIList_URL, requestOptions).then(handleResponse)
}

function listGeneratedModel() {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      type: 'modelname'
    })
  }
  return fetch(alphaPIAIList_URL, requestOptions).then(handleResponse)
}

function listDataPrepCmd() {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      type: 'prep'
    })
  }
  return fetch(alphaPIAIList_URL, requestOptions).then(handleResponse)
}

function listDeploymentPrecision() {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      type: 'precision'
    })
  }
  return fetch(alphaPIAIList_URL, requestOptions).then(handleResponse)
}

function listModelFormat() {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      type: 'modelFormat'
    })
  }
  return fetch(alphaPIAIList_URL, requestOptions).then(handleResponse)
}
