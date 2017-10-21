
## Linux搭建禅道

### 1. 安装包
Linux 64位
- 1：http://sourceforge.net/projects/zentao/files/7.3/ZenTaoPMS.7.3.stable.zbox_64.tar.gz/download
- 2：http://dl.cnezsoft.com/zentao/7.3/ZenTaoPMS.7.3.stable.zbox_64.tar.gz

Linux 32位
- http://dl.cnezsoft.com/zentao/7.3/ZenTaoPMS.7.3.stable.zbox_32.tar.gz


```
//查看linux位数 i386 32位
[root@localhost ~]# uname -a
```

### 2. Xftp
![image](http://upload-images.jianshu.io/upload_images/2897320-2cb22da83e34856d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

清空/home目录下的文件
```
[root@localhost ~]# cd /home
[root@localhost home]# ls
test2
[root@localhost home]# rm -rf *
[root@localhost home]# ls
```
### 3. 解压
问：不可以解压好再传输过去吗？

答：NO
1. 可能存在性能问题
2. 多文件传输可能速度慢
3. 方便传输
4. 可能存权限问题

#### 解压禅道安装包
- 解压 tar -zxvf 压缩文件名 -C 目标目录
- /opt：存放 大型软件
- /usr/local：存放 小型软件

```
[root@localhost opt]# tar -zxvf ZenTaoPMS.7.3.stable.zbox_32.tar.gz -C /opt
```
### 4. 启动zbox
```
[root@localhost home]# cd /opt
[root@localhost opt]# ls
rh  zbox
[root@localhost opt]# cd zbox
[root@localhost zbox]# ll
total 44
drwxr-xr-x. 5 root root 4096 Oct 14  2015 app
drwxr-xr-x. 2 root root 4096 Oct 10  2015 auth
drwxr-xr-x. 2 root root 4096 Oct 10  2015 bin
drwxr-xr-x. 3 root root 4096 Oct 10  2015 data
drwxr-xr-x. 5 root root 4096 Oct 10  2015 etc
drwxr-xr-x. 2 root root 4096 Oct 14  2015 logs
-rw-r--r--. 1 root root  278 Oct 14  2015 README
drwxr-xr-x. 6 root root 4096 Oct 10  2015 run
drwxrwxrwx. 5 root root 4096 Oct 10  2015 tmp
-rwxr-xr-x. 1 root root 4362 Oct 10  2015 zbox
[root@localhost zbox]# 
```
- 查看zbox执行文件的内容
- vim：比vi文本编辑器功能多一点，用yum命令安装
```
[root@localhost zbox]# vim zbox
```
- 操作命令
```
vi text.txt（若text.txt不存在，自动创建）  
注意：若用mkdir创建txt，E502: "text.txt" is a directory，不能编辑，英文输入法

按i进入INSERT模式

ESC退出INSERT模式

/abc 回车 查找abc

G 定位到最末行第一位
g 定位到第一行第一位

k 上一行
j 下一行

按ESC,输入:q! 不保存退出
按ESC,输入:wq 保存退出

o 在当前行的下面，新开一行进行输入
```

- 启动Apache、Mysql

```
./zbox：访问、执行zbox文件
```

```
[root@localhost zbox]# ./zbox start
Starting MySQL\nStart Apache success
Start Mysql success
```
- 操作命令
```
启动Apache、Mysql
[root@localhost zbox]# ./zbox start
全路径：/opt/zbox/zbox start

停止Apache、Mysql
./zbox stop

重启Apache、Mysql
./zbox restart

获取帮助
/opt/zbox/zbox -h

-ap：(apache pot)修改Apache端口
/opt/zbox/zbox -ap 8180

-mp：修改MySQL端口
```

### 5. 部署成功

```
[root@localhost zbox]# ifconfig
inet addr:网址
```
![image](http://upload-images.jianshu.io/upload_images/2897320-15776d8952d090b0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 网络知识

Web服务器：Apache

```
ps -ef|grep mysql ：查找所有进程包含MySQL的进程，即MySQL进程
参考：Linux02
```
### 1. OSI 7层模型
- Physical：物理

```
中继器、集线器、网线、HUB
```
- Data Link：数据链路层

```
网卡、网桥、交换机
```

- Network：网络层

```
路由器、防火墙、多层交换机
```

- Transport：传输层

```
进程和端口
```

- Session：会话层

```
建立会话、SESSION认证、断点续传
```

- Presentation：表示层

```
编码方式、图像编解码、URL字段传输编码
```

- Application：应用层

```
应用程序，如：FTP、SMTP、HTTP
```

### ==Please Do Not Tell Stupid People Anything==：不要告诉愚蠢的人任何事


```
物理层->应用层：用户接收数据
应用层->物理层：发送数据（电子信号传输、硬件接口数据发送）
```
QQ聊天为例，用户A与用户B聊天

- 应用层：打开界面输入文字，QQ软件这个应用程序属于应用层范围，==人机交互==的应用软件和应用协议

- 表示层：QQ为了安全，给文字加密。表示层对数据进行==加密、压缩==，再将数据交给会话层

- 会话层：为了==找到对方==的QQ==进程==，建立一次会话和结束一次会话

- 传输层：建立连接的方式，==TCP/UDP==，==找到==QQ传输信息==端口==，==加上协议头==，交给网络层

- 网络层：通过==路由器==要==找到对方的网络地址==，为本次会话选择路由，加上协议头（==还加？==）交给数据链路

- 数据链路层：==通过物理地址找到对方主机==，真正负责建立这次会话，建立这次链接，加上==帧头==后交给物理层

- 物理层：负责进行==二进制比特流的传输==

### 2.常见知识点

#### 网络协议
- HTTP协议：常见接口协议
- SOAP协议：WebService接口，简单对象访问协议
- TCP协议：传输控制协议，比UDP协议可靠，因为有3次握手
- UDP协议：用户数据报协议

#### 防火墙
是一种将内部网和公众访问网分开的方法。是一种隔离技术，保护内部网免受非法用户的侵入。是一种位于内部与外部网络间的网络安全系统。防护系统，依照特定的规则，允许或限制传输的数据通过

- 基本特性
    - 内部和外部网络之间的所有网络数据流都必须经过防火墙（配置IP表，规则：service iptables status）
    - 只有符合安全策略的数据流才能通过防火墙
    - 防火墙自身应具有非常强的抗攻击免疫力

#### DHCP
动态网络协议:自动分配IP地址

#### DNS
域名解析服务器:通过域名来进行解析，找到服务器IP地址

```
ping www.baidu.com
域名www.baidu.com  替代 14.215.177.37 好记
```




