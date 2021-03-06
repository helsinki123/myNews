<template>
  <div class="finance_wrap">
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
  data(){
    return{
      
    }
  },
  components: { SideBar ,TouTiao,List},
  methods:{
    
  }
}
</script>

<style lang="scss" scoped>
.finance_wrap {
  width: 80%;
  padding-top: 100px;
 display: flex;
 flex-direction: column;
  margin: 0 auto;
  .finance_left {
    width: 80%;
     display: flex;
  }
}
</style>