import { AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

/** Signature for addAuthorizationHeader() function */
type AddAuthorizationHeader = (config: AxiosRequestConfig) => Promise<AxiosRequestConfig>;

/**
 * Adds an authorization header to the outgoing network request.
 *
 * @param config HTTP request details.
 */
const addAuthorizationHeader: AddAuthorizationHeader = async (
    config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
    const token: string | null = await AsyncStorage.getItem('token');
    console.warn(token);
    if (token) {
        config.headers.common.Authorization = `Bearer ${token}`;
    }
    return config;
};

export default addAuthorizationHeader;
