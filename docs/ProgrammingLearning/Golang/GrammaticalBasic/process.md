---
author: YOUZAI
title: 流程控制
date: 2023/06/20
categories:
 - 编程学习
tags:
 - GoLang
---

## 流程控制

### 条件语句

```go
if a < 5 { 
    return 0
} else { 
    return 1 
}
```

关于条件语句，需要注意以下几点：

* 条件语句不需要使用`()`将条件包含起来。
* 无论语句体内有几条语句，`{}`都是必须存在的。
* 左花括号`{`必须与`if`或者`else`处于同一行。
* 在`if`之后，条件语句之前，可以添加变量初始化语句，使用`;`间隔。
* 在有返回值的函数中，不允许将==最终的 return== 语句包含在`if...else...`结构中，否则会编译失败。

### 选择语句

```go
switch i { 
    case 0:
		fmt.Printf("0") 
    case 1: 
    	fmt.Printf("1") 
    case 2: 
    	fallthrough 
    case 3: 
    	fmt.Printf("3") 
    case 4, 5, 6: 
    	fmt.Printf("4, 5, 6") 
    default: 
    	fmt.Printf("Default") 
}
```

`switch`后面的表达式不是必需的。

关于选择语句，需要注意以下几点：

* 左花括号`{`必须与`switch`处于同一行。
* 条件表达式不限制为常量或者整数。
* 单个`case`中，可以出现多个结果选项。
* 与 C 语言等规则相反，Go 语言不需要用`break`来明确退出一个`case`。
* 只有在`case`中明确添加`fallthrough`关键字，才会继续执行紧跟的下一个`case`。
* 可以不设定`switch`之后的条件表达式，在此种情况下，整个`switch`结构与多个`if...else...`的逻辑作用等同。

### 循环语句

* 与多数语言不同，Go 语言中的循环语句只支持`for`关键字

```go
// 一般写法。
sum := 0 
for i := 0; i < 10; i++ { 
    sum += i
}

// 简化写法。
sum := 0
for {
	sum++
	if sum > 10 {
		break
	}
}
```

关于循环语句，需要注意以下几点：

* 左花括号`{`必须与`for`处于同一行。
* Go 语言中的 for 循环与 C 语言一样，都允许在循环条件中定义和初始化变量，唯一的区别是，Go 语言不支持以`逗号`为间隔的多个赋值语句，必须使用平行赋值的方式来初始化多个变量。
* Go 语言的 for 循环同样支持`continue`和`break`来控制循环。
