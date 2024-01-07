---
author: YOUZAI
title: Masscan
date: 2023/06/21
categories:
 - 端口扫描
tags:
 - 安全工具
---

## 简介

Masscan 是为了尽可能快地扫描整个互联网而创建的，最大的优势大概在于其性能方面的优势，理论上其可以每秒钟发送 2500 万个探测数据包。

## 下载

[https://github.com/robertdavidgraham/masscan](https://github.com/robertdavidgraham/masscan)

## 使用

### 单个端口扫描

* 扫描443端口的 B 类子网

```sh
masscan 10.23.19.214/16 -p443
```

### 多个端口扫描

```sh
masscan 10.23.19.214/16 -p80,443
```

### 范围端口扫描

```sh
masscan 10.23.19.214/16 -p22-25
```

### 快速扫描

默认情况下，Masscan 扫描速度为每秒100个数据包，这是相当慢的。为了增加这一点，只需提供该`-rate`选项并指定一个值。

```sh
masscan 10.23.19.214/16 --ports 0-100 --rate 100000 # 扫描100个常见端口的 B 类子网，每秒100,000个数据包。
```

但是你可以扫描的速度取决于很多因素，包括您的操作系统（Linux扫描扫描远远快于Windows），系统的资源，最重要的是您的带宽。为了以高速扫描非常大的网络，您需要使用百万以上的速率（--rate 1000000）。

### 结果保存

```sh
masscan 10.23.19.214/16 -p22-25 -oX test.xml --rate 10000
masscan 10.23.19.214/16 -p22-25 --rate 10000 > port.txt
```

* -oX filename：输出到 filename 的 XML。
* -oG filename：输出到 filename 在的 grepable 格式。
* -oJ filename：输出到 filename 在 JSON 格式。

### 排除扫描

```sh
masscan 10.23.19.214/16 -p80 --excludefile exclude.txt
```

::: tip 技巧

Masscan 有一个独特的功能是，可以轻松地暂停和恢复扫描。当按<kbd>Ctrl</kbd>+<kbd>C</kbd>文件被创建时，调用 paused.conf 该文件具有扫描的所有设置和进度。可以继续扫描 ‐‐resume paused.conf。

:::

![](/images/2516340-20211006220523080-891044698.png)