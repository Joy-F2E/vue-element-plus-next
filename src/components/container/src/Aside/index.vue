<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    :collapse="collapse"
  >
    <el-menu-item index="1" route="{ path: '/' }" >
      <el-icon-menu />
      <template #title>Navigator One</template>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon-menu />
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon-document />
      <template #title>Navigator Three</template>
    </el-menu-item>
  </el-menu>
</template>
<script setup lang="ts">
const props = defineProps<{
  collapse: boolean
}>()

</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>