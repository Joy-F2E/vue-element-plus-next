<template>
  <div class="trend">
    <div class="trend--text">
      <slot v-if="slots.default"></slot>
      <span v-else>{{ text }}</span>
    </div>
    <div class="trend--icon">
      <el-icon-arrow-up :style="{ color: !reverseColor ? upIconColor : '#52c41a' }" v-if="type === 'up'"></el-icon-arrow-up>
      <el-icon-arrow-down :style="{ color: !reverseColor ? downIconColor : '#f5222d' }" v-if="type === 'down'"></el-icon-arrow-down>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSlots } from 'vue';
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
  reverseColor: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: '文字'
  }
})
let slots = useSlots()
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