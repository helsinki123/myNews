<template>
  <div>
      <el-table
       height="850"
    :data="user_comments"
    style="width: 100%">
    <el-table-column
      label="姓名"
      prop="user_name">
    </el-table-column>
    <el-table-column
      label="文章id"
      prop="article_id">
      <!-- <template slot-scope="scope">
        <img :src=scope.row.newscoverurl>
      </template> -->
    </el-table-column>
    <el-table-column
      label="评论内容"
      prop="remark">
    </el-table-column>
    <el-table-column
      label="评论时间"
      prop="write_time">
    </el-table-column>
    <el-table-column
      align="right">
      
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
data(){
        return{
            user_comments: []
        }
    },
    created(){
         this.axios({
        url: "http://localhost:3002/get_user_comments",
        method: "get",
        
      }).then((response) => {
          console.log("rr");
          console.log(response);
          console.log("rr");
          this.user_comments = response.data.message
      })
    },
    methods:{
         handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
         const data = {
          id: row._id
        }
        this.axios({
          url: "http://localhost:3002/delete_users_comments",
          method: "post",
          data: data
        }).then(response => {
          this.$router.go(0)
        })
      },
    }
}
</script>

<style>

</style>