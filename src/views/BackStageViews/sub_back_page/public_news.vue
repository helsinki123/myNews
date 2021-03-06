<template>
  <div>
    <div class="head">
      <el-button @click="save">保存到数据库</el-button>
      <el-button type="primary">获取当前内容</el-button>
      <el-button type="primary">取消</el-button>
    </div>
    <div class="item">
      <label>请设置封面URL:</label><el-input v-model="newsCoverURL"></el-input>
    </div>
    <div class="item">
      <label>请输入标题:</label><br />
      <el-input class="title_inp" v-model="title"></el-input>
    </div>
    <div class="item">
      <label>请输入栏目:</label><br />
      <el-input v-model="category_name"></el-input>
    </div>
    <div class="item">
      <label>请输入子栏目:</label><br />
      <el-input v-model="sub_category_name"></el-input>
    </div>
    <div ref="demo1"></div>
    <h3>内容预览</h3>
    <textarea
      name=""
      id=""
      cols="170"
      rows="20"
      readonly
      v-model="editorData"
    ></textarea>
  </div>
</template>

<script>
// 引入 wangEditor
import wangEditor from "wangeditor";
import axios from "axios";
export default {
  data() {
    return {
      editor: null,
      editorData: "",
      title: "",
      newsCoverURL: "",
      category_name: "",
      sub_category_name: "",
    };
  },
  mounted() {
    const editor = new wangEditor(this.$refs.demo1);
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.editorData = newHtml;
    };
    // 创建编辑器
    editor.create();
    this.editor = editor;
  },
  methods: {
    //侧边导航栏
    getEditorData() {
      // 通过代码获取编辑器内容
      this.editorData = this.editor.txt.html();
      alert(editorData);
    },
    save() {
      const data = {
        content: this.editorData,
        category_name: this.category_name,
        sub_category_name: this.sub_category_name,
        title: this.title,
        newscoverurl: this.newsCoverURL
      };
      axios({
        url: "http://localhost:3002/public_news",
        method: "post",
        data: data,
      }).then((response) => {
        this.editorData = null,
        this.category_name = null,
        this.sub_category_name = null,
        this.title = null,
        this.newsCoverURL = null
      })
    },
    //发布新闻
    public_news() {
      this.$router.replace("/admin/public_news");
    },
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
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