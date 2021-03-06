import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/Home.vue'
import Videos from '@/views/Videos/Videos.vue'
import Detail from '@/Views/Detail/Detail.vue'
import CurrentAffairs from '@/views/CurrentAffairs/CurrentAffairs.vue'
import sub_category_common_page from '@/Views/CurrentAffairs/current_affairs_common_page/current_affairs_common_page.vue'
import Finance from '@/Views/Finance/Finance.vue'

import Subscribe from '@/Views/Subscribe/Subscribe.vue'
import Life from '@/Views/Life/Life.vue'
import Thoughts from '@/Views/Thoughts/Thoughts.vue'
import ModifyInfo from '@/Views/ModifyInfo/ModifyInfo.vue'
import Search from '@/Views/Search/Search.vue'
import ModifyIcon from '@/Views/ModifyIcon/ModifyIcon.vue'
import Collection from '@/Views/MyLabel/Collection/Collection.vue'
import adminHome from '@/Views/BackStageViews/adminHome.vue'
import yq from '@/Views/yq/yq'
import video_detail from '@/views/Videos/Video_detail/Video_detail.vue'
//用于跳转的空白页面
import supplierAllBack from "@/components/supplierAllBack.vue"
import supplierAllBack_copy from "@/components/supplierAllBack copy.vue"
//后台发布新闻
import public_news from "@/views/BackStageViews/sub_back_page/public_news.vue"
//发布视频
import public_videos from "@/views/BackStageViews/sub_back_page/public_videos.vue"
import user_comments from "@/views/BackStageViews/sub_back_page/user_comments.vue"
//后台新闻查看
import show_news from "@/views/BackStageViews/sub_back_page/show_news.vue"
//后台获取所有用户
import users_management from "@/views/BackStageViews/sub_back_page/users_management.vue"
Vue.use(VueRouter)
//允许跳转到当前路由
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/current_affairs',
    component: CurrentAffairs,
  },
  {
    path:"/current_affairs/:id",
    component:sub_category_common_page
  },
  {
    path:"/finance",
    component:Finance
  },
  {
    path: "/finance/:name",
    component: sub_category_common_page
  },
  {
    path:"/thoughts",
    component:Thoughts
  },
  {
    path: "/thoughts/:name",
    component: sub_category_common_page
  },
  {
    path:"/life",
    component:Life
  },
  {
    path: "/life/:name",
    component: sub_category_common_page
  },
  {
    path: '/video',
    component: Videos
  },
  {
    path:'/detail',
    component:Detail
  },
  {
    path:"/subscribe",
    component:Subscribe
  },
  {
    path:"/modifyinfo",
    component:ModifyInfo
  },
  {
    path:"/search",
    component:Search,
    meta:{
      keepAlive:true,
  }
  },
  {
    path:"/modify_icon",
    component:ModifyIcon
  },
  {
    path:"/mylabel_collection",
    component:Collection
  },
  {
    path:"/yq",
    component:yq
  },
  {
    path:"/admin",
    component:adminHome,
    meta: {
      roles: ['zzm']
    },
    children:[
      {
        path:'public_news',
        component: public_news
      },
      {
        path:'public_videos',
        component: public_videos
      },
      {
        path:'user_comments',
        component: user_comments
      },
      {
        path:'show_news',
        component: show_news
      },
      {
        path:'users_management',
        component: users_management
      }
    ]
  },
  {
    path:"/video_detail",
    component:video_detail
  },
  {
    path:"/supplierAllBack",
    component:supplierAllBack
  },
  {
    path:"/supplierAllBack_copy",
    component:supplierAllBack_copy
  },
  
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
