---
author: YOUZAI
title: JSFinder
date: 2023/06/21
categories:
 - 脚本探测
tags:
 - 安全工具
---

## 简介

JSFinder 是一款用作快速在网站的 JS 文件中提取 URL，子域名的工具。

## 下载

[https://github.com/Threezh1/JSFinder](https://github.com/Threezh1/JSFinder)

## 使用

* 简单爬取

```sh
python JSFinder.py -u http://www.example.com
```

这个命令会爬取 ==http://www.example.com== 这单个页面的所有的 JS 链接，并在其中发现 URL 和子域名。

* 深度爬取

```sh
python JSFinder.py -u http://www.example.com -d
```

> 深入一层页面爬取 JS，时间会消耗的更长。

建议使用 -ou 和 -os 来指定保存 URL 和子域名的文件名。例如：

```sh
python JSFinder.py -u http://www.example.com -d -ou example_url.txt -os example_subdomain.txt # -ou 保存的 URL 文件，-os 保存的域名文件。
```

* 批量爬取

指定 URL：

```sh
python JSFinder.py -f text.txt
```

指定 JS：

```sh
python JSFinder.py -f text.txt -j
```

指定 cookie：

```sh
python JSFinder.py -u http://www.example.com -c "session=xxx"
```

::: warning 注意

* URL 不需要加引号。
* 指定 JS 文件的时候，返回的 URL 为相对 URL。
* 指定 URL 文件爬取的时候，返回的相对 URL 都会以指定的第一个链接的域名作为其域名来转化为绝对 URL。

:::