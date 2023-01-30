<template>
  <m-table
    :data="tableData"
    :options="options"
    :loading="isLoading"
    isEditRow
    pagination
    v-model:editRowIndex="editRowIndex"
    @confirm="handleConfirm"
    @sizeChange="handleSizeChange"
    @currentChange="handleCurrentChange"
  >
    <!-- 自定义数据列 -->
    <template #date="{scope}">
      <el-icon-timer></el-icon-timer>
      {{ scope.row.date }}
    </template>
    <template #name="{scope}">
      <el-popover effect="light" trigger="hover" placement="top" width="auto">
        <template #default>
          <div>name: {{ scope.row.name }}</div>
          <div>address: {{ scope.row.address }}</div>
        </template>
        <template #reference>
          <el-tag>{{ scope.row.name }}</el-tag>
        </template>
      </el-popover>
    </template>
    <!-- 自定义操作列 -->
    <template #action="{scope}">
      <el-button type="primary" size="small" @click="handleEditClick(scope)">编辑</el-button>
      <el-button type="danger" size="small" @click="handleDelClick(scope)">删除</el-button>
    </template>
    <template #editRow="{scope}">
      <el-button type="primary" size="small">确认</el-button>
      <el-button type="danger" size="small">取消</el-button>
    </template>
    <!-- 单元格编辑插槽 -->
    <!-- <template #editCell="{scope, confirm, cancel}">
      <div style="display: flex">
        <el-button size="small" type="primary" link @click="confirm(scope)">确认</el-button>
        <el-button size="small" type="danger" link @click="cancel(scope)">取消</el-button>
      </div>
    </template> -->
  </m-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TableOptions } from '@/components/Table/src/types';

interface TableData {
  date: string;
  name: string;
  address: string;
}

let isLoading = ref(true)

let editRowIndex = ref<string>('')

// 表格数据 
let tableData = ref<TableData[]>([
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
])

// 表格配置
let options: TableOptions[] = [
  {
    label:'日期',
    prop: 'date',
    align: 'center',
    slot: 'date'
  },
  {
    label:'姓名',
    prop: 'name',
    align: 'center',
    slot: 'name'
  },
  {
    label:'地址',
    prop: 'address',
    align: 'center',
    editable: true
  },
  {
    label: '操作',
    align: 'center',
    action: true
  }
]

const handleEditClick = (scope: any) => {
  editRowIndex.value = 'edit'
}

const handleDelClick = (scope: any) => {
  console.log('del.click', scope)
}

const handleConfirm = (scope: any) => {
  console.log('parent.scope', scope);
}

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
}

const handleSizeChange = (val: number) => {
  console.log(`${val} items pre page`);
}

setTimeout(() => {
  isLoading.value = false
}, 0);

</script>
<style lang="scss" scoped>
  
</style>