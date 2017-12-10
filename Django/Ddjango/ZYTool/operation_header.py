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
print cookie