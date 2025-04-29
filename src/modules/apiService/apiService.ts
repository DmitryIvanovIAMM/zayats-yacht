import axios, { type AxiosRequestConfig } from 'axios';

// for Next.js to see the variable in the client (browser), it must be prefixed with NEXT_PUBLIC
// Read more on https://nextjs.org/docs/basic-features/environment-variables
// If we are on the client of Next.js, we should redirect all API calls from base '/'
// But if on server of Next.js, we should use the full URL of backend such as http://test-api.efacity.com/

// eslint-disable-next-line no-console
console.log("process.env['BASE_URI']: ", process.env['BASE_URI']);

//const baseURI = typeof window === 'undefined' ? process.env['BASE_URI'] : undefined;
const baseURI = process.env['BASE_URI'];
// eslint-disable-next-line no-console
console.log('baseURI: ', baseURI);

export const baseURL = baseURI || '';
// eslint-disable-next-line no-console
console.log('baseURL: ', baseURL);
export const rootPath = `${baseURL}/api/`;
// eslint-disable-next-line no-console
console.log('rootPath: ', rootPath);
export const axiosInstance = axios.create({
  baseURL: `${rootPath}`,
  withCredentials: true
});

export const apiService = () => {
  return {
    get<Resp, P = Record<string, unknown>>(
      url: string,
      params?: P,
      headers?: AxiosRequestConfig['headers'],
      paramsSerializer?: AxiosRequestConfig['paramsSerializer']
    ) {
      return axiosInstance.get<Resp>(url, { params, paramsSerializer, headers });
    },

    patch<Response, Payload>(url: string, data: Payload) {
      return axiosInstance.patch<Response>(url, data);
    },

    post<Response, Payload = Record<string, unknown>>(
      url: string,
      data: Payload,
      config?: AxiosRequestConfig<Payload> | undefined
    ) {
      return axiosInstance.post<Response>(url, data, config);
    },

    delete<Response>(url: string) {
      return axiosInstance.delete<Response>(url);
    }
  };
};
