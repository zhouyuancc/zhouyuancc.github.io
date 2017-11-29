#coding:utf-8
# xlrd: 读取用
import xlrd
# xlutils: 写入用
from xlutils.copy import copy

# 基础方法
# data = xlrd.open_workbook('../DataConfig/case1.xls')
# tables = data.sheets()[0] # sheet1
# print tables.nrows # 行数
# print tables.cell_value(2, 3) # 单元格内容

class OperationExcel:

    def __init__(self, file_name=None, sheet_id=None):
        if file_name:
            self.file_name = file_name
            self.sheet_id = sheet_id
        else:
            self.file_name = '../DataConfig/case1.xls'
            self.sheet_id = 0
        self.tables = self.getExcelData()

    # 获取Excel中Sheet的内容
    def getExcelData(self):
        data = xlrd.open_workbook(self.file_name)
        tables = data.sheets()[self.sheet_id]
        return tables

    # 获取单元格的行数
    def getExcelLines(self):
        return self.tables.nrows

    # 获取某一个单元格的内容
    def getCellValue(self, row, col):
        return self.tables.cell_value(row, col)

    # 写入excel数据
    def write_value(self, row, col, value):
        # xlrd: 打开直接写入, 之前数据没了
        # xlrd: 读取用
        read_data = xlrd.open_workbook(self.file_name)
        # xlutils: 写入用
        # 复制一个excel
        write_data = copy(read_data)
        # 获取sheet
        sheet_data = write_data.get_sheet(0)
        # 写入
        sheet_data.write(row, col, value)
        # 覆盖原文件
        write_data.save(self.file_name)

    # 数据依赖
    # 根据对应的case_id找到对应行的内容
    def get_rows_data(self, case_id):
        # 根据对应的case_id获取对应的行号
        row_num = self.get_row_num(case_id)
        # 根据行号, 获取该行的内容
        rows_data = self.get_row_values(row_num)
        return rows_data

    # 根据对应的case_id获取对应的行号
    def get_row_num(self, case_id):
        num = 0
        cols_data = self.get_cols_data()
        for col_data in cols_data:
            if case_id in col_data:
                return num
            num = num + 1

    # 根据行号, 获取该行的内容
    def get_row_values(self, row):
        # tables: sheet的内容
        # row_values: 根据sheet的row获取行内容
        row_data = self.tables.row_values(row)
        return row_data

    # 获取某一列的内容
    def get_cols_data(self, col_id=None):
        if col_id != None:
            # col_values: sheet获取列内容
            cols = self.tables.col_values(col_id)
        else:
            cols = self.tables.col_values(0)
        return cols


if __name__ == '__main__':
    opers = OperationExcel()
    print opers.getExcelLines()
    print opers.getCellValue(0, 0)





