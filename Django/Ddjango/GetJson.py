# coding=utf-8
from django.http.response import HttpResponse
from django.shortcuts import render_to_response
import json

# 获取json
def getJson(request) :
    # 127.0.0.1:8000/getJson/
    # 序列化
    result = {}
    result['key1'] = "value1"
    result['key2'] = "value2"
    result = json.dumps(result)
    return HttpResponse(result, content_type='application/json;charset=utf-8')


# 登录的GET/POST方法
def login(request):
    if request.method == "POST":
        user = request.POST.get("user")
        psw = request.POST.get("psw")
        return HttpResponse(user)

    elif request.method == "GET":
        # http://127.0.0.1:8000/login/?user=user&psw=psw
        user = request.GET.get("user")
        psw = request.GET.get("psw")
        # 序列化
        result = {}
        result['user'] = user
        result['psw'] = psw
        result = json.dumps(result)
        #{"user": "user", "psw": "psw"}
        return HttpResponse(result, content_type='application/json;charset=utf-8')

    else:
        return render_to_response('index.html')



