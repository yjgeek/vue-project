<template>
  <router-view />
</template>

<script>
import Vue from 'vue'
import StrongList from './components/StrongList'
import StrongDialog from './components/StrongDialog'
import Select from './components/Select'
Vue.component(StrongList.name, StrongList)
Vue.component(StrongDialog.name, StrongDialog)
Vue.component(Select.name, Select)
export default {
  name: 'shopManagement'
}
</script>
