---
author: YOUZAI
title: 反序列化漏洞
date: 2023/04/25
categories:
 - 常见漏洞
tags:
 - WEB安全
---

## 漏洞原理

当程序在进行反序列化时，会自动调用一些函数，例如`__wakeup()`,`__destruct()`等函数，但是如果传入函数的参数可以被用户控制的话，用户可以输入一些恶意代码到函数中，从而导致反序列化漏洞。

## 漏洞危害

* 攻击者可利用该漏洞远程执行命令。
* 攻击者可利用该漏洞上传 shell，并获取系统权限。

## 修复建议

* 不要把用户的输入或者是用户可控的参数直接放进反序列化的操作中去。
* 在进入反序列化函数之前,对参数进行限制过滤。

## 原理解析

* [序列化]：将对象转化为字节流，便于保存在文件，内存，数据库中。
* [反序列化]：字节流转化为对象。

序列化对象：

```php
<?php
class whatDo {
    var $x = "imz";
    var $y = 10;
}
$obj = new whatDo();
echo serialize($obj);
?>
```

输出结果：

```html
O:6:"whatDo":2:{s:1:"x";s:3:"imz";s:1:"y";i:10;}
```

## PHP 反序列化

> PHP 通过 **serialize()** 与 **unserialize()** 实现序列化与反序列化。

常见的反序列化漏洞中出现的魔术方法及其触发条件：

|方法|条件|
|:-|:-|
|\__construct()|当一个对象创建时被调用|
|\__destruct()|当一个对象销毁时被调用|
|\__toString()|当一个对象被当作一个字符串时使用|
|\__sleep()|在对象在被序列化之前运行|
|\__wakeup()|如果有，在反序列化之前调用|

::: tip 提示

序列化只序列化属性，不序列化方法。

:::

### 原因分析

* `unserialize()`传入参数可控。
* 存在某些魔术方法可用。
* 没有过滤或者过滤不完善。

## JAVA 反序列化

JAVA 通过 **Java.io.ObjectOutputStream** 和 **Java.io.ObjectInputStream** 两个类，通过`writeObject()`和`readObject()`方法实现序列化和反序列化。

::: tip 提示

实现`Serializable`和`Externalizable`接口的类的对象才能被序列化。

:::