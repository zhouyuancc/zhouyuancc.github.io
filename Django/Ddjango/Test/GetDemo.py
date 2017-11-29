# coding=utf-8
import json

import requests

from Ddjango.ZYTool import SendRequestTool


# GET方法
def send_get(url,data):
    # http://localhost:8000/loginPost/?user=&psw=
    # 与 传data字典 效果一样
    res = requests.get(url=url, data=data).json()

    # json.dumps(?, indent=2) : 转换json, 并indent=2格式化, sort_keys=True按字母升序排序
    return json.dumps(res, indent=2, sort_keys=True)

# 调用
data = {
    'cart':'11'
}

url = 'http://www.imooc.com/m/web/shizhanapi/loadmorepingjia.html'

# print send_get(url, data)

print SendRequestTool.ZYRequestTool(url, 'GET', data).res

