<template>
  <div class="home">
    <!-- 侧边导航栏 -->
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          :default-openeds="openeds"
          default-active="openeds"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="11">
            <template slot="title" unique-opened="true">
              <i class="el-icon-location"></i>
              <span>新闻管理</span>
            </template>
            <!-- @click.native="show_index" 要加.native才会运行  @click.native="show_index(item)" -->
            <el-submenu
              :index="item.program_index"
              v-for="item in this.$store.state.head_banner.message[0]
                .head_banner"
              :key="item.program_index"
            >
              <template slot="title">{{ item.banner_name }}</template>
              <el-menu-item
                :index="items.sub_index"
                v-for="items in item.category"
                :key="items.sub_index"
                ><span @click="get_news(items)">{{
                  items.title
                }}</span></el-menu-item
              >
            </el-submenu>

            <el-submenu index="7">
              <template slot="title" unique-opened="true">
                <span>主页</span>
              </template>
              <el-menu-item
                :index="main_item.program_index"
                v-for="main_item in this.$store.state.head_banner.message[0]
                  .head_banner"
                :key="main_item.program_index"
                ><span @click="show_index2(main_item)">{{
                  main_item.banner_name
                }}</span></el-menu-item
              >
            </el-submenu>
          </el-submenu>
          <el-menu-item index="12">
            <i class="el-icon-menu"></i>
            <span slot="title" @click="user_comments_manage">用户评论管理</span>
          </el-menu-item>
          <el-menu-item index="13">
            <i class="el-icon-document"></i>
            <span slot="title" @click="public_news">新闻发布模块</span>
          </el-menu-item>
          <el-menu-item index="15">
            <i class="el-icon-document"></i>
            <span slot="title" @click="public_videos">视频发布模块</span>
          </el-menu-item>
          <el-menu-item index="14">
            <i class="el-icon-setting"></i>
            <span slot="title" @click="to_users_management_page"
              >账号信息管理模块</span
            >
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <!-- 右侧展示页面 -->
    <div class="show_page">
      <!-- <button @click="test">test</button> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      default_index: localStorage.getItem("back_index"),
      openeds:["11"]
    };
  },
//   beforeRouteEnter(to,from,next){
//     if(to.meta.roles.includes(role)){
//       next(); //放行
//     }esle{
//       next({path:"/404"})
//       } //跳到404页面
//  },
  created() {
    this.openeds.push(JSON.parse(localStorage.getItem("back_index")))
  },
  watch:{
    get_index(){
      JSON.parse(localStorage.getItem("back_index"))
    }
  },
  methods: {
    test() {
      console.log(this.$store.state.head_banner.message[0].head_banner);
    },
    //侧边导航栏
    handleOpen(key, keyPath) {
      localStorage.setItem("back_index", JSON.stringify(key));
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //发布新闻
    public_news() {
      this.$router.replace("/admin/public_news");
    },
    public_videos() {
      this.$router.replace("/admin/public_videos");
    },
    //跳转到用户评论管理
    user_comments_manage() {
      this.$router.replace("/admin/user_comments");
    },
    show_news() {
      this.$router.replace("/admin/show_news");
    },
    to_users_management_page() {
      this.$router.replace("/admin/users_management");
    },
    //获取所有子新闻
    get_news(items) {
      console.log("点击了子栏目");
      let data = {
        program: items.program,
        sub_category: items.title,
      };
      console.log(data);
      this.axios({
        url: "http://localhost:3002/to_sub_category",
        method: "post",
        data: data,
      }).then((response) => {
        localStorage.setItem(
          "back_show_news",
          JSON.stringify(response.data.message)
        );
        console.log(response);
      });
      this.$router.push("/admin/show_news");
      this.$router.go(0);
    },
    show_index2(main_item) {
      console.log("点击了program");
      let data = {
        program: main_item.banner_name,
        sub_category: "",
      };
      console.log(main_item);
      this.axios({
        url: "http://localhost:3002/to_sub_category",
        method: "post",
        data: data,
      }).then((response) => {
        if(main_item.banner_name === "视频"){
          localStorage.setItem(
          "back_show_news",
          JSON.stringify(response.data.message)
        );
        }else{
          localStorage.setItem(
          "back_show_news",
          JSON.stringify(response.data.message.list)
        );
        }
        
        console.log(response);
         this.$router.push("/admin/show_news");
      this.$router.go(0);
      });
    },
  },
};
</script>

<style lang="scss">
.home {
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
  .tac {
    width: 14%;
    .el-col {
      width: 100%;
      .el-menu {
        width: 100%;
        height: 100vh;
        .menuitem {
          width: 100%;
        }
      }
    }
  }
  .show_page {
    width: 86%;
    height: 100vh;
    background: #fff;
  }
  .btn {
    position: absolute;
    right: 0;
    top: 0;
    padding: 5px 10px;
    cursor: pointer;
  }
  h3 {
    margin: 30px 0 15px;
  }
}
</style>