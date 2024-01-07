---
author: YOUZAI
title: 生成器
date: 2023/04/25
categories:
 - 编程学习
tags:
 - Python
---

## 生成器

```python
list = [1, 2, 3, 4]
it = iter(list) # 创建一个迭代器
print(next(it)) # 输出迭代器的下一个元素

for i in it: # 使用for循环进行遍历迭代器
	print(i)
```

## 迭代器

```python
# 使用了yield的函数被称为生成器，调用该函数返回一个迭代器
def foo():
	print('strat......')
	while True:
		res = yield 4
		print('res:', res)

g = foo() # 生成器g
next(g) # 开始迭代
g.send(9) # 获取yield的值
```