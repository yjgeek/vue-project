import { resSend, Mock, parseOption } from 'utils/index'
import {sortBy} from 'lodash'
export default {
  '/dashboard/list/platformTransactionLumpSum?.*': {
    type: 'get',
    template () {
      return resSend([
        {title: '淘宝商城', ...Mock.mock({'total|1000-3000': 1}), color: Mock.Random.color(), icon: 'taobao'},
        {title: '京东商城', ...Mock.mock({'total|1000-3000': 1}), color: Mock.Random.color(), icon: 'jingdong'},
        {title: '天猫超市', ...Mock.mock({'total|1000-3000': 1}), color: Mock.Random.color(), icon: 'tianmao'},
        {title: '小米商城', ...Mock.mock({'total|1000-3000': 1}), color: Mock.Random.color(), icon: 'xiaomi'}
      ])
    }
  },
  '/dashboard/list/platform24HourCount?.*': {
    type: 'get',
    template () {
      let data = []
      let names = ['淘宝商城', '京东商城', '天猫超市', '小米商城', '唯品会', '拼多多']
      let start = [200, 30, 20, 10, 0, 80, 0]
      let increments = [50, 30, 10, 6, 16, 40, 2]
      let i = 1
      do {
        names.forEach((name, j) => {
          data.push({
            time: i,
            name,
            ...Mock.mock({[`price|${start[j]}-${start[j] + increments[j]}`]: 1})
          })
          start[j] += increments[j]
        })
        i++
      } while (i <= 24)
      return resSend(data)
    }
  },
  '/dashboard/list/platformProductTop10?.*': {
    type: 'get',
    template () {
      let data = []
      let names = ['保健食品', '牛奶粉', '面膜', '纸尿裤', '面部精华', '婴幼儿营养品', '乳液', '洁面', '卸妆产品', '化妆水']
      data = names.map(name => {
        return {
          name,
          ...Mock.mock({'price|100-500': 1})
        }
      })
      return resSend(data)
    }
  },
  '/dashboard/list/platformRanking?.*': {
    type: 'get',
    template () {
      let sources = {
        provinces: {
          color: Mock.Random.color(),
          data: []
        },
        citys: {
          color: Mock.Random.color(),
          data: []
        },
        progressCitys: {
          color: Mock.Random.color(),
          data: []
        },
        countries: {
          color: Mock.Random.color(),
          data: []
        }
      }
      let start = 50
      let i = 1
      let countries = ['日本', '美国', '韩国', '澳大利亚', '德国', '英国', '法国', '西班牙', '新西兰', '意大利']
      do {
        sources.provinces.data.push({
          name: Mock.Random.province(),
          ...Mock.mock({[`val|${start}-${start + 50}`]: 1})
        })
        sources.citys.data.push({
          name: Mock.Random.city(),
          ...Mock.mock({[`val|${start}-${start + 50}`]: 1})
        })
        sources.progressCitys.data.push({
          name: Mock.Random.city(),
          ...Mock.mock({[`val|${start}-${start + 50}`]: 1})
        })
        sources.countries.data.push({
          name: countries[i - 1],
          ...Mock.mock({[`val|${start}-${start + 50}`]: 1})
        })
        i++
        start += 50
      } while (i <= 10)
      sources.provinces.data = sources.provinces.data.reverse()
      sources.citys.data = sources.citys.data.reverse()
      sources.progressCitys.data = sources.progressCitys.data.reverse()
      sources.countries.data = sources.countries.data.reverse()
      return resSend(sources)
    }
  },
  '/dashboard/website/realTimeTraffic?.*': {
    type: 'get',
    template (option) {
      const data = parseOption(option)
      let {type} = data.params || {}
      let sources = {}
      let i = 0
      let keys = ['today', 'yesterday', 'predictionToday']
      if (type === '2') {
        keys = ['yesterdayNow', 'everyDay', 'history']
      }
      do {
        sources[keys[i]] = getWebsiteInfo()
        i++
      } while (i < 3)
      return resSend(sources)
    }
  },
  '/dashboard/website/trend?.*': {
    type: 'get',
    template (option) {
      let data = []
      let i = 1
      const today = Mock.Random.now('yyyy-MM-dd')
      const yesterday = new Date(new Date().getTime() - 86400000)
      do {
        // 昨天
        data.push({
          time: i,
          date: `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`,
          ...Mock.mock({'val|0-1000': 1})
        })
        // 今天
        data.push({
          time: i,
          date: today,
          dateMask: today,
          ...Mock.mock({'val|0-1000': 1})
        })
        i++
      } while (i <= 24)
      return resSend(data)
    }
  },
  '/dashboard/website/keyword?.*': {
    type: 'get',
    template (option) {
      let sources = []
      let i = 0
      do {
        sources.push({
          x: Mock.mock(['@cname', '@word'][parseInt(Math.random() * 20 / 10)]),
          ...Mock.mock({'value|0-3000': 1}),
          category: ['百度', 'Google', '搜狗', '必应', '360搜索', '今日头条', '虚位以待'][parseInt(Math.random() * 70 / 10)]
        })
        i++
      } while (i < 49)
      // sources = [{'x': 'China', 'value': 1383220000, 'category': 'asia'}, {'x': 'India', 'value': 1316000000, 'category': 'asia'}, {'x': 'United States', 'value': 324982000, 'category': 'america'}, {'x': 'Indonesia', 'value': 263510000, 'category': 'asia'}, {'x': 'Brazil', 'value': 207505000, 'category': 'america'}, {'x': 'Pakistan', 'value': 196459000, 'category': 'asia'}, {'x': 'Nigeria', 'value': 191836000, 'category': 'africa'}, {'x': 'Bangladesh', 'value': 162459000, 'category': 'asia'}, {'x': 'Russia', 'value': 146804372, 'category': 'europe'}, {'x': 'Japan', 'value': 126790000, 'category': 'asia'}, {'x': 'Mexico', 'value': 123518000, 'category': 'america'}, {'x': 'Ethiopia', 'value': 104345000, 'category': 'africa'}, {'x': 'Philippines', 'value': 104037000, 'category': 'asia'}, {'x': 'Egypt', 'value': 93013300, 'category': 'africa'}, {'x': 'Vietnam', 'value': 92700000, 'category': 'asia'}, {'x': 'Germany', 'value': 82800000, 'category': 'europe'}, {'x': 'Democratic Republic of the Congo', 'value': 82243000, 'category': 'africa'}, {'x': 'Iran', 'value': 80135400, 'category': 'asia'}, {'x': 'Turkey', 'value': 79814871, 'category': 'asia'}, {'x': 'Thailand', 'value': 68298000, 'category': 'asia'}, {'x': 'France', 'value': 67013000, 'category': 'europe'}, {'x': 'United Kingdom', 'value': 65110000, 'category': 'europe'}, {'x': 'Italy', 'value': 60599936, 'category': 'europe'}, {'x': 'Tanzania', 'value': 56878000, 'category': 'africa'}, {'x': 'South Africa', 'value': 55908000, 'category': 'africa'}, {'x': 'Myanmar', 'value': 54836000, 'category': 'asia'}, {'x': 'South Korea', 'value': 51446201, 'category': 'asia'}, {'x': 'Colombia', 'value': 49224700, 'category': 'america'}, {'x': 'Kenya', 'value': 48467000, 'category': 'africa'}, {'x': 'Spain', 'value': 46812000, 'category': 'europe'}, {'x': 'Argentina', 'value': 43850000, 'category': 'america'}, {'x': 'Ukraine', 'value': 42541633, 'category': 'europe'}, {'x': 'Sudan', 'value': 42176000, 'category': 'africa'}, {'x': 'Uganda', 'value': 41653000, 'category': 'africa'}, {'x': 'Algeria', 'value': 41064000, 'category': 'africa'}, {'x': 'Poland', 'value': 38424000, 'category': 'europe'}, {'x': 'Iraq', 'value': 37883543, 'category': 'asia'}, {'x': 'Canada', 'value': 36541000, 'category': 'america'}, {'x': 'Morocco', 'value': 34317500, 'category': 'africa'}, {'x': 'Saudi Arabia', 'value': 33710021, 'category': 'asia'}, {'x': 'Uzbekistan', 'value': 32121000, 'category': 'asia'}, {'x': 'Malaysia', 'value': 32063200, 'category': 'asia'}, {'x': 'Peru', 'value': 31826018, 'category': 'america'}, {'x': 'Venezuela', 'value': 31431164, 'category': 'america'}, {'x': 'Nepal', 'value': 28825709, 'category': 'asia'}, {'x': 'Angola', 'value': 28359634, 'category': 'africa'}, {'x': 'Ghana', 'value': 28308301, 'category': 'africa'}, {'x': 'Yemen', 'value': 28120000, 'category': 'asia'}, {'x': 'Afghanistan', 'value': 27657145, 'category': 'asia'}, {'x': 'Mozambique', 'value': 27128530, 'category': 'africa'}, {'x': 'Australia', 'value': 24460900, 'category': 'australia'}, {'x': 'North Korea', 'value': 24213510, 'category': 'asia'}, {'x': 'Taiwan', 'value': 23545680, 'category': 'asia'}, {'x': 'Cameroon', 'value': 23248044, 'category': 'africa'}, {'x': 'Ivory Coast', 'value': 22671331, 'category': 'africa'}, {'x': 'Madagascar', 'value': 22434363, 'category': 'africa'}, {'x': 'Niger', 'value': 21564000, 'category': 'africa'}, {'x': 'Sri Lanka', 'value': 21203000, 'category': 'asia'}, {'x': 'Romania', 'value': 19760000, 'category': 'europe'}, {'x': 'Burkina Faso', 'value': 19632147, 'category': 'africa'}, {'x': 'Syria', 'value': 18907000, 'category': 'asia'}, {'x': 'Mali', 'value': 18875000, 'category': 'africa'}, {'x': 'Malawi', 'value': 18299000, 'category': 'africa'}, {'x': 'Chile', 'value': 18191900, 'category': 'america'}, {'x': 'Kazakhstan', 'value': 17975800, 'category': 'asia'}, {'x': 'Netherlands', 'value': 17121900, 'category': 'europe'}, {'x': 'Ecuador', 'value': 16737700, 'category': 'america'}, {'x': 'Guatemala', 'value': 16176133, 'category': 'america'}, {'x': 'Zambia', 'value': 15933883, 'category': 'africa'}, {'x': 'Cambodia', 'value': 15626444, 'category': 'asia'}, {'x': 'Senegal', 'value': 15256346, 'category': 'africa'}, {'x': 'Chad', 'value': 14965000, 'category': 'africa'}, {'x': 'Zimbabwe', 'value': 14542235, 'category': 'africa'}, {'x': 'Guinea', 'value': 13291000, 'category': 'africa'}, {'x': 'South Sudan', 'value': 12131000, 'category': 'africa'}, {'x': 'Rwanda', 'value': 11553188, 'category': 'africa'}, {'x': 'Belgium', 'value': 11356191, 'category': 'europe'}, {'x': 'Tunisia', 'value': 11299400, 'category': 'africa'}, {'x': 'Cuba', 'value': 11239004, 'category': 'america'}, {'x': 'Bolivia', 'value': 11145770, 'category': 'america'}, {'x': 'Somalia', 'value': 11079000, 'category': 'africa'}, {'x': 'Haiti', 'value': 11078033, 'category': 'america'}, {'x': 'Greece', 'value': 10783748, 'category': 'europe'}, {'x': 'Benin', 'value': 10653654, 'category': 'africa'}, {'x': 'Czech Republic', 'value': 10578820, 'category': 'europe'}, {'x': 'Portugal', 'value': 10341330, 'category': 'europe'}, {'x': 'Burundi', 'value': 10114505, 'category': 'africa'}, {'x': 'Dominican Republic', 'value': 10075045, 'category': 'america'}, {'x': 'Sweden', 'value': 10054100, 'category': 'europe'}, {'x': 'United Arab Emirates', 'value': 10003223, 'category': 'asia'}, {'x': 'Jordan', 'value': 9889270, 'category': 'asia'}, {'x': 'Azerbaijan', 'value': 9823667, 'category': 'asia'}, {'x': 'Hungary', 'value': 9799000, 'category': 'europe'}, {'x': 'Belarus', 'value': 9498600, 'category': 'europe'}, {'x': 'Honduras', 'value': 8866351, 'category': 'america'}, {'x': 'Austria', 'value': 8773686, 'category': 'europe'}, {'x': 'Tajikistan', 'value': 8742000, 'category': 'asia'}, {'x': 'Israel', 'value': 8690220, 'category': 'asia'}, {'x': 'Switzerland', 'value': 8417700, 'category': 'europe'}, {'x': 'Papua New Guinea', 'value': 8151300, 'category': 'australia'}]
      sources.push({
        x: '袁杰的博客',
        value: 8000,
        category: 'Google'
      })
      return resSend(sources)
    }
  },
  '/dashboard/website/sourceWebsite?.*': {
    type: 'get',
    template (option) {
      let sources = []
      const arr = ['百度', 'Google', '搜狗', '必应', '360搜索', '今日头条', '虚位以待', '微博', 'QQ', '袁杰的博客']
      let i = 0
      do {
        sources.push({
          ...Mock.mock({'pv|0-3000': 1}),
          type: arr[parseInt(Math.random() * (arr.length * 10) / 10)]
        })
        i++
      } while (i < 10)
      return resSend(sortBy(sources, ['pv']).reverse())
    }
  },
  '/dashboard/website/sourcePage?.*': {
    type: 'get',
    template (option) {
      let sources = []
      let i = 0
      do {
        sources.push({
          ...Mock.mock({'pv|0-3000': 1}),
          type: 'http://' + Mock.mock('@domain()')
        })
        i++
      } while (i < 10)
      return resSend(sortBy(sources, ['pv']).reverse())
    }
  },
  '/dashboard/website/pageTop10?.*': {
    type: 'get',
    template (option) {
      let sources = []
      let i = 0
      do {
        sources.push({
          ...Mock.mock({'pv|0-3000': 1}),
          type: 'http://' + Mock.mock('@domain()')
        })
        i++
      } while (i < 10)
      return resSend(sortBy(sources, ['pv']).reverse())
    }
  },
  '/dashboard/website/userInfo?.*': {
    type: 'get',
    template (option) {
      let sources = []
      sources.push({
        type: '浏览量',
        ...Mock.mock({'new|0-3000': 1}),
        ...Mock.mock({'old|0-3000': 1})
      })
      sources.push({
        type: '访客数',
        ...Mock.mock({'new|0-3000': 1}),
        ...Mock.mock({'old|0-3000': 1})
      })
      sources.push({
        type: '跳出率',
        ...Mock.mock({'new|0-100': 1}),
        ...Mock.mock({'old|0-100': 1})
      })
      sources.push({
        type: '平局访问时长',
        new: Mock.Random.now('HH:mm:ss'),
        old: Mock.Random.now('HH:mm:ss')
      })
      sources.push({
        type: '平均访问页数',
        ...Mock.mock({'new|1-100.1-10': 1}),
        ...Mock.mock({'old|1-100.1-10': 1})
      })
      return resSend(sources)
    }
  }
}
function getWebsiteInfo () {
  return {
    ...Mock.mock({'pv|1-1000': 100}),
    ...Mock.mock({'uv|1-1000': 100}),
    ...Mock.mock({'ip|1-1000': 100}),
    ...Mock.mock({'target|1-100.1-10': 1}),
    ...Mock.mock({'conversion|1-100.1-10': 1}),
    time: Mock.mock('@time')
  }
}
