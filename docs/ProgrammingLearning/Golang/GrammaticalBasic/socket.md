---
author: YOUZAI
title: socket
date: 2023/06/20
categories:
 - 编程学习
tags:
 - GoLang
---

## Socket

### Dial() 函数

* Dial() 函数原型

```go
func Dial(net, addr string) (Conn, error)
```

其中`net`参数是网络协议的名字，`addr`参数是 IP 地址或域名，而端口号以`:`的形式跟随在地址或域名的后面，端口号可选。如果连接成功，返回连接对象，否则返回`error`。

* 一些常见协议的调用方法

**TCP 链接**

```go
conn, err := net.Dial("tcp", "192.168.0.10:2100")
```

**UDP 链接**

```go
conn, err := net.Dial("udp", "192.168.0.12:975")
```

**ICMP 链接（使用协议名称）**

```go
conn, err := net.Dial("ip4:icmp", "www.baidu.com")
```

**ICMP 链接（使用协议编号）**

```go
conn, err := net.Dial("ip4:1", "10.0.0.3")
```

> Dial()函数支持如下几种网络协议："tcp"、"tcp4"（仅限IPv4）、"tcp6"（仅限IPv6）、"udp"、"udp4"（仅限IPv4）、"udp6"（仅限IPv6）、"ip"、"ip4"（仅限IPv4）和"ip6" （仅限IPv6）。

## 网络编程

```go
// Dial() 函数的原型如下：
func Dial(net, addr string) (Conn, error)
// 其中 net 参数是网络协议的名字，addr 参数是 IP 地址或域名，而端口号以“:”的形式跟随在地址或域名的后面，端口号可选。如果连接成功，返回连接对象，否则返回 error。

// tcp 链接
conn, err := net.Dial("tcp", "192.168.0.10:2100")

// udp 链接
conn, err := net.Dial("udp", "192.168.0.12:975")

// ICMP 链接（使用协议名称）
conn, err := net.Dial("ip4:icmp", "www.baidu.com")

// ICMP 链接（使用协议编号）
conn, err := net.Dial("ip4:1", "10.0.0.3")
```