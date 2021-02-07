!function(){"use strict";var t,e=(function(t){var e=function(t){var e,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof y?e:y,a=Object.create(o.prototype),i=new A(n||[]);return a._invoke=function(t,e,r){var n=h;return function(o,a){if(n===p)throw new Error("Generator is already running");if(n===d){if("throw"===o)throw a;return N()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=_(i,r);if(c){if(c===v)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var u=f(t,e,r);if("normal"===u.type){if(n=r.done?d:l,u.arg===v)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=d,r.method="throw",r.arg=u.arg)}}}(t,r,i),a}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var h="suspendedStart",l="suspendedYield",p="executing",d="completed",v={};function y(){}function g(){}function m(){}var w={};w[a]=function(){return this};var b=Object.getPrototypeOf,x=b&&b(b(S([])));x&&x!==r&&n.call(x,a)&&(w=x);var L=m.prototype=y.prototype=Object.create(w);function k(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function r(o,a,i,c){var u=f(t[o],t,a);if("throw"!==u.type){var s=u.arg,h=s.value;return h&&"object"==typeof h&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(h).then((function(t){s.value=t,i(s)}),(function(t){return r("throw",t,i,c)}))}c(u.arg)}var o;this._invoke=function(t,n){function a(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(a,a):a()}}function _(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,_(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=f(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,v;var a=o.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function A(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function S(t){if(t){var r=t[a];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:N}}function N(){return{value:e,done:!0}}return g.prototype=L.constructor=m,m.constructor=g,g.displayName=u(m,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,u(t,c,"GeneratorFunction")),t.prototype=Object.create(L),t},t.awrap=function(t){return{__await:t}},k(E.prototype),E.prototype[i]=function(){return this},t.AsyncIterator=E,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new E(s(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},k(L),u(L,c,"Generator"),L[a]=function(){return this},L.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=S,A.prototype={constructor:A,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(j),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),s=n.call(i,"finallyLoc");if(u&&s){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,v):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),j(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;j(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:S(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=e}catch(t){Function("r","regeneratorRuntime = r")(e)}}(t={exports:{}},t.exports),t.exports);function r(t,e,r,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}var n=function(t){return function(){var e=this,n=arguments;return new Promise((function(o,a){var i=t.apply(e,n);function c(t){r(i,o,a,c,u,"next",t)}function u(t){r(i,o,a,c,u,"throw",t)}c(void 0)}))}};function o(t){return null!==t.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)}function a(t){return i.apply(this,arguments)}function i(){return(i=n(e.mark((function t(r){var n;return e.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r){t.next=2;break}return t.abrupt("return",!1);case 2:return n=new Blob([r],{type:"image/jpeg"}),t.next=5,URL.createObjectURL(n);case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function c(){return"caches"in window}function u(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.location.hostname,e=arguments.length>1?arguments[1]:void 0,r=arguments.length>2?arguments[2]:void 0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"30";if(!c||void 0===e||!o(e))return!1;caches.open("".concat(t,"__imgaide")).then((function(t){var o=JSON.stringify({timestamp:Date.now(),cacheexpiry:n,buffer:r});t.put("".concat(e),new Response(o))}))}function s(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.location.hostname,e=arguments.length>1?arguments[1]:void 0;if(!c||void 0===e||!o(e))return!1;caches.open("".concat(t,"__imgaide")).then((function(t){t.delete(e)}))}function f(){return h.apply(this,arguments)}function h(){return(h=n(e.mark((function t(){var r,n,i,u,f,h,l,p,d,v,y=arguments;return e.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=y.length>0&&void 0!==y[0]?y[0]:window.location.hostname,n=y.length>1?y[1]:void 0,c&&void 0!==n&&o(n)){t.next=4;break}return t.abrupt("return",!1);case 4:return i={ignoreSearch:!1,ignoreMethod:!0,ignoreVary:!1},t.next=7,caches.open("".concat(r,"__imgaide"));case 7:return u=t.sent,t.next=10,u.match(n,i);case 10:if(!(f=t.sent)){t.next=33;break}return t.next=14,f.json();case 14:if(h=t.sent,l=Date.now(),parseInt(h.cacheexpiry).toString().length,!(h.timestamp<l-6e4)){t.next=21;break}return s(),t.abrupt("return",!1);case 21:if(h.error||!h.buffer){t.next=30;break}return p=h.buffer.data||h.buffer,d=new Uint8Array(p),t.next=26,a(d);case 26:return v=t.sent,t.abrupt("return",v);case 30:return t.abrupt("return",!1);case 31:t.next=34;break;case 33:return t.abrupt("return",!1);case 34:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function l(t,e){return p.apply(this,arguments)}function p(){return(p=n(e.mark((function t(r,n){var i,c,s,f,h,l,p;return e.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r&&n&&o(n)){t.next=2;break}return t.abrupt("return",!1);case 2:return i=function(){return d(r,r.src),!1},t.next=5,fetch("http://localhost:3001/image/request",{method:"POST",mode:"cors",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({url:n})}).catch((function(t){return i()}));case 5:if((c=t.sent).ok){t.next=8;break}return t.abrupt("return",i());case 8:return t.next=10,c.json();case 10:if((s=t.sent).error||!s.buffer){t.next=23;break}return f=s.buffer.data||s.buffer,h=new Uint8Array(f),t.next=16,a(h);case 16:if(!(l=t.sent)||0!==l.indexOf("blob:http")){t.next=23;break}return r.src=l,p=r.getAttribute("data-imgaide-cacheexpiry")||void 0,r.hasAttribute("data-imgaide-nocache")||u("testcachename",n,s.buffer,p),t.abrupt("return",!0);case 23:return t.abrupt("return",!1);case 24:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function d(t,e){o(e)&&(t.src=e)}document.addEventListener("DOMContentLoaded",(function(){[].slice.call(document.querySelectorAll("[data-imgaide-src]")).forEach(function(){var t=n(e.mark((function t(r){var n,a;return e.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(n=r.getAttribute("data-imgaide-src"))||!o(n)){t.next=13;break}if(/^(:\/\/)/.test(n)&&(n="http://".concat(n)),/^(f|ht)tps?:\/\//i.test(n)||(n="https://".concat(n)),a=null,r.hasAttribute("data-imgaide-nocache")){t.next=10;break}return t.next=9,f("testcachename",n);case 9:a=t.sent;case 10:a&&0===a.indexOf("blob:http")?r.src=a:l(r,n),t.next=14;break;case 13:d(r,r.src);case 14:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}))}();
