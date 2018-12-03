import { DATA_TYPE } from 'jsstore'
import datas from './data'
// import { Mock } from 'utils/index'

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
      name: 'shopSelectData',
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
      name: 'shopSelectData',
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
    }
  ],
  datas: datas
}
