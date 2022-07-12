<template>
  <div class="trend-wrapper">
    <div class="trend-item">
      <m-trend text="营业额" type="up"></m-trend>
      <m-trend type="down">销售额</m-trend>
    </div>
    <div class="trend-item">
      <m-trend text="营业额" type="up" upTextColor="blue"></m-trend>
      <m-trend text="销售额" type="down"></m-trend>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>
<style lang="scss" scoped>
.trend-wrapper {
  .trend-item {
    display: flex;
  }
}
</style>