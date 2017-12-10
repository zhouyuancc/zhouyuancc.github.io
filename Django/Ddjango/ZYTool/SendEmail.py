#coding:utf-8

#发送邮件
import smtplib
from email.mime.text import MIMEText

class SendEmail:

    global send_user
    send_user = "zhouyuancc@163.com"
    global email_host
    email_host = "smtp.163.com"
    global password
    password = "991515"

    def send_mail(self, user_list, sub, content):

        # 发件人 # name <xxx@gmail.com>
        user = "zhouyuan" + "<" + send_user +">"

        # 发送邮件的内容
        message = MIMEText(content,_subtype='plain',_charset='utf-8')
        # 标题
        message['Subject'] = sub
        # 发件人
        message['From'] = user
        # 收件人 数组
        # To : # name <xx@xx.com>;name <xx@xx.com>;
        # ";".join(user_list) # 数组的每个值, 后面加 ; 分号, 拼接成字符串
        message['To'] = ";".join(user_list)
        # zhouyuancc@163.com;zhouyuanc@gmail.com
        # <type 'str'>

        # SMTP服务
        server = smtplib.SMTP()
        # 连接到SMTP服务器
        server.connect(email_host)
        # 登录
        server.login(send_user, password)
        # 发送邮件
        server.sendmail(user, user_list,message.as_string())
        server.close()

    def send_main(self, pass_list, fail_list):
        pass_num = float(len(pass_list))
        fail_num = float(len(fail_list))
        count_num = pass_num + fail_num

        # 90%
        # %.2f : 取小数点后2位  % ((pass_num/count_num)*100)
        # %% : 展示的是 % 百分号
        pass_result = "%.2f%%" % ((pass_num/count_num)*100)
        fail_result = "%.2f%%" % ((fail_num/count_num)*100)

        user_list = ['zhouyuancc@163.com']
        sub = "接口自动化测试报告"
        # "%s" % (参数)
        content = "此次运行接口个数共%s个, 通过个数为%s个, 失败个数为%s, 通过率为%s, 失败率为%s" % (count_num,pass_num,fail_num,pass_result,fail_result)
        self.send_mail(user_list, sub, content)

if __name__ == '__main__':

    # # send_mail
    # user_list = ['zhouyuancc@163.com','zhouyuanc@gmail.com']
    # sub = "python测试邮件"
    # content = "python测试邮件 content"
    #
    # send = SendEmail()
    # send.send_mail(user_list, sub, content)

    # send_main
    pass_list = [1,2,3,4]
    fail_list = [5,6,7,8,9,10]

    send_main = SendEmail()
    send_main.send_main(pass_list, fail_list)











