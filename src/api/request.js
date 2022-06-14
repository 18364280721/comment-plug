import axios from 'axios'
import store from '@/store'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // api的base_url
  timeout: 15000, // 请求超时时间
  validateStatus: function(status) {
    return status >= 200 // 默认的
  }
})
// http request 拦截器
service.interceptors.request.use(
  config => {
    // 配置请求头
    config.headers = {
      //'Content-Type':'application/x-www-form-urlencoded',   // 传参方式表单
      'Content-Type':'application/json;charset=UTF-8',        // 传参方式json
      'Authorization': `Bearer ${store.state.moduleComment.plugTenantToken}`, // 这里自定义配置，这里传的是token
      'language': store.state.moduleComment.plugLanguage
    }
    return config
  },error => {
    Promise.reject(error)
  }
)

// http  respone拦截器
service.interceptors.response.use(
  response => {
    if (response.status >= 200 && response.status < 300) {
      return response
    }
  },
  error => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status)         // 传入响应码，匹配响应码对应信息
      return Promise.reject(response.data)
    } else {
      ElMessage.warning('网络连接异常,请稍后再试!')
    }
  }
)

export default service



// //引入移动端 vant UI 框架引入提示方式
// import { Toast, Dialog } from "vant";
// //引入路由实现跳转
// import Router from "@/router/index";
// //引入axios，结构出相应的方法进行使用
// import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

// export class Request {
//     public static axiosInstance: AxiosInstance;
//     // 初始化
//     public static init() {
//         // 创建axios实例
//         this.axiosInstance = axios.create({
//             //  import.meta.env.VITE_BASE_API使用的是创建的  .env.development 文件和.env.production文件中，不同开发模式的接口取值， as string 将值替换成字符类型
//             baseURL: import.meta.env.VITE_BASE_API as string,
//             timeout: 50000,
//         });
//         // 初始化拦截器
//         this.initInterceptors();
//         return axios;
//     };
//     // 初始化拦截器
//     public static initInterceptors() {
//         // 设置post请求头
//         this.axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//         /**
//          * 请求拦截器
//          * 每次请求前，如果存在token则在请求头中携带token
//          */
//         this.axiosInstance.interceptors.request.use(
//             (config?: AxiosRequestConfig<any>) => {
//                 let fig: any =  config;
//                 Toast.loading({ message: '请求中...', forbidClick: true, duration: 50000 });
//                 return config;
//             },(error: any) => {
//                 Toast.clear();
//                 console.log(error);
//             },
//         );
//         // 响应拦截器
//         this.axiosInstance.interceptors.response.use(
//             // 请求成功
//             (response: AxiosResponse) => {
//                 if (response.status === 200) {
//                     Toast.clear();
//                     if(response.data.code === 0) {
//                         return response.data;
//                     } else {
//                         Request.errorHandle(response.data);
//                         return response.data;
//                     }
//                 } else {
//                     Toast.clear();
//                     Request.errorHandle(response.data);
//                     return response;
//                 };
//             },
//             // 请求失败
//             (error: any) => {
//                 Toast.clear();
//                 const {response} = error;
//                 if (response) {
//                     // 请求已发出，但是不在2xx的范围
//                     Request.errorHandle(response);
//                     return Promise.reject(response.data);
//                 } else {
//                     Toast.fail('网络连接异常,请稍后再试!');
//                 };
//             }
//         );
//     };
//     /**
//      * http握手错误
//      * @param res 响应回调,根据不同响应进行不同操作
//      */
//     private static errorHandle(res: any) {
//         // 状态码判断
//         switch (res.code) {
//             case 401:
//                 Dialog.confirm({
//                     title: '系统提示',
//                     message: '登录状态已过期，您可以继续留在该页面，或者重新登录'
//                 }).then( () => {
//                     Router.push("/");
//                 })
//             break;
//             case 403: Toast.fail('当前操作无权限'); break;
//             case 404: Toast.fail('请求的资源不存在'); break;
//             case 500: Toast.fail(res.msg); break;
//             case 502: Toast.fail("连接失败"); break;
//             default: Toast.fail('连接错误');
//         };
//     };
// };
