<template>
  <div class="political_wrap">
    <section class="top">
      <section class="political_head">
        <div class="img">
          <img
            src="https://imagecloud.thepaper.cn/thepaper/image/4/158/61.png"
            alt
          />
        </div>
        <div class="title">
          <h1>{{ sub_category_title }}</h1>
          <span v-show="flag" @click="cancelSubscribe"
            ><i class="fa fa-check" aria-hidden="true"></i>已订阅</span
          >
          <span v-show="!flag" @click="subscribe" class="subscribe">订阅</span>
        </div>
        <el-divider></el-divider>
      </section>
    </section>
    <section class="bottom">
      <section class="list">
        <List></List>
      </section>
      <section class="sideBar">
        <SideBar></SideBar>
         <swiper3></swiper3>
        <swiper3></swiper3>
        <swiper3></swiper3>
        <swiper3></swiper3>
      </section>
    </section>
  </div>
</template>

<script>
import List from "@/components/List/List.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import swiper3 from "@/components/Swiper/Swiper3.vue";

export default {
  data() {
    return {
      sub_category_title: "",
      flag: false,
    };
  },
  created() {
    console.log('加载了');
    this.sub_category_title = JSON.parse(
      localStorage.getItem("sub_program_title")
    );
    setTimeout(() => {
      JSON.parse(localStorage.getItem("user_subscriptions")).forEach((item) => {
      if (
        item.title === JSON.parse(localStorage.getItem("sub_program_title"))
      ) {
        this.flag = true;
      }
    });
    }, 1000);
  },
  watch: {
    $route(to, from) {
      //这里会存在bug，注意
      if (
        to.path === "/current_affairs/detail" ||
        to.path === "/finance/detail" ||
        to.path === "/life/detail" ||
        to.path === "/thoughts/detail"
      ) {
        this.$router.replace("/detail");
        return;
      }
      this.$router.go(0);
    },
  },
  components: { List, SideBar, swiper3 },
  methods: {
    subscribe() {
      let href = window.location.href;
      let index = window.location.href.indexOf("0/");
      let res = href.slice(index + 1);
      const data = {
        user_name: JSON.parse(localStorage.getItem("user_name")),
        program: JSON.parse(localStorage.getItem("program_name")),
        title: this.sub_category_title,
        src: res,
      };
      this.axios({
        url: "http://localhost:3002/subscribe",
        method: "POST",
        data: data,
      }).then((res) => {
        console.log("成功订阅");
        // this.$router.go(0)
      });
      this.flag = true;
    },
    cancelSubscribe() {
      const data = {
        user_name: JSON.parse(localStorage.getItem("user_name")),
        program: JSON.parse(localStorage.getItem("program_name")),
        title: this.sub_category_title,
      };
      this.axios({
        url: "http://localhost:3002/canclel_subscribe",
        method: "POST",
        data: data,
      }).then((res) => {
        console.log("已取消");
      });
      this.flag = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.political_wrap {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding-top: 70px;
  .political_head {
    margin: 0 auto;
    .img {
      margin: 20px auto;
      width: 100px;
      height: 100px;
      img {
        width: 100px;
        height: 100px;
      }
    }
    .title {
      display: flex;
      margin-left: 47%;
      color: #00a5e8;
      h1 {
        font-size: 22px;
        font-weight: lighter;
      }
      span {
        margin-left: 43%;
        cursor: pointer;
      }
    }
  }
  .bottom {
    display: flex;
    .sideBar{
      width: 20%;
    }
    .list{
      width: 80%;
    }
  }
}
</style>