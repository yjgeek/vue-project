<template>
  <router-view />
</template>

<script>
import Vue from 'vue'
import StrongList from './components/StrongList'
Vue.component(StrongList.name, StrongList)
export default {
  name: 'shopManagement'
}
</script>
