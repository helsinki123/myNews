<template>
  <div>
    <div
      class="myChart"
      ref="map"
      :style="{ width: '620px', height: '620px' }"
    ></div>
    <el-divider>国内疫情</el-divider>
    <div class="wrap" v-if="flag">
      <div>
        <div class="yiqing">
          <div class="item">
            <span
              v-if="this.lastIncData.incrAbroadInputConfirmed !== undefined"
            >
              较昨日{{ lastIncData.incrAbroadInputConfirmed }}
            </span>
            <el-tag type="success">{{
              yqData.country.abroadInputConfirmed
            }}</el-tag>
            <span>境外输入</span>
          </div>
          <div class="item">
            <span> 较昨日{{ lastIncData.incCurConfirmed }} </span>
            <el-tag type="warning">{{ yqData.country.currentConfirm }}</el-tag>
            <span>现有确诊</span>
          </div>
          <div class="item">
            <span> 较昨日{{ lastIncData.incrHidden }} </span>
            <el-tag>{{ yqData.country.hidden }}</el-tag>
            <span>无症状感染者</span>
          </div>
        </div>
        <div class="yiqing">
          <div class="item">
            <span>
              较昨日<span>{{ lastIncData.incrConfirm }}</span>
            </span>
            <el-tag type="danger">{{ yqData.country.totalConfirmed }}</el-tag>
            <span>累计确诊</span>
          </div>
          <div class="item">
            <span>
              较昨日<span>{{ lastIncData.incrCured }}</span>
            </span>
            <el-tag type="success">{{ yqData.country.totalCured }}</el-tag>
            <span>累计治愈</span>
          </div>
          <div class="item">
            <span>
              较昨日<span>{{ lastIncData.incrDeath }}</span>
            </span>
            <el-tag type="info">{{ yqData.country.totalDeath }}</el-tag>
            <span>累计死亡</span>
          </div>
        </div>
      </div>

      <el-table class="chinayq" :data="yqData.provinceArray" style="width: 80%">
        <el-table-column prop="childStatistic" label="地区" width="180">
        </el-table-column>
        <el-table-column prop="currentConfirm" label="现有确诊" width="180">
        </el-table-column>
        <el-table-column prop="totalConfirmed" label="累计确诊">
        </el-table-column>
        <el-table-column prop="totalDeath" label="死亡"> </el-table-column>
      </el-table>
      <el-divider>国外疫情</el-divider>
      <div>
        <div class="yiqing">
          <div class="itemForeign">
            <span>
              较昨日+<span>{{ yqData.abroadSum.lastIncData.incrConfirm }}</span>
            </span>
            <el-tag type="warning">{{
              yqData.abroadSum.totalConfirmed
            }}</el-tag>
            <span>累计确诊</span>
          </div>
          <div class="itemForeign">
            <span>
              较昨日+<span>{{
                yqData.abroadSum.lastIncData.incCurConfirmed
              }}</span>
            </span>
            <el-tag type="danger">{{ yqData.abroadSum.currentConfirm }}</el-tag>
            <span>现有确诊</span>
          </div>
          <div class="itemForeign">
            <span>
              较昨日+<span>{{ yqData.abroadSum.lastIncData.incrCured }}</span>
            </span>
            <el-tag type="success">{{ yqData.abroadSum.totalCured }}</el-tag>
            <span>累计治愈</span>
          </div>
          <div class="itemForeign">
            <span>
              较昨日+<span>{{ yqData.abroadSum.lastIncData.incrDeath }}</span>
            </span>
            <el-tag type="info">{{ yqData.abroadSum.totalDeath }}</el-tag>
            <span>累计死亡</span>
          </div>
        </div>
      </div>
      <el-collapse class="foreignyq">
        <el-collapse-item title="欧洲" name="1">
          <el-table
            :data="yqData.continentDataList[0].countriesData"
            style="width: 100%; margin-bottom: 20px"
            border
            default-expand-all
          >
            <el-table-column
              prop="childStatistic"
              label="地区"
              sortable
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="currentConfirm"
              label="当前确诊"
              sortable
              width="180"
            >
            </el-table-column>
            <el-table-column prop="totalConfirmed" label="累计确诊">
            </el-table-column>
            <el-table-column prop="totalCured" label="治愈"> </el-table-column>
            <el-table-column prop="totalDeath" label="死亡"> </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="北美洲" name="2">
          <el-table
            :data="yqData.continentDataList[1].countriesData"
            style="width: 100%; margin-bottom: 20px"
            border
            default-expand-all
          >
            <el-table-column
              prop="childStatistic"
              label="地区"
              sortable
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="currentConfirm"
              label="当前确诊"
              sortable
              width="180"
            >
            </el-table-column>
            <el-table-column prop="totalConfirmed" label="累计确诊">
            </el-table-column>
            <el-table-column prop="totalCured" label="治愈"> </el-table-column>
            <el-table-column prop="totalDeath" label="死亡"> </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="南美洲" name="3">
          <el-table
            :data="yqData.continentDataList[2].countriesData"
            style="width: 100%; margin-bottom: 20px"
            border
            default-expand-all
          >
            <el-table-column
              prop="childStatistic"
              label="地区"
              sortable
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="currentConfirm"
              label="当前确诊"
              sortable
              width="180"
            >
            </el-table-column>
            <el-table-column prop="totalConfirmed" label="累计确诊">
            </el-table-column>
            <el-table-column prop="totalCured" label="治愈"> </el-table-column>
            <el-table-column prop="totalDeath" label="死亡"> </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="亚洲" name="4">
          <el-table
            :data="yqData.continentDataList[3].countriesData"
            style="width: 100%; margin-bottom: 20px"
            border
            default-expand-all
          >
            <el-table-column
              prop="childStatistic"
              label="地区"
              sortable
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="currentConfirm"
              label="当前确诊"
              sortable
              width="180"
            >
            </el-table-column>
            <el-table-column prop="totalConfirmed" label="累计确诊">
            </el-table-column>
            <el-table-column prop="totalCured" label="治愈"> </el-table-column>
            <el-table-column prop="totalDeath" label="死亡"> </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="非洲" name="5">
          <el-table
            :data="yqData.continentDataList[4].countriesData"
            style="width: 100%; margin-bottom: 20px"
            border
            default-expand-all
          >
            <el-table-column
              prop="childStatistic"
              label="地区"
              sortable
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="currentConfirm"
              label="当前确诊"
              sortable
              width="180"
            >
            </el-table-column>
            <el-table-column prop="totalConfirmed" label="累计确诊">
            </el-table-column>
            <el-table-column prop="totalCured" label="治愈"> </el-table-column>
            <el-table-column prop="totalDeath" label="死亡"> </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="大洋洲" name="6">
          <el-table
            :data="yqData.continentDataList[5].countriesData"
            style="width: 100%; margin-bottom: 20px"
            border
            default-expand-all
          >
            <el-table-column
              prop="childStatistic"
              label="地区"
              sortable
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="currentConfirm"
              label="当前确诊"
              sortable
              width="180"
            >
            </el-table-column>
            <el-table-column prop="totalConfirmed" label="累计确诊">
            </el-table-column>
            <el-table-column prop="totalCured" label="治愈"> </el-table-column>
            <el-table-column prop="totalDeath" label="死亡"> </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="其他" name="7">
          <el-table
            :data="yqData.continentDataList[6].countriesData"
            style="width: 100%; margin-bottom: 20px"
            border
            default-expand-all
          >
            <el-table-column
              prop="childStatistic"
              label="地区"
              sortable
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="currentConfirm"
              label="当前确诊"
              sortable
              width="180"
            >
            </el-table-column>
            <el-table-column prop="totalConfirmed" label="累计确诊">
            </el-table-column>
            <el-table-column prop="totalCured" label="治愈"> </el-table-column>
            <el-table-column prop="totalDeath" label="死亡"> </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { jsonp } from "vue-jsonp";
export default {
  data() {
    return {
      yqData: Object,
      lastIncData: Object,
      flag: false,
    };
  },
  created() {
    jsonp(
      "https://cdn.mdeer.com/data/yqstaticdata.js?callback=callbackstaticdata",
      {
        myCustomUrlParam: "veryNice",
        callbackName: "callbackstaticdata",
      }
    ).then((res) => {
      this.yqData = res;
      this.lastIncData = res.country.lastIncData;
      this.flag = true;
    });
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.map);
      // 绘制图表
      myChart.setOption({
        title: {
          text: "国内现有确诊",
          subtext: "数据来自mdeer.com",
          sublink: "https://cdn.mdeer.com/data/yqstaticdata.js",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>{c}",
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        visualMap: {
          min: 0,
          max: 1000,
          text: ["High", "Low"],
          realtime: false,
          calculable: true,
          inRange: {
            color: ["lightskyblue", "yellow", "orangered"],
          },
        },
        series: [
          {
            name: "现有确诊",
            type: "map",
            mapType: "china", // 自定义扩展图表类型
            label: {
              show: true,
            },
            data: [
              { name: "香港", value: 848 },
              { name: "黑龙江", value: 500 },
              { name: "河北", value: 438 },
              { name: "吉林", value: 349 },
              { name: "上海", value: 121 },
              { name: "台湾", value: 73 },
              { name: "广东", value: 51 },
              { name: "北京", value: 50 },
              { name: "陕西", value: 25 },
              { name: "天津", value: 21 },
              { name: "福建", value: 16 },
              { name: "辽宁", value: 14 },
              { name: "四川", value: 12 },
              { name: "内蒙古", value: 12 },
              { name: "山西", value: 11 },
              { name: "浙江", value: 10 },
              { name: "湖南", value: 10 },
              { name: "江苏", value: 8 },
              { name: "甘肃", value: 5 },
              { name: "河南", value: 3 },
              { name: "山东", value: 2 },
              { name: "广西", value: 2 },
              { name: "湖北", value: 1 },
              { name: "安徽", value: 1 },
              { name: "重庆", value: 1 },
              { name: "云南", value: 1 },
              { name: "澳门", value: 1 },
              { name: "新疆", value: 0 },
              { name: "江西", value: 0 },
              { name: "海南", value: 0 },
              { name: "西藏", value: 0 },
              { name: "宁夏", value: 0 },
              { name: "贵州", value: 0 },
              { name: "青海", value: 0 },
              { name: "南海诸岛", value: 0 },
            ],
          },
        ],
      });
    },
  },
};
</script>

<style  lang="scss" scoped>
.yqWrap {
  padding-top: 100px;
}
.yiqing {
  display: flex;
  justify-content: space-around;
  margin: 20px auto;
  width: 650px;
}
.item,
.itemForeign {
  width: 120px;
  height: 85px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  span {
    font-size: 20px;
    font-weight: 500;
  }
  .el-tag {
    text-align: center;
    font-weight: 900;
    font-size: 20px;
  }
}
.itemForeign {
  width: 150px;
}

.myChart {
  margin: 0 auto;
  width: 1000px;
  height: 620px;
}
.foreignyq,
.chinayq {
  margin: 0 auto;
  width: 80%;
}
</style>