MySQL连不上的原因

- 连接信息未填写正确
- 虚拟机未启动mysql服务
- 虚拟机防火墙未关闭
- 等

### 卸载yum命令安装的MySQL
-  yum命令卸载安装的mysql     
-          yum -y remove mysql*
-  查找mysql安装文件   find / -name mysql
-  用rm -rf 删除查找出的mysql文件

注意：
- 语句+;
- service mysqld start/stop：mysql服务的启动/关闭

### 数据库和标的概念
1. 数据库：存储数据的容器
2. 表：真正的存储单元
3. 数据库与表：一对多

### SQL
Structured Query Language：结构化查询语言

用于==访问和处理==数据库的标准计算机语言

创建数据库、表、视图、存储过程等数据库对象

数据库记录的CRUD

#### 测试需要学sql的原因
1. 查询数据
2. 完整性验证
3. 造数据，测试
4. 压力测试
5. 应用软件测试（访问数据库）

### 创建数据库

创建：create database 数据库名称

```
create database future;
```

展示数据库

```
show databases;
```

使用：use 数据库名称;

```
use future;
```
查看所有表

```
show tables;
```

### 创建表

> create table <表名> ( <字段名1> <类型1> , <字段名2> <类型2> ...<字段名n> <类型n>)  DEFAULT CHARSET=utf8;

- 字段名：用来标识标的一列
- 类型：生命每一个字段存储数据的类型（整型INT、小数DECIMAL、字符VARCHAR、时间DATETIME|TIMESTMP）
- 字符集：UTF8，表示支持中文数据存储

### 常见字段类型
整型
- int：可为负值

字符串型
- char：固定长度
```
char(20):最多保存20个字符，在表中的固定这个长度

固定占20保存，20个空间去保存10个字符
```
- varchar：可变长度

```
varchar(20) :最多保存20个字符，如果小与20,比如说10个，在表中就保存了10个字符这样一个长度

空间可缩小
```
时间
- date：2017-4-19
- time：21:35:00
- 版本>=5.5：datetime  yyyy-mm-dd hh:mm:ss
- 版本<5.5：timestamp

查看yum安装的MySQL版本
```
select version();
```
浮点型

> float(m, d)：
- 单精度 32bit 
- m总位数 d小数位|存储的是近似值
- 例：12.50 float(4,2)

> double(m, d)：
- 双精度 64bit
- m总位数 d小数位|存储的是近似值 
- 例：12.50 double(4,2)

> 区别：
双精度比单精度 能表示的 小数的精确度高

> decimal(m, d)：
- 数字型 128bit 精度非常高
- m总位数 d小数位|存储的值不会超过m位，小数点后不超过d位|以字符串的形式保存数值
- 例：12.50 double(4,2)
- 金钱、价格、利率、精度要求较高的

精度会丢失的原因？

### 主键
- 唯一标识，不重复，一个表只有一个主键
- 主键自动设置为NOT NULL
- 主键是非必需的，一个表可以不声明主键字段

<字段名><类型> PRIMARY KEY;

```
id INT(11) PRIMARY KEY;
```

备注：
- 多行注释：/*  */ 
- 单行注释：-- 
- mysql 不区分大小写
- linux查看帮助文档 
```
man man
```
- mysql的帮助文档 

带==英文分号;==

```
help int;

help timestamp;
The range is '1970-01-01 00:00:01' UTC to '2038-01-19
```
- 面试时，关键字（==VARCHAR or VARCHAR(20)?==）用大写，如VARCHAR

### 练习

注意：
1. 连接MySQL前，先关闭防火墙
    - service iptables status查看防火墙状态
    - 即时关闭，重启后失效：service iptables stop 
    - 永久关闭：chkconfig iptables off
2. service mysqld start
- -- 注释后要加空格
- DEFAULT CHARSET=utf8;
- 主键：PRIMARY KEY
- 自增：AUTO_INCREMENT
```
service iptables stop
```
```
CREATE TABLE Member(
		Id INT(11) PRIMARY KEY AUTO_INCREMENT,
		RegName VARCHAR(50) NOT NULL COMMENT '用户名',-- 用户名
		Pwd VARCHAR(50) NOT NULL COMMENT '密码',-- 密码
		MobilePhone VARCHAR(20) NOT NULL COMMENT '手机号码',-- 手机号码
		Type INT(11) NOT NULL COMMENT '1普通会员2内部员工5测试用户',-- 1普通会员2内部员工5测试用户
		LeaveAmount DECIMAL(18,2) NOT NULL COMMENT '可用余额',-- 可用余额
		RegTime DATETIME NOT NULL  COMMENT '注册时间' -- 注册时间
) DEFAULT CHARSET=utf8;
```

```
CREATE TABLE Loan(

	Id INT(11) PRIMARY KEY,
	MemberID INT(11) NOT NULL,-- 用户Id
	Title VARCHAR(50) NOT NULL,-- 标题
	Amount DECIMAL(18,2) NOT NULL,-- 借款金额
	LoanRate DECIMAL(3,1) NOT NULL,-- 年利率,如年化18.0%，存储为18.0
	LoanTerm TINYINT(1) NOT NULL,-- 借款期限 如6个月为6，30天为30
	LoanDateType TINYINT(1) NOT NULL,-- 借款期限类型 借款期限单位  0-按月 2-按天 4-按周
	BiddingDays TINYINT(1) NOT NULL,-- 竞标天数
	CreateTime DATETIME NOT NULL,-- 创建时间
	BiddingStratTime DATETIME,-- 竞标开始时间
	FullTime DATETIME,-- 满标时间
	Status TINYINT(1) -- 状态  1:审核中 2:二审(初审中) 3:三审(复审中) 4:竞标中 5:核保审批 6:平台终审 7:还款中 8:审核不通过 9:流标 10:还款完成 11：申请流标

) DEFAULT CHARSET=UTF8;
```

```
CREATE TABLE Invest(

	Id INT(11) PRIMARY KEY,
	MemberID INT(11) NOT NULL, -- 用户Id
	LoanId INT(11) NOT NULL,-- 标Id
	Amount DECIMAL(18,2) NOT NULL,-- 借款金额
	CreateTime DATETIME NOT NULL,-- 创建时间
	IsValid TINYINT(1) NOT NULL-- 是否有效：0无效 1有效

) DEFAULT CHARSET=UTF8;
```

```
CREATE TABLE Repayment(

	Id INT(11) PRIMARY KEY,
	InvestId INT(11) NOT NULL,-- 投资Id
	CreateTime DATETIME,-- 创建时间
	Terms TINYINT(1) NOT NULL,-- 回款期次,如6表示第6期回款
	UnfinishedPrincipal DECIMAL(18,2) NOT NULL,-- 待还本金
	UnfinishedInterest DECIMAL(18,2) NOT NULL,-- 待还利息
	RepaymentDate DATETIME NOT NULL,-- 回款日期
	ActualRepaymentDate DATETIME,-- 实际回款日期
	Status TINYINT(1) NOT NULL-- 回款状态 还款状态:0-未还，1-部分已还，2-全额已还，3-作废

) DEFAULT CHARSET=UTF8;
```

```
CREATE TABLE Financelog(

	Id INT(11) PRIMARY KEY AUTO_INCREMENT,
	CreateTime DATETIME,-- 实际回款日期
	PayMemberId INT(11) NOT NULL,-- 支付用户id
	IncomeMemberId INT(11) NOT NULL,-- 进账用户id
	Amount DECIMAL(18,2) NOT NULL,-- 交易金额
	IncomeMemberMoney DECIMAL(18,2),-- 进账用户余额，进账后余额
	PayMemberMoney DECIMAL(18,2),-- 支付用户余额，支付后余额
	Status TINYINT(1)-- 状态 状态：0-冻结、1-正常、2-作废

) DEFAULT CHARSET=UTF8;
```

