
# JUnit单元测试

## 什么是JUnit

- JUnit是一个==Java语言的单元测试框架==

- 在Java程序中，==一个工作单元通常是指一个方法==

- 那么，单元测试也就是==对一个方法进行测试==

- 程序员一般通过JUnit来完成自己代码的一个功能测试，所以==单元测试又可以叫做程序员测试==。

- 如果测试人员在熟悉方法逻辑和实现的情况下，也可以写JUnit单元测试来==进行接口测试==，即白盒测试

## 搭建JUnit测试环境

- 创建一个maven project
- 在pom.xml里加入依赖JUnit


### 简单搭建

### 选中项目 -> Build Path -> Add Libraries... -> JUnit -> Next -> JUnit4 -> Finish

![JUnit 4.png](http://upload-images.jianshu.io/upload_images/2897320-4b8611e5dbf35e31.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 编写单元测试类

### 法一：写一个测试类继承TestCase类
### 注意：所有方法必须以==test开头==

```
package ...;

import junit.framework.TestCase;

public class JUnitTest1 extends TestCase {

	public void testFuncA() {
		System.out.println("方法名必须以test开头");
	}
	
	public void testFuncB() {
		System.out.println("testFuncB");
	}
}

结果集

方法名必须以test开头
testFuncB
```

![JUnitExtendsTestCase.png](http://upload-images.jianshu.io/upload_images/2897320-ee8f8a4b416df133.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 法二：利用注解来实现标记测试方法

### 常用注解：

- @BeforeClass：测试用例初始化时执行被@BeforeClass标注的地方，==只会执行一次，必须是静态方法==

- @AfterClass：当所有测试执行完毕之后，执行进行收尾工作，也就是执行被@AfterClass标注的地方，==只会执行一次，必须是静态方法==

- @Before：==每执行一个测试方法前==，都会先执行被标注了此注解的方法

- @After：==每执行一个测试方法后==，都会先执行被标注了此注解的方法

- @Test：表明==这是一个测试方法==

### 目的：==测试 @Test方法 是否正确==

### ==创建==单元测试类

### New Other -> 搜索JUnit Test Case -> Next -> 输入Name -> 选中setUpBeforeClass(),tearDownAfterClass(),setUp(),teatDown() -> Finish

```
package ...;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

public class JUnitTestCase {

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		System.out.println("@BeforeClass setUpBeforeClass()");
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		System.out.println("@AfterClass tearDownAfterClass()");
	}

	@Before
	public void setUp() throws Exception {
		System.out.println("@Before setUp()");
	}

	@After
	public void tearDown() throws Exception {
		System.out.println("@After tearDown()");
	}

	@Test
	public void testFuncA() {
		System.out.println("@Test testFuncA()");
	}
	
	@Test
	public void testFuncB() {
		System.out.println("@Test testFuncB()");
	}

}

结果集

@BeforeClass setUpBeforeClass()

@Before setUp()
@Test testFuncA()
@After tearDown()

@Before setUp()
@Test testFuncB()
@After tearDown()

@AfterClass tearDownAfterClass()
```

## 打包测试

### 将所有需要运行的测试类集中起来，一次性的运行完毕

- 打包测试需要使用一个特殊的Runner，通过==@RunWith==注解（标注）传递一个参数==Suite.class==

- ==@SuiteClasses==注解表明该类是一个打包测试类，把需要打包的类作为参数传递给该标注

- 类名随意定义，==内容全部为空即可==

```
package ...;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

//1.
@RunWith(Suite.class)

//2.
@SuiteClasses({
	JUnitTest1.class,
	JUnitTestCase.class
})

//0.创建类
public class SuiteTest {

}
```

## 断言

- assertEquals(a,b)：判断两个数据是否一致，如果一致则表示测试通过,否则表示不通过，抛出断言错误。
- assertNotEquals(a,b)：判断两个数据是否不一致，如果不一致则表示测试通过,否则表示不通过，抛出断言错误。

- assertNull(…)：断言某数据是否为空，如果为空，则测试通过，否则抛出来断言错误。
- assertNotNull(…)：断言某数据是否非空，如果非空，则表示测试通过，否则抛出来断言错误。

- assertFlase(…)：断言某布尔类型的数据是否为false，如果为false则表示测试通过，否则抛出来断言错误。
- assertTrue(…)：断言某布尔类型数据是否为true，如果为true则表示测试通过，否则抛出来断言错误。

```
assertTrue("Error提示", 1==2);
```

- fail("Not yet implemented");

## 断点调试

### 断点：双击

### 调试

- Debug Test

![DebugTest.png](http://upload-images.jianshu.io/upload_images/2897320-d06d1bf0b46b09fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 切换视图

![切换视图.png](http://upload-images.jianshu.io/upload_images/2897320-e5335fe5ebf012cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- ### Step Over：F6：跳过当前步骤，执行下一步
- ### Step Into：F5：跳进去里面
- ### Resume：F8：继续走到下一个断点


### 练习

```
通过面向对象编程思想，使用Java编写前程贷核心流程代码
```

Member.java

```
package com.company.day08;

public class Member {
	
	//成员变量，属性
	private int memberId;  
	
	private String regName;
	
	private String mobilePhone;
	
	private String password;
	
	private double leaveAmount;

	public int getMemberId() {
		return memberId;
	}

	public void setMemberId(int memberId) {
		this.memberId = memberId;
	}

	public String getRegName() {
		return regName;
	}

	public void setRegName(String regName) {
		this.regName = regName;
	}

	public String getMobilePhone() {
		return mobilePhone;
	}

	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {

		//1.通过公开方法访问数据，从方法里加入逻辑控制，避免不合理的访问
		//2.可进行数据检查，保证数据完整性
		//3.便于后期修改，提高代码的可维护性
		if (password.length() < 6 || password.length() > 16) {
			System.out.println("密码必须6-16位");
		}
		else {
			System.out.println("密码符合要求");
			this.password = password;
		}
	}

	public double getLeaveAmount() {
		return leaveAmount;
	}

	public void setLeaveAmount(double leaveAmount) {
		this.leaveAmount = leaveAmount;
	}

	public Member(int memberId, String regName, String mobilePhone, String password, double leaveAmount) {
		super();
		this.memberId = memberId;
		this.regName = regName;
		this.mobilePhone = mobilePhone;
		this.password = password;
		this.leaveAmount = leaveAmount;
	}
	
	public Member() {
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public String toString() {
		return "Member [memberId=" + memberId + ", regName=" + regName + ", mobilePhone=" + mobilePhone + ", password="
				+ password + ", leaveAmount=" + leaveAmount + "]";
	}

	public boolean login(String mobilePhone,String password) {

		if (mobilePhone == "15101234567" || password == "15101234567") {
			System.out.println("登录成功");
			return true;
		}
		
		System.out.println("登录失败");
		return false;
	}
	
	/**
	 * 充值的方法
	 * @param amount  充值金额
	 * @return 充值后的金额
	 */
	public double recharge(double amount){
		System.out.println("会员Member（父类）充值成功，充值金额：" + amount);
//		return leaveAmount + amount; // 错误，因为没有去修改余额值，仅仅是返回了一个double数字
//		leaveAmount = leaveAmount + amount;
		return leaveAmount += amount;
	}
	
	
	
	/**
	 * 提现
	 * @param amount 提现的金额
	 * @return
	 */
	public boolean withDraw(double amount) {
		
		if(this.leaveAmount < amount)
		{
			System.out.println("余额不足，不能提现");
			return false;
		}
		else{
			
			System.out.println("提现成功，欢迎再来投资");
			
			this.leaveAmount -= amount;
			return true;
		}
		
	}
	
}
```

项目类 Loan.java

```
package com.company.day08;

/**
 * 项目类
 * @author Administrator
 *
 */
public class Loan {
	
	private int id;
	private int memberId;
	private String title;
	private double amount;
	private float loanRate;//年利率，如：年化18.0%，存储18.0
	private int loanTerm;//借款期限 如：6个月存储6,30天存储30
	private int loanDateType;//借款期限类型 （按月：0，按天：2，按周：4）
	
	//Generate Getters and Setters...
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getMemberId() {
		return memberId;
	}
	public void setMemberId(int memberId) {
		this.memberId = memberId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public float getLoanRate() {
		return loanRate;
	}
	public void setLoanRate(float loanRate) {
		this.loanRate = loanRate;
	}
	public int getLoanTerm() {
		return loanTerm;
	}
	public void setLoanTerm(int loanTerm) {
		this.loanTerm = loanTerm;
	}
	public int getLoanDateType() {
		return loanDateType;
	}
	public void setLoanDateType(int loanDateType) {
		this.loanDateType = loanDateType;
	}
	public Loan(int id, int memberId, String title, double amount, float loanRate, int loanTerm, int loanDateType) {
		super();
		this.id = id;
		this.memberId = memberId;
		this.title = title;
		this.amount = amount;
		this.loanRate = loanRate;
		this.loanTerm = loanTerm;
		this.loanDateType = loanDateType;
	}
	
	public Loan() {
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public String toString() {
		return "Loan [id=" + id + ", memberId=" + memberId + ", title=" + title + ", amount=" + amount + ", loanRate="
				+ loanRate + ", loanTerm=" + loanTerm + ", loanDateType=" + loanDateType + "]";
	}

	
}

```

回款计划类 Repayment.java

```
package com.company.day08;

import java.util.Date;

/**
 * 回款计划类
 * @author Administrator
 *
 */
public class Repayment {

	private int id;
	private int investId;
	private Date createTime;
	private int terms;//还款期次
	private double unfinishedPrincipal;//未还本金
	private double unfinishedInterest;//未还利息
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getInvestId() {
		return investId;
	}
	public void setInvestId(int investId) {
		this.investId = investId;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public int getTerms() {
		return terms;
	}
	public void setTerms(int terms) {
		this.terms = terms;
	}
	public double getUnfinishedPrincipal() {
		return unfinishedPrincipal;
	}
	public void setUnfinishedPrincipal(double unfinishedPrincipal) {
		this.unfinishedPrincipal = unfinishedPrincipal;
	}
	public double getUnfinishedInterest() {
		return unfinishedInterest;
	}
	public void setUnfinishedInterest(double unfinishedInterest) {
		this.unfinishedInterest = unfinishedInterest;
	}
	
	@Override
	public String toString() {
		return "Repayment [id=" + id + ", investId=" + investId + ", createTime=" + createTime + ", terms=" + terms
				+ ", unfinishedPrincipal=" + unfinishedPrincipal + ", unfinishedInterest=" + unfinishedInterest + "]";
	}
	
	public Repayment(int id, int investId, Date createTime, int terms, double unfinishedPrincipal,
			double unfinishedInterest) {
		super();
		this.id = id;
		this.investId = investId;
		this.createTime = createTime;
		this.terms = terms;
		this.unfinishedPrincipal = unfinishedPrincipal;
		this.unfinishedInterest = unfinishedInterest;
	}
	
	public Repayment(int id, int investId, int terms, double unfinishedPrincipal,
			double unfinishedInterest) {
		super();
		this.id = id;
		this.investId = investId;
		this.createTime = new Date();
		this.terms = terms;
		this.unfinishedPrincipal = unfinishedPrincipal;
		this.unfinishedInterest = unfinishedInterest;
	}
	
	public Repayment() {
		// TODO Auto-generated constructor stub
	}
	
}

```

投资 Invest.java


```
package com.company.day08;

import java.util.ArrayList;
import java.util.Date;

public class Invest {

	private int id;
	private int memberId;
	private double amount;//投资金额
	private Date createTime;
	private boolean isValid;
	private Loan loan;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getMemberId() {
		return memberId;
	}
	public void setMemberId(int memberId) {
		this.memberId = memberId;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public boolean isValid() {
		return isValid;
	}
	public void setValid(boolean isValid) {
		this.isValid = isValid;
	}
	public Loan getLoan() {
		return loan;
	}
	public void setLoan(Loan loan) {
		this.loan = loan;
	}
	
	@Override
	public String toString() {
		return "Invest [id=" + id + ", memberId=" + memberId + ", amount=" + amount + ", createTime=" + createTime
				+ ", isValid=" + isValid + ", loan=" + loan + "]";
	}
	/**
	 * 生成回款计划
	 */
	public ArrayList<Repayment> generateRepaymentList(){
		
		//回款计划
		ArrayList<Repayment> repaymentList = new ArrayList<Repayment>();
		//项目类
		Loan loan  = this.getLoan();
		//获取标的期限//借款期限 如：6个月存储6,30天存储30
		int loanTerm = loan.getLoanTerm();
		//借款期限类型（按月：0，按天：2，按周：4）
		if (loan.getLoanDateType() == 2) {//按天
			
			//这是天标，只需要生成一条回款计划记录
			//terms：还款期次
			
			//利息
			//1年360天 ：金融行业360天为1年
			//一个月: 30天
			//利息=本金*年利率/时间
			//loanRate;//年利率，如：年化18.0%，存储18.0
			double interset = this.getAmount() * loan.getLoanRate() / 100 / 360 * loanTerm;
			
			//投资金额*年化利率/360天*标的期限
			Repayment repayment = new Repayment(1, this.getId(), 1, this.getAmount(), interset);
			
			//生成了回款计划记录，保存到数据库，坐等收利息
			repaymentList.add(repayment);
		}
		else if (loan.getLoanDateType() == 0) {
			
			//月标，需要生成1条或多条回款计划记录
			//按月付息、到期还本：最后一期才还本金，前面只还利息，每期的利息都相同
			
			//计算每一期（每月）的利息
			//this.getAmount():投资金额
			//this.getLoan():项目类
			//this.getLoan().getLoanRate():项目类的年利率，如：年化18.0%，存储18.0
			double interest = this.getAmount() * this.getLoan().getLoanRate() /100 /12;
			
			for(int i = 1;i<=loanTerm;i++)
			{
				double unfinishedPrincipal = 0;
				
				if (i == loanTerm) {//最后一期
					
					unfinishedPrincipal = this.getAmount();
				}
				
				Repayment repayment = new Repayment(i, this.getId(), i, unfinishedPrincipal, interest);
				
				//添加到repaymentList
				repaymentList.add(repayment);
			}
		}
		
		return repaymentList;
		
	}
	
	public Invest(int id, int memberId, double amount, boolean isValid, Loan loan) {
		super();
		this.id = id;
		this.memberId = memberId;
		this.amount = amount;
		this.createTime = new Date();
		this.isValid = isValid;
		this.loan = loan;
	}
	
	public Invest() {
		// TODO Auto-generated constructor stub
	}

}

```

投资人 Investor.java

```
package com.company.day08;

public class Investor extends Member{


	/* 重写父类充值方法
	 * @param amount 充值金额
	 * @return 充值后的金额
	 */
	public double recharge(double amount) {
		
		System.out.println("Investor充值成功，充值金额：" + amount);
		
		this.setLeaveAmount(this.getLeaveAmount() + amount);
		
		return this.getLeaveAmount();
	}
	
	/**
	 * 用户竞标，用户投资，只有投资人才有的行为
	 * @param loan 投资的标
	 * @param amount 投资金额
	 */
	public Invest bidLoan(Loan loan,double amount) {
		
		//判断金额是否足够
		if (this.getLeaveAmount() < amount) {
			System.out.println("余额不足，请充值后再投标");
			return null;
		}
		else{
			
			this.setLeaveAmount(this.getLeaveAmount() - amount);
			System.out.println("投资成功！");
			
			//投资成功后，会生成一条投资记录，保存到数据库
			Invest invest = new Invest(1, this.getMemberId(), amount, true, loan);
			
			//返回这条投资记录
			return invest;
		}
	}
	
}

```

借款人 Borrower.java

```
package com.company.day08;


/**
 * @author Administrator
 *
 */
public class Borrower extends Member {
	
	//借款人所在的地区
	private String position;

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}
	
	/**
	 * 复写父类充值的方法
	 * 
	 * @param amount  充值金额
	 * @return 充值后的金额
	 */
	public double recharge(double amount){
		
		System.out.println("会员（子类）充值成功，充值金额：" + amount);
		
//		return leaveAmount + amount; // 错误，因为没有去修改余额值，仅仅是返回了一个double数字
//		leaveAmount = leaveAmount + amount;
		
		this.setLeaveAmount(this.getLeaveAmount() + amount);
		
		return this.getLeaveAmount();
	}
	
}

```

前程贷，发标、投标、生成回款计划

```
package com.company.day08;

import java.util.ArrayList;

public class QianChengDai {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		//1.
		Investor investor = new Investor();
		investor.setMemberId(1);
		
		//2.充值
		double leaveAmount = investor.recharge(100000.0);
		
		//3.发标
		//loanRate;//年利率,如年化18.0%，存储为18.0
		//loanTerm;//借款期限 如6个月为6，30天为30
		//loanDateType;//借款期限类型 借款期限单位  0-按月 2-按天 4-按周
		Loan loan = new Loan(1, 1, "短期资金周转", 200000.0, 12.0f, 20, 2);
		
		//投标
		Invest invest = investor.bidLoan(loan, 50000.0);
		System.out.println(invest);

		//生成回款计划
		ArrayList<Repayment> repaymentList = invest.generateRepaymentList();
		for (Repayment repayment : repaymentList) {
			System.out.println(repayment);
		}
	}
	
}

```

JUnit测试回款计划记录

```
package com.company.day08.testJUnit;

import static org.junit.Assert.*;

import java.util.ArrayList;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import com.company.day08.Invest;
import com.company.day08.Investor;
import com.company.day08.Loan;
import com.company.day08.Repayment;

public class RepaymentTest {
	
	//1.实例化
	private static Investor investor = new Investor();
	//3.发标//12.0f:float//按天 借款期限20天 年化年利率12.0%//投资金额200000.0
	private static Loan loan = new Loan(1, 1, "短期资金周转", 200000.0, 12.0f, 20, 2);
	private static Invest invest = new Invest();
	private static ArrayList<Repayment> repaymentList = new ArrayList<Repayment>();

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		
		investor.setMemberId(1);
		
		//2.充值
		double leaveAmount = investor.recharge(100000.0);
		
		//4.投标
		invest = investor.bidLoan(loan, 50000.0);
		System.out.println(invest);
		
		//5.生成回款计划记录，保存到数据库
		repaymentList = invest.generateRepaymentList();
		for (Repayment repayment : repaymentList) {
			System.out.println(repayment);
		}
		
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
	}

	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void test() {
		assertFalse("余额为50000.0", investor.getLeaveAmount() == 50000.0);
		assertTrue("回款记录有1条数据", repaymentList.size() == 1);
	}

}

```







