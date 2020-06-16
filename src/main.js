import Vue from 'vue'
import App from './App.vue'

import vueAxiosPlus from './vueAxiosPlus';

// 设置测试token
sessionStorage.setItem('token', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODg1NTUwODgyNSIsImF1dGgiOlsiUk9MRV9TVE9SRV9NQUlOIl0sImNyZWF0ZWQiOjE1OTE5Mjg1MDIsImV4cCI6MTU5MjAxNDkwMn0.tF29rtLqXnBZfVf48YccwaWIUXLS7j6y-Kf7heuls79tX3gR5b-C0KmlPdNclgrA7x4btXjg7IQ9-ORdgqBDPA')

Vue.use(vueAxiosPlus, {
  baseURL: "http://10.0.41.175:8888/",
  timeout: 150000,
  customHeader: {
    'SiteToken': "Bearer "+sessionStorage.getItem('token'),
  },
  expireTime: 2*3600*1000,
  needAuthArry: ['/customer/resource', '/customer/ali-oss', '/customer/account', '/customer/decorate'],
  expireCallback:()=>{
    console.log('token过期了！')
  },
})

new Vue({
  el: '#app',
  render: h => h(App)
})
