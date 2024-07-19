<template>
  <div>
    <a-button type="primary" @click="show">
      来源数据
    </a-button>
    <a-modal :visible="visible" :maskClosable="false"
             @cancel="hideModal">
      <a-spin :spinning="spinning" style="min-height: 100px">
        <a-textarea style="width:40vw;height:50vh" v-model:value="jsonOut"/>
      </a-spin>
      <template slot="title">
        <a-space>
          <div style="margin-right: 20px">JSON</div>
          <a-switch checked-children="tid模式" un-checked-children="默认" v-model:checked="tidMode"
                    @change="onModeChange"/>
          <a-switch checked-children="美化" un-checked-children="压缩" v-model:checked="beautify"
                    @change="onModeChange"/>
        </a-space>
      </template>
      <template slot="footer">
        <a-button key="close" type="info" @click="ok">
          更新
        </a-button>
        <a-button key="close" type="info" @click="hideModal">
          关闭
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import printData from './design/print-data'

export default {
  name: "DataView",
  props: {
    template: {
      type: Object,
    }
  },
  data() {
    return {
      visible: false,
      spinning: true,
      jsonOut: "",
      tidMode: false,
      beautify: true,
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
    ok() {
      let data = JSON.parse(this.jsonOut);
      Object.keys(printData).forEach(key => {
        delete printData[key];
      });
      Object.assign(printData, data);
      // localStorage.setItem('hiprintdata', JSON.stringify({
      //   panel:this.template.getJson(),
      //   data:printData
      // }));
      // for (let key in data) {
      //   if (data.hasOwnProperty(key)) { // 确保不会复制原型链上的属性
      //     printData[key] = data[key];
      //   }
      // }
      this.visible = false
    },
    hideModal() {
      this.visible = false
    },
    show() {
      this.visible = true
      this.spinning = true
      setTimeout(() => {
        let beautify = this.beautify ? 2 : 0;
        this.jsonOut = JSON.stringify(printData, null, beautify);
        this.spinning = false
      }, 500)
    },
    onModeChange() {
      this.show();
    }
  }
}

</script>
<style lang="less" scoped>
/deep/ .ant-modal-body {
  padding: 0px;
}

/deep/ .ant-modal-content {
  margin-bottom: 24px;
}
</style>
