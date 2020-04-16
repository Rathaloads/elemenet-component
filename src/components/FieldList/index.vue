<template>
  <div class="fields">
    <div v-for="(field, index) in fields" :key="index" :style="itemStyle" class="fields__item">
      <div class="label">{{ field.label }}</div>
      <div v-if="field.solt" class="content">
        <slot :name="field.prop" />
      </div>
      <div v-if="field.render" class="content">
        <comp :render="field.render" :params="{ data: data || {}, field: field, value: data[field.prop]}"></comp>
      </div>
      <div
        v-if="!field.render && !field.slot"
        :title="data[field.prop]"
        class="content"
      >
        {{ data[field.prop] || '-' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */

import { Component, Vue, Prop } from 'vue-property-decorator'
import Comp from './comp'
import { IField } from './types'

@Component({
  components: {
    Comp
  }
})
export default class FiledList extends Vue {
  @Prop()
  fields!: IField[]

  @Prop()
  data!: any

  @Prop({ default: 2})
  column!: number

  get itemStyle() {
    return {
      width: `${100 / this.column}%`
    }
  }
}
</script>

<style lang="scss" scoped>
.fields {
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  &__item {
    display: inline-block;
    box-sizing: border-box;
    padding: 10px 12px;

    .label {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: #333;
      box-sizing: border-box;
      color: #888;
    }

    .content {
      box-sizing: border-box;
      padding: 8px 0;
      border-bottom: 1px solid #eaeefb;
      color: #333;
      font-size: 14px;
      position: relative;
    }
  }
}
</style>
