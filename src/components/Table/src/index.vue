<template>
  <el-table
    :data="data"
    v-loading="loading"
    :element-loading-text="loadingText"
    :element-loading-spinner="loadingSpinner"
    element-loading-svg-view-box="-10, -10, 50, 50"
    :element-loading-background="loadingBackground"
  >
    <template v-for="(item, index) in tableOptions" :key="index">
      <el-table-column :label="item.label" :prop="item.prop" :align="item.align" :width="item.width">
        <template #default="scope">
          <!-- Tips: 可编辑单元格感觉处理的麻烦了，实际业务扩展性不太好 -->
          <template v-if="(scope.$index + scope.column.id) === currentEdit">
            <div style="display: flex; align-items: center">
              <el-input v-model="scope.row[item.prop!]"></el-input>
              <slot name="editCell" :scope="scope" :check="handleCheck" v-if="$slots.editCell"></slot>
              <div class="icons" v-else>
                <el-icon-check class="check" @click="handleCheck(scope)"></el-icon-check>
                <el-icon-close class="close" @click="handleClose(scope)"></el-icon-close>
              </div>
            </div>
          </template>
          <template v-else>
            <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
            <span v-else>{{ scope.row[item.prop!] }}</span>
            <el-icon-edit v-if="item.editable" class="edit" @click="handleEdit(scope)"></el-icon-edit>
          </template>
        </template>
      </el-table-column>
    </template>
    <!-- 扩展列 -->
    <el-table-column :label="actionOptions!.label" :prop="actionOptions!.prop" :align="actionOptions!.align" :width="actionOptions!.width">
      <template #default="scope">
        <slot name="action" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
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
  }
})

// 分发事件
const emits = defineEmits(['check', 'close'])

let tableOptions = computed(() => props.options.filter(item => !item.action))

let actionOptions = computed(() => props.options.find(item => item.action))

let currentEdit = ref('')

const handleEdit = (scope: any) => {
  // 唯一的标识
  currentEdit.value = scope.$index + scope.column.id
}

const handleCheck = (scope: any) => {
  console.log('check', scope);
  currentEdit.value = ''
  emits('check', scope)
}

const handleClose =(scope: any) => {
  currentEdit.value = ''
  emits('close', scope)
}

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
    .check {
      color: #f00;
    }
    .close {
      color: green;
    }
  }
</style>