<template>
<div>
  <div class="mb15" style="text-align: right">
    <el-button  type="primary" @click="$router.push({name: 'shopMarketingAdd'})">添加</el-button>
  </div>
  <el-row :gutter="15" class="marketing">
    <el-col v-for="item in listData" :key="item.id" :xl="4" :lg="6" :md="8" :sm="12" :xs="24" class="item mb15">
      <div class="wrapper">
        <div class="box">
          <p class="name">{{item.name}}</p>
          <p class="description">{{item.description}}</p>
          <p class="info">
            <span>进行中: <font>18</font></span>
            <span>已结束: <font>28</font></span>
          </p>
          <div class="item-mask">
            <el-button size="small" type="danger" @click="remove(item.id)">删除</el-button>
            <el-button size="small" type="primary" @click="$router.push({name: 'shopMarketingCollection', params: {name: item.name, item}})">查看详情</el-button>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
  <router-view @update="getData" />
</div>
</template>

<script>
export default {
  name: 'shop-marketing-center',
  data () {
    return {
      listData: []
    }
  },
  methods: {
    getData () {
      this.$db.select('shopMarketing').then(res => {
        this.listData = res
      })
    },
    remove (id) {
      this.$db.remove('shopMarketing', id).then(res => {
        this.$message.success('删除成功')
        this.getData()
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
$color_group: (#15a287,#5cb85c,#d9534f,#567e95,#b433ff,#00a67c,#b37333,#f60);
.item{
  @for $i from 1 through length($color_group) {
    &:nth-child(#{length($color_group)}n + #{$i}){
      .wrapper .box {
        background: nth($color_group, $i);
        box-shadow: 0 0 20px nth($color_group, $i);
      }
    }
  }
}
.wrapper{
  box-sizing: border-box;
  max-width: 300px;
  height: 280px;
  margin: 0 auto;
  .box{
    color: #fff;
    padding: 15px;
    border-radius: 2px;
    background: #37b3b9;
    height: 100%;
    box-sizing: border-box;
    cursor: default;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 0 20px #37b3b9;
    position: relative;
    .name{
      font-size: 22px;
      font-weight: 600;
      text-shadow: 0 1px 1px #000;
      letter-spacing: 0.5ch;
      text-align: center;
    }
    .description{
      font-size: 14px;
    }
    .info{
      padding: 15px 0;
      color: #f1f1f1;
      span:last-child{
        float: right;
      }
    }
    &:hover{
      .item-mask{
        transform: scaleX(1);
        transform-origin: bottom left;
      }
    }
    .item-mask{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      background: rgba($color: #000000, $alpha: .5);
      transform: scaleX(0);
      transform-origin: bottom right;
      transition: transform .4s ease-out;
    }
  }
}
</style>
