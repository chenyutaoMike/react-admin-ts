import axios from 'axios'
import { message } from 'antd';
import {getToken,getUserName} from '../utils/app'
const service = axios.create({
  timeout: 10000
});


service.interceptors.request.use((config) => {
  config.headers['Tokey'] = getToken();
  config.headers['UserName'] = getUserName();
  return config
})


service.interceptors.response.use((response) => {
  const data = response.data;
  if (data.resCode !== 0) {
    message.error(data.message)
    return Promise.reject(data)
  } else {
    return response;
  }

}, (err) => {
  return Promise.reject(err)
})

export default service