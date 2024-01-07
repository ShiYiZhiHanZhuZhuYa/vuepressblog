---
author: YOUZAI
title: 反射调用
date: 2023/04/25
categories:
 - 编程学习
tags:
 - GoLang
---

## reflect 包

```go
// 此函数适用于安全性
// 此函数用于生成所有poc
func PocInit() {
	methodName := []string{}                // 用于保存方法名
	pocStruct := &poc.PocInfo{}             // 实例化一个poc结构体，主要用于通过反射调用poc结构体内的方法
	pocReflect := reflect.TypeOf(pocStruct) // 用于获取方法的数量、方法名

	// 将方法名添加到数组中
	for i := 0; i < pocReflect.NumMethod(); i++ {
		method := pocReflect.Method(i) // 获取方法名
		methodName = append(methodName, method.Name)
	}

	// 调用方法，生成poc
	for _, pocName := range methodName {
		if fun, bl := pocReflect.MethodByName(pocName); bl {
			fun.Func.Call([]reflect.Value{reflect.ValueOf(pocStruct)}) // 调用方法生成poc
		}
	}
}

// 生成poc
func() {
    pocStruct := &poc.PocInfo{} // 实例化一个poc结构体，主要用于通过反射调用poc结构体内的方法
    pocReflect := reflect.ValueOf(pocStruct)

    for i := 0; i < pocReflect.NumMethod(); i++ {
        method := pocReflect.Method(i)
        method.Call(make([]reflect.Value, 0)) // 调用方法，生成poc
    }
}()
```
