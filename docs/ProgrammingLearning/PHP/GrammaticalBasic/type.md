---
author: YOUZAI
title: 基础类型
date: 2023/06/20
categories:
 - 编程学习
tags:
 - PHP
---

## 数据类型

PHP 支持以下几种数据类型：

* String（字符串）
* Integer（整型）
* Float（浮点型）
* Boolean（布尔型）
* Array（数组）
* Object（对象）
* NULL（空值）
* Resource（资源类型）

PHP`var_dump()`函数返回变量的数据类型和值：

```php
<?php 
	$x = 5985;
	var_dump($x);
	echo "<br>"; 
	$x = -345; // 负数 
	var_dump($x);
	echo "<br>"; 
	$x = 0x8C; // 十六进制数
	var_dump($x);
	echo "<br>";
	$x = 047; // 八进制数
	var_dump($x);
?>
```

### 数组

```php
<?php 
	$cars = array("Volvo", "BMW", "Toyota");
	var_dump($cars);
?>
```

### 对象

在 PHP 中，对象必须声明，对象使用关键字`class`声明，然后我们在类中定义数据类型，然后在实例化的类中使用数据类型：

```php
<?php
	class Car
	{
		var $color;
		function __construct($color = "green") {
			$this->color = $color;
		}
		function what_color() {
			return $this->color;
		}
	}
?>
```

关键字`this`就是指向当前对象实例的指针，不指向任何其他对象或类。

### 资源类型

PHP 资源 resource 是一种特殊变量，保存了到外部资源的一个引用。常见资源数据类型有打开文件、数据库连接、图形画布区域等。使用`get_resource_type()`函数可以返回资源（resource）类型：

```php
get_resource_type(resource $handle): string
```

此函数返回一个字符串，用于表示传递给它的 resource 的类型。如果参数不是合法的 resource，将产生错误。

```php
<?php
	$c = mysql_connect();
	echo get_resource_type($c)."\n";
	// 打印：mysql link
	
	$fp = fopen("foo","w");
	echo get_resource_type($fp)."\n";
	// 打印：file
	
	$doc = new_xmldoc("1.0");
	echo get_resource_type($doc->doc)."\n";
	// 打印：domxml document
?>
```

## 数组

### 创建数组

在 PHP 中，使用`array()`函数用于创建数组：

```php
# 自动分配 ID 键
$cars = array("Volvo", "BMW", "Toyota");
# 手动分配 ID 键
$cars[0] = "Volvo";
$cars[1] = "BMW";
$cars[2] = "Toyota";
```

### 获取长度

`count()`函数用于返回数组的长度（元素的数量）：

```php
<?php
	$cars = array("Volvo", "BMW", "Toyota");
	echo count($cars);
?>
```

### 遍历数组

```php
<?php
	$cars = array("Volvo","BMW","Toyota");
	$arrlength = count($cars);
	 
	for($x=0; $x < $arrlength; $x++)
	{
	    echo $cars[$x];
	    echo "<br>";
	}
?>
```

### 关联数组

关联数组是分配给数组的指定的键的数组。

```php
# 创建关联数组第一种方式
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
# 创建关联数组第二种方式
$age['Peter'] = "35";
$age['Ben'] = "37";
$age['Joe'] = "43";
```

可以在脚本中使用该键：

```php
<?php
	$age = array("Peter"=>"35","Ben"=>"37","Joe"=>"43");
	echo "Peter is " . $age['Peter'] . " years old.";
?>
```

#### 遍历关联数组

```php
<?php
	$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
	 
	foreach($age as $x => $x_value)
	{
	    echo "Key=" . $x . ", Value=" . $x_value;
	    echo "<br>";
	}
?>
```

## 超级全局变量

PHP 中预定义了几个超级全局变量（superglobals） ，这意味着它们在一个脚本的全部作用域中都可用。 你不需要特别说明，就可以在函数及类中使用。

* $GLOBALS
* $\_SERVER
* $\_REQUEST
* $\_POST
* $\_GET
* $\_FILES
* $\_ENV
* $\_COOKIE
* $\_SESSION
