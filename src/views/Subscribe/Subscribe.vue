<template>
  <div class="subscribe_wrap clearfix">
    <section class="subscribe_left">
      <div class="tip">
          <p>登录后，把你最喜欢的栏目添加到这里我要登录</p>
      </div>
    </section>
    <section class="subscribe_right">
      <SideBar></SideBar>
    </section>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar/SideBar.vue";

export default {
  components: { SideBar },
};
</script>

<style lang="scss" scoped>
.clearfix::after{
  content: '';
  display: block;
  clear: both;
}
.subscribe_wrap {
  width: 75%;
  //padding-top: 100px;
  display: flex;
  margin: 0 auto;
  .subscribe_left {
    width: 80%;
    .tip{
        width: 800px;
        height: 800px;
        p{
            width: 400px;
            height: 17px;
            margin: 300px auto;
            padding-left: 180px;
        }
    }
  }
  .subscribe_right {
    width: 20%;
  }
}
</style>