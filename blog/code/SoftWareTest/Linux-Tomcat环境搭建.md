### 一、 解压Apache-Tomcat

```
[root@localhost home]# tar -zxvf apache-tomcat-6.0.37.tar.gz -C /opt/
```
### 二、Apache-Tomcat目录
```
[root@localhost opt]# cd /opt/apache-tomcat-6.0.37/
[root@localhost apache-tomcat-6.0.37]# ll
total 100
drwxr-xr-x. 2 root root  4096 May  4 06:55 bin
drwxr-xr-x. 2 root root  4096 Apr 29  2013 conf
drwxr-xr-x. 2 root root  4096 May  4 06:55 lib
-rw-r--r--. 1 root root 37951 Apr 29  2013 LICENSE
drwxr-xr-x. 2 root root  4096 Apr 29  2013 logs
-rw-r--r--. 1 root root   558 Apr 29  2013 NOTICE
-rw-r--r--. 1 root root  9188 Apr 29  2013 RELEASE-NOTES
-rw-r--r--. 1 root root 16287 Apr 29  2013 RUNNING.txt
drwxr-xr-x. 2 root root  4096 May  4 06:55 temp
drwxr-xr-x. 7 root root  4096 Apr 29  2013 webapps
drwxr-xr-x. 2 root root  4096 Apr 29  2013 work
```
- ==bin==：Linux或Windows可执行脚本文件，如启动和关闭Tomcat的脚本

1. 绿色的.sh文件 是shell脚本，Linux可执行文件

2. 白色的.bat：windows下，批处理文件，放命令行 

3. .exe：windows下，可执行文件

4. 红色的.jar：java源程序打包

5. 红色的.tar.gz：

```
[root@localhost apache-tomcat-6.0.37]# cd bin/
[root@localhost bin]# ls
bootstrap.jar       commons-daemon.jar            digest.bat        shutdown.bat  tomcat-juli.jar       version.bat
catalina.bat        commons-daemon-native.tar.gz  digest.sh         shutdown.sh   tomcat-native.tar.gz  version.sh
catalina.sh         cpappend.bat                  setclasspath.bat  startup.bat   tool-wrapper.bat
catalina-tasks.xml  daemon.sh                     setclasspath.sh   startup.sh    tool-wrapper.sh
```

- ==conf== （config）Tomcat服务器的各种全局配置文件 包括：

    - server.xml:Tomcat的主要配置文件、服务器配置信息，如：端口号、虚拟主机等
    - tomcat-users.xml：Tomcat用户的文件，保存tomcat的用户名、密码、角色信息
    - web.xml：部署描述符文件，注册了很多MIME类型，即文档类型（后缀名，如html）

```
[root@localhost bin]# cd ../conf/
[root@localhost conf]# ls
catalina.policy  catalina.properties  context.xml  logging.properties  server.xml  tomcat-users.xml  web.xml
```

- ==logs== 日志 执行时的日志文件，如：启动报错，会保存在该目录的文件中

```
cd /opt/apache-tomcat-6.0.37/logs/
//实时监听日志，可通过apache/bin的./startup.sh start和./shutdown.sh start测试日志变化
[root@localhost logs]# tail -f catalina.out
```

- ==webapps== 主要Web发布目录，默认情况下把Web应用文件放于此目录（程序都部署到这里）

    examles等都是项目文件

```
[root@localhost lib]# cd ../webapps/
[root@localhost webapps]# ls
docs  examples  host-manager  manager  ROOT
```
- ==RUNNING.txt== 运行说明文件，同readme.txt

- lib 所有jar文件

.jar java源程序打包

util 工具包

```
[root@localhost apache-tomcat-6.0.37]# cd lib
[root@localhost lib]# ls
annotations-api.jar  catalina.jar         el-api.jar     jsp-api.jar        tomcat-dbcp.jar     tomcat-i18n-ja.jar
catalina-ant.jar     catalina-tribes.jar  jasper-el.jar  servlet-api.jar    tomcat-i18n-es.jar
catalina-ha.jar      ecj-4.2.2.jar        jasper.jar     tomcat-coyote.jar  tomcat-i18n-fr.jar
```

- temp 运行时所产生的临时文件

- work ：Tomcat会将JSP（动态页面）生成的Servlet源文件和字节码文件放到这个目录下

- LICENSE 许可证

- NOTICE 说明文件

- RELEASE-NOTES 版本说明

### 三、Apache-Tomcat搭建

#### 1、解压jdk

```
[root@localhost home]# tar -xzvf jdk-8u65-linux-x64.tar.gz -C /opt/
```

#### 2、配置文件
```
[root@localhost ~]# vim /etc/profile
```
点击大写G到文档最末尾，添加
```
JAVA_HOME=/opt/jdk1.7.0_07/
JAVA_BIN=$JAVA_HOME/bin
JRE_HOME=$JAVA_HOME/jre
JRE_BIN=$JRE_HOME/bin

//linux用:
//windows用;
PATH=$JAVA_BIN:$JRE_BIN:$PATH

export JAVA_HOME JRE_HOME PATH
```
ESC :wq保存退出

注：$PATH
```
[root@localhost jre]# cd /opt/jdk1.7.0_07/jre
[root@localhost jre]# ls
bin        lib      plugin  THIRDPARTYLICENSEREADME-JAVAFX.txt  Welcome.html
COPYRIGHT  LICENSE  README  THIRDPARTYLICENSEREADME.txt
[root@localhost jre]# export

declare -x PATH="/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin"
//这个bin文件下有rm、nkdir等方法名，系统可以调用
```

#### 3、使/etc/profile生效
```
source /etc/profile
```

输入java查看是否安装成功
javac：编译文件

关闭防火墙，开启Apache Tomcat
```
[root@localhost apache-tomcat-6.0.37]# cd /opt/apache-tomcat-6.0.37/bin/
[root@localhost bin]# ./startup.sh

Using CATALINA_BASE:   /opt/apache-tomcat-6.0.37
Using CATALINA_HOME:   /opt/apache-tomcat-6.0.37
Using CATALINA_TMPDIR: /opt/apache-tomcat-6.0.37/temp
Using JRE_HOME:        /opt/jdk1.7.0_07//jre
Using CLASSPATH:       /opt/apache-tomcat-6.0.37/bin/bootstrap.jar
```
```
Windows里：bin里面.bat .sh点击直接执行
```
若不生效，reboot重启 或 登出logout

网页默认访问ROOT目录

```
cd /opt/apache-tomcat-6.0.37/webapps/
[root@localhost webapps]# ls
docs  examples  host-manager  manager  ROOT
```

#### 打印环境变量
```
[root@localhost ~]# echo $PATH
/opt/jdk1.7.0_07//bin:/opt/jdk1.7.0_07//jre/bin:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin
```
cd $JAVA_HOME直接到jdk文件目录下，jdk自带jre运行时环境
```
[root@localhost webapps]# cd $JAVA_HOME
[root@localhost jdk1.7.0_07]# 
```


### 修改端口号（默认8080->8888），面试

1、到Tomcat路径下的conf文件夹下
```
cd /opt/apache-tomcat-6.0.37/conf/
```
2、修改server.xml，搜索8080，然后

```
vim server.xml
```
3、搜索8080

```
/8080
```
4、进行修改，其他地方不动，ESC :wq保存退出

```
i：进入编辑模式 将8080修改为8888（1023,2的16次方）//1023以下是给ssh，连接shell使用的端口号
```
5、重启
```
cd /opt/apache-tomcat-6.0.37/bin/
[root@localhost bin]# ./shutdown.sh start
[root@localhost bin]# ./startup.sh start
```

![8888.png](http://upload-images.jianshu.io/upload_images/2897320-2586cdd00bc0b069.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![examples.png](http://upload-images.jianshu.io/upload_images/2897320-74ce4a0671c62fb6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![docs.png](http://upload-images.jianshu.io/upload_images/2897320-f56d5538d38d8b94.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![manager.png](http://upload-images.jianshu.io/upload_images/2897320-fc9ea57001021293.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
