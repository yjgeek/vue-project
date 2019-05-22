import ResourceItem from "./children/Item";
import ResourcePath from "./children/Path";
import ResourceRightMenu from "./children/RightMenu";
import ResourceUpload from "./children/Upload";
import ResourcePreviewImage from "./children/PreviewImage";
import ResourceDialog from "./children/Dialog";
import folderIcon from "./icon/folder.png";

export default {
  data() {
    return {
      isUpload: false,
      isPreview: false,
      isMove: false,
      isAllSelect: false,
      isSelectDialog: false,
      moveId: null,
      expandList: {},
      resourceList: [],
      pathList: [],
      fileHost: 'https://resource.yjgeek.com/',
      headers: {
        Authorization: this.$config.AXIOS_DEFAULT_CONFIG.headers.Authorization
      },
      previewImageList: [],
      filterParams: {
        keyword: "",
        parent_id: sessionStorage.pathId || 0
      }
    };
  },
  methods: {
    getListData(id) {
      this.isAllSelect = false;
      if (id || id === 0) {
        this.filterParams.parent_id = id;
        this.filterParams.keyword = "";
      }
      this.$api.resourcesIndex(this.filterParams).then(res => {
        const exts = this.expandList;
        res.resources.forEach(item => {
          const extCover = exts[item.ext];
          if (item.type === 1) {
            item.cover = exts["folder"] || folderIcon;
          } else if (extCover === "small_url" || extCover === "middle_url" || extCover === "source_url") {
            item.cover = this.fileHost + item[extCover];
          } else {
            item.cover = extCover;
          }
          item.isChange = false;
          item.isSelect = false;
        });
        this.resourceList = res.resources;
        this.pathList = res.pathList;
      });
    },
    addResource(res, type) {
      if (res.code === 200) {
        this.$api.resourcesAdd({ data: res.data, parent_id: this.filterParams.parent_id })
      } else {
        alert(res.message)
      }
    },
    addDir() {
      this.$api.resourcesAdd({ data: { name: '新建文件夹', type: 1 }, parent_id: this.filterParams.parent_id }).then(res => {
        this.getListData(this.filterParams.parent_id);
      })
    },
    removeResource(type, leave_paths) {
      if (type === 1) {
        leave_paths = [];
        this.resourceList.forEach(item => {
          if (item.isSelect) {
            leave_paths.push(item.leave_path);
          }
        })
        if (!leave_paths.length) return alert('请选择资源')
      }
      this.$api.resourcesDelete({ leave_paths }).then(res => {
        this.getListData(this.filterParams.parent_id);
      })
    },
    handleSearch() {
      this.filterParams.page = 1;
      this.getListData();
    },
    handleAllSelect() {
      this.isAllSelect = !this.isAllSelect;
      this.resourceList = this.resourceList.map(item => {
        item.isSelect = this.isAllSelect;
        return item;
      })
    },
    handleSelect(data) {
      data.isSelect = !data.isSelect;
      this.resourceList.slice();
    },
    handleChangeName({ id, newName, data }) {
      if (!newName) {
        data.isChange = false;
        this.resourceList = this.resourceList.slice();
        return false;
      };
      this.$api.resourcesUpdate({ name: newName, id, type: 1 }).then(res => {
        this.getListData();
      });
    },
    handlePreviewImage(data) {
      // 不是图片不给它预览
      if (!/^image/.test(data.mime_type)) return false;
      let arr = [{ url: `${this.fileHost}${data.source_url}?angle=${data.angle}` }];
      this.resourceList.forEach(item => {
        if (item.id !== data.id && /^image/.test(item.mime_type)) {
          arr.push({ url: `${this.fileHost}${item.source_url}?angle=${item.angle}` })
        }
      })
      this.previewImageList = arr;
      this.isPreview = true;
    },
    handleMove() {
      const { moveId, filterParams: { parent_id } } = this;
      if (!moveId) return false;
      this.$api.resourcev2Update({ group_id: parent_id, id: moveId, type: 2 }).then(res => {
        this.getListData();
        this.isMove = false;
      });
    },
    handleCopy(url) {
      const $el = document.getElementById("copy-url");
      $el.value = url;
      $el.select();
      const bool = document.execCommand("Copy");
      if (bool) {
        this.$message.success("复制成功")
      }
    },
    // 右键菜单
    handleRightChange({ type, data, index }) {
      switch (type) {
        case "rename":
          data.isChange = true;
          this.resourceList.slice();
          break;
        case "delete":
          this.removeResource(2, data.leave_path);
          break;
        case "rotation":
          this.handleRotationImage(data);
          break;
        case "move":
          this.isMove = true;
          this.moveId = data.id;
          break;
        case "source_url":
        case "middle_url":
        case "small_url":
          this.handleCopy(this.fileHost + data[type]);
          break;
        case "copy-link":
          // 组装 middle_url ? source_url & middle_url
          let url = this.fileHost;
          if (data['middle_url']) {
            url = `${url}${data['middle_url']}?source_url=${this.fileHost}${data['source_url']}`;
          } else {
            url += data['source_url'] + '?'; 
          }
          if (data['small_url']) {
            if (url.substr(url.length - 1, 1) !== '?') {
              url = url + '&'
            }
            url = `${url}small_url=${this.fileHost}${data['small_url']}`
          }
          this.handleCopy(url);
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
    ResourcePreviewImage,
    ResourceDialog,
  },
  created() {
    this.$api.resourcesExpandIndex().then(res => {
      let obj = {};
      res.forEach(item => {
        obj[item.name] = item.cover;
      });
      this.expandList = obj;
      this.getListData();
    });
  }
}