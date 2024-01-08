---
author: YOUZAI
title: 命名空间
date: 2023/06/20
categories:
 - 编程学习
tags:
 - PHP
---

## 命名空间

命名空间通过关键字 namespace 来声明。如果一个文件中包含命名空间，它必须在其它所有代码之前声明命名空间。

```php
<?php
	namespace MyProject {
	    const CONNECT_OK = 1;
	    class Connection { /* ... */ }
	    function connect() { /* ... */  }
	}
	
	namespace AnotherProject {
	    const CONNECT_OK = 1;
	    class Connection { /* ... */ }
	    function connect() { /* ... */  }
	}
?>
```

在声明命名空间之前唯一合法的代码是用于定义源文件编码方式的 declare 语句。所有非 PHP 代码包括空白符都不能出现在命名空间的声明之前。

```php
<?php
	declare(encoding='UTF-8'); //定义多个命名空间和不包含在命名空间中的代码
	namespace MyProject {
		const CONNECT_OK = 1;
		class Connection { /* ... */ }
		function connect() { /* ... */  }
	}
	
	namespace { // 全局代码
		session_start();
		$a = MyProject\connect();
		echo MyProject\Connection::start();
	}
?>
```

### 子命名空间

与目录和文件的关系很像，PHP 命名空间也允许指定层次化的命名空间的名称。因此，命名空间的名字可以使用分层次的方式定义：

```php
<?php
	namespace MyProject\Sub\Level;  //声明分层次的单个命名空间
	
	const CONNECT_OK = 1;
	class Connection { /* ... */ }
	function Connect() { /* ... */  }
?>
```
