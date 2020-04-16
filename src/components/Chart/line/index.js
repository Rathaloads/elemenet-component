import base from '../base'
import baseConfig from './base-config'
import _ from 'lodash'

const config = baseConfig()

export default {
  name: 'LineChart',

  mixins: [base],

  props: {
    // 图表配置
    // 格式：
    // [
    //   {
    //     name: 'Series Name',
    //     data: [
    //       {name: '7-12', value: 3},
    //       {name: '7-13', value: 5}
    //     ]
    //   },
    //   ...
    // ]
    series: {
      type: Array,
      default () {
        return []
      }
    },

    // 该配置覆盖默认配置
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      defaultOptions: _.merge({}, config.options, this.options || {})
    }
  },

  watch: {
    options (val) {
      this.defaultOptions = _.merge({}, config.options, val)
    }
  },

  computed: {
    opts () {
      // 同一个图有可能有多个折线图共存
      let series = []
      this.series.forEach(item => {
        let obj = _.cloneDeep(config.seriesObj)
        obj.name = item.name
        obj.data = item.data
        series.push(obj)
      })
      return {
        series
      }
    },
    chartOptions () {
      return _.merge({}, this.defaultOptions, this.opts)
    }
  }
}