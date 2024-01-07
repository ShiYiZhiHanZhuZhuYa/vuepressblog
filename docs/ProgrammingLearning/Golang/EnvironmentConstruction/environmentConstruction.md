---
author: YOUZAI
title: 环境搭建
date: 2023/04/25
categories:
 - 编程学习
tags:
 - GoLang
---

## 下载安装包

[https://studygolang.com/dl](https://studygolang.com/dl)

## 配置环境变量

配置 GOPATH 和 GOROOT 配置 PATH。

![](/images/image-20211229090352995.png)

![](/images/image-20211229090425508.png)

## 基本指令

```go
go version // 查看版本号。
go env // 查看相关配置。
```

## 更改国内镜像

```go
// 开启 go module
go env -w GO111MODULE=on // Windows。
// 配置GOPROXY
go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/ //Windows。
// 取消验证包
go env -w GOSUMDB=off // Windows。
```

在 GOPATH 路径下新建三个文件夹：

|文件夹名|用途|
|:-|:-|
|`bin`|...|
|`pkg`|...|
|`src`|代码存放处|
