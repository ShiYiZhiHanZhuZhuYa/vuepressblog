---
author: YOUZAI
title: 加密相关
date: 2023/06/20
categories:
 - 编程学习
tags:
 - GoLang
---

## MD5 值

```go
import "crypto/md5"

str := "123456"  
data := []byte(str)  
has := md5.Sum(data)  
md5str1 := fmt.Sprintf("%x", has) //将 []byte 转成16进制。
fmt.Println(md5str1)
```

## 随机数

```go
import "math/rand"
rand.Seed(time.Now().UnixNano())  
t := rand.Intn(100000)  
str := fmt.Sprintf("%d",t)  
authStr := str+"%#"  
fmt.Print(authStr)
```

## 正则表达式

```go
import "regexp"
data := "abcd"
reg := regexp.MustCompile("ab(.*?)d")
if reg == nil {  
   fmt.Println("MustCompile err")  
   return  
}
results := reg.FindStringSubmatch(data) // 获取子表达式。
for _,result := range results {  
   fmt.Printf("结果是"+result+"\n")  
}

// 字符串切割。
s := result[1] // 获取子表达式。
a := strings.Split(s, ", ")  // 以", "作为分割点。
fmt.Print(a[1])
```

## JSON 解析

```go
request, err := http.NewRequest("POST", URL+configURL, bytes.NewBuffer(poc))
```
