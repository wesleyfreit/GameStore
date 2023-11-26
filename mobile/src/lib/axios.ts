import { URL_API } from '@env';
import axios from 'axios';
// import { parseCookies } from 'nookies';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAPIClient = () => {
  // const { 'academic_maps.auth': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: URL_API,
  });

  // if (token) {
  //   api.defaults.headers['Authorization'] = token;
  // }

  return api;
};

export const api = axios.create({
  baseURL: URL_API.concat('/api/v1'),
});
