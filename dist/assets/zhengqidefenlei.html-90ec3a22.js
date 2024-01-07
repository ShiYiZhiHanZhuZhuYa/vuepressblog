import{_ as n,p as s,q as a,Z as t}from"./framework-8bb938b6.js";const p={},o=t(`<h1 id="整齐的分类" tabindex="-1"><a class="header-anchor" href="#整齐的分类" aria-hidden="true">#</a> 整齐的分类</h1><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> sidebar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vuepress-theme-hope&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">sidebar</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token string-property property">&quot;/&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      text<span class="token operator">:</span> <span class="token string">&quot;学习资料&quot;</span><span class="token punctuation">,</span>
      icon<span class="token operator">:</span> <span class="token string">&quot;book&quot;</span><span class="token punctuation">,</span>
      prefix<span class="token operator">:</span> <span class="token string">&quot;guide/&quot;</span><span class="token punctuation">,</span>
      children<span class="token operator">:</span> <span class="token string">&quot;structure&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      text<span class="token operator">:</span> <span class="token string">&quot;关于文档&quot;</span><span class="token punctuation">,</span>
      icon<span class="token operator">:</span> <span class="token string">&quot;info&quot;</span><span class="token punctuation">,</span>
      prefix<span class="token operator">:</span> <span class="token string">&quot;about/&quot;</span><span class="token punctuation">,</span>
      children<span class="token operator">:</span> <span class="token string">&quot;structure&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>我们使用侧边栏分类每一篇文档，使知识点复习更加方便</p>`,3),e=[o];function c(u,r){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","zhengqidefenlei.html.vue"]]);export{i as default};
