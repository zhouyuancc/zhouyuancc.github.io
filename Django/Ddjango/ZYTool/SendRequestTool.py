# coding=utf-8
import requests
import json

class ZYRequestTool:

    # 构造函数
    def __init__(self, url, method, data=None):
        self.res = self.run_main(url, method, data)

    # GET方法
    def send_get(self, url, data):
        # http://localhost:8000/loginPost/?user=&psw=
        # 与 传data字典 效果一样
        res = requests.get(url=url, data=data).json()

        # json.dumps(?, indent=2) : 转换json, 并indent=2格式化, sort_keys=True按字母升序排序
        # return json.dumps(res, indent=2, sort_keys=True)
        return res

    # POST方法
    def send_post(self, url, data):
        res = requests.post(url=url, data=data).json()

        # 这样返回的是json格式化好的格式, 类型是str
        # json.dumps(?, indent=2) : 转换json,并indent=2格式化
        # return json.dumps(res, indent=2, sort_keys=True)

        # 这样返回的是dict
        return res

    # 调用
    def run_main(self, url, method, data=None):
        res = None
        if method.upper() == 'GET':
            res = self.send_get(url, data)
        else:
            res = self.send_post(url, data)
        return res

# 类似 主函数 调用
if __name__ == '__main__':

    data = {
        'cart': '11'
    }
    url = 'http://www.imooc.com/m/web/shizhanapi/loadmorepingjia.html'

    run = ZYRequestTool(url, 'GET', data)
    print run.res