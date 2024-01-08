---
author: YOUZAI
title: JSON
date: 2023/04/25
categories:
 - 编程学习
tags:
 - Python
---

## JSON 数据解析

Python3 中可以使用 json 模块来对 JSON 数据进行编解码，它包含了两个函数：

* `json.dumps()`: 对数据进行编码。
* `json.loads()`: 对数据进行解码。

## Python 编码为 JSON 类型转换对应表

| Python                                 | JSON   |
| :------------------------------------: | :----: |
| dict                                   | object |
| list, tuple                            | array  |
| str                                    | string |
| int, float, int- & float-derived Enums | number |
| True                                   | true   |
| False                                  | false  |
| None                                   | null   |

## JSON 解码为 Python 类型转换对应表

|JSON|Python|
|:-:|:-:|
|object|dict|
|array|list|
|string|str|
|number (int)|int|
|number (real)|Float|
|true|True|
|false|False|
|null|None|

## 代码

Python 数据结构转换为 JSON：

```python
#!/usr/bin/python3
import json
# Python 字典类型转换为 JSON 对象
data = {
    'no' : 1,
    'name' : 'W3CSchool',
    'url' : 'http://www.w3cschool.cn'
}
json_str = json.dumps(data)
print ("Python 原始数据：", repr(data))	#repr()函数将对象转化为供解释器读取的形式
print ("JSON 对象：", json_str)
```

JSON 编码的字符串转换回一个 Python 数据结构：

```python
#!/usr/bin/python3
import json
# Python 字典类型转换为 JSON 对象
data1 = {
    'no' : 1,
    'name' : 'W3CSchool',
    'url' : 'http://www.w3cschool.cn'
}
json_str = json.dumps(data1)
print ("Python 原始数据：", repr(data1))
print ("JSON 对象：", json_str)
# 将 JSON 对象转换为 Python 字典
data2 = json.loads(json_str)
print ("data2['name']: ", data2['name'])
print ("data2['url']: ", data2['url'])
```

## 文件操作

```python
# 写入 JSON 数据
with open('data.json', 'w') as f:
    json.dump(data, f)
# 读取数据
with open('data.json', 'r') as f:
    data = json.load(f)
```