
年利息率<= 24%, 高于24%算高利贷

格式-美化SQL

关键字``：表示是列名

P2P核心业务流程 
![image](http://upload-images.jianshu.io/upload_images/2897320-5914b56f135612f9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

P2P流程操作（一些公司满标直接回款，无需5、6）
![image](http://upload-images.jianshu.io/upload_images/2897320-98f1962907c6098b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1. 查询MemberID

```
SELECT * FROM member WHERE MobilePhone=15101234567;
```

2. 加标
```
-- 加标
SELECT * FROM loan WHERE MemberID=1898 ORDER BY Id DESC;
```
![image](http://upload-images.jianshu.io/upload_images/2897320-f50a541c2fd3ff1a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image](http://upload-images.jianshu.io/upload_images/2897320-14a1f9dbcb82ce30.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image](http://upload-images.jianshu.io/upload_images/2897320-db800ef7d0af54de.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
Status
1 
```

3. 审核
- 初审中
```
-- 审核（初审）
SELECT Id,MemberID,Title,`Status` FROM loan WHERE Id = 1529;
```
![image](http://upload-images.jianshu.io/upload_images/2897320-c2eb55c24b1e16ab.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
Status
2 
```
- 初审通过，复审中

```
Status
3 
```
- 复审通过，竞标中

```
Status
4 
```
4. 借款项目发布，竞标中，用户开始投标
![image](http://upload-images.jianshu.io/upload_images/2897320-a243884a838fe30b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

发现bug：个人借贷页面只能按创建日期展示5条竞标记录

```
-- 更新创建时间和借款金额
UPDATE loan SET CreateTime = '2017-04-26 10:59:01' WHERE Id=1529;
UPDATE loan SET Amount = 5000 WHERE Id = 1529;
```


5. 满标，核保审批中

```
Status
5
```
- 查询所有投资人的记录
```
-- 查询所有投资人的记录
SELECT b.RegName,a.* FROM invest a,member b WHERE a.MemberID=b.Id AND LoanId = 1529;
```
![image](http://upload-images.jianshu.io/upload_images/2897320-4e4419fb19574cfa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

6. 核保审批完毕，还款中，生成回款计划
```
Status
7
```
7. 查询回款计划
- 4条投标记录 * 6个月 = 24条回款记录

```
-- 查询回款计划
SELECT * FROM repayment WHERE LoanId = 1529;
select * from repayment where InvestId = 236864;
```

```
共24条
```
![image](http://upload-images.jianshu.io/upload_images/2897320-8a3d2978a2c2eda5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image](http://upload-images.jianshu.io/upload_images/2897320-7b89981da12bba51.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

发现bug：未在网页找到满标的项目展示

8. 回款

---
- 事件-定时任务 
```
//计划左边的定义模块中
//事件
BEGIN
    call proc_planningRepayment();
END
```
- 每天定时执行存储过程
- 从2015-3-26开始，每天00:03:00执行

![image](http://upload-images.jianshu.io/upload_images/2897320-db8e889d6bf80936.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- proc_planningRepayment
![image](http://upload-images.jianshu.io/upload_images/2897320-fb9210cff4dbc1af.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

---

- 定时任务每天00.03去查询当天之前的所有未还款的回款计划列表，然后依次进行回款
- 修改回款日期

```
select Id,UnfinishedPrincipal,UnfinishedInterest,`Status`,repaymentDate  from repayment where InvestId = 236864 AND Terms=1;
-- 2017-05-26 13:43:26
-- 把第一期回款时间，从下月改到昨天
UPDATE repayment SET RepaymentDate = DATE_SUB(CURDATE(),INTERVAL 1 DAY) WHERE Id = 112818;
-- 2017-04-25 00:00:00
```
- 手动执行存储过程proc_PlanningRepayment，进行回款
```
打开函数-存储过程-运行
打开函数-存储过程-右击-运行函数
```
查询回款记录

![image](http://upload-images.jianshu.io/upload_images/2897320-7125f344e9b1f2de.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image](http://upload-images.jianshu.io/upload_images/2897320-937a76dffa0c9f94.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

全部回款完毕

```
-- 把所有回款时间，改到昨天
UPDATE repayment SET RepaymentDate = DATE_SUB(CURDATE(),INTERVAL 1 DAY) WHERE InvestId = 236864;
```

![image](http://upload-images.jianshu.io/upload_images/2897320-50edf7347ec8b84e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image](http://upload-images.jianshu.io/upload_images/2897320-9f053e1d98e6c143.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

9. 查看借款人和投资人的流水

```
-- 查看流水
-- 借款人：1898 小蜜蜂
-- 投资人：2380 实战回款测试账号
-- 投资,出账
select * from financelog where PayMemberId=1898 ORDER BY id desc;
-- 进账
select * from financelog where IncomeMemberId=1898 ORDER BY id desc;
-- 投资,出账
select * from financelog where PayMemberId=2380 ORDER BY id desc;
-- 进账
select * from financelog where IncomeMemberId=2380 ORDER BY id desc;
```

### 练习

```
新建项目，测试其状态从发标到还款结束，写出所有过程和相关SQL，注意以下几点 
1：标状态是否正确 
2：投资记录是否正确 
3：生成的回款计划是否正确 
4：每期回款是否正确 
5：借款人和投资人的流水是否正确
```
 