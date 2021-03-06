<template>
  <div class="wrap">
    <div class="left_swiper">
      <div class="swiper-container gallery-top swiper-cont">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in $store.state.swiper_content.swiper_content" :key="index">
            <img v-lazy="item.swiper_img" alt />
            
          </div>
        </div>
      </div>
    </div>

    <div class="right_swiper">
      <div class="fa fa-chevron-up myPreBtn"></div>
      <div class="swiper-container gallery-thumbs swiper-nav" @mouseover="to_active">
        <div class="swiper-wrapper">
          <div class="swiper-slide" 
          v-for="(item,index) in $store.state.swiper_content.swiper_content" 
          :key="index" @click="to_detail(item)"
          >
            <div class="desc">
              <h2>{{item.title}}</h2>
              <div class="news_share">
                <div class="hide_news_share">
                  <span>分享到</span>
                  <a href class="tag">
                    <i class="fa fa-weixin"></i>
                    <i class="fa fa-weibo"></i>
                  </a>
                </div>
              </div>
              <div class="itemBottom">{{item.company}}|{{item.time}}|{{item.comments}}评论</div>
            </div>
          </div>
        </div>
      </div>
      <div class="fa fa-chevron-down my_next_btn"></div>
    </div>
  </div>
</template>
   
<script>

export default {
  data() {
    return {
      galleryTop: {},
      galleryThumbs: {},
    };
  },
  mounted() {
    this.$store.dispatch('get_swiper')
    var galleryThumbs = new Swiper(".gallery-thumbs", {
      height: 100,
      autoplay: false,
      direction: "vertical",
      spaceBetween: 1,
      slidesPerView: 3,
      slideToClickedSlide: true,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: ".fa-chevron-down",
        prevEl: ".fa-chevron-up",
      },
    });
    var galleryTop = new Swiper(".gallery-top", {
      autoplay: false,
      spaceBetween: 1,
      observer: true,
      on: {
        observerUpdate: function () {},
      },
      pagination: {
        el: ".swiper-pagination-h",
        clickable: true,
      },
      thumbs: {
        swiper: galleryThumbs,
      },
    });
  },
  methods: {
    to_active() {
      let thumbs_ai = this.galleryThumbs.activeIndex;
      this.galleryTop.initialSlide = thumbs_ai;
    },
    to_detail(item){
      this.$store.state.detail = item.detail_contents;
      this.$router.replace('/detail')
    }
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  width: 96%;
  .left_swiper {
    width: 70%;
  }
  .right_swiper {
    position: relative;
    width: 30%;
  }
  .myPreBtn {
    position: absolute;
    top: -15px;
    left: 50%;
    display: inline-block;
    width: 10px;
    height: 10px;

    z-index: 20;
  }
  .my_next_btn {
    position: absolute;
    bottom: -15px;
    left: 50%;
    display: inline-block;
    width: 10px;
    height: 10px;

    z-index: 20;
  }
  .gallery-top {
    width: 100%;
  }
  .gallery-thumbs {
    width: 100%;
    height: 388px;
    // padding-right: 50px;
    background: #f0f0f0;
    box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.1);
    .swiper-slide {
      height: 33%;

      .desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 10px;
        h2 {
          line-height: 24px;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .itemBottom {
          margin-bottom: 10px;
          font-size: 12px;
          color: #bbb;
        }
        .news_share {
          margin-bottom: 10px;
          transition: all 0.5s;
          width: 0px;
          height: 17px;
          overflow: hidden;
          .hide_news_share {
            display: flex;
            span {
              display: inline-block;
            }
            .tag {
              display: inline-block;
            }
          }
        }
      }

      &:hover {
        background: #fff;
      }
      &:hover .news_share {
      width: 200px;
    }
    }
    .swiper-slide-active {
      background-color: #fff;
    }
  }
}

.swiper-button-prev {
  position: absolute;
  top: -20px;
  left: 800px;
}
.swiper-button-next {
  position: absolute;
  bottom: 0;
  left: 700px;
}
</style>