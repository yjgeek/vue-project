<template>
  <resource-dialog title="上传资源" @close="$emit('close')" @submit="$emit('close')">
    <div class="title" slot="title">
      上传资源
      <div class="upload-btn"><c-icon type="cloud" />&nbsp;上传文件<input type="file" name="file" :multiple="multiple" @change="handleChange"></div>
    </div>
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
          <td>{{statusText[item.status]}} <span v-if="item.status === 2">{{item.percent}}%</span></td>
        </tr>
      </tbody>
    </table>
  </resource-dialog>
</template>

<script>
import ajax from "./ajax";
import ResourceDialog from "./Dialog";
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
        const index = this.fileList.push({key: id, file, status: 2, percent: 0}) - 1;
        const _this = this;
        ajax({
          file,
          filename,
          action,
          headers,
          onProgress (e) {
            _this.fileList[index].percent = e.percent.toFixed(2);
            _this.fileList.slice();
          },
          onError(e) {
            _this.fileList[index].status = 3;
            _this.fileList.slice();
            onError && onError(e)
          },
          onSuccess(res) {
            _this.fileList[index].status = 1;
            _this.fileList.slice();
            onSuccess && onSuccess(res, file)
          }
        });
      });
      e.target.value = "";
    },
  },
  components: {
    ResourceDialog
  }
};
</script>

<style lang="scss" scoped>
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
</style>
