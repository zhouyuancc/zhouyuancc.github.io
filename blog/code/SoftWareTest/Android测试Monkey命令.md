大纲
- adb
- Monkey 
    - 定义
    - 启动方式
    - 参数
    - 事件

## 准备工作
- 1、Monkey环境搭建
- 2、安装Android模拟器

# 一、adb

- #### 用来==连接Android手机和PC端的桥梁==，要有adb作为二者之间的维系，才能让用户在电脑上对手机进行全面的操作
- #### 运行环境基于我们搭建的adt（==adt：Android测试开发环境==）
- #### 操作：cmd

```
adb：展示所有命令

adb devices：展示连接到PC的Android设备号（模拟器、真机[豌豆荚、91手机助手]）

C:\Users\Zhou>adb devices
List of devices attached
127.0.0.1:53001 device

adb help
```

```
adb install xxx.apk：安装，返回success

adb shell：install失败时，进入shell命令，Linux操作环境，Ctrl+C退出编译环境
```

### shell查看Android包名

```
adb shell
cd /data/data：查看包名：com.moji.mjweather
```

#### ==PC与Android 文件互传==

```
adb pull <phone> <local>：从手机中拉取信息->本地PC

adb push <local> <phone>：本地PC->手机（push推pull拉）
```

例：

```
adb push C:\Users\Zhou\Desktop\adbPushTest.txt /data/data

adb pull /data/data/adbPushTest.txt C:\Users\Zhou\Desktop

//查看文件
C:\Users\Zhou>adb shell
root@android:/ # cd /data/data
cd /data/data
root@android:/data/data # ll
ll
-rw-rw-rw- root     root            0 2017-06-16 23:05 adbPushTest.txt

//删除
rm adbPushTest.txt
```

### 重启adb

```
adb kill-server

adb start-server：当adb出现问题或adb启动不起来时，先adb kill-server，再adb start-server
```

### 打印日志（Android）

```
adb logcat
```
打印日志到本地

```
adb logcat >C:\Users\Zhou\Desktop\adbLogcat.txt
```

# 二、Monkey

### 1、定义

- Monkey测试是==Android平台自动化测试==的一种手段，模拟用户触摸屏幕 等操作 来对应用进行 压力测试。检测多久的时间会发生异常。
- ==命令行==工具 
- 运行环境基于adt（==adt：Android测试开发环境==）
- 用来做==压力测试、自动化测试==
- Monkey==测试时间==：产品稳定、没有特别多bug的时候

- 缺点：虽然可以根据一个指定的命令脚本发送按键消息，但，==不支持条件判断==，==也不支持 取 待测界面的值 来执行 验证操作==

### 2、启动方式

- 准备工作：启动Android模拟器

```
adb shell monkey -help

adb shell monkey 100：随机在Android手机上点击100次
```

### 3、参数

- #### -p：（Package）只能指定一个包，只启动-p后的APP包应用

    - adb shell monkey -p 包名 -p 包名 次数

```
在这2个APP里随机点击1000次

adb shell monkey -p com.ibox.calculators -p com.moji.mjweather 1000
```

- #### 查看Android包名

1、查看所有包名

```
adb shell
cd /data/data
ll
```

2、查看==正在运行的APP的包名==
- adb shell dumpsys activity | find "mFocusedActivity"
```
//类似管道命令//若不准确，就多执行几次，直到找对
adb shell dumpsys activity | find "mFocusedActivity"

  mFocusedActivity: ActivityRecord{5358b6bc u0 com.ibox.calculators/.CalculatorA
ctivity}
```

- #### 导出Android手机已安装的APP包名称

    - adb shell pm list packages >本地路径

```
adb shell pm list packages >C:\Users\Zhou\Desktop\apkNames.txt

导出apkNames.txt
//apkNames.txt
package:android
package:com.android.backupconfirm
...
package:com.ibox.calculators
package:com.moji.mjweather
package:com.svox.pico
package:eu.chainfire.supersu
package:me.haima.androidassist
package:me.haima.helpcenter
```

- #### 日志

    - -v：Level0（仅提供启动提示、测试完成、最终结果等少量信息）
    - -v -v：Level1（较详细，包含每个发送到Activity的事件信息）
    - -v -v -v：Level2（最详细日志，包含测试中选中/未选中的Activity信息）
    - adb shell monkey -p 包名 ==-v -v -v== 随机次数
    - ==日志导出到本地==
        - adb shell monkey -p 包名 -v -v -v 随机次数 >本地地址 

```
//打印日志
adb shell monkey -p com.ibox.calculators -v -v -v 100
```

```
//日志导出到本地
adb shell monkey -p com.ibox.calculators -v -v -v 100 >C:\Users\Zhou\Desktop\calculatorsLog.txt 
```

- #### -s：（seed）用于记录随机事件的顺序

    - adb shell monkey -p 包名 ==-s 编号（记录随机事件顺序的唯一标识）== 随机次数

```
adb shell monkey -p com.ibox.calculators -s 1 100

//带日志打印
adb shell monkey -p com.ibox.calculators -s 1 -v -v -v 100
```

#### 执行2次测试，操作序列是随机的，但是，只要指定了相同seed，2次测试的随机操作是完全一样的

- #### --throttle 毫秒：(==注意==：2个-)事件==间==的思考时间、延时
    - 1000ms = 1s
    - --randomize-throttle：(==注意==：randomize有2个-)在事件间插入随机延时，范围在0~throttle的毫秒时间
    - --throttle 毫秒 --randomize-throttle
     
#### adb shell monkey -p 包名 --throttle 毫秒 随机次数

```
执行随机100次事件，每次事件的间隔是5s

adb shell monkey -p com.ibox.calculators --throttle 5000 100
```

#### adb shell monkey -p 包名 --throttle 毫秒 --randomize-throttle 随机次数

```
执行100次随机事件，每次事件的间隔在0~5s之间不固定

adb shell monkey -p com.ibox.calculators --throttle 5000 --randomize-throttle 100
```

### 4、事件

### a：调整以下==事件==的百分比

- ==[--pct-touch PERCENT]== ：点击事件，down-up，0
- [--pct-motion PERCENT]：移动事件（直线滑动）,1
- ==[--pct-pinchzoom PERCENT]==：两指放缩手势（放大缩小），2
- [--pct-trackball PERCENT]：曲线滑动事件（不常用），3 
- ==--pct-rotation==：屏幕旋转，4
- [--pct-nav PERCENT]：导航事件（上下左右），5 
- [--pct-majornav PERCENT]：主要导航事件（中间键、回退键、菜单键），6
- ==[--pct-syskeys PERCENT]==：“系统”按键事件（Home、Back、Start Call、End Call、音量控制），7
- ==[--pct-appswitch PERCENT]==：APP切换事件，8 
- ==[--pct-flip PERCENT]==：==键盘唤出隐藏==，9
- [--pct-anyevent PERCENT]：跳转==除上面事件外==的其他事件 （点击其他在设备上不常用的按钮），10

备注：

```
flip
英 [flɪp]   美 [flɪp]  
vt.
轻弹，轻击;按（开关）;快速翻转;急挥
vi.
发疯;急动;捻;蹦蹦跳跳
n.
空翻;浏览;（射击时枪管的）跳跃;轻抛
adj.
[口语]无礼的，轻率的，油腔滑调的;冒失的，鲁莽的
```

### b：对指定事件 设置 随机执行的百分比

- #### adb shell monkey -p com.ibox.calculators ==事件名== 百分比 随机次数

```
touch事件执行1000次的10%，pinchzoom事件执行1000次的30%

adb shell monkey -p com.ibox.calculators --pct-touch 10 --pct-pinchzoom 30 1000

日志
// Seeded: 1499098873877
// Event percentages:
touch//   0: 10.0%
//   1: 7.2289157%
pinchzoom//   2: 30.0%
//   3: 10.843373%
//   4: -0.0%
//   5: 18.072289%
//   6: 10.843373%
//   7: 1.4457831%
//   8: 1.4457831%
//   9: 0.72289157%
//   10: 9.397591%
```

例:

- -p 包名：指定包名
- -s 1：记录随机顺序到编号1
- -v -v -v：日志 >打印到本地桌面
- --pct-touch 10：事件名 百分比
- 1000：随机数写在最后

```
adb shell monkey -p com.ibox.calculators -s 1 -v -v -v --pct-touch 50 1000 >C:\Users\Zhou\Desktop\pctLog.txt

日志
:Monkey: seed=1 count=1000
:AllowPackage: com.ibox.calculators
...
// Seeded: 1
// Event percentages:
touch//   0: 50.0%
//   1: 5.8823533%
//   2: 1.1764706%
//   3: 8.82353%
//   4: -0.0%
//   5: 14.705883%
//   6: 8.82353%
//   7: 1.1764706%
//   8: 1.1764706%
//   9: 0.5882353%
//   10: 7.647059%
```

### 5、日志查错

从Switch下面进行查询
- error
- exception
- ANR：Application Not Responding

## 练习

1、运行浏览器100次，将日志放到本地

- 定位浏览器APP包

```
adb shell dumpsys activity | find "mFocusedActivity" >C:\Users\Zho
u\Desktop\adbLogcat.txt

  mFocusedActivity: ActivityRecord{535ed344 u0 com.android.browser/.BrowserActivity}
```
- 运行浏览器100次，将日志放到本地
```
adb shell monkey -p com.android.browser -v -v -v 100 >C:\Users\Zho
u\Desktop\browserLog.txt

日志
:Monkey: seed=1499100210815 count=100
:AllowPackage: com.android.browser
...
```

2、运行浏览器100次，延时2秒，将日志放到本地

```
adb shell monkey -p com.android.browser --throttle 2000 -v -v -v 1
00 >C:\Users\Zhou\Desktop\browserLog.txt

日志
Sleeping for 2000 milliseconds
:Sending Touch (ACTION_DOWN): 0:(196.0,638.0)
:Sending Touch (ACTION_UP): 0:(193.71239,653.5318)
Sleeping for 2000 milliseconds
:Sending Touch (ACTION_DOWN): 0:(357.0,454.0)
:Sending Touch (ACTION_UP): 0:(360.0153,462.3423)
Sleeping for 2000 milliseconds
:Sending Key (ACTION_DOWN): 22    // KEYCODE_DPAD_RIGHT
:Sending Key (ACTION_UP): 22    // KEYCODE_DPAD_RIGHT
...
```

3、随机种子200，运行浏览器1000次，延时0到2秒

```
adb shell monkey -p com.android.browser -s 200 --throttle 2000 --r
andomize-throttle -v -v -v 1000 >C:\Users\Zhou\Desktop\browserLog.txt

日志
:Monkey: seed=200 count=1000
:AllowPackage: com.android.browser
...
Sleeping for 584 milliseconds
:Sending Key (ACTION_DOWN): 121    // KEYCODE_BREAK
:Sending Key (ACTION_UP): 121    // KEYCODE_BREAK
Sleeping for 1935 milliseconds
:Sending Key (ACTION_DOWN): 82    // KEYCODE_MENU
:Sending Key (ACTION_UP): 82    // KEYCODE_MENU
Sleeping for 1759 milliseconds
:Sending Touch (ACTION_DOWN): 0:(371.0,91.0)
:Sending Touch (ACTION_UP): 0:(386.46014,93.76733)
```

4、整机测试，不测试豌豆荚功能？，总共1000次

```
adb shell monkey -v -v -v 1000
```

5、对浏览器进行旋转压力测试2000次

```
adb shell monkey -p com.android.browser --pct-rotation 100 -v -v -v 2000 >C:\Users\Zhou\Desktop\browserLog.txt

日志
:Monkey: seed=1499101841721 count=2000
:AllowPackage: com.android.browser
...
// Seeded: 1499101841721
// Event percentages:
//   0: 0.0%
//   1: 0.0%
//   2: 0.0%
//   3: 0.0%
rotation//   4: 100.0%
//   5: 0.0%
//   6: 0.0%
//   7: 0.0%
//   8: 0.0%
//   9: 0.0%
//   10: 0.0%
```

6、对整机的应用开启测试，延时5秒，800次 测试墨迹天气APP，点击事件30%，其它事件70%，延时0到3秒，2000次

```
adb shell monkey --throttle 5000 -v -v -v 800
```

```
adb shell monkey -p com.moji.mjweather --pct-touch 30 --pct-anyevent 70 --throttle 3000 --randomize-throttle -v -v -v 2000
```





