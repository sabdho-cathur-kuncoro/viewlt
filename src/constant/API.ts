/* eslint-disable no-new */
import axios from 'axios';
import {storage} from '../utils/storage';
import {refreshToken} from '../utils/refreshToken';

const TEST = 'https://view-lt.my.id/api/';
const bearer = 'Bearer';

export const Config = {
  BASE_URL: TEST,
  API_TIMEOUT: 15000,
  BEARER: bearer,
};

export const APIBASIC = axios.create({
  baseURL: Config.BASE_URL,
  timeout: Config.API_TIMEOUT,
});

export const APIBEARER = axios.create({
  baseURL: Config.BASE_URL,
  timeout: Config.API_TIMEOUT,
});

APIBEARER.interceptors.request.use(
  async request => {
    // console.log('request ', request);
    const token = storage.getString('token');
    // console.log('res token ', token.value);
    if (token) {
      request.headers.Authorization = `${Config.BEARER} ${token}`;
    }
    return request;
  },
  error => {
    new Promise((resolve, reject) => {
      reject(error);
    });
  },
);

APIBEARER.interceptors.response.use(
  response => {
    // console.log('response interceptor>> ', response);
    return response;
  },
  async error => {
    // console.log('error response>> ', error);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return refreshToken()
        .then(async (resp: any) => {
          const config = error.config;
          // console.log('resp>> ', resp);
          if (resp.code === 200 && resp.message === 'Authentication success') {
            storage.set('token', resp.token);
            storage.set('refreshToken', resp.refreshToken);
            config.headers.Authorization = `${Config.BEARER} ${resp.token}`;

            return new Promise((resolve, reject) => {
              axios
                .request(config)
                .then(res => {
                  resolve(res);
                })
                .catch(err => {
                  reject(err);
                });
            });
          }
        })
        .catch((err: any) => {
          Promise.reject(err);
        });
    }

    return new Promise((resolve, reject) => {
      reject(error);
    });
  },
);
