import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL: string = "localhost:3000";

const client = axios.create({
  baseURL: BASE_URL,
});

export const request = async (options: AxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken") ?? "";
  token !== "" && (client.defaults.headers.common.Authorization = `${token}`);

  const onSuccess = (response: AxiosResponse) => {
    return response?.data?.data;
  };

  const onError = (error: AxiosError) => {
    return Promise.reject(error.response?.data);
  };

  return client(options).then(onSuccess).catch(onError);
};
