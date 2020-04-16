<template>
  <div class="home">
    <h1>字段列表</h1>
    <FiledList :fields="fileds" :data="fieldData"></FiledList>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Vue } from 'vue-property-decorator'
import FiledList from '@/components/FieldList/index.vue'
import {  IField, tFieldListData } from '@/components/FieldList/types'

@Component({
  components: {
    FiledList
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
}
</script>
