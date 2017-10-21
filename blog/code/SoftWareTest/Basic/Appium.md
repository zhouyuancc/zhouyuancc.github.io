大纲

- 定义
- 环境搭建
- JUnit脚本编写
- 自动化应用场景

# Appium

### 定义

- 移动端的自动化框架，用于测试手机原生应用（sdk:Software Development Kit）
- 跨平台，可以针对不同的平台用一套API编写测试用例
- 核心是一个暴露了一系列REST API的server

    - REST：是一种协议，（表述性状态转移：Representational State Transfer）
    
    - API：通常说的是类里面定义的一个普通的函数
    
    - REST API：是实现了HTTP协议的接口，可以发布到Web容器里供别人调用的
    
![Appium1.png](http://upload-images.jianshu.io/upload_images/2897320-c11f63673ed06365.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- #### ==测试过程==：同时开启Appium和手机设备，执行脚本，进行测试

### 环境搭建

- 链接: http://pan.baidu.com/s/1hs1hfzI 密码: dkv6

- 1、安装[node.js](https://nodejs.org/en/download/)
    - Appium是使用node.js实现的，node是解释器
    - cmd -> node -v：验证安装成功，查看node.js的版本号
    
```
C:\Users\Zhou>node -v
v6.10.3
```

- 2、ADT & 配置Android sdk环境
    - 参考：monkey环境搭建文档（我的电脑---->属性--->高级系统设置--->环境变量）

- 3、安装手机驱动、测试连接真机或模拟器
    - cmd -> adb devices：获取连接的设备号

```
C:\Users\Zhou>adb devices
List of devices attached
127.0.0.1:53001 device
```

- 4、安装[Appium](https://bitbucket.org/appium/appium.app/downloads/)

    - 双击appium-installer.exe
    - 配置系统变量Path（我的电脑---->属性--->高级系统设置--->环境变量）
    - 重启cmd
    - appium-doctor：验证环境配成功
    
```
系统变量Path的变量值添加

;D:\STInstallation\Appium\Appium\node_modules\.bin
```

appium-doctor

```
C:\Users\Zhou>appium-doctor
Running Android Checks
✔ ANDROID_HOME is set to "D:\STInstallation\MONKEY\adt-bundle-windows-x86-201407
02\sdk"
✔ JAVA_HOME is set to "C:\Program Files\Java\jdk1.7.0_02."
✔ ADB exists at D:\STInstallation\MONKEY\adt-bundle-windows-x86-20140702\sdk\pla
tform-tools\adb.exe
✔ Android exists at D:\STInstallation\MONKEY\adt-bundle-windows-x86-20140702\sdk
\tools\android.bat
✔ Emulator exists at D:\STInstallation\MONKEY\adt-bundle-windows-x86-20140702\sd
k\tools\emulator.exe
✔ Android Checks were successful.
✔ All Checks were successful

```

备注：

```
appium-doctor报错

C:\Users\Zhou>appium-doctor
'appium-doctor' 不是内部或外部命令，也不是可运行的程序
或批处理文件。

解决方法：重启cmd
```

### 脚本编写

### 1、引入jar包

#### 选中==libs中==的jar包 -> 右键 -> Build Path -> Add to Build Path
- selenium-java.jar：web自动化框架

![Appium2.png](http://upload-images.jianshu.io/upload_images/2897320-4b7e4e2ed3487dd0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![Appium3.png](http://upload-images.jianshu.io/upload_images/2897320-3c361cac2169313a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 2、获取配置信息

- D:\STInstallation\MONKEY\adt-bundle-windows-x86-20140702\sdk\tools

### a：==Hierarchy Viewer==：获取app启动页面：appActivity

```
/**
 *  配置信息
 
	设备号：deviceName
	app包名：appPackage
	app启动页面：appActivity
 */
//初始化AppiumDriver
//Desired：a.渴望的 Capabilities：能力

DesiredCapabilities dc = new DesiredCapabilities();
dc.setCapability("deviceName", "127.0.0.1:53001");
dc.setCapability("appPackage", "com.tencent.mm");
dc.setCapability("appActivity", "com.tencent.mm.ui.LauncherUI");
```

![Appium4启动.png](http://upload-images.jianshu.io/upload_images/2897320-0b54bd0323093e7f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![Appium5.png](http://upload-images.jianshu.io/upload_images/2897320-a97201299d61bbe7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![Appium6.png](http://upload-images.jianshu.io/upload_images/2897320-bb0d2c8e6c5ff5e3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### b：==UI Automator Viewer==：获取元素属性信息，元素定位

![Appium8uiautoviewer.png](http://upload-images.jianshu.io/upload_images/2897320-62da0cb558ee9581.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![Appium9.png](http://upload-images.jianshu.io/upload_images/2897320-43944d00fc23d0b9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![Appium10.png](http://upload-images.jianshu.io/upload_images/2897320-4907a1990f33da5f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 3、备注：

- #### 查看父类子类快捷键：==Ctrl + t==

![Appium7.png](http://upload-images.jianshu.io/upload_images/2897320-f8c7b8fddfdf7179.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 4、JUnit脚本

```
package com.company.zy;

import static org.junit.Assert.*;

import java.net.URL;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;

/**
 * @author Zhou
 *
 */
//根据@Test方法名
//@FixMethodOrder(MethodSorters.NAME_ASCENDING)//升序执行
@FixMethodOrder(MethodSorters.DEFAULT)//随机运行方法
public class WeChatLoginTester {

	private static AppiumDriver appDriver;
	
	@Before//Class
	public void setUpBeforeClass() throws Exception {
		
		/**
		 *  配置信息
			设备号：deviceName
			app包名：appPackage
			app启动页面：appActivity
		 */
		//初始化AppiumDriver
		//Desired：a.渴望的 Capabilities：能力
		DesiredCapabilities dc = new DesiredCapabilities();
		dc.setCapability("deviceName", "127.0.0.1:53001");
		dc.setCapability("appPackage", "com.tencent.mm");
		dc.setCapability("appActivity", "com.tencent.mm.ui.LauncherUI");
		
		//创建驱动
		// 4723 Appium默认监听的端口
		// wd/hub 接收REST请求的API
		//父类 AppiumDriver 子类 AndroidDriver
		appDriver = new AndroidDriver(new URL("http://127.0.0.1:4723/wd/hub"), dc);

		System.out.println("driver success");
	}

	@After//Class
	public void tearDownAfterClass() throws Exception {
		
		//关闭驱动
		appDriver.quit();
		
		Thread.sleep(2000);
	}

	/**
	 * 错误的手机号，正确的密码
	 * @throws InterruptedException 
	 */
	@Test
	public void test1() throws InterruptedException {
		
		System.out.println("1");
		
		//根据id获取
		//test1Id();
		
		testFunc("1510123456", "pwdpwdpwd");
	}
	/**
	 * 正确的手机号，错误的密码
	 */
	@Test
	public void test3() throws InterruptedException  {
		System.out.println("3");
		
		testFunc("15101234567", "pwdpwdpw");
	}
	/**
	 * 错误的手机号，错误的密码
	 */
	@Test
	public void test2() throws InterruptedException  {
		System.out.println("2");
		
		testFunc("1510123456", "pwdpwdpw");
	}
//	/**
//	 * 正确的手机号，正确的密码
//	 */
//	@Test
//	public void test4() {
//		System.out.println("4");
//	}
	
	/**
	 * 获取不到id时，获取元素
	 * @param phone
	 * @param pwd
	 * @throws InterruptedException
	 */
	public void testFunc(String phone,String pwd) throws InterruptedException 
	{
		//防止 页面还没打开就执行了
		Thread.sleep(5000);
				
		//启动页登录按钮
		appDriver.findElement(By.name("登录")).click();
		
		//登录页面
		java.util.List<WebElement> inputTxts = appDriver.findElements(By.className("android.widget.EditText"));
		//手机号
		WebElement input1 = inputTxts.get(1);
//		input1.clear();
		input1.sendKeys(phone);
		System.out.println(input1.getText());
		
		//密码
		WebElement input2 = inputTxts.get(2);
		input2.sendKeys(pwd);
		System.out.println(input2.getText());

		//登录
		appDriver.findElement(By.name("登录")).click();
		
		Thread.sleep(8000);
		//错误提示信息
		java.util.List<WebElement> errorTextViews = appDriver.findElements(By.className("android.widget.TextView"));
		WebElement errorTextView0 = errorTextViews.get(0);
		//提示错误信息控件存在
		boolean isShowError = errorTextView0.isDisplayed();
		System.out.println("errorTextView0.isDisplayed()" + isShowError);
		assertTrue("错误信息展示", isShowError);
		//提示
		String tips = errorTextView0.getText();
		System.out.println(tips);
		assertNotNull("登录错误提示不为空", tips);
	}
	
	/**
	 * 根据id获取元素
	 * @throws InterruptedException
	 */
	public void test1Id() throws InterruptedException 
	{
		//防止 页面还没打开就执行了
		Thread.sleep(5000);
		
		//启动页登录按钮
		appDriver.findElement(By.id("cdi")).click();
		//登录页面
		//手机号
		appDriver.findElement(By.id("brm")).sendKeys("15101234567");
		//密码
		appDriver.findElement(By.id("gr")).sendKeys("pwdpwdpwd");
		//登录
		appDriver.findElement(By.id("aax")).click();
		
		Thread.sleep(5000);
		
		//错误提示信息
		String tips = appDriver.findElement(By.id("br4")).getText();
		System.out.println("登录提示信息" + tips);
		
		assertNotNull("登录提示不为空", tips);
	}
}
```

结果

```
driver success
1
151 0123 456

errorTextView0.isDisplayed()true
帐号或密码错误，请重新填写。
driver success
2
151 0123 456

errorTextView0.isDisplayed()true
帐号或密码错误，请重新填写。
driver success
3
151 0123 4567

errorTextView0.isDisplayed()true
帐号/密码错误或帐号密码组合错误。详情请查看帮助。
```
### 5、@FixMethodOrder：JUnit的@Test执行顺序

- NAME_ASCENDING：升序执行
- DEFAULT：根据hashcode的排序运行方法
- JVM：随机运行方法

```
//@FixMethodOrder(MethodSorters.NAME_ASCENDING)//升序执行
@FixMethodOrder(MethodSorters.DEFAULT)//随机运行方法
public class WeChatLoginTester {

	@Test
	public void test1() throws InterruptedException {
		System.out.println("1");
	}

	@Test
	public void test3() throws InterruptedException  {
		System.out.println("3");
	}

	@Test
	public void test2() throws InterruptedException  {
		System.out.println("2");
	}
}
```

- @FixMethodOrder(MethodSorters.NAME_ASCENDING)//升序执行
- @FixMethodOrder(MethodSorters.DEFAULT)//根据hashcode的排序运行方法
- @FixMethodOrder(MethodSorters.JVM)//随机运行方法

NAME_ASCENDING、DEFAULT两个方法执行结果都是：

```
1
2
3
```

### 自动化应用场景

- 做回归测试
- 需求稳定
- 功能稳定
- 项目周期足够长（1-2年，或更长）
- 项目资金预算要足