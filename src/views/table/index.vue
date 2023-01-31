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
import type { TableOptions } from '@/components/Table/src/types';
import { ref, onMounted } from 'vue';
import axios from 'axios'

interface TableData {
  date: string,
  name: string,
  address: string
}

let isLoading = ref(true)

let editRowIndex = ref<string>('')

// 表格数据 
let tableData = ref<TableData[]>([])

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

let current = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)

let getTableData = () => {
  axios.post('/api/list', {
    current: current.value,
    pageSize: pageSize.value
  }).then((res: any) => {
    tableData.value = res.data.data.rows
    console.log(tableData.value);
    
    total.value = res.data.data.total
    isLoading.value = false
  })
}

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
  current.value = val;
  getTableData()
}

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  getTableData()
}

onMounted(() => {
  getTableData()
})

</script>
<style lang="scss" scoped>
  
</style>