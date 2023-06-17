import{_ as e,o as n,c as t,e as a}from"./app-00a966d3.js";const i={},s=a(`<h1 id="清楚所有定时器" tabindex="-1"><a class="header-anchor" href="#清楚所有定时器" aria-hidden="true">#</a> 清楚所有定时器</h1><p>关键点：定时器的ID都是累加的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>let end = setInterval(function () { }, 10000);
for (let i = 1; i &lt;= end; i++) {
    clearInterval(i);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),d=[s];function l(r,c){return n(),t("div",null,d)}const o=e(i,[["render",l],["__file","清楚所有定时器.html.vue"]]);export{o as default};
