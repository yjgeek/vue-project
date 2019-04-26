<template>
  <div class="resource-item" :data-index="data.id">
    <div class="cover-wrapper" v-if="data.type === 1" @click="$emit('change', data.id)">
      <div class="cover">
        <img :src="data.small_url" alt="" :style="imageStyle">
      </div>
    </div>
    <div class="cover-wrapper" v-else>
      <div class="cover">
        <img :src="data.small_url" alt="" @click="$emit('previewImage', data)" :style="imageStyle">
        <div class="video" v-if="isVideo">
          <img :src="playIcon" alt="播放" @click="handlePlay(data)">
        </div>
      </div>
    </div>
    <div class="title" :title="data.name">
      <span v-if="!data.isChange">{{data.name}}<template v-if="data.type !== 1">.{{data.ext}}</template></span>
      <div class="rename" v-else>
        <input v-focus type="text" onfocus="this.select()" v-model="name" placeholder="请输入名字" @blur="handleChange(data);name='';">
      </div>
    </div>
  </div>
</template>

<script>
import playIcon from '../icon/play.svg'
export default {
  name: 'resource-item',
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      name: this.data.name,
      playIcon
    }
  },
  computed: {
    isVideo () {
      return /^video/.test(this.data.mime_type);
    },
    imageStyle () {
      return {
        transform: `rotate(${this.data.angle || 0}deg)`,
        '-ms-transform': `rotate(${this.data.angle || 0}deg)`,
        '-moz-transform': `rotate(${this.data.angle || 0}deg)`,
        '-webkit-transform': `rotate(${this.data.angle || 0}deg)`,
        '-o-transform': `rotate(${this.data.angle || 0}deg)`,
      }
    }
  },
  methods: {
    handleChange (data) {
      this.$emit('changeName', {id: data.id, newName: this.name, data});
    },
    handlePlay (data) {
      window.open('http://127.0.0.1:4000/'+data.source_url)
    }
  },
  watch: {
    'data.isChange'(val){
      if (val) {
        this.name = this.data.name
      }
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      }
    }
  },
  created () {}
}
</script>

<style lang="scss" scoped>
.resource-item{
  width: 120px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  border-radius: 5px;
  background: #fff;
  margin: 0 15px 15px 0;
  position: relative;
  .cover-wrapper{
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    padding: 5px;
    .cover{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      >img{
        display: block;
        max-width: 100%;
      }
      .video{
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, .5);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 30px;
          height: 30px;
        }
      }
    }
  }
  .title{
    font-size: 12px;
    padding: 5px;
    border-top: 1px solid #efefef;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    input{
      border: #f1f1f1;
      width: 100%;
    }
  }
}
</style>
