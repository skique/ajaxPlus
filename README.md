# vue-axios-plus1

A small wrapper for integrating axios to Vuejs

## How to install:
### npm:
`npm install --save axios ant-design-vue vue-axios-plus1`

### And in your entry file:
```
import Vue from 'vue'
import VueAxiosPlus from 'vue-axios-plus1'

Vue.use(vueAxiosPlus, {
  baseURL: "http://xx.xx.xx.xx:xxxx/",
  timeout: 150000,
  customHeader: {  // 公共请求头
    'SiteToken': "Bearer "+sessionStorage.getItem('token'),
  },
  expireTime: 2*3600*1000, // 登录过期时间
  needAuthArry: ['/customer/resource', '/customer/ali-oss', '/customer/account', '/customer/decorate'],  // 需要验证登录的api
  expireCallback:()=>{ // 登录过期回调
    console.log('token过期了！')
  },
})

```

### Script:
Just add 3 scripts in order: vue, axios, ant-design-vue and vue-axios-plus1 to your document.


### Usage:

```
this.$axiosPlus('/xxx', 'get').then((res)=>{
  console.log(res);
});
```


