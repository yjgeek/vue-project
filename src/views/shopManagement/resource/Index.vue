<template>
  <div>
    <div class="operating">
      <div class="left">
        <template v-if="!isMove">
          <span @click="isUpload=true">上传资源</span>
          <span @click="addDir">新建文件夹</span>
          <span class="hide-i-768" @click="removeResource(1)">批量删除</span>
          <span class="hide-i-768" @click="handleAllSelect">{{isAllSelect ? '取消全选' : '全选'}}</span>
        </template>
        <template v-else>
          <span @click="handleMove">确定</span>
          <span @click="isMove=false;moveId=null;">取消</span>
        </template>
      </div>
      <div class="right hide-i-768" v-if="!isMove">
        <div class="search">
          <input
            type="text"
            v-model="filterParams.keyword"
            @keyup.enter="handleSearch"
            placeholder="请输入名字"
          >
        </div>
      </div>
    </div>
    <resource-path style="margin-top: 10px;" @change="getListData" :sources="pathList" :active="filterParams.parent_id"/>
    <div class="image-list">
      <resource-item
        v-for="item in resourceList"
        :data="item"
        :key="item.id"
        @next="getListData"
        @changeName="handleChangeName"
        @previewImage="handlePreviewImage"
        @onSelect="handleSelect"
      />
    </div>
    <resource-right-menu :sources="resourceList" @change="handleRightChange"/>
    <resource-preview-image :sources="previewImageList" v-if="isPreview"  @close="isPreview=false"/>
    <resource-upload
      action="http://192.168.1.106:4000/api/file/upload"
      :headers="headers"
      v-if="isUpload"
      @close="isUpload=false; getListData(filterParams.parent_id);"
      :onSuccess="addResource"
    />
    <input type="text" id="copy-url" placeholder="这个是来复制url的" >
  </div>
</template>

<script>
import mixin from './mixin'
import ResourceSelectDialog from './children/SelectDialog'
export default {
  name: "resource-list",
  mixins: [mixin],
  components: {
    ResourceSelectDialog
  },
  methods: {
    handleSubmit (data) {
      console.log(data)
    }
  }
};
</script>

<style lang="scss">
.operating {
  background: #fff;
  padding: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    span {
      padding: 5px 0;
      border: 1px solid #000;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      cursor: pointer;
      & + span {
        margin-left: 10px;
      }
    }
  }
  .right {
    input {
      padding: 10px;
      border: 1px solid #efefef;
      &:focus {
        outline: none;
      }
    }
  }
}
.image-list {
  display: flex;
  margin-top: 15px;
  flex-wrap: wrap;
}
#copy-url {
  position: fixed;
  left: -100%;
  bottom: -100%;
}
@import "./response.scss";
</style>
