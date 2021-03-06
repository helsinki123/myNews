<template>
  <div class="finance_wrap">
    <!-- <video controls="controls" 
    poster="http://cloudvideo.thepaper.cn/video/2b7a52aab54a40c2a07566ea71070f3a/hd/ccfe3bee-ff22-4304-9703-2c0d03194f83-5e05c188-6f2a-3788-5d6d-82d00f0715c7.mp4"
    src="http://cloudvideo.thepaper.cn/video/2b7a52aab54a40c2a07566ea71070f3a/hd/ccfe3bee-ff22-4304-9703-2c0d03194f83-5e05c188-6f2a-3788-5d6d-82d00f0715c7.mp4">
    </video> -->
    <section class="finance_left">
      <TouTiao></TouTiao>
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
export default {
  components: { SideBar ,TouTiao,List},
};
</script>

<style lang="scss" scoped>
.finance_wrap {
  width: 75%;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  .finance_left {
    width: 80%;
    display: flex;
  }
  .finance_right {
    
  }
}
</style>