# WebService准备工作

```
1.开启mysql数据库

service mysqld start
mysql -uroot -p -h192.168.76.129
123456

2.查看日志（注意：启动Apache-Tomcat之前，先打开日志窗口）

a：打开系统日志
cd /opt/apache-tomcat-6.0.37/logs/
tail -f catalina.out

b：打开详细日志
cd /opt/apache-tomcat-6.0.37/logs/
tail -f system

3.打开日志后，开启Apache-Tomcat
cd /opt/apache-tomcat-6.0.37/bin/
./startup.sh start
```