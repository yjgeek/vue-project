import { DATA_TYPE } from 'jsstore'
import datas from './data'
// import { Mock } from 'utils/index'

export default {
  schemas: [
    {
      name: 'shopCategory', // 分类数据
      columns: [
        {
          name: 'id',
          primaryKey: true,
          autoIncrement: true
        },
        {
          name: 'pid',
          dataType: DATA_TYPE.Number
        },
        {
          name: 'name',
          notNull: true,
          dataType: DATA_TYPE.String
        }
      ]
    },
    {
      name: 'shopSelectData', // 选择数据，比如下拉框  单选框 复选框这些数据
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
        },
        {
          name: 'key',
          notNull: true,
          dataType: DATA_TYPE.String
        },
        {
          name: 'data',
          notNull: true,
          dataType: DATA_TYPE.Array
        }
      ]
    },
    {
      name: 'shopProduct', // 产品表
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
    },
    {
      name: 'shopMarketing', // 营销方案
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
        },
        {
          name: 'type',
          notNull: true,
          dataType: DATA_TYPE.String
        },
        {
          name: 'description',
          notNull: true,
          dataType: DATA_TYPE.String
        }
      ]
    }
  ],
  datas: datas
}
