# coding=utf-8
import unittest

class TestMethod(unittest.TestCase):

    # 类执行之前的方法 - 固定类名, 且必须加@classmethod
    @classmethod
    def setUpClass(cls):
        print "setUpClass - @classmethod"

    # 类执行之后的方法 - 固定类名, 且必须加@classmethod
    @classmethod
    def tearDownClass(cls):
        print "tearDownClass - @classmethod"

    # 每次方法前执行
    def setUp(self):
        print 'setUp(self)'
    # 每次方法后执行
    def tearDown(self):
        print 'tearDown(self)'

    # 必须test开头
    def test_1(self):
        print 'test_1'

    def test_2(self):
        print 'test_2'

# setUpClass - @classmethod

# setUp(self)
# test_1
# tearDown(self)

# setUp(self)
# test_2
# tearDown(self)

# tearDownClass - @classmethod

if __name__ == '__main__':
    unittest.main()