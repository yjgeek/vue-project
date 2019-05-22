<template>
  <div class="right-menu" ref="rightmenu">
    <div class="menu" v-for="item in menus" @click="handleClick(item)"  :key="item.key">
      <div class="title">
        {{item.text}}<small v-if="item.key === 'rotation'">({{angle}})</small>
      </div>
      <div class="children" v-if="item.children">
        <template v-for="child in item.children">
          <div class="menu" :key="child.key" v-if="child.key === 'middle_url' && middleUrl" @click.stop="handleClick(child)">{{child.text}}</div>
          <div class="menu" :key="child.key" @click.stop="handleClick(child)" v-else-if="child.key !== 'middle_url'">{{child.text}}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "resource-right-menu",
  props: {
    sources: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      id: null,
      currentData: {},
      menus: [
        { key: "rename", text: "重命名" },
        { key: "move", text: "移动" },
        { key: "delete", text: "删除" },
        // { key: "rotation", text: "旋转" },
        {
          key: "copy-link",
          text: "复制链接",
          children: [
            { key: "source_url", text: "大图" },
            { key: "middle_url", text: "中图" },
            { key: "small_url", text: "小图" },
          ]
        }
      ]
    };
  },
  computed: {
    angle () {
      const data = this.sources.find(item => item.id == this.id);
      if (data) {
        return data.angle
      }
      return 0
    },
    middleUrl () {
      if (this.currentData.middle_url) {
        return this.currentData.middle_url
      }
      return false
    },
  },
  methods: {
    handleClick (item) {
      const {sources, id} = this;
      const index = sources.findIndex(item => item.id == id);
      this.$emit('change', {type: item.key, data: sources[index], index})
    }
  },
  mounted() {
    this.$elMenu = this.$refs.rightmenu;
    window.oncontextmenu = e => {
      let bool = false;
      let el = null;
      for (let i = 0, len = e.path.length; i < len; i++) {
        el = e.path[i];
        bool = el.classList ? el.classList.contains("resource-item") : false;
        if (bool) {
          e.preventDefault();
          break;
        }
      }
      if (bool) {
        const menu = this.$elMenu;
        let x = e.clientX;
        let y = e.clientY;
        if (x + 125 > window.innerWidth) {
          x = window.innerWidth - 135;
        }
        if (y + this.$elMenu.clientHeight > window.innerHeight) {
          y = window.innerHeight - this.$elMenu.clientHeight - 10;
        }
        menu.style.left = x + "px";
        menu.style.top = y + "px";
        menu.style.width = "125px";
        this.id = el.getAttribute("data-index");
        this.currentData = this.sources.find(item => item.id == this.id);
        window.onclick = () => {
          this.$elMenu.style.width = 0;
        };
      } else {
        this.$elMenu.style.width = 0;
        window.onclick = null;
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.right-menu {
  width: 0;
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  overflow: hidden;
  .menu {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      color: #f54228;
      .children {
        display: block;
      }
    }
    .children{
      position: absolute;
      right: 0;
      bottom: 0;
      display: none;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 5px;
    }
  }
}
</style>
