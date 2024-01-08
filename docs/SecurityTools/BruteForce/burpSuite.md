---
author: YOUZAI
title: Burp Suite
date: 2023/06/21
iconE: /icons/burpSuite.svg
categories:
 - 暴力破解
tags:
 - 安全工具
---

## 暴力破解

![](/images/微信图片_20220901134606.png)

* sniper => 对单一变量进行一次破解。
* battering ram => 对多变量同时进行破解。
* pitchfork => 每一个变量标记对应一个字典，取每个字典的对应项，请求的数量取决于数量最少的字典。
* cluster bomb => 每个变量对应一个字典，并且进行交集破解，尝试各种组合。

### 验证码爆破

使用插件：

[https://github.com/f0ng/captcha-killer-modified](https://github.com/f0ng/captcha-killer-modified)

将获取验证码的 URL 发送至插件：

![](/images/微信图片_20220901135322.png)

对数据包进行重放，尝试获取验证码：

![](/images/微信图片_20220901135534.png)

在本地开启一个服务端：

```python
import argparse
import ddddocr # 导入 ddddocr
from aiohttp import web
import base64

parser = argparse.ArgumentParser()

parser.add_argument("-p", help="http port",default="8888")
args = parser.parse_args()
ocr = ddddocr.DdddOcr()
port = args.p

auth_base64 = "youzai" # 可自定义auth认证

async def handle_cb(request):
    if request.headers.get('Authorization') != 'Basic ' + auth_base64:
        return web.Response(text='Forbidden', status='403')
    print(await request.text())
    img_base64 = await request.text()
    img_bytes = base64.b64decode(img_base64)
    return web.Response(text=ocr.classification(img_bytes)[0:4])

app = web.Application()
app.add_routes([
    web.post('/reg', handle_cb),
])

if __name__ == '__main__':
    web.run_app(app, port=port)
```

![](/images/微信图片_20220901135742.png)

在验证码识别的接口中配置请求数据：

```http
POST /reg HTTP/1.1
Host: 127.0.0.1:8888
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:97.0) Gecko/20100101 Firefox/97.0
Authorization:Basic yozuai
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: keep-alive
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 8332

<@BASE64><@IMG_RAW></@IMG_RAW></@BASE64>
```

请求接口模板设置：

|ID|标签|描述|
|:-:|:-:|:-:|
|1|<@IMG_RAW><\/@IMG_RAW>|代表验证码图片原二进制内容|
|2|<@URLENCODE><\/@URLENCODE>|对标签内的内容进行 URL 编码|
|3|<@BASE64><\/@BASE64>|对标签内的内容进行 base64 编码|

![](/images/微信图片_20220901135911.png)

点击识别：

![](/images/微信图片_20220901135951.png)

可以在右侧看到识别的结果。

将需要爆破的数据包发送至 `Intruder` 模块，将需要爆破的参数配置好：

![](/images/微信图片_20220901140350.png)

其中，在验证码的 payload 中选择如下：

![](/images/微信图片_20220901140459.png)

验证码自动完成识别并替换成 payload：

![](/images/微信图片_20220901140619.png)

::: tip 提示

这种模式的验证码爆破比较适用于已知用户名，但是密码未知的情况，如果需要对用户名密码和验证码同时展开爆破，需要两个庞大的字典进行一一对应爆破。

:::

### Token 爆破

首先将模式调整为 `Pitchfork`：

![](/images/image-20220411140034618.png)

进入 `Grep - Extract`：

![](/images/image-20220411140159888.png)

选定首尾的范围：

![](/images/image-20220411140253368.png)

将线程数调整为 1：

![](/images/image-20220411140329279.png)