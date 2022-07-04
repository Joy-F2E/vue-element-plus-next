<template>
  <el-button type="primary" @click="handleClick">
    <slot></slot>
  </el-button>
  <el-dialog :title="title" v-model="dialogVisible">1111</el-dialog>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
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
  
</style>