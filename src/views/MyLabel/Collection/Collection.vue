<template>
  <div class="survey_wrap">
    <CommonTemplate>
      <el-page-header @back="goBack" content="我的收藏"></el-page-header>
     <div class="search_main_content" v-for="item in user_collections" :key="item.index" @click="toDetailPage(item)">
              <img  v-if="item.newscoverurl" :src=item.newscoverurl />
              <img  v-else src="https://th.bing.com/th/id/R56d05f2befa90ab8557cbd8817e97e7a?rik=nd7p28cnL2fo0Q&riu=http%3a%2f%2ficon.chrafz.com%2fuploads%2fallimg%2f160919%2f1-1609191554250-L.png&ehk=I57pVlmK%2bCpDptwM2bU4yu%2fWQeR1tUEcnCngER1ZBg8%3d&risl=&pid=ImgRaw" alt="" >
              <h1>{{item.title}}</h1>
              <p
                class="detail"
              ></p>
              <div class="search_bottom">
                <span>{{item.collection_time}}</span>
              </div>
      </div>
    </CommonTemplate>
  </div>
</template>

<script>
import CommonTemplate from "@/components/CommonTemplate/CommonTemplate.vue";
export default {
  components: { CommonTemplate },
  data(){
    return{
      user_collections:{},
    }
  },
  created(){
    //默认滚到顶部
    // document.querySelector('.survey_wrap').scrollIntoView()
    window.scrollTo(0,0);
    //获取用户基本信息
    this.axios({
      url:"http://localhost:3002/user_contents",
      method:"POST",
      data:{
        user_name: JSON.parse(localStorage.getItem('user_name'))
      }
    }).then((res)=>{
      
      
      this.user_collections = res.data.message.user_collections.reverse()
    })
    
  
  },
  methods: {
     goBack() {
      this.$router.go(-1);
    },
    toDetailPage(item) {
      console.log(item);
      const detailInfo = {
        like_num: item.like_num,
        watch_num: item.watch_num,
        program: item.category_name,
        newscoverurl: item.newscoverurl,
        title: item.title,
        //视频的地址
        content: item.video_src,
        _id: item._id,
      };
      localStorage.setItem("detail",JSON.stringify(detailInfo))
      if(item.newscoverurl === null){
         this.$router.push("video_detail");
         return;
      }
      this.$router.push("detail");
    },
  },
};
</script>

<style lang="scss" scoped>
.survey_wrap {
  padding-top: 120px;
  .search_main_content {
    margin: 50px auto;
    width: 600px;
    height: 105px;
    border-bottom: 1px solid #ccc;
    img{
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
}
</style>