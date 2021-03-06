<template>
  <div class="common_wrap">
    <section class="common_left">
      <slot></slot>
    </section>
    <section class="common_right">
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
.common_wrap {
  width: 75%;
  display: flex;
   margin: 0 auto;
  // margin-top: 120px;
 
  .common_left {
    width: 80%;
    margin: 0px 38px 38px 38px;
     background: #fff;
     border-right: 1px solid #f0f0f0;
     >>>.el-page-header{
    margin-left: 136.875px;
    margin-top: 10px;
    color: #00a5eb;
    .el-page-header__content{
      color: #00a5eb;
    }
  }
  }
  .common_right {
    width: 20%;
    background: #f0f0f0;
  }
}
</style>