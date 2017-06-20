### Windows
- 收费
- 软件资源丰富，大部分需要购买授权
- 主要图形化界面
- 非开源

### Linux
- 免费
- 同样功能的软件选择较少
- 主要是字符模式，命令行界面
- 开源
 
> 简介：支持 多用户、多任务、多线程、多CPU 的操作系统很多中大型、巨型项目都在使用Linux

> 发行版：Ubuntu、RedHat、CentOS(community enterprise operating system)等

#### Linux 注意
1. 区分大小写，默认小写
2. ==一切皆为文件，不靠扩展名区分文件类型==
    - Linux：一切皆为文件
    - Java：一切皆为对象
3. 命令间有空格

> Xshell：客户端软件，用来连接虚拟机，通过命令行操作Linux【若连接的页面显示为乱码：点击地球的图标，选择Unicode(UTF-8)】【root#|其他用户$】


> Xftp：文件传输软件，本地文件传输到虚拟机

---
### 系统管理
1. ifconfig：获取虚拟机IP地址
2. hostname：主机名
3. who：系统、用户

```
test2    tty1        
root     pts/0
```
     
4. whoami：用户 

```
root
```

5. history：输入的命令的历史
   
```
1  ifconfig
2  hostname
3  who
4  whoami
5  history
```

6. ping：网络是否联通

```
ping www.baidu.com
Ctrl+C 退出
```

7. su：==switch user== 切换用户

```
su test1 切换到test1这个用户，提示输入密码，登录
超级用户提示符 #
普通用户提示符 $ 
```

8. date：显示日期

```
date -s 时间或日期
date -s "20100405 14:31:00"
date -s 14:31:00
date -s 20100405
date -s 07/26/2005
```

9. kill：强制kill进程

```
kill -9(进程号)
```
---
### 目录操作
10. pwd：==Print Working Directory 打印当前工作目录==

```
[root@localhost ~]# pwd
/root
```
12. mkdir：创建目录 ==-p 创建父级目录== ==(mkdir 目录 -p)==

```
mkdir cc/cc1 -p 创建父级目录（创建文件夹cc，再创建文件夹cc1）
mkdir chichi （创建chichi文件夹）
mkdir a b c d/d1 d/d2 -p 创建多个文件夹
```

13. rmdir：删除==空==目录

```
rmdir chichi 删除空的chichi文件夹
rm -rf cc    删除cc文件夹及其子文件 rf强制删除

rm hello.txt 删单个目录directory
-r 删目录
-f 强制删除

-rf 强制删除目录

rmdir：删除空目录  
rmdir a
rmdir: failed to remove `a': Directory not empty
```

14. cd：change directory

```
/root     绝对路径：从根目录开始找
cc/或cc   相对路径：相对当前路径的一个路径
..        返回上一个文件夹
../mysql/ 同级文件夹
cd .      当前目录
```

15. man man：帮助文档

```
q 退出
man hostname 解释hostman的作用
```

---
### 文件操作命令
16. ls：查看目录 ==-a查看隐藏文件==

```
ls    查看目录
ls -a 所有文件（.隐藏文件）
ls -l 显示属性，即ll
ll -a 所有文件（.隐藏文件）+属性
```

17. cp：复制 ==-R其下所有目录== ==(cp -R old new)==

```
cp hello.txt hello2.txt (copy old new)
cp -R ../lemon lemon22 复制目录及其下所有目录
```

18. mv：移动move,==重命名==

```
mv hello.txt ../(mv old new)不重命名
mv hello.txt ../a.txt 重命名

如果新名称已经存在，mv: overwrite `/root/cc/text.txt'? 
Y
N
```

---
### 文本编辑命令
16. vi：文本编辑器

> :q!：不保存退出

> :wq：(==write to disk== quit)保存退出

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
```


17. mysql -uroot -p：登录mysql
18. show databases：看有哪些数据库



