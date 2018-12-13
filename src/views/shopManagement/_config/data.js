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
  ],
  shopMarketing: [
    {name: '秒杀模式', type: 'spike', description: '规则：促销倒计时限购活动'},
    {name: '拼团模式', type: 'fightGroup', description: '规则：定时间段团购商品'},
    {name: '优惠卷模式', type: 'coupon', description: '规则：可自定义优惠卷类型，也可设置使用期限、发放数量、金额等'},
    {name: '满赠送模式', type: 'fullGift', description: '规则：自定义设定消费额度后送商品'},
    {name: '满就减模式', type: 'lower', description: '规则：自定义设定消费额度后减金额'}
  ],
  shopMarketingCollection: [
    // 秒杀活动类型
    { shop_marketing_id: 1, title: '3C现场秒杀活动', condition: '手快有，手慢无啊', description: '每个商品仅限10件，抢完为止', status: 2, end_time: new Date() },
    // 拼团活动
    { shop_marketing_id: 1, title: '双11拼团活动', condition: '手快有，手慢无啊', description: '', status: 1, end_time: new Date(new Date().getTime() + 259200000) }
  ],
  // 活动商品
  shopMarketingGood: [
    {'name': '小米8 全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待', 'picture': [], 'status': '', 'cover': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADaElEQVR4Xu3Xz0tUURwF8K9NZUY69IPEpjBM0KJFWlJBxayEaFGLwlZtIoKkRYlB/QHtqkUQRLsWoRDUQBC0GsJFYRrUQAVNplKiDKVpyYRZfG/c4TrzHGeoOXcxZ3Y693l8n3fe991XUXOp57fwU3KBCkKX3NgEEBrjTGiQM6EJjRIA5XBGExokAIphowkNEgDFsNGEBgmAYthoQoMEQDFsNKFBAqAYNprQIAFQDBtNaJAAKIaNJjRIABTDRhMaJACKYaMJDRIAxbDRhAYJgGLYaEKDBEAxbDShQQKgGDaa0CABUAwbTWiQACiGjSY0SAAUw0aXG/TN421yqq1B4u/H5eiduDn92JmoRBtr5W7/Bzl/v38Bif2uEKeg4ws57n+u8dboQ9s2yu2OfbIpXFXU+XyempXE2KS0N9cVdZxvbG/Q2UrFNNqudfHshatetUK6Hr6Q3sFhE3GlfadciG6XnsGPOXdFUVfqHxd7hw5CW+qc7DFvx79Jc22NWT70ZUYqQyFR6GRqWnZF1prfPx9OScvmdYTuPNhksHQ+W5SVoWU51j9/zcuN+Bu5+iRhvutorZdrx/ZIdeXyvNDT6bkFDV/qIpbqe6+N1gfa7i3rMxD2Nk/NpOVs7zN5mpz428qLh6Vhw5oM9GLzXRuuH9tyi6Zz3f17pcLM93e9QmubtckWUf9RnaeFQut6BawLV5l2f5r8IXuvP86cr70gdp29cGUHnX3CQY0Oesgt1mg7p7N3MmXfaAuto0E/scRoptGx16Nyen+j2Hnt7q/zQUfCqzPHcHQ4VbYtTs/Ny4NXI3KydWvO6NDluu7cgSa51fdO+pITZg8eNBLcbeLI1+85L0E+xoZmep3R9kGnDy9t7L2BITNr9ePuhfVnd0vXHRsIfNmxrXffGt07wReyd2gdASda6uXIjohcfvTSvGTke7W2W7WxqdnARusIsjsO3Q7qXWK3f7ojcR+UaHTvjUafsK88QoPkCU1okAAoho0mNEgAFMNGExokAIphowkNEgDFsNGEBgmAYthoQoMEQDFsNKFBAqAYNprQIAFQDBtNaJAAKIaNJjRIABTDRhMaJACKYaMJDRIAxbDRhAYJgGLYaEKDBEAxbDShQQKgGDaa0CABUAwbTWiQACiGjSY0SAAUw0aDoP8A2vMQl6KMt1gAAAAASUVORK5CYII=', 'category_id': 15, 'detail': '""/', 'purchase_limit': 20, 'integral': 20, 'stock_set': 1, 'stock': 102, 'sales_price': 151, 'original_price': 151, 'cost_price': 151, 'attr': {}, 'create_time': '2018-12-10 11:55:28', 'update_time': '2018-12-10 11:55:28', 'id': 1, 'category_name': '小米', 'shop_product_id': 4, 'shop_marketing_collection_id': 1},
    {'name': 'Apple iphone X', 'picture': [], 'status': '', 'cover': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADZUlEQVR4Xu3XT0gUYRgG8FdIaIWQWjPWsE5S/qnOEZEUEXUQzQ5REREFERIJXUusa1CERJGHiIwOidKhiAiyDkpB9L/ADoHgUviHJNwOC8X7wTvMfO24p31mYZ+56LrrPru/eeb9vqnqOL7/r/AouUAVoUtu7AIIjXEmNMiZ0IRGCYByOKMJDRIAxbDRhAYJgGLYaEKDBEAxbDShQQKgGDaa0CABUAwbTWiQACiGjSY0SAAUw0YTGiQAimGjCQ0SAMWw0YQGCYBi2GhCgwRAMWw0oUECoBg2mtAgAVAMG01okAAoho0mNEgAFMNGExokAIphoysVetPGNuk9cUZqUjVy4+4teT4+5igGLl2VuV/zcuFyf0Bz8VyfbGneLE9fPpOB29fFHvt2+Xxehh+PyL3R+yDW/2MSbbQPk/uTcxidezoi0Irc2NDoPr2h6u8+tP6tfesOOXXkpMzMzcjNoUF30mpX1FY2tJ33cIvD0PZ7emVapqanpOf8WfcvPcdOy+7tuyK10ZOkV0Dbhlb3nJ6QsYkXBa+OJGqdaKOLQU//yMr6teti2+g32h87s/OzhA63Kq7R4RldqIU+tI6YulV1rtk7t7W7+a3Huy/vI7O94hpt8zS1POW+u17+i7lF0VERd+gI0cNmdvh14fmdBOZSmYmOjkOdB6V7b5d8mvwcNK5Qu/ULXBm8Jh++fox8F39U6JO6ENqJsxfb/LYdTBInIVFof1ErtOvQEdDa1BKZ03aCJr9/k/r06mCHYtC649CFM26rWHHQ/mKoj+8MD8nR7sMBXsOajGt99mc22HUY9PibCWlpag5Gzau3rx0uoWOqZLNa57MPrZe7LnKZ+kzQarsSFn4vuHesXlbtFkCOjiLXqjVUW2s3GbYg6hZt9MlD0dfooaAH9nVFFsNymMHFxlHZzGi7TdYPrKNCj/Btc/iO78GjEYetP3XMLLVLMYDwDU8xlFI8nyh0Kb5Qub4noUFnhtCEBgmAYthoQoMEQDFsNKFBAqAYNprQIAFQDBtNaJAAKIaNJjRIABTDRhMaJACKYaMJDRIAxbDRhAYJgGLYaEKDBEAxbDShQQKgGDaa0CABUAwbTWiQACiGjSY0SAAUw0YTGiQAimGjCQ0SAMWw0YQGCYBi2GhCgwRAMWw0CPofdKIE0y4v+1sAAAAASUVORK5CYII=', 'category_id': 14, 'detail': '""/', 'purchase_limit': 20, 'integral': 20, 'stock_set': 1, 'stock': 102, 'sales_price': 151, 'original_price': 151, 'cost_price': 151, 'attr': {}, 'create_time': '2018-12-10 11:55:28', 'update_time': '2018-12-10 11:55:28', 'id': 2, 'category_name': 'Apple', 'shop_product_id': 3, 'shop_marketing_collection_id': 1},
    {'name': '男子训练夹克FL_TRH TEC WRM', 'picture': [], 'status': '', 'cover': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADVklEQVR4Xu3XvS90YRAF8KPxUaAWrYpCIqJQolZrKNCIKFRoFBqlSoWG+BdUaAiJaGk0ElQUPioaMu9jstfaNe8mc+dusmcrNrMzu789O/e5TZ/AJ/jIXaCJ0Lkb/xtA6BhnQgc5E5rQUQJBc7ijCR0kEDSGiSZ0kEDQGCaa0EECQWOYaEIHCQSNYaIJHSQQNIaJJnSQQNAYJprQQQJBY5hoQgcJBI1hogkdJBA0hokmdJBA0BgmmtBBAkFjmGhCBwkEjWGiCR0kEDSGiSZ0kEDQGCaa0EECQWOYaEIHCQSNYaIbCnpkBNjaAvb3gdXV9NHX1oClJeD9HZifB/b2SiTb28DMTG1E19dAX19tr3Gsro9EHx4Co6PAwwMwNQUcHwNXV0Bvb/qo2efLP7y+9ugIGBtzpPFtVTy0JvfxsYScxbu9TektT+TkJLC5CbS32yI7O8DsrF2XY0Wx0JWQNcnZhCr821taI8vLQE8PcHkJDA8D1dKsr2t4aEGVh+zO01OgrQ0YGPg7V9lk/++ubnhoJVWwbDLlArm7C3R0/L4Y5vgTz6t1sasje7o4Ofl5MfsLulqSZbW8vgLd3b+9GvrUoTu6uTnt2bOzdKST/6s9dA3oFyF1elIp/4XUwcrQt1RsomVHPz8Dg4NALYmWd18p1ZLahYW0cspTXTB6sdCVVofgd3YCKyvA+nra0RsbwOIicHGR1kv5zYz0kaPe3V0KkJy/dVXoF0Lo7ztASXRXV0J6ekp3idPTCe7mpnQaOTgA+vuB1ta0YuS4p9Bypv74SHeTgi6nGUJ/by9N5/090NKSnhT0iYn0tyZT6ubmgPNzYHwc0DNydpdzdeRwaBLooaGfiZYU645+eWGic2Cv+5bFXwzrnsjnDRLax9HsQmiTyKeA0D6OZhdCm0Q+BYT2cTS7ENok8ikgtI+j2YXQJpFPAaF9HM0uhDaJfAoI7eNodiG0SeRTQGgfR7MLoU0inwJC+ziaXQhtEvkUENrH0exCaJPIp4DQPo5mF0KbRD4FhPZxNLsQ2iTyKSC0j6PZhdAmkU8BoX0czS6ENol8Cgjt42h2IbRJ5FNAaB9HswuhTSKfAkL7OJpdCG0S+RQQ2sfR7EJok8ingNA+jmYXQptEPgVf2GiTtoEtSd0AAAAASUVORK5CYII=', 'category_id': 1, 'detail': '""/', 'purchase_limit': 20, 'integral': 20, 'stock_set': 1, 'stock': 102, 'sales_price': 151, 'original_price': 151, 'cost_price': 151, 'attr': {}, 'create_time': '2018-12-10 11:55:28', 'update_time': '2018-12-10 11:55:28', 'id': 3, 'category_name': '国际名牌', 'shop_product_id': 2, 'shop_marketing_collection_id': 2},
    {'name': 'G-STAR RAW春夏 ARC系列男士修身弯刀牛仔裤3030', 'picture': [], 'status': '', 'cover': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADQ0lEQVR4Xu3Xz0tUURQH8CNM4sJglDbNRkFwahtYkYXLpqAWLoykgogI2qibapcthGhTbtpJUJHRokVtahn9QP+CGlwUBCOk0oNcSAjFvXBlfPj6Pp0z5w72dSN43pwz7/O+nvdeW/fVa3+EP00XaCN00439AELbOBPayJnQhLYSMJrDHU1oIwGjMUw0oY0EjMYw0YQ2EjAaw0QT2kjAaAwTTWgjAaMxTDShjQSMxjDRhDYSMBrDRBPaSMBoDBNNaCMBozFMNKGNBIzGMNGENhIwGsNEE9pIwGgME01oIwGjMUw0oY0EjMYw0YQ2EjAaw0QT2kjAaAwT/T9Ajxw9IvdGz8vejo5cp/trbU1uPJuVF3Pz/viXE+MydPCAvPv8RYbvP/B/+zR5W8ql/fL0w0cZe/wkV1+Lg6ImOkA7wOszj2Ti9CkP55AWk0TGKifl648luTn7XB5euewvSIA+US77v+3r7JTpN2/l7qvXhM5KTCPQt86e8Rei9jOR9j0FKRWLmcH8vb6+6WJYJDg9oyUSvZPVsdXa4OrIEaGQ0OXVVb9G3lermZ+q3+1uP39fWZELxwczj6/f4Tm+SlMOiZrocEZ5b4oBLNzw3OfTiLwZZuQk3NRceaskT1+66NNa/8RB6G3+0wXk8DQxXqn4Dscm7/jfATl9M5s6NyKHenvkcF+ffFtallJXUdoLhX9Oj70+oq4Ol8xSd5d/ZBvs79/Ys7UkkbmFBRkeGNiU5HrJcBHQ6sg6bpuZaPjwqNDpb5/e1dXa4ka608fmhQ5PJ7FfYFoGOoA4UJdo9OSBoN1Fcm+Iefs1HFnQICp02NHuZSP9eo1OHEHHTnBLvbAgzN1Uj5ro3QSJzoXQSEipTmglSNSG0EhIqU5oJUjUhtBISKlOaCVI1IbQSEipTmglSNSG0EhIqU5oJUjUhtBISKlOaCVI1IbQSEipTmglSNSG0EhIqU5oJUjUhtBISKlOaCVI1IbQSEipTmglSNSG0EhIqU5oJUjUhtBISKlOaCVI1IbQSEipTmglSNSG0EhIqU5oJUjUhtBISKlOaCVI1IbQSEipTmglSNSG0EhIqU5oJUjUhtBISKlOaCVI1IbQSEip/hd0rOAcPFEnugAAAABJRU5ErkJggg==', 'category_id': 1, 'detail': '""/', 'purchase_limit': 20, 'integral': 20, 'stock_set': 1, 'stock': 102, 'sales_price': 151, 'original_price': 151, 'cost_price': 151, 'attr': {}, 'create_time': '2018-12-10 11:55:28', 'update_time': '2018-12-10 11:55:28', 'id': 4, 'category_name': '国际名牌', 'shop_product_id': 1, 'shop_marketing_collection_id': 2}
  ]
}
