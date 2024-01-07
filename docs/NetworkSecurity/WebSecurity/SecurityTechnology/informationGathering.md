---
author: YOUZAI
title: 信息收集
date: 2023/05/05
categories:
 - 信息安全
tags:
 - 信息收集
---

## WHOIS

* [http://whois.chinaz.com/](http://whois.chinaz.com/)
* [https://whois.gandi.net/zh-hans/](https://whois.gandi.net/zh-hans/)
* [https://whois.aizhan.com/](https://whois.aizhan.com/)
* [https://whois.cloud.tencent.com/](https://whois.cloud.tencent.com/)
* [https://whois.cndns.com/](https://whois.cndns.com/)
* [https://www.22.cn/domain/](https://www.22.cn/domain/)
* [https://whois.ename.net/](https://whois.ename.net/)
* [https://whois.aliyun.com/](https://whois.aliyun.com/)
* [https://whois.west.cn/](https://whois.west.cn/)
* [http://whois.xinnet.com/domain/whois/index.jsp/](http://whois.xinnet.com/domain/whois/index.jsp/)
* [http://whois.nawang.cn/](http://whois.nawang.cn/)
* [http://www.zzy.cn/domain/whois.html/](http://www.zzy.cn/domain/whois.html/)
* [https://cp.35.com/chinese/whois.php/](https://cp.35.com/chinese/whois.php/)
* [http://www.dns.com.cn/show/domain/whois/index.do/](http://www.dns.com.cn/show/domain/whois/index.do/)
* [https://who.is/](https://who.is/)

## 企业信息

* 企查查 [https://www.qcc.com/](https://www.qcc.com/)
* 天眼查 [https://www.tianyancha.com/](https://www.tianyancha.com/)
* 启信宝 [https://www.qixin.com/](https://www.qixin.com/)

::: tip 主要查询的信息

* 股份穿透图，一般来说控股超过 50% 的子公司的漏洞 SRC 收录的可能性都比较大。
* 查看同电话企业基本都是子公司。
* 查看企业下的 app、小程序、还有品牌的资产，直接在搜索引擎里搜索品牌可能会有意想不到的收获。
* 邮箱反查、注册人反查、电话反查。
* 兄弟域名查询 [https://github.com/code-scan/BroDomain/](https://github.com/code-scan/BroDomain/) 。
* 七麦数据 [https://www.qimai.cn/](https://www.qimai.cn/) ，可以查到企业下一些比较冷门的 app。

:::


## 子域名信息

* [http://tool.chinaz.com/subdomain/?domain=](http://tool.chinaz.com/subdomain/?domain=)
* [http://hackertarget.com/find-dns-host-records/](http://hackertarget.com/find-dns-host-records/)
* [https://www.t1h2ua.cn/tools/](https://www.t1h2ua.cn/tools/)
* [https://dnsdumpster.com/](https://dnsdumpster.com/)
* [https://d.chinacycc.com/](https://d.chinacycc.com/)
* [http://z.zcjun.com/](http://z.zcjun.com/)
* [https://phpinfo.me/domain/](https://phpinfo.me/domain/)
* [https://www.aizhan.com/seo/](https://www.aizhan.com/seo/)
* [http://rank.chinaz.com/all/](http://rank.chinaz.com/all/)
* [https://zfwzzc.www.gov.cn/](https://zfwzzc.www.gov.cn/)
* [https://c.webscan.cc/](https://c.webscan.cc/)
* 证书透明度查询
  * [https://crt.sh/](https://crt.sh/)
  * [https://censys.io/](https://censys.io/)
  * [https://myssl.com/](https://myssl.com/)
  * [https://google.com/transparencyreport/https/ct/](https://google.com/transparencyreport/https/ct/)
  * [https://developers.facebook.com/tools/ct/](https://developers.facebook.com/tools/ct/)
* DNS 域传送
* 网站根目录下的`crossdomain.xml`文件
* Layer 子域名挖掘机
* OneForAll [https://github.com/shmilylty/OneForAll/](https://github.com/shmilylty/OneForAll/)
* Github [https://www.github.com/](https://www.github.com/)
* fofa [https://fofa.info/](https://fofa.info/)
* Google Hacking

### Hacking 语法

* 查找网页后台

```html
site:xx.com intext:管理
site:xx.com inurl:login
site:xx.com intitle:后台
```

* 查找网站文件

```html
site:xx.com filetype:asp
site:xx.com filetype:php
site:xx.com filetype:jsp
site:xx.com filetype:aspx
```

* 查找特定参数

```html
site:xx.com inurl:file
site:xx.com inurl:load
```

* 查找特定路径

```html
index of /admin
index of /passwd
index of /password
index of /mail
"index of /" +passwd
"index of /" +password.txt
"index of /" +.htaccess
"index of /root"
"index of /cgi-bin"
"index of /logs"
"index of /config"
```

## 指纹识别

* [http://www.yunsee.cn/](http://www.yunsee.cn/)
* [http://finger.tidesec.net/](http://finger.tidesec.net/)
* [http://whatweb.bugscaner.com/look/](http://whatweb.bugscaner.com/look/)
* [https://fp.shuziguanxing.com/](https://fp.shuziguanxing.com/)
* [http://www.whatweb.net/](http://www.whatweb.net/)
* [https://github.com/EdgeSecurityTeam/EHole/](https://github.com/EdgeSecurityTeam/EHole/)
* [https://github.com/0x727/ObserverWard/](https://github.com/0x727/ObserverWard/)
* [https://github.com/zixun/GodEye/](https://github.com/zixun/GodEye/)
* whatweb
* Wappalyzer（浏览器插件）

## 目录扫描

* dirsearch [https://github.com/maurosoria/dirsearch/](https://github.com/maurosoria/dirsearch/)
* 7kbscan
* 御剑

## JS 脚本信息

* JSFinder [https://github.com/Threezh1/JSFinder/](https://github.com/Threezh1/JSFinder/)
* LinkFinder [https://github.com/GerbenJavado/LinkFinder/](https://github.com/GerbenJavado/LinkFinder/)

## 中间件信息

|中间件|语言|数据库|
|:-|:-|:-|
|IIS|ASP|Access|
|IIS|ASPX(ASP\.NET)|MsSQL|
|Apache|PHP|MySQL|
|Nginx|PHP|MySQL|
|Tomcat|JSP|MySQL / Oracle|

## 字典生成

* [http://tools.hackxc.cc/cai/](http://tools.hackxc.cc/cai/)

## 查找真实 IP

* 外国 ping [https://www.site24x7.com/ping-test.html/](https://www.site24x7.com/ping-test.html/)
* 超级 ping [https://ping.chinaz.com/](https://ping.chinaz.com/)
* DNS 解析记录
  * [https://sitereport.netcraft.com/](https://sitereport.netcraft.com/)
  * [https://site.ip138.com/](https://site.ip138.com/)
  * [https://securitytrails.com/](https://securitytrails.com/)
  * [https://viewdns.info/](https://viewdns.info/)
  * [https://tools.ipip.net/cdn.php/](https://tools.ipip.net/cdn.php/)
* 邮箱反查 [https://www.site24x7.com/ping-test.html/](https://www.site24x7.com/ping-test.html/)
* ping 顶级域名，如 www.baidu.com 的话可以`ping baidu.com`

## 端口信息

* Nmap
* Masscan
* Goby

## IP 反查域名

* [https://x.threatbook.cn/](https://x.threatbook.cn/)
* [https://ti.360.net/](https://ti.360.net/)
* [https://dnsdb.io/zh-cn/](https://dnsdb.io/zh-cn/)
* [http://viewdns.info/](http://viewdns.info/)
* [http://www.17ce.com/](http://www.17ce.com/)
* [https://community.riskiq.com/](https://community.riskiq.com/)
* [https://dnslytics.com/](https://dnslytics.com/)
* [http://toolbar.netcraft.com/](http://toolbar.netcraft.com/)