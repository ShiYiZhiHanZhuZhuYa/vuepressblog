---
author: YOUZAI
title: 多线程
date: 2023/04/25
categories:
 - 编程学习
tags:
 - Python
---

## threading

```python
import threading
import time

def run(one, two):
	pass

t = threading.Thread(target=run, args=(one, two))
t.start()
```

## 创建多线程

```python
import threading
import time

threadList = []
tempList = []
def run(one, two, temp):
	pass
for temp in tempList:
	threadList.append(threading.Thread(target=run, args=(one, two, temp)))
for thread in threadList:
	t.start()
```