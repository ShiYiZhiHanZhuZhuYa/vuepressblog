---
author: YOUZAI
title: 变量声明
date: 2023/06/20
categories:
 - 编程学习
tags:
 - GoLang
---

## 变量

### 声明

* 常用的声明方法

```go
var v1 int
var v2 string

var (
    v1 int
    v2 string
)
```

### 初始化

* 初始化时可指定数据类型，也可以不指定

```go
var v1 int = 10
var v1 = 10
v1 := 10 // 只能用于函数体内，不可用于全局变量的声明与赋值，且左侧的变量不应该被声明过，否则会导致编译错误。
```

### 赋值

* 先初始化，后赋值

```go
var v1 int
v1 = 10

var v2 int
v2 = 20

v1, v2 = v2, v1 // 交换变量的值。
```

### 匿名变量

* 在实际编程过程中，有些变量可能不需要，这时就可以使用`_`来获取不需要的变量

```go
func GetName() (firstName, lastName, nickName string) { 
    return "May", "Chan", "Chibi Maruko"
}

_, _, nickName := GetName()
```
