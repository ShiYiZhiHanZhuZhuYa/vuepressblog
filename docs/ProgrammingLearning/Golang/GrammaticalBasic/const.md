---
author: YOUZAI
title: 常量声明
date: 2023/06/20
categories:
 - 编程学习
tags:
 - GoLang
---

## 常量

### 定义

```go
const Pi float64 = 3.1415926
const zero = 0.0

const (
    size int64 = 1024
    eof = -1
)

const mask = 1 << 3 // 常量定义的右值也可以是一个在编译期运算的常量表达式，由于常量的赋值是一个编译期行为，所以右值不能出现任何需要运行期才能得出结果的表达。
```

::: warning

常量一旦被定义后就不能被修改。

:::

### 预定义常量

* Go 语言预定义了这些常量：`true` `false` `iota`

`iota`比较特殊，可以被认为是一个可被编译器修改的常量，在每一个`const`关键字出现时被重置为0，然后在下一个 const 出现之前，每出现一次 iota，其所代表的数字会自动增1。

```go
const (		  // iota 被重设为0。
	c0 = iota // c0 == 0
 	c1 = iota // c1 == 1
    c2 = iota // c2 == 2
)

const x = iota // x == 0 (因为 iota 又被重设为0了)。
const y = iota // y == 0 (同上)。
```

### 枚举

* 以==大写字母==开头的常量在包外可见

```go
const (
	Sunday = iota 
    Monday
    Tuesday
    Wednesday
    Thursday
    Friday
    Saturda
	numberOfDays // 这个常量没有导出。
)
```
