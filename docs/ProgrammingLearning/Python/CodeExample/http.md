---
author: YOUZAI
title: HTTP 请求
date: 2023/04/25
categories:
 - 编程学习
tags:
 - Python
---

## 安装
```shell
pip install requests
```

## http
```python
import requests

payload = {'keys1':'value1', 'keys2':'value2'} # 参数列表
payload_json = {'some':'data'} # json数据
#添加cookies
jar = requests.cookies.RequestsCookieJar()
jar.set('tasty_cookie', 'yum', domain='httpbin.org', path='/cookies')
jar.set('gross_cookie', 'blech', domain='httpbin.org', path='/elsewhere')
# 自定义响应头
headers = { 
	'User-Agent':'...',
	'Content-Type':'...'
}

r = resquests.get("www.baidu.com", params=payload, headers=headers, cookies=jar, timeout=1) # 发送get请求，params为请求参数，timeout为超时时间
r = requests.post("www.baidu.com", data=json.dumps(payload), headers=headers, json=payload_json, verify=False) # 发送post请求，data为请求参数

url = r.url # 请求的url
text = r.text # 响应体的文本内容，requests会自动推测编码
content = r.content # 响应体的二进制内容
json = r.json() # 响应体中的json内容
code = r.status_code # 响应状态码
```

## 代理设置报错
```python
import urllib3

requests.packages.urllib3.disable_warnings() #在请求之前添加
```