---
author: YOUZAI
title: 结构体
date: 2023/06/20
categories:
 - 编程学习
tags:
 - GoLang
---

## 结构体

### 定义

```go
type Rect struct {
    x, y float64
    width, height float64
}

//成员方法
func (r *Rect) Area() float64 {
    return r.width * r.height
}
```

### 初始化

```go
rect1 := new(Rect)
rect2 := &Rect{}
```

在 Go 语言中，未进行显式初始化的变量都会被初始化为该类型的零值，例如 bool 类型的零值为 false，int 类型的零值为0，string 类型的零值为空字符串。

* Go 中也有方法，它是一种特殊的函数，定义于 struct 之上(与 struct 关联、绑定)，被称为 struct 的 receiver

```go
type person struct{ 
	name string 
	age int 
}

p1 := new(person)
p2 := person{}
// p1 是指针类型的 person 实例 p2 是值类型的 person 实例。
```

* 代码实例

```go
type test struct {
	name string
	age int
}
// 打印结构体
%v -->打印字段对应的值
%+v -->打印键值对

// 如果需要转换成 json 格式，则结构体中的变量名开头一定是大写。
// 给字段注明标签，使得 json 包在进行编码的时候能够按照标签里的样式修改字段名。
type test struct {
	name string `json:"studentname"`
	age int `json:"studentage"`
}

// struct 嵌入：只在结构体里声明类型，不声明字段名。
type test struct {
	name string
	message
}
type message struct {
	age int
}
```
