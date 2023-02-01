<template>
  <div style="display: flex">
    <m-menu :data="data1" style="width: 200px" defaultActive="1" :name="'a'"></m-menu>
    <m-infinite-menu :data="data2" style="width: 200px" defaultActive="1" active-text-color="red" popper-effect="dark"></m-infinite-menu>
  </div>
</template>
<script lang="ts" setup>
let data1 = [
  {
    a: '导航1',
    index: '1',
    icon: 'document'
  },
  {
    a: '导航2',
    index: '2',
    icon: 'document'
  },
  {
    a: '导航3',
    index: '3',
    icon: 'document',
    children: [
      {
        a: '导航3-1',
        index: '3.1',
        icon: 'document'
      }
    ]
  }
]
let data2 = [
  {
    name: '导航1',
    index: '1',
    icon: 'document'
  },
  {
    name: '导航2',
    index: '2',
    icon: 'document'
  },
  {
    name: '导航3',
    index: '3',
    icon: 'document',
    children: [
      {
        name: '导航3-1',
        index: '3.1',
        icon: 'document',
        children: [
          {
            name: '导航3-1-1',
            index: '3.1.1',
            icon: 'document',
            children: [
              {
                name: '导航3-1-1-1',
                index: '3.1.1.1',
                icon: 'document'
              }
            ]
          }
        ]
      },
      {
        name: '导航3-2',
        index: '3.3',
        icon: 'document'
      }
    ]
  }
]
</script>
<style lang="scss" scoped>
  
</style>