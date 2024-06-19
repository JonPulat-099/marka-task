import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { notification } from 'ant-design-vue';

const BASE_URL = import.meta.env.VITE_BASE_URL

let useFetch = axios.create({ baseURL: BASE_URL})

const onRequest = (
    config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
    return config;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
};

const onErrorResponse = async (
    error: AxiosError | Error
): Promise<AxiosError | AxiosResponse> => {
    
    if (axios.isAxiosError(error)) {
        const { status, data } = (error.response as AxiosResponse) ?? {};
        
        switch (status) {
            case 400: {
                notification.error({
                   message: 'Ошибка',
                   description: data.message
                })
                break;
            }

            case 401: {
                // "Login required"
                break;
            }

            case 403: {
                // "Permission denied"
                break;
            }

            case 422: {
                // "Unprocessable entity"
                break;
            }

            case 500: {
                // "Server error"
                break;
            }

            default: {
                // "Unknown error occurred"
                break;
            }
        }
    }

    return Promise.reject(error);
};

useFetch.interceptors.request.use(onRequest, onErrorResponse)
useFetch.interceptors.response.use(onResponse, onErrorResponse)

export default useFetch