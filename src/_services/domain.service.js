import config from "config";
import axios from "axios";

import {
  authHeader,
  handleResponse
} from "../_helpers";

export const domainService = {
  listDomain,
  listSubDomain,
  listDomainSubDomain,
  generateDomain,
  generateSubDomain,
  removeDomain,
  removeSubDomain
};

const generateDomainUrl = `${config.apiUrl}domains/save`;
const generateSubDomainUrl = `${config.apiUrl}subdomains/save`;
const listDomainUrl = `${config.apiUrl}domains/list`;
const removeDomainUrl = `${config.apiUrl}domains/remove`;
const listSubDomainUrl = `${config.apiUrl}subdomains/list`;
const removeSubDomainUrl = `${config.apiUrl}subdomains/remove`;
const listDomainSubDomainUrl = `${config.apiUrl}domains/listDomainSubdomain`;

function generateDomain(payload) {
  return axios.post(generateDomainUrl, payload, {
    headers: authHeader()
  }).then(function (response) {
    // handle success
    if (!!response && !!response.data && !!response.data.status) return (response.data);
    else return response.data;
  }).catch(function (error) {
    // handle error    
    return (error);
  });
}

function generateSubDomain(payload) {
  return axios.post(generateSubDomainUrl, payload, {
    headers: authHeader()
  }).then(function (response) {
    // handle success
    if (!!response && !!response.data && !!response.data.status) return (response.data);
    else return response.data;
  }).catch(function (error) {
    // handle error    
    return (error);
  });
}

function listDomain() {
  const requestOptions = {
    method: "POST",
    headers: authHeader()
  };
  return fetch(listDomainUrl, requestOptions).then(handleResponse);
}

function listSubDomain(para) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(para)
  };
  return fetch(listSubDomainUrl, requestOptions).then(handleResponse);
}

function listDomainSubDomain(){
  const requestOptions = {
    method: "POST",
    headers: authHeader()
  };
  return fetch(listDomainSubDomainUrl, requestOptions).then(handleResponse);
}

function removeDomain(record_ids) {
  if (!!record_ids) {
    const payload = {
      ids: [+record_ids]
    }
    console.log(payload)
    return axios.post(removeDomainUrl, payload, {
      headers: authHeader(),
      body: payload
    }).then(function (response) {
      // handle success
      if (!!response && !!response.data && !!response.data.status) return (response.data);
      else return response.data;
    }).catch(function (error) {
      // handle error    
      return (error);
    });
  }
}

function removeSubDomain(record_ids) {
  if (!!record_ids) {
    const payload = {
      ids: [+record_ids]
    }

    return axios.post(removeSubDomainUrl, payload, {
      headers: authHeader(),
      body: payload
    }).then(function (response) {
      // handle success
      if (!!response && !!response.data && !!response.data.status) return (response.data);
      else return response.data;
    }).catch(function (error) {
      // handle error    
      return (error);
    });
  }
}
