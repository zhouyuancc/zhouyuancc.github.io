### 压缩、解压命令
1.tar
> tar -czvf [目标名].tar.gz [要压缩的文件名]]

- tar ==-czvf== test.tar.gz cc
- 将cc文件夹压缩成test.tar.gz


> tar -xvzf [要解压的文件名].tar.gz

- tar ==-xvzf== test.tar.gz
- 将test.tar.gz解压，解压后，文件==重名无提示==

命令参数

- c：建立归档，打包
- z：==gzip方式进行压缩==，使用z文件会被压缩小
- v：view显示所有压缩过程
```
cc/
cc/cc1/
cc/text.txt
cc/.11.txt.swp
```
- f：文档名
- x：解归档extract（解出，提取）

2.zip
- 压缩：zip ==-r== test.zip test
- 解压：unzip test.zip
- 解压后，文件重名会有提示

### 关闭防火墙命令
3.防火墙：控制数据进出的一套规则


```
service iptables status查看防火墙状态

即时生效，重启后失效
service iptables start 开启
service iptables stop 关闭

永久关闭
开启：chkconfig iptables on 
关闭：chkconfig iptables off
```
### 重启、关闭、退出登陆命令
4.重启

==reboot== 

shutdown ==-r== now
```
reboot 
shutdown -r now
```
5.关机

==halt== 

shutdown ==-h== now

==poweroff==
```
halt 
shutdown -h now
poweroff
```
6.注销、登出
```
logout
```
快捷键
- Ctrl+C：结束正在运行的程序
- tab：自动补全（cd空格Tab会有提示）

```
[root@localhost cc]# cd 
.11.txt.swp  cc1/         text.txt
```
- 上下按键：对历史命令上一个下一个查找

### MySQL数据库的安装
数据库：存储数据的仓库

- 安装：yum install mysql-server

```
yum ：自动处理依赖，一次安装所有依赖的软件包（不易定制）
mysql：源码安装
```

- 启动：安装完毕，执行service mysqld start

```
service mysqld(d守护模式) start
```

- 登录：

```
mysql -u(user) root -p(password) 登录数据库 输入密码
mysql -u root -p(默认用户名root密码空)
mysql -uroot -p
```

- 使用：
```
use mysql;/use mysql（切换到mysql数据库）
show tables;查询表
select user,host,password from user;查用户
```
- 授权

```
授权新建用户：grant  all privileges on *.* to 'root'@'%'  identified by '123456' with grant option;

参数详解：
所有数据库所有对象：grant all privileges on *.*  
@：连接主机
%：支持任意主机连接到mysql服务器
具有授权权限：with grant option;
刷新权限：flush privileges; 

授权后，查权限select user,host,password from user;
```

show databases;

![image](http://upload-images.jianshu.io/upload_images/2897320-599b06c971de3183.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
mysql> show databases
    -> show databases;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'show databases' at line 2
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| test               |
+--------------------+
3 rows in set (0.00 sec)
```

```
mysql> select user,host,password from user;
+------+-----------------------+----------+
| user | host                  | password |
+------+-----------------------+----------+
| root | localhost             |          |
| root | localhost.localdomain |          |
| root | 127.0.0.1             |          |
|      | localhost             |          |
|      | localhost.localdomain |          |
+------+-----------------------+----------+
5 rows in set (0.00 sec)
```

```
mysql> grant all privileges on *.* to 'root'@'%' identified by '123456' with grant option;
Query OK, 0 rows affected (0.03 sec)
```

```
mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)
```

```
mysql> select user,host,password from user;
+------+-----------------------+-------------------------------------------+
| user | host                  | password                                  |
+------+-----------------------+-------------------------------------------+
| root | localhost             |                                           |
| root | localhost.localdomain |                                           |
| root | 127.0.0.1             |                                           |
|      | localhost             |                                           |
|      | localhost.localdomain |                                           |
| root | %                     | *6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9 |
+------+-----------------------+-------------------------------------------+
6 rows in set (0.00 sec)
```

```
[root@localhost ~]# service iptables status
Table: filter
Chain INPUT (policy ACCEPT)
num  target     prot opt source               destination         
1    ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           state RELATED,ESTABLISHED 
2    ACCEPT     icmp --  0.0.0.0/0            0.0.0.0/0           
3    ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           
4    ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0           state NEW tcp dpt:22 
5    REJECT     all  --  0.0.0.0/0            0.0.0.0/0           reject-with icmp-host-prohibited 

Chain FORWARD (policy ACCEPT)
num  target     prot opt source               destination         
1    REJECT     all  --  0.0.0.0/0            0.0.0.0/0           reject-with icmp-host-prohibited 

Chain OUTPUT (policy ACCEPT)
num  target     prot opt source               destination         

[root@localhost ~]# service iptables stop
iptables: Flushing firewall rules:                         [  OK  ]
iptables: Setting chains to policy ACCEPT: filter          [  OK  ]
iptables: Unloading modules:                               [  OK  ]
[root@localhost ~]# 
```

![image](http://upload-images.jianshu.io/upload_images/2897320-c28370c305693855.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
