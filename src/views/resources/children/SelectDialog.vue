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
      
      <div class="el-upload el-upload--picture-card" @click="isUpload=true" >
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <resource-preview-image :sources="previewImageList" v-if="isPreview"  @close="isPreview=false"/>
    <resource-upload
      :action="$config.API_PREFIX_RESOURCE + '/file/upload'"
      :headers="headers"
      v-if="isUpload"
      @close="isUpload=false; getListData(filterParams.parent_id);"
      :onSuccess="addResource"
    />
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
        return this.$message.warning(`最少需要选择${min}个`)
      }
      if (max && len > max) {
        return this.$message.warning(`最大只能选择${max}个`)
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

<style lang="scss" scoped>
  .image-list{
    display: flex;
    margin-top: 15px;
    flex-wrap: wrap;
  }
  .el-upload{
  position: relative;
  overflow: hidden;
  z-index: 99999;
  width: 80px;
  height: 80px;
  line-height: 80px;
  &.el-upload-disabled{
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    &.el-upload-add{
      cursor: not-allowed;
    }
  }
  .placeholder{
    position: absolute;
    bottom: 0px;
    height: 30px;
    line-height: 30px;
    left: 0;
    color: #ccc;
    width: 100%;
  }
  img{
    width: 100%;
    height: 100%;
  }
  &:not(.el-upload-disabled):hover{
    .add {
      right: 0;
    }
  }
  .add{
    position: absolute;
    right: -30px;
    top: 0;
    width: 30px;
    height: 30px;
    text-align: center;
    transition: all .4s;
    background: rgba(0,0,0,0.6);
    i{
      color: #fff;
      display: block;
      font-size: 20px;
      line-height: 30px;
    }
  }
}
</style>
