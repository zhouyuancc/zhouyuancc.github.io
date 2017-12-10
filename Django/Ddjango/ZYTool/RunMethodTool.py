# coding:utf-8
import requests
import json

class RunMethod:
    # POST
    def post_main(self, url, data, header=None):
        res = None
        if header != None:
            # headers
            res = requests.post(url=url, data=data, headers=header)
        else:
            res = requests.post(url=url, data=data)
        # status_code 状态码 200 404 500 505
        print 'post状态码: '+ str(res.status_code)
        return res.json()

    # GET
    def get_main(self, url, data=None, header=None):
        res = None
        if header != None:
            # headers
            res = requests.get(url=url, data=data, headers=header,verify=False)
        else:
            res = requests.get(url=url, data=data, verify=False)
        print 'get状态码: '+ str(res.status_code)
        return res.json()

    def run_main(self, method, url, data, header=None):
        res = None
        if method.upper() == 'POST':
            res = self.post_main(url, data, header)
        else:
            res = self.get_main(url, data, header)
        # 格式化json
        return json.dumps(res, ensure_ascii=False, sort_keys=True, indent=2)

