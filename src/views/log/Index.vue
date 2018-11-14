<template>
  <div class="log">
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入标题" v-model="title"></el-input>
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" placeholder="请输入描述"  v-model="description">
      </el-input>
      <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6}" placeholder="请输入开发内容" @keyup.ctrl.enter.native="add" v-model="content">
      </el-input>
    </div>
    <timeline class="time-line">
      <template v-for="item in listData">
        <timeline-title :key="item.id">
          <div class="title" @dblclick="detail(item)">{{item.title}} <small>({{item.created_at}})</small></div>
        </timeline-title>
        <div class="description" v-if="item.description" :key="item.id+'b'">{{item.description}}</div>
        <timeline-item color="#9dd8e0" :key="item.id+'a'">
          <ul v-html="item.content_render"></ul>
        </timeline-item>
      </template>
    </timeline>
    <div class="load-data" v-if="loadData">
      <el-button type="primary" :loading="isLoading" size="small" @click="getData">加载更多</el-button>
    </div>
  </div>
</template>
<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
export default {
  data () {
    return {
      title: '',
      content: '',
      description: '',
      listData: [],
      page: 0,
      isLoading: false,
      loadData: true
    }
  },
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },
  methods: {
    getData () {
      let page = ++this.page
      this.isLoading = true
      this.$api['logDevelopmentOtherIndex']({ page })
        .then(res => {
          let {data, last_page: lastPage, current_page: currentPage} = res
          if (currentPage === lastPage) {
            this.loadData = false
          } else {
            this.loadData = true
          }
          data.map(item => {
            let arr = item.content.split(',')
            let str = ''
            arr.forEach(item => {
              str += `<li>${item}</li>`
            })
            item.content_render = str
            return item
          })
          this.listData = [...this.listData, ...data]
        })
        .finally(res => {
          this.isLoading = false
        })
    },
    detail (item) {
      this.title = item.title
      this.content = item.content
      this.id = item.id
      this.description = item.description;
      (function smoothscroll () {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll)
          window.scrollTo(0, currentScroll - currentScroll / 5)
        }
      })()
    },
    update () {
      const {title, content, description, id} = this
      this.$api['logDevelopmentOtherUpdate']({ title, content, description, id }).then(
        res => {
          this.listData = []
          this.page = 0
          this.getData()
          this.clear()
        }
      )
    },
    add () {
      if (this.id) return this.update()
      const { title, content, description } = this
      this.$api['logDevelopmentOtherAdd']({ title, content, description }).then(res => {
        this.page = 0
        this.listData = []
        this.getData()
        this.clear()
      })
    },
    clear () {
      this.title = ''
      this.content = ''
      this.description = ''
      this.id = ''
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style scoped>
  .log >>> .el-input,
  .log >>> .el-textarea,
  .log >>> .el-input__inner:hover,
  .log >>> .el-textarea__inner:hover,
  .log >>> .el-input__inner:focus,
  .log >>> .el-textarea__inner:focus{
    outline: none;
    border-color: #dcdfe6;
  }
  .log >>> .el-input__inner,
  .log >>> .el-textarea__inner{
    border-radius: 0;
  }
  .log >>> .el-textarea__inner{
    resize: none;
    border-top: none;
  }
</style>

<style lang="scss" scoped>
.time-line {
  margin-top: 30px;
}
ul {
  list-style-type: circle;
}
.load-data {
  margin: 15px 0;
  text-align: center;
}
.title {
  user-select: none;
  cursor: pointer;
}
.description{
  font-size: 14px;
  margin-left: 15px;
  color: #999;
  text-indent: 2em;
  font-style: italic;
  line-height: 22px;
}
</style>
