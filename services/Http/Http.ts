import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import AddAuthorizationHeader from './AddAuthorizationHeader';
import {BASE_API_URL} from "@env";

/** Instance of Axios for HTTP API requests */
const instance: AxiosInstance = axios.create();

instance.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    const baseUrl: string = BASE_API_URL
    config.baseURL = baseUrl;

    return config;
});

/**
 * Ensure auth token is available before making a request.
 */
instance.interceptors.request.use(AddAuthorizationHeader);

instance.interceptors.response.use((response: AxiosResponse): AxiosResponse => response);

export default instance;
