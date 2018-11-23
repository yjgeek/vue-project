<template>
  <el-row :gutter="12">
    <el-col :lg="12" :md="24" class="mb12">
      <el-card>
        <strong slot="header">Top10受访页面</strong>
        <website-table-component thead="受访页面" :sources="pageData" />
      </el-card>
    </el-col>
    <el-col :lg="12" :md="24" class="mb12">
      <el-card>
        <strong slot="header">新老访客</strong>
        <div class="user-info">
          <p><img :src="userImg" alt="用户图标"></p>
          <p> 新访客<br /><font>{{totalUser.new}}%</font></p>
          <p> 老访客<br /><font>{{totalUser.old}}%</font></p>
        </div>
        <table class="user-table" cellspacing="0"  cellpadding="0">
            <tr v-for="(item, i) in userData" :key="i">
              <td class="th">{{item.type}}</td>
              <td v-if="item.type === '平均访问页数'">{{item.new.toFixed(2)}}</td>
              <td v-else>{{item.new}}</td>
              <td v-if="item.type === '平均访问页数'">{{item.old.toFixed(2)}}</td>
              <td v-else>{{item.old}}</td>
            </tr>
        </table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import websiteTableComponent from './component/WebsiteTableComponent'
import userImg from './user-icon.png'
export default {
  name: 'dashboard-website-page-and-user',
  data () {
    return {
      pageData: [],
      userImg,
      userData: []
    }
  },
  components: {
    websiteTableComponent
  },
  computed: {
    totalUser () {
      let data = this.userData.filter(item => item.type === '访客数')[0]
      if (data) {
        let total = data.new + data.old
        return {
          new: (data.new / total * 100).toFixed(2),
          old: (data.old / total * 100).toFixed(2)
        }
      } else {
        return {
          new: 0,
          old: 0
        }
      }
    }
  },
  methods: {
    async getPageTop10 () {
      let data = await this.$api['dashboardPageTop10']()
      this.pageData = data
    },
    async getUserInfo () {
      let data = await this.$api['dashboardUserInfo']()
      this.userData = data
    },
    updateData () {
      this.getPageTop10()
      this.getUserInfo()
    }
  },
  created () {
    this.updateData()
  }
}
</script>

<style lang="scss" scoped>
.user-info{
  display: flex;
  p{
    width: 33.33%;
    border-right: 1px solid #e0dada;
    padding-left: 30px;
    box-sizing: border-box;
    &:first-child{
      padding-left: 0;
      text-align: center;
    }
    &:last-child{
      border-right: none;
      font {
        color: #0de0c4;
      }
    }
    font{
      font-size: 25px;
      font-weight: bold;
      margin-top: 5px;
      color:  #0dd84a;
      display: block;
    }
  }
}
.user-table{
  width: 100%;
  margin-top: 30px;
  td{
    width: 33.33%;
    padding: 5px 0 5px 30px;
    &.th{
      text-align: center;
      padding-left: 0;
    }
  }
}
.user-table,.user-table tr th, .user-table tr td { border:1px solid #eee; }
</style>
