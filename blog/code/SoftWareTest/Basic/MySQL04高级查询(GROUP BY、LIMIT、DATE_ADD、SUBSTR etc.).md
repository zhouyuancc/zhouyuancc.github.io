
### IN|NOT IN
```
SELECT * FROM member WHERE Id IN (1,2);
SELECT * FROM member WHERE Id=1 OR Id=2;
```
```
SELECT * FROM member WHERE Id NOT IN (1,2);
SELECT * FROM member WHERE Id!=1 AND Id!=2;
```
### LIKE
%：任意字符

```
LIKE '%小%'; //含小
LIKE '%菲';//以菲结尾
```
### GROUP BY
- 按照某列进行分组、进行统计
- 聚合函数：求 总成绩、平均成绩 etc. 的方法
   - SUM()，COUNT()，AVG()，MIN()，MAX() etc.
- 分组后，数据按未在GROUP BY后分组条件里的id分组，数据展示结果集的==第一个值==

```
SELECT A,B,聚合函数 FROM <表名> GROUP BY A,B HAVING <条件> ORDER BY <列名>
```

```
//统计每个标有多少条投资记录
//loan：标项目表 (GROUP BY id|title)
//invest：投资表

SELECT t1.id,t1.title,COUNT(*),MIN(t2.amount),MAX(t2.amount) FROM loan t1,invest t2
WHERE t1.id = t2.loanID
GROUP BY t1.id,t1.title;
```

```
SELECT COUNT(1),IsValid FROM invest WHERE MemberID=3 GROUP BY IsValid;
14  1
```

### COUNT()

- COUNT(*)
- COUNT(id)
- ==COUNT(1)== //COUNT(常量) //性能高，推荐使用

```
count('lemon')//计算结果集个数 //性能高
select 1,id from member;//1表示常量列
```

![image](http://upload-images.jianshu.io/upload_images/2897320-c9c0f82519ba7c4b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### DISTINCT
去重
```
SELECT DISTINCT MemberId FROM invest;

select DISTINCT(MemberID),LoanRate from loan;//()中只能包含1个值

select DISTINCT MemberID,LoanRate from loan;
```
### BETWEEN
==包含边界值==
```
BETWEEN 200000 AND 300000;//包含边界值

LEAVEAMOUNT>=200000 AND LEAVEAMOUNT<=300000;
```
### LIMIT：分页
- LIMIT 放在 ORDER BY 后面

> 计算

- m：从第m条开始（==索引从0开始==）
- n：一页展示的数据条数（==减完后+1==）
```
SELECT * FROM <表名> ORDER BY <列名> DESC LIMIT M,N; //LIMIT放在ORDER BY后面
//m开始,取n条数据
```

```
LIMIT 0,5; //1-5
LIMIT 1,5; //2-6
LIMIT 6,5; //7-11
```

```
LIMIT 0,5; //1-5     //第一页 (1-1) * 5, 5
LIMIT 5,5; //6-10    //第二页 (2-1) * 5, 5
LIMIT 10,5; //11-15  //第三页 (3-1) * 5, 5
```
公式
```
LIMIT (y-1)*x,x;
```
取20-30
- m：20 - 1
- n：(30-20) + 1
```
SELECT * FROM member LIMIT 19,11;
//从m:20-1开始
//20到30有n:11个数字
```

> TOP 

SELECT * FROM <表名> ORDER BY <列名> LIMIT 10;//取前几条

> LIMIT分页的3种写法

```
//1.
SELECT * FROM member LIMIT 0,5; //1-5
//2.
SELECT * FROM member LIMIT 5 OFFSET 0;//偏移量
//3.
SELECT * FROM <表名> ORDER BY <列名> LIMIT 10;//取前几条
```

### 常用函数

#### 数值相关
- SUM()
- COUNT()
- AVG()
- MIN()
- MAX()

#### 日期函数
- SYSDATE()：当前日期时间
```
SELECT SYSDATE();
2017-04-23 22:05:57
```
- CURDATE()：当前日期
```
SELECT CURDATE();
2017-04-23
```
- CURTIME()：当前时间
```
SELECT CURTIME();
22:04:40
```
- YEAR(date)：给定日期的年份
```
SELECT YEAR('2017-4-22 11:51:00');
2017
```
- ==month==(date)：给定日期的月份
```
SELECT month('2017-4-22 11:51:00');
4

SELECT MONTHNAME('2017-4-22 11:51:00');
April
```
- DATE(date)：给定日期的日期
```
SELECT DATE('2017-04-23 11:51:00');
2017-04-23
```

- DATE_ADD(date,INTERVAL 数字 unit)：为给定日期增加一个时间间隔 //INTERVAL：间隔 //unit：时间单元
```
//加一天
SELECT DATE_ADD('2017-4-22 11:51:00',INTERVAL 1 DAY);
2017-04-23 11:51:00
```
#### 字符串函数
- CONCAT(列A,列B)：字符串拼接
```
SELECT CONCAT(id,regName),id,regName from member;
7chihci  7  chichi
```

- SUBSTR(列A,截取开始的位置,截取长度)：字符串截取
```
//写法一
SELECT SUBSTR(regName FROM 1 FOR 1),regName from member;
//写法二
SELECT SUBSTR(regName,1,1),regName from member;

结果：
b   blue
```

```
abcd 
截取a
从第一位开始，截取1位
```
- length(列A)：获取字符串长度

```
SELECT LENGTH(RegName),regName from member;

结果：
4  blue
5  lemon
```

### 练习

1：查询某用户最近10条有效投资记录，按投资时间降序排列 

```
SELECT * FROM invest WHERE IsValid=1 AND MemberID=2 ORDER BY CreateTime DESC LIMIT 10;
```

2：统计平台累计交易额 : 每一份有效投资就是一次交易 

```
SELECT SUM(Amount) FROM invest WHERE IsValid=1;
```

3：查询明天应回款总额 

```
SELECT SUM(UnfinishedPrincipal)+SUM(UnfinishedInterest) FROM repayment WHERE DATE(RepaymentDate) = DATE_ADD(CURDATE(),INTERVAL 1 DAY);
```
订正

```
SELECT SUM(UnfinishedPrincipal+UnfinishedInterest)  FROM repayment 
where `Status` in(0,1) 
AND RepaymentDate < DATE_ADD(CURDATE(),INTERVAL 2 DAY);
```
修正内容
```
应回款：`Status` in(0,1) 
明天应回,日期应小于后天：RepaymentDate < DATE_ADD(CURDATE(),INTERVAL 2 DAY)
```

4：统计平台待还本金（待收：没有收回的本金，也叫在保总额、在保本金）

```
SELECT SUM(UnfinishedPrincipal) FROM repayment WHERE `Status` IN(0,1);
```

5：查询7天内应回款条数  

```
SELECT COUNT(DISTINCT (SELECT b.loanId FROM invest b WHERE b.id=a.InvestId))  FROM repayment a WHERE DATE(RepaymentDate) BETWEEN CURDATE() AND DATE_ADD(CURDATE(),INTERVAL 1 WEEK);

```
订正

```
SELECT COUNT(1) FROM repayment 
where `Status` in(0,1) 
AND RepaymentDate < DATE_ADD(CURDATE(),INTERVAL 8 DAY);
```
修正内容
```
项目总数：COUNT(1)
应回款：`Status` in(0,1) 
7天内应回款：<8天或（第8天日期+%）2017-5-6%
逾期还款：今天之前该回款，但没回款的叫逾期，每天都会催他回款，7天内应回款也包括今天之前没还款的
```

- ==在保总额== :用户投资出去没有收回的本金 
- ==净值==＝在保本金（待收本金）＋待收利息＋余额

6：查询某用户的余额、在保总额和净值 

```
SELECT SUM(a.LeaveAmount) 余额,SUM(c.UnfinishedPrincipal) 在保金额,(SUM(c.UnfinishedPrincipal)+SUM(c.UnfinishedInterest)+SUM(a.LeaveAmount)) 净值 FROM member a,invest b,repayment c WHERE a.Id=b.MemberID AND b.Id=c.InvestId AND c.`Status` IN(0,1) AND a.Id=2; -- GROUP BY a.Id

```
订正

```
SELECT a.LeaveAmount 余额,SUM(c.UnfinishedPrincipal) 在保金额,(SUM(c.UnfinishedPrincipal)+SUM(c.UnfinishedInterest)+a.LeaveAmount) 净值 FROM member a,invest b,repayment c WHERE a.Id=b.MemberID AND b.Id=c.InvestId AND c.`Status` IN(0,1) AND a.Id=10; -- GROUP BY a.Id

```
修正内容
```
member表每个用户对应的余额LeaveAmount是唯一的
SUM(a.LeaveAmount) -> a.LeaveAmount
```
余额纠错：a.LeaveAmount,SUM(a.LeaveAmount)
```
-- a.LeaveAmount,SUM(a.LeaveAmount)余额纠错

SELECT *
FROM member a,invest b,repayment c 
WHERE a.Id=b.MemberID 
AND b.Id=c.InvestId 
AND c.`Status` IN(0,1) AND a.id=10;

-- 3条数据
-- LeaveAmount
-- 10000.00
-- 10000.00
-- 10000.00

SELECT a.LeaveAmount,SUM(a.LeaveAmount) -- 可能是因为不分组用SUM只展示1条（真实是3条数据），所以SUM出来是3倍的a.LeaveAmount
FROM member a,invest b,repayment c 
WHERE a.Id=b.MemberID 
AND b.Id=c.InvestId 
AND c.`Status` IN(0,1) AND a.id=10;

-- 10000.00	30000.00
```

7：查询所有投资用户的真实姓名、余额、在保总额和净值，按净值从大到小顺序排列 

```
SELECT a.RegName,SUM(a.LeaveAmount) 余额,SUM(c.UnfinishedPrincipal) 在保金额,(SUM(c.UnfinishedPrincipal)+SUM(c.UnfinishedInterest)+SUM(a.LeaveAmount)) 净值 FROM member a,invest b,repayment c WHERE a.Id=b.MemberID AND b.Id=c.InvestId AND c.`Status` IN(0,1) GROUP BY a.Id ORDER BY 净值 DESC;
```
订正

```
SELECT a.RegName,a.LeaveAmount 余额,SUM(c.UnfinishedPrincipal) 在保金额,
(SUM(c.UnfinishedPrincipal)+SUM(c.UnfinishedInterest)+a.LeaveAmount) 净值 
FROM member a,invest b,repayment c 
WHERE a.Id=b.MemberID 
AND b.Id=c.InvestId 
AND c.`Status` IN(0,1) 
GROUP BY a.Id 
ORDER BY 净值 DESC;
```
修正内容
```
member表每个用户对应的余额LeaveAmount是唯一的
SUM(a.LeaveAmount) -> a.LeaveAmount
```
改进

```
SELECT a.RegName,a.LeaveAmount 余额,SUM(c.UnfinishedPrincipal) 在保金额,
(SUM(c.UnfinishedPrincipal)+SUM(c.UnfinishedInterest)+a.LeaveAmount) 净值 
FROM member a 
LEFT JOIN invest b
ON a.Id=b.MemberID 
LEFT JOIN repayment c 
ON b.Id=c.InvestId
AND c.`Status` IN(0,1)
GROUP BY a.Id
ORDER BY 净值 DESC;
```
==注意==

```
AND c.`Status` IN(0,1)
与
WHERE c.`Status` IN(0,1)

AND：在连接的单个表中加条件
WHERE：对3个表加条件
```
写法二

```

SELECT  a.id,a.RegName,a.LeaveAmount 余额,SUM(c.UnfinishedPrincipal) 在保金额,
(SUM(c.UnfinishedPrincipal)+SUM(c.UnfinishedInterest)+a.LeaveAmount) 净值 
FROM member a 
LEFT JOIN invest b
ON a.Id=b.MemberID 
LEFT JOIN 
(
SELECT * FROM repayment WHERE `Status` IN(0,1)
) c
ON b.Id=c.InvestId
GROUP BY a.Id
ORDER BY 净值 DESC;
```
参考：[左连接查询关联n多张表](http://www.cnblogs.com/amyStart/p/5965472.html)

### 创建表
真的创建了表，不是临时表

```
CREATE TABLE <NEWTABLE>(SELECT * FROM <TABLE>);

CREATE TABLE <NEWTABLE> LIKE <TABLE>;
```
例
```
CREATE TABLE b (SELECT * FROM a); 
```
==列转行==要想到：==求并集==
```
union：去重，性能较低
union all：结果集不去重，性能较高
```

```
order by 张、李、王 
//不一定正确
根据ASC码排序 
```

### LEFT JOIN ON：左外连接

```
SELECT NULL+1;

结果
NULL+1 名称
(NULL) 内容
```
条件：==ON==
```
SELECT * FROM <TABLE1> a LEFT (OUTER) JOIN <TABLE2> b ON <条件> AND <条件> WHERE <条件>;
```
#### 多表查询
==注意：应该在ON条件里加多点限制，在where中的条件是全部3个表都遵循的条件==
```
SELECT * FROM <TABLE1> a LEFT (OUTER) JOIN <TABLE2> b ON <条件> AND <条件> LEFT (OUTER) JOIN <TABLE2> b ON <条件> AND <条件> WHERE <条件>;　　
```

1. 部署表

![image](http://upload-images.jianshu.io/upload_images/2897320-07c753c6727c3c70.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image](http://upload-images.jianshu.io/upload_images/2897320-9f951f252fd139fd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2. 左外连接

- a表 全展示
- b表 只展示 符合关联条件的

![image](http://upload-images.jianshu.io/upload_images/2897320-445563e8188ba5e3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3. 右外连接

![image](http://upload-images.jianshu.io/upload_images/2897320-6afbc6e0ad28bb26.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

4. WHERE条件独立

![JOINONWHERE.png](http://upload-images.jianshu.io/upload_images/2897320-626671e6f4049a96.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### INNER JOIN ON：内连接
```
SELECT * FROM <TABLE1> a INNER JOIN <TABLE2> b ON <条件>;
```

![INNERJOINON.png](http://upload-images.jianshu.io/upload_images/2897320-168838eb062ebec8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 拓展

```
-- 通过左连接，求a表和b相同的记录
SELECT * from a LEFT JOIN b ON a.a_name = b.b_name WHERE b.b_name IS NOT NULL;
```

![左连接ISNOTNULL求相同记录.png](http://upload-images.jianshu.io/upload_images/2897320-617d1830ee5dbb94.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

==求出b表中不包含在a表中记录==
- a.a_name ==IS NULL==
```
-- 有a，b表，求出b表中不包含在a表中记录
select b.* from a RIGHT JOIN b on a.a_name = b.b_name where a.a_name IS NULL;
```
![右连接ISNULL求不包含在a表中的记录.png](http://upload-images.jianshu.io/upload_images/2897320-e65c318cbadb6284.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 其它

每个表的每一条数据都一一对应的3种方法（条数 = a表 * b表）
- 笛卡尔积
- CROSS JOIN
- JOIN
- FULL JOIN
```
SELECT * FROM a,b; -- 笛卡尔积//3*5

SELECT * FROM a CROSS JOIN b; -- 交叉连接//3*5

SELECT * FROM a JOIN b; -- //3*5

SELECT * FROM a FULL JOIN b; -- //3*5
```

MySQL不支持全外连接：左外和右外求合集
```
-- SELECT * FROM a FULL JOIN b ON a.a_name=b.b_name; -- MySQL不支持全外连接
```
> 联合连接（UNION JOIN）

这是一种很少见的连接方式。Oracle、MySQL均不支持，其作用是：找出==全外连接和内连接之间差异的所有行==。这在数据分析中排错中比较常用。也可以利用数据库的集合操作来实现此功能。

> 数据库备份的一点知识
```
//
每天备份几次？
什么备份形式？

每天，全量备份：占存储空间
每隔半小时，增量备份，增删改
远程备份：原件部署在外地

//
主从同步
A 主
B C D从  
A增删改，从也改
BCD任一当（dang四声）掉的话，迅速连接到另一个服务器

//
sql有没有优化
有没有读写分离

读： select  相对较多，在一个性能较高的服务器读
写： insert  update delete 相对少，在另一个服务器

```




