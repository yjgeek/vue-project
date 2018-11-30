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
    }
  }
}
