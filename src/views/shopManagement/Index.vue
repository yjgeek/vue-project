<template>
  <router-view />
</template>

<script>
import Vue from 'vue'
import StrongList from './components/StrongList'
import StrongDialog from './components/StrongDialog'
Vue.component(StrongList.name, StrongList)
Vue.component(StrongDialog.name, StrongDialog)
export default {
  name: 'shopManagement'
}
</script>
