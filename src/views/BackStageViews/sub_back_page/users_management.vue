<template>
  <div>
    <el-table :data="user_contents" style="width: 100%">
      <el-table-column label="姓名" prop="user_name"> </el-table-column>
      <el-table-column label="性别" prop="sex"> </el-table-column>
      <el-table-column label="类型" prop="user_type">
        <!-- <template slot-scope="scope">
        <img :src=scope.row.newscoverurl>
      </template> -->
      </el-table-column>
      <el-table-column label="城市" prop="city"> </el-table-column>

      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="open(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>

      <el-form>
        <el-form-item label="姓名">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="sex"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="type"></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="city"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendMessage">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_contents: [],
      dialogVisible: false,
      old_name:'',
      name:'',
      sex:'',
      type:'',
      city:''
    };
  },
  created() {
    this.axios({
      url: "http://localhost:3002/get_all_users",
      method: "get",
    }).then((response) => {
      console.log("rr");
      console.log(response);
      console.log("rr");
      this.user_contents = response.data.message;
    });
  },
  methods: {
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      sendMessage(row){
      console.log(row);
      const data = {
          user_name : this.name ,
          old_name: this.old_name
          // type : this.type,
          // city : this.city ,
          // sex : this.sex ,
      }
      this.axios({
        url: "http://localhost:3002/update_user_info_by_back",
        method: "post",
        data: data
      }).then(response => {
        console.log(response);
      })
        this.dialogVisible = false
      },
    open(index, row) {
      this.dialogVisible = true;
      this.old_name = row.user_name
    },
    handleEdit(index, row) {
      const data = {
        user_name: row.user_name,
      };
    },
    handleDelete(index, row) {
      console.log(index, row);
      const data = {
        user_name: row.user_name,
      };
      this.axios({
        url: "http://localhost:3002/delete_users",
        method: "post",
        data: data,
      }).then((response) => {
        this.$router.go(0);
      });
    },
  },
};
</script>

<style>
</style>