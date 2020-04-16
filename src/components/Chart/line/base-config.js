export default () => {
  return {
    seriesObj: {
      type: 'line',
      name: '',
      data: [],
      showSymbol: false
    },
    options: {
      animation: false,
      type: 'line',
      title: {
        text: '',
        left: 'center',
        top: '0%'
      },
      // grid: {
      //   left: 0,
      //   right: 0,
      //   top: 0,
      //   bottom: 0
      // },
      grid: {
        left: '5%',
        right: '10%',
        top: '22%',
        bottom: '15%',
        containLabel: true
      },
      legend: {
        type: 'scroll',
        top: '13%',
        left: '10.5%',
        data: [],
        animation: true,
        show: true
      },
      tooltip: {
        trigger: 'axis',
        confine: true,
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      series: [],
      xAxis: {
        type: 'category',
        data: [],
        boundaryGap: false,
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false
        }
      }
    }
  }
}