<template>
  <resource-dialog
    title="选择资源"
    @close="$emit('close')"
    @submit="handleSubmit"
  >
    <resource-path @change="getListData" :sources="pathList" :active="filterParams.parent_id"/>
    <div class="image-list">
      <resource-item
        v-for="item in resourceList"
        :data="item"
        :key="item.id"
        @next="getListData"
        @previewImage="handlePreviewImage"
        @onSelect="handleSelect"
      />
    </div>
    <resource-preview-image :sources="previewImageList" v-if="isPreview"  @close="isPreview=false"/>
  </resource-dialog>
</template>

<script>
import mixin from '../mixin'
export default {
  name: 'resource-dialog-select',
  mixins: [mixin],
  props: {
    min: Number,
    max: Number,
  },
  methods: {
    handleSubmit () {
      const {min, max} = this
      let arr = [];
      let len = 0;
      this.resourceList.forEach(item => {
        const {type, isSelect, source_url, middle_url, small_url} = item;
        if (item.type !== 1 && isSelect) {
          arr.push({source_url, middle_url, small_url});
          len += 1;
        }
      });
      if (min && len < min) {
        return alert(`最少需要选择${min}个`)
      }
      if (max && len > max) {
        return alert(`最大只能选择${max}个`)
      }
      if (max === 1) {
        this.$emit('change', arr[0]);
      } else {
        this.$emit('change', arr);
      }
    }
  }
}
</script>

<style>

</style>
