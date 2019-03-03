// export default async (path: string, config?: any) => {
//   let serverPath: string;
  
//   if (process.env.NODE_ENV === 'development') {
//     serverPath = `http://${process.env.HMR_SERVER_HOST}:${process.env.HMR_SERVER_PORT}`;
//   } else {
//     serverPath = `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`;    
//   }

//   return await fetch(`${serverPath}${path}`);
// };
import axios, {
  AxiosRequestConfig,
  AxiosError
} from 'axios';

const configAxios: AxiosRequestConfig = {
  baseURL: 'https://next.json-generator.com/api/json/get/',
  headers: {
    'Content-Type': 'application/json'
  }
};

const instance: any = axios.create(configAxios);


const handleResponse = (response: any) => {
  return response.data;
};

const handleError = (error: AxiosError) => {
  if (axios.isCancel(error)) {
    console.error('Request has been canceled');
  } else {
    console.error('Error with fetching', error);
  }
};

export const post = async (url: string, data?: any) => {
  return await instance
    .post(url, data)
    .then(handleResponse)
    .catch(handleError);
};

export const get = async (url: string, data?: any) => {
  return await instance
    .get(url, data)
    .then(handleResponse)
    .catch(handleError);
};