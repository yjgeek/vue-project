<template>
  <div class="resource-upload-dialog" v-if="visible">
    <div class="resource-upload-dialog-title">
      上传资源
      <div class="upload-btn">上传文件<input type="file" name="file" :multiple="multiple" @change="handleChange"></div>
    </div>
    <div class="resource-upload-dialog-body">
      <table>
        <thead>
          <tr>
            <td width="50px">#</td>
            <td>名称</td>
            <td width="100px">状态</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in fileList" :key="item.key">
            <td>{{i+1}}</td>
            <td>{{item.file.name}}</td>
            <td>{{statusText[item.status]}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="resource-upload-dialog-footer">
      <span @click="$emit('close');fileList=[]">关闭</span>
    </div>
  </div>
</template>

<script>
import ajax from "./ajax";
export default {
  name: "resource-upload",
  props: {
    visible: {
      type: Boolean,
      default () {
        return false;
      }
    },
    filename: {
      type: String,
      default () {
        return "file"
      }
    },
    multiple: {
      type: Boolean,
      default () {
        return true
      }
    },
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default () {
        return {}
      }
    },
    onSuccess: Function,
    onError: Function,
  },
  data() {
    return {
      fileList: [],
      statusText: {
        1: "完成",
        2: "正在上传...",
        3: "失败",
      }
    };
  },
  methods: {
    handleChange(e) {
      const files = e.target.files;
      const {filename, action, headers, onSuccess, onError} = this;
      Object.keys(files).forEach(key => {
        const file = files[key];
        const id = new Date().getTime() + file.name;
        const index = this.fileList.push({key: id, file, status: 2}) - 1;
        const _this = this;
        ajax({
          file,
          filename,
          action,
          headers,
          onError(e) {
            if (_this.visible) {
              _this.fileList[index].status = 3;
              _this.fileList.slice();
            }
            onError && onError(e)
          },
          onSuccess(res) {
            if (_this.visible) {
              _this.fileList[index].status = 1;
              _this.fileList.slice();
            }
            onSuccess && onSuccess(res, file)
          }
        });
      });
      e.target.value = "";
    },
  }
};
</script>

<style lang="scss" scoped>
.resource-upload-dialog {
  position: fixed;
  z-index: 9999999;
  width: 500px;
  height: 60vh;
  top: 50%;
  left: 50%;
  margin-left: -250px;
  margin-top: -30vh;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 499px) {
    width: 100%;
    left: 0;
    margin-left: 0;
  }
  &-title {
    height: 35px;
    line-height: 35px;
    padding-left: 15px;
    border-bottom: 1px solid #e5e5e7;
    box-sizing: border-box;
    .upload-btn {
      float: right;
      cursor: pointer;
      padding: 0 10px;
      height: 100%;
      font-size: 14px;
      color: #fff;
      background-color: #409eff;
      position: relative;
      input{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
      }
    }
  }
  &-body {
    height: calc(60vh - 75px);
    overflow: auto;
    box-sizing: border-box;
    padding: 15px;
    table {
      width: 100%;
      td{
        text-align: left;
        color:  #222;
      }
      thead{
        td{
          font-weight: bold;
        }
      }
    }
  }
  &-footer{
    padding-top: 5px;
    text-align: right;
    border-top: 1px solid #e5e5e7;
    box-sizing: border-box;
    span{
      display: inline-block;
      cursor: pointer;
      padding: 5px 10px;
      font-size: 14px;
      color: #fff;
      background-color: #409eff;
      border-radius: 4px;
      margin-right: 15px;
    }
  }
}
</style>
