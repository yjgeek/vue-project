import { DATA_TYPE } from 'jsstore'
import { Mock } from 'utils/index'

export default {
  schemas: [
    {
      name: 'shopCategory',
      columns: [
        {
          name: 'id',
          primaryKey: true,
          autoIncrement: true
        },
        {
          name: 'name',
          notNull: true,
          dataType: DATA_TYPE.String
        }
      ]
    }
  ],
  datas: {
    shopCategory: [
      {name: '国际名牌', create_time: Mock.mock('@date("yyyy-MM-dd HH:MM")')},
      {name: '奢侈品', create_time: Mock.mock('@date("yyyy-MM-dd HH:MM")')},
      {name: '汽车用品', create_time: Mock.mock('@date("yyyy-MM-dd HH:MM")')},
      {name: '男装', create_time: Mock.mock('@date("yyyy-MM-dd HH:MM")')},
      {name: '女装', create_time: Mock.mock('@date("yyyy-MM-dd HH:MM")')},
      {name: '男鞋', create_time: Mock.mock('@date("yyyy-MM-dd HH:MM")')},
      {name: '女鞋', create_time: Mock.mock('@date("yyyy-MM-dd HH:MM")')},
      {name: '手机数码', create_time: Mock.mock('@date("yyyy-MM-dd HH:MM")')},
      {name: '母婴童装', create_time: Mock.mock('@date("yyyy-MM-dd HH:MM")')},
      {name: '玩具乐器', create_time: Mock.mock('@date("yyyy-MM-dd HH:MM")')}
    ]
  }
}
