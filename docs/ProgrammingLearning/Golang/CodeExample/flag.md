---
author: YOUZAI
title: 命令行参数
date: 2023/04/25
categories:
 - 编程学习
tags:
 - GoLang
---

## flag 包

> 标准格式

```go
func main() {
	ip := flag.String("ip", "127.0.0.1:8888", "设置IP") // 第一个参数设置参数名，第二个参数是指默认					值，第三个参数设置提示信息，调用后返回一个指针
	flag.Parse() // j
	fmt.Print(*ip)
}
```

> 代码实例

```go
package main

import (
    "flag"
    "fmt"
)

func main() {
    host := flag.String("host", "127.0.0.1", "请输入host地址")
    port := flag.Int("port", 3306, "请输入端口号")
    flag.Parse() // 解析参数
    fmt.Printf("%s:%d\n", *host, *port)
}
```
