<template>
  <div class="wrap">
    <section class="container">
      <section class="main">
        <TouTiao></TouTiao>
        <SideBar></SideBar>
      </section>
      <section class="content">
        <List></List>
      </section>
    </section>
  </div>
</template>

<script>
import mySwiper from "@/components/Swiper/Swiper.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import List from "@/components/List/List.vue";
import TouTiao from "@/components/TouTiao/TouTiao.vue";
export default {
  name: "carrousel",
  data() {
    return {
      activeName: "first",
      message:
        "新闻多一点 | 阜南庄台：洪水中的“希望之岛,新闻多一点 | 阜南庄台：洪水中的“希望之岛新闻多一点 | 阜南庄台：洪水中的“希望之岛新闻多一点 | 阜南庄台：洪水中的“希望之岛",
      hot_news: {},
    };
  },
  computed: {
    headline() {
      return this.$store.state.head_banner.head_banner;
    },
  },
  components: { mySwiper, List, SideBar, TouTiao },
  mounted() {
    this.hot_news = JSON.parse(localStorage.hot_news);
    var my_swiper = new Swiper(".my_swiper", {
      slidesPerView: 1,
      autoplay: true,
      // 定义slides的数量多少为一组
      slidesPerGroup: 1,
    });
    setInterval(() => {
      //获取到头的第一个字符
      let start = this.message.substring(0, 1);
      //获取到后面的所有字符
      let end = this.message.substring(1);
      //重新拼接得到新的字符串，并赋值给this.message
      this.message = end + start;
    }, 1500);
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  padding-top: 100px;
  .myH2 {
    padding-top: 100px;
    flex-wrap: nowrap;
    overflow: hidden;
    width: 100%;
    height: 30px;
    padding-top: 25px;
    background: #fff;
    margin: 20px 0;
    a {
      @keyframes mymove {
        0% {
          transform: translateX(0px);
        }
        100% {
          transform: translateX(-1170px);
        }
      }
      line-height: 5px;
      color: #333;
      font-size: 20px;
      white-space: nowrap;
      animation: mymove 20s infinite;
      animation-timing-function: linear;
      animation-delay: 2s;
    }
  }
  .main {
    display: flex;
    .content {
      width: 80%;
      background: #f0f0f0;
    }
    .SideBar_wrap {
      width: 20%;
    }
  }
}
</style>