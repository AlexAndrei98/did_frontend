(this.webpackJsonpdid_frontend=this.webpackJsonpdid_frontend||[]).push([[6],{108:function(e,n,r){e.exports={Order:"Order_Order__3kYZJ"}},115:function(e,n,r){"use strict";r.r(n);var t=r(1),i=r(108),c=r.n(i),d=r(0),s=function(e){var n=[];for(var r in e.ingredients)n.push({name:r,amount:e.ingredients[r]});var t=n.map((function(e){return Object(d.jsxs)("span",{style:{textTransform:"capitalize",display:"inline-block",margin:"0 8px",border:"1px solid #ccc",padding:"5px"},children:[e.name," (",e.amount,")"]},e.name)}));return Object(d.jsxs)("div",{className:c.a.Order,children:[Object(d.jsxs)("p",{children:["Ingredients: ",t]}),Object(d.jsxs)("p",{children:["Price: ",Object(d.jsxs)("strong",{children:["USD ",Number.parseFloat(e.price).toFixed(2)]})]})]})},a=r(22),u=r(48),o=r(13),j=r(6),b=r(32);n.default=Object(u.a)((function(){var e=Object(o.c)(),n=Object(t.useCallback)((function(n,r){return e(j.i(n,r))}),[e]),r=Object(o.d)((function(e){return e.order.orders})),i=Object(o.d)((function(e){return e.order.loading})),c=Object(o.d)((function(e){return e.auth.token})),a=Object(o.d)((function(e){return e.auth.userId}));Object(t.useEffect)((function(){n(c,a)}),[n,c,a]);var u=Object(d.jsx)(b.a,{});return i||(u=r.map((function(e){return Object(d.jsx)(s,{ingredients:e.ingredients,price:e.price},e.id)}))),Object(d.jsx)("div",{children:u})}),a.a)}}]);
//# sourceMappingURL=6.395d8517.chunk.js.map