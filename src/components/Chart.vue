<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import * as echarts from 'echarts';
import * as ECharts from 'echarts';

@Component
export default class Chart extends Vue {
  @Prop() options?: echarts.EChartsOption;
  chart?: echarts.ECharts;

  mounted() {
    if (this.options === undefined) {
      return console.error('options为空');
    }
    this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    this.chart.setOption(this.options);
  }

  @Watch('options')
  onOptionsChanged(val: echarts.EChartsOption) {
    this.chart!.setOption(val);

  }

}
</script>

<style scoped lang="scss">
.wrapper {
  height: 400px;
}
</style>