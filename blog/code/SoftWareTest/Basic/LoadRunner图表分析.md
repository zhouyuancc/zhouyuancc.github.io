
# Summary Report

## Analysis Summary

- Maximum Running Vusers：最大并发数
- Total Throughput(bytes)：吞吐量：总共向服务器发起的请求书
- Average Throughput(bytes/second)：平均吞吐量：单位时间内服务器处理的请求数
- Total Hits：总点击量
- Average Hits per Seconds
- Total Errors

![LR0612场景Analysis14.png](http://upload-images.jianshu.io/upload_images/2897320-dbde00fd606d66fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### Transaction Summary：事务统计

- Average Response Time：平均响应时间

    - 单位：==毫秒（ms）==
    
    - Std. Deviation：[标准差](http://baike.baidu.com/link?url=dA0fR_sJ0Q5JTZ3Z68a1DBTnVBHJk-g3Nw4zWzlsHJ00I4jXsaXcshcKUoXQnWBN_AReBQBb47s84HKw5Q5v2OdgHcNXrZFDzymxeYtLCzKlE0IApycNC6p1EHW0VWf1)（方差是描述==一组数据偏离其平均值的情况==。从数字意义上看，方差==值越大==，这组数据就==越离散==，==波动性也越强==；方差==越小==，这组数据就==越聚合==，==波动性也就越小==）
    
    - 90 Percent：90%的响应时间在Report范围内（例：90%的响应时间为3.21秒，是指90%用户的响应时间小于3.21秒（并非是90%用户的平均响应时间），其他10%的用户响应时间大于3.21秒）
    - ==重点分析==：
        - Fail
        - 标准差==Std. Deviation==比较大的，且错误数==Fail==也比较多的        

### 输出结果，生成报告

- 生成==HTML==格式：Report -> HTML Report
- 生成==word==格式：Report -> New Report -> Generate

## Analysis

### 性能指标查看

- ==Transactions Per Second(TPS)==：每秒事务处理能力
- Troughput(bytes)：吞吐量
    - 总共向服务器发起的请求数
- Average Transaction Response Time：平均响应时间

- Hits Per Second：每秒点击数 -> 虚拟用户每秒向Web服务器提交的HTTP请求数，结合平均响应时间来看CPU消耗、内存是否溢出、硬盘IO情况

### 一、添加图表

Session Explorer -> Session1.lra - Graphs -> 右键 -> Add New Item -> Add New Graph...

![LoadRunnerAnalysis2加图表.png](http://upload-images.jianshu.io/upload_images/2897320-8e60fe6c041d879f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 添加错误数统计图

![LoadRunnerAnalysis3加错误数统计图.png](http://upload-images.jianshu.io/upload_images/2897320-424aeef388823b4c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![LoadRunnerAnalysis8.png](http://upload-images.jianshu.io/upload_images/2897320-445d419a834cebc6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 备注：

### 修改 ==脚本超时错误==

Vuser -> Run-time Settings -> Internrt Protocal - Preferences -> Options... -> ==HTTP-request connect timeout(sec)请求连接时间(s)/HTTP-request receive timeout(sec)请求接收时间(s) -> 默认120s修改为长时间12000或其它长时间== -> OK

#### 添加TPS统计图

![LoadRunnerAnalysis4加错TPS.png](http://upload-images.jianshu.io/upload_images/2897320-edc6930779f9b9db.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![LoadRunnerAnalysis9.png](http://upload-images.jianshu.io/upload_images/2897320-b8a1cbb4baa92b1d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### Web Page Diagnostics：页面分解图总（页面数据分析图：页面占用时间）

- #### Page Component Breakdown：页面组件细分

![LoadRunnerAnalysis5.png](http://upload-images.jianshu.io/upload_images/2897320-fdc2da9e9c6d4ffd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![LoadRunnerAnalysis10.png](http://upload-images.jianshu.io/upload_images/2897320-fcc615564ae04248.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- #### Page Download Time Breakdown：页面下载时间细分

![LoadRunnerAnalysis6.png](http://upload-images.jianshu.io/upload_images/2897320-81d4bc76e4f46fb8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![LoadRunnerAnalysis11.png](http://upload-images.jianshu.io/upload_images/2897320-be6c2cad602edc4f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 添加的图表

![LoadRunnerAnalysis7.png](http://upload-images.jianshu.io/upload_images/2897320-226b8c7086fc80d7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 二、融合图表进行查看

- #### 结合图表

#### 右键 -> Merge Graphs... -> Select graph to merge with选择 -> OK

![LoadRunnerAnalysis12Merge Graphs.png](http://upload-images.jianshu.io/upload_images/2897320-dcc177671a77bd3f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![LoadRunnerAnalysis13Merge Graphs.png](http://upload-images.jianshu.io/upload_images/2897320-12acfdefc9d87112.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- #### 即将merge的图表Hits per Second

![LoadRunnerAnalysis15HitsperSec.png](http://upload-images.jianshu.io/upload_images/2897320-929a135bec843190.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- #### merge后的图表TPS - HPS

![LoadRunnerAnalysis14Merge Graphs.png](http://upload-images.jianshu.io/upload_images/2897320-eab4e1d44e9b0de4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 三、Analysis逻辑顺序

一般的分析逻辑

#### 事务概览图：分析出哪些事务==占用的时间==比较多，==错误数==比较多。==定位==重点分析某个事务

- #### 错误数图标：
    - 确定是设置导致的错误，还是服务器出现了瓶颈

- #### Vuser 结合 TPS或吞吐量图表，进行查看：
    - 确定是脚本问题，还是服务器问题
 
- #### Web资源图：
    - 每秒点击数 结合 TPS/吞吐量，查看Web的资源问题，定位问题
 
- #### Web网页细分图：
    - 进一步确定是网络问题还是组件代码问题

#### 备注：

```
diagnostics
英 [ˌdaɪəg'nɒstɪks]   美 [ˌdaɪəg'nɒstɪks]  
n.
诊断学
```

#### 举例：（Hits per Second 与 TPS/吞吐量）

#### ==Hits per Second 与 TPS/吞吐量 应成正比==。但是，当点击率上升时，TPS却下降，bug根据 ==时间段、事务名== 进行定位，观察事务、观察时间段内 数据库、服务器、带宽等的异常情况

Spotlight：监测数据库（如：响应慢）

### 扩展

#### 每个图表的意思，每个图表结合的意思