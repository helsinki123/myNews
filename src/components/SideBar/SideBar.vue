<template>
  <div class="sideBar_wrap">
    <section class="sideBar">
      <section class="tab">
        <h3>热新闻</h3>
        <ul class="OneList" type="1">
          <li
            class="OneItem"
            v-for="(item, index) in this.hot_news"
            :key="index"
            @click="to_detail(item)"
          >
            <span :class="`num_hot${index}`"></span>
            <a href="javascript:;">{{ item.title }}</a>
            <el-divider></el-divider>
          </li>
        </ul>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      activeName2: "2",
      hot_news:''
    }
  },
  mounted() {
    //调用actions
    this.hot_news = JSON.parse(localStorage.getItem('side_bar_news'))
  },
  methods: {
    to_detail(item) {
      localStorage.setItem('detail',JSON.stringify(item))
      this.$router.push("detail");
    },
  },
};
</script>

<style lang="scss" scoped>
.sideBar_wrap {
  img {
    margin: 0 10px 20px 10px;
    width: 218px;
    height: 75px;
  }
  .tab {
    padding: 10px 0 10px 10px;
    .OneList > li {
      list-style: none;
    }
    h3 {
      height: 34px;
      line-height: 34px;
      font-size: 16px;
      color: #666666;
      font-weight: bold;
      text-indent: 8px;
      background-color: #ffffff;
      border-bottom: 1px solid #d0d0d0;
    }
    .el-divider {
      margin: 2px;
    }
  }
  .OneItem {
    list-style-type: circle;
    width: 220px;
    // display: flex;

    span {
      width: 20px;
      height: 14px;
      display: block;
      float: left;
      background: url(//file.thepaper.cn/www/v3/img/numhot_bg14.png) no-repeat;
      margin: 3px 0 6px;
    }
    .num_hot0 {
      background-position: 0 0 !important;
    }
    .num_hot1 {
      background-position: 0 -14px !important;
    }
    .num_hot2 {
      background-position: 0 -28px !important;
    }
    .num_hot3 {
      background-position: 0 -42px !important;
    }
    .num_hot4 {
      background-position: 0 -56px !important;
    }
    .num_hot5 {
      background-position: 0 -70px !important;
    }
    .num_hot6 {
      background-position: 0 -84px !important;
    }
    .num_hot7 {
      background-position: 0 -98px !important;
    }
    .num_hot8 {
      background-position: 0 -112px !important;
    }
    .num_hot9 {
      background-position: 0 -126px !important;
    }
    a {
      line-height: 20px;
      color: #333333;
      font-size: 12px;
      &:hover {
        color: skyblue;
      }
    }
  }

  .ans_hot {
    padding: 10px;
    h3 {
      height: 34px;
      line-height: 34px;
      font-size: 16px;
      color: #666666;
      font-weight: bold;
      text-indent: 8px;
      background-color: #ffffff;
      border-bottom: 1px solid #d0d0d0;
    }
    .hot_item {
      display: flex;
      flex-direction: column;
      padding: 10px 0 6px;
      padding-top: 10px;
      border-top: 1px solid #ffffff;
      border-bottom: 1px solid #b9b9b9;
      .topic {
        min-height: 18px;
        padding: 2px 7px 4px;
        background-color: #dcdcdc;
        a {
          line-height: 18px;
          font-size: 12px;
          color: #8c8c8c;
          font-weight: 400;
        }
      }
      .question {
        line-height: 20px;
        padding: 4px 0px;
        font-size: 14px;
        color: #01a5ec;
        a {
          color: #01a5ec;
        }
      }
      .ans {
        display: flex;
        .ans_content {
          line-height: 18px;
          color: #333333;
          font-size: 14px;
          max-height: 74px;
          overflow: hidden;
          word-wrap: break-word;
          word-break: break-all;
          a {
            color: #333333;
          }
        }
      }
    }
  }
}
</style>