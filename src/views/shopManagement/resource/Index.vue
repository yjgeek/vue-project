<template>
  <div>
    <div class="operating">
      <div class="left">
        <span @click="isUpload=true">上传资源</span>
        <span @click="addDir">新建文件夹</span>
        <span>批量删除</span>
        <span>全选</span>
      </div>
      <div class="right hide-i-768">
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
    <resource-path @change="getListData" :sources="pathList" :active="filterParams.parent_id"/>
    <div class="image-list">
      <resource-item
        v-for="item in resourceList"
        :data="item"
        :key="item.id"
        @change="getListData"
        @changeName="handleChangeName"
        @opearting="handleOpearting"
        @previewImage="handlePreviewImage"
      />
    </div>
    <resource-right-menu :sources="resourceList" @change="handleRightChange"/>
    <resource-preview-image :sources="previewImageList" v-if="isPreview"  @close="isPreview=false"/>
    <resource-upload
      action="http://127.0.0.1:4000/api/file/upload"
      :headers="headers"
      :visible="isUpload"
      @close="isUpload=false; getListData(filterParams.parent_id);"
      :onSuccess="addResource"
    />
    <input type="text" id="copy-url" :value="url">
  </div>
</template>

<script>
import ResourceItem from "./children/Item";
import ResourcePath from "./children/Path";
import ResourceRightMenu from "./children/RightMenu";
import ResourceUpload from "./children/Upload";
import ResourcePreviewImage from "./children/PreviewImage";
import folderIcon from "./icon/folder.png";
export default {
  name: "resource-list",
  data() {
    return {
      isUpload: false,
      isPreview: false,
      expandList: {},
      resourceList: [],
      pathList: [],
      url: "asdfasdfasdf",
      headers: {
        Authorization: "8dbd9c4175ad474e87de00f94ba50bc5155546679738413480014324"
      },
      previewImageList: [],
      filterParams: {
        keyword: "",
        page: 1,
        parent_id: 0
      }
    };
  },
  methods: {
    getListData(id) {
      if (id || id === 0) {
        this.filterParams.parent_id = id;
        this.filterParams.page = 1;
        this.filterParams.keyword = "";
      }
      this.$api.shopResourceIndex(this.filterParams).then(res => {
        const exts = this.expandList;
        res.list.forEach(item => {
          const extCover = exts[item.ext];
          if (item.type === 1) {
            item.small_url = exts["folder"] || folderIcon;
          } else if (
            extCover === "smail_url" ||
            extCover === "middle_url" ||
            extCover === "source_url"
          ) {
            item.small_url = "http://127.0.0.1:4000/" + item[extCover];
          } else {
            item.small_url = "http://127.0.0.1:4000/" + item.small_url;
          }
          item.isChange = false;
        });
        this.filterParams.page = res.page;
        this.resourceList = res.list;
        this.pathList = res.pathList;
      });
    },
    addResource (res, type) {
      if (res.code === 200) {
        this.$api.shopResourceAdd({data: res.data, parent_id: this.filterParams.parent_id})
      } else {
        alert(res.message)
      }
    },
    addDir () {
      this.$api.shopResourceAdd({data: {name: '新建文件夹', type: 1}, parent_id: this.filterParams.parent_id}).then(res => {
        this.getListData(this.filterParams.parent_id);
      })
    },
    removeResource (leave_paths) {
      this.$api.shopResourceDelete({leave_paths}).then(res => {
        this.getListData(this.filterParams.parent_id);
      })
    },
    handleOpearting(item) {
      this.url = item.source_url;
      const $el = document.getElementById("copy-url");
      $el.select();
      const bool = document.execCommand("Copy");
      console.log(bool);
    },
    handleSearch() {
      this.filterParams.page = 1;
      this.getListData();
    },
    handleChangeName({ id, newName, data }) {
      if (!newName) {
        data.isChange = false;
        this.resourceList = this.resourceList.slice();
        return false;
      };
      this.$api.shopResourceUpdate({ name: newName, id, type: 1 }).then(res => {
        this.getListData();
      });
    },
    // 旋转图片
    handleRotationImage ({id, angle}) {
      angle = Number(angle);
      if (angle === 360) {
        angle = 90;
      } else {
        angle += 90;
      }
      this.$api.shopResourceChangeDirection({id, angle}).then(res => {
        this.getListData(this.filterParams.parent_id)
      })
    },
    handlePreviewImage (data) {
      let arr = [{url: `http://127.0.0.1:4000/${data.source_url}?angle=${data.angle}`}];
      this.resourceList.forEach(item => {
        if (item.id !== data.id && /^image/.test(item.mime_type)) {
          arr.push({url: `http://127.0.0.1:4000/${item.source_url}?angle=${item.angle}`})
        }
      })
      this.previewImageList = arr;
      this.isPreview = true;
    },
    // 右键菜单
    handleRightChange({ type, data, index }) {
      switch (type) {
        case "rename":
          data.isChange = true;
          this.resourceList.slice();
          break;
        case "delete":
          this.removeResource(data.leave_path);
          break;
        case "rotation":
          this.handleRotationImage(data);
          break;
        default:
          break;
      }
    }
    
  },
  components: {
    ResourceItem,
    ResourcePath,
    ResourceRightMenu,
    ResourceUpload,
    ResourcePreviewImage
  },
  created() {
    this.$api.shopResourceExpandIndex().then(res => {
      let obj = {};
      res.forEach(item => {
        obj[item.name] = item.cover;
      });
      this.expandList = obj;
      this.getListData();
    });
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
