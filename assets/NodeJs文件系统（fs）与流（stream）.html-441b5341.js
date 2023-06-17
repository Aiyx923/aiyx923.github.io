import{_ as p,r as o,o as c,c as l,a as n,d as t,b as s,e}from"./app-00a966d3.js";const i={},u=e(`<h1 id="nodejs文件系统-fs-与流-stream" tabindex="-1"><a class="header-anchor" href="#nodejs文件系统-fs-与流-stream" aria-hidden="true">#</a> NodeJS文件系统（fs）与流（stream）</h1><h2 id="文件系统-file-system" tabindex="-1"><a class="header-anchor" href="#文件系统-file-system" aria-hidden="true">#</a> <strong>文件系统（File System）：</strong></h2><ol><li>在Node中，文件系统的交互是非常重要的，服务器的本质就是将本地的文件发送给客户端，</li><li>Node通过fs模块来和文件系统进行交互，该模块提供了一些标准的文件访问API类打开、读取、写入文件、以及与其交互。</li><li>要是用fs模块，首先要从核心模块中加载； 使用 const fs= require(&#39;fs&#39;) ; 来引入</li></ol><h3 id="fs使用特点" tabindex="-1"><a class="header-anchor" href="#fs使用特点" aria-hidden="true">#</a> fs使用特点：</h3><ol><li>fs模块中的所有操作都有两种形式可供选择同步和异步，</li><li>同步文件系统会阻塞程序的执行，也就是除非操作完毕，否则不会向下执行代码。</li><li>异步文件系统不会阻塞程序的执行，而是在操作完成时，通过回调函数将结果返回。</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//1. 引入模块</span>
<span class="token keyword">const</span> fs<span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;fs&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// console.log(fs)</span>

<span class="token comment">//2. 打开文件</span>
<span class="token comment">// fs.open 异步读取（通常用异步 需设置回调函数）  </span>
<span class="token comment">// fs.openSync 同步读取（读取时会阻塞线程）</span>

<span class="token keyword">let</span> hello <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">openSync</span><span class="token punctuation">(</span><span class="token string">&quot;hello.txt&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;w&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//                     不存在会自动新建</span>

<span class="token comment">//3. 写入内容</span>
fs<span class="token punctuation">.</span><span class="token function">writeFileSync</span><span class="token punctuation">(</span>hello<span class="token punctuation">,</span><span class="token string">&#39;hello word!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//4. 保存并退出</span>
fs<span class="token punctuation">.</span><span class="token function">closeSync</span><span class="token punctuation">(</span>hello<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),r={href:"https://github.com/AnsonZnl/StudyNodeJS/blob/master/%E8%AF%BE%E7%A8%8B%E7%AC%94%E8%AE%B0/%E8%AF%BE%E6%97%B630-%E8%AF%BE%E6%97%B634%E7%AC%94%E8%AE%B0.md#%E8%AF%BE%E6%97%B631",target:"_blank",rel:"noopener noreferrer"},d=n("h3",{id:"文件操作",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#文件操作","aria-hidden":"true"},"#"),s(" 文件操作：")],-1),k=n("ol",null,[n("li",null,[s("打开文件： "),n("code",null,"fs.open(path,flags[,mode],callback)"),s(" 异步打开 异步都是回调 回调嵌套回调 "),n("code",null,"fs.openSync(path,flags[,mode])"),s(" 同步打开")])],-1),v={href:"http://nodejs.cn/api/fs.html#fs_fs_open_path_flags_mode_callback",target:"_blank",rel:"noopener noreferrer"},m=e(`<p>一、同步打开文件</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    <span class="token comment">//1. 引入模块 </span>
    <span class="token keyword">let</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//2.打开文件 同步</span>
    <span class="token keyword">var</span> fd<span class="token operator">=</span>fs<span class="token punctuation">.</span><span class="token function">openSync</span><span class="token punctuation">(</span><span class="token string">&#39;1.txt&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;w&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//3.写入内容</span>
    fs<span class="token punctuation">.</span><span class="token function">writeFileSync</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span><span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

    <span class="token comment">//4. 保存并关闭</span>
    fs<span class="token punctuation">.</span><span class="token function">closeSync</span><span class="token punctuation">(</span>fd<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>二、异步打开文件</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>   <span class="token comment">//1.引入模块</span>
   <span class="token keyword">let</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

   <span class="token comment">//2. 打开文件</span>
   fs<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;1.txt&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> fd</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
       <span class="token comment">//2.1判断是否出错</span>
       <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
           <span class="token comment">//正确 2.2写入文件</span>
           fs<span class="token punctuation">.</span><span class="token function">writeFile</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> <span class="token string">&quot;今天天.....气真好！&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
                <span class="token comment">//2.2.1 写入成功</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
                    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;写入成功&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                    <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">//2.3 关闭文件</span>
                fs<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
                    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
                        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;文件以保存并关闭&#39;</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                        <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
           <span class="token punctuation">}</span><span class="token punctuation">)</span>
       <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
           <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
   <span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),b={href:"https://github.com/AnsonZnl/StudyNodeJS/blob/master/%E8%AF%BE%E7%A8%8B%E7%AC%94%E8%AE%B0/%E8%AF%BE%E6%97%B630-%E8%AF%BE%E6%97%B634%E7%AC%94%E8%AE%B0.md#%E8%AF%BE%E6%97%B632",target:"_blank",rel:"noopener noreferrer"},f=n("h3",{id:"使用文件流写入",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#使用文件流写入","aria-hidden":"true"},"#"),s(" 使用文件流写入")],-1),h={href:"http://nodejs.cn/api/fs.html#fs_fs_createwritestream_path_options",target:"_blank",rel:"noopener noreferrer"},g=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//同步操作</span>
<span class="token comment">//1. 引入模块</span>
<span class="token keyword">let</span> fs<span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//2.建立通道</span>
<span class="token keyword">let</span> ws <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createWriteStream</span><span class="token punctuation">(</span><span class="token string">&#39;fsw.txt&#39;</span><span class="token punctuation">)</span>

<span class="token comment">//3.打开通道</span>
ws<span class="token punctuation">.</span><span class="token function">once</span><span class="token punctuation">(</span><span class="token string">&#39;open&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;通道已经打开&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

ws<span class="token punctuation">.</span><span class="token function">once</span><span class="token punctuation">(</span><span class="token string">&#39;close&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;通道已经关闭&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//4\\. 写入内容</span>
ws<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&#39;我爱你，&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ws<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&#39;我爱你，&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ws<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&#39;我爱你，&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),_={href:"https://github.com/AnsonZnl/StudyNodeJS/blob/master/%E8%AF%BE%E7%A8%8B%E7%AC%94%E8%AE%B0/%E8%AF%BE%E6%97%B630-%E8%AF%BE%E6%97%B634%E7%AC%94%E8%AE%B0.md#%E8%AF%BE%E6%97%B633",target:"_blank",rel:"noopener noreferrer"},E=n("h3",{id:"读写文件",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#读写文件","aria-hidden":"true"},"#"),s(" 读写文件：")],-1),w={href:"http://nodejs.cn/api/fs.html#fs_fs_readfile_path_options_callback",target:"_blank",rel:"noopener noreferrer"},y=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//1. 引入模块</span>
<span class="token keyword">let</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//2. 读取文件</span>
fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">&#39;source/hello.txt&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;utf8&#39;</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>data</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token comment">//判断是否成功</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//</span>
        <span class="token comment">// console.log(data.toString());</span>
        <span class="token comment">//data 默认读取的是二进制 使用toString() 方法转换成</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

读取图片：

<span class="token comment">//3. 读取图片</span>
fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">&quot;source/psb.jpg&quot;</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>data</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token comment">//判断是否成功</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//写入图片</span>
        fs<span class="token punctuation">.</span><span class="token function">writeFile</span><span class="token punctuation">(</span><span class="token string">&#39;img.jpg&#39;</span><span class="token punctuation">,</span> data<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;写入成功！&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),B={href:"https://github.com/AnsonZnl/StudyNodeJS/blob/master/%E8%AF%BE%E7%A8%8B%E7%AC%94%E8%AE%B0/%E8%AF%BE%E6%97%B630-%E8%AF%BE%E6%97%B634%E7%AC%94%E8%AE%B0.md#%E8%AF%BE%E6%97%B634",target:"_blank",rel:"noopener noreferrer"},A=e(`<p><strong>读取视频:</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//1. 引入模块</span>
<span class="token keyword">let</span> fs<span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//2. 读取视频</span>
fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">&#39;source/cddbb.mp4&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 写入视频</span>
        fs<span class="token punctuation">.</span><span class="token function">writeFile</span><span class="token punctuation">(</span><span class="token string">&#39;nmx.mp4&#39;</span><span class="token punctuation">,</span> data<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;写入成功！&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//3. 流式文件的读入（批量文件处理）</span>
<span class="token keyword">let</span> re<span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createReadStream</span><span class="token punctuation">(</span><span class="token string">&#39;source/cddbb.mp4&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//建立读取流</span>
<span class="token keyword">let</span> ws<span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createWriteStream</span><span class="token punctuation">(</span><span class="token string">&#39;新建的视频.mp4&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//建立写入流</span>

<span class="token comment">//4. 创建管道</span>
re<span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>ws<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//文件流传输</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;文件流传输完成&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),j={href:"https://www.jb51.net/article/133553.htm",target:"_blank",rel:"noopener noreferrer"},S={href:"https://github.com/AnsonZnl/StudyNodeJS",target:"_blank",rel:"noopener noreferrer"};function F(x,q){const a=o("ExternalLinkIcon");return c(),l("div",null,[u,n("p",null,[n("a",r,[t(a)])]),d,k,n("p",null,[s("文件标记（flags）： "),n("a",v,[s("http://nodejs.cn/api/fs.html#fs_fs_open_path_flags_mode_callback"),t(a)])]),m,n("p",null,[n("a",b,[t(a)])]),f,n("p",null,[s("文件流写入： "),n("a",h,[s("http://nodejs.cn/api/fs.html#fs_fs_createwritestream_path_options"),t(a)])]),g,n("p",null,[n("a",_,[t(a)])]),E,n("p",null,[s("文档地址："),n("a",w,[s("http://nodejs.cn/api/fs.html#fs_fs_readfile_path_options_callback"),t(a)]),s(" 读取文档：")]),y,n("p",null,[n("a",B,[t(a)])]),A,n("p",null,[s("参考："),n("a",j,[s("详解NodeJS文件系统fs"),t(a)]),s(" 我的GitHub总结的"),n("a",S,[s("NodeJS笔记"),t(a)])])])}const J=p(i,[["render",F],["__file","NodeJs文件系统（fs）与流（stream）.html.vue"]]);export{J as default};
