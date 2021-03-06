import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import {
  req_head_banner,
} from '../api'
Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    showCard: true,
    showList: false,
    head_banner: {},
    list: {},
    current_page: "",
    side_bar_content: {},
    swiper_content: {},
    detail: {},
    recommend_author: {},
    base_64:{},
    //用户的收藏，订阅，记录内容
    user_contents:{},
    list_contents:{},
    sub_category_lists:{},
    hot_news:{},
    sub_program_title: "",
    //保存用户基本信息
    user_message: {}
  },
  mutations: {
    get_head_banner(state, obj) {
      state.head_banner = obj
    }
  },
  actions: {
    //获取头部横幅列表
    async get_head_banner({ commit }) {
      const result = await req_head_banner()
      commit('get_head_banner', result)
    }
  }
})
