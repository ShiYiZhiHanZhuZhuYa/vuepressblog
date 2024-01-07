---
author: YOUZAI
title: 基础类型
date: 2023/06/20
categories:
 - 编程学习
tags:
 - GoLang
---

## 类型

### 布尔类型

* 关键字`bool`，不支持自动或者强制类型转换

```go
var v1 bool
v1 = true
v2 := (1 == 2) // v2 也会推导为 bool 类型。
```

### 整型

```go
var v1 int
v1 = 10
v2 := 20
```

::: warning

在 Go 语言中，int 和 int32 是两种不同的类型。

:::

### 浮点型

* 若不指定类型，默认自动设置为`float64`

```go
var v1 float
v1 = 10.0
v2 := 10.0
```

* 浮点数比较（因为浮点数不是一种精确的表达方式，所以像整型那样直接用`==`来判断两个浮点数是否相等是不可行的，这可能会导致不稳定的结果）

```go
import "math"

func isEqual(f1, f2, p float64) bool { // p 为用户自定义的比较精度，比如0.00001。
    return math.Fdim(f1, f2) < p       // Fdim() 函数计算两个数字之间的正差。
}
```

### 字符串

* 声明和初始化

```go
var str string
str = "hello world"
```

* 字符串的内容可以用类似于数组下标的方式获取，但与数组不同，字符串的内容不能在初始化后被修改

```go
import "fmt"

str := "hello world"
fmt.Println(str0])
```

* 字符串遍历。

```go
for i := 0; i < n; i++ {
    // ...
}

for i, ch := range str { // 第一个值是下标，第二个值是对应的 Unicode 字符编码值。
    // ...
}
```

### 数组

* 数组长度定义后不可修改

```go
var i = [3]int{1, 2, 3}
i := [3]int{1, 2, 3}

var i [3]int
i[0] = 1
i[1] = 2
i[2] = 3
```

* 访问数组元素

```go
for i := 0; i < len(array); i++ {
	fmt.Println("Element", i, "of array is", array[i]) 
}
```

`range`具有两个返回值，第一个返回值是元素的数组下标，第二个返回值是元素的值。

```go
array := [5] int{1, 2, 3, 4, 5}
for i, v := range array {
	fmt.Println("Array element[", i, "]=", v) 
}
```

### 数组切片

* 创建数组切片

```go
array := [5]int{1, 2, 3, 4, 5}
myarray := array[first:last]
```

* Go 语言提供的内置函数`make()`可以用于灵活地创建数组切片

```go
// 创建一个初始元素个数为5的数组切片，元素初始值为0：
mySlice1 := make([]int, 5)

// 创建一个初始元素个数为5的数组切片，元素初始值为0，并预留10个元素的存储空间：
mySlice2 := make([]int, 5, 10)

// 直接创建并初始化包含5个元素的数组切片：
mySlice3 := []int{1, 2, 3, 4, 5}
```

* 内容复制

数组切片支持 Go 语言的另一个内置函数 copy()，用于将内容从一个数组切片复制到另一个数组切片。如果加入的两个数组切片不一样大，就会按其中较小的那个数组切片的元素个数进行复制。

```go
slice1 := []int{1, 2, 3, 4, 5}
slice2 := []int{5, 4, 3}
copy(slice2, slice1) // 只会复制slice1的前3个元素到slice2中。
copy(slice1, slice2) // 只会复制slice2的3个元素到slice1的前3个位置。
```

* 内容添加

```go
// 给 mySlice 后面添加3个元素。
mySlice = append(mySlice, 1, 2, 3)

// 给 mySlice 后面添加另一个数组切片。
mySlice = append(mySlice, mySlice2...)
```

需要注意的是，在第二个参数 mySlice2 后面加了三个点，即一个省略号，如果没有这个省略号的话，会有编译错误，因为按`append()`的语义，从第二个参数起的所有参数都是待附加的元素。因为 mySlice 中的元素类型为 int，所以直接传递 mySlice2 是行不通的。加上省略号相当于把 mySlice2 包含的==所有元素打散后传入==。

### map

* map 是一堆键值对的未排序集合

```go
// map 声明
var myMap map[string] PersonInfo
// 其中，myMap 是声明的 map 变量名，string 是键的类型，PersonInfo 则是其中所存放的值类型。

// interface{} 可以代表任意类型，它是一个空接口，任意类型都可以实现该接口。
var myMap map[string] interface{}

// 使用 make() 函数创建一个新的 map。
myMap = make(map[string] PersonInfo)

// 创建并初始化 map。
myMap = map[string] PersonInfo{"1234": PersonInfo{"1", "Jack", "Room 101,..."}, }

// 元素赋值。
myMap["1234"] = PersonInfo{"1", "Jack", "Room 101,..."}

// 元素删除。
delete(myMap, "1234")

//元素查找。
value, ok := myMap["1234"] 
if ok { 
	// 处理找到的 value。
}
// 或者
if value, ok := myMap["1234"]; ok {
	// 处理找到的 value。
}
```

* 代码实例

```go
package main

import (
	"fmt"
)

type student struct {
	name string
	age  int
	sex  string
}

func main() {
	var stuOne map[string]student
	stuOne = make(map[string]student)
	stuOne["123"] = student{"小明", 10, "男"}

	if person, ok := stuOne["123"]; ok {
		fmt.Println(person, "结果：", ok)
	}
}
```
