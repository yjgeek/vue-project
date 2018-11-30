<template>
  <i :class="['iconfont', 'icon-'+type]" :style="[rotate?{transform: `rotate(${this.rotate}deg)`}:'']" @click="$emit('click')"></i>
</template>
<script>
export default {
  name: 'c-icon',
  props: ['type', 'rotate']
}
</script>
<style lang="scss">
i{
  display: inline-block;
  transition: transform .4s;
}
</style>
