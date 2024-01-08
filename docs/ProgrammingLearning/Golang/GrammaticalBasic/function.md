---
author: YOUZAI
title: 函数声明
date: 2023/06/20
categories:
 - 编程学习
tags:
 - GoLang
---

## 函数

### 定义

* Go 语言中，函数的基本组成为：关键字`func`、函数名、参数列表、返回值、函数体和返回语句

```go
package mymath 
import "errors"
func Add(a int, b int) (ret int, err error) { 
	if a < 0 || b < 0 { 
		// 假设这个函数只支持两个非负数字的加法。
		err= errors.New("Should be non-negative numbers!") 
		return
		} 
	return a + b, nil 
}

// 如果参数列表中若干个相邻的参数类型的相同，比如上面例子中的 a 和 b，则可以在参数列表中省略前面变量的类型声明。
func Add(a, b int)(ret int, err error) { 
	// ...
}

// 如果返回值列表中多个返回值的类型相同，也可以用同样的方式合并。
func Add(a, b int) int { 
	// ...
}

// 将函数赋值给变量。
type test float64
func myFun() test {
	return 0
}
a := myFun() // 赋值形式1。
var a fun() test // 赋值形式2。
a() // 调用函数。
```

### 调用

```go
import "mymath"

c := mymath.Add(1, 2)
```

::: danger

小写字母开头的函数只在本包内可见，大写字母开头的函数才能被其他包使用。这个规则也适用于类型和变量的可见性。

:::

### 不定参数

* 不定参数是指函数传入的参数个数为不定数量

首先需要将函数定义为接受不定参数类型。

```go
func myfunc(args ...int) { 
	for _, arg := range args { 
	fmt.Println(arg)
	} 
}
// 函数myfunc()接受不定数量的参数，这些参数的类型全部是int，它可以用如下方式调用：
myfunc(2, 3, 4) 
myfunc(1, 3, 7, 13)
```

形如`...type`格式的类型只能作为函数的参数类型存在，并且必须是最后一个参数。

如果希望传任意类型，可以指定类型为`interface{}`，用`interface{}`传递任意类型数据是Go语言的惯例用法。

```go
func Printf(format string, args ...interface{}) { 
	// ...
}
```

### 匿名函数

* 匿名函数由一个不带函数名的函数声明和函数体组成，可以直接赋值给一个变量或者直接执行

```go
func(a, b int, z float64) bool { 
	return a*b <int(z)
}

f := func(x, y int) int { 
	return x + y
}

func(ch chan int) { 
	ch <- ACK
} (reply_chan) // 花括号后直接跟参数列表表示声明完这个函数后直接就(有参数传参数)调用。

func(age int) {
    fmt.Println(age, "岁")
}(10)
```

### 闭包

```go
package main

import ( 
	"fmt"
)

func main() { 
	var j int = 5
	a := func()(func()) { 
		var i int = 10 
		return func() {
			fmt.Printf("i, j: %d, %d\n", i, j) 
		}
	}()
	a()
	j *= 2 
	a()
}
```

在上面的例子中，变量 a 指向的闭包函数引用了局部变量 i 和 j，i的值被隔离，在闭包外不能被修改，改变j的值以后，再次调用 a，发现结果是修改过的值。在变量 a 指向的闭包函数中，只有内部的匿名函数才能访问变量 i，而无法通过其他途径访问到，因此保证了 i 的安全性。

### 错误处理

* Go 语言引入了一个关于错误处理的标准模式，即 error 接口

```go
type error interface {
    Error() string
}
```

对于大多数函数，如果要返回错误，大致上都可以定义为如下模式，将 error 作为多种返回 值中的最后一个，但这并非是强制要求。

```go
func Foo(param int)(n int, err error) {
	// ...
}
```

调用时的代码建议按如下方式处理错误情况。

```go
n, err := Foo(0)
if err != nil {
	// 错误处理
} else {
	// 使用返回值n
}
```

### 自定义 error 类型

```go
type PathError struct { 
    Op string
	Path string 
    Err error
}

func (e *PathError) Error() string { // 实现Error方法，将该方法绑定该类。
    return e.Op + " " + e.Path + ": " + e.Err.Error()
}
```

### defer 关键字

* 如果一个函数使用了`defer`关键字，那么就会等主函数中所有程序执行完，再执行这个函数内的程序

```go
func CopyFile(dstName, srcName string) (written int64, err error) {
    src, err := os.Open(srcName)
    if err != nil {
    	return
    }
    defer src.Close()

    dst, err := os.Create(dstName)
    if err != nil {
    	return
    }
    defer dst.Close()

    return io.Copy(dst, src)
}
```

当出现多个`defer`时，按照`先进后出`的原则，最先被`defer`的最后执行
