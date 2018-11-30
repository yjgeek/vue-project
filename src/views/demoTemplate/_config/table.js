import { DATA_TYPE } from 'jsstore'
import { Mock } from 'utils/index'
export default {
  schemas: [
    {
      name: 'product',
      columns: [
        {
          name: 'id',
          primaryKey: true,
          autoIncrement: true
        },
        {
          name: 'itemName',
          notNull: true,
          dataType: DATA_TYPE.String
        },
        {
          name: 'price',
          notNull: true,
          dataType: DATA_TYPE.Number
        },
        {
          name: 'quantity',
          notNull: true,
          dataType: DATA_TYPE.Number
        }
      ]
    },
    {
      name: 'user',
      columns: [
        {
          name: 'id',
          primaryKey: true,
          autoIncrement: true
        },
        {
          name: 'itemName',
          notNull: true,
          dataType: DATA_TYPE.String
        },
        {
          name: 'price',
          notNull: true,
          dataType: DATA_TYPE.Number
        },
        {
          name: 'quantity',
          notNull: true,
          dataType: DATA_TYPE.Number
        }
      ]
    }
  ],
  datas: {
    ...Mock.mock({
      'product|1-10': [
        {
          itemName: Mock.mock('@name'),
          ...Mock.mock({'price|1-1000': 1}),
          ...Mock.mock({'quantity|100-1000': 1})
        }
      ]
    }),
    ...Mock.mock({
      'user|1-10': [
        {
          itemName: Mock.mock('@name'),
          ...Mock.mock({'price|1-1000': 1}),
          ...Mock.mock({'quantity|100-1000': 1})
        }
      ]
    })
  }
}
