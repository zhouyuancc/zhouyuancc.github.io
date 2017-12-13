#coding:utf-8

#    self.run_method = RunMethodTool()
# TypeError: 'module' object is not callable
# import sys
# sys.path.append("/Users/Zhou/Documents/GitHub/zhouyuancc.github.io/Django")

from Ddjango.ZYTool.RunMethodTool import RunMethod
#from 文件名 import 类名
from Ddjango.Data.get_excelData import GetExcelData
from Ddjango.ZYTool.CommonUtil import CommonTool
from Ddjango.Data.dependent_data import DependentData
from Ddjango.ZYTool.SendEmail import SendEmail
from Ddjango.ZYTool.operation_header import OperationHeader
from Ddjango.ZYTool.OperationJsonTool import OperationJson

class RunTest:
    def __init__(self):
        # RunMethod()/GetExcelData(): 类名
        self.run_method = RunMethod()
        self.data = GetExcelData()
        self.commonTool = CommonTool() # 文件CommonUtil中的CommonTool类
        self.send_mail = SendEmail() # 文件SendEmail中的SendEmail类

    # 程序执行的主入口
    def go_on_run(self):
        res = None
        pass_count = []
        fail_count = []
        #10 0,1,2,3,...,9
        rows_count = self.data.get_case_lines()
        for i in range(1, rows_count):
            is_run = self.data.get_is_run(i)
            if is_run:
                url = self.data.get_request_url(i)
                method = self.data.get_request_method(i)
                request_data = self.data.get_data_for_json(i)
                expect = self.data.get_expect_data(i)
                header = self.data.is_header(i)

                # 数据依赖
                depend_case = self.data.is_depend(i)
                if depend_case != None:

                    print "depend_case: " + depend_case

                    self.depend_data = DependentData(depend_case)
                    print type(self.depend_data)

                    # 响应数据
                    depend_response_data = self.depend_data.get_data_for_key(i)
                    if depend_response_data == None:
                        self.data.write_result(i, depend_case)
                        fail_count.append(i)
                        print "测试失败"
                        continue
                    print depend_response_data

                    # 获取依赖的key
                    depend_key = self.data.get_depend_key(i)
                    # 依赖的返回数据 更新到request_data的依赖key
                    request_data[depend_key] = depend_response_data

                # cookie
                if header == 'write':
                    res = self.run_method.run_main(method, url, request_data)
                    op_header = OperationHeader(res)
                    op_header.write_cookie()
                elif header == 'yes':
                    op_json = OperationJson('../DataConfig/cookie.json')
                    cookie = op_json.getJsonData('apsid')
                    # cookie需要一个字典
                    cookies = {
                        'apsid':cookie
                    }
                    res = self.run_method.run_main(method,url,request_data,cookies)
                else:
                    res = self.run_method.run_main(method, url, request_data)

                # print type(expect) # <type 'unicode'>
                # print type(res) # <type 'unicode'>
                if self.commonTool.is_contain(expect, res):
                    # 写入excel的实际结果
                    self.data.write_result(i, 'pass')
                    pass_count.append(i)
                    print "测试通过"
                else:
                    # 写入excel的实际结果
                    self.data.write_result(i, res)
                    fail_count.append(i)
                    print "测试失败"
                # print res
        print "---------"
        print pass_count
        print fail_count
        print len(pass_count)
        print len(fail_count)
        # 发送邮件 - case结果统计
        # 此次运行接口个数共11.0个, 通过个数为0.0个, 失败个数为11.0, 通过率为0.00%, 失败率为100.00%
        self.send_mail.send_main(pass_count, fail_count)

if __name__ == '__main__':
    run = RunTest()
    print run.go_on_run()



