import{_ as p,r as o,o as c,c as i,a as n,b as s,d as e,e as t}from"./app-00a966d3.js";const l={},r=t(`<h1 id="koa2-原生路由实现" tabindex="-1"><a class="header-anchor" href="#koa2-原生路由实现" aria-hidden="true">#</a> koa2 原生路由实现</h1><h2 id="简单例子" tabindex="-1"><a class="header-anchor" href="#简单例子" aria-hidden="true">#</a> 简单例子</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> Koa <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;koa&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Koa</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span> <span class="token keyword">async</span> <span class="token punctuation">(</span> <span class="token parameter">ctx</span> <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> url <span class="token operator">=</span> ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>url
  ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> url
<span class="token punctuation">}</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问 http://localhost:3000/hello/world 页面会输出 /hello/world，也就是说上下文的请求request对象中url之就是当前访问的路径名称，可以根据ctx.request.url 通过一定的判断或者正则匹配就可以定制出所需要的路由。</p><h2 id="定制化的路由" tabindex="-1"><a class="header-anchor" href="#定制化的路由" aria-hidden="true">#</a> 定制化的路由</h2><p>demo源码</p>`,6),u={href:"https://github.com/ChenShenhai/koa2-note/tree/master/demo/route-simple",target:"_blank",rel:"noopener noreferrer"},d=t(`<h3 id="源码文件目录" tabindex="-1"><a class="header-anchor" href="#源码文件目录" aria-hidden="true">#</a> 源码文件目录</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.
├── index.js
├── package.json
└── view
    ├── 404.html
    ├── index.html
    └── todo.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="demo源码" tabindex="-1"><a class="header-anchor" href="#demo源码" aria-hidden="true">#</a> demo源码</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> Koa <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;koa&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Koa</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 用Promise封装异步读取文件方法</span>
<span class="token comment">// @param  {string} page html文件名称</span>
<span class="token comment">// @return {promise}      </span>

<span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span> <span class="token parameter">page</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span> <span class="token parameter">resolve<span class="token punctuation">,</span> reject</span> <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> viewUrl <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">./view/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>page<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
    fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span>viewUrl<span class="token punctuation">,</span> <span class="token string">&quot;binary&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span> <span class="token parameter">err<span class="token punctuation">,</span> data</span> <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span> err <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">reject</span><span class="token punctuation">(</span> err <span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span> data <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 根据URL获取HTML内容
 * <span class="token keyword">@param</span>  <span class="token class-name"><span class="token punctuation">{</span>string<span class="token punctuation">}</span></span> <span class="token parameter">url</span> koa2上下文的url，ctx.url
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>string<span class="token punctuation">}</span></span>     获取HTML文件内容
 */</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">route</span><span class="token punctuation">(</span> <span class="token parameter">url</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> view <span class="token operator">=</span> <span class="token string">&#39;404.html&#39;</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span> url <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;/&#39;</span><span class="token operator">:</span>
      view <span class="token operator">=</span> <span class="token string">&#39;index.html&#39;</span>
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;/index&#39;</span><span class="token operator">:</span>
      view <span class="token operator">=</span> <span class="token string">&#39;index.html&#39;</span>
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;/todo&#39;</span><span class="token operator">:</span>
      view <span class="token operator">=</span> <span class="token string">&#39;todo.html&#39;</span>
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;/404&#39;</span><span class="token operator">:</span>
      view <span class="token operator">=</span> <span class="token string">&#39;404.html&#39;</span>
      <span class="token keyword">break</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">break</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">let</span> html <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">render</span><span class="token punctuation">(</span> view <span class="token punctuation">)</span>
  <span class="token keyword">return</span> html
<span class="token punctuation">}</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span> <span class="token keyword">async</span> <span class="token punctuation">(</span> <span class="token parameter">ctx</span> <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> url <span class="token operator">=</span> ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>url
  <span class="token keyword">let</span> html <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">route</span><span class="token punctuation">(</span> url <span class="token punctuation">)</span>
  ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> html
<span class="token punctuation">}</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;[demo] route-simple is starting at port 3000&#39;</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="运行demo" tabindex="-1"><a class="header-anchor" href="#运行demo" aria-hidden="true">#</a> 运行demo</h3><h4 id="执行运行脚本" tabindex="-1"><a class="header-anchor" href="#执行运行脚本" aria-hidden="true">#</a> 执行运行脚本</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">node</span> <span class="token parameter variable">-harmony</span> index.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="运行效果如下" tabindex="-1"><a class="header-anchor" href="#运行效果如下" aria-hidden="true">#</a> 运行效果如下</h4>`,8),k={href:"http://localhost:3000/index",target:"_blank",rel:"noopener noreferrer"};function v(m,b){const a=o("ExternalLinkIcon");return c(),i("div",null,[r,n("p",null,[n("a",u,[s("https://github.com/ChenShenhai/koa2-note/tree/master/demo/route-simple"),e(a)])]),d,n("p",null,[s("访问"),n("a",k,[s("http://localhost:3000/index"),e(a)])])])}const w=p(l,[["render",v],["__file","koa系列（2）-koa2路由实现.html.vue"]]);export{w as default};
