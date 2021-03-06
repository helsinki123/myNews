<template>
  <div class="wrap">
    <div class="videos">
      <section class="video">
        <div class="video_play">
          <video
            class="rel_video"
            :src="contents.content"
            controls="controls"
          ></video>
        </div>
      </section>
      <section class="des_wrap">
        <div class="video_txt_t">
          <h1>{{ contents.title }}</h1>
        </div>
        <div class="video_txt_l">
          <div class="l_des">
            <h2>{{ contents.video_des }}</h2>
          </div>
          <div class="l_time">
            <span>{{ contents.writeTime }}</span>
          </div>
        </div>
      </section>
    </div>
    <!-- 截取detail页面 -->
    <div class="detail">
      <section class="main_content">
        <div class="news_img">
          <img :src="contents.video_url" alt />
        </div>
        <div class="comments">
          <h2>
            评论
            <span></span>
          </h2>
          <el-divider></el-divider>
        </div>
        <Comments></Comments>
      </section>
      <section class="sidebar">
        <SideBar></SideBar>
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
      good_num: 0,
    };
  },
  beforeRouteEnter(to, from, next) {
    // 让页面回到顶部
    document.documentElement.scrollTop = 0;
    // 调用 next()，一定要调用 next 方法，否则钩子就不会被销毁
    next();
  },
  created() {
    this.contents = JSON.parse(localStorage.getItem("detail"));
  },
  components: {
    SideBar,
    Comments,
  },
  methods: {
    goBack() {
      this.$router.push("home");
      //有些问题，返回的不是上级路由
    },
    // choose_font_size(e) {
    //   //content_size这个变量在switch里面是只读的属性，不能赋值
    //   //var content_size = document.getElementsByClassName('content_detail')[0].style.fontSize;
    //   switch (e.target.innerText) {
    //     case "超大":
    //       document.getElementsByClassName("content_detail")[0].style.fontSize =
    //         25 + "px";
    //       break;
    //     case "大":
    //       document.getElementsByClassName("content_detail")[0].style.fontSize =
    //         20 + "px";
    //       break;
    //     case "中等":
    //       document.getElementsByClassName("content_detail")[0].style.fontSize =
    //         18 + "px";
    //       break;
    //     case "小":
    //       document.getElementsByClassName("content_detail")[0].style.fontSize =
    //         15 + "px";
    //       break;
    //   }
    //   console.log(e.target.innerText);
    // },
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
    add_num() {
      this.good_num += 1;
    },
    //这是video的方法
    play_video() {
      document.getElementsByClassName("rel_video")[0].style.display = "block";
      document.getElementsByClassName("video_bg")[0].style.display = "none";
    },
  },
};
</script>

<style lang="scss" scoped>
//这是video的样式
.videos {
  padding-top: 141px;
  background: #333;
}
.video {
  background: #333;
  .video_bg {
    padding: 200px 0 0px 0;
    height: 200px;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    text-align: center;
    width: 100%;
    background-image: url(https://imagecloud.thepaper.cn/thepaper/image/83/438/7.jpg);
    text-align: center;
    &:hover .top > .share {
      display: block;
    }
    .top {
      position: relative;
      .share {
        display: none;

        width: 33px;
        height: 200px;
        background: url(//file.thepaper.cn/www/v3/img/share_bg.png) no-repeat;
        margin-left: 300px;
        position: absolute;
        bottom: 6px;
        left: -20px;
      }
    }

    .video_source {
      span {
        color: #fff;
        font-size: 16px;
      }
      .qihuan {
        display: inline-block;
        border: 1px solid #fff;
        border-radius: 50px;
        padding: 0 10px;
      }
      .toutiao {
        bottom: 10px;
        width: 35px;

        color: #fff;
        font-size: 15px;
        padding: 2px 8px;
        border: 1px solid #fff;
        border-radius: 10px;
        position: relative;
        right: -1346px;
      }
    }
    .video_title {
      margin: 10px auto;
      h1 {
        color: #fff;
        font-size: 28px;
        font-weight: bold;
        margin: 25px 0 0;
        text-align: center;
      }
    }
    .video_time {
      margin: 10px auto;
      color: #fff;
    }
  }
  .video_play {
    video {
      width: 100%;
      height: 500px;
      display: block;
      margin: 0 auto;
    }
  }
}
.des_wrap {
  margin: 20px 200px;
  display: flex;
  background: #333;
  .video_txt_t {
    h1 {
      color: #fff;
      font-size: 18px;
      font-weight: 700;
    }
  }
  .video_txt_l {
    h2 {
      color: #c8c8c8;
    }
    .l_time,
    .l_love,
    .l_reporter {
      font: 12px Microsoft Yahei;
      vertical-align: top;
      color: #5f5f5f;
    }
  }
  .video_txt_r {
    width: 350px;
    display: flex;
    a > .subscrib {
      width: 95px;
      height: 35px;
      border-radius: 50px;
      text-align: center;
      line-height: 35px;
      font-size: 16px;
      margin-top: 12px;
      display: block;
      // float: right;
      color: #fff;
      background: #00a5ec;
      border: 1px solid #00a5ec;
    }
    .r_icon {
      img {
        width: 50px;
        height: 50px;
        padding-top: 12px;
      }
    }
  }
}

.wrap {
  width: 100%;
  background: #333;
  .news_container {
    width: 80%;
    margin: 0px auto;
    background: #333;
  }
}
//这是detail的样式
$margin: 10px;
$font_color: #b4b4b5;
.showContent >>> img {
  max-width: 670px;
  max-height: 400px;
}
.detail {
  // padding-top: 150px;
  width: 80%;
  background: #f0f0f0;
  margin: 10px auto;
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
    // .content_share {
    //   width: 34px;
    //   height: 200px;
    //   position: fixed;
    //   bottom: 80px;
    //   left: 250px;
    //   background: url(//file.thepaper.cn/www/v3/img/share_bg.png) no-repeat;
    // }
  }
  .sidebar {
    width: 20%;
  }
}
</style>