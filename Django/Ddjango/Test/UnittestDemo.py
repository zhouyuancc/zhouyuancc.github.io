# coding=utf-8
import unittest
from Ddjango.ZYTool import SendRequestTool

# unittest和HTMLTestRunner结合生成报告
# MAC默认安装python的路径: /Library/Python/2.7/site-packages
import HTMLTestRunner
import mock
from Ddjango.ZYTool import MockTool

class TestMethod(unittest.TestCase):

    # test方法: 按字母顺序执行
    # 必须test开头
    def test_1(self):
        data = {
            'timestamp': '1507034803124',
            'uid': '5249191',
            'uuid': '5ae7d1a22c82fb89c78f603420870ad7',
            'secrect': '078474b41dd37ddd5efeb04aa591ec12',
            'token': '7d6f14f21ec96d755de41e6c076758dd',
            'cid': '0',
            'errorCode': 1001
        }
        url = 'http://coding.imooc.com/api/cate'

        # SendRequestTool.ZYRequestTool.run_main: 调用get/post的run_main(self, url, method, data=None)方法名称
        res = MockTool.mock_test(SendRequestTool.ZYRequestTool.run_main, data, url, 'POST', data)

        # mock_data = mock.Mock(return_value=data) # 返回值是data
        # # print mock_data
        # SendRequestTool.ZYRequestTool.run_main = mock_data # 赋值
        # res = SendRequestTool.ZYRequestTool.run_main(url,'POST',data)
        print res # data
        # {'uid': '5249191', 'cid': '0', 'timestamp': '1507034803124', 'token': '7d6f14f21ec96d755de41e6c076758dd', 'secrect': '078474b41dd37ddd5efeb04aa591ec12', 'uuid': '5ae7d1a22c82fb89c78f603420870ad7'}

        # res = SendRequestTool.ZYRequestTool(url, 'POST', data)
        # print type(res) # <type 'dict'>

        # if res['errorCode'] == 1000:
        #     print "pass"
        # else:
        #     print "fail"
        # 断言
        self.assertEqual(res['errorCode'], 1001, "fail")
        # 全局变量
        globals()['userid'] = 123


    # @unittest.skip('test_2'): 不执行这个case
    @unittest.skip('test_2')
    def test_2(self):
        print 'test_2'
        # 打印全局变量
        print globals()['userid']
        # print userid

if __name__ == '__main__':
    # 执行方法一
    # unittest.main() # 按字母顺序执行

    # # 执行方法二
    # # TestCase容器
    # suite = unittest.TestSuite()
    # # TestCase容器 添加test_case
    # suite.addTest(TestMethod('test_1'))
    # suite.addTest(TestMethod('test_2')) # @unittest.skip('test_2'): 不执行
    # # 执行
    # unittest.TextTestRunner().run(suite) # 按addTest顺序执行

    # 执行方法三: unittest和HTMLTestRunner结合生成报告
    filepath = "../Report/htmlreport.html"
    # stream
    fp = file(filepath, 'wb') # 'wb': 以读写格式打开

    # TestCase容器
    suite = unittest.TestSuite()
    # TestCase容器 添加test_case
    suite.addTest(TestMethod('test_1'))
    suite.addTest(TestMethod('test_2')) # @unittest.skip('test_2'): 不执行

    # 生成执行测试报告
    runner = HTMLTestRunner.HTMLTestRunner(stream=fp, title='this is report')
    runner.run(suite)

# unittest面试题

# 1.如何使用 python开发 测试框架?
# 70/100-80/100
# 测接口, 用到了requests这个第三方类库, 来封装get/post方法
# 管理case用unittest框架来管理, 断言/case的skip跳过
# 生成测试报告用HTMLTestRunner
# 持续集成Jekins
# 数据管理mysql

# 2.如何管理case?
# unittest.TestSuite()
# case写在excel里

# 3.简述case的执行
# 执行方法一/二/三
# 按字母/addTest/addTest顺序执行

# 4.如何解决case的依赖?
# 全局变量globals()['userid'] = 123
# 存储在case文件
# mysql

# 5.如何生成测试报告?
# unittest和HTMLTestRunner结合生成报告
# 1. 从网上下载HTMLTestRunner.py
# 2. 放到python的安装目录下lib:/Library/Python/2.7/site-packages
# 3.1. import HTMLTestRunner
# 3.2. 执行生成报告HTMLTestRunner.HTMLTestRunner(...).run(suite)


