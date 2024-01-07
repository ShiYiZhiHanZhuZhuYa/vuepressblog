---
author: YOUZAI
title: 基础知识
date: 2023/05/10
categories:
 - 数据库安全
tags:
 - MSSQL
---

## 基础

### 系统自带库

|系统级自带库|功能|
|:-|:-|
|master|系统控制数据库，包含所有配置信息，用户登录信息，当前系统运行情况|
|model|模板数据库，数据库时建立所有数据库的模板|
|tempdb|临时容器，保存所有的临时表，存储过程和其他程序交互的临时文件|
|msdb|主要为用户使用，记录着计划信息、事件处理信息、数据备份、警告以及异常信息|

### 系统视图表

|视图表|功能|
|:-|:-|
|sysobjects|记录了数据库中所有表，常用字段为 id、name和xtype|
|syscolumns|记录了数据库中所有表的字段，常用字段为id、name 和 xtype|
|**sys.databases**|SQL Server 中所有的数据库|
|**information_schema.tables**|当前用户数据库的表|
|**information_schema.columns** |当前用户数据库的列|
|sys.sql_logins|SQL Server 中所有的登录名|
|sys.all_columns|用户定义和系统对象的所有列的联合|
|sys.database_principals|数据库中每个权限或列异常权限|
|sys.database_files|存储在数据库中数据库文件|

### 服务器角色

|固定服务器角色|说明|
|:-|:-|
|**sysadmin(最高服务器角色)**|**执行SQL Server中的任何动作**|
|serveradmin|配置服务器设置|
|setupadmin|安装复制和管理扩展过程|
|securityadmin|管理登陆和CREATE DATABASE的权限以及阅读审计|
|processadmin|管理SQL Server进程|
|dbcreator|管理和修改数据库|
|diskadmin|管理磁盘文件|

判断是否是最高服务器角色：

```sql
and 1=(select is_srvrolemember('sysadmin'))--+
```

### 数据库角色

|固定数据库角色|说明|
|:-|:-|
|**db_owner(最高数据库角色)**|可以执行数据库中技术所有动作的用户|
|db_accessadmin|可以添加、删除用户的用户|
|db_datareader|可以查看所有数据库中用户表内数据的用户|
|db_datawriter|可以添加、修改或删除所有数据库中用户表内数据的用户|
|db_ddladmin|可以再数据库中执行所有DDL操作的用户|
|db_securityadmin|可以管理数据库中与安全权限有关所有动作的用户|
|db_backoperator|可以备份数据库的用户|
|db_denydatareader|不能看到数据库中任何数据的用户|
|db_denydatawriter|不能改变数据库中任何数据的用户|

判断是否是最高数据库角色：

```sql
and 1=(select is_member('db_owner'))--+
```