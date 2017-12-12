#coding:utf-8

import requests
import json

url = "http://m.imooc.com/passport/user/login"
data = {
    "username": "18513199586",
    "password": "111111",
    "verify": "",
    "referer": "https://m.imooc.com"
}

res = requests.post(url, data).json()
# print res['data']
# {u'url': [u'http://www.imooc.com/user/ssologin?token=4wT-5T1A4tlIZ47FiJwKr1jUJA7XsE3dxiiYgxKnZxW3rjrmDlXWyHFXjeNpwf7g-vMOAe7RKhBEcl7UbH8ReElDAyZ31AowY-jFlmtJReSLh1LDAuhuKnirWaLActLGXCraBWH9up8tOU6VFa7f77EgXgY1B6DcxIgPt5CFBjMt4dFw6GrVSFzKKtpn78EY_ks9nGw_Sdf8KxSJwx74XetzEkxiW4uWaxC5gev0UGrAzg5jGlJ0pm-c-W9KVjN6-v2crjPnCt', u'http://coding.imooc.com/user/ssologin?token=UsQqYuGR74TCG9IJ8Nic96RIAu1_Y0-ABt0ZoyTMmfZI6ljr-xgkqF-uSLKbASPMJx7UQrs4FfAqcdr4AJnAelEvr4vuTudLu6BcikXhonjDC_65JbUspzvVmSA9ZNOpquD1hBCJjNom5xJooXNoXkYBVQqSPvXE6MoDRaStWcZqGdZK2138qRZvnYy6yMseFw1BxYd5kFCzC8xXJuLlkf9Ppy4uCK2_JBySE7L_ro8T5tA5suQBJaAVXhSQeo22-xF9VizeSBmbktp6']
# , u'userInfo': {u'uid': u'5249191'}}
# print res['data']['url'][0]
# http://www.imooc.com/user/ssologin?token=4wT-5T1A4tlIZ47FiJwKr1jUJA7XsE3dxiiYgxKnZxW3rjrmDlXWyHFXjeNpwf7g-vMOAe7RKhBEcl7UbH8ReElDAyZ31AowY-jFlmtJReSLh1LDAuhuKnirWaLActLGXCraBWH9up8tOU6VFa7f77EgXgY1B6DcxIgPt5CFBjMt4dFw6GrVSFzKKtpn78EY_ks9nGw_Sdf8KxSJwx74XetzEkxiW4uWaxC5gev0UGrAzg5jGlJ0pm-c-W9KVjN6-v2crjPnCt

response_url = res['data']['url'][0]
request_url = response_url + "&callback=jQuery21008240514814031887_1508666806688&_=1508666806689"
cookie = requests.get(request_url).cookies
# print cookie
# <RequestsCookieJar[<Cookie apsid=M5M2Q3YzBkOGVjYzdkYzE3OTM4M2IwYzIwYjRkMWYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANTI0OTE5MQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADc2NjMyNGI4OWE3MWMzNDMxMDFhOTczMTMxZWY0NTk0LpV%2BWi6Vflo%3DMG for .imooc.com/>, <Cookie cvde=5a2f952e436dd-1 for .imooc.com/>, <Cookie imooc_isnew=1 for .imooc.com/>, <Cookie imooc_isnew_ct=1513067822 for .imooc.com/>, <Cookie imooc_uuid=e816328e-3428-4ba4-b55f-7b0725d35bd6 for .imooc.com/>, <Cookie loginstate=1 for .imooc.com/>, <Cookie PHPSESSID=1qunbuud8ln47gun0hu7808qa5 for www.imooc.com/>]>

# cookiejar类型 转换成 dict字典
cookie = requests.utils.dict_from_cookiejar(cookie)
# print cookie
# {'loginstate': '1', 'apsid': 'M5M2Q3YzBkOGVjYzdkYzE3OTM4M2IwYzIwYjRkMWYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANTI0OTE5MQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADc2NjMyNGI4OWE3MWMzNDMxMDFhOTczMTMxZWY0NTk0LpV%2BWi6Vflo%3DMG', 'imooc_isnew_ct': '1513067822', 'cvde': '5a2f952e436dd-1', 'imooc_isnew': '1', 'PHPSESSID': '1qunbuud8ln47gun0hu7808qa5', 'imooc_uuid': 'e816328e-3428-4ba4-b55f-7b0725d35bd6'}
# 拿到cookie
print cookie['apsid']
# M5M2Q3YzBkOGVjYzdkYzE3OTM4M2IwYzIwYjRkMWYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANTI0OTE5MQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGJkYmQyNWYwNDQ2ZjQ4ZThlYmI2YjdmZmVmZTllMmEwhpV%2BWoaVflo%3DMG

url1 = "http://baidu.com"
print requests.get(url = url1, cookies = cookie).text





