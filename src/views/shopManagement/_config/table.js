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
        },
        {
          name: 'create_time',
          notNull: true,
          dataType: DATA_TYPE.DateTime
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
        }
      ]
    },
    {
      name: 'shopMarketingCollection', // 营销方案具体活动列表
      columns: [
        {
          name: 'id',
          primaryKey: true,
          autoIncrement: true
        },
        {
          name: 'shop_marketing_id',
          notNull: true,
          dataType: DATA_TYPE.Number
        },
        {
          name: 'title',
          notNull: true,
          dataType: DATA_TYPE.String
        },
        {
          name: 'create_time',
          notNull: true,
          dataType: DATA_TYPE.DateTime
        },
        {
          name: 'end_time',
          notNull: true,
          dataType: DATA_TYPE.DateTime
        },
        {
          name: 'status', // 1进行中 2结束
          notNull: true,
          dataType: DATA_TYPE.Number
        }
      ]
    },
    {
      name: 'shopMarketingGood', // 参加活动的商品
      columns: [
        {
          name: 'id',
          primaryKey: true,
          autoIncrement: true
        },
        {
          name: 'shop_marketing_collection_id',
          notNull: true,
          dataType: DATA_TYPE.Number
        },
        {
          name: 'shop_product_id',
          notNull: true,
          dataType: DATA_TYPE.Number
        }
      ]
    },
    {
      name: 'shopUser', // 用户
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
          name: 'mobile',
          notNull: true,
          dataType: DATA_TYPE.Number
        },
        {
          name: 'email',
          dataType: DATA_TYPE.String
        },
        {
          name: 'status',
          dataType: DATA_TYPE.Boolean
        }
      ]
    },
    {
      name: 'shopRole', // 角色
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
          name: 'status',
          dataType: DATA_TYPE.Boolean
        }
      ]
    },
    {
      name: 'shopNode', // 节点表
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
          name: 'api',
          notNull: true,
          dataType: DATA_TYPE.String
        },
        {
          name: 'pid',
          notNull: true,
          dataType: DATA_TYPE.Number
        },
        {
          name: 'path',
          notNull: true,
          dataType: DATA_TYPE.String
        }
      ]
    },
    {
      name: 'shopOrder', // 订单表
      columns: [
        {
          name: 'id',
          primaryKey: true,
          autoIncrement: true
        },
        {
          name: 'order_number',
          notNull: true,
          dataType: DATA_TYPE.String
        },
        {
          name: 'pay_type',
          dataType: DATA_TYPE.String
        },
        {
          name: 'tracking_number',
          dataType: DATA_TYPE.String
        },
        {
          name: 'product_name',
          dataType: DATA_TYPE.String
        },
        {
          name: 'status',
          notNull: true,
          dataType: DATA_TYPE.Number
        },
        {
          name: 'product_id',
          notNull: true,
          dataType: DATA_TYPE.Number
        },
        {
          name: 'create_time',
          notNull: true,
          dataType: DATA_TYPE.DateTime
        }
      ]
    },
    {
      name: 'shopGoodStock', // 商品库存列表
      columns: [
        {
          name: 'id',
          primaryKey: true,
          autoIncrement: true
        },
        {
          name: 'name', // 商品名称
          notNull: true,
          dataType: DATA_TYPE.String
        },
        {
          name: 'retail_price', // 零售价
          dataType: DATA_TYPE.Number
        },
        {
          name: 'unit', // 单位
          dataType: DATA_TYPE.String
        },
        {
          name: 'status', // 商品状态
          notNull: true,
          dataType: DATA_TYPE.Number
        },
        {
          name: 'stock_category_id',
          notNull: true,
          dataType: DATA_TYPE.Number
        },
        {
          name: 'create_time',
          notNull: true,
          dataType: DATA_TYPE.DateTime
        }
      ]
    },
    {
      name: 'shopSupplier', // 供应商
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
          name: 'Arrears', // 应付欠款
          dataType: DATA_TYPE.Number
        },
        {
          name: 'status',
          notNull: true,
          dataType: DATA_TYPE.Number
        },
        {
          name: 'create_time',
          notNull: true,
          dataType: DATA_TYPE.DateTime
        }
      ]
    },
    {
      name: 'shopSupplier', // 供应商
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
          name: 'Arrears', // 应付欠款
          dataType: DATA_TYPE.Number
        },
        {
          name: 'status',
          notNull: true,
          dataType: DATA_TYPE.Number
        },
        {
          name: 'create_time',
          notNull: true,
          dataType: DATA_TYPE.DateTime
        }
      ]
    },
    {
      name: 'shopBankAccount', // 银行账户
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
          name: 'company', // 开户银行
          dataType: DATA_TYPE.String
        },
        {
          name: 'balance',
          dataType: DATA_TYPE.Number
        },
        {
          name: 'status',
          notNull: true,
          dataType: DATA_TYPE.Number
        }
      ]
    }
  ],
  datas: datas
}
