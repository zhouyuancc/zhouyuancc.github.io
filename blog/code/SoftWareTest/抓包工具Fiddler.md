
[Web项目部署链接](http://note.youdao.com/noteshare?id=dffaf1025981ad9d38c8b0564dbcdec1)

## 一、什么是Fiddler？

- Fiddler是位于客户端和服务期端的==HTTP代理==，也是目前最常用的HTTP抓包工具之一

- Fiddler是Web分析和调试的利器
    - 能==记录==客户端和服务器之间的==所有HTTP请求==
    - 可以针对特定的HTTP请求，分析请求数据、设置断点、调试Web应用、修改请求的数据
    - 可以修改服务器返回的数据

- Fiddler设置
    - 客户端的所有请求都要先==经过Fiddler==，然后转发到相应的服务器
    - 反之，服务器的所有响应，也都会先经过Fiddler，然后发送到客户端
    - 基于上述原因，Fiddler支持所有可以设置HTTP代理为127.0.0.1:8888的浏览器和应用程序
    
![Fiddler1.png](http://upload-images.jianshu.io/upload_images/2897320-b824fef623ee9bd9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- Fiddler配置
    - Firefox：选项(Options) -> 高级(Advanced) -> 网络 -> 连接 - 设置(Connection-Settings...) -> 手动配置代理 -> ==HTTP代理：127.0.0.1:8888 - 勾选【为诉有协议使用相同代理】 - 不使用代理：文本框内容清空== -> 点击确定
    
    ![Fiddler2配置代理.png](http://upload-images.jianshu.io/upload_images/2897320-fc87a967c9e1a939.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

    - chrome：设置 -> 显示高级设置... -> 网络 - 更改代理服务器设置... -> 连接 -> 局域网设置 -> ==选中代理服务器：127.0.0.1:8888== -> 点击确定
    
    ![Fiddler3配置代理.png](http://upload-images.jianshu.io/upload_images/2897320-f6489a369c703225.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
    
## 二、Session会话展示器

### Web Session面板：

- Fiddler抓取的每条HTTP请求（每一条称为一个Session）

- Session：代表的是一次浏览器会话

- 包含请求的url、协议Protocol、状态码、Body等
    - #：请求资源的类型
    - Result：响应结果
    - Protocol：每个请求使用的协议
    - Host：请求地址的域名
    - Url：请求的地址
    - Body：响应数据的大小，单位为Byte字节（1 TB=1024 GB=1024^2 MB=1024^3 KB=1024^4 B）
    - Content-Type：请求响应的数据类型
    - Process：发出此请求的Windows进程（例：firefox：3108）

### 常见的请求资源

![Fiddler4.png](http://upload-images.jianshu.io/upload_images/2897320-f86ab8fe2b1426da.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![Fiddler5.png](http://upload-images.jianshu.io/upload_images/2897320-8616278d9c942392.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 常见的Result
- 200：响应成功
- 302：重定向
- 304：未作修改的，有缓存的数据（==control + F5==：强制刷新，可以让每个请求都重新请求，不再出现304）
- 401：请求参数非法
- 404：资源找不到 
- 405：请求方式不对，方法不允许GET/POST
- 500：服务器内部错误、服务器异常 
- 503：服务没启动 

## 三、Filter过滤器

#### 1、设置 特定域名 录制 ==指定域名== 的网站的HTTP请求，过滤其它域名的请求

![FiddlerFilter1.png](http://upload-images.jianshu.io/upload_images/2897320-8d26e3853ebd032c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 2、设置 正则表达式 录制满足正则匹配的那部分请求
- 例如：==regex:(?insx).*\.(jpg|gif|bmp|css|js)$== 匹配.jpg、.gif、.bmp、.css、.js结尾的Url，忽略大小写

![FiddlerFilter2正则.png](http://upload-images.jianshu.io/upload_images/2897320-a677bd9ccf05dcd0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 3、根据HTTP状态来屏蔽请求

![FiddlerFilter3Result.png](http://upload-images.jianshu.io/upload_images/2897320-961b9698e573d851.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 例：[测试Web项目](http://192.168.76.129:8888/ningmengban/app/login/login.html)

![FiddlerFilterLoginTest.png](http://upload-images.jianshu.io/upload_images/2897320-53f7a1cfcecc6d41.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 四、Statistic数据统计器

- 关于HTTP请求的性能和其它数据分析
- 可以看出一些基本性能数据
    - DNS解析（域名解析）的时间
    - 建立TCP/IP3次握手连接的时间消耗

- DNS解析：
    - 一个域名对应一个IP，且多个域名可以对应同一个IP
    - 域名与IP之间的 ==转换工作== 称为DNS解析（域名解析）
    - 域名解析 需要由专门的 ==域名解析服务器== 来完成

- TCP/IP连接：
    - TCP/IP协议中，TCP协议通过三次握手建立一个可靠的连接
    - 第一次握手：==客户端发送请求给服务器==，问：可以连接吗？，==进入等待==
    - 第二次握手：==服务器回应了客户端==，答：可以连接，服务器端也==进入等待==
    - 第三次握手：==客户端再发送一个响应给服务端==，告诉服务器客户端已经收到消息


- Bytes Sent（发送到数据大小）:      479		(headers:479; body:0)
- Bytes Received（接收的数据大小）:  2,011		(headers:234; body:1,777)
- DNS Lookup（DNS解析时间）: 		0ms
- TCP/IP Connect（TCP/IP连接时间 > 3次握手时间）:	0ms
- HTTPS Handshake（3冲握手的总时间）:	0ms

#### 例：[测试Web项目](http://192.168.76.129:8888/ningmengban/app/login/login.html)

![FiddlerStatisticLoginTest.png](http://upload-images.jianshu.io/upload_images/2897320-dcf4465eeab1eb48.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 五、Inspectors观察器

- 分为上下两个部分，上半部分是请求头，下半部分是响应头

- 每个部分提供了多种不同格式查看每个请求和响应的内容
    - JPG格式：使用ImageView可以查看图片
    - HTML/JS/CSS：使用TextView可以查看响应的内容
    - Raw：查看原始的符合HTTP标准的请求和响应头
    - JSON：查看JSON数据
    - XML：查看XML数据
    - Webform：查看请求参数
    

#### 例：[测试Web项目](http://192.168.76.129:8888/ningmengban/app/login/login.html)

![FiddlerInspectorsTest1.jpg](http://upload-images.jianshu.io/upload_images/2897320-6cb99458bc6f8be0.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![FiddlerInspectorTest2.png](http://upload-images.jianshu.io/upload_images/2897320-148199ba2724bbcc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 六、Composer设计器

#### 我们可以通过Composer来==模拟浏览器发请求==，来完成某些接口的测试

- 1、在Inspectors里，点击Raw，查看详细的请求信息
- 2、copy Raw中正常请求的==请求头==，粘贴到Composer的头部，修改==GET/POST、Url、协议==，==删除==请求头中的==GET/POST行、Host、请求参数==
- 3、把正常提交的==请求参数==copy到Composer下的==Request Body==
- 4、点击execute提交请求


#### 例：[测试Web项目](http://192.168.76.129:8888/ningmengban/app/login/login.html)

#### 1、从Inspectors-Raw中复制数据

![FiddlerComposerCopyContent.png](http://upload-images.jianshu.io/upload_images/2897320-440335023acafd5c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 2、粘贴并修改数据到Composer设计器

![FiddlerComposerPasteModify.png](http://upload-images.jianshu.io/upload_images/2897320-963c151d9fcc0e3b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 3、点击execute执行后，左侧新增了一条请求数据，并获取到JSON结果

![FiddlerComposerAddRequest.jpg](http://upload-images.jianshu.io/upload_images/2897320-455562db70b791ff.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 七、AutoResponder自动回复器

#### Fiddler比较重要且比较强大的功能之一，可用于==拦截某一请求，并重定向到本地的资源==

- 当我们发现生产环境服务器上的某个CSS/JavaScript文件有问题，需要修改时
    - 通常，需要将文件进行修改，然后重新发布再验证，很容易影响生产环境的稳定性
    - 普遍的做法是，我们在开发环境中修改文件并验证，然后发布到生产环境。虽安全，却比较繁琐
    
- 利用Fiddler可以==修改HTTP数据的特性==，可以==基于生产环境==修改并验证，确认后再发布，这样可以保证，尽量在真实的环境下调试，从而最大限度的减少bug发生的可能性

- 使用方法
    - 0、从Fiddler保存js方法：==右键 -> Save -> Response -> Response Body...==
    - 1、选中AutoResponder
    - 2、勾选3个Enable rules
    - 3、选中左侧某一js或其它类型请求，点击Add Rule
    - 4、在下面Rule Editor中重定向本地资源
    - 5、点击Save
 
#### 例：[测试Web项目](http://192.168.76.129:8888/ningmengban/app/login/login.html)

#### 1、调用本地js

![FiddlerAutoResponderTest.jpg](http://upload-images.jianshu.io/upload_images/2897320-b37b68225c74ab8d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 2、执行本地js输出结果

![FiddlerAutoResponnderResult.png](http://upload-images.jianshu.io/upload_images/2897320-6cbb0050c5525c1d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 八、利用Fiddler设置断点进行调试修改

#### Fiddler菜单栏 -> Rules -> Automatic Breakpoints ->选择断点方式

#### 断点方式：

- Before Requests：发送请求之后，Fiddler代理中转之前，修改请求的数据
    - 设置断点：==bpu== xxx（对Url中包含了xxx的请求设置断点，请求在到达服务器之前会被中断）
    - 取消断点：bpu（不携带任何参数）（bp：break point）

- After Responses：服务器响应之后，Fiddler将响应中转给客户端之前，修改响应的结果
    - 设置断点：==bpafter== xxx（对Url中包含了xxx的请求设置断点，响应在到达客户端之前会被终端）
    - 取消断点：bpafter（不携带任何参数）

#### 例：[测试Web项目](http://192.168.76.129:8888/ningmengban/app/login/login.html)

#### bpu login.js 客户端发送请求后，服务器响应之前 添加断点

![Fiddler断点bpu.jpg](http://upload-images.jianshu.io/upload_images/2897320-cef816ec9bb06398.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 参数数据可以修改，点击Run to Completion放行资源后

![Fiddler断点bpu2.jpg](http://upload-images.jianshu.io/upload_images/2897320-cd9e8e1c505d9ca2.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### bpu 取消 发送请求后，服务器响应前 的断点

![Fiddler断点bpu3.png](http://upload-images.jianshu.io/upload_images/2897320-a831e7f3dbc61622.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### bpafter 添加 服务器响应后，传递到客户端之前 的断点
#### 可以在login.html加载完页面前，修改html页面样式

![Fiddler断点bpafter.png](http://upload-images.jianshu.io/upload_images/2897320-fa955bb2801a9a1d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 九、Fiddler的常用命令

- select xx：例：select image：筛选出所有图片请求

#### select json
![FiddlerselectJson.jpg](http://upload-images.jianshu.io/upload_images/2897320-a28b5323f631045f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- ?xx：例：?text：匹配出所有Url中包含"text"的所有请求

#### ?js
![Fiddler问号text.jpg](http://upload-images.jianshu.io/upload_images/2897320-9e021154ff964609.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- (<)>size：例：>(<)100：选择响应size大于(小于)size(Byte)的所有请求

#### 小于<100
![Fiddler小于.jpg](http://upload-images.jianshu.io/upload_images/2897320-deea120112a3486f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- =status：例：=202：选择响应状态等于给定状态status的所有请求

#### =200
![Fiddler等于status.jpg](http://upload-images.jianshu.io/upload_images/2897320-93e20b24eabc251b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- @host:选择包含指定host域名的所有请求

#### @192.168.76.129:8888
![Fiddler@host.png](http://upload-images.jianshu.io/upload_images/2897320-857c6fa71d5d024f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 其它

### 异常处理方法
- 点击登录没有反应
    - 1、登陆的按钮没有发起后台的请求（Fiddler没抓到请求）
    - 2、如果有正常提交登录的请求，查看请求的响应状态码：404、405、401、500


### 抓包工具
- Httpwatch
- FireBug
- Fiddler
- Charles
