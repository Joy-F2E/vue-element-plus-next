<template>
  <div>
    <el-select v-model="province" clearable>
      <el-option
        v-for="item in selectProvince"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select v-model="city" style="margin: 0 10px;" :disabled="!province" clearable>
      <el-option
        v-for="item in selectCity"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select v-model="area" :disabled="!city" clearable>
      <el-option
        v-for="item in selectArea"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import allArea from '../lib/pca-code.json';

export interface AreaItem {
  name: string,
  code: string,
  children?: AreaItem[]
}
export interface SelectData {
  name: string,
  code: string
}

let emits = defineEmits(['change'])

let province = ref<string>('')
let city = ref<string>('')
let area = ref<string>('')

let selectProvince = ref<any[]>(allArea)
let selectCity = ref<AreaItem[]>([])
let selectArea = ref<AreaItem[]>([])

watch(() => province.value, (val) => {
  if (val) {
    let cityList = selectProvince.value.find(item => item.code === province.value)!.children;
    selectCity.value = cityList
  }
  city.value = ''
  area.value = ''
})
watch(() => city.value, (val) => {
  if (val) {
    let areaList = selectCity.value.find(item => item.code === city.value)!.children!;
    selectArea.value = areaList
  }
  area.value = ''
})
watch(() => area.value, val => {
  if (val) {
    let provinceData: SelectData = {
      code: province.value,
      name: selectProvince.value && selectProvince.value.find(item => item.code === province.value)!.name
    }
    let cityData: SelectData = {
      code: city.value,
      name: selectCity.value && selectCity.value.find(item => item.code === city.value)!.name
    }
    let areaData: SelectData = {
      code: area.value,
      name: selectArea.value && selectArea.value.find(item => item.code === val)!.name
    }
    emits('change', { provinceData, cityData, areaData })
  }
})
</script>
<style lang="">
  
</style>