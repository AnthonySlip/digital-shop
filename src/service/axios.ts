import axios from 'axios';
import {API_HOST, URL_AUTH} from "../utils/path.ts";

const API_URL:string = API_HOST

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization =  `Bearer ${localStorage.getItem('accessToken')}`
    return config;
})
$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config
    if (error.request.status===401 && error.config && !error.config.isRetry401) {
        originalRequest.isRetry401 = true
        try {
            console.log('here1')
            const res = await axios.get(URL_AUTH.getToken, {withCredentials: true})
            localStorage.setItem('accessToken', res.data.accessToken)
            return $api.request(originalRequest)
        } catch (err) {
            console.error(err)
        }
    }
    if (error.request.status===401 && error.config && error.config.isRetry401) {
        throw error
    }
    if (error.request.status!==401) {
        throw error
    }
})


export default $api;