import axios from 'axios';
import { getAuthenticationToken } from './index';

const BASE_API_URL = process.env.REACT_APP_BASE_URL
console.log('location: ', BASE_API_URL);

// base instance

const http = axios.create({
    baseURL: BASE_API_URL,
    responseType: 'json',
    timeout: 10000,
    timeoutErrorMessage: 'Request Timeout Error',
})

let token;

const getHeaders = (isSecured) => {
    token = getAuthenticationToken();
    console.log('token ', token)
    let options = {
        "Content-Type": "application/json",
    }

    if (isSecured) {
        options['Authorization'] = `Bearer ${token}`
    }
    return options;

}

const POST = (url, data, isSecured = false, params = {}) => {

    return http.post(url, data, {
        headers: getHeaders(isSecured),
        params: params,
    })
}

const GET = (url, isSecured = false, params = false) => {
    console.log('token in get http is',token)
    return http.get(url, {
        headers: getHeaders(isSecured),
        params: params,
    })
}

const PUT = (url, data, isSecured = false, params = {}) => {
    return http.put(url, data, {
        headers: getHeaders(isSecured),
        params: params,
    })
}

const DELETE = (url, isSecured = false, params = {}) => {
    return http.delete(url, {
        headers: getHeaders(isSecured),
        params: params,
    })
}

const UPLOAD = (method, url, data, files) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();

        // append files in formData
        if (files.length) {
            files.forEach((item, index) => {
                formData.append('images', item)
            })
        }

        // append textual data in formData
        for (let key in data) {
            formData.append(key, data[key])
        }

        // using formData our array will be sent as form of string
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response)
                } else {
                    reject(xhr.response)
                }
            }
        }
        xhr.open(method, `${BASE_API_URL}${url}?token=Bearer ${token}`, true)
        xhr.send(formData)
    })
}

export const httpClient = {
    GET,
    POST,
    PUT,
    DELETE,
    UPLOAD,
}