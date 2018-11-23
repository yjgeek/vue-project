import Icon from 'components/IconFont'
import StrongDialog from 'components/strongDialog'
import StrongList from 'components/strongList'
import CBreadcrumb from 'components/Breadcrumb'
import CFooter from 'components/Footer'
export default {
  data () {
    return {
    }
  },
  computed: {
    windowSize () {
      return this.$store.state.windowSize
    }
  },
  methods: {
    // 获取本地存储的值
    getLocalStorage (key, bool) {
      if (key) {
        if (localStorage[key]) {
          if (bool) {
            return JSON.parse(localStorage[key])
          } else {
            return localStorage[key]
          }
        } else {
          return false
        }
      }
    },
    // 存到本地存储的值
    setLocalStorage (key, data) {
      if (!key) {
        console.warn('key不能为空!')
        return false
      }
      if (typeof data === 'object') {
        localStorage[key] = JSON.stringify(data)
      } else {
        localStorage[key] = data
      }
    },

    // 根据Object的某个key进去排序
    sortObj (prop) {
      return function (obj1, obj2) {
        var val1 = obj1[prop]
        var val2 = obj2[prop]
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1)
          val2 = Number(val2)
        }
        if (val1 < val2) {
          return -1
        } else if (val1 > val2) {
          return 1
        } else {
          return 0
        }
      }
    }

  },
  components: {
    Icon,
    StrongList,
    StrongDialog,
    CBreadcrumb,
    CFooter
  }
}
