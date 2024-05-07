<template>
  <m-menu :data="data" :collapse="collapse" :default-active="$route.path" router></m-menu>
</template>
<script setup lang="ts">
const props = defineProps<{
  collapse: boolean
}>()

let data = [
  {
    icon: 'HomeFilled',
    name: '首页',
    index: '/',
  },
  {
    icon: 'Menu',
    name: '导航菜单',
    index: '/menu'
  },
  {
    icon: 'ShoppingBag',
    name: '数据表格',
    index: '/table'
  },
  {
    icon: 'Check',
    name: '图标选择器',
    index: '/chooseIcon'
  },
  {
    icon: 'Location',
    name: '省市区选择',
    index: '/chooseArea'
  },
  {
    icon: 'Sort',
    name: '趋势标记',
    index: '/trend'
  }
]
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 300px;
}
</style>