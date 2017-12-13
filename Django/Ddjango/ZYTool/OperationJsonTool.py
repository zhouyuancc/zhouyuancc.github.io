#coding:utf-8
import json

fp = open('../DataConfig/user.json')
data = json.load(fp)
print data['user']

class OperationJson:

    def __init__(self, file_path=None):
        if file_path == None:
            self.file_path = '../DataConfig/user.json'
        else:
            self.file_path = file_path

        self.data = self.readJsonData()

    # 读取json文件
    def readJsonData(self):
        # 打开后需close
        # fp = open('../DataConfig/user.json')
        # fp.close()
        # 这样写不需要写close了
        with open(self.file_path) as fp:
            data = json.load(fp)
            return data

    # 根据关键字获取数据 # 获取cookie
    def getJsonData(self, id):
        return self.data[id]

    # 写json
    def writeJsonData(self, data):
        with open('../DataConfig/cookie.json', 'w') as fp:
            fp.write(json.dumps(data))


if __name__ == '__main__':
    # openjson = OperationJson()
    # print openjson.getJsonData('buy')
    openjson = OperationJson('../DataConfig/cookie.json')
    print openjson.getJsonData('apsid')
