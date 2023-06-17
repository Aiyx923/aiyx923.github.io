import{_ as a,r,o as s,c as E,a as l,b as e,d as i,w as o,e as c}from"./app-00a966d3.js";const B={},u=l("h1",{id:"前端性能优化总结",tabindex:"-1"},[l("a",{class:"header-anchor",href:"#前端性能优化总结","aria-hidden":"true"},"#"),e(" 前端性能优化总结")],-1),d={href:"https://juejin.im/book/6844733750048210957/section/6844733750031417352",target:"_blank",rel:"noopener noreferrer"},h=l("p",null,[e("性能优化的知识，比较零散，就 web 来说，我所理解的性能优化就是"),l("strong",null,"用户在浏览网页过程中，网页以最快的速度展示，并在使用过程中把卡顿、抖动、加载、白屏等不友好体验降底到无限趋近于 0 的过程")],-1),p=l("p",null,"本人知识所限，只能在前端的角度，从网络、缓存、浏览器渲染、编码的角度来总结一些优化经验。",-1),_=l("p",null,[l("img",{src:"https://i.loli.net/2021/01/08/DKOCMTspWhntL2r.png",alt:"performance_mind.jpg"})],-1),f=l("h2",{id:"目录",tabindex:"-1"},[l("a",{class:"header-anchor",href:"#目录","aria-hidden":"true"},"#"),e(" 目录")],-1),m=l("h2",{id:"从输入-url-到页面显示-中间发生了什么",tabindex:"-1"},[l("a",{class:"header-anchor",href:"#从输入-url-到页面显示-中间发生了什么","aria-hidden":"true"},"#"),e(" 从输入 URL 到页面显示，中间发生了什么？")],-1),A={href:"https://juejin.cn/post/6844903784229896199#heading-0",target:"_blank",rel:"noopener noreferrer"},D=c('<p>在展开性能优化的话题之前，我想先抛出一个老生常谈的面试问题：</p><blockquote><p>从输入 URL 到页面加载完成，发生了什么？</p></blockquote><p>大概过程：首先我们需要通过 DNS（域名解析系统）将 URL 解析为对应的 IP 地址，然后与这个 IP 地址确定的那台服务器建立起 TCP 网络连接，随后我们向服务端抛出我们的 HTTP 请求，服务端处理完我们的请求之后，把目标数据放在 HTTP 响应里返回给客户端，拿到响应数据的浏览器就可以开始走一个渲染的流程。渲染完毕，页面便呈现给了用户，并时刻等待响应用户的操作。</p><p>关键的几步分别是：</p><ol><li>DNS 解析</li><li>建立 TCP 链接，发送 HTTP 请求</li><li>服务端响应，返回响应数据</li><li>浏览器拿到响应数据，解析并渲染出来</li><li>渲染完成出来之后，等待用户下一步的操作..</li></ol><p>我们根据这几点，逐步分析：</p><ol><li>DNS 解析 DNS 解析花时间，如何能减少解析次数或者把解析前置？ <ol><li>浏览器 DNS 缓存和 DNS prefetch。</li></ol></li><li>TCP 每次的三次握手都急死人，有没有解决方案？ <ol><li>长连接、预连接、接入 SPDY 协议。</li></ol></li><li>HTTP 请求呢？ <ol><li>减少请求的次数和减少请求的体积</li></ol></li><li>浏览器渲染数据呢？ <ol><li>这部分涉及资源加载优化、服务端渲染、浏览器缓存机制的利用、DOM 树的构建、网页排版和渲染过程、回流与重绘的考量、DOM 操作的合理规避等等——这正是前端工程师可以真正一展拳脚的地方。学习这些知识，不仅可以帮助我们从根本上提升页面性能，更能够大大加深个人对浏览器底层原理、运行机制的理解，一举两得！</li></ol></li></ol><p>总的来说，1、2 是后端甚至运维优化的部分，3、4 才是我们能优化的部分，我们将从<strong>网络层面</strong>和<strong>渲染层</strong>面两个大的维度来逐个点亮前端性能优化的技能树。</p><h2 id="优化方法" tabindex="-1"><a class="header-anchor" href="#优化方法" aria-hidden="true">#</a> 优化方法</h2><ul><li><p>减少不必要的 HTTP 请求</p><ul><li>雪碧图：CSSSprites（将多张小图片合并成一张图的）</li><li>节流和防抖</li><li>前端表单验证</li></ul></li><li><p>利用好浏览器缓存</p><ul><li>http 缓存（强制缓存、协商缓存）</li><li>浏览器缓存（localStroage/sessionStroage/cookie/indexdDB）</li></ul></li><li><p>浏览器渲染</p><ul><li>减少重绘和回流</li><li>减少 DOM 操作（或将多次操作合并为一次）</li></ul></li><li><p>前端代码和资源的压缩</p><ul><li>Gzip 压 缩</li><li>压缩 JS、CSS、HTML 文件：去掉多余空格、回车、注释等</li><li>文件压缩：压缩图片、字体等</li></ul></li><li><p>其他</p><ul><li>CDN 加速：使用静态资源部署在各地的服务器上</li><li>如有大量的图片请使用懒加载</li><li>频繁的操作请使用节流和防抖</li><li>CSS 层级不要嵌套超过 3 层</li><li>善用缓存（http 缓存和浏览器缓存）</li><li>使用小图片（base64 或者 webp 格式的）</li><li>webpack 按需加载</li></ul></li></ul>',10);function C(S,P){const n=r("ExternalLinkIcon"),t=r("RouterLink");return s(),E("div",null,[u,l("blockquote",null,[l("p",null,[e("这里的内容是我购买的掘金小册 "),l("a",d,[e("前端性能优化原理与实践"),i(n)]),e(" 和自己工作实际遇到的一些优化问题总结而来")])]),h,p,_,f,l("ul",null,[l("li",null,[i(t,{to:"/articles/Performance/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98%E6%9C%BA%E5%88%B6.html"},{default:o(()=>[e("浏览器缓存机制")]),_:1})]),l("li",null,[i(t,{to:"/articles/Performance/DOM%E4%BC%98%E5%8C%96%E4%B9%8B%E9%87%8D%E7%BB%98%E5%92%8C%E5%9B%9E%E6%B5%81.html"},{default:o(()=>[e("DOM 优化之重绘和回流")]),_:1})]),l("li",null,[i(t,{to:"/articles/Performance/%E4%BD%BF%E7%94%A8Documentfragment%E4%BC%98%E5%8C%96DOM%E6%93%8D%E4%BD%9C.html"},{default:o(()=>[e("使用 Documentfragment 优化 DOM 操作")]),_:1})]),l("li",null,[i(t,{to:"/articles/Performance/%E4%BA%8B%E4%BB%B6%E7%9A%84%E9%98%B2%E6%8A%96%E5%92%8C%E8%8A%82%E6%B5%81.html"},{default:o(()=>[e("事件的防抖和节流")]),_:1})]),l("li",null,[i(t,{to:"/articles/Performance/JS%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF%E4%B9%8B%E5%AE%8F%E4%BB%BB%E5%8A%A1%E5%92%8C%E5%BE%AE%E4%BB%BB%E5%8A%A1.html"},{default:o(()=>[e("JS 事件循环之宏任务和微任务")]),_:1})]),l("li",null,[i(t,{to:"/articles/Performance/%E9%A6%96%E5%B1%8F%E4%BC%98%E5%8C%96%E4%B9%8B%E6%87%92%E5%8A%A0%E8%BD%BD.html"},{default:o(()=>[e("首屏优化之懒加载")]),_:1})]),l("li",null,[i(t,{to:"/articles/Performance/%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96.html"},{default:o(()=>[e("微信小程序性能优化")]),_:1})])]),m,l("p",null,[e("完整过程可参考："),l("a",A,[e("从 URL 输入到页面展现到底发生什么？"),i(n)])]),D])}const b=a(B,[["render",C],["__file","index.html.vue"]]);export{b as default};