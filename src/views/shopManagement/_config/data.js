import {Mock} from 'utils/index'
export default {
  shopCategory: [
    {name: '国际名牌', pid: 0},
    {name: '奢侈品', pid: 0},
    {name: '手机数码', pid: 0},
    {name: '汽车用品', pid: 0},
    {name: '男装', pid: 0},
    {name: '女装', pid: 0},
    {name: '男鞋', pid: 0},
    {name: '女鞋', pid: 0},
    {name: '母婴童装', pid: 0},
    {name: '玩具乐器', pid: 0},
    {name: '席梦思', pid: 1},
    {name: 'FOSSIL', pid: 1},
    {name: '周大福', pid: 2},
    {name: 'Apple', pid: 3},
    {name: '小米', pid: 3}
  ],
  shopSelectData: [
    {name: '库存设定', key: 'stock_set', data: [{text: '拍下减库存', value: 1}, {text: '付款减库存', value: 2}, {text: '永不减库存', value: 3}]},
    {name: '产品状态', key: 'product_status', data: [{text: '下架', value: 1}, {text: '上架', value: 2}, {text: '售馨', value: 3}]}
  ],
  shopProduct: [
    {name: 'G-STAR RAW春夏 ARC系列男士修身弯刀牛仔裤3030', picture: [], status: '', cover: Mock.Random.dataImage('90x90', Mock.mock('@cname()')), category_id: 1, detail: '<img src="" alt=""/>', purchase_limit: 20, integral: 20, stock_set: 1, stock: 102, sales_price: 151, original_price: 151, cost_price: 151, attr: {}},
    {name: '男子训练夹克FL_TRH TEC WRM', picture: [], status: '', cover: Mock.Random.dataImage('90x90', Mock.mock('@cname()')), category_id: 1, detail: '<img src="" alt=""/>', purchase_limit: 20, integral: 20, stock_set: 1, stock: 102, sales_price: 151, original_price: 151, cost_price: 151, attr: {}},
    {name: 'Apple iphone X', picture: [], status: '', cover: Mock.Random.dataImage('90x90', Mock.mock('@cname()')), category_id: 14, detail: '<img src="" alt=""/>', purchase_limit: 20, integral: 20, stock_set: 1, stock: 102, sales_price: 151, original_price: 151, cost_price: 151, attr: {}},
    {name: '小米8 全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待', picture: [], status: '', cover: Mock.Random.dataImage('90x90', Mock.mock('@cname()')), category_id: 15, detail: '<img src="" alt=""/>', purchase_limit: 20, integral: 20, stock_set: 1, stock: 102, sales_price: 151, original_price: 151, cost_price: 151, attr: {}}
  ]
}
