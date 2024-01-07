---
author: YOUZAI
title: sync
date: 2023/06/20
categories:
 - 编程学习
tags:
 - GoLang
---

## 同步

### 同步锁

* Go 语言包中的 sync 包提供了两种锁类型：`sync.Mutex`和`sync.RWMutex`

`Mutex`是最简单的一种锁类型，同时也比较暴力，当一个`goroutine`获得了`Mutex`后，其他 goroutine 就只能乖乖等到这个`goroutine`释放该`Mutex`。`RWMutex`相对友好些，是经典的`单写多读`模型。在读锁占用的情下，会阻止写，但不阻止读，也就是多个`goroutine`可同时获取读锁（调用`RLock()`方法；而写锁（调用`Lock()`方法）会阻止任何其他`goroutine`（无论读和写）进来，整个锁相当于由该`goroutine`独占。

```go
type RWMutex struct {
    w Mutex
    writerSem uint32
    readerSem uint32
	readerCount int32
    readerWait int32
}
```

锁的经典模型使用。

```go
var l sync.Mutex
func foo() { 
    l.Lock()
	defer l.Unlock() 
    //...
}
```

### 全局唯一性

* 对于从全局的角度只需要运行一次的代码，比如全局初始化操作，Go语言提供了一个`Once`类型来保证全局的唯一性操作

```go
var a string
var once sync.Once

func setup() {
	a = "hello, world" 
}

func doprint() {
    once.Do(setup)
    print(a)
}

func twoprint() {
    go doprint()
    go doprint()
}
```

`once`的`Do()`方法可以保证在全局范围内只调用指定的函数一次
