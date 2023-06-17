import{_ as n,o as s,c as a,e}from"./app-00a966d3.js";const t={},i=e(`<hr><h2 id="title-nodejs中的bufferdate-2018-11-05-14-04-55tags-nodejs" tabindex="-1"><a class="header-anchor" href="#title-nodejs中的bufferdate-2018-11-05-14-04-55tags-nodejs" aria-hidden="true">#</a> title: NodeJS中的Buffer date: 2018-11-05 14:04:55 tags: [&quot;NodeJS&quot;]</h2><h2 id="buffer介绍" tabindex="-1"><a class="header-anchor" href="#buffer介绍" aria-hidden="true">#</a> Buffer介绍</h2><p><strong>为什么要用Buffer？</strong></p><ol><li>在Node/ES6 出现之前，前端工程师只需要进行一些简单的额字符串或者ODM操作就可以满足业务需求了，所有对二进制数据比较陌生。</li><li>在node出现之后，前端工程师面对的技术场景发送了变化，可以深入到网络传输、文件操作、图片处理等领域。而这些操作与二进制数据紧密相关。</li><li>在Node中的Buffer，是一个二进制数据容器，数据结构和数组类似，专门用于Node中的数据放。</li></ol><h2 id="新建buffer" tabindex="-1"><a class="header-anchor" href="#新建buffer" aria-hidden="true">#</a> 新建Buffer</h2><p><code>Buffer.alloc(size[, fil[,encoding]])</code><code>size </code>:新建的buffer期望的长度 <code>fill </code>用来预填充新建的Buffer的值 默认0 <code>encoding </code>: 编码格式 默认：utf-8</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/*
        十六进制：00- ff
        十进制 ：0- 255
        二进制： 00000000- 11111111
        0 / 1 代表一位 == 比特 
        8bit = 1B
        1kb = 1024 B
        1mkb= 1024Kb
        1GB = 1024m
        1TB = 1024GB

*/</span>

<span class="token comment">// 2. Buffer.alloc(size[, fill[, encoding]])</span>
<span class="token comment">/*
类数组使用即可 可遍历 可选择下标等等
初始化： 确定的长度 不能改变
填充值

*/</span>
<span class="token keyword">let</span> buffer2<span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">alloc</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//创建了一个长度是10的buffer</span>
buffer2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span><span class="token comment">//可以像使用数组一样使用buffer </span>
buffer2<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">=</span> oxfc<span class="token punctuation">;</span><span class="token comment">//传一个十六进制的直接取后两位 fc</span>
buffer2<span class="token punctuation">[</span><span class="token number">30</span><span class="token punctuation">]</span><span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span><span class="token comment">//这点和数组不同 溢出隐藏 </span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buffer2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="buffer使用" tabindex="-1"><a class="header-anchor" href="#buffer使用" aria-hidden="true">#</a> Buffer使用</h2><p>**使用新方法使用Buffer **</p><ol><li>Buffer.form(str):将一个字符串转换成buffer</li><li>Buffer.alloc(size):创建一个指定大小的buffer</li><li>Buffer.alloUnsafe(size):创建一个指定大小的buffer，但是可能包含敏感数据。</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 历史方法</span>
<span class="token comment">// let buffer = new Buffer(10);//类似 Array(10) 创建十个空间</span>
<span class="token comment">// console.log(buffer)// &lt;Buffer 00 00 00 00 00 00 00 00 00 00&gt;</span>

<span class="token comment">//1. 字符串转成二进制</span>
<span class="token keyword">let</span> str<span class="token operator">=</span> <span class="token string">&#39;www.zhangningle.top&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> buffer<span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//&lt;Buffer 77 77 77 2e 7a 68 61 6e 67 6e 69 6e 67 6c 65 2e 74 6f 70&gt;</span>
<span class="token comment">//把buffer转成十进制的</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buffer<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">//www.zhangningle.top</span>
<span class="token comment">// 汉字转换成二进制后 一个汉字要用三个字节表示</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Buffer总结点：</strong></p><ol><li>Buffer的结构和数组很像，操作方法也和数组很类似。</li><li>Buffer中是以二进制的方式储存数据的</li><li>Buffer是Node自带的，不需要引入，直接可以使用。</li></ol>`,14),l=[i];function o(c,p){return s(),a("div",null,l)}const r=n(t,[["render",o],["__file","Node中的Buffer.html.vue"]]);export{r as default};
