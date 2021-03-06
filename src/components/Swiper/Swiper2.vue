<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in swiper_info" :key="item.index" @click="toDetailPage(item)">
        <img
          :src="item.newscoverurl"
          alt=""
        />
        <h1>{{item.title}}</h1>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>
 
<script>
export default {
  data(){
    return{
      swiper_info: []
    }
  },
  created(){
    this.swiper_info = JSON.parse(localStorage.getItem("hot_news"))
  },
  mounted() {
    let mySwiper = new Swiper(".swiper-container", {
      loop: true,
      prevButton: ".swiper-button-prev",
      nextButton: ".swiper-button-next",
    });
  },
  methods:{
    toDetailPage(item){
      localStorage.setItem('detail',JSON.stringify(item))
      this.$router.push('detail');
    }
  }
};
</script>
 
<style lang="scss" scoped>
h1{
    margin-top: 10px;
      font-size: 18px;
    color: #000;
    letter-spacing: 0;
    line-height: 24px;
    max-height: 72px;
    min-height: 60px;
    overflow: hidden;
}
.swiper-container {
  margin: 10px 10px 10px 0;
  height: 450px;
}
.swiper-slide{
  width: 100%;
  height: 100%;
}
.swiper-slide>p{
   width: 1200px;
   height: 20%;
}
.swiper-slide>img{
  width: 992px;
  height: 80%;
}

</style>