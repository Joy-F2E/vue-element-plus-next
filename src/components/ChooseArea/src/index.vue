<template>
  <div>
    <el-select v-model="province">
      <el-option value="1"></el-option>
    </el-select>
    <el-select v-model="city" style="margin: 0 10px;">
      <el-option value="2"></el-option>
    </el-select>
    <el-select v-model="area">
      <el-option value="3"></el-option>
    </el-select>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import allArea from '../lib/pca-code.json';
console.log(allArea);
let province = ref<string>('')
let city = ref<string>('')
let area = ref<string>('')
</script>
<style lang="">
  
</style>