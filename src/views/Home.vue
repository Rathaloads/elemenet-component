<template>
  <div class="home">
    <h1>字段列表</h1>
    <FiledList :fields="fileds" :data="fieldData"></FiledList>

    <h1>图表</h1>
    <div style="width: 300px; height: 300px;">
      <LineChar :series="series"></LineChar>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Vue } from 'vue-property-decorator'
import FiledList from '@/components/FieldList/index.vue'
import {  IField, tFieldListData } from '@/components/FieldList/types'
import LineChar from '@/components/Chart/line/index'

@Component({
  components: {
    FiledList,
    LineChar
  }
})
export default class Home extends Vue {
  fileds: IField[] = [
    { prop: 'name', label: '名称'},
    { prop: 'age', label: '年龄'},
    { prop: 'sex', label: '性别'}
  ]

  fieldData: tFieldListData<any> = {
    name: 'Alex',
    age: 32,
    sex: '男'
  }

  get series() {
    return [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
  }
}
</script>
