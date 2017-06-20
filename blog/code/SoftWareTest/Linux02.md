获取地址
- windows：ipconfig
- linux：ifconfig


### 文件操作命令
1.rm 删单个目录directory，不能删带/的目录

-r 可以删目录cc/cc1

```
[root@localhost ~]# rm cc/cc1
rm: cannot remove `cc/cc1': Is a directory
[root@localhost ~]# rm cc/cc1 -r
rm: descend into directory `cc/cc1'? y
rm: remove directory `cc/cc1/cc.txt'? y
rm: remove directory `cc/cc1'? y
[root@localhost ~]# ll
```

-f：强制删除

-rf：强制删除目录

rmdir：删除空目录

```
rmdir a
rmdir: failed to remove `a': Directory not empty
```

2.find 路径 选项 （查找文件）

find .（当前目录下查找）（空格）==-name==（-name：==固定格式，按名字查找==） *.txt（以txt结尾的文件）

find /（当根目录下查找） ==-name== text（以text命名的目录）

```
[root@localhost cc]# ll
total 8
drwxr-xr-x. 2 root root 4096 Apr 17 05:41 cc1
-rw-r--r--. 1 root root  138 Apr 14 09:19 text.txt
[root@localhost cc]# find . -name *.txt
./text.txt
[root@localhost cc]# find / -name *.txt

[root@localhost cc]# find . -name cc1
./cc1
```
3.grep  字符串 文件名 （查找字符串）    

grep str text.txt（在text.txt中查找str字符）

grep：检索目标行命令

```
[root@localhost cc]# grep str text.txt
str  dfslkfjadjlf;jasldfjkldafsjsdaf
```
多窗口操作

- 右键，复制SSH渠道

4.cat 文件名：显示文本内容，不能像vi一样编辑

cat cc1

cat text.txt
```
[root@localhost cc]# cat cc1
cat: cc1: Is a directory
[root@localhost cc]# cat text.txt
str  dfslkfjadjlf;jasldfjkldafsjsdaf
kkkkmnddeccvkk

ksadjf;lakdsjsaf
aksdjf;aldsfkj

askdjf;ladksf

aksljdf;lad

;ljfsajlfkas;djkGAGADD/jkhjl
```
5.head 查看前几行

head ==-n== 5 ==text.txt== 查看前5行

```
[root@localhost cc]# head -n 5 text.txt
str  dfslkfjadjlf;jasldfjkldafsjsdaf
kkkkmnddeccvkk

ksadjf;lakdsjsaf
aksdjf;aldsfkj
```
6.tail 查看后几行

tail ==-n== 5 ==text.txt== 

tail ==-f== ==error.log== 不断刷新，看到最新内容 （tomcat日志文件不断刷新）

```
[root@localhost cc]# tail -n 5 text.txt
askdjf;ladksf

aksljdf;lad

;ljfsajlfkas;djkGAGADD/jkhjl
```
### 系统资源查询命令
7.ps 查看进程

ps ==-ef== 查看进程，显示一大串，开了哪些软件会显示出来
- UID：用户id
- PID：进程的id
- PPID：父进程
- C：进程CPU占用率
- Stime：进程从启动到现在的时间
- TTY：终端号
- CMD：命令名称和参数

ps -ef 部署软件、重装软件、暂停软件时，配合kill使用
```
[root@localhost cc]# ps
  PID TTY          TIME CMD
 2644 pts/0    00:00:00 bash
 2881 pts/0    00:00:00 ps
[root@localhost cc]# ps -ef
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  0 05:19 ?        00:00:02 /sbin/init
root         2     0  0 05:19 ?        00:00:00 [kthreadd]
...
root      2883  2644  0 06:04 pts/0    00:00:00 ps -ef
```
8.netstat：查看网络状态（net status） 

- netstat -apn：所有端口
- netstat an：按一定顺序
- netstat p：显示哪个进程在调用
- netstat -apn | grep 9999

### 管道命令
9.|：符号“|”，在命令之间建立管道，将前面的命令的输出作为后面命令的输入

|后面从|前面的数据中，进行筛选

- netstat -apn | grep 127
```
[root@localhost cc]# netstat -apn|grep 127
tcp        0      0 127.0.0.1:631               0.0.0.0:*                   LISTEN      1830/cupsd          
tcp        0      0 127.0.0.1:25                0.0.0.0:*                   LISTEN      2086/master         
unix  3      [ ]         STREAM     CONNECTED     12703  1857/acpid          /var/run/acpid.socket
unix  3      [ ]         STREAM     CONNECTED     12702  1911/hald-addon-acp 
```
- ll|grep cc1
- ll|grep text.txt

```
drwxr-xr-x. 2 root root 4096 Apr 17 05:41 cc1
-rw-r--r--. 1 root root  143 Apr 17 05:49 text.txt
[root@localhost cc]# ll|grep cc1
drwxr-xr-x. 2 root root 4096 Apr 17 05:41 cc1
[root@localhost cc]# ll|grep text.txt
-rw-r--r--. 1 root root  143 Apr 17 05:49 text.txt
```
- 通过==进程名==找到进程，kill进程

==ps -ef | grep tomcat==：查找所有进程包含tomcat的进程，即tomcat进程，如5511：==kill -9 5511==

kill -9 进程id （-9：强制kill进程）

- 通过==端口==来找到进程，kill进程

==netstat -apn | grep 8080==：查找占用此端口的进程编号，再kill

### 权限赋予命令
10.chmob：修改权限change mode

后9个，三个三个分割
![image](http://upload-images.jianshu.io/upload_images/2897320-f133d9092cad6e54.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- r：读read：==4==
- w：写write：==2==
- x：执行exceute：==1==


```
755 drwxr-xr-x. 2 root root 4096 Apr 17 05:41 cc1
644 -rw-r--r--. 1 root root  143 Apr 17 05:49 text.txt
```
chmod [-R（权限值）] xyz（文件或目录）

==chmod 755 text.txt==

```
drwxr-xr-x. 2 root root 4096 Apr 17 05:41 cc1
-rwxr-xr-x. 1 root root  143 Apr 17 05:49 text.txt
```
su root：切换到管理员

```
useradd lemon22：添加用户
```

passwd lemon22：输入密码


```
切换用户时的error

su lemon22
bash-4.1$  

原因：缺少系统配置文件
```


解决方案：把隐藏文件.bash_history .bash_logout之类的copy到新用户文件夹lemon22下




