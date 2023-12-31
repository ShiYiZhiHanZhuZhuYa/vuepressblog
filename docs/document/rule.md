# 语法规范

我为了让文章看起来清晰对于所有篇章的语法做出了严格的语法规范

## 1 标题规范

标题必须按照他所处的编号依次往下排，如果是一个大标题的子标题则需要在大标题的基础上写 `.1`

```markdown
# 1 标题
## 1.1 子标题
## 1.2 子标题

# 2 标题
## 2.1 子标题
```

## 2 文章结构

每一篇文章开头必须要有一段总结性的文字，并在后方进行具体说明

```markdown
**概述：** 这篇文章的内容是用于解释文章的语法规范

我们的文章中采用了众多的方式规范语法，从标题到内容
```

此外一篇文章如果有注意点或者可以提示的点需要在末尾说明

```markdown
::: tip 提示
阅读这篇文章可以帮助你更好的阅读文档
:::
```

::: tip 提示
阅读这篇文章可以帮助你更好的阅读文档
:::

## 3 内容规范

对于一个是在展示内容中的按钮、代码等。我们会用 `小方块` 括起来

``` markdown
`Python`， 中我们使用 `print()` 输出内容
```

`Python`， 中我们使用 `print()` 输出内容

对于有多行的代码块。我们使用 `markdown` 中的代码块包括

```python
a = 0
print(a)
b = input()
```

如果文章中的内容穿插着英文，数字。则需要加上空格

```markdown
`print(1 + 1)` 会输出 `2`，这就是 code 的魅力
```

`print(1 + 1)` 会输出 `2`，这就是 code 的魅力
