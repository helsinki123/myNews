<template>
  <div class="videos">
    <div class="wrap clearfix">
      <section class="news_container clearfix">
        <WaterFlow></WaterFlow>
      </section>
    </div>
  </div>
</template>

<script>
import WaterFlow from "@/components/WaterFlow/WaterFlow.vue";
export default {
  components: { WaterFlow },
  computed: {},
  methods: {
    play_video() {
      document.getElementsByClassName("rel_video")[0].style.display = "block";
      document.getElementsByClassName("video_bg")[0].style.display = "none";
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
    background-image: url("https://imagecloud.thepaper.cn/thepaper/image/100/32/221.png");
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
      display: none;
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
    // width: 80%;
    margin: 0px auto;
    background: #333;
  }
}
</style>