## 一、Web项目部署

#### 1、远程传输web项目资料到Linux目录/home/web_lemon下

#### 2、copy文件到tomcat下

1）查看web项目资料目录下文件
```
[root@localhost ~]# cd /home/web_lemon/
[root@localhost web_lemon]# ls
jdbc.properties  log4j.properties  ningmengban.sql  ningmengban.war
```
2）copy war包到Apache-Tomcat的webapps
```
[root@localhost web_lemon]# cp ningmengban.war /opt/apache-tomcat-6.0.37/webapps/
```
3）copy配置文件log4j.properties、jdbc.properties到Apache-Tomcat的conf
```
[root@localhost web_lemon]# cp log4j.properties jdbc.properties /opt/apache-tomcat-6.0.37/conf
```
4）查看文件copy成功

```
cd /opt/apache-tomcat-6.0.37/webapps/
ls

cd /opt/apache-tomcat-6.0.37/conf/
ls
```
#### 3、修改jdbc.properties（数据库连接的配置文件：主机ip、数据库名称、用户名、密码）

```
cd /opt/apache-tomcat-6.0.37/conf/
vim jdbc.properties
```

```
jdbc.url=jdbc:mysql://主机ip:3306/数据库名称?useUnicode=true&characterEncoding=utf-8
jdbc.username=用户名
jdbc.password=密码
```
#### 4、开启mysql

1）查看mysql运行状态
```
service mysqld status
mysqld is stopped
```
2）开启mysql
```
service mysqld start
```

#### 5、初始化数据库

1）登录mysql指定主机ip，进入mysql
```
mysql -uroot -p -h主机ip
Enter password:123456
```
2）创建数据库
a：创建
```
mysql> CREATE DATABASE ningmengban;
```
b：查看数据库新建成功

```
mysql> show databases;
```

3）初始化表结构

a：选择数据库
```
mysql> use ningmengban
Database changed
```
b：初始化表结构，资源执行sql

```
mysql> source /home/web_lemon/ningmengban.sql
```
c：查看执行sql后数据库的表

```
mysql> show tables;
```
4）退出mysql

```
mysql > exit;
mysql > quit;
mysql > \q;
```

#### 6、启动Apache-Tomcat

1）启动
```
cd /opt/apache-tomcat-6.0.37/bin/

./startup.sh start
```

2）访问

```
http://主机ip:8888/ningmengban/app/login/login.html
```
![apache-tomcat-web部署.png](http://upload-images.jianshu.io/upload_images/2897320-191c71621b90b047.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

7、注册，登录后，查看表数据

1）使用数据库ningmengban
```
mysql> use ningmengban
Database changed
```
2）查看表数据（结尾符\G与;）
```
mysql> select * from nm_user\G
```
```
*************************** 1. row ***************************
            id: 8de515ab0d8d4fa7b52b6859c917dece
      username: 123456@qq.ciom
      password: e10adc3949ba59abbe56e057f20f883e
      nickname: 
           sex: NULL
         phone: NULL
       address: NULL
            qq: NULL
        wechat: NULL
        status: NULL
    createDate: 2017-05-05 19:02:28
    createUser: NULL
lastUpdateDate: NULL
lastUpdateUser: NULL
        logoId: NULL
1 row in set (0.00 sec)
```
或

```
mysql> select * from nm_user;
```

```
+----------------------------------+----------------+----------------------------------+----------+------+-------+---------+------+--------+--------+---------------------+------------+----------------+----------------+--------+
| id                               | username       | password                         | nickname | sex  | phone | address | qq   | wechat | status | createDate          | createUser | lastUpdateDate | lastUpdateUser | logoId |
+----------------------------------+----------------+----------------------------------+----------+------+-------+---------+------+--------+--------+---------------------+------------+----------------+----------------+--------+
| 8de515ab0d8d4fa7b52b6859c917dece | 123456@qq.ciom | e10adc3949ba59abbe56e057f20f883e |          | NULL | NULL  | NULL    | NULL | NULL   | NULL   | 2017-05-05 19:02:28 | NULL       | NULL           | NULL           | NULL   |
+----------------------------------+----------------+----------------------------------+----------+------+-------+---------+------+--------+--------+---------------------+------------+----------------+----------------+--------+
1 row in set (0.00 sec)
```

## 二、接口项目部署
### 1：准备工作
#### 1、修改配置文件
1）修改
```
vim /etc/profile
```
```
JAVA_HOME=/opt/jdk1.7.0_07/
JAVA_BIN=$JAVA_HOME/bin
JRE_HOME=$JAVA_HOME/jre
JRE_BIN=$JRE_HOME/bin

PATH=$JAVA_BIN:$JRE_BIN:$PATH
CATALINA_HOME=/opt/apache-tomcat-6.0.37

export JAVA_HOME JRE_HOME CATALINA_HOME PATH
```
2）使生效
```
source /etc/profile
```
3）查看路径保存成功
```
echo $CATALINA_HOME

/opt/apache-tomcat-6.0.37
```

#### 2、搭建数据库

1）上传sql脚本到Linux目录/home/api/sql下

```
cd /home/api/sql/
ll

-rw-r--r--. 1 root root 2657 May  7 06:23 execsql.sh
```

2）授权脚本执行文件execsql.sh

```
chmod 777 -R execsql.sh
```
3）修改execsql.sh

```
vim execsql.sh

修改
mysql="mysql -uroot -p密码 -h主机ip"
```

4）根据.sql文件的后缀，执行脚本，生成数据库和数据库表

准备工作：开启mysql数据库
```
service mysqld start
mysql -uroot -p -h192.168.76.129
```

a：没有参数.sql

```
./execsql.sh 16finance_db.t_appid_config.sql
```

b：XX.Y.sql（后面加固定写法 00.0-99.9）

./execsql.sh *.XX.Y.sql 00.0 99.9

```
./execsql.sh sms_db.t_mvcode_info.XX.Y.sql 00.0 99.9

结果集
0.0...
0.1...
...
99.9...
```

c：YYYYMM.sql（后面加 初始年月到结束年月 2017-01-01 2017-12-01）

./execsql.sh *.YYYYMM.sql 2017-01-01 2017-12-01

```
./execsql.sh  sms_db.t_mvcode_log.YYYYMM.sql 2017-01-01 2017-12-01

结果集
20170101...
20170201...
...
20171101...
```
### 2：搭建测试环境

#### 准备工作：

#### 1）上传war包到tomcat6的webapps目录/opt/apache-tomcat-6.0.37/webapps下，开启关闭Apache-Tomcat自动解压

a：启动Apache-Tomcat
```
cd /opt/apache-tomcat-6.0.37/bin/

./startup.sh start
```
b：war文件自动解压

![开关apache后war自动解压.png](http://upload-images.jianshu.io/upload_images/2897320-82ee0b6528def00f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

c：关闭Apache-Tomcat

```
./shutdown.sh start
```
#### 2）修改配置文件
修改app-config.properties，修改url里面的主机信息、数据库连接信息（主机ip、用户名、密码）、短信应用模板路径路径（/opt/apache-tomcat-6.0.37/conf/sms_conf.xml）


#### 3）上传配置文件

a：上传到/opt/apache-tomcat-6.0.37/conf

- app-config.properties:数据库配置等
- log4j.properties：项目的日志文件
- logging.properties：项目日志配置文件
- sms_conf.xml：短信模板的配置文件

b：上传到/opt/apache-tomcat-6.0.37/logs
- system

#### 4）查看日志
（注意：启动Apache-Tomcat之前，先打开日志窗口）

a：打开系统日志
```
cd /opt/apache-tomcat-6.0.37/logs/

tail -f catalina.out
```

b：打开详细日志
```
cd /opt/apache-tomcat-6.0.37/logs/

tail -f system
```

打开日志后，开启Apache-Tomcat
```
cd /opt/apache-tomcat-6.0.37/bin/

./startup.sh start
```
ERROR是错误，DEBUG是调试错误
```
00:35:54.400 [main] DEBUG o.m.spring.SqlSessionFactoryBean - Property 'configLocation' not specified, using default MyBatis Configuration
```

### 3：异常处理

1）如果出现部署不成功，可能项目读取不到conf的配置文件，解决方式是拷贝以下三个文件
	app-config.properties，logging.properties，sms_conf.xml 到每个项目的classes路径下去：
	如：/opt/apache-tomcat-6.0.53/webapps/account-service-war-1.0/WEB-INF/classes

2）内存溢出：java.lang.OutOfMemoryError: PermGen space

报错：
```
SEVERE: Error deploying web application directory examples
java.lang.OutOfMemoryError: PermGen space
```

[java.lang.OutOfMemoryError处理](http://www.91linux.com/html/2017/Java_0406/45954.html)
```
cd /opt/apache-tomcat-6.0.37/bin

vim catalina.sh
```
添加JAVA_OPTS="-server -XX:PermSize=64M -XX:MaxPermSize=128m"
```
/Using CATALINA_BASE 搜索
在echo "Using CATALINA_BASE:   $CATALINA_BASE"上面添加

JAVA_OPTS="-server -XX:PermSize=64M -XX:MaxPermSize=128m"
```

### 4：验证环境部署成功

分别访问如下地址，看是否能够正常打开
	
1）http://主机ip:8888/finance-user_info-war-1.0/ws/financeUserInfoFacade.ws?wsdl

![接口项目1.png](http://upload-images.jianshu.io/upload_images/2897320-61572a26f702d06b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2）http://主机ip:8888/account-service-war-1.0/ws/userAccountFacade.ws?wsdl

![接口项目2.png](http://upload-images.jianshu.io/upload_images/2897320-c398ce539a72fe8e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3）http://主机ip:8888/sms-service-war-1.0/ws/smsFacade.ws?wsdl 

![接口项目3.png](http://upload-images.jianshu.io/upload_images/2897320-7512bd5a6ece9a0d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

4）http://主机ip:8888/cms-service-war-1.0/ws/imgCodeFacade.ws?wsdl

![接口项目4.png](http://upload-images.jianshu.io/upload_images/2897320-30fab0452e8d50d6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

