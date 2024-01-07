---
author: YOUZAI
title: 环境搭建
date: 2023/05/10
categories:
 - 数据库安全
tags:
 - Redis
---

## 安装

安装包：

[https://github.com/tporadowski/redis/releases](https://github.com/tporadowski/redis/releases)

## 运行

```sh
redis-server.exe redis.windows.conf # 开启 redis 服务。
redis-cli.exe -h 127.0.0.1 -p 6379 # 连接 redis。
```

## 配置

```sh
config get config_name # 格式。
config get * # 获取全部配置。
config set config_name config_value # 设置配置项。
```
