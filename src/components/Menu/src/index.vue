<template>
  <el-menu :default-active="defaultActive" :router="router" v-bind="$attrs">
    <template v-for="(item, i) in data" :key="i">
      <el-menu-item v-if="!item[children] || !item[children].length" :index="item.index">
        <component v-if="item[icon]" :is="`el-icon-${transToKeyBase(item[icon])}`"></component>
        <span>{{ item[name] }}</span>
      </el-menu-item>

      <el-sub-menu v-if="item.children && item.children.length" :index="item.index">
        <template #title>
          <component v-if="item[icon]" :is="`el-icon-${transToKeyBase(item[icon])}`"></component>
          <span>{{ item[name] }}</span>
        </template>
        <template v-for="(childrenItem, childrenIndex) in item.children" :key="childrenIndex">
          <el-menu-item :index="childrenItem.index">
            <component v-if="childrenItem[icon]" :is="`el-icon-${transToKeyBase(childrenItem[icon])}`"></component>
            <span>{{ childrenItem[name] }}</span>
          </el-menu-item>
        </template>
      </el-sub-menu>
    </template>
  </el-menu>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue';
import type { MenuItem } from './types'
import { transToKeyBase } from '../../../utils'

let props = defineProps({
  data: {
    type: Array as PropType<any[]>,
    required: true
  },
  defaultActive: {
    type: String,
    default: '1'
  },
  router: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: 'name'
  },
  index: {
    type: String,
    default: 'index'
  },
  icon: {
    type: String,
    default: 'icon'
  },
  children: {
    type: String,
    default: 'children'
  }
})

console.log(props.data);

</script>
<style lang="scss" scoped>
  
</style>