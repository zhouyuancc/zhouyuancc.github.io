#coding:utf-8

import requests
import json

cookies = {
    "apsid":""
}
goods_id = [
                {"goods_id":"346", "type":"1","type_id":131, "status":"1"},
                {"goods_id":"362", "type":"1","type_id":136, "status":"1"}
           ]
list_data = json.dumps(goods_id)
data = {
    "goods_ids": list_data
       }

url = "http://order.imooc.com/pay/check"

res = requests.post(url=url,data=data,cookies=cookies).text

# 处理https 需要SSL证书
# verify=False 忽略证书设置
res = requests.post(url=url,data=data,verify=False,cookies=cookies).text

# 参数无效
# {"result":9998,"data":"","msg":"\u53c2\u6570\u65e0\u6548"}

print res