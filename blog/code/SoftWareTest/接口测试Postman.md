## 一、安装

### 1、下载

- 官网：https://www.getpostman.com/
- 客户端链接：https://pan.baidu.com/s/1skOovMH 密码: vpv8

### 2、安装

#### 插件安装：

- 更多工具 -> 扩展程序 -> 选中开发者模式 -> 点击 加载已解压的扩展程序...
- 安装成功后，打开 chrome://apps/ -> 点击Postman - REST Client

![Postman1.png](http://upload-images.jianshu.io/upload_images/2897320-7f47869c60a02e10.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 客户端安装：
![Postman.png](http://upload-images.jianshu.io/upload_images/2897320-0df1fee70b9f9dec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 二、测试HTTP、WebService接口

### HTTP接口

1、Method：POST/GET

2、填写Params参数

![Postman2.png](http://upload-images.jianshu.io/upload_images/2897320-d1fde09ea41e4a77.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### WebService接口

1、Method：POST

2、Body-raw-XML -> 填写XML参数

![Postman3.jpg](http://upload-images.jianshu.io/upload_images/2897320-551030bd41cdac65.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3、查看结果

- 查看Body

![Postman4结果.png](http://upload-images.jianshu.io/upload_images/2897320-99f4838c474e5189.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 查看Headers

![Postman5.png](http://upload-images.jianshu.io/upload_images/2897320-6d3ff6a2cb51b192.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 三、对比三个工具的优缺点

- Postman特性
    - Postman插件只能在chrome使用
    - Postman支持编写测试脚本，可以快速的检查request的结果，并返回测试结果
    - Postman能够团队协作，Jmeter/soapUI不能
    - Postman的==Pre-request Script== 中的脚本会在执行==request请求前==先运行，因此可以在里面==预先设置些所需变量==
    - Postman的==Tests== 中的脚本是在==request返回后==执行的，可以对返回信息进行==提取过滤== [变量/环境/过滤等](http://blog.csdn.net/zxz_tsgx/article/details/51681080)
    - Postman可以[切换环境和设置读取变](http://www.cnblogs.com/qiaoyeye/p/5524750.html)
    
    > 一般我们在编辑request，校验response的时候，总会需要重复输入某些字符，比如url，postman允许我们设定变量来保存这些值。并且把变量保存在不同的环境中。比如，我們可能会有多种环境， development 、 staging 或 local， 而这几种环境中的 request URL 也各不相同，但我们可以在不同的环境中设定同样的变量，只是变量的值不一样，这样我们就不用修改我们的测试脚本，而测试不同的环境



- Jmeter比soapUI/Postman功能多
    - Jmeter可以使用==循环次数==，soapUI/Postman不能
    - Jmeter可以使用==txt中的变量引用==，soapUI/Postman不能
    - Jmeter可以使用==函数助手==（如：生成随机字符串），soapUI/Postman不能
    
- soapUI/Postman比Jmeter使用方便
    - soapUI/Postman的HTTP接口 不用区分域名和路径，Jmeter需要区分
    - soapUI/Postman的HTTP接口 结果可以直接以JSON格式化形式展示
    - soapUI的WebsService接口可以直接获得 ==参数的xml格式==，Jmeter/Postman不能直接获得
    - WebsService接口又称为SOAP接口

- 工具的选择
    - HTTP接口：Postman、==Jmeter(可以循环)==、soapUI、Firefox插件httpRequester、代码测试
    - WebService接口（soap接口）：Postman、==soapUI==、Jmeter(可以循环)、代码测试
