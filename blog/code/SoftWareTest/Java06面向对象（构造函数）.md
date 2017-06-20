
Linux一切皆为文件

## 面相对象

在Java中，一切事物皆可看作对象。

如：人，自行车，电脑，港币，汽车etc.

每个人对象都有：姓名，年龄等属性，以及吃饭，学习等行为函数。

- 类：共性事物的抽象，是对某一类具体共性事物的描述，是概念上的定义
- ==对象==：对象是共性事物的一个体现，是这类事物的每个个体，也叫做类的==实例（instance）==
- 总结：==类是对象的模板，对象是类的实例==

例：

类 | 对象
---|---
人 | 小明
自行车 | mobike

## 对象的性质

- 对象：数据和相关的方法（函数、行为）的集合，对象是一个类事物中的一个实例
- 数据是对象的状态（属性），方法是对象的行为
- 特点：面向对象概念构成了Java的核心，面向对象具有==封装、继承、多态==三大特性

## 类与对象的定义

### 一、类的组成：属性、方法

```
//类是具有共性属性或行为的抽象
class 类名{
    
    数据类型 属性;//声明成员变量（属性）
    ...
    public 返回值数据类型 方法名称(参数1,参数2...){//方法（函数）
        //TODO
        return 返回值类型;
    }
}
```

```
public class Member {

	//成员变量（属性）
	public int memberId;
	public String regName;
	public String mobilePhone;
	public String password;

	//方法（函数、行为）
	public boolean login(String mobilePhone, String password) {
		
		//TODO
		return true;
	}
}
```

### 二、对象的创建与使用

方法一

```
类名 对象名 = null;//声明对象
对象名 = new 类名();//实例化对象，对象必须要实例化才能直接使用
```

例

```
//分步声明和实例化
//1.
Member m = null;//声明对象
System.out.println(m);//null
//错误：//System.out.println(m.memberId);//java.lang.NullPointerException空指针,必须new以后才可调用成员变量和方法
//2.
m = new Member();//实例化对象，对象必须实例化才能正常使用
```

方法二

```
类名 对象名 = new 类名();
```

例

```
//声明和实例化一步到位
//1.
Member m = new Member();//声明并实例化对象
//无参构造函数
System.out.println(m.memberId);
//0
System.out.println(m.mobilePhone);
//null
```

有了对象，就可以调用定义的一系列操作了


## 访问类中的属性和方法

- 访问属性
    - 对象名.属性名
- 为属性赋值
    - 对象名.属性值 = 值;
- 访问方法
    - 对象名.方法名();


```
//声明和实例化一步到位
Member m = new Member();//声明并实例化对象

//赋值
m.memberId = 1;
m.mobilePhone = "15101234567";
m.password = "15101234567";

//调用、访问属性
System.out.println(m.password);
//15101234567

//访问方法
boolean isLogin = m.login(m.mobilePhone, m.password);
//登录成功
System.out.println(isLogin);
//true
```

## 构造函数的概念及分类

- 构造函数：用来构造对象的函数
- 分类：
### 1. 无参（默认）构造函数

```
修饰符 函数名(){
    ...
}

public Person(){
    ...
}
```

例

```
public class Member {

	//显示的声明无参构造函数//默认
	//无有参构造函数时，可省略不写
	public Member() {
		System.out.println("无参构造函数");
	}
}	
```

调用

- 类名 对象名 = new 类名(); 

```
public class ClassName {

	public static void main(String[] args) {
	
		Member m = new Member();//声明并实例化对象
		//无参构造函数
		
		m.password = "15101234567";
		System.out.println(m.password);
 		//15101234567
 }
```

### 2.带参数构造函数

```
修饰符 函数名(参数类型 参数名,参数类型 参数名,...){
    ...
}

public Person(int age,String name){
    ...
}
```

例

- source -> Generate Constructor using Fields...

```
public class Member {

	//1.显示的声明无参构造函数//有有参构造函数时，必须写
	public Member() {
		System.out.println("无参构造函数");
	}
	
	//2.声明有参构造函数
	//若声明了一个有参构造函数，就必须把1.写上，否则，报错
	//source -> Generate Constructor using Fields...
	public Member(int memberId, String regName, String mobilePhone, String password) {
		
		super();
		System.out.println("有参构造函数");
		
		this.memberId = memberId;
		this.regName = regName;
		this.mobilePhone = mobilePhone;
		this.password = password;
	}
}	
```

调用

- 类名 对象名 = new 类名(value1,value2,...);

```
public class ClassName {

	public static void main(String[] args) {
	
        //通过有参数的构造函数声明并实例化对象
        Member m = new Member(1, "持持", "15101234567", "15101234567");
        
        //有参构造函数
        System.out.println(m.memberId);
        //1
        System.out.println(m.regName);
        //持持
        System.out.println(m.mobilePhone);
        //15101234567
    }
}
```

- 语法详解
    - 函数返回值：无
    - 参数类型：八大基本数据类型，引用类型

## 函数调用注意事项

- ==只有创建对象是才会去调用构造函数==，调用构造函数时，用关键字new去==堆内存==来调用

- 调用无参构造函数创建对象，所有属性值是属性对应类型的缺省值

- ==默认构造函数是自带的==，不写构造函数、无有参构造函数时，类编译器会默认隐式补齐无参构造函数

- 声明了有参构造函数时，必须显示写无参构造函数，否则会报错

## 类描述

- source -> Generate toString()...

```
public class Member {

	//重写类描述
	//调用该类打印时//打印类对象，是打印属性值了，不再是打印地址了
	//source -> Generate toString()...
	@Override
	public String toString() {
		return "Member [memberId=" + memberId + ", regName=" + regName + ", mobilePhone=" + mobilePhone + ", password="
				+ password + "]";
	}
}	
```

调用

```
//通过有参数的构造函数声明并实例化对象
Member m = new Member(1, "持持", "15101234567", "15101234567");

System.out.println(m);

结果集

Member [memberId=1, regName=持持, mobilePhone=15101234567, password=15101234567]
```

## 构造函数构造对象时的内存分配

![new堆.png](http://upload-images.jianshu.io/upload_images/2897320-915619f6a652e3c2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
// 内存分配
// 调用构造函数创建对象的内存分配
String str1 = "Hello";// 保存到全局变量
String str2 = "Hello";// 保存到全局变量
String str3 = new String("Hello");// 通过new创建，会保存到堆内存
String str4 = new String("Hello");// 堆内存
System.out.println(str1 == str2);// true
System.out.println(str1 == str3);// false
System.out.println(str3 == str4);// false

// 内存泄露
str4 = str3;
//str3内存地址赋值给str4
//str4 new出来的，在堆内存中的数据无人引用，需要被回收
//str4  对应new出的堆中的内存--垃圾|内存泄漏
//System.gc();//显示回收//使用需熟悉内存变化//一般不用这个，一般使用自动垃圾回收机制

// 内存泄露
System.out.println(str3 == str4); // true
```

![内存泄漏.png](http://upload-images.jianshu.io/upload_images/2897320-d2c1a1582f03989d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 栈溢出：for循环累加过多，没有被释放（递归调用的次数过多，会导致栈溢出）

### 练习

```
定义一个学生类（Student），他有三个属性(全局变量) 姓名name和年龄age和性别gender。
1.编写三个函数，一个用来初始化name，一个用来初始化age，一个用来 初始化gender。（初始化就是对属性赋值的意思） 
2.编写三个函数，分别用来获取name，age，gender。 
3.编写main函数 
4.在main函数里调用无参构造函数来创建一个学生对象student1，并分别调用前面编写的初始化属性的函数来对三个属性赋值(全局变量又叫属性) 。 
5.用student1分别调用获取name，age，gender的函数来获取学生对象student1的姓名，年龄，性别，并分别打印。
6.在main函数里调用带参构造函数来创建一个学生对象student2 (带参构造函数可以在创建对象的时候完成对对象的初始化) 。
7.用student2分别调用获取name，age，gender的函数来获取学生对象student2的名字，年龄，性别，并打印。 
注意：初始化name，age，gender属性时， 赋值可以按照自己的意愿来。
```

```
package ...;

public class Student {

	public String name;
	
	public int age;
	
	//ture:女 //false:男
	public boolean gender;
	
	//初始化赋值
	public void setName(String name) {
		this.name = name;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public void setGender(boolean gender) {
		this.gender = gender;
	}
	
	//获取
	public String getName(){
		return this.name;
	}
	public int getAge(){
		return this.age;
	}
	public boolean getGender(){
		return this.gender;
	}
	
	//无参构造函数
	public Student() {
		// TODO Auto-generated constructor stub
	}
	
	//构造函数
	public Student(String name, int age, boolean gender) {
		super();
		this.name = name;
		this.age = age;
		this.gender = gender;
	}
	
	@Override
	public String toString() {
		return "Student [name=" + name + ", age=" + age + ", gender=" + gender + "]";
	}
	
}
```


```
package ...;

public class ClassPractice {

	public static void main(String[] args) {

		Student student1 = new Student();
		student1.setName("持持");
		student1.setAge(18);
		student1.setGender(true);
		
		System.out.println(student1.getName());
		System.out.println(student1.getAge());
		System.out.println(student1.getGender());
		
		
		Student student2 = new Student("持持", 19, true);
		System.out.println(student2.name);
		System.out.println(student2.getName());
		System.out.println(student2.getAge());
		System.out.println(student2.getGender());
		System.out.println(student2);
	}

}

结果集

持持
18
true

持持
持持
19
true
Student [name=持持, age=19, gender=true]
```
