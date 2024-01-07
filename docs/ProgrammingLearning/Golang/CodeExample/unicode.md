---
author: YOUZAI
title: Unicode编码
date: 2023/04/25
categories:
 - 编程学习
tags:
 - GoLang
---

## 中文转 Unicode

```go
package main

import (
	"fmt"
	"strconv"
	"strings"
)

func zhToUnicode(raw []byte) ([]byte, error) {
	str, err := strconv.Unquote(strings.Replace(strconv.Quote(string(raw)), `\\u`, `\u`, -1))
	if err != nil {
		return nil, err
	}
	return []byte(str), nil
}

func main() {
	sText := "hello 你好"
	textQuoted := strconv.QuoteToASCII(sText)
	textUnquoted := textQuoted[1 : len(textQuoted)-1]
	fmt.Println(textUnquoted)
	v, _ := zhToUnicode([]byte(textUnquoted))
	fmt.Println(string(v))
}
```
