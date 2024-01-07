---
author: YOUZAI
title: 随机数
date: 2023/04/25
categories:
 - 编程学习
tags:
 - Python
---

## random

```python
import random

num = random.randint(0, 9) # 生成0~9的随机整数

num = random.random() # 生成0~1的随机数，类型是float

num = random.uniform(0, 9) # 生成0~9的随机数，类型是float

num = random.choice("www.baidu.com") # 在www.baidu.com中随机选择一个元素

random.shuffle([1, 2, 3, 4, 5]) # 将一个列表中的元素打乱，随机排序

num = random.sample([1, 2, 3, 4, 5], 3) # 从指定的序列中随机获取3个元素，不会打乱原来排序
```