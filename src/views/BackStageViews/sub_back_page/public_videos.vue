<template>
  <div>
    <div class="head">
      <el-button @click="save">保存到数据库</el-button>
      <el-button type="primary">获取当前内容</el-button>
      <el-button type="primary">取消</el-button>
    </div>
    <div class="item">
      <label>请输入标题:</label><br />
      <el-input class="title_inp" v-model="title"></el-input>
    </div>
    <div class="item">
      <label>请输入视频描述:</label><br />
      <el-input v-model="video_des"></el-input>
    </div>
    <div class="item">
      <label>请输视频url:</label><br />
      <el-input v-model="video_url"></el-input>
    </div>
  </div>
</template>

<script>
// 引入 wangEditor

export default {
  data() {
    return {
      title: "",
      newsCoverURL: "",
      category_name: "",
      sub_category_name: "",
      video_url: "",
      video_des: "",
    };
  },
  mounted() {},
  methods: {
    //侧边导航栏
    getEditorData() {
      // 通过代码获取编辑器内容
      this.editorData = this.editor.txt.html();
      alert(editorData);
    },
    save() {
      const data = {
        content: this.video_url,
        category_name: "视频",
        title: this.title,
        video_des: this.video_des,
      };
      this.axios({
        url: "http://localhost:3002/public_videos",
        method: "post",
        data: data,
      }).then((response) => {
        this.video_url = null,
        this.title = null,
        this.video_des = null
      });
    },
  },
};
</script>

<style lang="scss">
.head {
  height: 50px;
  background: green;
  line-height: 50px;
  display: flex;
  flex-direction: row-reverse;
  margin: 20px 2px;
  .el-button {
    margin: 2px;
  }
}
.item {
  display: flex;
  label {
    width: 200px;
  }
  .el-input {
    // display: inline;
    width: 80%;
    border-top-style: none;
    border-right-style: none;
    border-bottom: 2px solid black;
    border-left-style: none;
    .el-input__inner {
      border: none;
    }
  }
}
</style>