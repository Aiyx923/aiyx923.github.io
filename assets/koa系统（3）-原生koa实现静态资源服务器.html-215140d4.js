import{_ as p,r as o,o as c,c as i,a as n,b as s,d as t,e}from"./app-00a966d3.js";const l={},r=e('<h1 id="原生koa2实现静态资源服务器" tabindex="-1"><a class="header-anchor" href="#原生koa2实现静态资源服务器" aria-hidden="true">#</a> 原生koa2实现静态资源服务器</h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>一个http请求访问web服务静态资源，一般响应结果有三种情况</p><ul><li>访问文本，例如js，css，png，jpg，gif</li><li>访问静态目录</li><li>找不到资源，抛出404错误</li></ul><h2 id="原生koa2-静态资源服务器例子" tabindex="-1"><a class="header-anchor" href="#原生koa2-静态资源服务器例子" aria-hidden="true">#</a> 原生koa2 静态资源服务器例子</h2><p>demo源码</p>',6),u={href:"https://github.com/ChenShenhai/koa2-note/blob/master/demo/static-server/",target:"_blank",rel:"noopener noreferrer"},k=e(`<h3 id="代码目录" tabindex="-1"><a class="header-anchor" href="#代码目录" aria-hidden="true">#</a> 代码目录</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>├── static <span class="token comment"># 静态资源目录</span>
│   ├── css/
│   ├── image/
│   ├── js/
│   └── index.html
├── util <span class="token comment"># 工具代码</span>
│   ├── content.js <span class="token comment"># 读取请求内容</span>
│   ├── dir.js <span class="token comment"># 读取目录内容</span>
│   ├── file.js <span class="token comment"># 读取文件内容</span>
│   ├── mimes.js <span class="token comment"># 文件类型列表</span>
│   └── walk.js <span class="token comment"># 遍历目录内容</span>
└── index.js <span class="token comment"># 启动入口文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="代码解析" tabindex="-1"><a class="header-anchor" href="#代码解析" aria-hidden="true">#</a> 代码解析</h3><h4 id="index-js" tabindex="-1"><a class="header-anchor" href="#index-js" aria-hidden="true">#</a> index.js</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> Koa <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;koa&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> content <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./util/content&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> mimes <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./util/mimes&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Koa</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 静态资源目录对于相对入口文件index.js的路径</span>
<span class="token keyword">const</span> staticPath <span class="token operator">=</span> <span class="token string">&#39;./static&#39;</span>

<span class="token comment">// 解析资源类型</span>
<span class="token keyword">function</span> <span class="token function">parseMime</span><span class="token punctuation">(</span> <span class="token parameter">url</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> extName <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">extname</span><span class="token punctuation">(</span> url <span class="token punctuation">)</span>
  extName <span class="token operator">=</span> extName <span class="token operator">?</span>  extName<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token string">&#39;unknown&#39;</span>
  <span class="token keyword">return</span>  mimes<span class="token punctuation">[</span> extName <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span> <span class="token keyword">async</span> <span class="token punctuation">(</span> <span class="token parameter">ctx</span> <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// 静态资源目录在本地的绝对路径</span>
  <span class="token keyword">let</span> fullStaticPath <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> staticPath<span class="token punctuation">)</span>

  <span class="token comment">// 获取静态资源内容，有可能是文件内容，目录，或404</span>
  <span class="token keyword">let</span> _content <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">content</span><span class="token punctuation">(</span> ctx<span class="token punctuation">,</span> fullStaticPath <span class="token punctuation">)</span>

  <span class="token comment">// 解析请求内容的类型</span>
  <span class="token keyword">let</span> _mime <span class="token operator">=</span> <span class="token function">parseMime</span><span class="token punctuation">(</span> ctx<span class="token punctuation">.</span>url <span class="token punctuation">)</span>

  <span class="token comment">// 如果有对应的文件类型，就配置上下文的类型</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span> _mime <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>type <span class="token operator">=</span> _mime
  <span class="token punctuation">}</span>

  <span class="token comment">// 输出静态资源内容</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span> _mime <span class="token operator">&amp;&amp;</span> _mime<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&#39;image/&#39;</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果是图片，则用node原生res，输出二进制数据</span>
    ctx<span class="token punctuation">.</span>res<span class="token punctuation">.</span><span class="token function">writeHead</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>
    ctx<span class="token punctuation">.</span>res<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>_content<span class="token punctuation">,</span> <span class="token string">&#39;binary&#39;</span><span class="token punctuation">)</span>
    ctx<span class="token punctuation">.</span>res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 其他则输出文本</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> _content
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;[demo] static-server is starting at port 3000&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="util-content-js" tabindex="-1"><a class="header-anchor" href="#util-content-js" aria-hidden="true">#</a> util/content.js</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// 封装读取目录内容方法</span>
<span class="token keyword">const</span> dir <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./dir&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// 封装读取文件内容方法</span>
<span class="token keyword">const</span> file <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./file&#39;</span><span class="token punctuation">)</span>


<span class="token doc-comment comment">/**
 * 获取静态资源内容
 * <span class="token keyword">@param</span>  <span class="token class-name"><span class="token punctuation">{</span>object<span class="token punctuation">}</span></span> <span class="token parameter">ctx</span> koa上下文
 * <span class="token keyword">@param</span>  <span class="token class-name"><span class="token punctuation">{</span>string<span class="token punctuation">}</span></span> <span class="token parameter">静态资源目录在本地的绝对路径</span>
 * <span class="token keyword">@return</span>  <span class="token class-name"><span class="token punctuation">{</span>string<span class="token punctuation">}</span></span> 请求获取到的本地内容
 */</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">content</span><span class="token punctuation">(</span> <span class="token parameter">ctx<span class="token punctuation">,</span> fullStaticPath</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
  
  <span class="token comment">// 封装请求资源的完绝对径</span>
  <span class="token keyword">let</span> reqPath <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>fullStaticPath<span class="token punctuation">,</span> ctx<span class="token punctuation">.</span>url<span class="token punctuation">)</span>

  <span class="token comment">// 判断请求路径是否为存在目录或者文件</span>
  <span class="token keyword">let</span> exist <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">existsSync</span><span class="token punctuation">(</span> reqPath <span class="token punctuation">)</span>
  
  <span class="token comment">// 返回请求内容， 默认为空</span>
  <span class="token keyword">let</span> content <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>

  <span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token operator">!</span>exist <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//如果请求路径不存在，返回404</span>
    content <span class="token operator">=</span> <span class="token string">&#39;404 Not Found! o(╯□╰)o！&#39;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">//判断访问地址是文件夹还是文件</span>
    <span class="token keyword">let</span> stat <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">statSync</span><span class="token punctuation">(</span> reqPath <span class="token punctuation">)</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span> stat<span class="token punctuation">.</span><span class="token function">isDirectory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//如果为目录，则渲读取目录内容</span>
      content <span class="token operator">=</span> <span class="token function">dir</span><span class="token punctuation">(</span> ctx<span class="token punctuation">.</span>url<span class="token punctuation">,</span> reqPath <span class="token punctuation">)</span>

    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果请求为文件，则读取文件内容</span>
      content <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">file</span><span class="token punctuation">(</span> reqPath <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> content
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> content
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="util-dir-js" tabindex="-1"><a class="header-anchor" href="#util-dir-js" aria-hidden="true">#</a> util/dir.js</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;url&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// 遍历读取目录内容方法</span>
<span class="token keyword">const</span> walk <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./walk&#39;</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * 封装目录内容
 * <span class="token keyword">@param</span>  <span class="token class-name"><span class="token punctuation">{</span>string<span class="token punctuation">}</span></span> <span class="token parameter">url</span> 当前请求的上下文中的url，即ctx.url
 * <span class="token keyword">@param</span>  <span class="token class-name"><span class="token punctuation">{</span>string<span class="token punctuation">}</span></span> <span class="token parameter">reqPath</span> 请求静态资源的完整本地路径
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>string<span class="token punctuation">}</span></span> 返回目录内容，封装成HTML
 */</span>
<span class="token keyword">function</span> <span class="token function">dir</span> <span class="token punctuation">(</span> <span class="token parameter">url<span class="token punctuation">,</span> reqPath</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
  
  <span class="token comment">// 遍历读取当前目录下的文件、子目录</span>
  <span class="token keyword">let</span> contentList <span class="token operator">=</span> <span class="token function">walk</span><span class="token punctuation">(</span> reqPath <span class="token punctuation">)</span>

  <span class="token keyword">let</span> html <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;ul&gt;</span><span class="token template-punctuation string">\`</span></span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span> <span class="token keyword">let</span> <span class="token punctuation">[</span> index<span class="token punctuation">,</span> item <span class="token punctuation">]</span> <span class="token keyword">of</span> contentList<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    html <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>html<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;li&gt;&lt;a href=&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>url <span class="token operator">===</span> <span class="token string">&#39;/&#39;</span> <span class="token operator">?</span> <span class="token string">&#39;&#39;</span> <span class="token operator">:</span> url<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>item<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>item<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/a&gt;</span><span class="token template-punctuation string">\`</span></span> 
  <span class="token punctuation">}</span>
  html <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>html<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/ul&gt;</span><span class="token template-punctuation string">\`</span></span>
  
  <span class="token keyword">return</span> html
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> dir
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="util-file-js" tabindex="-1"><a class="header-anchor" href="#util-file-js" aria-hidden="true">#</a> util/file.js</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * 读取文件方法
 * <span class="token keyword">@param</span>  <span class="token class-name"><span class="token punctuation">{</span>string<span class="token punctuation">}</span></span> <span class="token parameter">文件本地的绝对路径</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>string<span class="token operator">|</span>binary<span class="token punctuation">}</span></span> 
 */</span>
<span class="token keyword">function</span> <span class="token function">file</span> <span class="token punctuation">(</span> <span class="token parameter">filePath</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>

 <span class="token keyword">let</span> content <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span>filePath<span class="token punctuation">,</span> <span class="token string">&#39;binary&#39;</span> <span class="token punctuation">)</span>
 <span class="token keyword">return</span> content
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> file
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="util-walk-js" tabindex="-1"><a class="header-anchor" href="#util-walk-js" aria-hidden="true">#</a> util/walk.js</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> mimes <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./mimes&#39;</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * 遍历读取目录内容（子目录，文件名）
 * <span class="token keyword">@param</span>  <span class="token class-name"><span class="token punctuation">{</span>string<span class="token punctuation">}</span></span> <span class="token parameter">reqPath</span> 请求资源的绝对路径
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>array<span class="token punctuation">}</span></span> 目录内容列表
 */</span>
<span class="token keyword">function</span> <span class="token function">walk</span><span class="token punctuation">(</span> <span class="token parameter">reqPath</span> <span class="token punctuation">)</span><span class="token punctuation">{</span>

  <span class="token keyword">let</span> files <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readdirSync</span><span class="token punctuation">(</span> reqPath <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">let</span> dirList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> fileList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span> <span class="token keyword">let</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> len<span class="token operator">=</span>files<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">&lt;</span>len<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> item <span class="token operator">=</span> files<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> itemArr <span class="token operator">=</span> item<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;\\.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> itemMime <span class="token operator">=</span> <span class="token punctuation">(</span> itemArr<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">1</span> <span class="token punctuation">)</span> <span class="token operator">?</span> itemArr<span class="token punctuation">[</span> itemArr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span> <span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token string">&quot;undefined&quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token keyword">typeof</span> mimes<span class="token punctuation">[</span> itemMime <span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">&quot;undefined&quot;</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      dirList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span> files<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      fileList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span> files<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>


  <span class="token keyword">let</span> result <span class="token operator">=</span> dirList<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span> fileList <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> walk<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="util-mime-js" tabindex="-1"><a class="header-anchor" href="#util-mime-js" aria-hidden="true">#</a> util/mime.js</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> mimes <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string-property property">&#39;css&#39;</span><span class="token operator">:</span> <span class="token string">&#39;text/css&#39;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&#39;less&#39;</span><span class="token operator">:</span> <span class="token string">&#39;text/css&#39;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&#39;gif&#39;</span><span class="token operator">:</span> <span class="token string">&#39;image/gif&#39;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&#39;html&#39;</span><span class="token operator">:</span> <span class="token string">&#39;text/html&#39;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&#39;ico&#39;</span><span class="token operator">:</span> <span class="token string">&#39;image/x-icon&#39;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&#39;jpeg&#39;</span><span class="token operator">:</span> <span class="token string">&#39;image/jpeg&#39;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&#39;jpg&#39;</span><span class="token operator">:</span> <span class="token string">&#39;image/jpeg&#39;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&#39;js&#39;</span><span class="token operator">:</span> <span class="token string">&#39;text/javascript&#39;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&#39;json&#39;</span><span class="token operator">:</span> <span class="token string">&#39;application/json&#39;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&#39;pdf&#39;</span><span class="token operator">:</span> <span class="token string">&#39;application/pdf&#39;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&#39;png&#39;</span><span class="token operator">:</span> <span class="token string">&#39;image/png&#39;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&#39;svg&#39;</span><span class="token operator">:</span> <span class="token string">&#39;image/svg+xml&#39;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&#39;swf&#39;</span><span class="token operator">:</span> <span class="token string">&#39;application/x-shockwave-flash&#39;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&#39;tiff&#39;</span><span class="token operator">:</span> <span class="token string">&#39;image/tiff&#39;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&#39;txt&#39;</span><span class="token operator">:</span> <span class="token string">&#39;text/plain&#39;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&#39;wav&#39;</span><span class="token operator">:</span> <span class="token string">&#39;audio/x-wav&#39;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&#39;wma&#39;</span><span class="token operator">:</span> <span class="token string">&#39;audio/x-ms-wma&#39;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&#39;wmv&#39;</span><span class="token operator">:</span> <span class="token string">&#39;video/x-ms-wmv&#39;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&#39;xml&#39;</span><span class="token operator">:</span> <span class="token string">&#39;text/xml&#39;</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> mimes

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="运行效果" tabindex="-1"><a class="header-anchor" href="#运行效果" aria-hidden="true">#</a> 运行效果</h3><h4 id="启动服务" tabindex="-1"><a class="header-anchor" href="#启动服务" aria-hidden="true">#</a> 启动服务</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">node</span> index.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="效果" tabindex="-1"><a class="header-anchor" href="#效果" aria-hidden="true">#</a> 效果</h4>`,19),d={id:"访问http-localhost-3000",tabindex:"-1"},v=n("a",{class:"header-anchor",href:"#访问http-localhost-3000","aria-hidden":"true"},"#",-1),m={href:"http://localhost:3000",target:"_blank",rel:"noopener noreferrer"},b=n("p",null,[n("img",{src:"https://s2.loli.net/2022/06/18/O7NgoCqFHj2mpnZ.png",alt:"static-server-result-01.png"})],-1),h={id:"访问http-localhost-3000-index-html",tabindex:"-1"},g=n("a",{class:"header-anchor",href:"#访问http-localhost-3000-index-html","aria-hidden":"true"},"#",-1),f={href:"http://localhost:3000/index.html",target:"_blank",rel:"noopener noreferrer"},y=n("p",null,[n("img",{src:"https://s2.loli.net/2022/06/18/fP3Jy91a6NRAUQC.png",alt:"static-server-result-02.png"})],-1),w={id:"访问http-localhost-3000-js-index-js",tabindex:"-1"},x=n("a",{class:"header-anchor",href:"#访问http-localhost-3000-js-index-js","aria-hidden":"true"},"#",-1),_={href:"http://localhost:3000/js/index.js",target:"_blank",rel:"noopener noreferrer"},j=n("p",null,[n("img",{src:"https://s2.loli.net/2022/06/18/k6aJlh9BFKsMzG7.png",alt:"static-server-result-03.png"})],-1);function q(P,N){const a=o("ExternalLinkIcon");return c(),i("div",null,[r,n("p",null,[n("a",u,[s("https://github.com/ChenShenhai/koa2-note/blob/master/demo/static-server/"),t(a)])]),k,n("h5",d,[v,s(" 访问"),n("a",m,[s("http://localhost:3000"),t(a)])]),b,n("h5",h,[g,s(" 访问"),n("a",f,[s("http://localhost:3000/index.html"),t(a)])]),y,n("h5",w,[x,s(" 访问"),n("a",_,[s("http://localhost:3000/js/index.js"),t(a)])]),j])}const S=p(l,[["render",q],["__file","koa系统（3）-原生koa实现静态资源服务器.html.vue"]]);export{S as default};
