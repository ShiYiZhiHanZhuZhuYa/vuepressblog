---
author: YOUZAI
title: 方法声明
date: 2023/06/20
categories:
 - 编程学习
tags:
 - GoLang
---

## 方法

* 面向对象与面向过程比较

```go
type Integer int
func main(){
    var a Integer = 1
    // ...
}

func (a Integer) Less(b Integer) bool { // 面向对象。
    return a < b 
}

func Integer_Less(a Integer, b Integer) bool { // 面向过程。
    return a < b
}

a.Less(2) // 面向对象的用法。
Integer_Less(a, 2) // 面向过程的用法。
```

* 代码实例

```go
package main

import (
	"fmt"
)

type Dog struct{}

type Animal interface {
	call()
}

func (dog Dog) call() { //将方法绑定在对象上。
	fmt.Println("小狗叫")
}

func main() {
	var animal Animal

	animal = new(Dog)

	animal.call()
}
```
