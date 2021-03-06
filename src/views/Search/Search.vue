<template>
  <div class="search_wrap">
    <CommonTemplate>
      <div class="search_box">
        <el-input
          class="search_inp"
          type="text"
          value=""
          v-model="search_text"
        />
        <el-button class="search_btn" @click="search">搜索</el-button>
      </div>
      <h2 v-show="flag">搜索不到结果</h2>
      <section
        class="search_main_content"
        v-for="item of this.search_contents"
        :key="item.index"
        @click="toDetailPage(item)"
      >
        <img :src="item.newscoverurl" alt="无封面" />
        <h1>{{ item.title }}</h1>
        <p class="detail"></p>
        <div class="search_bottom">
          <span>有戏</span>
          <span>2020-08-08</span>
          <span> <i class="fa fa-commenting-o"></i>18 </span>
        </div>
      </section>
    </CommonTemplate>
  </div>
</template>

<script>
import CommonTemplate from "@/components/CommonTemplate/CommonTemplate.vue";
export default {
  data() {
    return {
      activeName: "first",
      search_contents: Array,
      obj: "zs",
      arr: null,
      flag: false,
      search_text: "",
    };
  },
  beforeMount() {
    this.search_content = JSON.parse(localStorage.getItem("search_content"));
  },
  mounted() {
    this.search_content = JSON.parse(localStorage.getItem("search_content"));
  },
  components: { CommonTemplate },
  methods: {
    goBack() {
      this.$router.push("home");
    },
    search() {
      this.axios({
        url: "http://localhost:3002/search_articles",
        method: "post",
        data: { search_text: this.search_text },
      }).then((response) => {
        let new_search_contents = response.data.message.reduce(function (a, b) {
          return a.concat(b);
        });
        this.search_contents = new_search_contents;
        if (this.search_contents.length === 0) {
          this.flag = true;
        } else {
          this.flag = false;
        }
      });
    },
    toDetailPage(item) {
      localStorage.setItem('detail',JSON.stringify(item))
      this.$router.push("detail");
    },
  },
};
</script>

<style lang="scss" scoped>
.search_box {
  // margin: 20px;
  width: 200px;
  display: flex;

  .search_inp {
    width: 1200px;
  }
  .search_btn {
    width: 60px;
    height: 40px;
  }
}
.search_main_content {
  margin: 50px auto;
  width: 600px;
  height: 105px;
  border-bottom: 1px solid #ccc;
  img {
    width: 100px;
    height: 80px;
    float: left;
    margin-right: 10px;
  }
  h1 {
    line-height: 24px;
    font-size: 18px;
    color: #4c4c4c;
    font-weight: 500;
  }
  p {
    line-height: 16px;
    font-size: 12px;
    margin-top: 10px;
    color: #666666;
  }
  .search_bottom {
    float: right;
    margin-left: 8px;
    height: 24px;
    color: #a0a0a0;
  }
}

.search_wrap {
  margin: 0px 30px 30px 30px;
  padding-top: 120px;
  h2{
    text-align: center;
  }
}
.search_head {
  margin: 20px;
  display: flex;
  .title {
    width: 130px;
    height: 40px;
    float: left;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(
      270deg,
      rgba(104, 209, 254, 1) 0%,
      rgba(0, 165, 235, 1) 100%
    );
  }
  .input {
    input {
      line-height: 26px;
      font-size: 15px;
      color: #000000;
      background-color: #f0f0f0;
      font-weight: bold;
      width: 696px;
      float: left;
      height: 40px;
      background: rgba(240, 240, 240, 1);
      border: 0;
    }
    .search_submit {
      float: right;
      margin: -36px 10px 5px 0;
      width: 30px;
      height: 30px;
      display: block;
      background: url(//file.thepaper.cn/www/v3/img/search1820.png) no-repeat
        center center;
      background-color: rgba(0, 0, 0, 0);
      background-color: #f0f0f0;
      border: 0;
      cursor: pointer;
    }
  }
}
.search_tabs {
  margin: 20px;
  >>> .el-tabs__item {
    padding: 0;
    margin: 0;
    width: 132px;
    text-align: center;
    text-decoration: none;
    color: #000;
    font-family: "微软亚黑";
    font-size: 18px;
    background: rgba(240, 240, 240, 1);
    &:hover {
      background: #fff;
    }
  }
  .search_tips {
    position: relative;
    margin: 10px 0;
    line-height: 24px;
    font-size: 12px;
    color: #a8a8a8;
    border-bottom: 1px solid #f0f0f0;
  }
  .search_content_sort {
    float: right;
    display: flex;
    font-size: 15px;
    color: #4c4c4c;
  }
  .search_main_content {
    margin-top: 50px;
    h1 {
      line-height: 24px;
      font-size: 18px;
      color: #4c4c4c;
      font-weight: 500;
    }
    p {
      line-height: 16px;
      font-size: 12px;
      margin-top: 10px;
      color: #666666;
    }
    .search_bottom {
      float: right;
      margin-left: 8px;
      height: 24px;
      color: #a0a0a0;
    }
  }
}
</style>