大纲

- 录制 回放
- 常用函数介绍
- 优化脚本 关联设置 参数化设置
- 终极优化：集合点、事务提醒、思考时间

### 常用函数的用法：

- #### web_url：GET接口（打开一个网页或者是一个HTTP请求） 

```
//GET接口（打开一个网页或者是一个HTTP请求） 
web_url("WebTours", 
	"URL=http://127.0.0.1:1080/WebTours/",
	LAST);
```

- #### web_submit_data :提交数据

```
//提交数据
web_submit_form("login.pl",
	"Snapshot=t4.inf",
	ITEMDATA, //数据项
	"Name=username", "Value=cc", ENDITEM, //ENDITEM,本条数据结束
	"Name=password", "Value=cc", ENDITEM,
	"Name=login.x", "Value=55", ENDITEM,
	"Name=login.y", "Value=10", ENDITEM,
	LAST);
```

- #### web_add_cookie:添加COOKIE 

```
//添加COOKIE
web_add_cookie("Hm_lvt_19dd11b0519f0ce499da125c4156e320=1497015131; DOMAIN=120.76.42.189");
```

- #### lr_think_time:思考时间 

```
//思考时间//睡眠时间(s)
lr_think_time(6);
```

- #### web_custom_request：POST接口（允许创建一个自定义的HTTP请求与任何支持的HTTP 方法）

```
/////////////////////////////////////////////////////////////
web_url("file.html", "URL=http://lazarus/html/forms/file.html", 
    "TargetFrame=_TOP", LAST ); 

web_add_header("Content–Type", 
"multipart/form–data; boundary=–––––––––––––––––––––––––––292742461228954"); 

//POST接口（允许创建一个自定义的HTTP请求与任何支持的HTTP 方法）
web_custom_request("post_query.exe", "Method=POST", 
    "URL=http://lazarus/cgi–bin/post_query.exe", 
    "Body=–––––––––––––––––––––––––––––292742461228954\r\nContent–Disp" 
    "osition: form–data; name=\"entry\"\r\n\r\nText\r\n––––––––––" 
    "–––––––––––––––––––292742461228954\r\nContent–Disposition: f" 
    "–––––––––––292742461228954––\r\n", 
    "TargetFrame=", 
    LAST );
/////////////////////////////////////////////////////////////
```

- #### lr_output_message("token is %s", lr_eval_string("=={token}=="));
    - lr_eval_string("=={param}==")：取出参数{param}中的值，可嵌套在其他函数里使用 

```
//打印
//lr_eval_string("{param}")：取出参数{param}中的值，可嵌套在其他函数里使用
lr_output_message("token is %s", lr_eval_string("{token}"));
```

- #### web_set_max_html_param_len:设置返回值的最大长度

```
//设置返回值的最大长度
web_set_max_html_param_len("1024");
```

- #### web_reg_save_param:关联函数，一定要写在请求之前(如: web_submit_form)
    
```
//关联函数，一定要写在请求之前///////////////////////////////////
web_reg_save_param("outFlightVal", 
"LB=outboundFlight value=", "RB= checked >", LAST ); 

web_submit_form("reservations.pl", 
    "Snapshot=t4.inf", 
    ITEMDATA, 
    "Name=depart", "Value=London", ENDITEM, 
    "Name=departDate", "Value=11/20/2003", ENDITEM, 
    "Name=arrive", "Value=New York", ENDITEM, 
    "Name=returnDate", "Value=11/21/2003", ENDITEM, 
    "Name=numPassengers", "Value=1", ENDITEM, 
    "Name=roundtrip", "Value=<OFF>", ENDITEM, 
    "Name=seatPref", "Value=None", ENDITEM, 
    "Name=seatType", "Value=Coach", ENDITEM, 
    "Name=findFlights.x", "Value=83", ENDITEM, 
    "Name=findFlights.y", "Value=16", ENDITEM, 
    LAST ); 
///////////////////////////////////
```

[LR常用函数参考资料](http://www.cnblogs.com/hanxiaobei/p/5249278.html)

