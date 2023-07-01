<template><div><h1 id="八年级上学期" tabindex="-1"><a class="header-anchor" href="#八年级上学期" aria-hidden="true">#</a> 八年级上学期</h1>
<h2 id="_1-python-编程基础" tabindex="-1"><a class="header-anchor" href="#_1-python-编程基础" aria-hidden="true">#</a> 1 Python 编程基础</h2>
<h3 id="_1-1-注释语句" tabindex="-1"><a class="header-anchor" href="#_1-1-注释语句" aria-hidden="true">#</a> 1.1 注释语句</h3>
<h4 id="_1-1-1-单行注释" tabindex="-1"><a class="header-anchor" href="#_1-1-1-单行注释" aria-hidden="true">#</a> 1.1.1 单行注释</h4>
<p><strong>定义：</strong> 单行的被编译器忽略的文本</p>
<p><strong>用途：</strong> 帮助阅读代码，利于后期维护，便于理解算法</p>
<p><strong>语法：</strong> <code v-pre># 注释内容</code></p>
<p><strong>示例：</strong></p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token comment"># 单行注释</span>
<span class="token comment"># 这是输出 Hello World 的代码</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Hello World"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">总结</p>
<p>单行注释可以便捷的帮助理解一行代码，也是比较常用的注释方式</p>
</div>
<h4 id="_1-1-2-多行注释" tabindex="-1"><a class="header-anchor" href="#_1-1-2-多行注释" aria-hidden="true">#</a> 1.1.2 多行注释</h4>
<p><strong>定义：</strong> 可跨越多行的被编译器忽略的文本</p>
<p><strong>用途：</strong> 书写函数批注，理解复杂算法</p>
<p><strong>语法：</strong> <code v-pre>&quot;&quot;&quot;注释内容&quot;&quot;&quot; / '''注释内容''''</code></p>
<p><strong>示例：</strong></p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">hello_opt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">"""
    这是一个多行注释
    这个函数的作用是输出 Hello World
    不需要任何形参
    """</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Hello World"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">总结</p>
<p>多行注释适合处理比单行注释复杂的场景。例如一个大型项目的函数等。它的特点是可以换行处理，不一定限制在单行</p>
</div>
<h3 id="_1-2-输入和输出" tabindex="-1"><a class="header-anchor" href="#_1-2-输入和输出" aria-hidden="true">#</a> 1.2 输入和输出</h3>
<h4 id="_1-2-1-输入" tabindex="-1"><a class="header-anchor" href="#_1-2-1-输入" aria-hidden="true">#</a> 1.2.1 输入</h4>
<p><strong>定义：</strong> 获得用户输入内容的函数</p>
<p><strong>语法：</strong> <code v-pre>变量 = input( 变量 / 数据类型 /...)</code></p>
<p><strong>用途：</strong> 实际开发中需要用户提供数据实现操作的场景（例如圆的面积的计算）</p>
<p><strong>示例：</strong></p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token comment"># 这是一个输出语句</span>
a <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">"请输入："</span><span class="token punctuation">)</span>
<span class="token comment"># 用户输入的内容会被赋值给 a，所以打印出来的是用户输入的内容（例如输入 1 就输出 1 ）</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>input( )</code> 函数中可以什么都不填，但是这样可能会导致用户以为卡死了。所以建议填入一些提示信息
<code v-pre>input( )</code> 函数会阻塞线程，就是程序到 <code v-pre>input( )</code> 这里就不动了除非用户输入数据并按下了回车
<strong>示例2：</strong></p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token comment"># 输出 Hello，此时程序正常运行</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Hello"</span><span class="token punctuation">)</span>
<span class="token comment"># input 阻塞线程，程序在这里停止</span>
a <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">"请输入："</span><span class="token punctuation">)</span>
<span class="token comment"># 除非用户按下回车，否则下面这段代码不会执行</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"我被执行了~"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">总结</p>
<p>输入是一个很实用的函数，它是用户与程序交流的途径。使用它我们将能发掘 Python 更多强大的功能</p>
</div>
<h4 id="_1-2-2-输出" tabindex="-1"><a class="header-anchor" href="#_1-2-2-输出" aria-hidden="true">#</a> 1.2.2 输出</h4>
<p><strong>定义：</strong> 输出是把指定内容打印到终端上的函数</p>
<p><strong>语法：</strong> <code v-pre>print( 变量 / 数据类型 / ..)</code></p>
<p><strong>用途：</strong> 实际开发中需要与用户交互的场景（例如输出计算结果）</p>
<p><strong>示例：</strong></p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token comment"># 定义函数 a 并赋值 Hello</span>
a <span class="token operator">=</span> <span class="token string">'Hello'</span>
<span class="token comment"># 输出 Hello World</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Hello World"</span><span class="token punctuation">)</span>
<span class="token comment"># 输出 a。但因为 a 的值是 Hello，所以输出 Hello</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>事实上 <code v-pre>print( )</code> 函数有相当多的强大功能，但是碍于你们还没有学表达式，先按下不表</p>
<div class="custom-container tip"><p class="custom-container-title">总结</p>
<p><code v-pre>print( )</code> 是一个功能强大的函数，它是程序与用户交流的途径，也是程序开发中最常用的函数之一</p>
</div>
<h3 id="_1-3-数据类型及其转换函数" tabindex="-1"><a class="header-anchor" href="#_1-3-数据类型及其转换函数" aria-hidden="true">#</a> 1.3 数据类型及其转换函数</h3>
<h4 id="_1-3-1-数据类型" tabindex="-1"><a class="header-anchor" href="#_1-3-1-数据类型" aria-hidden="true">#</a> 1.3.1 数据类型</h4>
<p><strong>定义：</strong> 数据类型是一个值的集合和定义在这个值集上的一组操作的总称</p>
<p><strong>用途：</strong> 存储临时数据进行操作</p>
<p><strong>数据类型：</strong></p>
<table>
<thead>
<tr>
<th style="text-align:center">中文名</th>
<th style="text-align:center">英文名</th>
<th style="text-align:center">转换函数</th>
<th style="text-align:center">意义</th>
<th style="text-align:center">语法</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">字符串</td>
<td style="text-align:center"><code v-pre>str / string</code></td>
<td style="text-align:center"><code v-pre>str( )</code></td>
<td style="text-align:center">一般存储文字，符号等内容的数据类型。数字等也可以</td>
<td style="text-align:center">变量 = <code v-pre>&quot;字符串&quot; / '字符串'</code></td>
</tr>
<tr>
<td style="text-align:center">整数</td>
<td style="text-align:center"><code v-pre>int</code></td>
<td style="text-align:center"><code v-pre>int( )</code></td>
<td style="text-align:center">存储整数和小数，但是小数会被去掉小数点后边的部分（不会四舍五入）</td>
<td style="text-align:center"><code v-pre>变量 = 整数</code></td>
</tr>
<tr>
<td style="text-align:center">浮点数</td>
<td style="text-align:center"><code v-pre>float</code></td>
<td style="text-align:center"><code v-pre>float( )</code></td>
<td style="text-align:center">存储浮点数和整数，但是整数会跟上 <code v-pre>.0</code> 。例如 <code v-pre>float( 1 )</code> 就会变成 <code v-pre>1.0</code></td>
<td style="text-align:center"><code v-pre>变量 = 浮点数</code></td>
</tr>
<tr>
<td style="text-align:center">布尔值</td>
<td style="text-align:center"><code v-pre>bool</code></td>
<td style="text-align:center"><code v-pre>bool( )</code></td>
<td style="text-align:center">只有两种可存储的数据：<code v-pre>True</code> 和 <code v-pre>False</code>。分别代表真和假</td>
<td style="text-align:center"><code v-pre>变量 = True / False</code></td>
</tr>
</tbody>
</table>
<p>以上是 Python 中所有的数据类型表格。我会对其中的知识点进行系统的讲解</p>
<h5 id="_1-3-1-1-字符串数据类型" tabindex="-1"><a class="header-anchor" href="#_1-3-1-1-字符串数据类型" aria-hidden="true">#</a> 1.3.1.1 字符串数据类型</h5>
<p><strong>定义：</strong> 一般存储文字，符号等内容的数据类型。数字等也可以</p>
<p><strong>用途：</strong> 存储用户输入，存储输出信息</p>
<p><strong>语法：</strong> <code v-pre>变量 = &quot;字符串&quot; / '字符串'</code></p>
<p><strong>转换函数：</strong> <code v-pre>str( )</code></p>
<p>字符串是从新手期到老手都会用到的类型，也是最常用的数据类型。它的主要特点是 <strong>占用内存大，可存储内容多</strong></p>
<p>字符串字符串，顾名思义是存储文字的。一般来说我们把它用于输出文字信息，例如 <code v-pre>Hello World</code> ， <code v-pre>1</code> ······ 等等，1 也是字符串吗？</p>
<p>答案是肯定的，也许这有点违反我们的数学常识，但是我给你们解释一下就明白了</p>
<p>我们中国有这么多人，有人同名同姓很合理吧？现在你遇到了两个人：一个男的叫小明，另一个女的也叫小明。那你能说她们俩是一个人吗？当然不能，程序也是这样</p>
<p><strong>示例：</strong></p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token comment"># 真正的整数 1</span>
a <span class="token operator">=</span> <span class="token number">1</span>
<span class="token comment"># 字符串的 1</span>
b <span class="token operator">=</span> <span class="token string">"1"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>显示的内容相同不代表两个函数存储的内容意义相同。在这个示例中 <code v-pre>a</code> 是不等于 <code v-pre>b</code> 的</p>
</div>
<p>那么到这里有同学就要问了，假如我想要让整数的 <code v-pre>1</code> 变成字符串的 <code v-pre>1</code>。有可能吗？</p>
<p>当然有！Python 为我们提供了类型转换函数，每个数据类型都有自己的类型转换函数。只要你填进的内容符合要求就可以转换</p>
<p><strong>示例2：</strong></p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token comment"># 这是一个整数类型的 2</span>
a <span class="token operator">=</span> <span class="token number">2</span>
<span class="token comment"># 这是一个字符串变量</span>
b <span class="token operator">=</span> <span class="token string">''</span>
<span class="token comment"># 将 a 中整数类型的 2 转换为字符串类型的 2 并赋值给 b</span>
b <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token comment"># 输出 b，此时应该是字符串类型的 b</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于 <code v-pre>str</code> 类型的通用性，<code v-pre>str( )</code> 几乎可以转换任何数据类型。那么其它数据类型也如此吗</p>
<div class="custom-container tip"><p class="custom-container-title">总结</p>
<p>字符串数据类型（<code v-pre>str</code>）有着占用内存大、可存储内容多的特点。转换可以使用 <code v-pre>str( )</code> 函数转换</p>
</div>
<h5 id="_1-3-1-2-整数数据类型" tabindex="-1"><a class="header-anchor" href="#_1-3-1-2-整数数据类型" aria-hidden="true">#</a> 1.3.1.2 整数数据类型</h5>
<p><strong>定义：</strong> 存储整数和小数的数据类型</p>
<p><strong>用途：</strong> 算法中数据的存储，计算结果的保存</p>
<p><strong>语法：</strong> <code v-pre>变量 = 整数 / 小数</code></p>
<p><strong>转换函数：</strong> <code v-pre>int( )</code></p>
<p><strong>示例：</strong></p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token comment"># a 是一个整数类型的变量</span>
a <span class="token operator">=</span> <span class="token number">1</span>
<span class="token comment"># 1 也是整数数据类型</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>事实上你看到的所有不带 <code v-pre>&quot; &quot;</code> 或 <code v-pre>' '</code> 的整数都是整数数据类型</p>
<p>我们说过每个数据类型都有转换函数，<code v-pre>int</code> 数据类型也不例外。但它有些特别</p>
<p>整数数据类型和浮点数数据类型的边界比较模糊。唯一的区别就是一个专门负责处理整数，一个专门负责处理浮点数。可是浮点数可以被存储进整数数据类型里边，整数可以存储进浮点数数据类型里边</p>
<p>那么这样操作数据会有什么变化呢？不会 Python 就会让你无变化的进行这样子的操作造成歧义吗？</p>
<p><strong>示例2：</strong></p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token comment"># 显然 a 是一个浮点数数据类型</span>
a <span class="token operator">=</span> <span class="token number">1.1</span>
<span class="token comment"># 将 a 转换为整数并赋值给 b</span>
b <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token comment"># b 存储的是 1，输出 1</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是为什么呢？Python 为了明确职责和一些复杂的数据类型操作，会将转换浮点数为整数的结果直接把小数部分去掉，只保留整数部分并且不会四舍五入。所以 <code v-pre>1.1</code> 被保留整数部分后就是 <code v-pre>1</code>，那么 <code v-pre>b</code> 存储的当然就是 <code v-pre>1</code></p>
<p>那么字符串可以转换为 <code v-pre>int</code> 数据类型吗？答案是可以，也不可以</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token comment"># a 是字符串数据类型的 1</span>
a <span class="token operator">=</span> <span class="token string">'1'</span>
<span class="token comment"># 将 a 的值转换为整数数据类型并赋值给 b</span>
b <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token comment"># 输出 b，b 存储的是整数类型的 1</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>

<span class="token comment"># c 是字符串类型的 hello</span>
c <span class="token operator">=</span> <span class="token string">'hello'</span>
<span class="token comment"># 将 c 的值转换为整数数据类型并赋值给 d</span>
d <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
<span class="token comment"># 报错</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么为什么字符串数据类型的 <code v-pre>1</code> 可以但是字符串数据类型的 <code v-pre>hello</code> 不可以呢？</p>
<p>答案显而易见，因为哪个数字是 <code v-pre>hello</code> 嘛。所以整数数据类型只能转换其它存储的是整数或小数的内容的数据类型（例如 <code v-pre>&quot;2&quot;</code>）</p>
<div class="custom-container tip"><p class="custom-container-title">总结</p>
<p>整数数据类型（<code v-pre>int</code>）是专门负责处理整数的数据类型。如果转换浮点数数据类型为整数数据类型，会只保留整数部分并且 <strong>不会</strong> 四舍五入。其他数据类型也可以转换为整数数据类型，前提是它存储的内容是数字</p>
</div>
</div></template>


