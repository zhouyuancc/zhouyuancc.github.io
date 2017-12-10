# coding:utf-8
class CommonTool:

    '''
    判断一个字符串是否被包含于另一个字符串中
    :param str_one: 查找的字符串
    :param str_two: 被查找的字符串
    :return:
    '''
    def is_contain(self, str_one, str_two):
        flag = None
        # isinstance: 判断类型
        if isinstance(str_one, unicode):
            # encode('unicode-escape') : 转unicode
            # decode('string_escape') : 转string
            str_one = str_one.encode('unicode-escape').decode('string_escape')

        if isinstance(str_two, unicode):
            # encode('unicode-escape') : 转unicode
            # decode('string_escape') : 转string
            str_two = str_two.encode('unicode-escape').decode('string_escape')

        # print str_one
        # print str_two

        if str_one in str_two:
            flag = True
        else:
            flag = False
        return flag




