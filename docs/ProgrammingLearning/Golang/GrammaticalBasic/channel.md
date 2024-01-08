---
author: YOUZAI
title: channel
date: 2023/06/20
categories:
 - 编程学习
tags:
 - GoLang
---

## channel

### 声明

```go
var ch chan int
var m map[string] chan bool
```

* 我们可以使用channel在两个或多个goroutine之间传递消息

`channel`是类型相关的。也就是说，一个`channel`只能传递`一种类型`的值，这个类型需要在声明 channel 时指定。

### 定义

* 使用内置的函数 make() 即可

```go
ch := make(chan int)
```

### 操作

* 向 channel 写入数据通常会导致程序阻塞，直到有其他 goroutine 从这个 channel 中读取数据

```go
// 将一个数据写入channel
ch <- value

// 从channel中读取数据
value := <-ch
```

### select

* 通过调用 select() 函数来监控一系列的文件句柄，一旦`其中一个`文件句柄发生了 IO 动作，该 select() 调用就会被返回

```go
select { 
    case <-chan1: 
    	// 如果chan1成功读到数据，则进行该case处理语句 
	case chan2 <- 1: 
    	// 如果成功向chan2写入数据，则进行该case处理语句 
	default: 
    	// 如果上面都没有成功，则进入default处理流程
}
```

每个`case`语句都必须是一个面向`channel`的操作。

### 缓冲机制

* 创建一个带缓冲的 channel

```go
c := make(chan int, 1024)
```

即使没有读取方，写入方也可以一直往 channel 里写入，在缓冲区被填完之前都不会阻塞。

* 读取 channel 里的数据

```go
for i := range c {
    fmt.Println("Received:", i)
}
```

### 超时机制

* Go 语言没有提供直接的超时处理机制，但可以利用 select 机制。

```go
// 首先，我们实现并执行一个匿名的超时等待函数。
timeout := make(chan bool, 1) 
go func() {
	time.Sleep(1e9) // 等待1秒钟。
    timeout <- true
}()

// 然后我们把 timeout 这个 channel 利用起来。
select { 
    case <-ch: 
    	// 从ch中读取到数据。
	case <-timeout: 
    	// 一直没有从 ch 中读取到数据，但从 timeout 中读取到了数据。
}
```

### 单向

* 将一个`channel`变量传递到一个函数时，可以通过将其指定为`单向channel`变量，从而限制该函数中可以对此`channel`的操作，比如只能往这个`channel`写，或者只能从这个`channel`读

声明

```go
var ch1 chan int // ch1 是一个正常的 channel，不是单向的。
var ch2 chan<- float64 // ch2 是单向 channel，只能用于写 float64 数据。
var ch3 <-chan int // ch3 是单向 channel，只能用于读取 int 数据。
```

初始化

```go
ch1 := make(chan int)
ch2 := <-chan int(ch1) // ch2 就是一个单向读取 channel。
ch3 := chan<- int(ch1) // ch2 就是一个单向写入 channel。
```

### 关闭

* 关闭 channel，使用内置函数`close()`

```go
close(ch)
```

## 通道

> 通道可用于两个 goroutine 之间通过传递一个指定类型的值来同步运行和通讯。操作符`<-`用于指定通道的方向，发送或接收。如果未指定方向，则为双向通道。

```go
ch <- v    // 把 v 发送到通道 ch。
v := <-ch  // 从 ch 接收数据并把值赋给 v。
```

声明一个通道很简单，使用 chan 关键字即可，通道在使用前必须先创建。

```go
ch := make(chan int)
```

带缓冲区的通道允许发送端的数据发送和接收端的数据获取处于异步状态，就是说发送端发送的数据可以放在缓冲区里面，可以等待接收端去获取数据，而不是立刻需要接收端去获取数据。

* 代码实例

```go
package main

import (
	"fmt"
)

func main() {
	ch := make(chan int, 1) // 设置缓冲区。
	select {
	case ch <- 0: // 随机向通道写入0或1。
	case ch <- 1:
	}
	i := <-ch
	fmt.Println(i)
}
```

go 可以通过 range 关键字遍历得到数据。

```go
v, ok := <-ch
```

关闭通道使用 close()，如果使用 range 关键字遍历 channel，不关闭的话，将会导致堵塞，range 函数不会结束。

```go
c := make(chan int, 10)
close(c)
```
