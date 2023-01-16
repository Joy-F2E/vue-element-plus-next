<template>
  <m-table :data="tableData" :options="options">
    <template #action="scope">
      <el-button type="primary" size="small" @click="handleClickEdit(scope)">编辑</el-button>
      <el-button type="danger" size="small">删除</el-button>
    </template>
  </m-table>
</template>
<script lang="ts" setup>
import type { TableOptions } from '@/components/Table/src/types';

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }
]

// 表格配置
let options: TableOptions[] = [
  {
    label:'日期',
    prop: 'date',
    align: 'center',
  },
  {
    label:'姓名',
    prop: 'name',
    align: 'center',
  },
  {
    label:'地址',
    prop: 'address',
    align: 'center',
  },
  {
    label: '操作',
    align: 'center',
    action: true
  }
]

let handleClickEdit = (scope: any) => {
  console.log(scope);
}
  
</script>
<style lang="scss" scoped>
  
</style>