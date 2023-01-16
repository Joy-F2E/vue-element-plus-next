<template lang="">
  <el-table :data="data">
    <template v-for="(item, index) in tableOptions" :key="index">
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
      ></el-table-column>
    </template>
    <!-- 扩展列 -->
    <el-table-column
      :label="actionOptions!.label"
      :prop="actionOptions!.prop"
      :align="actionOptions!.align"
      :width="actionOptions!.width"
    >
      <template #default="scope">
        <slot name="action" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import type { PropType } from 'vue'
import type { TableOptions } from './types';

const props = defineProps({
  // 表格的配置
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true,
  },
  // 表格数据
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
})

let tableOptions = computed(() => props.options.filter(item => !item.action))

let actionOptions = computed(() => props.options.find(item => item.action))

</script>
<style lang="scss" scoped>
  
</style>