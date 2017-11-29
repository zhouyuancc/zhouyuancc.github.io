# coding=utf-8
import requests
import json

# POST方法
def send_post(url,data):

    res = requests.post(url=url, data=data).json()
    # json.dumps(?, indent=2) : 转换json,并indent=2格式化
    return json.dumps(res, indent=2)

# 调用
data = {
    'timestamp':'1507034803124',
    'uid':'5249191',
    'uuid':'5ae7d1a22c82fb89c78f603420870ad7',
    'secrect':'078474b41dd37ddd5efeb04aa591ec12',
    'token':'7d6f14f21ec96d755de41e6c076758dd',
    'cid':'0'
}

url = 'http://coding.imooc.com/api/cate'
# data = {
#     'username':'kamui-c@163.com',
#     'password':''
# }
print send_post(url, data)


# dict={
#     'user':'user',
#     'psw':'psw',
# }
#
# # {}字典 []数组 ()元组
#
# res = requests.post(url='http://localhost:8000/loginPost/',data=dict)
#
# print res.text # {"user": "user", "psw": "psw"}
# print type(res.text) # <type 'unicode'>
#
# print res.json() # {u'user': u'user', u'psw': u'psw'}
# print type(res.json()) # <type 'dict'>

