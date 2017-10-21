- 自增：
    - AUTO_INCREMENT
- ==清空==表：
    - ==TRUNCAT== TABLE member; 
    - ==自增id恢复，从1开始==
- 默认：
    - ==DEFAULT== CURRENT_TIMESTAMP//创建时间字段，默认为当前时间 
- ==当前时间==：
    - CURRENT_TIMESTAMP()//如：UPDATE时==获取==时间//存到DATETIME里时，超出DATETIME范围容易出错
    - sysdate()
- 默认金额：
    - DEFAULT 0.00 
- 注释：
    - COMMENT '注册时间'

```
CREATE TABLE member(

    Id INT(11) NOT NULL AUTO_INCREMENT,
    RegTime datetime DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
    PRIMARY KEY(Id)

)DEFAULT CHARSET=utf8;

//Id INT(11) NOT NULL AUTO_INCREMENT
```

### INSERT
1. 完整字段插入1行
```
INSERT INTO <表名> VALUES (值A,值B,值C,...,值F);
```
2. 部分字段插入1行
```
INSERT INTO <表名> (列名A,列名B,列名C) VALUES (值A,值B,值C);
```
3. 插入多行
```
INSERT INTO <表名>
VALUES 
(值A,值B,值C,...,值F),
(值A,值B,值C,...,值F),
(值A,值B,值C,...,值F);

INSERT INTO <表名> (列名A,列名B,列名C)
VALUES 
(值A,值B,值C,
(值A,值B,值C),
(值A,值B,值C);
```
### DELETE：删除 内容
```
DELETE FROM <表名> WHERE <条件>;//不改变自增长id的初始值
```
### DROP：删除 表、数据库 等

```
DROP DATABASE <数据库名>;//删除数据库
DROP EVENT
DROP FUNCTION
DROP FUNCTION UDF
DROP INDEX
DROP PROCEDURE
DROP SERVER
DROP TABLE <表名>;//删除表
DROP TABLESPACE
DROP TRIGGER
DROP USER
DROP VIEW
```
```
DROP DATABASE <数据库名>;//删除数据库
DROP DATABASE future;

DROP TABLE <表名>;//删除表
DROP TABLE member;
```
### UPDATE
注意：
- UPDATE SET ,, | SET后用==逗号,隔开==
```
UPDATE <表名> SET <列名A>=<值A>,<列名B>=<值B>,<列名C>=<值C> WHERE <条件> ORDER BY <列名A>,<列名B>;
```
```
WHERE id in(1,4);
WHERE id = 1 or id = 4;

UPDATE member SET RegTime = CURRENT_TIMESTAMP() where id in(1,4);
```
### 练习
1：新增用户表(member)数据
```
INSERT INTO Member VALUES
(1,'Jack','123456',13500000001,'1',10000.00,'2017-01-01 13:07:08'),
(2,'Tom','123456',13500000002,'1',10000.00,'2017-01-01 13:07:08'),
(3,'Rose','123456',13500000003,'1',10000.00,'2017-01-01 13:07:08');
```
2.使用insert语句往对应的表里插入对应的数据

使用insert语句在项目表（loan）中新增两条数据

 要求：    
 -	根据 loan 表结构插入正确格式数据，年化收益不超过24%   
 -	项目（标）所属人是 member 表中用户    
-	新增一个借款期限为30天，竞标时间为5天，一次性还款的项目（标）  
  -	新增一个借款期限为6个月，竞标时间为5天，每月付息到期还本的项目（标）
```
INSERT INTO Loan values
(1,1,'test1',100000.00,23.0,30,2,5,CURRENT_TIMESTAMP(),CURRENT_TIMESTAMP(),NULL,1),
(2,2,'test2',100000.00,23.0,6,0,5,CURRENT_TIMESTAMP(),CURRENT_TIMESTAMP(),NULL,1);
```
![image](http://upload-images.jianshu.io/upload_images/2897320-0ba0f8008a966a5e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3：使用SQL更新会员表id为1的会员可用余额为20000.00元 
```
UPDATE Member SET LeaveAmount=20000.00 where id=1;
```

4： 使用SQL更新6个月借款期限的项目（题目二中的）竞标天数为10天 
```
UPDATE Loan SET BiddingDays=10 WHERE LoanTerm=6 and LoanDateType=0;
```

5： 使用SQL更新6个月借款期限的项目（题目二中的）状态为竞标中状态 
```
UPDATE Loan SET Status=4 WHERE LoanTerm=6 and LoanDateType=0;
```
![image](http://upload-images.jianshu.io/upload_images/2897320-f8e96dbd7afe6951.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

6：使用SQL删除所有用户的投资记录
```
DELETE FROM Financelog;
```

7： 使用SQL删除会员表id为3的会员信息
```
DELETE FROM Member WHERE id=3;
```






