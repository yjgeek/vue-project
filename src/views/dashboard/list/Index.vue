<template>
    <div>
      <dashboard-platform-total-count />
      <dashboard-platform-and-product-count />
      <dashboard-leaderboard />
    </div>
</template>

<script>
import dashboardPlatformTotalCount from './PlatformTotalCount'
import dashboardPlatformAndProductCount from './PlatformAndProductCount'
import dashboardLeaderboard from './Leaderboard'
export default {
  name: 'dashboard-list',
  data () {
    return {}
  },
  components: {
    dashboardPlatformTotalCount,
    dashboardPlatformAndProductCount,
    dashboardLeaderboard
  }
}
</script>

<style>

</style>
