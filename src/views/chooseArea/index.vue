<template>
  <div>
    省市区选择
    <m-choose-area @change="handleChange"></m-choose-area>
  </div>
</template>
<script setup lang="ts">
import mChooseArea from '@/components/ChooseArea/src/index.vue';

const handleChange = (val: any) => {
  console.log(val);
}
</script>
<style lang="">
  
</style>