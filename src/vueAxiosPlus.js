import axios from 'axios'
import {
  message
} from 'ant-design-vue'
import moment from 'moment'

const vueAxiosPlus = {}

const errorMsg = (err = '系统错误，请稍后重新访问') => message.error(err)

const loginCheck = (config, customHeader, expireTime, needAuthArry, expireCallback) => {
  const theConfig = config;
  const configTemp = config.url;

  if (needAuthArry.some((x) => configTemp.indexOf(x) !== -1)) {
    if (sessionStorage.getItem('t') && (moment().valueOf() - sessionStorage.getItem('t')) > expireTime) { // 如果token两小时过期
      expireCallback();
      sessionStorage.clear();
    } else {
      Object.entries(customHeader).forEach(item => {
        let key = item[0];
        let value = item[1];
        theConfig.headers[key] = value
      })
    }
  }
  return theConfig
}


// 添加一个响应拦截器
axios.interceptors.response.use(
  response => {
    // return response
    sessionStorage.setItem('t', moment().valueOf());
    if(response.status!==200){
      message.error(res.message || 'Error')
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      const res = response.data;
      if(res.code === 0){
        return res
      } else {
        message.error(res.message);
      }
    }
  },
  error => {
    errorMsg(message);
    return Promise.reject(error.response.data)
  }
)

vueAxiosPlus.install = function (Vue, options) {
  axios.defaults.baseURL = options.baseURL || '';
  axios.defaults.timeout = options.timeout || 150000;
  let customHeader = options.customHeader || {};
  let expireTime = options.expireTime || 2 * 3600 * 1000
  let needAuthArry = options.needAuthArry || [];
  let expireCallback = expireCallback || null

  Vue.prototype.$axios = axios



  axios.interceptors.request.use(
    config => {
      return loginCheck(config, customHeader, expireTime, needAuthArry, expireCallback);
    },
    error => {
      return Promise.reject(error)
    }
  )

  Vue.prototype.$axiosPlus = function (
    url,
    method,
    _data = {},
    _invoking = 'invoking'
  ) {
    const param = method.toLowerCase() === 'get' ? 'params' : 'data'
    const opt = {
      url,
      method,
      [param]: _data
    }
    this[_invoking] = true;
    return new Promise((resolve, reject) =>{
      axios.request(opt)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
      .finally(() => {
        _invoking && (this[_invoking] = false)
      })
    })
  }

  Vue.mixin({
    data() {
      return {
        invoking: false,
      }
    }
  })
}

export default vueAxiosPlus
