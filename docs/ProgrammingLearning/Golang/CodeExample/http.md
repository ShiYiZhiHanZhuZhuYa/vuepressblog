---
author: YOUZAI
title: HTTP请求
date: 2023/04/25
categories:
 - 编程学习
tags:
 - GoLang
---

## 代码实例

```go
package mainj

import (
	"crypto/tls"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
    "time"
)

func main() {
	urli := url.URL{}
	urlProxy, _ := urli.Parse("http://127.0.0.1:8888")
	cli := &http.Client{
		Transport: &http.Transport{
			Proxy:           http.ProxyURL(urlProxy),               // 设置代理
			TLSClientConfig: &tls.Config{InsecureSkipVerify: true}, // 取消证书认证
            ResponseHeaderTimeout: time.Second * 2,					// 设置超时时间
		},
	}

	request, err := http.NewRequest("GET", "https://www.bilibili.com/", nil)
	if err != nil {
		return
	}

	request.Header.Add("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.163 Safari/535.1")
	if resp, err := cli.Do(request); err != nil {
		return
	} else {
		defer resp.Body.Close()
		body, _ := ioutil.ReadAll(resp.Body)
		fmt.Println(string(body))
	}
}
```

## 取消重定向

```go
// 重写函数
func myCheckRedirect(req *(http.Request), via []*(http.Request)) error {
	return nil
}

cli := &http.Client{
		CheckRedirect: myCheckRedirect,
}
```
