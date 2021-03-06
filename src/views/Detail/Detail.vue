<template>
  <div class="wrap">
    <div class="detail">
      <section class="main_content">
        <div class="page_head">
          <el-page-header
            @back="goBack"
            title="返回上一页"
            content=""
          ></el-page-header>
        </div>
        <h1>{{ detail_info.title }}</h1>
        <div class="showContent" v-html="detail_info.content"></div>
        <div class="news_love">
          <div
            class="box"
            @click="save_like"
            :class="calendarFlag == true ? 'like_num_onlyRead' : ''"
          >
            <i class="fa fa-thumbs-up"> {{ like_num }}</i>
          </div>
          <div
            class="box"
            :class="collectionFlag == true ? 'collection_onlyRead' : ''"
            @click="addto_collections(detail_info)"
          >
            <i class="fa fa-heart-o">收藏</i>
          </div>
          <div class="box">
            <i class="fa fa-weibo" @click="shareToWeibo">微博</i>
            <i class="fa fa-qq" @click="shareToqqZone">QQ空间</i>
          </div>
        </div>
        <Comments></Comments>
      </section>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar/SideBar.vue";
import Comments from "@/components/Comments/Comments.vue";
export default {
  data() {
    return {
      contents: null,
      //点赞
      like_num: 0,
      detail_info: {},
      watch_num: 0,
      //判断是否点击点赞
      calendarFlag: false,
      //判断是否点击收藏
      collectionFlag: false,
      comments_num: "",
      myfromPath: "",
      title: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    // 让页面回到顶部
    document.documentElement.scrollTop = 0;
    // 调用 next()，一定要调用 next 方法，否则钩子就不会被销毁
    next();
  },
  created() {
    const detail = JSON.parse(localStorage.getItem('detail'));
    this.detail_info = detail

    this.like_num = detail.like_num;
    this.watch_num = detail.watch_num;
    this.title = detail.title;
    let data = {
      user_name: localStorage.user_name,
      title: detail.title,
      newscoverurl: detail.newscoverurl,
    };
    //保存浏览数量
    let new_watch_num = this.watch_num + 1;
    let save_watch_num = {
      program: detail.program,
      title: this.title,
      watch_num: new_watch_num,
    };
    this.axios({
      url: "http://localhost:3002/save_watch_num",
      method: "post",
      data: save_watch_num,
    }).then(() => {});
    //获取文章详情的评论数量
    this.axios({
      url: "http://localhost:3002/get_comments_num",
      method: "post",
      data: { article_id: detail._id },
    }).then((response) => {
      this.comments_num = response.data.message;
    });
  },
  components: {
    SideBar,
    Comments,
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    open() {
      this.$alert(
        '<img src="https://imagecloud.thepaper.cn/thepaper/image/86/102/291.jpg" alt="" width="380px" height="60px"><p>打开微信，点击底部的“发现”，使用 “扫一扫” 即可将网页分享到我的朋友圈。</p>',
        "分享到微信朋友圈",
        {
          dangerouslyUseHTMLString: true,
          showConfirmButton: false,
        }
      );
    },
    addto_collections(detail_info) {
      this.collectionFlag = true;
      let data = {
        user_name: JSON.parse(localStorage.getItem('user_name')),
        newscoverurl: detail_info.newscoverurl,
        title: detail_info.title,
        content: detail_info.content,
        _id: detail_info._id,
      };
      this.axios({
        url: "http://localhost:3002/addto_collections",
        method: "post",
        data: data,
      }).then((response) => {
      });
    },
    //保存点赞
    save_like() {
      this.like_num++;
      let new_like_num = this.detail_info.like_num + 1;
      let data = {
        program: this.detail_info.program,
        _id: this.detail_info._id,
        like_num: new_like_num,
        title: this.detail_info.title
      };
      this.axios({
        url: "http://localhost:3002/save_like",
        method: "post",
        data: data,
      }).then((response) => {
        this.calendarFlag = true;
      });
    },
    //分享到微博
    shareToWeibo() {
      window.open(
        "http://service.weibo.com/share/share.php?url=" +
          document.location.href +
          "&title=zzm&pic=1123&appkey="
      );
    },
    shareToqqZone() {
      var shareqqzonestring =
        "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=&url=" +
        window.location.href +
        "&pics=123";
      window.open(
        shareqqzonestring,
        "newwindow",
        "height=400,width=400,top=100,left=100"
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.like_num_onlyRead {
  pointer-events: none;
  i {
    color: royalblue !important;
  }
}
.collection_onlyRead {
  pointer-events: none;
  i {
    color: red !important;
  }
}
$margin: 10px;
$font_color: #b4b4b5;
.showContent{
  line-height: 30px;
}
.showContent >>> img {
  max-width: 670px;
  max-height: 400px;
}
.detail {
  padding-top: 100px;
  width: 75%;
  background: #f0f0f0;
  margin: 0 auto;
  display: flex;
  .main_content {
    position: relative;
    margin-right: 30px;
    width: 700px;
    min-height: 2200px;
    margin: 0 auto;
    border-right: 1px solid #dfdfdf;
    background-color: #ffffff;
    padding: 40px 134px 40px 135px;
    h1 {
      line-height: 44px;
      margin: 28px 0 34px;
      color: #333333;
      font-size: 32px;
      font-weight: normal;
    }
    .news_about {
      p {
        color: $font_color;
      }
      .font_size {
        float: right;
        margin-top: -10px;
        width: 38px;
        height: 18px;
        display: block;
        border: 1px solid #dfdfdf;
        line-height: 17px;
        font-size: 14px;
        color: #8e8e8e;
        text-align: center;
        cursor: pointer;
        &:hover .list {
          display: block;
        }
        .list {
          display: none;
          transition: all 5.5s;
          .item {
            width: 38px;
            height: 18px;
            border-right: 1px solid #dfdfdf;
            border-bottom: 1px solid #dfdfdf;
            border-left: 1px solid #dfdfdf;
            line-height: 17px;
            font-size: 14px;
            color: #8e8e8e;
            text-align: center;
            cursor: pointer;
            &:hover {
              color: #01a5ec !important;
            }
          }
        }
      }
    }
    .content {
      margin-top: 100px;
      margin-bottom: 46px;
      letter-spacing: 0.5px;
      p {
        line-height: 30px;
        color: #333333;
        // font-size: 16px !important;
        margin-bottom: 46px;
        letter-spacing: 0.5px;
      }
    }
    .news_info_extra {
      line-height: 20px;
      font-size: 14px;
      color: #b4b4b5;
      position: relative;
    }
    .news_love {
      line-height: 25px;
      color: #8e8e8e;
      font-size: 14px;
      margin-top: 12px;
      text-indent: 4px;
      border-top: 1px solid #dfdfdf;
      padding-top: 3px;
      margin: 50px auto;
      height: 36px;
      .box {
        width: 218px;
        height: 28px;
        padding-top: 12px;
        // display: inline-block;
        background-color: #f0f0f0;
        margin-right: 5px;
        float: left;
        text-align: center;
        a {
          color: $font_color;
          i {
            color: $font_color;
          }
        }
      }
    }
    .news_recommend {
      margin: 35px 0 20px;
      border-bottom: 1px solid #b9b9b9;
      height: auto;
      h2 {
        display: inline;
        cursor: pointer;
        border-bottom: 2px solid #ff8104;
        color: #222;
        font-size: 15px;
        font-weight: lighter;
      }
    }
    .recommend_content {
      height: 185px;
      margin: 0 auto;
      overflow: hidden;
      .re_item {
        width: 215px;
        height: 185px;
        float: left;
        margin-right: 12.5px;
        img {
          position: relative;
          width: 215px;
          height: 132px;
        }
        h2 {
          width: 215px;
          height: 40px;
          overflow: hidden;
          line-height: 20px;
          font-size: 14px;
          font-family: "微软雅黑";
          padding: 5px 0;
          font-weight: bold;
        }
      }
    }
    .content_share {
      width: 34px;
      height: 200px;
      position: fixed;
      bottom: 80px;
      left: 250px;
      background: url(//file.thepaper.cn/www/v3/img/share_bg.png) no-repeat;
    }
  }
  .sidebar {
    width: 20%;
  }
}
</style>