
# 关联函数

### 一、手动关联

#### 1、点击Tree查看View Tree

![LR0610-1.png](http://upload-images.jianshu.io/upload_images/2897320-1fdaf635e9777a81.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 生成 关联函数\预注册函数web_reg_save_param_ex

#### 2、点击Tree -> 点击左侧Action - Url: WebTours -> 点击右边==HTTP View== -> 选择/WegbTours/nav.pl?in=home -> 选中==Raw Data== -> 在==Response==中找出需要的HTML

```
...
<input type=hidden name=userSession value=121279.051842851zcDicQVpccQVzzzHDHtcQpHtHDHf>
<table border=0><tr><td>&nbsp;</td>
...
```

![LR0610-2.png](http://upload-images.jianshu.io/upload_images/2897320-e2a44f8c6eee5f79.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 3、鼠标选中需要函数关联的value值（如：121279.051842851zcDicQVpccQVzzzHDHtcQpHtHDHf）-> 右键点击Create Correlatioon -> 选择Yes

![LR0610-3.png](http://upload-images.jianshu.io/upload_images/2897320-49d487638ac7257e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 4、点击Script查看脚本

```
//Correlation comment - Do not change!Original value='121279.051842851zcDicQVpccQVzzzHDHtcQpHtHDHf' Name ='CorrelationParameter_1'

	//<input type=hidden name=userSession value=121279.051842851zcDicQVpccQVzzzHDHtcQpHtHDHf>
	//<table border=0><tr><td>&nbsp;</td>
	 
	//关联函数\预注册函数，一定要写在请求之前(如: web_submit_form)
	web_reg_save_param_ex(
		"ParamName=CorrelationParameter_1",//自动生成的参数名
		"LB=userSession value=",//左边界Left Boundary
		"RB=>\n<table border",//右边界Right Boundary
		SEARCH_FILTERS,//搜索筛选
		"Scope=All",
		"RequestUrl=*/nav.pl*",
		LAST);
```

### 调用 关联函数\预注册函数web_reg_save_param_ex 

#### 5、打印 关联函数\预注册函数：

注意：写在web_url后面（==web_url后面才能获取到token/cookie值==），web_submit_data前面

- #### lr_output_message(lr_eval_string("{CorrelationParameter_1}"));

```
//lr_output_message( "We are on iteration #%s", lr_eval_string( "{iteration}" ) );

//打印 关联函数\预注册函数
//注意：写在web_url后面，web_submit_data前面
lr_output_message(lr_eval_string("{CorrelationParameter_1}"));

//打印结果：121279.302146618zcDiDAtpVAtVzzzHDHtcQpictzcf
```

#### 6、调用：

- #### "Name=userSession", "Value= =={CorrelationParameter_1}==", ENDITEM,

```
    web_submit_form("login.pl",
		...,
		ITEMDATA,
		"Name=userSession", "Value={CorrelationParameter_1}", ENDITEM,
		"Name=username", "Value=jojo", ENDITEM,
		"Name=password", "Value=song", ENDITEM,
		"Name=login.x", "Value=45", ENDITEM,
		"Name=login.y", "Value=9", ENDITEM,
		LAST);
```

例：前程贷：

```
//Correlation comment - Do not change!Original value='wBJv7144k39lUiV7l3KpDbqlBP2lYyQwCsF5TWQracuIWvbGeG7MFX0MkzjhxWIb2ncDgSjqfb3sTlZdzEEPgpXmbpNLYoQ0Sfl5mHfAAlF9RpXvUvlFtlb5jMW8n/MPDvZRcadTnGM4MuCpOtOynUCoM9mDqWRqDx2DCuznzX4=' Name ='CorrelationParameter_1'

	web_reg_save_param_ex(
		"ParamName=CorrelationParameter_1",
		"LB= data-token=\"",
		"RB=\" data-id",
		SEARCH_FILTERS,
		"Scope=All",
		"RequestUrl=*/finance.html*",
		LAST);

	web_url("finance",
		"URL=http://120.76.42.189:8888/loan/finance.html",
		LAST);

	//打印 关联函数\预注册函数
	//注意：写在web_url("finance.html"后面，web_submit_data("invest"前面
	lr_output_message(lr_eval_string("{CorrelationParameter_1}"));
	
	web_submit_data("invest",
		"Action=http://120.76.42.189:8888/Invest/invest",
		"Method=POST",
		"TargetFrame=",
		"RecContentType=application/json",
		"Referer=http://120.76.42.189:8888/loan/finance.html",
		"Mode=HTML",
		ITEMDATA,
		"Name=id", "Value=2222", ENDITEM,
		"Name=val", "Value=100", ENDITEM,
		"Name=token", "Value={CorrelationParameter_1}", ENDITEM,
		"Name=rewardValue", "Value=0", ENDITEM,
		LAST);

```

备注：LR设置展示session

![LR设置session.jpg](http://upload-images.jianshu.io/upload_images/2897320-ee456e8045f9a427.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 二、自动关联（有时候无法扫描）

- #### Vuser -> Scan Script for Correlations -> Yes -> Rmove Correlation

- #### Recording options（录制设置） -> HTTP Properties -> Correlation -> Enable correlation during recording：录制过程中启用自动关联。这个就是自动关联的开关


# 参数化与迭代的配合使用

## 一、参数化

- 比如，for循环(i=1;i<10;i++),
那么，i=1,i=2,...,i=10 就叫做参数化

- 目的：模拟更接近真实环境的数据

#### 1、框选出需要参数化的值 -> 右键Replace With a Parameter

![LR0610-4参数化.png](http://upload-images.jianshu.io/upload_images/2897320-32ef46f9ff8a503a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 2、修改Parameter name参数名，点击OK创建Parameter参数化

![LR0610-5参数化.png](http://upload-images.jianshu.io/upload_images/2897320-e2b1ad2cabae4138.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![LR0610-6参数化.png](http://upload-images.jianshu.io/upload_images/2897320-cc6bdf98fdd50e52.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 创建后

![LR0610-7参数化.png](http://upload-images.jianshu.io/upload_images/2897320-45f9a539dde993fd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 3、点击新创建的{Parameter}，单击右键 -> Parameter Properties...

![LR0610-8参数化.png](http://upload-images.jianshu.io/upload_images/2897320-d128ef7020a1ae1d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 添加数据

![LR0610-10参数化.png](http://upload-images.jianshu.io/upload_images/2897320-19f0ac10079ccd89.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 使用记事本编辑数据

![LR0610-11参数化.png](http://upload-images.jianshu.io/upload_images/2897320-bb71e07d4f7bdc3a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### [使用数据库编辑数据](http://www.lemfix.com/topic/58f72315b15684d05322a18d)

![LR0610-12参数化.png](http://upload-images.jianshu.io/upload_images/2897320-73ac48d883d68fd6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 二、参数化的取值与迭代的取值设置

- #### Selet next row：参数化后的==取值==：从 参数化的多条数据 中取数据
    - Sequential：顺序取行
    - Random：随机取行
    - Unique：==每个值只能使用一次==（银行流水【唯一的id】这类==唯一标识==的值）


- #### Update value on：参数化后的==迭代==：对Selet next row取出的数据进行迭代
    - Each iteration：只有每次==迭代的时候==，才根据Selet next row的参数，更新取值
    - Each occurence：不根据迭代的次数而取值，==只要遇到该参数==，就根据Selet next row取新的值
    - Once：无论迭代多少次，无论程序中有多少个参数（test1），==始终只使用同一个值==（不同方式取出的第一个值）

[lr参数化取值规则总结](http://blog.csdn.net/sunnyyou2011/article/details/52594596)


## 三、执行迭代（遍历）

#### 1、Vuser -> Run_Time Settings...

![LR0610-13迭代.png](http://upload-images.jianshu.io/upload_images/2897320-cc0d471a767ace9f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 2、==设置迭代次数== -> 点击OK

![LR0610-14迭代.png](http://upload-images.jianshu.io/upload_images/2897320-fe1792ce64a7b07c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 3、运行
