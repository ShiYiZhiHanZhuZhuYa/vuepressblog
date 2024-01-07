---
author: YOUZAI
title: 变量声明
date: 2023/06/20
categories:
 - 编程学习
tags:
 - PHP
---

## 变量

变量是用于存储信息的"容器"。

```php
<?php
	$x = 5;
	$y = 6;
	$z = $x + $y;
	echo $z;
?>
```

变量规则：

* 变量以 **$** 符号开始，后面跟着变量的名称。
* 变量名必须以字母或者下划线字符开始。
* 变量名只能包含字母、数字以及下划线（A-z、0-9 和 _ ）。
* 变量名不能包含空格。
* 变量名是区分大小写的（*$y* 和 *$Y* 是两个不同的变量）。

::: warning 注意

PHP 语句和 PHP 变量都是区分大小写的。

:::

### 变量声明

PHP 没有声明变量的命令，变量在第一次赋值给它的时候被创建：

```php
<?php
	$txt = "Hello world!";
	$x = 5;
	$y = 10.5;
?>
```

### 作用域

PHP 有四种不同的变量作用域：

* local
* global
* static
* parameter

::: info 作用域

在所有函数外部定义的变量，拥有全局作用域。除了函数外，全局变量可以被脚本中的任何部分访问，要在一个函数中访问一个全局变量，需要使用 global 关键字。

:::

在 PHP 函数内部声明的变量是局部变量，仅能在函数内部访问：

```php
<?php
	$x = 5; // 全局变量

	function myTest()
	{
	    $y = 10; // 局部变量
	    echo "<p>测试函数内变量:<p>";
	    echo "变量 x 为: $x";
	    echo "<br>";
	    echo "变量 y 为: $y";
	} 

	myTest();
	
	echo "<p>测试函数外变量:<p>";
	echo "变量 x 为: $x";
	echo "<br>";
	echo "变量 y 为: $y";
?>
```

#### global

global 关键字可以用于函数内访问全局变量：

```php
<?php
	$x = 5;
	$y = 10;
	 
	function myTest()
	{
	    global $x, $y;
	    $y = $x + $y;
	}
	 
	myTest();
	echo $y; // 输出 15
?>
```

PHP 将所有全局变量存储在一个名为 $GLOBALS[index] 的数组中。 index 保存变量的名称。这个数组可以在函数内部访问，也可以直接用来更新全局变量。

上面的示例可以写成：

```php
<?php
	$x = 5;
	$y = 10;
	 
	function myTest()
	{
	    $GLOBALS['y'] = $GLOBALS['x'] + $GLOBALS['y'];
	} 
	 
	myTest();
	echo $y;
?>
```

#### Static

当一个函数完成时，它的所有变量通常都会被删除。然而，有时候希望某个局部变量不要被删除。要做到这一点，请在您第一次声明变量时使用 static 关键字：

```php
<?php
	function myTest()
	{
	    static $x = 0;
	    echo $x;
	    $x++;
	    echo PHP_EOL;    // 换行符
	}
	 
	myTest();
	myTest();
	myTest();
?>
```

每次调用该函数时，该变量将会保留着函数前一次被调用时的值。

::: tip

该变量仍然是函数的局部变量

:::

#### parameter

参数作用域：参数是通过调用代码将值传递给函数的局部变量。

```php
<?php
	function myTest($x)
	{
	    echo $x;
	}
	myTest(5);
?>
```
