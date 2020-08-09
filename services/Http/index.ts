import Http from './Http';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

/** The HTTP service */
export default Http;

/** Data required to create a HTTP request. */
export type HttpRequest = AxiosRequestConfig;

/** Data available from an HTTP Response. */
export type HttpResponse<T> = AxiosResponse<T>;
