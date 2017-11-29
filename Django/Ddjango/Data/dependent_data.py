#coding:utf-8

from Ddjango.ZYTool.OperationExcelTool import OperationExcel
from Ddjango.ZYTool.RunMethodTool import RunMethod
from Ddjango.Data.get_excelData import GetExcelData
from jsonpath_rw import jsonpath,parse
import json

class DependentData:

    def __init__(self, case_id):
        # 实例化 文件OperationExcelTool 的类OperationExcel
        self.opera_excel = OperationExcel()
        self.case_id = case_id
        self.excelData = GetExcelData()

    # 通过case_id去获取该case_id的整行数据
    def get_case_line_data(self):
        rows_data = self.opera_excel.get_rows_data(self.case_id)
        return rows_data

    # 执行依赖测试, 获取结果
    def run_dependent(self):
        run_method = RunMethod()
        # 获取行号
        row_num = self.opera_excel.get_row_num(self.case_id)
        # 获取接口要传的参数
        request_data = self.excelData.get_data_for_json(row_num)
        header = self.excelData.is_header(row_num)
        method = self.excelData.get_request_method(row_num)
        url = self.excelData.get_request_url(row_num)
        # 执行
        res = run_method.run_main(method, url, request_data, header)
        return json.loads(res)

    # 根据 依赖的key 去获取执行 依赖测试case 的响应, 然后返回
    def get_data_for_key(self, row):

        depend_data = self.excelData.get_depend_key(row)
        print "depend_data: "+type(depend_data)

        response_data = self.run_dependent()
        print "response_data: "+type(response_data)

        json_exe = parse(depend_data)
        # print "json_exe: " + str(json_exe)

        madle = json_exe.find(response_data)
        print "madle: " + str(madle)
        print "[math.value for math in madle][0]: "+[math.value for math in madle][0]
        # for math in madle:
        #     # math是字典: math.value
        return [math.value for math in madle][0]
        # 返回 第一个且只有一个 的math.value

if __name__ == '__main__':
    order = {
        "data": {
            "_input_charset": "utf-8",
            "body": "慕课网订单-1710141907182334",
            "it_b_pay": "1d",
            "notify_url": "http://order.imooc.com/pay/notifyalipay",
            "out_trade_no": "1710141907182334",
            "partner": "2088002966755334",
            "payment_type": "1",
            "seller_id": "yangyan01@tcl.com",
            "service": "mobile.securitypay.pay",
            "sign": "kZBV53KuiUf5HIrVLBCcBpWDg%2FnzO%2BtyEnBqgVYwwBtDU66Xk8VQUTbVOqDjrNymCupkVhlI%2BkFZq1jOr8C554KsZ7Gk7orC9dDbQlpr%2BaMmdjO30JBgjqjj4mmM%2Flphy9Xwr0Xrv46uSkDKdlQqLDdGAOP7YwOM2dSLyUQX%2Bo4%3D",
            "sign_type": "RSA",
            "string": "_input_charset=utf-8&body=慕课网订单-1710141907182334&it_b_pay=1d&notify_url=http://order.imooc.com/pay/notifyalipay&out_trade_no=1710141907182334&partner=2088002966755334&payment_type=1&seller_id=yangyan01@tcl.com&service=mobile.securitypay.pay&subject=慕课网订单-1710141907182334&total_fee=299&sign=kZBV53KuiUf5HIrVLBCcBpWDg%2FnzO%2BtyEnBqgVYwwBtDU66Xk8VQUTbVOqDjrNymCupkVhlI%2BkFZq1jOr8C554KsZ7Gk7orC9dDbQlpr%2BaMmdjO30JBgjqjj4mmM%2Flphy9Xwr0Xrv46uSkDKdlQqLDdGAOP7YwOM2dSLyUQX%2Bo4%3D&sign_type=RSA",
            "subject": "慕课网订单-1710141907182334",
            "total_fee": 299
        },
        "errorCode": 1000,
        "errorDesc": "成功",
        "status": 1,
        "timestamp": 1507979239100
    }
    res = "data.out_trade_no"
    json_exe = parse(res)
    madle = json_exe.find(order)
    print [math.value for math in madle][0]
