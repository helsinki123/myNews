<template>
  <div class="comment_wrap">
    <!-- 评论 -->
    <div class="comment">
      <div class="comment_left">
        <div class="left_img">
          <img src="https://file.thepaper.cn/clt/img/defHeadNew.png" alt />
        </div>
      </div>
      <div class="comment_right">
        <textarea placeholder="我要跟帖" id="my_textarea" cols="30" rows="10" v-model="my_textarea"></textarea>
        <div class="icommt_commt">
          <img src alt />
          <!-- <span>我要跟帖</span> -->
        </div>
        <div class="word_tip">
          已输入
          <span >{{my_textarea_length}}</span>字
        </div>
        <el-button @click="submit_comments">发表</el-button>
      </div>
    </div>
    <!--回复  -->
    
    <div class="reply_content">
      <div class="comments">
          <h2>
            评论
            <span>{{remarkNum}}</span>
          </h2>
          <el-divider></el-divider>
        </div>
      
      <div class="comment_que" v-for="(item,index) in remarks" :key="index">
        <div class="aq_write">
          <div class="aqwleft">
            <div class="hdimg">
              <img :src="`http://localhost:3002/${item.head_portrait}`"/>
            </div>
          </div>
          <div class="aqwright">
            <h3>
              <a
                href="ask_user_home.jsp?userId=1505150&commentId=30053014&contId=8873159&name=玛拉沁"
              >{{item.user_name}}</a>
              <span>{{item.write_time}}</span>
            </h3>
            <div class="ansright_cont">
              <a href>{{item.remark}}</a>
            </div>
          </div>
        </div>
      </div>

      <div class="comment_title">我也是有底线的</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      remarks:[],
      remarkNum:0,
      my_textarea:'',
      my_textarea_length:0
    };
  },
  watch:{
    my_textarea(e){
      this.my_textarea_length = e.length;
    }
  },
  created(){
    this.axios({
      url: "http://localhost:3002/get_comments_by_article_id",
      method: "post",
      data:{title: JSON.parse(localStorage.getItem('detail')).title}
    }).then((response) =>{
      const remarkNum = response.data.message.length;
      this.remarkNum = remarkNum;
      this.remarks = response.data.message.reverse()
    })
  },
  methods: {
    submit_comments() {
      this.axios({
      url: "http://localhost:3002/save_comments",
      method: "post",
      data:{
        //这里可以使用vuex里面的值，需要思考一下
        article_id: JSON.parse(localStorage.getItem('detail'))._id,
        user_name: JSON.parse(localStorage.getItem('user_message')).user_name,
        remark: document.getElementById("my_textarea").value,
        head_portrait:JSON.parse(localStorage.getItem('user_message')).head_portrait,
        title:JSON.parse(localStorage.getItem('detail')).title
      }
    }).then(() =>{
      const url = window.location.href;
      const index = url.indexOf("0/");
      const href = url.slice(index+1);
      if(href === "/video_detail"){
        this.$router.replace({
        path: "/supplierAllBack_copy"
      })
      }else if(href === '/detail'){
        this.$router.replace({
        path: "/supplierAllBack"
      })
      }
    })
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  .comment_left {
    .left_img > img {
      width: 50px;
      height: 50px;
    }
  }
  .comment_right {
    width: 618px;
    float: right;
    position: relative;
    textarea {
      max-width: 596px;
      min-width: 596px;
      width: 596px;
      height: 46px;
      position: relative;
      display: block;
      font-family: "Microsoft Yahei";
      font-size: 14px;
      padding: 5px 10px;
      background: none repeat scroll 0 0 #ffffff;
      border: 1px solid #d3d3d3;
      word-wrap: break-word;
      line-height: 22px;
      overflow-y: hidden;
    }
    .icommt_commt {
      position: absolute;
      top: 12px;
      left: 8px;
      line-height: 22px;
      color: #cacaca;
      font-size: 12px;
      overflow: hidden;
    }
    .word_tip {
      color: #cacaca;
      display: inline-block;
      font: 400 14px Microsoft Yahei;

      margin: 5px 0 0 calc(100% - 132px);
    }
    .el-button {
      cursor: pointer;
      width: 54px;
      height: 24px;
      line-height: 4px;
      float: right;
      background-color: #00a5e8;
      color: #ffffff;
      font-size: 12px;
      margin-top: 10px;
      text-align: center;
    }
  }
}
.reply_content {
  .comment_title {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    text-align: center;
  }
  .comment_que {
    display: flex;
    .aq_write {
      width: 670px;
      min-height: 67px;
      padding: 21px 0 0px;
      clear: both;
      .aqwleft {
        width: 40px;
        height: 40px;
        float: left;
        .hdimg {
          position: relative;
          width: 40px;
          height: 40px;
          background: url(//file.thepaper.cn/www/v3/img/user_n.png) no-repeat 0
            0;
          background-size: auto;
          background-size: 40px 40px;
          img{
            width: 50px;
            height: 50px;
          }
        }
      }
      .aqwright {
        width: 618px;
        float: right;
        position: relative;
        h3 {
          padding-left: 10px;
          height: 14px;
          line-height: 14px;
          font-size: 12px;
          font-weight: 400;
          color: #00a5eb;
          a {
            color: #00a5eb;
          }
          span {
            color: #8c8c8c;
            margin-left: 15px;
            font-family: Microsoft YaHei;
            font-size: 12px;
          }
        }
        .ansright_cont {
          padding-left: 10px;
          min-height: 20px;
          line-height: 20px;
          margin: 16px 0 18px;
          font-size: 14px;
          color: #4c4c4c;
          word-break: break-all;
          word-wrap: break-word;
          a {
            color: #4c4c4c;
            font-size: 14px;
            letter-spacing: 0;
            line-height: 22px;
          }
        }
        .ansright_time {
          position: absolute;
          top: -1px;
          right: 0px;
          height: 16px;
          line-height: 16px;
          font-size: 12px;
          color: #a0a0a0;
          a {
            color: #4c4c4c;
          }
        }
        .aqwright_bdbt {
          clear: both;
          border-bottom: 1px dashed #d9d9d9;
          padding-top: 6px;
        }
      }
    }
  }
}
</style>