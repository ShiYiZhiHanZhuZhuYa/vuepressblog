---
author: YOUZAI
title: 类型转换
date: 2023/04/25
categories:
 - 编程学习
tags:
 - GoLang
---

## Go 字符串和整型之间转换

> string转成int

```go
int, err := strconv.Atoi(string)
```

> string转成int64

```go
int64, err := strconv.ParseInt(string, 10, 64)
```

> int转成string

```go
string := strconv.Itoa(int)
```

> int64转成string

```go
string := strconv.FormatInt(int64,10)
```
