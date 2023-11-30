import { URL_API } from '@env';
import axios from 'axios';

export const api = axios.create({
  baseURL: URL_API.concat('/api/v1'),
});
