#coding=utf-8
import mock

# 模拟mock封装
# mock: 类似fiddler, 模拟返回数据
def mock_test(mock_method, request_data, url, method, response_data):
    mock_method = mock.Mock(return_value=response_data)
    res = mock_method(url, method, request_data)
    return res
