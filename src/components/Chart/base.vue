<template>
  <div
    :style="chartStyles"
    class="chart-box"/>
</template>

<script>
import echarts from 'echarts'
import elementResizeEvent from '@/utils/element-resize-event'

export default {
  name: 'Chart',
  props: {
    // 是否正在加载
    loading: {
      type: Boolean,
      default: false
    },
    // 宽度
    width: {
      type: [Number, String],
      default: '100%'
    },
    // 高度
    height: {
      type: [Number, String],
      default: '100%'
    }
  },
  data () {
    return {
      oldOpts: null,
      resizeInited: false, // resize时间是否绑定
      delayRender: false // 当option改变，但resize事件为绑定时（resizeInited为false），修改此变量为true，resize的init回掉检测到delayRender为true时，调用一次resize
    }
  },
  computed: {
    // 图表样式
    chartStyles () {
      if (!this.width && !this.height) return
      return {
        width: (typeof this.width === 'number') ? `${this.width}px` : this.width,
        height: (typeof this.height === 'number') ? `${this.height}px` : this.height
      }
    }
  },
  watch: {
    loading (val, oldVal) {
      if (!this._chartInstance) return
      if (val) {
        this._chartInstance.showLoading()
      } else {
        this._chartInstance.hideLoading()
      }
    },
    chartOptions: {
      handler () {
        if (this._render) this._render()
      },
      deep: true
    }
  },
  async mounted () {
    this._render = _.debounce(this.draw, 100)
    this._resize = _.debounce(this.onResize, 100)
    this._chartInstance = echarts.init(this.$el)
    this.$emit('ready', this._chartInstance) // 暴露echart实例对象
    this.bindEvent() // 注意该语句调用务必在echart init之后，否则会被echart初始化清除
    this._render()
  },
  beforeDestroy () {
    if (this._chartInstance) {
      this._chartInstance.dispose()
    }
  },
  methods: {
    /**
     * 绑定事件
     */
    bindEvent () {
      elementResizeEvent(this.$el, this._resize, () => {
        this.resizeInited = true
        if (this.delayRender) {
          this.onResize()
          this.draw()
        }
      })
    },
    /**
     * 处理尺寸改变
     */
    onResize () {
      if (!this._chartInstance) return
      this._chartInstance.resize()
    },
    /**
     * 绘制图表
     * @param {Boolean} force 是否强制重绘
     */
    draw (force = false) {
      if (!this._chartInstance) return
      if (!this.resizeInited) {
        this.delayRender = true
        return
      }
      if (this.loading) {
        this._chartInstance.showLoading()
      }
      if (JSON.stringify(this.chartOptions) === JSON.stringify(this.oldOpts) && !force) {
        return
      }
      this._chartInstance.setOption(this.chartOptions, true)
      this.oldOpts = _.cloneDeep(this.chartOptions)
    }
  }
}
</script>

<style lang="scss">
.chart-box{
  position: relative;
  size: 100%;
}
</style>