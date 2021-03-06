<template>
  <div class="wrap">
    <el-upload
      class="avatar-uploader"
      action="http://localhost:3002/test"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-change="handlechange"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button @click="update" class="btn">上传</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
    };
  },
  methods: {
    update() {
      this.axios({
        url: "http://localhost:3002/test2",
        method: "post",
        data: {
          user_name: JSON.parse(localStorage.getItem("user_name")),
        },
      }).then((res)=>{
        console.log(res);
         localStorage.setItem(
              "user_message",
              JSON.stringify(res.data.message)
            );
            this.$router.go(0);
      })
    },
    handlechange(file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess(res, file) {},
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap{
  padding-top: 120px;
}
.btn{
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.avatar-uploader{
  margin: 50px auto;
}
.avatar-uploader,
.el-upload {
  width: 178px;
  height: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover,
.el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
