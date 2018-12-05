<template>
  <el-upload
    class="avatar-uploader"
    action="https://jsonplaceholder.typicode.com/posts/"
    :show-file-list="false"
    :before-upload="beforeAvatarUpload">
    <img v-if="value" :src="value" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import { Mock } from 'utils/index'
export default {
  name: 'c-upload',
  props: {
    value: String,
    size: {
      type: String,
      default () {
        return '200x200'
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    beforeAvatarUpload (file) {
      this.$emit('input', Mock.Random.dataImage(this.size, `${file.name}(${this.size})`))
      if (!this.value) {
        this.$emit('success', file)
      }
      return false
    }
  }
}
</script>

<style scoped>
.avatar-uploader{
  display: inline-block;
  margin-right: 10px;
}
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader >>> .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader >>> .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
