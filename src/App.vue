<template>
  <div id="app" class="clearfix">
    <div v-show="this.$route.path !== '/admin' && isBackPage === false">
      <keep-alive>
        <HeadTop></HeadTop>
      </keep-alive>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件 -->
        </router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件 -->
      </router-view>
      <el-backtop :visibility-height="60" :bottom="100">
        <div @click="dialogVisible = true">反馈</div>
      </el-backtop>
      <el-dialog
        title="反馈页面"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-form>
          <el-form-item label="说两句">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea"
            >
            </el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button :plain="true" @click="openVn">确定</el-button>
        </span>
      </el-dialog>
      <el-backtop :visibility-height="60">
        <i class="el-icon-caret-top"></i>
      </el-backtop>

      <section class="bottom">
        <div class="about">
          <a href>关于澎湃</a>
          <a href>关于澎湃</a>
          <a href>关于澎湃</a>
        </div>
        <div class="copyright">
          Copyright © 2014~2020 The Paper All rights
          reserved.上海东方报业有限公司 | 沪ICP证：沪B2-20170116 |
          <a href="http://www.beian.miit.gov.cn/">沪ICP备14003370号</a>
          | 互联网新闻信息服务许可证：31120170006
        </div>
        <div class="copyright">
          <a
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010602000299"
          >
            <img src="//file.thepaper.cn/www/v3/img/ghs.png" alt />
            <p>沪公网安备 31010602000299号</p>
          </a>
        </div>
      </section>
    </div>
    <div v-if="isBackPage">
      <router-view></router-view>
    </div>
    {{ get_url }}
  </div>
</template>

<script>
import HeadTop from "@/components/HeadTop/HeadTop";
export default {
  data() {
    return {
      //判断是否是后台页面
      isBackPage: false,
      currentSrc: "",
      changePreTitle: "",
      changeNextTitle: "",
      src: ["home", "video", "current_affairs", "finance", "thoughts", "life"],
      title: ["首页", "视频", "时事", "财经", "思想", "生活"],
      //是否显示反馈表单
      dialogVisible: false,
      //反馈的输入框
      textarea: "",
    };
  },
  computed: {
    get_url() {
      if (
        (this.$route.path.length > 6 &&
          this.$route.path.indexOf("admin") !== -1) ||
        this.$route.path === "/admin"
      ) {
        return (this.isBackPage = true);
      }
    },
  },
  components: { HeadTop },
  methods: {
    openVn() {
        const h = this.$createElement;
        this.$message({
          type: 'success',
          message: h('p', null, [
            h('span', null, '我们已收到您的反馈，谢谢！ '),
            h('i', { style: 'color: green' })
          ])
        });
         this.dialogVisible=false;
      }
  },
};
</script>

<style lang="scss" scoped>
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}
.head_ad {
  width: 1200px;
  min-height: 0px;
  margin: 0px auto;
  background: #f0f0f0;
  z-index: 1001;
}
body {
  background: #f0f0f0;
  #app {
    overflow: hidden;
    background: #f0f0f0;
    width: 100%;
    //height: 100%;
  }
}
.pre {
  text-align: center;
  line-height: 20px;
  font-size: 20px;
  padding: 10px;
  position: fixed;
  left: 0;
  top: 50%;
  color: black;
  // background: url("//file.thepaper.cn/www/v3/img/pjax-b-left.png") no-repeat;
  span {
    display: inline-block;
    width: 100%;
    height: 100%;
    .fa-angle-left {
      &:hover {
        font-size: 30px;
        width: auto;
        height: auto;
      }
    }
  }
  &:hover {
    background: #e83829;
    color: #fff;
  }
}
.next {
  text-align: center;
  line-height: 20px;
  font-size: 20px;
  padding: 10px;
  position: fixed;
  right: 0;
  top: 50%;
  color: black;
  //background: url("//file.thepaper.cn/www/v3/img/pjax-b-right.png") no-repeat;
  span {
    display: inline-block;
    width: 100%;
    height: 100%;
    .fa-angle-left {
      &:hover {
        font-size: 30px;
        width: auto;
        height: auto;
      }
    }
  }
  &:hover {
    background: #e83829;
    color: #fff;
  }
}
.bottom {
  margin-top: 1000px;
  .about {
    min-width: 1220px;
    height: 38px;
    line-height: 38px;
    background-color: #868686;
    border-bottom: 1px solid #a0a0a0;
    text-align: center;
    a {
      color: #ffffff;
      margin: 0 20px;
    }
  }
  .copyright {
    min-width: 1220px;
    height: 38px;
    line-height: 38px;
    color: #ffffff;
    background-color: #868686;
    text-align: center;
    a {
      height: 20px;
      line-height: 20px;
      margin: 0px 0px 0px 5px;
      color: #ffffff;
    }
  }
}
</style>