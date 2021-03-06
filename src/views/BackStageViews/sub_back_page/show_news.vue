<template>
  <div>
    <el-table :data="news_contents" style="width: 100%">
      <el-table-column label="标题" prop="title"> </el-table-column>
      <!-- 这里不知道怎么控制显示 -->
      <el-table-column label="封面" v-if="news_contents.flag">
        <template slot-scope="scope">
          <video
            :src="news_contents.content"
            style="width: 150px; height: 150px"
          ></video>
        </template>
      </el-table-column>
      <el-table-column label="封面" v-else prop="index">
        <template slot-scope="scope">
          <img
            :src="scope.row.newscoverurl"
            alt=""
            style="width: 150px; height: 150px"
          />
        </template>
      </el-table-column>

      <el-table-column label="所属栏目" prop="category_name"> </el-table-column>
      <el-table-column label="所属子栏目" prop="sub_category_name">
      </el-table-column>
      <el-table-column label="发布时间" prop="writeTime"> </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          > -->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //新闻内容
      news_contents: [],
    };
  },

  created() {
    this.news_contents = JSON.parse(localStorage.getItem("back_show_news"));
    console.log(this.news_contents);
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
     const data = {
        category_name: row.category_name,
        sub_category_name: row.sub_category_name,
        title:row.title
      };
      console.log(data);
      this.axios({
        url: "http://localhost:3002/delete_news",
        method: "post",
        data: data,
      }).then((response) => {});
    },
    //  get_news(){
    //       let data = {
    //     program: this.program,
    //     sub_category: this.sub_category_name,
    //   };
    //   console.log(data);
    //   this.axios({
    //     url: "http://localhost:3002/to_sub_category",
    //     method: "post",
    //     data: data,
    //   }).then((response) => {
    //       this.news_contents = response.data.message
    //   })
    //   }
  }
};
</script>

<style>
.news_img {
  width: 50px;
  height: 40px;
}
</style>