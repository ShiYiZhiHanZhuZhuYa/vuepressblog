---
author: YOUZAI
title: LinkFinder
date: 2023/06/21
categories:
 - 脚本探测
tags:
 - 安全工具
---

## 简介

LinkFinder 是一个 python 脚本，用于在 JavaScript 文件中发现端点及其参数。

## 下载

[https://github.com/GerbenJavado/LinkFinder](https://github.com/GerbenJavado/LinkFinder)

使用 kali 下载：

```shell
git clone https://github.com/GerbenJavado/LinkFinder.git
cd LinkFinder
python setup.py install
```

## 安装

```shell
pip3 install -r requirements.txt
```

## 参数

Short Form    | Long Form     | Description
------------- | ------------- |-------------
-i            | --input       | Input a: URL, file or folder. For folders a wildcard can be used (e.g. '/*.js').
-o            | --output      | "cli" to print to STDOUT, otherwise where to save the HTML file Default: output.html
-r            | --regex       | RegEx for filtering purposes against found endpoints (e.g. ^/api/)
-d            | --domain      | Toggle to use when analyzing an entire domain. Enumerates over all found JS files.
-b            | --burp        | Toggle to use when inputting a Burp 'Save selected' file containing multiple JS files
-c            | --cookies     | Add cookies to the request
-h            | --help        | show the help message and exit

## 使用示例

* 在线 JavaScript 文件中查找端点并将 HTML 结果输出到 results.HTML

```shell
python linkfinder.py -i https://example.com/1.js -o results.html
```

* CLI/STDOUT 输出（不使用js美化程序，加快速度）

```shell
python linkfinder.py -i https://example.com/1.js -o cli
```

* 分析整个域及其 JS 文件

```shell
python linkfinder.py -i https://example.com -d
```

* Burp 输入（在目标中选择要保存的文件，右键单击“保存所选项目”，将该文件作为输入）

```shell
python linkfinder.py -i burpfile -b
```

* 枚举 JavaScript 文件的整个文件夹，同时查找以 /api/ 开头的端点，最后将结果保存到 results.html

```shell
python linkfinder.py -i 'Desktop/*.js' -r ^/api/ -o results.html
```

## Docker 部署

搭建镜像：

```shell
docker build -t linkfinder
```

启动容器：

```shell
docker run --rm -v $(pwd):/linkfinder/output linkfinder -i http://example.com/1.js -o /linkfinder/output/output.html
```

::: warning 注意

请确保在输出路径中使用路径`/linkfinder/output`，否则容器退出时输出将丢失。

:::
