import axios from 'axios';

// ----------------------------------------------------------------------

const parseParams = (params: any) => {
  const keys = Object.keys(params);
  let options = '';

  keys.forEach((key) => {
    const isParamTypeObject = typeof params[key] === 'object';
    const isParamTypeArray =
      isParamTypeObject && Array.isArray(params[key]) && params[key].length >= 0;

    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && isParamTypeArray) {
      params[key].forEach((element: any) => {
        options += `${key}=${element}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
};

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  paramsSerializer: parseParams
});

request.interceptors.request.use((options) => {
  const { method } = options;

  if (method === 'put' || method === 'post') {
    Object.assign(options.headers, {
      'Content-Type': 'application/json;charset=UTF-8'
    });
  }

  return options;
});

request.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Có lỗi xảy ra')
);

export default request;
