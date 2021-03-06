<template>
  <div class="head_top_wrap">
    <div class="list_wrap">
      <ul class="list">
        <div class="pp_logo">
          <img
            class="logo"
            src="../../assets/logo.png"
          />
        </div>
        <li
          class="item"
          v-for="item in this.$store.state.head_banner.message[0].head_banner"
          @click="tobe_red(item)"
          :key="item.index"
        >
          <!-- 要记住动态添加类名里的三目表达式怎么写，类名别忘了加 '' -->
          <a
            :to="item.src"
            @click="to_program_page(item)"
            :class="
              $store.state.current_page == item.banner_name ? 'become_red' : ''
            "
            >{{ item.banner_name }}</a
          >
          <div class="NewsCategory">
            <span class="triangle" v-show="item.category">
              <img
                src="//file.thepaper.cn/www/v3/img/prompt_top.png"
                width="16px"
                height="12px"
                alt
              />
            </span>
            <ul class="NewsCategoryList">
              <li
                class="NewsCategoryItem"
                v-for="items in item.category"
                :key="items.index"
              >
                <!-- sub_category -->
                <a @click.prevent="to_sub_category(items)">{{ items.title }}</a>
                <div class="titleDesc">
                  <div class="content">{{ items.des }}</div>
                  <div class="content_pr"></div>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li class="item">
           <a href="http://localhost:8080/yq">疫情</a>
        </li>
        <!-- 订阅模板 -->
        <li class="item">
          <a>订阅</a>
          <div class="NewsCategory">
            <span class="triangle">
              <img
                src="//file.thepaper.cn/www/v3/img/prompt_top.png"
                width="16px"
                height="12px"
                alt
              />
            </span>
            <ul class="NewsCategoryList">
              <li
                class="NewsCategoryItem"
                v-for="items in user_subscriptions"
                :key="items.title"
              >
                <a @click.prevent="to_sub_category(items)">{{ items.title }}</a>
                <div class="titleDesc">
                  <div class="content">bbb</div>
                  <div class="content_pr"></div>
                </div>
              </li>
            </ul>
          </div>
        </li>
        
        <div class="headRight">
          <div class="search_box">
            <el-button class="search_btn" @click="search">搜索</el-button>
          </div>
          <div class="right" v-if="no_login">
            <div class="rightItem" @click="show_dialog">登录</div>
            <div class="rightItem" @click="show_dialog2">注册</div>
          </div>

          <div class="after_login_right" v-if="user_name">
            <img :src="`http://localhost:3002/${user_message.head_portrait}`" class="rightItem" alt="" />
            <ul class="mine">
              <li class="item">{{ user_message.user_name }}</li>
              <li class="item" @click="$router.replace('/modifyinfo')">
                个人设置
              </li>
              <li class="item" @click="$router.replace('/modify_icon')">
                更换头像
              </li>
              <li class="item" @click="logout">退出</li>
            </ul>
            <div
              class="rightItem"
              @click="$router.replace('/mylabel_collection')"
            >
              收藏
            </div>
          </div>
        </div>
      </ul>
    </div>
    <!-- 正面 登录 -->
    <div class="box_container1">
      <div class="my_dialog front">
        <div class="dia_wrap">
          <div class="head">
            <span class="head_title">登录</span>
            <i class="fa fa-close" @click="close_dialog"></i>
          </div>
          <form class="form">
            <input id="phone_num" type="text" placeholder="手机号" />
            <input id="password" type="text" placeholder="请输入密码" />
          </form>
          <div class="label">
            <span @click="show_dialog2">注册</span>
          </div>
          <el-button @click="login">登录</el-button>
          <div class="social"></div>
        </div>
      </div>
      <div class="hide_mask"></div>
    </div>
    <!-- 背面 注册协议 -->
    <div class="box_container2">
      <div class="my_dialog front">
        <div class="dia_wrap">
          <div class="head">
            <span class="head_title">注册</span>
            <i class="fa fa-close" @click="close_dialog2"></i>
          </div>
          <form class="form">
            <input id="phone_num2" type="text" placeholder="手机号" />
            <input id="password2" type="text" placeholder="请输入密码" />
          </form>
          <el-button @click="regist" >注册</el-button>
          <div class="social"></div>
        </div>
      </div>
      <div class="my_dialog back2">
        <div class="dia_wrap">
          <div class="head">
            <span class="head_title">注册协议</span>
            <i class="fa fa-close" @click="close_dialog2"></i>
          </div>
          <div class="registration_agreement">
            <h1>用户使用协议</h1>
            为了更好地为您提供服务，请您在决定成为该新闻网的注册用户前仔细阅读以下协议，理解并同意后再进行注册。
            本协议是用户与该新闻网就注册、登录、使用新闻网等所涉及的事宜订立的协议。用户在使用前应当仔细阅读本协议，用户在向澎湃新闻网提出申请并正式入驻后即表示用户已完全充分理解、同意并自愿接受本协议所有内容。若用户对本协议的任何条款有异议，请停止注册、登录或继续使用新闻网提供的全部服务。
            保留自行决定在任何时候变更、修改、增加或删除本协议条款部分或全部内容的权利。用户有责任定期查看不时更新的本协议的内容。用户在更新的协议条款发布之后继续使用新闻网，即表示用户同意且接受该等更新。
          </div>
          <input class="myCheckbox" type="checkbox" @click="judgeChecked"/>
          <span>同意相关注册协议</span>
          <el-button class="agree" @click="to_front" :disabled=flag>确定</el-button>
        </div>
      </div>
      <div class="hide_mask"></div>
    </div>
  </div>
</template>

<script>
import { jsonp } from 'vue-jsonp';

export default {
  data() {
    return {
      isShow: false,
      dialogVisible: false,
      user_name: false,
      user_default_icon: "./1.jpg",
      head_banner_data: null,
      getData: false,
      show_login: false,
      show_regist: false,
      //判断是否登录
      no_login: true,
      search_text: "",
      //存储用户的订阅
      user_subscriptions: [],
      //用户信息
      user_message: {},
      //控制能否点击注册按钮
      flag:true,
    };
  },
  created() {
    this.$store.dispatch('get_head_banner')
    //获取用户基本信息
    if (localStorage.getItem("user_name")) {
      this.axios({
        url: "http://localhost:3002/user_contents",
        method: "POST",
        data: {
          user_name: JSON.parse(localStorage.getItem("user_name")),
        },
      }).then((res) => {
        this.user_subscriptions = res.data.message.user_subscriptions;
        localStorage.setItem("user_subscriptions",JSON.stringify(res.data.message.user_subscriptions))
      });
      this.user_message = JSON.parse(localStorage.getItem("user_message"));
      this.no_login = false;
    }
  },
  mounted() {
    //判断localStorage是否有值
    if (localStorage.user_name) {
      this.user_name = true;
    } else {
      this.user_name = false;
    }
    this.banner_fun();
  },
  methods: {
    //判断单选框是否选中
    judgeChecked(){
        this.flag = !this.flag;
    },
    search() {
      this.$router.replace({ path: "/search" });
    },
    Show() {
      if (!this.isShow) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    leave() {
      this.isShow = false;
    },
    showInp() {
      document.getElementsByClassName("inp")[0].style.width = 120 + "px";
      sessionStorage.search_content = document.getElementsByClassName(
        "inp"
      )[0].value;
      this.$router.replace("search");
    },
    banner_fun() {
      this.banner = this.$store.state.head_banner.head_banner;
    },
    tobe_red(item) {
      this.$store.state.current_page = item.banner_name;
    },
    //显示登陆组件
    show_dialog() {
      document.querySelector(".box_container1").style.display = "block";
    },
    show_dialog2() {
      document.querySelector(".box_container1").style.display = "none";
      document.querySelector(".box_container2").style.display = "block";
    },
    close_dialog() {
      document.querySelector(".box_container1").style.display = "none";
    },
    close_dialog2() {
      document.querySelector(".box_container2").style.display = "none";
      document.getElementsByClassName("back2")[0].classList.remove("back22");
    },
    fanzhuan() {
      document.querySelector(".front").classList.add("box_fan");
      document.getElementsByClassName("back")[0].classList.add("box2_fan");
    },
    to_regist_box() {
      this.regist();
      this.close_dialog();
      this.show_dialog2();
    },
    to_front() {
      document.getElementsByClassName("back2")[0].classList.add("back22");
    },
    regist() {
      let user_name = document.getElementById("phone_num2").value;
      let password = document.getElementById("password2").value;
      let data = {
        user_name: user_name,
        password: password,
      };
      this.axios({
        url: "http://localhost:3002/register",
        method: "post",
        data: data,
      }).then((response) => {
        alert("注册成功")
      });

      this.close_dialog();
      location.reload();
    },
    login() {
      let user_name = document.getElementById("phone_num").value;
      let password = document.getElementById("password").value;
      let data = {
        user_name: user_name,
        password: password,
      };
      this.axios({
        url: "http://localhost:3002/login",
        method: "post",
        data: data,
      }).then((response) => {
        //简单的身份逻辑判断
        if (response) {
          let user_name = response.data.message.user_name;
          if (user_name === "zzm") {
            alert("这是管理员");
            localStorage.setItem(
              "user_name",
              JSON.stringify(response.data.message.user_name)
            );
            localStorage.setItem(
              "user_message",
              JSON.stringify(response.data.message)
            );
            this.$router.replace("/admin");
          } else if (user_name !== "zzm") {
            alert("这是普通会员");
            localStorage.setItem(
              "user_name",
              JSON.stringify(response.data.message.user_name)
            );
            localStorage.setItem(
              "user_message",
              JSON.stringify(response.data.message)
            );
            this.no_login = false;
            //据说这种F5刷新不够友好
            location.reload();
          }
        }
      });
      this.close_dialog();
    },
    logout() {
      this.no_login = false;
      localStorage.user_name = "";
      location.reload();
    },
    //项目变红的标签 点击栏目
    to_program_page(item) {
      let data = {
        program: item.banner_name,
        sub_category: "",
      };
      this.axios({
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
      let that = this;
      setTimeout(() => {
        that.$router.push(item.src);
      }, 1500);
    },
    //跳转到子栏目 点击子栏目
    to_sub_category(items) {
      localStorage.setItem("sub_program_title", JSON.stringify(items.title));
      localStorage.setItem("program_name", JSON.stringify(items.program));
      let data = {
        program: items.program,
        sub_category: items.title,
      };
      this.axios({
        url: "http://localhost:3002/to_sub_category",
        method: "post",
        data: data,
      }).then((response) => {
        localStorage.setItem("list", JSON.stringify(response.data.message));
      });
      let that = this;
      setTimeout(() => {
        that.$router.push(items.src);
      }, 1500);
    },
  },
};
</script>

<style lang="scss" scoped>
.testcss {
  width: 100px;
  height: 100px;
  background: red;
}
//清除浮动不管用(对position fixed不管用，float可以)，不知道为什么
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}
.head_top_wrap {
  //  border: 1px solid black;
  position: fixed;
  background: #f0f0f0;
  z-index: 1001;
  width: 80%;
  margin: 0 auto;
  left: 0;
  right: 0;
}
.list {
  background-color: #ffffff;
  display: flex;
  list-style: none;
  z-index: 10;
  // padding-left: 153px;
  border-bottom: 1px solid #cdcdcd;
  height: 76px;
  .pp_logo {
    border-right: 2px solid #ccc;
    img {
      padding: 10px;
      height: 4rem;
    }
  }
  &:first-child > :first-child {
    padding-top: 0px;
  }
  .item {
    cursor: pointer;
    width: 40px;
    height: 74px;
    margin: 14px 10px 0 10px;
    text-align: center;
    line-height: 24px;
    &:hover > a {
      background: #e83829;
      border-radius: 3px;
    }
    .become_red {
      background: #e83829;
      border-radius: 3px;
      color: #fff;
    }
    &:hover > a {
      color: #fff;
    }
    &:hover > .NewsCategory {
      display: block;
    }
    .logo {
      width: 100px;
      // height: 100px;
      height: 4rem;
      padding-top: 0;
      border-right: 2px solid #e5e5e5;
    }
    .NewsCategory {
      display: none;
      position: absolute;
      top: 78%;
      .triangle {
        width: 10px;
        height: 10px;
        position: absolute;
        top: -5px;
        left: 14px;
      }
      .NewsCategoryList {
        background: #808080;
        display: flex;
        position: absolute;
        left: -40px;
        top: 10px;
        .NewsCategoryItem {
          position: relative;
          cursor: pointer;
          &:hover .titleDesc {
            display: block;
          }
        }
        .NewsCategoryItem > a {
          color: #e6e6e6;
          // padding: 30px 5px 0 6px;
          width: 18px;
          height: 110px;
          display: block;
          text-align: center;
          letter-spacing: 3.3px;
          line-height: 20px;
          font-size: 18px;
          word-wrap: break-word;
          border-right: 1px solid #808080;
          border-left: 1px solid #808080;
          margin-top: 0;
          &:hover {
            border-left: 1px solid #b9b9b9;
            border-right: 1px solid #646464;
            color: #ffffff;
            font-weight: bold;
          }
        }
        .titleDesc {
          display: none;
          position: absolute;
          bottom: -4px;
          left: 5px;
          width: 300px;
          height: 32px;
          background: url(//file.thepaper.cn/www/v3/img/pmtbg_lt30.png)
            no-repeat left center;
          // background-size: cover;
          padding-right: 8px;
          z-index: 999;
          .content {
            font-size: 12px;
            color: #e6e6e6;
            line-height: 24px;
            padding: 5px 4px 3px 10px;
            background: url(//file.thepaper.cn/www/v3/img/pmtbg_md.png)
              no-repeat 30px center;
            min-width: 40px;
            margin-left: 0px;
            float: left;
          }
          .content_pr {
            width: 8px;
            height: 32px;
            background: url(//file.thepaper.cn/www/v3/img/pmtbg_rt8.png)
              no-repeat right center;
            float: left;
          }
        }
      }
    }
    a {
      text-decoration: none;
      writing-mode: vertical-lr;
      display: inline-block;
      padding: 10px;
      color: #717171;
      font-size: 18px;
    }
  }
  .headRight {
    display: flex;
    padding-left: 475px;
    color: #717171;
    .search_box {
      margin: 20px 0 20px 20px;
      display: flex;
      .search_inp {
        width: 1200px;
      }
    }
    .app {
      cursor: pointer;
      position: relative;
      color: #8a8a8a;
      font-size: 14px;
      width: 76px;
      float: right;
      padding-left: 16px;
      line-height: 30px;
    }
    .app > img {
      display: none;
      width: 100px;
      height: 100px;
      position: fixed;
    }
    .app:hover > img {
      margin-top: 30px;
      display: block;
    }
    .right,
    .after_login_right {
      line-height: 20px;
      display: flex;
      position: relative;
      &:hover .mine {
        display: block;
      }
      .rightItem {
        height: 34px;
        margin: 22px -16px 0 10px;
        padding: 0 7px;
        // border-right: 2px solid #e6e6e6;
        text-align: center;
        writing-mode: vertical-lr;
        cursor: pointer;
        &:hover {
          color: skyblue;
        }
      }
      #subscribe:hover .mine2 {
        display: block;
        color: red;
      }
      .mine {
        flex-direction: column;
        position: absolute;
        top: 72px;
        right: -21px;
        width: 100px;
        background: #fff;
        display: none;
        .item {
          width: 100%;
          height: 50%;
          line-height: 24px;
          margin: 0;
          padding: 2px;
          &:hover {
            background: #00a5eb;
            color: #fff;
          }
        }
      }
      .mine2 {
        display: flex;
        flex-direction: column;
        float: left;
        top: 72px;
        left: 100px;
        width: 100px;
        height: 200px;
        background: #fff;
        display: block;
        .item {
          width: 100%;
          height: 50%;
          line-height: 24px;
          margin: 0;
          padding: 2px;
          &:hover {
            background: #00a5eb;
            color: #fff;
          }
        }
      }
    }
  }
}
.box_container1 {
  padding-top: 100px;
  perspective: 1000;
  position: relative;
  top: -100px;
  left: 38%;
  z-index: 3;
  display: none;
  .back {
    transform: rotateY(180deg);
  }
  .box_fan {
    transform: rotateY(180deg);
  }
  .box2_fan {
    transform: rotateY(360deg);
  }
  .my_dialog {
    position: absolute;
    left: 0;
    top: 100px;
    transition: transform 1.5s;
    backface-visibility: hidden;
    z-index: 9999 !important;
    .head {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      .head_title {
        font-size: 36px;
        color: #00a5eb;
      }
      .fa-close {
        font-size: 36px;
      }
    }
    .dia_wrap {
      width: 380px;
      height: 500px;
      background: #fff;
      margin: 10px;
      input {
        margin-left: 10px;
      }
    }
    .form {
      display: flex;
      flex-direction: column;
      margin: 10px;
      input {
        font: 12px/18px "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
        border-bottom: 1px solid #333;
        margin: 10px 10px 10px 0;
        height: 36px;
      }
      .valid {
        display: flex;
        .valid_input {
          width: 377px;
        }
        .valid_num {
          cursor: pointer;
          width: 78px;
          height: 25px;
          img {
            width: 60px;
            height: 28px;
            padding: 7px;
          }
        }
      }
    }
    .label {
      margin: 0 2px;
      display: flex;
      justify-content: space-around;
    }
    >>> .el-button {
      cursor: pointer;
      width: 340px;
      height: 48px;
      background: #00a5eb;
      line-height: 24px;
      text-align: center;
      font-size: 20px;
      color: #ffffff;
      margin-top: 50px;
      margin-left: 20px;
    }

    .social {
      text-align: center;
      margin: 5px auto;
      height: 100px;
      .social_icon {
        width: 220px;
        margin: 20px auto;
        margin-bottom: 0;
        padding: 20px;

        span {
          cursor: pointer;
          float: left;
          display: block;
          width: 40px;
          height: 40px;
          background: url(//file.thepaper.cn/www/v3/img/login_other.png)
            no-repeat;
          background-size: 140px;
        }
        .weibo {
          background-position: 0px 0px;
        }
        .weixin {
          background-position: -50px 0px;
          margin: 0 50px;
        }
        .qq {
          background-position: -100px 0px;
        }
      }
    }
    .registration_agreement {
      overflow-y: scroll;
      height: 230px;
      margin: 20px 10px;
      border: 1px solid #e6e6e6;
      h1 {
        font-weight: normal;
        font-size: 20px;
        text-align: center;
        margin-bottom: 10px;
        color: black;
      }
    }
  }
  .hide_mask {
    position: fixed;
    top: -79px;
    left: -730px;
    right: 0;
    bottom: -3000px;
    background: rgba(0, 0, 0, 0.3);
  }
}
.box_container2 {
  padding-top: 100px;
  perspective: 1000;
  // transition: all .3s;
  position: relative;
  top: -100px;
  left: 38%;
  z-index: 3;
  display: none;

  .back2 {
    color: red;
  }
  .back22 {
    color: blue;
    transform: rotateY(180deg);
  }
  .box_fan {
    transform: rotateY(180deg);
  }
  .box2_fan {
    transform: rotateY(360deg);
  }
  .my_dialog {
    position: absolute;
    left: 0;
    top: 100px;
    transition: transform 1.5s;
    backface-visibility: hidden;
    z-index: 9999 !important;
    .head {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      .head_title {
        font-size: 36px;
        color: #00a5eb;
      }
      .fa-close {
        font-size: 36px;
      }
    }
    .dia_wrap {
      width: 380px;
      height: 500px;
      background: #fff;
      margin: 10px;

      input {
        margin-left: 10px;
      }
    }
    .form {
      display: flex;
      flex-direction: column;
      margin: 10px;
      input {
        font: 12px/18px "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
        border-bottom: 1px solid #333;
        margin: 10px 10px 10px 0;
        height: 36px;
      }
      .valid {
        display: flex;
        .valid_input {
          width: 377px;
        }
        .valid_num {
          cursor: pointer;
          width: 78px;
          height: 25px;
          img {
            width: 60px;
            height: 28px;
            padding: 7px;
          }
        }
      }
    }
    .label {
      margin: 0 2px;
      display: flex;
      justify-content: space-around;
    }
    >>> .el-button {
      cursor: pointer;
      width: 340px;
      height: 48px;
      background: #00a5eb;
      line-height: 24px;
      text-align: center;
      font-size: 20px;
      color: #ffffff;
      margin-top: 50px;
      margin-left: 20px;
    }

    .social {
      text-align: center;
      margin: 5px auto;
      height: 100px;
      .social_icon {
        width: 220px;
        margin: 20px auto;
        margin-bottom: 0;
        padding: 20px;

        span {
          cursor: pointer;
          float: left;
          display: block;
          width: 40px;
          height: 40px;
          background: url(//file.thepaper.cn/www/v3/img/login_other.png)
            no-repeat;
          background-size: 140px;
        }
        .weibo {
          background-position: 0px 0px;
        }
        .weixin {
          background-position: -50px 0px;
          margin: 0 50px;
        }
        .qq {
          background-position: -100px 0px;
        }
      }
    }
    .registration_agreement {
      overflow-y: scroll;
      height: 230px;
      margin: 20px 10px;
      border: 1px solid #e6e6e6;
      h1 {
        font-weight: normal;
        font-size: 20px;
        text-align: center;
        margin-bottom: 10px;
        color: black;
      }
    }
  }
  .hide_mask {
    position: fixed;
    top: -79px;
    left: -730px;
    right: 0;
    bottom: -3000px;
    background: rgba(0, 0, 0, 0.3);
  }
}
</style>