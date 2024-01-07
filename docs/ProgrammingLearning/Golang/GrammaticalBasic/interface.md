---
author: YOUZAI
title: 接口
date: 2023/06/20
categories:
 - 编程学习
tags:
 - GoLang
---

## 接口

### 定义

```go
// 接口类型命名按照 er 结尾。
type talk interface {
	talk() string
}

// 只要实现了接口的类型都可以当作参数传入。
func shout(t talk) {
	fmt.Printf(t.talk())
}
```

### 赋值

接口赋值在 Go 语言中分为如下两种情况：

* 将对象实例赋值给接口。
* 将一个接口赋值给另一个接口。

**对象实例赋值给接口**

```go
type LessAdder interface { // 定义一个接口。
    Less(b Integer) bool 
    Add(b Integer)
}

type Integer int // 定义一个类型
func (a Integer) Less(b Integer) bool { //类型 Less() 方法。
    return a < b
}
func (a *Integer) Add(b Integer) { //类型 Add() 方法。
    *a += b
}

var a Integer = 1
var b LessAdder = &a
```

**接口赋值给接口**

接口赋值并不要求两个接口必须等价。如果接口`A`的方法列表是接口`B`的方法列表的子集， 那么接口`B`可以赋值给接口`A`。

```go
package one
type ReadWriter interface { 
    Read(buf []byte) (n int, err error) 
    Write(buf []byte) (n int, err error)
}

package two
type IStream interface { 
    Write(buf []byte) (n int, err error) 
    Read(buf []byte) (n int, err error)
}

var file1 two.IStream = new(File)
var file2 one.ReadWriter = file1
var file3 two.IStream = file2
```

### 查询

查询`file1`对象实例是否实现了`two.IStream`接口。

```go
var file1 Writer = ...
if file5, ok := file1.(two.IStream); ok {
    //...
}
```

* 代码实例

```go
package main

import (
	"fmt"
	"reflect"
)

type test1 struct{}
type test2 struct{}

func (test test1) call() {
	fmt.Print("test1-call")
}

func (test test2) call() {
	fmt.Print("test2-call")
}
func (test test2) talk() {
	fmt.Print("test1-talk")
}

type one interface {
	call()
}

type two interface {
	call()
	talk()
}

func main() {
	var test1 one = new(test1)
	var test2 two = new(test2)
	if test, ok := test2.(one); ok {
		fmt.Print(reflect.TypeOf(test), ok) // 通过反射查询变量类型。
		fmt.Print(test1)
	}
}
```
