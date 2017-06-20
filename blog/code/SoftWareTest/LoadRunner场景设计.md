
# Controller性能测试的指挥中心

## Controller整体界面功能

### 一、创建Controller Scenario...

- 方法一

![LR0612场景1.png](http://upload-images.jianshu.io/upload_images/2897320-486544bf27e2f140.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 方法二

![LR0612场景2.png](http://upload-images.jianshu.io/upload_images/2897320-b8dd18788f676838.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- Manual Scenario：手工场景

[use the percentage mode to distribute the Vusers among the scripts](http://www.cnblogs.com/fnng/archive/2013/03/12/2956765.html)

![LR0612场景3.png](http://upload-images.jianshu.io/upload_images/2897320-a4b2133d517c8cd5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 二、压力机

- #### 1、创建压力机

![LR0612场景压力机.png](http://upload-images.jianshu.io/upload_images/2897320-43949598a5949601.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- #### 2、点击Connect，Status变成Ready

![LR0612场景压力机2.png](http://upload-images.jianshu.io/upload_images/2897320-4e935519d9b1b63b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 二、启动设置

- #### 双击Start Vusers行，Edit Action

![LR0612场景startVusers5.png](http://upload-images.jianshu.io/upload_images/2897320-babb9cff84e6d18c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

- #### 有集合点时，下面两个区别不大
    - #### Simultaneously：瞬间启动10个用户
    - #### 每隔5秒启动2个用户（启动时间5s*(10/2)=25s）

![LR0612场景startVusers4.png](http://upload-images.jianshu.io/upload_images/2897320-f212c55ed452739e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 三、持续时间设置

- #### 双击Duration行，Edit Action

![LR0612场景Duration6.png](http://upload-images.jianshu.io/upload_images/2897320-181441eacfe80bda.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- #### Run until completion：Run完成就结束，不走Stop Vusers，不执行脚本里vuser_end

![LR0612场景7.png](http://upload-images.jianshu.io/upload_images/2897320-b1d3adc7faed8c9b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

备注：

```
schedule 英[ˈʃedju:l] 美[ˈskedʒu:l]
n.	时刻表，进度表; 清单，明细表; 预定计划; 目录;
vt.	排定，安排; 将…列表; 为…作目录;
```

### 四、Run：施加压力

- #### 1、Start Scenario

![LR0612场景8.png](http://upload-images.jianshu.io/upload_images/2897320-ae3750ef58a5f4ee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- #### 2、Stop 
- #### 2.1、在Run标签下查看Error

![LR0612场景9.png](http://upload-images.jianshu.io/upload_images/2897320-b3f8c2dc8f3c8834.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- #### 2.2、点击Error，双击Sample Message Test，查看Detail Message Text

![LR0612场景10.png](http://upload-images.jianshu.io/upload_images/2897320-9e0d8f4ab64980b9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3、修复脚本后执行的结果

![LR0612场景11.png](http://upload-images.jianshu.io/upload_images/2897320-452219e333284d43.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 五、Anylyze Results：分析结果

- #### 1、点击Result -> Analyze Results

![LR0612场景12.png](http://upload-images.jianshu.io/upload_images/2897320-f6f17102214ce696.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- #### 2、打开如下界面

![LR0612场景Analysis13.png](http://upload-images.jianshu.io/upload_images/2897320-36951bbbb6950082.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- #### 3、界面详解

#### Summary Report

![LR0612场景Analysis14.png](http://upload-images.jianshu.io/upload_images/2897320-dbde00fd606d66fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 平均响应时间
    - Std. Deviation：[标准差](http://baike.baidu.com/link?url=dA0fR_sJ0Q5JTZ3Z68a1DBTnVBHJk-g3Nw4zWzlsHJ00I4jXsaXcshcKUoXQnWBN_AReBQBb47s84HKw5Q5v2OdgHcNXrZFDzymxeYtLCzKlE0IApycNC6p1EHW0VWf1)
    - 90 Percent：例：90%的响应时间为3.21秒，是指90%用户的响应时间小于3.21秒（并非是90%用户的平均响应时间），其他10%的用户响应时间大于3.21秒。

#### 查看HTTP Responses Summary

![LR0612场景Analysis15.png](http://upload-images.jianshu.io/upload_images/2897320-beeec41d79ca2e3d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 点击上图HTTP 404，展示HTTP Responses per Second

![LR0612场景Analysis16.png](http://upload-images.jianshu.io/upload_images/2897320-c91d78426f089a74.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
