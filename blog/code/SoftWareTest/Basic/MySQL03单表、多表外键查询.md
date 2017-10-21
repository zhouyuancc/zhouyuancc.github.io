

运行SQL文件：右击数据库

### 单表查询

```
SELECT * FROM <表名> WHERE <条件>;//*性能较低

SELECT <列名A>,<列名B> FROM <表名> WHERE <条件> ORDER BY <列名A> DESC;//DESC 倒序 //ASC 升序(默认)
```

> ORDER BY ==A==,B DESC //先按A列==升序==，再按B降序 

### 多表查询

不同类型数据放1个表里的缺点：
1. 字段过多
2. 难以维护
3. 表数据庞大
4. 数据冗余，重复数据多


> ### ==笛卡尔积==：没有关联条件

- member：42条数据
- loan：9条数据
- 笛卡尔积：378条 = 42 * 9 交叉连接

```
SELECT * FROM member,loan;
//第一个表第一条 对应 第二个表每一条
//两个表中每一条都有1条对应的
```

> ### 外键关联

```
//1.
SELECT * FROM member,loan WHERE member.Id = loan.MemberId;

//2.<表名> as 别名
SELECT * FROM member t1,loan t2 WHERE t1.Id = t2.MemberId;

//3.写出 别名.列名
SELECT t1.RegName,t1.MobilePhone,t2.Title,t2.Amount 
FROM member t1,loan t2 
where t1.Id = t2.MemberID;
```
外键FOREIGN KEY
- 级联更新
- 级联删除
- 保证数据的一致性

### 练习

1:查询所有普通用户信息，按注册时间降序排列 
```
SELECT * FROM member ORDER BY RegTime DESC;
```
订正

```
SELECT * FROM member where Type =1 ORDER BY RegTime DESC;
```
修正内容

```
普通用户：Type=1 
```

2:查询某用户发布的已满标的借款项目信息，按满标时间升序排列 
```
SELECT * FROM loan WHERE FullTime != '0000-00-00 00:00:00' AND MemberID = 1 ORDER BY FullTime;
```
写法二
```
SELECT * FROM loan WHERE FullTime>'' AND MemberID = 1 ORDER BY FullTime;
```
补充知识：==FullTime>''== 判断时间不为空
```
FullTime != '0000-00-00 00:00:00'
同
FullTime>'' 判断时间不为空
```

3:查询某项目所有投资信息（投资用户Id，用户名、手机号码、投资日期、投资金额、用户可用余额） 

```
SELECT b.Id,b.RegName,b.MobilePhone,a.CreateTime,a.Amount,b.LeaveAmount FROM invest a,member b where a.MemberID = b.Id AND a.LoanId = 2;
```
写法二
```
SELECT t2.Id,t3.RegName,t3.MobilePhone,t2.CreateTime,t2.Amount,t3.LeaveAmount
FROM loan t1,invest t2,member t3
WHERE t1.Id = t2.LoanId
AND t2.MemberID = t3.Id
AND t1.Id=2;
```

4:查询某个普通用户（如Id为1的用户）的所有投资记录（投资时间、投资金额），以及各投资记录对应的项目信息（项目标题、年化收益）

```
SELECT a.MemberID,a.CreateTime,a.Amount,b.Title,b.LoanRate FROM invest a,loan b where a.LoanId = b.Id AND a.MemberID=2;
```
5:查询某个用户某次投资成功后，对应该笔投资的所有回款计划信息（回款期次、待还本金、待还利息、回款日期、回款状态），按回款期次升序排列

```
SELECT Terms,UnfinishedPrincipal,UnfinishedInterest,RepaymentDate,Status FROM repayment WHERE InvestId=1452 ORDER BY Terms;
```
6:查询某个用户所有的未回款的回款计划列表，按回款时间升序排列 

```
SELECT a.* FROM repayment a,invest b WHERE  a.InvestId=b.Id AND a.`Status`=0 ORDER BY a.RepaymentDate;
```
订正

```
SELECT a.* FROM repayment a,invest b WHERE  a.InvestId=b.Id AND a.`Status` IN(0,1) AND b.MemberID=2 ORDER BY a.RepaymentDate;
```
修正内容
```
未回款：`Status` IN(0,1)
status 1：本金和利息回款了一部分
```

7:查询某个用户（如Id为1）所有流水记录，按创建时间倒序排列

```
SELECT * FROM financelog WHERE PayMemberId=2 OR IncomeMemberId=2 ORDER BY CreateTime DESC;
```

订正
```
-- Id排序比CreateTime排序效率高
SELECT * FROM financelog WHERE PayMemberId=2 OR IncomeMemberId=2 ORDER BY Id DESC;
```
修改内容

```
ORDER BY CreateTime -> ORDER BY Id
```


补充知识：==创建时间都相同==时，Id排序比CreateTime排序效率高，准确
```
创建时间CreateTime都相同时，排序不准确，用ORDER BY Id desc;
Id排序比CreateTime排序效率高
```
