<template>
  <div class="survey_wrap">
    <CommonTemplate>
      <el-page-header
        @back="goBack"
        content="个人设置"
      ></el-page-header>
      <el-divider></el-divider>
      <form action="javascript:;" @submit="check_form">
        <div class="item">
          <div class="item_left">用户名:</div>
          <div class="input">
            <el-input
              placeholder="请输入4-20个英文字符或2-10个汉字"
              v-model="user_name"
              @blur="check_user_name"
            ></el-input>
          </div>
        </div>
        <div class="item">
          <div class="item_left">性别:</div>
          <div class="my_radio">
            <el-radio v-model="sex" label="男">男</el-radio>
            <el-radio v-model="sex" label="女">女</el-radio>
          </div>
        </div>
        <div class="item">
          <div class="item_left">地区:请选择</div>
          <div class="my_select">
            <select v-model="city">
              <option value="广东">广东</option>
              <option value="云南">云南</option>
              <option value="山西">山西</option>
            </select>
          </div>
        </div>
        <div class="item">
          <div class="item_left">简介:</div>
          <div class="input">
            <el-input
              placeholder="请输入0-200 个字符"
              v-model="short_des"
            ></el-input>
          </div>
        </div>
        <div class="item">
          <div class="item_left">手机号:</div>
          <div class="input">
            <el-input placeholder="请输入手机号" v-model="phone"></el-input>
          </div>
        </div>
        <div class="item">
          <div class="item_left">邮箱:</div>
          <div class="input">
            <el-input
              placeholder="请输入电子邮箱"
              v-model="email"
              @blur="sendEmail"
            ></el-input>
          </div>
        </div>
        <div class="item">
          <div class="item_left">原始密码:</div>
          <div class="input">
            <el-input v-model="old_psw"></el-input>
          </div>
        </div>
        <div class="item">
          <div class="item_left">新密码:</div>
          <div class="input">
            <el-input v-model="new_psw"></el-input>
          </div>
        </div>
        <div class="my_btn">
          <el-button type="primary" @click="show_form_value">确定</el-button>
        </div>
      </form>
    </CommonTemplate>
  </div>
</template>

<script>
import CommonTemplate from "@/components/CommonTemplate/CommonTemplate.vue";
export default {
  data() {
    return {
      page_url: "",

      //单选按钮
      sex: "1",
      //获取选择器的值
      city: "",
      //用户名
      user_name: "",
      short_des: "",
      phone: "",
      email: "",
      old_psw: "",
      new_psw: "",
    };
  },
  mounted() {
    this.page_url = encodeURIComponent(document.location);
  },
  computed: {
    //获取当前页面的url
    return_url: function () {
      // `this` 指向 vm 实例
      return encodeURIComponent(document.location);
    },
  },
  components: { CommonTemplate },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    show_form_value() {
      if(!this.user_name || !this.city 
      || !this.sex|| !this.short_des
      || !this.phone
      || !this.email
      || !this.old_psw
      || !this.new_psw
      ){
        alert("还有信息未填！请填完整")
      }
      let data = {
        old_name: localStorage.getItem("user_name"),
          user_name : this.user_name ,
          city : this.city ,
          sex : this.sex ,
          short_des : this.short_des ,
          phone : this.phone ,
          email : this.email ,
          old_psw : this.old_psw ,
          new_psw : this.new_psw
      }
      this.axios({
        url: "http://localhost:3002/update_user_info",
        method: "post",
        data: data
      }).then(response => {
        
      })
    },
    check_form() {},
    sendEmail () {
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (
        this.email != "" &&
        !regEmail.test(this.email)
      ) {
        // this.$message({
        //   message: "邮箱格式不正确",
        //   type: "error",
        // });
        alert("邮箱格式不正确")
        
      }
    },
    check_user_name(){
      
    }
  },
};
</script>

<style lang="scss" scoped>
.survey_wrap {
  padding-top: 120px;
  a {
    margin-left: 132px;
    margin-top: 50px;
  }
  >>> .el-page-header {
    margin-left: 136.875px;
    margin-top: 10px;
    margin-bottom: 50px;
    color: #00a5eb;
    .el-page-header__content {
      color: #00a5eb;
    }
  }
  #upload_img {
    margin-left: 136.875px;
    visibility: hidden;
  }
  .change_img {
    //margin-left: 136.875px;
  }
  .item {
    width: 70%;
    margin: 50px auto;
    display: flex;
    line-height: 24px;

    .item_left {
      width: 20%;
    }
    .input,
    .my_select,
    .my_radio {
      width: 70%;
      margin-left: 20px;
      .el-input {
        width: 100%;
      }
    }
  }
  .my_btn {
    width: 24%;
    margin-left: 500px;
    >>> .el-button {
      margin-left: 164px;
    }
  }
}
</style>