<template>
  <el-button type="primary" @click="handleClick">
    <slot></slot>
  </el-button>
  <section class="m-dialog__height">
    <el-dialog custom-class="iconDialog" :title="title" v-model="dialogVisible" width="50%">
      <div class="container">
        <div class="item" v-for="(item, index) in Object.keys(ElIcons)" :key="index">
          <div class="icon">
            <component :is="`el-icon-${transToKeyBase(item)}`"></component>
          </div>
          <span class="title">{{ item }}</span>
        </div>
      </div>
    </el-dialog>
  </section>
</template>
<script setup lang="ts">
import * as ElIcons from '@element-plus/icons-vue'
import { ref, watch, computed } from 'vue'
import { transToKeyBase } from '../../../utils';

let props = defineProps<{
  // 弹出框标题
  title: string,
  // 控制弹出框的显示与隐藏
  visible: boolean
}>()
let emits = defineEmits(['update:visible'])
// 拷贝一份父组件的传值，避免dialog内部直接修改父组件传递过来的值
let dialogVisible = ref<boolean>(props.visible)
let handleClick = () => {
  emits('update:visible', !props.visible)  
}
// 监听visible的变化
watch(() => props.visible, (val) => {
  dialogVisible.value = val
})
watch(() => dialogVisible.value, (val) => {
   emits('update:visible', val) 
})

</script>
<style lang="scss" scoped>
.iconDialog {
  max-height: 80vh;
}
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
}
.title {
  font-size: 12px;
}
svg {
  width: 1.5em;
  height: 1.5em;
}
</style>