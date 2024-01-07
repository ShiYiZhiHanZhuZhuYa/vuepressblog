---
author: YOUZAI
title: echo
date: 2023/06/20
categories:
 - 编程学习
tags:
 - PHP
---

## 输出

> 在 PHP 中有两个基本的输出方式：`echo`和`print`。

echo 和 print 区别：

* echo => 可以输出一个或多个字符串
* print => 只允许输出一个字符串，返回值总为 1

### echo

::: tip 提示

echo 输出的速度比 print 快， echo 没有返回值，print 有返回值1。

:::

```php
<?php
	echo "<h2>PHP 很有趣!</h2>";
	echo "Hello world!<br>";
	echo "我要学 PHP!<br>";
	echo "这是一个", "字符串，", "使用了", "多个", "参数。";
?>
```

echo 使用的时候可以加括号，也可以不加括号。

使用 echo 输出变量：

```php
<?php
	$txt1 = "学习 PHP";
	$txt2 = "RUNOOB.COM";
	$cars = array("Volvo", "BMW", "Toyota");
	 
	echo $txt1;
	echo "<br>";
	echo "在 $txt2 学习 PHP ";
	echo "<br>";
	echo "我车的品牌是 {$cars[0]}";
?>
```

### print

print 同样是一个语言结构，可以使用括号，也可以不使用括号。

```php
<?php
	print "<h2>PHP 很有趣!</h2>";
	print "Hello world!<br>";
	print "我要学习 PHP!";
?>
```

使用 print 输出变量：

```php
<?php
	$txt1="学习 PHP";
	$txt2="RUNOOB.COM";
	$cars=array("Volvo", "BMW", "Toyota");
	 
	print $txt1;
	print "<br>";
	print "在 $txt2 学习 PHP ";
	print "<br>";
	print "我车的品牌是 {$cars[0]}";
?>
```
