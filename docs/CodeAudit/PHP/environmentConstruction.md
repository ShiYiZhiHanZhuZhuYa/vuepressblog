---
author: YOUZAI
title: 环境搭建
date: 2023/04/25
categories:
 - 代码审计
tags:
 - PHP
---

## 调试环境

PHPStorm + PhpStudy + xdebug 插件

## 配置过程

下载 PhpStudy，修改 php 版本的配置。

![](/images/image20221102113252.png)

手动修改 `php.ini` 文件，配置远程连接。

![](/images/image20221102113425.png)

`php.ini`

```ini
[Xdebug]
zend_extension=D:/PhpStudy/phpstudy_pro/Extensions/php/php7.3.4nts/ext/php_xdebug.dll
xdebug.collect_params=1
xdebug.collect_return=1
xdebug.auto_trace=Off
xdebug.trace_output_dir=D:/PhpStudy/phpstudy_pro/Extensions/php_log/php7.3.4nts.xdebug.trace
xdebug.profiler_enable=Off
xdebug.profiler_output_dir=D:/PhpStudy/phpstudy_pro/Extensions/php_log/php7.3.4nts.xdebug.profiler
xdebug.remote_enable=On
xdebug.remote_host=127.0.0.1
xdebug.remote_port=2333
xdebug.remote_handler=dbgp
xdebug.remote_autostart=off # 如果设置为 on，则不管浏览器插件是 debug 还是 disable 都会发送调试请求
xdebug.idekey="PHPSTORM"
xdebug.mode="debug"
; xdebug.remote_connect_back=1
; xdebug.client_host=127.0.0.1
; xdebug.client_port=9000
```

xdebug 插件下载：

https://xdebug.org/wizard

将输出的 `phpinfo()` 信息复制到里面，判断适合的版本信息：

![](/images/image20221102113731.png)

![](/images/image20221102113748.png)

按照指引配置，或者直接使用 PhpStudy 里面的配置即可。

::: tip 提示

PhpStudy 中自带了 xdebug，可直接使用。

:::

* PHPStorm 配置

创建一个服务器：

![](/images/image20221102114021.png)

修改调试端口，注意调试端口要和 `php.ini` 中的 `xdebug.remote_port=2333` 端口相同。

![](/images/image20221102114108.png)

验证配置：

![](/images/image20221102114253.png)

设置 DBGp 代理：

![](/images/image20221102114512.png)

端口可以任意选择，只要不冲突。

运行调试配置：

![](/images/image20221102114732.png)

开启监听：

![](/images/image20221102114813.png)

启动调试按钮：

![](/images/image20221102114840.png)

可以看到变量的调试信息：

![](/images/image20221102114906.png)

* 使用 xdebug helper 插件

直接打开浏览器，选择 `xdebug` 模式，访问需要调试的主机：

![](/images/image20221102115129.png)

选择 debug 后浏览器会将请求发送到 PHPStorm 中：

![](/images/image20221102115200.png)

选择调试即可。

![](/images/image20221102115218.png)

::: warning 错误提示

若调试的过程中出现 [500] 的错误，则修改中间价的配置文件。

:::

![](/images/image20221102144132.png)

```ini
FcgidIOTimeout 3000 # 程序响应超时时间
FcgidConnectTimeout 3000 # 与程序通讯的最长时间
```

![](/images/image20221102144114.png)

::: tip 提示

需要让变量出现在调试界面时，需要将显示的变量添加到监视。

:::

![](/images/image20221102163117.png)

