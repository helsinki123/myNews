<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="item in swiper_info"
        :key="item.index"
        @click="toDetailPage(item)"
      >
        <img :src="item.newscoverurl" alt="" />
        <p>{{ item.title }}</p>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <!-- <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div> -->
    <!-- 如果需要滚动条 -->
    <!-- <div class="swiper-scrollbar"></div> -->
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      swiper_info: [
        {
          newscoverurl:
            "https://lupic.cdn.bcebos.com/20200412/3037714295_14_740_528.jpg",
        },
        {
          newscoverurl:
            "https://t12.baidu.com/it/u1=78406577&u2=2059397670&fm=76",
        },
        {
          newscoverurl:
            "https://f11.baidu.com/it/u1=314917534&u2=1920882499&fm=76",
        },
        {
          newscoverurl:
            "https://f10.baidu.com/it/u1=1031777895&u2=1388472082&fm=76",
        },
      ],
    };
  },
  created() {
    // this.swiper_info = JSON.parse(localStorage.getItem("hot_news"))
  },
  mounted() {
    let mySwiper = new Swiper(".swiper-container", {
      speed: 2000,
      loop: true,
      observer: true,
      observeParents: true,
      autoplayDisableOnInteraction: false,
      autoplay: 1500,
      prevButton: ".swiper-button-prev",
      nextButton: ".swiper-button-next",
    });
  },
  methods: {
    toDetailPage(item) {
      localStorage.setItem("detail", JSON.stringify(item));
      this.$router.push("detail");
    },
  },
};
</script>
 
<style>
.swiper-container {
  margin: 10px;
  /* width: 1100px; */
  height: 250px;
}
.swiper-slide {
  width: 100%;
  height: 100%;
}
.swiper-slide > p {
  width: 1200px;
  height: 20%;
}
.swiper-slide > img {
  width: 250px;
  height: 80%;
}
</style>