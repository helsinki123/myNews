import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'swiper/swiper-bundle.min.css'
import echarts from 'echarts'
import 'echarts/map/js/china'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {Message} from 'element-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueCropper from 'vue-cropper'
import VueLazyLoad from 'vue-lazyload'
Vue.prototype.$echarts = echarts

//全局引入axios
//发送cookie才使用
// axios.defaults.withCredentials = true
Vue.prototype.axios = axios;
//图片剪裁插件
Vue.use(VueCropper)
// import 'cropperjs/dist/cropper.min.css'
 Vue.use(VueLazyLoad,{
     preLoad: 1.3,
     error:'../static/error.jpg',
     loading:'../static/loading.gif',
     attempt: 1
 })
//全局路由拦截
router.beforeEach((to,from,next)=>{
  if(to.path === '/home'){
    const data = {
      program: "首页",
      sub_category: "",
    };
  axios({
      url: "http://localhost:3002/to_sub_category",
      method: "post",
      data: data,
    }).then((response) => {
      localStorage.setItem(
        "hot_news",
        JSON.stringify(response.data.message.hot_news)
      );
      localStorage.setItem(
        "list",
        JSON.stringify(response.data.message.list)
      );
    });
  }
   if(to.path === '/admin'){
    const role = JSON.parse(localStorage.getItem('user_name'));
    if(to.meta.roles.includes(role)){
      next() //放行
      }else{
        alert('您不是管理员，请登录')
        next({path:"/home"})
      }
  }
  next()
})
Vue.use(ElementUI);
Vue.prototype.$message = Message
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
