<template>
  <table>
    <thead>
      <tr>
        <td v-for="(item, i) in megerThead" :key="i">{{item}}</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in sources" :key="i">
        <td v-if="thead === '来源网站'">{{item.type}}</td>
        <td v-else><a :href="item.type" target="_blank">{{item.type}}</a></td>
        <td>{{item.pv}}</td>
        <td>{{totalCount !== 0 ? (item.pv / totalCount * 100).toFixed(2) : 0}}%</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'website-table-component',
  props: {
    thead: {
      type: String,
      default () {
        return '来源网站'
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
  },
  computed: {
    megerThead () {
      return [...[this.thead], '浏览量(PV)', '占比']
    },
    totalCount () {
      return this.sources.reduce((total, current) => total + current.pv, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
table{
  width: 100%;
  td{
    font-size: 12px;
    text-align: right;
    font-family: "微软雅黑";
    a{
      color: #1276e5;
    }
  }
  thead td{
    color: #787a7d;
    user-select: none;
    &:first-child{
      width: 70%;
    }
  }
  thead td,
  tbody td{
    &:first-child{
      text-align: left
    }
  }
  tbody td{
    padding: 5px 0;
  }
}
</style>
