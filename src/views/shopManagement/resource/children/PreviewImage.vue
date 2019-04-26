<template>
  <div class="resource-preview-image-dialog">
    <div class="resource-preview-image-dialog-close" @click="$emit('close')"><img :src="closeIcon" alt=""></div>
    <div class="resource-preview-image-dialog-body">
      <div class="img-cover">
        <img :src="currentActive.url" :style="imageStyle">
      </div>
      <div class="opearting">
        <span>
          <img :src="plusIcon" @click="handleZoom('plus')">
        </span>
        <span>
          <img :src="lessIcon" @click="handleZoom('less')">
        </span>
        <span>
          <img :src="arrowIcon" @click="handleSwitch('prev')">
        </span>
        <span>
          <img :src="arrowIcon" class="right-180" @click="handleSwitch('next')">
        </span>
        <span>
          <img :src="rotationLeftIcon" @click="handleRotation('left')">
        </span>
        <span>
          <img :src="rotationRightIcon" @click="handleRotation('right')">
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import arrowIcon from "../icon/arrow.svg";
import plusIcon from "../icon/plus.svg";
import lessIcon from "../icon/less.svg";
import rotationLeftIcon from "../icon/rotation-left.svg";
import rotationRightIcon from "../icon/rotation-right.svg";
import closeIcon from "../icon/close.svg";
export default {
  name: "resource-preview-image",
  props: {
    sources: {
      type: Array,
      default() {
        return {};
      }
    },
    active: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data() {
    return {
      arrowIcon,
      plusIcon,
      lessIcon,
      closeIcon,
      rotationLeftIcon,
      rotationRightIcon,
      index: 0,
      currentActive: {
        url: '',
        angle: 0,
        zoom: 1,
        width: 0,
        height: 0
      }
    };
  },
  computed: {
    imageStyle() {
      const { width, height, angle,zoom } = this.currentActive;
      let obj = { transform: `rotate(${angle || 0}deg) scale(${zoom || 0})` };
      if (width) {
        obj["width"] = width + "px";
      }
      if (height) {
        obj["height"] = height + "px";
      }
      return obj;
    }
  },
  methods: {
    analysisData (val) {
      const { width, height, angle } = getParams(val.url);
      if (width) this.currentActive["width"] = width;
      if (height) this.currentActive["height"] = height;
      if (angle) {
        this.currentActive.angle = Number(angle);
      } else {
        this.currentActive.angle = 0;
      }
      this.currentActive.url = val.url;
    },
    handleSwitch (type) {
      const {index, sources} = this;
      const len = sources.length;
      if (type === 'prev') {
        if (index === 0) {
          this.index = len - 1;
        } else {
          this.index = index - 1;
        }
      } else {
        if (index === len-1) {
          this.index = 0;
        } else {
          this.index = index + 1;
        }
      }
      this.analysisData(sources[this.index])
    },
    handleRotation(type) {
      const angle = this.currentActive.angle;
      if (type === 'right') {
        if (angle === 360) {
          this.currentActive.angle = 90; 
        } else {
          this.currentActive.angle += 90;
        }
      } else {
        if (angle === 0) {
          this.currentActive.angle = 270; 
        } else {
          this.currentActive.angle -= 90;
        }
      }
    },
    handleZoom(type) {
      if (type === 'plus') {
        this.currentActive.zoom += 0.2; 
        this.currentActive.zoom = Number(this.currentActive.zoom.toFixed(2))
      } else {
        if (this.currentActive.zoom <= 0.3) return false;
        this.currentActive.zoom -= 0.2; 
        this.currentActive.zoom = Number(this.currentActive.zoom.toFixed(2))
      }
    }
  },
  mounted(){
    document.body.style.overflow = 'hidden';
  },
  created () {
    this.analysisData(this.sources[0]);
  },
  beforeDestroy () {
    document.body.style.overflow = '';
  },
};
function getParams(url) {
  const arr = url.split("?");
  let obj = {};
  let params = arr[arr.length - 1];
  if (params) {
    params = params.split("&");
    params.forEach(item => {
      item = item.split("=");
      obj[item[0]] = item[1];
    });
  }
  return obj;
}
</script>

<style lang="scss" scoped>
.resource-preview-image-dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #2a2a2a;
  z-index: 999999;
  &-close{
    position: absolute;
    right: 5px;
    top: 5px;
    width: 35px;
    height: 35px;
    z-index: 9999999;
    img{
      width: 100%;
    }
  }
  &-body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: relative;
    padding-top: 30px;
    padding-bottom: 50px;
    .img-cover {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      width: 100%;
      height: calc(100% - 80px);
      img {
        max-width: 100%;
        max-height: 100%;
        user-select: none;
      }
    }
    .opearting {
      position: absolute;
      bottom: 10px;
      user-select: none;
      span {
        display: inline-block;
        padding: 5px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        img {
          width: 100%;
          &.right-180 {
            transform: rotate(-180deg);
          }
        }
        & + span {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
