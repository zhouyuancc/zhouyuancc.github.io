#coding:utf-8
import json

fp = open('../DataConfig/user.json')
data = json.load(fp)
print data['user']

class OperationJson:

    def __init__(self):
        self.data = self.readJsonData()

    # 读取json文件
    def readJsonData(self):
        # 打开后需close
        # fp = open('../DataConfig/user.json')
        # fp.close()
        # 这样写不需要写close了
        with open('../DataConfig/user.json') as fp:
            data = json.load(fp)
            return data

    # 根据关键字获取数据
    def getJsonData(self, id):
        return self.data[id]

if __name__ == '__main__':
    openjson = OperationJson()
    print openjson.getJsonData('buy')