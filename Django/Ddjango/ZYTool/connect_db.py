#coding:utf-8

import pymysql.cursors
import json

class OperationMySQL:

    def __init__(self):
        # 数据库地址
        self.connect = pymysql.connect(
            host='localhost',
            port=3306,
            user='root',
            password='123456',
            db='LHYN_OA',
            charset='utf8',
            # pymysql.cursors.DictCursor: 列名也能获取到字典里
            # 加这句后, 查询出的结果(列名称key : value)以字典格式展示
            # 字典 可以与 excel中的预期结果 进行对比
            cursorsclass=pymysql.cursors.DictCursor
        )
        # 游标
        self.cur = self.connect.cursor()

    # 查询一条数据
    def search_one(self, sql):

        # 执行sql语句
        self.cur.execute(sql)
        # 查询一条结果
        result = self.cur.fetchone()
        # 格式化json数据
        result = json.dumps(result)

        return result

if __name__ == '__main__':
    op_mysql = OperationMySQL()
    res = op_mysql.search_one("select * from pubEmpInfo where empcode='wujing'")
    print type(res) # <type 'str'>



