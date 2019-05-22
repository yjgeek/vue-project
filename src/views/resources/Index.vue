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
      action="https://resource.yjgeek.com/api/file/upload"
      :headers="headers"
      v-if="isUpload"
      @close="isUpload=false; getListData(filterParams.parent_id);"
      :onSuccess="addResource"
    />
    <input type="text" id="copy-url" placeholder="这个是来复制url的" >
    <el-dialog
      title="README"
      :visible="dialogVisible"
      width="50%"
      :append-to-body="true"
      :before-close="handleClose">
      <div class="readme">
        <p>技术栈: <strong>Nodejs、Koa、Vue、图片库、视频库</strong></p>
        <ol>
          <li>有资源管理器的层级(人话: 就是可以有“文件夹”这个东西)</li>
          <li>上传任何的文件类型</li>
          <li>图片自动生成原图、压缩之后的图、缩略图(200*200)</li>
          <li>视频自动生成生成原视频、GIF封面</li>
          <li>能更改文件名称</li>
          <li>能删除资源(软的)，还能批量</li>
          <li>能预览图片、可以放大看、左右看、躺着看都行（点击图片就可以）</li>
          <li>右击某个文件就可以调出菜单了</li>
          <li>最后，不要删除我的“小仙女”</li>
          <li>最后，不要删除我的“小仙女”</li>
          <li>最后，不要删除我的“小仙女”</li>
          <li>三遍!!!</li>
        </ol>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mixin from './mixin'
import ResourceSelectDialog from './children/SelectDialog'
export default {
  name: "resource-list",
  mixins: [mixin],
  data () {
    return {
      dialogVisible: sessionStorage.dialogVisible ? false : true,
    }
  },
  components: {
    ResourceSelectDialog
  },
  methods: {
    handleClose () {
      this.dialogVisible = false;
      sessionStorage.dialogVisible = true;
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
.readme li{
  
  line-height: 30px;
}
#copy-url {
  position: fixed;
  left: -100%;
  bottom: -100%;
}
@import "./response.scss";
</style>
