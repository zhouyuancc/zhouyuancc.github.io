# 一、安装LoadRunner

### 准备工作：
- 先安装C:\LoadRunner\loadrunner11安装包\lrunner\En\prerequisites\vc2005_sp1_redist -> vcredist_X86.exe
- 再安装LoadRunner

![LR1.jpg](http://upload-images.jianshu.io/upload_images/2897320-4578bacb3bbb3fc1.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- #### 根据D:\BaiduYunDownload\win7LR\LoadRunner\lr通用破解 ->  lr破解步骤说明.txt破解LoadRunner
- New License添加注册码

![LR2.png](http://upload-images.jianshu.io/upload_images/2897320-0dd1e823fde3d109.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 二、录制

VuGen

![LR-8.png](http://upload-images.jianshu.io/upload_images/2897320-b1f80efbe2b6b933.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- #### 创建脚本，选择协议

![LR3.png](http://upload-images.jianshu.io/upload_images/2897320-5d8d8da56883f3e9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 录制，点击Start Record

![LR-10.png](http://upload-images.jianshu.io/upload_images/2897320-8ac959cc04a10b53.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 开启网站服务器

![LR-11开启网站服务器.png](http://upload-images.jianshu.io/upload_images/2897320-d5f9d4d156eb0592.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- http://127.0.0.1:1080/WebTours/
- 默认：用户名：jojo 密码：bean

![LR-12.png](http://upload-images.jianshu.io/upload_images/2897320-ee347a0e9c5f9a1f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 注册登录

![LR-13注册登录WebTours.png](http://upload-images.jianshu.io/upload_images/2897320-971d677c726d0d2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 录制工具条

![LR-14事务数.png](http://upload-images.jianshu.io/upload_images/2897320-389d5f184592a37d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- ### 录制过程

![LR-14.png](http://upload-images.jianshu.io/upload_images/2897320-ff967e13ef0ffac1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![LR-17.png](http://upload-images.jianshu.io/upload_images/2897320-0469ec0821307668.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![LR-18.png](http://upload-images.jianshu.io/upload_images/2897320-ec178a57f12b14b7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![LR-19.png](http://upload-images.jianshu.io/upload_images/2897320-6008acf5340b7f5e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- 结束录制

![LR6.jpg](http://upload-images.jianshu.io/upload_images/2897320-1ddc420749e34d8c.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 查看录制的脚本

![LR7.png](http://upload-images.jianshu.io/upload_images/2897320-fa850c418912f106.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 三、回放

- #### Tools -> General Options...

![LR-20回放.png](http://upload-images.jianshu.io/upload_images/2897320-99732f9396af3ddf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- #### Replay与Display全部勾选

![LR-21回放配置.png](http://upload-images.jianshu.io/upload_images/2897320-72473b63cb4b9160.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![LR-22回放配置.png](http://upload-images.jianshu.io/upload_images/2897320-f03d595763b1ebd0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- #### 点击播放按钮Run(F5)

# 四、整理脚本

- #### Ctrl+Alt+C：注释
- #### Ctrl+Alt+U：取消注释
- #### 点击参数名，按F1 或 Fn+F1，进入HP LoadRunner Online Function Reference函数操作手册
- #### 优化脚本
    - 删除不需要的Url链接(web_url)
    - 删除图片、无关资源的下载请求(web_image)
    - 删除 没有提交任何数 的web_submit_data(web_submit_data：提交数据)
    - 删除 重复提交 的web_submit_data(web_submit_data：提交数据)


# 其它

### 集合点：所有请求都到位之后，再进行下一步操作

- #### Insert -> Rendezvous...

![LR-26集合点.png](http://upload-images.jianshu.io/upload_images/2897320-9345df045432d76a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
web_submit_data("login", 
    ...
	LAST);

//lr_rendezvous：集合点（所有登录的用户在此等待，等大家都登录成功后，再走下一步）
lr_rendezvous("login_success");
```

### 思考时间：睡眠时间(s)

```
//思考时间//睡眠时间(s)
lr_think_time(6);
```

### 事务：标签（例：标注登录事务，投资事务）

- 手动事务

```
lr_start_transaction("login_event");

web_submit_data("login", 
    ...
    LAST);
		
lr_end_transaction("login_event", LR_AUTO);
```
- 自动事务：自动事务函数的结果交由LoadRunner来判断
    - Insert -> Start Transaction...
