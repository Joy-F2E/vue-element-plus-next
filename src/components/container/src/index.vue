<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <Aside :collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
         <Header v-model:collapse="isCollapse" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Aside from './Aside/index.vue'
import Header from './Header/index.vue'

let isCollapse = ref(false)

</script>
<style lang="scss" scoped>
.el-header {
  padding: 0;
  border: 1px solid #eee;
}
.el-aside {
  width: 200px;
}
::v-deep .el-menu-item span{
  padding-left: 8px;
}
</style>