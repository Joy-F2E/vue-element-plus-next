<template>
  <el-table
    :data="tableData"
    v-loading="loading"
    :element-loading-text="loadingText"
    :element-loading-spinner="loadingSpinner"
    element-loading-svg-view-box="-10, -10, 50, 50"
    :element-loading-background="loadingBackground"
    @row-click="handleRowClick"
  >
    <template v-for="(item, index) in tableOptions" :key="index">
      <el-table-column :label="item.label" :prop="item.prop" :align="item.align" :width="item.width">
        <template #default="scope">
          <template v-if="scope.row.isEditRow">
            <el-input size="small" v-model="scope.row[item.prop!]"></el-input>
          </template>
          <template v-else>
            <!-- 单元格编辑：感觉处理的麻烦了，实际业务扩展性不太好 -->
            <template v-if="(scope.$index + scope.column.id) === currentEdit">
              <div style="display: flex; align-items: center">
                <el-input v-model="scope.row[item.prop!]"></el-input>
                <slot name="editCell" :scope="scope" :confirm="handleConfirm" :cancel="handleCancel" v-if="$slots.editCell"></slot>
                <div class="icons" v-else>
                  <el-icon-check class="confirm" @click.stop="handleConfirm(scope)"></el-icon-check>
                  <el-icon-close class="cancel" @click.stop="handleCancel(scope)"></el-icon-close>
                </div>
              </div>
            </template>
            <template v-else>
              <!-- 自定义数据列 -->
              <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
              <span v-else>{{ scope.row[item.prop!] }}</span>
              <!-- 某一列的单元格是否可编辑 -->
              <el-icon-edit v-if="item.editable" class="edit" @click="handleEdit(scope)"></el-icon-edit>
            </template>
          </template>
        </template>
      </el-table-column>
    </template>
    <!-- 扩展列 -->
    <el-table-column :label="actionOptions!.label" :prop="actionOptions!.prop" :align="actionOptions!.align" :width="actionOptions!.width">
      <template #default="scope">
        <slot name="editRow" v-if="scope.row.isEditRow"></slot>
        <slot name="action" :scope="scope" v-else></slot>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination" v-if="pagination">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      background
      layout="sizes, prev, pager, next"
      :page-sizes="pageSizes"
      :total="total"
      @size-change="(val: number) => $emit('sizeChange', val)"
      @current-change="(val: number) => $emit('currentChange', val)"
    ></el-pagination>
  </div>
</template>
<script lang="ts" setup>
import { computed, watch, ref, onMounted } from 'vue';
import type { PropType } from 'vue';
import type { TableOptions } from './types';
import cloneDeep from 'lodash/cloneDeep';

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
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: '正在加载中...',
  },
  loadingSpinner: {
    type: String,
    default: `<path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>`
  },
  loadingBackground: {
    type: String,
    default: 'rgba(0, 0, 0, .8)'
  },
  isEditRow: {
    type: Boolean,
    default: false
  },
  editRowIndex: {
    type: String,
    default: ''
  },
  pagination: {
    type: Boolean,
    default: false
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: [10, 20, 30, 50]
  },
  total: {
    type: Number,
    default: 100
  },
  paginationAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'right'
  }
})

// 分发事件
const emits = defineEmits(['confirm', 'cancel', 'update:editRowIndex', 'sizeChange', 'currentChange'])

let tableData = ref<any[]>(cloneDeep(props.data))

let cloneEditRowIndex = ref<string>(cloneDeep(props.editRowIndex))

let currentEdit = ref<string>('')

let alignOptions = new Map([['left', 'flex-start'], ['right', 'flex-end'], ['center', 'center']])

const handleEdit = (scope: any) => {
  // 唯一的标识
  currentEdit.value = scope.$index + scope.column.id
}

const handleConfirm = (scope: any) => {
  currentEdit.value = ''
  emits('confirm', scope)
}

const handleCancel =(scope: any) => {
  currentEdit.value = ''
  emits('cancel', scope)
}

// 点击编辑行
const handleRowClick = (row: any, column: any) => {
  if (column.label === actionOptions.value!.label) {
    if (props.isEditRow && cloneEditRowIndex.value === props.editRowIndex) {
      row.isEditRow = !row.isEditRow
      tableData.value.map(item => {
        if (item !== row) item.isEditRow = false
      })
      if (!row.isEditRow) {
        emits('update:editRowIndex', '')
      }
    }
  }
}

let tableOptions = computed(() => props.options.filter(item => !item.action))

let actionOptions = computed(() => props.options.find(item => item.action))

let flexJustifity = computed(() => alignOptions.get(props.paginationAlign))

// 监听父组件传递的数据
watch(() => props.data, val => {
  if (val) {
    tableData.value = cloneDeep(val).map(item => item. isEditRow = false)
  }
}, { deep: true })

// 监听父组件传递的标识
watch(() => props.editRowIndex, val => {
  if (val) {
    if (val) cloneEditRowIndex.value = cloneDeep(val)
  }
})

onMounted(() => {
  tableData.value.map(item => { item.isEditRow = false})
})

</script>
<style lang="scss" scoped>
  .edit {
    width: 1em;
    height: 1em;
    position: relative;
    top: 3px;
    left: 5px;
    cursor: pointer;
  }
  .icons {
    display: flex;
    cursor: pointer;
    svg {
      width: 1em;
      height: 1em;
      margin-left: 8px;
    }
    .confirm {
      color: #f00;
    }
    .cancel {
      color: green;
    }
  }
  .pagination {
    display: flex;
    justify-content: v-bind(flexJustifity);
    align-items: center;
    margin-top: 20px;
  }
</style>