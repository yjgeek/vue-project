<template>
  <div class="board">
    <p class="title" v-if="title">{{title}}</p>
    <div>
      <div class="item" v-for="(item, i) in sources" :key="i">
          <template v-if="i<3">
            <span class="num" :style="{background: color}">{{i+1}}</span>
            <el-tooltip :content="`销售额: ${item.val} 亿`" placement="bottom" effect="light">
              <span class="progress-bar" :style="{background: 'linear-gradient(to right, '+color+' '+20/(i+1)+'%, #ffffff 80%)'}"></span>
            </el-tooltip>
            <span class="name" :style="{color}" :title="item.name">{{item.name}}</span>
          </template>
          <template v-else>
            <span class="num">{{i+1}}</span>
            <el-tooltip :content="`销售额: ${item.val} 亿`" placement="bottom" effect="light">
              <span class="progress-bar"></span>
            </el-tooltip>
            <span class="name" :title="item.name">{{item.name}}</span>
          </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leaderboard-item',
  props: {
    title: {
      type: [String, Boolean],
      default () {
        return '排行榜'
      }
    },
    color: {
      type: String,
      default () {
        return '#f54228'
      }
    },
    sources: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.board {
   .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      $color: #bcbcbc;
      $start: 35;
      @for $i from 1 through 7 {
         &:nth-child(#{$i + 3}) .progress-bar {
            $start: $start - 10;
            background: linear-gradient(to right, $color $start + %,#ffffff 70%);
         }
      }
      .num {
         width: 25px;
         height: 25px;
         text-align: center;
         line-height: 25px;
         border-radius: 50%;
         color: #fff;
         font-weight: bold;
         font-size: 20px;
         background: $color;
      }
      .progress-bar {
         width: 70%;
         height: 25px;
         background: $color;
         background: linear-gradient(to right, $color 40%, #ffffff 70%);
         margin-left: 15px;
      }
      .name {
         font-weight: bold;
         width: 20%;
         color: $color;
         overflow: hidden;
         text-overflow: ellipsis;
         white-space: nowrap;
      }
   }
}
</style>
