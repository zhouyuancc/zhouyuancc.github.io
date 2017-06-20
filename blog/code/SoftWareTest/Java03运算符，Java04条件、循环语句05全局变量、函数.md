- 引用类型：开辟==栈内存==
- 使用new：开辟==堆内存==

## 运算符

### 一、算术运算符

- +-*/：二目运算符
- %：求模/余数：二目运算符
- ++：自增：一目运算符
- --：自减：一目运算符

```
i++：先使用变量，再+1
++i：先加1，再使用变量
i--：先使用变量，再减1
--i：先减1，再使用变量
```
```
int aInt = 10;

//aInt++、aInt--，先使用这个操作数，再+1，或者-1

System.out.println(aInt++);
System.out.println(aInt);
System.out.println(aInt--);
System.out.println(aInt);
		
结果集

10
11
11
10
```
```
int aInt = 10;

//aInt++、aInt--，先+1，-1,再使用这个操作数	

System.out.println(++aInt);
System.out.println(aInt);
System.out.println(--aInt);
System.out.println(aInt);

结果集

11
11
10
10
```

### 二、比较运算符

- 数值比较
```
int aInt = 10;
int bInt = 20;
		
System.out.println(aInt == bInt);
System.out.println(aInt != bInt);
System.out.println(aInt > bInt);
System.out.println(aInt < bInt);
System.out.println(aInt >= bInt);
System.out.println(aInt <= bInt);

结果集

false
true
false
true
false
true
```
- 字符串比较

    - String str3 = ==new String==("ssdf");
    - ==new String==比较（==）的是内存地址，false

```
String str1 = "hello";
String str2 = "hello";
System.out.println(str1 == str2);//true
		

//String str3 = new String("ssdf");
//new会去开辟堆内存
//比较字符串时，new比较的是内存地址，门牌号不同，内容一样，但不相等

String str3 = new String("hello");
String str4 = new String("hello");
System.out.println(str1 == str3);//false：比较的只是栈内存的引用
System.out.println(str3 == str4);//false

结果集

true
false
false
```

### 三、逻辑运算符

逻辑运算符：运用在boolean类型的数据之间的运算

- &：逻辑与：两边都为true时，才为真

- &&：短路与：==两边都为true时，才为真==：第一个参数为false，后面参数不走

- |：逻辑或：只要有一个true，返回true

- ||：短路或：==只要有一个true，返回true==：第一个参数为true，后面参数不走

- !：非

```
System.out.println(true && true);
System.out.println(true && false);
System.out.println(false && false);//后面Dead code
System.out.println(false && true);//后面Dead code

结果集

true
false
false
false
```

```
System.out.println(true || true);//后面Dead code
System.out.println(true || false);//后面Dead code
System.out.println(false || false);
System.out.println(false || true);

结果集

true
true
false
true
```

```
System.out.println(1|0);
System.out.println(1&0);
		
结果集

1
0
```

### 四、赋值运算符

- a *= b; 性能比 a = a * b;高

```
int aInt = 10;
		
aInt += 10; // aInt = aInt + 10;
System.out.println(aInt);

aInt -= 10; // aInt = aInt - 10;
System.out.println(aInt);

aInt *= 10; // aInt = aInt * 10;
System.out.println(aInt);

aInt /= 10; // aInt = aInt / 10;
System.out.println(aInt);

aInt %= 3; // aInt = aInt % 10;
System.out.println(aInt);

结果集

20
10
100
10
1
```

### 五、其它运算符

- 三目运算符

```
//语法： 
//逻辑表达式E ? E为==true==的值 : E为==false==的值

//第一个操作数 ? 第二个操作数 ： 第三个操作数

// String str = 用户和密码正确 ? 登录成功 ：登录失败 ;
String name = "tom";
String pwd = "123456";
String string = (name == "tom" && pwd == "123456") ? "登录成功" : "用户名或密码错误";
System.out.println(string);

结果集

登录成功
```

### 六、运算顺序

1. ==++,--==
2. 括号
3. *，/，==%==（从左至右）
4. +,-（从左至右）

### 练习

```
//		int x = 1;int y = 2;int z = 3;
//		求：x/y  
//		求：y/x         
//		求：x%y
//		求：y%x
//		求：(++x)+y
//		求：x+(y++)
//		求：x+(--z)


int x = 1;
int y = 2;
int z = 3;
		
System.out.println(x/y);//0
System.out.println(y/x);//2
System.out.println(x%y);//1
System.out.println(y%x);//0
System.out.println((++x)+y);//4//修正：x=2
System.out.println(x+(y++));//3//修正：2+2=4//y=3
System.out.println(x+(--z));//3//修正：2+2=4

结果集

0
2
1
0
4
4
4
```

## 条件控制语句、循环语句

### 一、条件控制语句
### 1、if语句
```
if(...)
{
    
}
else if(...)
{
    
}
else
{
    
}
```

```
int loanStatus = 8; // 表的状态
if (loanStatus == 1) {
	System.out.println("新建项目成功，请进行初审");
} else if (loanStatus == 2) {
	System.out.println("初审通过");
} else if (loanStatus == 3) {
	System.out.println("复审通过");
} else if (loanStatus == 4) {
	System.out.println("竞标中");
}else{
	System.out.println("其它的状态");
}
```

### 2、switch语句

- case的可用参数类型
    - char
    - byte
    - short
    - int
    - String
    - enum

```
switch(变量){
    case A:
        //
        break;
    case B:
        //
        break;
    default:
        //
        break;
}

case穿透：case A去掉break

变量为A时，case A的操作执行后，执行case B 中的操作，直到break

switch(变量){
    case A:
        //
        //break;
    case B:
        //
        break;
    default:
        //
        break;
}
```
例
```
int loanStatus = 1; // 表的状态

switch (loanStatus) {
	case 1:
		System.out.println("1：新建项目成功");
		break;
	case 2:
		System.out.println("2：初审通过");
		break;
	case 3:
		System.out.println("3：复审通过");
		break;
	case 4:
		System.out.println("4：竞标中");
		break;
	default:
		System.out.println("5：其他状态");
		break;
}
```

### 二、循环语句

- 初始化语句： 初始化工作，在循环开始前执行
- 循环条件：布尔表达式，决定是否执行循环体
- 循环体：循环条件为真时执行的代码块
- 迭代语句：每次循环结束后，控制循环条件的变量，在合适的时候把循环条件设置为假，保证循环可以结束，从而避免死循环

### 1、while循环

```
while(条件)
{
    ///TODO
}
```

```
do{
    ///TODO
}while(条件)
```

- while：先判断条件，再执行//TODO
- do...while：先执行//TODO，再判断条件

例

- while：判断次数 = 循环次数 + 1
```

// while：判断次数 = 循环次数 + 1

int aInt = 1; // 1：初始化语句

while(aInt <= 5){ //2：循环条件

	// 3：循环体
	System.out.println("执行循环体："+aInt); 
	aInt++; //4:迭代语句
}

结果集

执行循环体：1
执行循环体：2
执行循环体：3
执行循环体：4
执行循环体：5
```
- do...while 判断次数 = 循环次数
```

// do...while 判断次数 = 循环次数

int bInt = 1; // 1:初始化语句 
int bSum = 0; 

do { //2:循环体
	
	System.out.println("执行循环体 " + bInt);
	bSum += bInt;
	bInt++; // 3：迭代语句 
}while (bInt <= 5); // 4：循环条件 

System.out.println(bSum);

结果集

执行循环体 1
执行循环体 2
执行循环体 3
执行循环体 4
执行循环体 5
15
```

### 2、for

- for

```
/**
 * for循环 
 * 
 * 1：初始化语句：int i=1 
 * 2：条件控制：i<=10 
 * 3：迭代语句：i++
 * 4：循环体：System.out.println(i);
 * 
 * 判断次数 = 循环次数 + 1
 */
for (int i = 1; i <= 5; i++) 
{ 
	System.out.println(i); 
}

结果集

1
2
3
4
5
```
例

```
int array[] = { 1, 2, 3, 4, 5};

for (int i = 0; i < array.length; i++) {
	System.out.println(array[i]);
}

结果集

1
2
3
4
5
```

- foreach
    - for(数据类型 变量 : 数组){ }

```
/**
 * foreach
 * 
 */
for(数据类型 变量 : 数组) {
    //TODO
}
```
例

```
int array[] = { 1, 2, 3, 4, 5};
for (int i : array) {
	System.out.println(i);
}

结果

1
2
3
4
5
```

### 练习

1：打印如下三角形。（提示：使用多重for循环)

```
*
**
***
****
*****
```

```
for(int i = 0;i < 5;i++)
{
	for(int y = 0;y < i + 1;y++)
	{
		System.out.print("*");
	}
	
	System.out.println("");
}
```

2:求1~10,1~100的和

```
int sum = 0;
for (int i = 1; i <= 10; i++) {
	
	sum += i;
	//System.out.println(i);
	//System.out.println(sum);
}
System.out.println(sum);

结果集

55
```

```
int sum = 0;
for (int i = 1; i <= 100; i++) {
	
	sum += i;
}
System.out.println(sum);

结果集

5050
```

## 全局（成员）变量、局部变量、函数

### 一、局部变量

局部变量：一个方法内定义的变量，根据定义形式不同，分为三种
```
1、方法内：定义在方法体内，作用域为定义变量处到方法结束，必须初始化

2、代码块：定义在代码块中的变量，作用域为定义变量处到方法结束，必须初始化

3、形式参数：定义方法是定义的变量，作用域为整个方法内，无须显示初始化，形参的初始化是在调用该方法时由系统完成，系统会将实参值付给形参
```
例

```
public static void main(String[] args) {

	/**
	 * 局部变量
	 * 方法消亡，变量就消亡
	 */
	//1：方法内的
//	System.out.println(aInt);  //错误
	int aInt = 10;  //定义处到方法结尾
//	int aInt = 20;  //变量不能重名
	System.out.println(aInt);
	
	//2：代码块内的
	{
		int bInt = 20;
		System.out.println(bInt);
	}
//	System.out.println(bInt);  //错误的
	
	//3：形参 //2,3实参 //(int a,int b)形式参数
	int sum = sumAB(2,3);
	System.out.println(sum);
}

//写一个方法（函数），传入两个参数，返回两个数据的和
//(int a,int b)形式参数
public static int sumAB(int a,int b) {
	return a + b;
}
```

### 二、全局（成员）变量

全局变量（成员变量/类属性）：在类范围内定义的变量

特点：
- 有修饰符（private、默认default、protected、public）
- ==在函数外部定义==（在Class里，不在public static void main(String[] args){}等方法里定义）
- 作用域为整个类，只有类消亡的时候，这个变量才会消亡


可访问位置 | private | default | protected | public
---|---|---|---|---
定义的类中 | √ |  √ |  √ |  √
同一个包中 |   |  √ |  √ |  √
子类中     |   |    |  √ |  √
其它包中   |   |    |    |  √


例

```
package com.company.day04;

public class QuanJuVariable {

	/**
	 * 全局变量、成员变量、类属性
	 */
	public static String globalVariable;
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
	}
}

//同一个包中的Class
package com.company.day04;

public class Loop {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		System.out.println(QuanJuVariable.globalVariable); 
	}
}

结果集

null
```

### 三、函数

函数：也称为方法，是一段可重复调用的代码段

分类：
- 构造方法
- 普通方法：静态方法、实例（类）方法

### 1、普通方法

```
修饰符 函数返回值类型 函数名[第一个字母小写](参数类型 参数名,参数类型 参数名)
{
	函数体
}
```

例

```
package com.company.day04;

public class QuanJuVariable {
	
	public static void main(String[] args) {

		thisPrint();
		QuanJuVariable.thisPrint();
		
		//static静态方法中无this对象
		//this.thisPrint();//错误
	}
	
	public static void thisPrint() {
		System.out.println("调用类方法");
	}
}

结果集

调用类方法
调用类方法
```

### 补充：
- ==精度高==的类型可以接收==精度低==的类型，如：double可以等于int（int可以直接转成double）
- static：类方法、静态方法

### 2、构造方法

```
//无main(String[] args)的类
public class Member {
	
	//成员变量
	public int memberId;
	
	public String regName;
	
	public String mobilePhone;
	
	public void sayHello(){
		System.out.println("Hello");
	}
}


//调用对象
public static void main(String[] args) {

	Member m = new Member(); // 实例，instance，对象
	erving.memberId = 1;
	System.out.println(erving.memberId);
	erving.sayHello();
}

结果集

1
Hello
```
