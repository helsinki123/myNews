<template>
  <div class="wrap">
    <div class="grid">
      <div class="grid-item item" v-for="item in videos" :key="item.index">
        <div class="item_head">
          <div class="guanzhu" @click="addto_collections(item)">+收藏</div>
        </div>
        <div class="video_box">
          <video class="video_img" :src="item.content"></video>
          <div class="video_bg" @click="to_video_detail(item)"></div>
        </div>
        <h1>{{ item.title }}</h1>
        <h2>{{ item.video_des }}</h2>
        <div class="share_container">
          <div class="share">
            <span>分享到</span>
            <div class="shareBox">
              <i class="fa fa-weibo" @click.stop="toWeibo"></i>
              <i class="fa fa-qq" @click.stop="shareToqqZone"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videos: null,
      collectionFlag:false
    };
  },
  created() {
    this.axios({
      url: "http://localhost:3002/get_videos",
      methods: "get",
    }).then((response) => {
      this.videos = response.data.message;
    });
  },
  methods: {
    //收藏视频
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
      })
    },
    to_video_detail(item) {
      localStorage.setItem("detail", JSON.stringify(item));
      this.$router.push("/video_detail");
    },
    toWeibo() {
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
.clearfix::after {
  content: "";
  display: block;
  clear: both;
  height: 0;
  overflow: hidden;
}
.wrap {
  margin: 10px auto;
  .grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      margin: 10px;
      border: 1px solid #242424;
      background-color: #333333;
      width: 420px;
      height: 500px;
      .item_head {
        display: flex;
        margin: 10px;
        justify-content: space-between;
        img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
        span {
          display: inline-block;
          margin-left: -85px;
        }
        .guanzhu {
          position: relative;
          cursor: pointer;
          float: right;
          width: 46px;
          height: 21px;
          background: -webkit-gradient(
            linear,
            left top,
            right top,
            from(rgba(1, 167, 236, 1)),
            to(rgba(14, 208, 253, 1))
          );
          background: -webkit-linear-gradient(
            left,
            rgba(1, 167, 236, 1) 0%,
            rgba(14, 208, 253, 1) 100%
          );
          background: linear-gradient(
            90deg,
            rgba(1, 167, 236, 1) 0%,
            rgba(14, 208, 253, 1) 100%
          );
          -webkit-box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.04);
          box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.04);
          border-radius: 2px;
          color: #fff;
          line-height: 20px;
          text-align: right;
          padding-right: 6px;
        }
      }
      .video_box {
        position: relative;
        width: 420px;
        height: 250px;

        .video_img {
          width: 420px;
          height: 250px;
        }
        .video_bg {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: url("http://www.clipartbest.com/cliparts/xig/n8g/xign8gyrT.png")
            no-repeat;
          background-size: 100% 100%;
        }
      }

      h1 {
        padding: 10px;
        font-size: 18px;
        color: #fff;
        line-height: 26px;
        font-weight: 800;
        margin: 16px 0 0;
        width: 400px;
        // display: inline-block;
      }
      h2 {
        color: #939393;
      }
      .share_container {
        transition: all 0.5s;
        margin: 10px;
        color: #939393;
        height: 28px;
        width: 0;
        overflow: hidden;
        .shareBox {
          line-height: 30px;
        }
        .share {
          display: flex;
          span {
            display: inline-block;
            line-height: 28px;
          }
          img {
            display: inline-block;
            width: 100px;
            height: 28px;
          }
        }
      }
      &:hover .share_container {
        width: 160px;
      }
      .itemBottom {
        margin: 10px;
        color: #939393;
      }
    }
  }

  .item:hover {
    background-color: #242424;
  }
}
</style>