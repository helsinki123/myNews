<template>
  <div class="finance_wrap">
    <section class="finance_left">
      <Swiper2></Swiper2>
      <SideBar></SideBar>
    </section>
    <section class="finance_right">
      <List></List>
    </section>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar/SideBar.vue";
import TouTiao from "@/components/TouTiao/TouTiao.vue";
import List from "@/components/List/List.vue";
import Swiper2 from "@/components/Swiper/Swiper2.vue"
export default {
  components: { SideBar ,TouTiao,List, Swiper2},
};
</script>

<style lang="scss" scoped>
.finance_wrap {
  width: 80%;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  .finance_left {
    display: flex;
  }
  
}
</style>