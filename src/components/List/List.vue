<template>
  <div class="wrap">
    <div class="container">
      <div class="newsslidebd">
        <div>
          <i class="fa fa-bars" @click="showList">列表</i>
          <i class="fa fa-clone" @click="showCard">卡片</i>
        </div>
        <div id="he-plugin-simple"></div>
      </div>
      <ul class="card" v-show="$store.state.showCard">
        <li
          class="item"
          v-for="item in getnewsinfo"
          @click="toDetailPage(item)"
          :key="item.index"
        >
          <div id="mask">
            <div class="share">
              <span>分享到</span>
              <div class="shareBox">
                <i class="fa fa-weibo" @click.stop="toWeibo"></i>
                <i class="fa fa-qq" @click.stop="shareToqqZone"></i>
              </div>
            </div>
          </div>
          <img class="newsImg" :src="item.newscoverurl" alt="显示错误" />
          <h1 v-html="item.title"></h1>
          <div class="carBottom">
            <div class="itemBottom">
              <span>浏览次数:{{ item.watch_num }}</span>
              <span>发布时间:{{ item.writeTime }}</span>
            </div>
          </div>
        </li>
      </ul>
      <ul class="list" v-show="$store.state.showList">
        <li
          class="item"
          @click="toDetailPage(item)"
          v-for="item in getnewsinfo"
          :key="item._id"
        >
          <div class="img">
            <img :src="item.newscoverurl" alt />
          </div>
          <div class="desc">
            <h2 v-html="item.title"></h2>
            <div class="news_share">
              <div class="hide_news_share">
                <span>分享到</span>
                <a href class="tag">
                  <i class="fa fa-weibo" @click.stop="toWeibo"></i>
                  <i class="fa fa-qq" @click.stop="shareToqqZone"></i>
                </a>
              </div>
            </div>
            <div class="itemBottom">
              <span>浏览次数:{{ item.watch_num }}</span>
              <span>发布时间:{{ item.writeTime }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      card: this.$store.state.card,
      getnewsinfo: [],
    };
  },
  created() {
    this.getnewsinfo = JSON.parse(localStorage.getItem("list"));
  },
  mounted() {
    window.WIDGET = {
      CONFIG: {
        modules: "01234",
        background: 1,
        tmpColor: "FFFFFF",
        tmpSize: 16,
        cityColor: "FFFFFF",
        citySize: 16,
        aqiSize: 16,
        weatherIconSize: 24,
        alertIconSize: 18,
        padding: "10px 10px 10px 10px",
        shadow: "1",
        language: "auto",
        borderRadius: 5,
        fixed: "false",
        vertical: "middle",
        horizontal: "center",
        key: "5985c298d2b540c1bdf0d0af5329d792",
      },
    };
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0";
    document.getElementsByTagName("head")[0].appendChild(script);
  },
  methods: {
    showList() {
      this.$store.state.showList = true;
      this.$store.state.showCard = false;
    },
    showCard() {
      this.$store.state.showList = false;
      this.$store.state.showCard = true;
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
    toDetailPage(item) {
      const detailInfo = {
        like_num: item.like_num,
        watch_num: item.watch_num,
        program: item.category_name,
        newscoverurl: item.newscoverurl,
        title: item.title,
        content: item.content,
        _id: item._id,
      };
      localStorage.setItem("detail", JSON.stringify(detailInfo));
      //$router.push()会缓存，go(-1)能返回***********************
      this.$router.push("detail");
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  .newsslidebd {
    display: flex;
    justify-content: space-between;
    margin: 20px 10px;
    #he-plugin-simple{
      float: right;
    }
  }
  .card {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    #mask {
      transition: height 0.5s;
      display: block;
      height: 0;
      position: absolute;
      .share {
        width: 100%;
        height: 21px;
        display: none;
        .shareBox{
          margin-left: 10px;
        }
      }
    }
    .item {
      transition: all 1.2s ease-in-out;
      width: 279px;
      height: 280px;
      background: #ffffff;
      list-style: none;
      padding: 8px;
      margin: 10px 10px 10px 0;
      box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.1);

      &:hover {
        transform: translateY(-10px);
      }
      //&:hover > #mask 这个hover让我绕了一个大湾
      &:hover > #mask {
        width: 97%;
        height: 60px;
        background: url(//file.thepaper.cn/www/v3/img/share_bg_white.png)
          no-repeat;
        display: block;
        position: absolute;
        .share {
          display: flex;
          img {
            width: 100px;
            height: 25px;
            margin-left: 133px;
          }
        }
      }
      h1 {
        font-weight: bold;
        font-size: 18px;
      }
      .newsImg {
        width: 280px;
        height: 150px;
        padding-bottom: 10px;
      }

      .itemBottom {
        margin-top: 28px;
        span {
          display: inline-block;
          color: #bbb;
        }
      }
    }
  }
  .list {
    // width: 96%;
    background: #fff;
    .item {
      margin: 20px 20px 20px 0;
      padding: 10px;
      display: flex;
      border-bottom: 1px #bbb solid;
      box-sizing: border-box;

      .img > img {
        width: 200px;
        height: 150px;
        //padding: 10px;
      }
      .desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 10px 10px 10px 35px;
        h2 {
          line-height: 24px;
          font-size: 18px;
          font-weight: bold;
        }
        .itemBottom {
          font-size: 12px;
          color: #bbb;
        }
        .news_share {
          transition: all 0.5s;
          width: 0px;
          height: 17px;
          overflow: hidden;
          .hide_news_share {
            display: flex;
            span {
              display: inline-block;
              margin-right: 10px;
            }
            .tag {
              margin-left: 10px;
              z-index: 2;
              display: inline-block;
            }
          }
        }
        .tuijian {
          width: 34px;
          height: 17px;
          line-height: 16px;
          -webkit-transform: scale(0.9);
          transform: scale(0.9);
          text-align: center;
          float: right;
          color: #ffffff;
          font-size: 12px;
          overflow: hidden;
          background-image: linear-gradient(-90deg, #00d1f7 0%, #00a5eb 92%);
        }
      }
      &:hover .news_share {
        width: 200px;
      }
    }
  }
}
.tuijian {
  width: 34px;
  height: 17px;
  line-height: 16px;
  -webkit-transform: scale(0.9);
  transform: scale(0.9);
  text-align: center;
  float: right;
  color: #ffffff;
  font-size: 12px;
  overflow: hidden;
  background-image: linear-gradient(-90deg, #00d1f7 0%, #00a5eb 92%);
}
.carBottom {
  display: flex;
  justify-content: space-between;
  .tuijian {
    margin-top: 28px;
  }
}
</style>