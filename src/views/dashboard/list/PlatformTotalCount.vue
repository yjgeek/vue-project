<template>
    <el-row :gutter="12" class="platform">
        <el-col :lg="6" :sm="12" :xs="24" v-for="(item, i) in data" :key="i" style="margin-bottom: 12px">
            <el-card shadow="always">
                <c-icon :type="item.icon" :style="{background: item.color}"/>
                <div>
                    <strong>{{item.title}}</strong>
                    <p style="margin-top: 10px"><font>￥{{item.total}}</font>亿</p>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
export default {
  name: 'dashboard-platform-total-count',
  data () {
    return {
      data: []
    }
  },
  created () {
    this.$api['dashboardPlatformTransactionLumpSum']().then(res => {
      this.data = res
    })
  }
}
</script>
<style scoped>
    .platform >>> .el-card__body{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .platform >>> .el-card__body i {
        font-size: 30px;
        color: #fff;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #f54228;
        text-align: center;
        line-height: 50px
    }
    .platform >>> .el-card__body > div{
        margin-left: 15px;
    }
    .platform >>> .el-card__body  font {
        color: red;
        margin-right: 8px;
    }
</style>

<style lang="scss" scoped>
</style>
