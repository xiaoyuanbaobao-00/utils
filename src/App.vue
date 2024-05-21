<script setup lang="ts">
import TitleComponent from './components/TitleComponent.vue';
</script>

<template>
  <title-component></title-component>
  <router-view></router-view>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  --box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  --shadow-transition: all 0.3s;
}
.select-no{
  user-select: none;
}
li{
  list-style: none;
}
</style>
