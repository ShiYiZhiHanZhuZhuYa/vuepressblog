---
author: YOUZAI
title: 时间戳
date: 2023/04/25
categories:
 - 编程学习
tags:
 - Python
---

## 时间戳

```python
import time, datetime

tss1 = '2013-10-10 23:40:00' # 字符类型的时间
timeArray = time.strptime(tss1, "%Y-%m-%d %H:%M:%S") # 按照字符类型时间格式转换成数组

# 以下操作都需要先将字符类型时间转换成时间数组，再将时间数组传入
timeStamp = int(time.mktime(timeArray)) # 转换成时间戳，单位：s
otherStyleTime = time.strftime("%Y/%m/%d %H:%M:%S", timeArray) # 转换成0000/00/00 00:00:00
otherStyleTime = time.strftime("%Y-%m-%d %H:%M:%S", timeArray) # 转换成0000-00-00 00:00:00

# 时间戳转换成字符时间
timeStamp = 1381419600 # 定义时间戳
dateArray = datetime.datetime.fromtimestamp(timeStamp) 
otherStyleTime = dateArray.strftime("%Y-%m-%d %H:%M:%S") # 转化成0000-00-00 00:00:00
otherStyleTime = dateArray.strftime("H:%M:%S") # 转换成00:00:00

# 获取当前时间戳
now = int(time.time())
timeArray = time.localtime(now)
otherStyleTime = time.strftime("%Y-%m-%d %H:%M:%S", timeArray) # 转化成0000-00-00 00:00:00

# 获取当前时间的数组格式
now = datatime.datatime.now()
otherStyleTime = now.strftime("%Y-%m-%d %H:%M:%S") # 转化成0000-00-00 00:00:00
```