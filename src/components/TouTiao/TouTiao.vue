<template>
  <div class="toutiao_wrap" @click="toDetailPage">
    <div class="img">
      <img :src="hot_news.newscoverurl" alt />
    </div>
    <div class="paike_content">
      <div class="title">
        <h1>{{ hot_news.title }}</h1>
      </div>
      <div class="share">
        <div class="share_img">
          <span>分享到</span>
          <div class="shareBox">
            <i class="fa fa-weibo" @click.stop="toWeibo"></i>
            <i class="fa fa-qq" @click.stop="shareToqqZone"></i>
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
      good_num: 0,
      hot_news: {},
    };
  },
  created() {
    this.hot_news = JSON.parse(localStorage.hot_news);
  },
  methods: {
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
    count_good() {
      this.good_num += 1;
    },
    open_box() {
      this.$alert(
        '<img src="https://imagecloud.thepaper.cn/thepaper/image/86/102/291.jpg" alt="" width="380px" height="80px"><p>打开微信，点击底部的“发现”，使用 “扫一扫” 即可将网页分享到我的朋友圈。</p>',
        "分享到微信朋友圈",
        {
          dangerouslyUseHTMLString: true,
          showConfirmButton: false,
        }
      );
    },
    toDetailPage() {
      const data = {
        like_num: this.hot_news.like_num,
        watch_num: this.hot_news.watch_num,
        title: this.hot_news.title,
        content: this.hot_news.content,
      };
      localStorage.setItem("detail", JSON.stringify(data));
      this.$router.push("detail");
    },
  },
};
</script>

<style lang="scss" scoped>
$margin: 10px;
.toutiao_wrap {
  margin-top: 10px;
  width: 96%;
  display: flex;
  background-color: #fff;
  &:hover .paike_content > .share > .share_img {
    width: 150px;
  }
  &:hover .img > img {
    transform: scale(1.2);
  }
  .img {
    width: 627px;
    height: 384px;
    overflow: hidden;
    img {
      width: 627px;
      height: 384px;
      transition: transform 0.5s;
    }
  }
  .paike_content {
    width: 300px;
    display: flex;
    flex-direction: column;
    position: relative;
    margin-left: 46px;
    .title {
      height: 200px;
      margin: $margin;
      padding: 20px 20px 20px 0;
      h1 {
        font-weight: 700;
        font-size: 24px;
        color: #000;
      }
    }
    .share {
      width: 93%;
      height: 20px;
      display: flex;
      margin: 10px;
      justify-content: space-between;
      overflow: hidden;
      .label {
        float: right;
        width: 40px;
        height: 20px;
        background: -webkit-linear-gradient(
          43deg,
          rgba(0, 197, 255, 1) 0%,
          rgba(0, 138, 255, 1) 100%
        );
        background: linear-gradient(
          47deg,
          rgba(0, 197, 255, 1) 0%,
          rgba(0, 138, 255, 1) 100%
        );
        color: #fff;
        line-height: 20px;
        text-align: center;
      }
      .share_img {
        transition: all 0.5s ease-in-out;
        width: 0px;
        height: 19px;
        overflow: hidden;
        span {
          font-size: 18px;
          float: left;
          margin-right: 12px;
          color: #666;
        }
        a {
          cursor: pointer;
          width: 20px;
          height: 21px;
          margin-left: 2px;
          display: block;
          float: left;
          background: url(//file.thepaper.cn/www/v3/img/share_bg278.png)
            no-repeat;
          background-size: 128px;
        }
        .weixin {
          background-position: -45px 1px !important;
        }
        .sina {
          background-position: -66px 1px !important;
        }
        .zone {
          background-position: -88px 1px !important;
        }
      }
    }
    .author {
      margin: $margin;
      display: flex;
      justify-content: space-between;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      a {
        line-height: 29px;
      }
      span {
        line-height: 29px;
        background: -webkit-linear-gradient(
          43deg,
          rgba(0, 197, 255, 1) 0%,
          rgba(0, 138, 255, 1) 100%
        );
        background: linear-gradient(
          47deg,
          rgba(0, 197, 255, 1) 0%,
          rgba(0, 138, 255, 1) 100%
        );
        color: #fff;
        box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.04);
        border-radius: 2px;
      }
    }
    .extra {
      display: flex;
      justify-content: space-between;
      margin: $margin;
      color: #b4b4b5;
      font-size: 12px;
    }
  }
}
</style>