import { URL_API } from '@env';
import axios from 'axios';
import axiosRetry from 'axios-retry';

export const api = axios.create({
  baseURL: URL_API.concat('/api/v1'),
});

axiosRetry(api, { retries: 4 });
