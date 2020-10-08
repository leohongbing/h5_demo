import axios from 'axios';
import Qs from 'qs';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  transformRequest: [function(data) { // 如果是get请求通过param传参，此处data为undefined
    return Qs.stringify(data)
  }],
  timeout: 50000                 // 请求超时时间
});
// 参数为复杂嵌套的json，不用qs转换，比如 obj={a:['b','c']}
service.json = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 50000
});

// request拦截器
service.interceptors.request.use((config) => {
  // 需要在请求发出前做的全局处理逻辑可以添加在这里
  return config;
}, (error) => {
  // 可以在这里统一处理请求错误
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use((response) => {
  if (response.data.code === '00000') {
    return response.data;
  }
  // 业务非00000
  return Promise.reject(response.data);
}, (error) => {
  // 可以在这里统一处理响应错误
  return Promise.reject(error);
});
export default service;
