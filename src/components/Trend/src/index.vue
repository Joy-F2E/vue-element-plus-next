<template>
  <div class="trend">
    <div class="trend--text">{{ text }}</div>
    <div class="trend--icon">
      <el-icon-arrow-up :style="{ color: upIconColor }" v-if="type === 'up'"></el-icon-arrow-up>
      <el-icon-arrow-down :style="{ color: downIconColor }" v-if="type === 'down'"></el-icon-arrow-down>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  // 趋势type是上升（up）还是下降（down）
  type: {
    type: String,
    default: 'up'
  },
  upIconColor: {
    type: String,
    default: '#f5222d'
  },
  downIconColor: {
    type: String,
    default: '#52c41a'
  },
  text: {
    type: String,
    default: '文字'
  }
})
</script>
<style lang="scss" scoped>
.trend {
  display: flex;
  align-items: center;
  &--text {
    padding: 0 5px;
  }
  svg {
    width: 1em;
    height: 1em;
  }
}
</style>