import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ApiService: AxiosInstance = axios.create({
  baseURL: 'https:/back-geranciador-exames.herokuapp.com/',
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
      'Accept-Language': 'pt, pt-BR',
      "Authorization": ' '
  }
});

async function getToken()  {
  const storageToken = await AsyncStorage.getItem('@GEAuth:token');
  return storageToken;
}

ApiService.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // Interceptor de autenticação
    const token = await getToken();
    if (token && config.url) {
      config.headers = {
        ...config.headers,
        Authorization: token ? token : " ",
      }
    }
    return config;
  }
);
