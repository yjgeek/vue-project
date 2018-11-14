<template>
    <div id="app">
        <component v-bind:is="currentLayout"></component>
    </div>
</template>

<script>
import layouts from 'layouts/index'
export default {
  name: 'app',
  data () {
    return {
      currentLayout: null
    }
  },
  watch: {
    $route: {
      handler () {
        let $route = this.$route
        let layout = $route.meta.layout || 'general'
        this.currentLayout = layouts[`${layout}-layout`]
        global.vbus.$emit('updateRouter', $route)
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
