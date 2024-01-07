---
author: YOUZAI
title: goroutine
date: 2023/06/20
categories:
 - 编程学习
tags:
 - GoLang
---

## goroutine

* goroutine 是 Go 语言中的轻量级线程实现，由 Go 运行时（runtime）管理

```go
func Add(x, y int) { 
    z := x + y 
    fmt.Println(z)
}

go Add(1, 1) // 并发执行
```

需要注意的是，如果这个函数有返回值，那么这个返回值会被丢弃。

## 并发

> 通过 go 关键字来开启 goroutine。

```go
package main

import (
        "fmt"
        "time"
)

func say(s string) {
        for i := 0; i < 5; i++ {
                time.Sleep(100 * time.Millisecond)
                fmt.Println(s)
        }
}

func main() {
        go say("world")
        say("hello")
}
```
