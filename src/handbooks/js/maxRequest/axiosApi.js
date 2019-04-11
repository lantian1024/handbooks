import axios from 'axios'
const baseURL = ''


axios.interceptors.response.use(rep => {
    return rep.data || true
}, err => {
    return false
})


axios.interceptors.request.use((config) => {
    return config;
},(error) => {
    return Promise.reject(error);
})


function getHeaders(headers) {

    return headers
}

export default {
    get(url, param = null, headers = {}, options = {}) {
        return axios.get(url, {
            baseURL,
            params: param,
            ...options,
            headers: getHeaders(headers)
        })
    },
    post(url, param = null, headers = {}, options = {}) {
        return axios.post(url, param, {
            baseURL,
            ...options,
            headers: getHeaders(url,headers)
        })
    },
    file(url, param = null, headers = {}, options = {}) {
        return axios.post(url, param, {
            baseURL,
            ...options,
            headers: {
                'Content-Type': 'multipart/form-data',
                ...getHeaders(headers)
            }
        })
    }
}
