if(!self.define){let e,i={};const s=(s,r)=>(s=new URL(s+".js",r).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(r,c)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let n={};const o=e=>s(e,d),f={module:{uri:d},exports:n,require:o};i[d]=Promise.all(r.map((e=>f[e]||o(e)))).then((e=>(c(...e),n)))}}define(["./workbox-475b3d61"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"css/expanded.css",revision:"95529493de2502d366bfde1ed9c67f8a"},{url:"css/styles.css",revision:"6af28d1d62f6b0c5e50c1337219a2a11"},{url:"img/blackqr.png",revision:"484c1c2cef3cc6bb9bb861d119afb5a6"},{url:"img/card.png",revision:"f92b6401a69f2d0f1642a4f4f355c63a"},{url:"img/complete.png",revision:"cede87d1dc9d00e835d1d297acd5c6e9"},{url:"img/failed.png",revision:"a558ecb9284439fa457de99f2bf05c0c"},{url:"img/invoice.png",revision:"0de26d5b25ba973ab4f926f8c654b500"},{url:"img/logo.png",revision:"42af46d071603be7d88e00867d15dc06"},{url:"index.html",revision:"7f384e1bd8d92ae11ff0bf83dc9077c2"},{url:"js/pipayment.js",revision:"bcac910ad0cd085b3584c61ed4680296"},{url:"js/qr.js",revision:"270c964ec0b3a89d006b782c1e24ed37"},{url:"js/routes.js",revision:"2e6bf7f5d0c37f122c414ee87058773f"},{url:"js/scripts.js",revision:"521befa318a602899a080977f16224b2"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map