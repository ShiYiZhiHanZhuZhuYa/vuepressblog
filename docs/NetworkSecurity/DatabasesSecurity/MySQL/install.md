---
author: YOUZAI
title: 环境搭建
date: 2023/05/10
categories:
 - 数据库安全
tags:
 - MySQL
---

## 下载

[https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)

## 初始化

在根目录下创建文件`my.ini`：

```ini
[client]
# 设置mysql客户端默认字符集
default-character-set=utf8
 
[mysqld]
# 设置3306端口
port = 3306
# 设置mysql的安装目录
basedir=D:\\MySQL\\mysql_5.7.40
# 设置 mysql数据库的数据的存放目录，MySQL 8+ 不需要以下配置，系统自己生成即可，否则有可能报错
datadir=D:\\MySQL\\mysql_5.7.40\\sqldata
# 允许最大连接数
max_connections=20
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
# 添加配置
explicit_defaults_for_timestamp=true
```

初始化数据库：

```shell
mysqld --initialize --console # 初始化数据库
```

## 安装

```shell
mysqld install # 安装数据库
```

::: tip 提示

记得将 mysql 加入环境变量中。

:::

## 启动

```shell
net start mysql # 启动 mysql 服务
net stop mysql # 停止 mysql 服务
```

## 修改密码

该方法适用于`5.7.x`版本。

```shell
mysql> set passowrd for root@localhost = password('lol111lol'); # 将 root 密码修改成 'lol111lol'
```
