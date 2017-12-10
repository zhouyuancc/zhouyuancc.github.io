#coding:utf-8

from Ddjango.ZYTool import OperationExcelTool
from Ddjango.ZYTool import OperationJsonTool
from data_config import *
# import data_config

class GetExcelData:

    def __init__(self):
        self.opera_excel = OperationExcelTool.OperationExcel();

    # 获取excel行数, 即case个数
    def get_case_lines(self):
        return self.opera_excel.getExcelLines()

    # 获取是否执行
    def get_is_run(self, row):
        flag = None
        col = get_run()
        run_model = self.opera_excel.getCellValue(row, int(col))
        if run_model == 'yes':
            flag = True
        else:
            flag = False
        return flag

    # 是否携带header
    def is_header(self, row):
        col = get_header()
        header = self.opera_excel.getCellValue(row, int(col))
        if header == 'yes':
            return get_header_value()
        else:
            return None

    # 获取请求方式
    def get_request_method(self, row):
        col = get_request_way()
        request_method = self.opera_excel.getCellValue(row, int(col))
        return request_method

    # 获取url
    def get_request_url(self, row):
        col = get_url()
        url = self.opera_excel.getCellValue(row, int(col))
        return url

    # 获取请求数据
    def get_request_data(self, row):
        col = get_data()
        data = self.opera_excel.getCellValue(row, int(col))
        if data == '':
            return None
        return data

    # 通过获取关键字拿到data数据
    def get_data_for_json(self, row):
        opera_json = OperationJsonTool.OperationJson()
        request_data = opera_json.getJsonData(self.get_request_data(row))
        return request_data

    # 获取预期结果
    def get_expect_data(self, row):
        col = get_expect()
        expect = self.opera_excel.getCellValue(row, int(col))
        if expect == '':
            return None
        return expect

    # excel写入数据
    def write_result(self, row, value):
        col = get_result()
        self.opera_excel.write_value(row, int(col), value)

    # 数据依赖
    # 获取依赖数据的key
    def get_depend_key(self, row):
        col = get_data_depend()
        depend_key = self.opera_excel.getCellValue(row, int(col))
        if depend_key == "":
            return None
        else:
            return depend_key

    # 判断是否有case依赖
    def is_depend(self, row):
        col = get_case_depend()
        depend_case_id = self.opera_excel.getCellValue(row, int(col))
        if depend_case_id == "":
            return None
        else:
            return depend_case_id

    # 获取数据依赖字段
    def get_depend_field(self, row):
        col = get_field_depend()
        data = self.opera_excel.getCellValue(row, int(col))
        if data == "":
            return None
        else:
            return data





