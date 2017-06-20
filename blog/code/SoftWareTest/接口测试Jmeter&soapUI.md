
大纲
- 接口的分类
- 接口数据传递的格式
- 接口测试工具(Jmeter、soapUI)

## 接口分类

- HTTP类型  
- WebService接口：wsdl结尾(99%)

## 接口数据传递的格式

- XML

```
<xml>
    <code>cc</code>
    <name>持持</name>
</xml>
```

- JSON

```
{"code":"cc","name":"持持"}
```

## 接口测试工具(Jmeter、soapUI)

## Jmeter

### 一、基本操作

#### 1、打开

E:\SoftwareTestInstallation\apache-jmeter-2.11\bin -> 点击jmeter.bat

![Jmeter1.png](http://upload-images.jianshu.io/upload_images/2897320-da20276c2c8c1d94.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 2、创建线程组

![Jmeter2.png](http://upload-images.jianshu.io/upload_images/2897320-ce5b9280c65a10cb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### HTTP接口

#### 3、添加HTTP请求

![Jmeter3.png](http://upload-images.jianshu.io/upload_images/2897320-c68b0289f7019472.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 4、填写请求数据

即货券分类接口：http://jihuo.me/mobile/db/db.php?action=getCategoryCoupon

- 域名：jihuo.me
- 路径：/mobile/db/db.php
- 参数：action=getCategoryCoupon

![Jmeter4.png](http://upload-images.jianshu.io/upload_images/2897320-68587a8f82505e2c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 5、添加察看结果树

![Jmeter5.png](http://upload-images.jianshu.io/upload_images/2897320-74d6782021df4489.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 6、查看HTTP请求结果

![Jmeter6.png](http://upload-images.jianshu.io/upload_images/2897320-2f30902eceb22e42.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### WebService接口

#### 3、添加SOAP/XML-RPC Request请求

![Jmeter-webservice1.png](http://upload-images.jianshu.io/upload_images/2897320-9b0abadca7a5d08b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 4、输入URL（去掉?wsdl），从soapUI拷贝参数xml

![Jmeter-webservice2.png](http://upload-images.jianshu.io/upload_images/2897320-86d159f5dd072f24.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 5、察看结果树

![Jmeter-webservice2察看结果树.png](http://upload-images.jianshu.io/upload_images/2897320-1d19306fdb70cd7e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 二、变量引用、循环

#### 即货券列表：http://jihuo.me/mobile/db/db.php?action=getCouponList&category=7&offset=30

#### 添加 -> 配置元件 -> CSV Data Set Config

![Jmeter9CSV.png](http://upload-images.jianshu.io/upload_images/2897320-56738a6f2458144f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### txt英文格式 ==多个变量用英文逗号,隔开==：如：==category,offset==

![Jmeter9dateTXT.png](http://upload-images.jianshu.io/upload_images/2897320-b4ee8b48c8aa9575.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 填写data.txt路径，定义变量名

![Jmeter10.png](http://upload-images.jianshu.io/upload_images/2897320-e9feebda9b36c543.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 设置value从变量category中获取值：==value：${category}== 

![Jmeter11.png](http://upload-images.jianshu.io/upload_images/2897320-2c4fa80c0cdd2114.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 设置线程组的循环次数

![Jmeter12.png](http://upload-images.jianshu.io/upload_images/2897320-f1df06a53c07afdd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 察看结果数

![Jmeter13.png](http://upload-images.jianshu.io/upload_images/2897320-dffb27e40f1c9bae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 三、生成随机函数

#### 1、选项 -> 函数助手对话框

![Jmeter-webservice3.png](http://upload-images.jianshu.io/upload_images/2897320-4bd5925e4b0ca4d1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 2、生成8位（从1234567890中随机取值）字符串函数

![Jmeter-webservice3函数助手对话框.png](http://upload-images.jianshu.io/upload_images/2897320-735f2092b3b3bd65.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 3、==修改参数==：<mobile>151${__RandomString(8,1234567890,)}</mobile>

![Jmeter-webservice4.png](http://upload-images.jianshu.io/upload_images/2897320-8c312cfa58ab860d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 4、修改循环次数，察看结果树

![Jmeter-webservice5随机函数察看结果树.png](http://upload-images.jianshu.io/upload_images/2897320-713da9bde070c1b5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## soapUI

### 1、HTTP接口

#### 即货券分类接口：http://jihuo.me/mobile/db/db.php?action=getCategoryCoupon

#### a：填写接口

![Jmeter7.png](http://upload-images.jianshu.io/upload_images/2897320-036171ca4a65d642.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### b：填写参数

![Jmeter8.png](http://upload-images.jianshu.io/upload_images/2897320-08615555135fd5a0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 2、WebService接口

#### 创建WebService接口测试项目

#### 填写项目名，填写Initial WSDL：http://192.168.76.129:8888/sms-service-war-1.0/ws/smsFacade.ws?wsdl

![soapUI1.png](http://upload-images.jianshu.io/upload_images/2897320-5e2f76019cf18241.png)

#### 填写参数，查看返回值

![soapUI2.png](http://upload-images.jianshu.io/upload_images/2897320-a0dfab57290518da.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![soapUI3.png](http://upload-images.jianshu.io/upload_images/2897320-f03525cbe54d898b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## Jmeter与soapUI的区别

- Jmeter比soapUI功能多
    - Jmeter可以使用==循环次数==，soapUI不能
    - Jmeter可以使用==txt中的变量引用==，soapUI不能
    - Jmeter可以使用==函数助手==（如：生成随机字符串），soapUI不能
    
- soapUI比Jmeter使用方便
    - soapUI的HTTP接口 不用区分域名和路径，Jmeter需要区分
    - soapUI的HTTP接口 结果可以直接以JSON格式化形式展示
    - soapUI的WebsService接口可以直接获得 ==参数的xml格式==
    - WebsService接口又称为SOAP接口

- 工具的选择
    - HTTP：Jmeter(可以循环)
    - WebService：soapUI
    - HTTP接口：postman、==Jmeter(可以循环)、soapUI==、Firefox插件httpRequester、代码测试
    - WebService接口（soap接口）：postman、==soapUI、Jmeter(可以循环)==、代码测试

## 查看日志

WebService准备工作
```
1.开启mysql数据库

service mysqld start
mysql -uroot -p -h192.168.76.129
123456

2.查看日志（注意：启动Apache-Tomcat之前，先打开日志窗口）

a：打开系统日志
cd /opt/apache-tomcat-6.0.37/logs/
tail -f catalina.out

b：打开详细日志
cd /opt/apache-tomcat-6.0.37/logs/
tail -f system

3.打开日志后，开启Apache-Tomcat
cd /opt/apache-tomcat-6.0.37/bin/
./startup.sh start
```

- Catalina：
    - 出错才会动
    - 打印信息（如：短信验证：打印验证码信息）  
- system（DEBUG调试日志）：一直会动，错误定位到具体信息
- 异常
    - at exception
    - error
    - caused by

log4j的log/system可以改成别的地址
