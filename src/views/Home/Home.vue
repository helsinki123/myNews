<template>
  <div class="wrap">
    <section class="container">
      <!-- <section class="f">
        <a href class="my_a">{{ this.message }}</a>
      </section> -->
      <section class="main">
        <section class="content">
          <div class="swiperWrap">
            <mySwiper></mySwiper>
          </div>
          <section class="SideBar_wrap">
            <SideBar></SideBar>
          </section>
        </section>
        <section class="my_list">
          <List></List>
        </section>
      </section>
    </section>
  </div>
</template>
<script>
import mySwiper from "@/components/Swiper/Swiper2.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import List from "@/components/List/List.vue";


export default {
  name: "carrousel",
  data() {
    return {
      yiqingData: null,
      WIDGET: {
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
          key: "9c532d3a3ba94f5492383bdc86ceb678",
        },
      },
      activeName: "first",
      sort_list: [],
      message:
        "联播+ | 这个郑重承诺，习近平反复提及联播.扶贫无小事，习近平的这些话暖人心.焦点访谈：牢记嘱托 脱贫攻坚 张庄的脱贫路,zzm联播+ | 这个郑重承诺，习近平反复提及联播.扶贫无小事，习近平的这些话暖人心.焦点访谈：牢记嘱托 脱贫攻坚 张庄的脱贫路",
    };
  },
  computed: {
    headline() {
      return this.$store.state.head_banner.head_banner;
    },
  },
  components: { mySwiper, List, SideBar },
  mounted() {
    //获取排序
    this.axios({
      url: "http://localhost:3002/sort_hot_news",
      method: "get",
    }).then((response) => {
      let newres = response.data.message.reduce(function (a, b) {
        return a.concat(b);
      });
      this.sort_list = newres;
      const filterRes = newres.filter((item) => {
        return item.watch_num;
      });
      let res = filterRes.sort(this.sort_watch_num).slice(0, 10);
      localStorage.setItem("side_bar_news", JSON.stringify(res));
    });
  },
  methods: {
    test(){
      this.axios({
        url:"http://localhost:3002/test",
        method:'post',
        data:{name:'zzms'}
      }).then((res)=>{
        console.log(res);
      })
    },
    handleChange(val) {
    },
    getcookie(){
      alert(document.cookie)
    },
    fanzhuan() {
      document.querySelector(".box").classList.add("box_fan");
      document.getElementsByClassName("box2")[0].classList.add("box2_fan");
    },
    sort_watch_num(a, b) {
      return b.watch_num - a.watch_num;
    },
  }
};
</script>

<style lang="scss" scoped>
.swiperWrap{
  width: 992px;
  // margin-right: 190px;
}
.box_wrap {
  perspective: 1500;
  transition: all 1.5s;
  position: relative;
  //margin-top: 100px;
  width: 300px;
  height: 300px;
}
.box,
.box2 {
  width: 200px;
  height: 200px;
  position: absolute;
  left: 100px;
  top: 100px;
  perspective: 500;
  transition: transform 3.5s;
  backface-visibility: hidden;
}
.box {
  background: rosybrown;
}
.box2 {
  background: red;
  transform: rotateY(-180deg);
}
.box_fan {
  transform: rotateY(-180deg);
}
.box2_fan {
  transform: rotateY(-360deg);
}
.container {
  width: 80%;
  margin: 0 auto;
  padding-top: 100px;
  .myH2 {
    // box-shadow: 0 0 15px #f00 inset;
    // border: 1px solid black;
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    height: 40px;
    background: #fff;
    margin: 20px 0;
    padding: 10px;
    a {
      @keyframes mymove {
        0% {
          transform: translateX(0px);
        }
        100% {
          transform: translateX(-1170px);
        }
      }
      line-height: 44px;
      color: #333;
      font-size: 20px;
      white-space: nowrap;
      animation: mymove 20s infinite;
      animation-timing-function: linear;
      animation-delay: 2s;
    }
  }
  .main {
    //  border: 1px solid black;
    display: flex;
    flex-direction: column;
    .content {
      display: flex;
      background: #f0f0f0;
      .newsslidebd {
        margin: 20px 0;
      }
    }
  }
}
</style>