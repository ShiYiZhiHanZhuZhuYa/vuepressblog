---
author: YOUZAI
title: 信息收集
date: 2023/06/20
categories:
 - Windows
tags:
 - 内网安全
---

## DMZ 区

隔离区，也称非军事化区。

![](/images/image20210430182025.png)

## 基本命令

### 收集基本信息

```shell
systeminfo 系统详细信息
net start 启动服务
tasklist 进程列表
schtasks 计划任务
```

### 了解接口信息

```shell
ipconfig /all 判断存在域-dns 通过查看是否存在主dns后缀查看是否在域环境里面
net view /domain 判断存在域
net time /domain 判断主域 原理是获取当前时间，而大多数情况时间是由域控同步的，所以会返回域控的主机名字
nslookup / ping 域控名 获取域控的IP地址
netstat -ano 当前网络端口开放情况
nslookup 域名解析
```

### 系统默认常见用户身份

```
Domain Admins：域管理员（默认对域控制器有完全控制权）
Domain Computers：域内机器
Domain Controllers：域控制器
Domain Guest：域访客，权限低
Domain Users：域用户
Enterprise Admins：企业系统管理用户（默认对域控制器有完全控制权）
```

### 相关用户收集操作命令

```shell
whoami /all 用户权限
net config workstation 登录信息
net user 本地用户
net localgroup 本地用户组
net user /domain 获取域用户信息
net group /domain 获取域用户组信息
wmic useraccout get /all 设计域用户详细信息
net group "Domain Admins" /domain 查询域管理员账户
net group "Enterprise Admins" /domain 查询管理员用户组
net group "Domain Controllers" /domain 查询域控制器
#收集域用户名方便以后渗透时对用户名密码进行爆破
```

### 凭据信息收集

* 计算机用户 HASH，明文获取-`mimikatz(win)`，`mimipenguin(linux)`
* 计算机各种协议服务口令获取-`LaZagne(all)`，`XenArmor(win)`

```shell
Netsh WLAN show profiles
Netsh WLAN show profile name="无线名称" key=clear
```

1. 站点源码备份文件，数据库备份文件等
2. 各类数据库 web 管理入口，如 phpmyadmin。
3. 浏览器保存密码，浏览器 cookies。
4. 其他用户会话，3389 和 ipc$ 连接记录，回收站内容。
5. Windows 保存的 WiFi 密码。
6. 网络内部的各种账号和密码，如：Email、VPN、FTP、OA 等。

### 探测域内存活主机及地址信息

```shell
for /L %I in (1,1,254) DO @ping -w 1 -n 1 192.168.3.%(扫描的网段) | findstr "TTL=" 
```

> 使用 nmap masscan 第三方 powershell 脚本`nishang` `empire`等。

nishang 使用：

* 导入模块

```shell
Import-Module .\nishang.psml
```

* 设置执行策略

```shell
Set-ExecutionPolicy RemoteSigned
```

* 获取模块 nishang 的命令函数

```shell
Get-Command -Module nishang
```

* 获取常规计算机信息

```shell
Get-Information
```

* 端口扫描（查看目录对应的文件）

```shell
Invoke-PortScan -StartAddress 192.168.3.0 -EndAddress 192.168.3.100 -ResolveHost -ScanPort
```

* 其他功能：删除补丁，反弹 shell，凭据获取等。

### 探针域内主机角色及服务信息

利用开放端口服务及计算机名判断：

1. 高级管理人员、系统管理员、财务/人事/业务人员的个人计算机
2. 产品管理系统服务器
3. 办公系统服务器
4. 财务应用系统服务器
5. 核心产品源码服务器（自建 svn、git）
6. 数据库服务器
7. 文件或网盘服务器、共享服务器
8. 电子邮件服务器
9. 网络监控系统服务器
10. 其他服务器（内部技术文档服务器、其他监控服务器等）