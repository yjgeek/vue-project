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
      fileHost: 'http://192.168.1.106:4000/',
      headers: {
        Authorization: "8dbd9c4175ad474e87de00f94ba50bc5155546679738413480014324"
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
      this.$api.shopResourceIndex(this.filterParams).then(res => {
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
        this.$api.shopResourceAdd({ data: res.data, parent_id: this.filterParams.parent_id })
      } else {
        alert(res.message)
      }
    },
    addDir() {
      this.$api.shopResourceAdd({ data: { name: '新建文件夹', type: 1 }, parent_id: this.filterParams.parent_id }).then(res => {
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
      this.$api.shopResourceDelete({ leave_paths }).then(res => {
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
      this.$api.shopResourceUpdate({ name: newName, id, type: 1 }).then(res => {
        this.getListData();
      });
    },
    // 旋转图片
    handleRotationImage({ id, angle }) {
      angle = Number(angle);
      if (angle === 360) {
        angle = 90;
      } else {
        angle += 90;
      }
      this.$api.shopResourceChangeDirection({ id, angle }).then(res => {
        this.getListData(this.filterParams.parent_id)
      })
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
      this.$api.shopResourceUpdate({ group_id: parent_id, id: moveId, type: 2 }).then(res => {
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
        console.log('复制成功')
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
          this.handleCopy(data[type]);
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
    this.$api.shopResourceExpandIndex().then(res => {
      let obj = {};
      res.forEach(item => {
        obj[item.name] = item.cover;
      });
      this.expandList = obj;
      this.getListData();
    });
  }
}