---
author: YOUZAI
title: 风险评估
date: 2023/05/11
categories:
 - 运营安全
tags:
 - 风险评估
---

## 简介

信息安全风险评估是参照风险评估标准和管理规范，对信息系统的**资产价值**、**潜在威胁**、**薄弱环节**、已采取的防护措施等进行分析，判断安全事件发生的概率以及可能造成的损失，提出风险管理措施的过程。

## 目的

* 识别系统面临的威胁（==Threat==）。
* 判断这种威胁转变成现实后可能带来的影响（==Impact==）。
* 判断这种转变的可能性或难易度（==Probability==）。

![](/images/image-20220516153348173.png)

## 理解

> 威胁（**Threat**）是产生风险（**Risk**）的外因，漏洞（**Vulnerability**）则是内因，两者的共同作用产生了风险（**Risk**）。

不是所有的漏洞都需要立即消除，只有存在对应的威胁时，该漏洞才会导致风险，但系统的所有漏洞都应该管理起来，因为环境在变，新的威胁随时可能出现。威胁分析的作用，就是为决策者判断哪些系统漏洞需要优先解决提供依据。

`Risk = Threat *Impact * Probability`

### 信息安全含义

* `Confidentiality`：[机密性]  => **阻止未经授权的用户读取数据**。
* `Integrity`：[完整性]  =>  **阻止未经授权的用户修改或删除数据**。
* `Availability`：[可用性]  =>  **保证授权实体在需要时可以正常的使用系统**。

## 相关

### 风险评估依据

`GB/T 20984-2007` `ISO27001` `信息安全技术` `信息安全风险评估规范`

### 风险评估术语

* 风险：风险是特定的威胁利用资产的脆弱性从而对组织造成的一种潜在损害。风险的严重程度与资产价值的损害程度及威胁发生的频度成正比。
* 资产：任何对组织有价值的事务。包括：信息、软件、硬件、服务、人员、其它等。
* 威胁：非预期事件的潜在原因，这些事件可能对系统或组织造成损害。
* 脆弱点/脆弱性：可能被一个或多个威胁利用的一个或一组资产的弱点。

> 案例：某证券公司的数据库服务器因为存在 MS12020 漏洞，遭到入侵被攻击，被迫中断 3 天。后续打了系统补丁， 并每 3 个月扫描一次系统漏洞，来预防此类事件的发生。

|名称|对应项目|
|:-|:-|
|资产|`数据库服务器`|
|风险|`数据库入侵攻击`|
|威胁|`入侵者`|
|脆弱性|`MS12020漏洞`|
|影响|`中断三天`|

### 风险评估工作

* 确定保护的对象（==保护资产==）是什么？它们直接和间接价值？
* 资产面临哪些==潜在威胁==？导致威胁的问题所在？威胁发生的可能性有多大？
* 资产中存在哪些==弱点==可能会被威胁所利用？利用的容易程度又如何？
* 一旦威胁事件发生，组织会遭受怎样的==损失==或者面临怎样的负面影响？
* 组织应该采取怎样的==安全措施==才能将==风险==带来的损失降低到最低程度。

### 风险评估要素

![](/images/image-20220516153742688.png)

### 风险评估流程

![](/images/image-20220516153816118.png)

## 流程

### 评估准备

1. 确定风险评估的目标

满足组织业务持续发展在安全方面的需求、法律法规的规定等内容。

2. 确定风险评估的范围

单位全部的信息、与信息处理相关的各类资产，管理机构、某个独立的信息系统、关键业务流程、与客户知识产权相关的系统或部门等。

3. 组建适当的评估管理与实施团队

甲乙双方人员、实施过程文档，工具准备、技术培训、过程管理规定、保密协议。

4. 进行系统调研

业务战略及管理制度、主要的业务系统、网络拓扑、边界访问控制、IP 地址规划，网络设备、安全设备等软硬件信息、相关人员（甲乙双方及第三方人员）、其他。

5. 确定评估依据和方法

国际标准、国家标准、行业标准、行业主管机关的业务系统的要求和制度、系统安全保护等级要求、系统互联网单位的安全要求、系统本身的实时性或性能要求。

6. 制定风险评估方案

团队组织：成员、责任；工作计划：内容、形式、成果；时间进度安排。

7. 获得最高管理者对风险评估工作的支持

得到组织最高管理者的支持、对相关人员进行传达、组织人员培训、明确有关人员任务。

8. 相关文件

输入：项目合同；输出：风险评估方案、项目进度表。

### 评估过程

#### 资产识别

* 资产分类

![](/images/image-20220516181053884.png)

* 机密性赋值[^1]

![](/images/image-20220516181112713.png)

* 完整性赋值[^2]

![](/images/image-20220516181133690.png)

* 可用性赋值[^3]

![](/images/image-20220516181229986.png)

资产赋值计算：

```shell
# 资产赋值计算有以下4种方式，在不同客户中，根据情况进行选择（机密性C、完整性I、可用性A）：
1.无权重算术平均法
综合考虑资产三个方面的属性，平均得出资产价值
资产赋值=(C+I+A)/3

2.无权重对数平均法
在综合考虑资产三个方面属性的同时，重点突出某一属性的特点。例如，某些信息资产的机密性要求很高，而可用性、完整性要求较低时，使用本算法更能凸显出其资产价值的重要性
资产赋值=ln[(e^C+e^I+e^A)/3]
e=2.71828182845904
e^n：e的n次幂
ln：最终求自然对数

3.加权算术平均法
在算术平均法的基础上，根据不通资产类别的特点，认为设置该资产类别中三个方面属性的权重。例如，人员类资产通常不考虑完整性，则可以通过调节权值体现出来
资产赋值=α*C+β*I+γ*A
α+β+γ=1

4.加权对数平均法
在对数平均法的基础上，根据不同资产类别的特点，认为设置该资产类别中三个方面属性的权重
V=ln(α*e^C+β*e^I+γ*e^A)
α+β+γ=1
```

资产赋值：

![](/images/image-20220516181325242.png)

#### 威胁分析

* 威胁来源

![](/images/image-20220516181345908.png)

* 威胁分类

![](/images/image-20220516181433803.png)

![](/images/image-20220516181500416.png)

* 威胁赋值

判断威胁出现的*频率*是威胁赋值的重要内容，评估者应根据经验和（或）有关的统计数据来进行判断。在评估中，需要综合考虑以下三个方面，以形成在某种评估环境中各种威胁出现的频率：

* ==以往安全事件报告==中出现过的威胁及其频率的统计。
* ==实际环境中通过检测工具==以及各种日志发现的威胁及其频率的统计。
* 近一两年来==国际组织发布==的对于整个社会或特定行业的威胁及其频率统计，以及发布的威胁预警。

可以对威胁出现的频率进行等级化处理，不同等级分别代表威胁出现的频率的高低。等级数值越大，威胁出现的频率越高。

![](/images/image-20220516182511022.png)

#### 脆弱性识别

* 脆弱性识别分类

![](/images/image-20220516182728913.png)

* 脆弱性赋值

![](/images/image-20220516182903183.png)

* 脆弱性识别手段

![](/images/image-20220516182927572.png)

* 安全配置检查

![](/images/image-20220517085253020.png)

#### 风险分析

* 风险分析方法

![](/images/image-20220517085348978.png)

* 可能性计算

![](/images/image-20220517085641325.png)

* 损失计算

![](/images/image-20220517085725963.png)

* 风险值及风险等级

![](/images/image-20220517085814837.png)

* 风险值计算

相乘法主要用于两个或多个要素值确定一个要素值的情形。即 z=f(x, y)，函数f可以用相乘法：

相乘法的原理是：`z=f(x, y)=xy`

当f为增量函数时，可以直接相乘，也可以相乘后取模等。

如采用z=f(x, y)=$\sqrt[2]{x*y}$，最终对z四舍五入取整数。

资产A、威胁T、脆弱性V：

可能性=$\sqrt[2]{T*V}$

损失=$\sqrt[2]{A*V}$

风险值 = 可能性 * 损失

* 风险等级

![](/images/image-20220517091937048.png)

* 风险评估记录表单

![](/images/image-20220517092210064.png)

[^1]: Confidentiality：阻止未经授权的用户读取数据。
[^2]: Integrity：阻止未经授权的用户修改或删除数据。
[^3]: Availability：保证授权实体在需要时可以正常的使用系统。