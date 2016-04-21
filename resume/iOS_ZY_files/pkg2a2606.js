var BJ_REPORT=(function(m){
if(m.BJ_REPORT)
{
return m.BJ_REPORT;
}
var b=[];
var n=m.onerror;
m.onerror=function(s,u,r,p,q){
var t=s;
if(q&&q.stack)
{
t=h(q);
}
o.push({msg:t,target:u,rowNum:r,colNum:p});
i();
n&&n.apply(m,arguments);
};
var a={id:0,uin:0,url:"",combo:1,ext:{},level:4,ignore:[],random:1,delay:100,submit:null};
var f=function(p,q){
return Object.prototype.toString.call(p)==="[object "+(q||"Object")+"]";
};
var e=function(p){
var q=typeof p;
return q==='object'&&!!p;
};
var g=function(q){
try{
if(q.stack)
{
var t=q.stack.match('http://[^\n]+');
t=t?t[0]:"";
var r=t.match(':([0-9]+):([0-9]+)');
if(!r)
{
r=[0,0,0];
}
var s=h(q);
return {msg:s,rowNum:r[1],colNum:r[2],target:t.replace(r[0],'')};
}
else{
return q;
}
}
catch(p)
{
return q;
}
};
var h=function(p){
var r=p.stack.replace(/\n/gi,'').split(/\bat\b/).slice(0,5).join("@").replace(/\?[^:]+/gi,"");
var q=p.toString();
if(r.indexOf(q)<0)
{
r=q+"@"+r;
}
return r;
};
var c=function(q,r){
var t=[];
var u=[];
var v=[];
if(e(q))
{
q.level=q.level||a.level;
for(var s in q)
{
var w=q[s]||"";
if(w)
{
if(e(w))
{
try{
w=JSON.stringify(w);
}
catch(p)
{
w="[BJ_REPORT detect value stringify error] "+p.toString();
}
}
v.push(s+":"+w);
t.push(s+"="+encodeURIComponent(w));
u.push(s+"["+r+"]="+encodeURIComponent(w));
}
}
}
return [u.join("&"),v.join(","),t.join("&")];
};
var d=[];
var j=function(q){
if(a.submit)
{
a.submit(q);
}
else{
var p=new Image();
d.push(p);
p.src=q;
}
};
var l=[];
var k=0;
var i=function(v){
if(!a.report)
{
return;
}
while(b.length)
{
var u=false;
var r=b.shift();
var s=c(r,l.length);
for(var t=0,w=a.ignore.length;t<w;t++)
{
var x=a.ignore[t];
if((f(x,"RegExp")&&x.test(s[1]))||(f(x,"Function")&&x(r,s[1])))
{
u=true;
break;
}
}
if(!u)
{
if(a.combo)
{
l.push(s[0]);
}
else{
j(a.report+s[2]+"&_t="+(+new Date()));
}
a.onReport&&(a.onReport(a.id,r));
}
}
var q=l.length;
if(q)
{
var p=function(){
clearTimeout(k);
j(a.report+l.join("&")+"&count="+q+"&_t="+(+new Date()));
k=0;
l=[];
};
if(v)
{
p();
}
else if(!k)
{
k=setTimeout(p,a.delay);
}
}
};
var o={push:function(p){
if(Math.random()>=a.random)
{
return o;
}
b.push(e(p)?g(p):{msg:p});
i();
return o;
},report:function(p){
p&&o.push(p);
i(true);
return o;
},init:function(p){
if(e(p))
{
for(var r in p)
{
a[r]=p[r];
}
}
var q=parseInt(a.id,10);
if(q)
{
a.report=(a.url||"http://badjs2.qq.com/badjs")+"?id="+q+"&uin="+parseInt(a.uin||(document.cookie.match(/\buin=\D+(\d+)/)||[])[1],10)+"&from="+encodeURIComponent(location.href)+"&ext="+JSON.stringify(a.ext)+"&";
}
return o;
},__onerror__:m.onerror};
return o;
}(window));
if(typeof exports!=='undefined')
{
if(typeof module!=='undefined'&&module.exports)
{
exports=module.exports=BJ_REPORT;
}
exports.BJ_REPORT=BJ_REPORT;
}
;(function(j){
if(!j.BJ_REPORT)
{
return;
}
var c=function(l){
j.BJ_REPORT.report(l);
};
var k=j.BJ_REPORT.tryJs=function g(l){
l&&(c=l);
return k;
};
var b=function(n,m){
var l;
for(l in m)
{
n[l]=m[l];
}
};
var a=function(l){
return typeof l==='function';
};
var d=function(m,l){
return function(){
try{
return m.apply(this,l||arguments);
}
catch(n)
{
c(n);
if(n.stack&&console&&console.error)
{
console.error("[BJ-REPORT]",n.stack);
}
var o=j.onerror;
j.onerror=function(){
};
setTimeout(function(){
j.onerror=o;
},50);
throw n;
}
};
};
var e=function(l){
return function(){
var m,n=[];
for(var o=0,p=arguments.length;o<p;o++)
{
m=arguments[o];
a(m)&&(m=d(m));
n.push(m);
}
return l.apply(this,n);
};
};
var f=function(l){
return function(n,p){
if(typeof n==='string')
{
try{
n=new Function(n);
}
catch(o)
{
throw o;
}
}
var m=[].slice.call(arguments,2);
n=d(n,m.length&&m);
return l(n,p);
};
};
var h=function(l,m){
return function(){
var n,r,o=[];
for(var p=0,q=arguments.length;p<q;p++)
{
n=arguments[p];
a(n)&&(r=d(n))&&(n.tryWrap=r)&&(n=r);
o.push(n);
}
return l.apply(m||this,o);
};
};
var i=function(m){
var l,n;
for(l in m)
{
n=m[l];
if(a(n))
m[l]=d(n);
}
return m;
};
k.spyJquery=function(){
var l=j.$;
if(!l||!l.event)
{
return k;
}
var m=l.event.add,n=l.ajax,o=l.event.remove;
if(m)
{
l.event.add=h(m);
l.event.remove=function(){
var p,q=[];
for(var r=0,s=arguments.length;r<s;r++)
{
p=arguments[r];
a(p)&&(p=p.tryWrap);
q.push(p);
}
return o.apply(this,q);
};
}
if(n)
{
l.ajax=function(q,p){
if(!p)
{
p=q;
q=undefined;
}
i(p);
if(q)
{
return n.call(l,q,p);
}
return n.call(l,p);
};
}
return k;
};
k.spyModules=function(){
var m=j.require,l=j.define;
if(l&&l.amd&&m)
{
j.require=e(m);
b(j.require,m);
j.define=e(l);
b(j.define,l);
}
if(j.seajs&&l)
{
j.define=function(){
var n,o=[];
for(var p=0,q=arguments.length;p<q;p++)
{
n=arguments[p];
if(a(n))
{
n=d(n);
n.toString=(function(r){
return function(){
return r.toString();
};
}(arguments[p]));
}
o.push(n);
}
return l.apply(this,o);
};
b(j.define,l);
}
return k;
};
k.spySystem=function(){
j.setTimeout=f(j.setTimeout);
j.setInterval=f(j.setInterval);
return k;
};
k.spyCustom=function(l){
if(a(l))
{
return d(l);
}
else{
return i(l);
}
};
k.spyAll=function(){
k.spyJquery().spyModules().spySystem();
return k;
};
}(window));
$.package("comm/extend/json2.js",[],function(_aoUndefined){
var JSON=window.JSON;
if(!JSON||(JSON.stringify&&JSON.stringify("\u6211").indexOf("u"))>0)
{
JSON=window.JSON={};
}
(function(){
"use strict";
function f(n)
{
return n<10?'0'+n:n;
}
if(typeof Date.prototype.toJSON!=='function')
{
Date.prototype.toJSON=function(key){
return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;
};
String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){
return this.valueOf();
};
}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;
function quote(string)
{
escapable.lastIndex=0;
return escapable.test(string)?'"'+string.replace(escapable,function(a){
var c=meta[a];
return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);
})+'"':'"'+string+'"';
}
function str(key,holder)
{
var i,k,v,length,mind=gap,partial,value=holder[key];
if(value&&typeof value==='object'&&typeof value.toJSON==='function')
{
value=value.toJSON(key);
}
if(typeof rep==='function')
{
value=rep.call(holder,key,value);
}
switch(typeof value)
{case 'string':
return quote(value);
case 'number':
return isFinite(value)?String(value):'null';
case 'boolean':
case 'null':
return String(value);
case 'object':
if(!value)
{
return 'null';
}
gap+=indent;
partial=[];
if(Object.prototype.toString.apply(value)==='[object Array]')
{
length=value.length;
for(i=0;i<length;i+=1)
{
partial[i]=str(i,value)||'null';
}
v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';
gap=mind;
return v;
}
if(rep&&typeof rep==='object')
{
length=rep.length;
for(i=0;i<length;i+=1)
{
if(typeof rep[i]==='string')
{
k=rep[i];
v=str(k,value);
if(v)
{
partial.push(quote(k)+(gap?': ':':')+v);
}
}
}
}
else{
for(k in value)
{
if(Object.prototype.hasOwnProperty.call(value,k))
{
v=str(k,value);
if(v)
{
partial.push(quote(k)+(gap?': ':':')+v);
}
}
}
}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';
gap=mind;
return v;
}
}
if(typeof JSON.stringify!=='function')
{
JSON.stringify=function(value,replacer,space){
var i;
gap='';
indent='';
if(typeof space==='number')
{
for(i=0;i<space;i+=1)
{
indent+=' ';
}
}
else if(typeof space==='string')
{
indent=space;
}
rep=replacer;
if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number'))
{
throw new Error('JSON.stringify');
}
return str('',{'':value});
};
}
if(typeof JSON.parse!=='function')
{
JSON.parse=function(text,reviver){
var j;
function walk(holder,key)
{
var k,v,value=holder[key];
if(value&&typeof value==='object')
{
for(k in value)
{
if(Object.prototype.hasOwnProperty.call(value,k))
{
v=walk(value,k);
if(v!==undefined)
{
value[k]=v;
}
else{
delete value[k];
}
}
}
}
return reviver.call(holder,key,value);
}
text=String(text);
cx.lastIndex=0;
if(cx.test(text))
{
text=text.replace(cx,function(a){
return '\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);
});
}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,'')))
{
j=eval('('+text+')');
return typeof reviver==='function'?walk({'':j},''):j;
}
throw new SyntaxError('JSON.parse');
};
}
}());
});
window.BJ_REPORT.init({id:24,ext:{msid:643726},url:"https://mail.qq.com/badjs"});
if(document.domain.indexOf('mail.qq.com')!=-1)
{
document.domain='mail.qq.com';
}
$.package("comm/ctrl/tagevent.js",[],function(a){
var f="TagEvent/11.03.22",e=QMWin,c=e.ctor_();
function d(g)
{
for(var j=1,h=arguments.length;j<h;j++)
{
e.each(arguments[j],function(i,k){
if(g[k])
{
e.each(i,function(l,m){
if(!g[k][m])
{
g[k][m]=l;
}
});
}
else{
g[k]=i;
}
});
}
return g;
}
;e.createLib("TagEventCatcher",{bStatic:true},function(g){
return ({merge:d});
});
function b(g)
{
var j=g||{},k=j.rule&&j.rule()||[],h=j.events&&j.events()||{},i=j.eventLibs&&j.eventLibs()||[];
$.each(i,function(m){
var l=e,n=b(l.lib(m.name));
k=l.lib("TagEventCatcher").merge(k,n._oRule);
h=l.extend(h,n._oEvents);
});
return {_oMod:j,_oRule:k,_oEvents:h};
}
e.createCtrl("TagEventModHandle",{},function(g){
return ({handle:function(j,i){
var m=this,h=m.$,n=m._moTagEventLib,l=j,k=b(l);
m._moCatcher=h.ctrl("TagEventCatcher",h.extend({oDom:l.dom$(),oRule:k._oRule,oEvents:k._oEvents,oCallObj:l},i));
return m;
},fire:function(){
var h=this._moCatcher;
h.fire.apply(h,arguments);
},init_:function(i){
var j=this,h=j.superEx_(g,"init_",[i]).$;
j._moTagEventLib=h.lib("TagEventCatcher");
}});
});
e.createCtrl("TagEventCatcher",{},function(g){
var k={click:"ck",dblclick:"dbl",mousedown:'md',mouseup:'mu',mouseover:'mor',mousemove:'mm',mouseout:'mot',keydown:'kd',keypress:'kp',keyup:'ku'},l=e.toMap(("click,dblclick,mousedown,mouseup"+",mouseover,mousemove,mouseout"+",keydown,keypress,keyup,scroll").split(","),true),j=0,p="__taGeVEntcATChErS__",q="un",o="__AdDEdeVeNTcAchE__",m={};
function h(r)
{
n(r,r.type);
}
function i(s,t,r)
{
n(s,"fire",r||$.target(s),t);
}
function n(s,t,r,u)
{
var B=r||e.target(s),z=[],A=[],y=[],x=-1,D=k[t]||t,E,C,w,v;
while(B&&B.getAttribute)
{
E=B===r?u:B.getAttribute(D);
E&&(z[++x]=B)&&(A[x]=E)&&(y[x]={});
if(x>-1)
{
C=B.getAttribute(q);
C&&(y[x][C]=y[x][C]||B);
w=B[p];
if($.isNum(w)&&m[w]._matchRule(t,x+1,z,A,y,s)===false)
{
break;
}
}
B=B.parentNode;
}
}
$.addPageUnloadEvent(function(){
$.each(m,function(r,s){
m[s]=null;
});
});
return ({getDom$:function(){
return this._moDom$;
},rule:function(){
return ({});
},events:function(){
return ({});
},merge:d,fire:i,init_:function(s){
var v=this,r=v.superEx_(g,"init_",[s]).$,u=s&&(r.is(s.oDom)?s.oDom.data(0):s.oDom),t=r.isDom(u);
if(!t||!r.isWinEqual(r.inWin(u)))
{
r.error(!t?"new ctrl cfg.oDom is not dom obj":"new ctrl cfg.oDom's window is not match ctrl's window",[this.name_()+"[TagEventCatcher].init_"]);
}
v._moDom$=r.$(u);
v._moRule=v._preProcessRule(s.oRule||v.rule());
v._moEvents=s.oEvents||v.events();
v._msDriven=s.sDriven||"event";
v._moCallObj=s.oCallObj||v;
return v._catch();
},_catch:function(){
var s=this,r=s.$;
if(r.isNum(s._mnGuid))
{
return s;
}
s._moDom$.data(0)[p]=s._mnGuid=j++;
m[s._mnGuid]=s;
r.each(s._moRule,s._catchRule,{oContext:s});
return s;
},_catchRule:function(s,t){
var A=this,r=A.$,z=A._moDom$;
if(l[t])
{
var y=A.$.data(0),w=y[o]||(y[o]={}),x=w[t]||(w[t]=[]),u=true,v;
for(var B=x.length-1;B>=0;B--)
{
v=r.$(x[B]);
if(v.contain(z))
{
u=false;
break;
}
if(z.contain(v))
{
v.delEvent(t,h);
x.pop();
}
}
if(u)
{
z.addEvent(t,h);
x.push(z.data(0));
}
}
else{
z.addEvent(t,h);
}
return A;
},_matchRule:function(x,s,v,w,t,u){
var F=this,r=F.$,E=F._moRule;
if(E=E[x])
{
for(var J=0;J<s;J++)
{
var B=w[J].split(","),y=true;
for(var K=0,z=B.length;K<z;K++)
{
var H=B[K],C=E[H],G,A;
if(!C)
{
break;
}
if(G=C.sContext)
{
for(var L=J;L<s;L++)
{
if(A=t[L][G])
{
break;
}
}
}
else{
A=v[J];
}
if(A)
{
if(x=='mouseout')
{
var D=u.relatedTarget||u.toElement;
if(r.$(A).contain(D))
{
break;
}
}
}
if(A)
{
var I=C.sProcess||H;
y=y&&r.safe(F._moEvents[I],[F.name_(),I].join(".")).call(F._moCallObj,u,v[J],A)!==false&&(C.bPropagable!==false);
}
}
if(!y)
{
return false;
}
}
}
return true;
},_preProcessRule:function(r){
return r;
}});
});
});
$.package("comm/extend/array.js",[],function(a){
var g=QMWin,b=g.ctor_();
var c={every:function(h){
"use strict";
if(this===void 0||this===null)
throw new TypeError();
var l=Object(this);
var k=l.length>>>0;
if(typeof h!=="function")
throw new TypeError();
var m=arguments[1];
for(var j=0;j<k;j++)
{
if(j in l&&!h.call(m,l[j],j,l))
{
return false;
}
}
return true;
},filter:function(h){
"use strict";
if(this===void 0||this===null)
throw new TypeError();
var m=Object(this);
var k=m.length>>>0;
if(typeof h!=="function")
throw new TypeError();
var l=[];
var n=arguments[1];
for(var j=0;j<k;j++)
{
if(j in m)
{
var o=m[j];
if(h.call(n,o,j,m))
l.push(o);
}
}
return l;
},forEach:function(h){
"use strict";
if(this===void 0||this===null)
throw new TypeError();
var l=Object(this);
var k=l.length>>>0;
if(typeof h!=="function")
throw new TypeError();
var m=arguments[1];
for(var j=0;j<k;j++)
{
if(j in l)
h.call(m,l[j],j,l);
}
},indexOf:function(l){
"use strict";
if(this===void 0||this===null)
throw new TypeError();
var m=Object(this);
var i=m.length>>>0;
if(i===0)
{
return -1;
}
var j=0;
if(arguments.length>0)
{
j=Number(arguments[1]);
if(j!==j)
j=0;
else if(j!==0&&j!==(Infinity)&&j!==-(Infinity))
j=(j>0||-1)*Math.floor(Math.abs(j));
}
if(j>=i)
{
return -1;
}
var h=j>=0?j:Math.max(i-Math.abs(j),0);
for(;h<i;h++)
{
if(h in m&&m[h]===l)
{
return h;
}
}
return -1;
},lastIndexOf:function(l){
"use strict";
if(this===void 0||this===null)
throw new TypeError();
var m=Object(this);
var i=m.length>>>0;
if(i===0)
{
return -1;
}
var j=i;
if(arguments.length>1)
{
j=Number(arguments[1]);
if(j!==j)
j=0;
else if(j!==0&&j!==(Infinity)&&j!==-(Infinity))
j=(j>0||-1)*Math.floor(Math.abs(j));
}
var h=j>=0?Math.min(j,i-1):i-Math.abs(j);
for(;h>=0;h--)
{
if(h in m&&m[h]===l)
{
return h;
}
}
return -1;
},map:function(h){
"use strict";
if(this===void 0||this===null)
throw new TypeError();
var m=Object(this);
var k=m.length>>>0;
if(typeof h!=="function")
throw new TypeError();
var l=new Array(k);
var n=arguments[1];
for(var j=0;j<k;j++)
{
if(j in m)
l[j]=h.call(n,m[j],j,m);
}
return l;
},reduce:function(i){
"use strict";
if(this===void 0||this===null)
throw new TypeError();
var m=Object(this);
var l=m.length>>>0;
if(typeof i!=="function")
throw new TypeError();
if(l==0&&arguments.length==1)
throw new TypeError();
var j=0;
var h;
if(arguments.length>=2)
{
h=arguments[1];
}
else{
do{
if(j in m)
{
h=m[j++];
break;
}
if(++j>=l)
throw new TypeError();
}
while(true);
}
while(j<l)
{
if(j in m)
h=i.call(undefined,h,m[j],j,m);
j++;
}
return h;
},reduceRight:function(i){
"use strict";
if(this===void 0||this===null)
throw new TypeError();
var m=Object(this);
var l=m.length>>>0;
if(typeof i!=="function")
throw new TypeError();
if(l===0&&arguments.length===1)
throw new TypeError();
var j=l-1;
var h;
if(arguments.length>=2)
{
h=arguments[1];
}
else{
do{
if(j in this)
{
h=this[j--];
break;
}
if(--j<0)
throw new TypeError();
}
while(true);
}
while(j>=0)
{
if(j in m)
h=i.call(undefined,h,m[j],j,m);
j--;
}
return h;
},some:function(h){
"use strict";
if(this===void 0||this===null)
throw new TypeError();
var l=Object(this);
var k=l.length>>>0;
if(typeof h!=="function")
throw new TypeError();
var m=arguments[1];
for(var j=0;j<k;j++)
{
if(j in l&&h.call(m,l[j],j,l))
{
return true;
}
}
return false;
},groupBy:function(k){
var j={},i=this;
var h=$.isFunc(k)?k:function(l){
return l[k];
};
d.forEach(i,function(n,l){
var m=h(n,l);
(j[m]||(j[m]=[])).push(n);
});
return j;
}};
var f=Array.prototype,d={},e={};
$.each(c,function(h,i){
var k=f[i],j=k||h;
d[i]=function(l){
var m=$.toArr(arguments);
m.shift();
return j.apply(l,m);
};
e[i]=function(){
var m=this,l=m.data();
if(!m.isArr(l))
{
return m;
}
return m.$(j.apply(l,arguments));
};
});
b.extend("method",e);
d.extendPrototype=function(h){
$.each(c,function(i,j){
if(!f[j])
{
f[j]=i;
}
});
};
d.ctor=function(){
return d;
};
g.createLib("array",{},function(){
return d;
});
});
$.package("comm/data/model.js",["comm/extend/array.js"],function(){
var h=QMWin;
var g=$.lib("array");
var i=[].splice;
var b=function(n){
if(!$.isObj(n))
{
return n;
}
return $.isArr(n)?n.slice():$.extend({},n);
};
var c=function(){
return "c"+parseInt(Math.random()*10000000);
};
var k=({}).toString;
function j(n,o,u)
{
if(n===o)
{
return n!==0||1/n==1/o;
}
if(n==null||o==null)
{
return n===o;
}
if(n.isEqual&&$.isFunc(n.isEqual))
{
return n.isEqual(o);
}
if(o.isEqual&&$.isFunc(o.isEqual))
{
return o.isEqual(n);
}
var p=k.call(n);
if(p!=k.call(o))
{
return false;
}
switch(p)
{case '[object String]':
return n==String(o);
case '[object Number]':
return n!=+n?o!=+o:(n==0?1/n==1/o:n==+o);
case '[object Date]':
case '[object Boolean]':
return +n==+o;
case '[object RegExp]':
return n.source==o.source&&n.global==o.global&&n.multiline==o.multiline&&n.ignoreCase==o.ignoreCase;
}if(typeof n!='object'||typeof o!='object')
{
return false;
}
var r=u.length;
while(r--)
{
if(u[r]==n)
{
return true;
}
}
u.push(n);
var t=0,s=true;
if(p=='[object Array]')
{
t=n.length;
s=t==o.length;
if(s)
{
while(t--)
{
if(!(s=t in n==t in o&&j(n[t],o[t],u)))
break;
}
}
}
else{
if('constructor' in n!='constructor' in o||n.constructor!=o.constructor)
{
return false;
}
for(var q in n)
{
if(d(n,q))
{
t++;
if(!(s=d(o,q)&&j(n[q],o[q],u)))
break;
}
}
if(s)
{
for(q in o)
{
if(d(o,q)&&!(t--))
break;
}
s=!t;
}
}
u.pop();
return s;
}
var f=function(n,o){
return j(n,o,[]);
};
var d=function(o,n){
return Object.prototype.hasOwnProperty.call(o,n);
};
var a=function(n,o){
return function(){
return n.apply(o,arguments);
};
};
var e=function(o){
if(o==null)
{
return true;
}
if($.isArr(o)||$.isStr(o))
{
return o.length===0;
}
for(var n in o)
if(d(o,n))
{
return false;
}
return true;
};
_fQMWL=h.ctor_();
_fQMWL.extend("method",{isEqual:f});
var l=function(){
throw new Error('A "url" property or function must be specified');
};
var m=function(n,o){
var p=$.toArr(arguments),q=p[1];
return function(){
var r=p.slice(1).concat($.toArr(arguments));
if(n)
{
n.apply(r[1],r);
}
else{
o.fire.apply(o,["error"].concat(r));
}
};
};
h.createCtrl("data.event",{},function(n){
return ({on:function(){
var o=$.toArr(arguments);
o.unshift(this);
$.addEvent.apply($,o);
return this;
},off:function(){
var o=$.toArr(arguments);
o.unshift(this);
$.delEvent.apply($,o);
return this;
},fire:function(){
var q=this,o=q.$,p=o.toArr(arguments);
o.fireEvent(q,p[0],p.slice(1));
o.fireEvent(q,"all",p);
return this;
}});
});
h.createCtrl("data.model",{sSuper:"data.event"},function(n){
return ({init_:function(o){
o=o||{};
var p=o.attributes;
var r=o.options;
var q;
p||(p={});
if(r&&r.parse)
p=this.parse(p);
if(q=$.getValue(this,'defaults'))
{
p=$.extend({},q,p);
}
if(r&&r.collection)
this.collection=r.collection;
this.attributes={};
this._escapedAttributes={};
this.cid=c('c');
if(!this.set(p,{silent:true}))
{
throw new Error("Can't create an invalid model");
}
delete this._changed;
this._previousAttributes=b(this.attributes);
this.initialize.apply(this,arguments);
},idAttribute:function(){
return "id";
},sync:function(){
},initialize:function(){
},toJSON:function(){
return b(this.attributes);
},get:function(o){
return this.attributes[o];
},escape:function(o){
var p;
if(p=this._escapedAttributes[o])
{
return p;
}
var q=this.attributes[o];
return this._escapedAttributes[o]=$.htmlEncode(q==null?'':''+q);
},has:function(o){
return this.attributes[o]!=null;
},set:function(s,x,u){
var q,p,w;
if($.isObj(s)||s==null)
{
q=s;
u=x;
}
else{
q={};
q[s]=x;
}
if(!this._changing)
{
this._previousAttributes=b(this.attributes);
this._changed={};
}
u||(u={});
if(!q)
{
return this;
}
if($.instanceofCtrl(q,"data.model"))
q=q.attributes;
if(u.unset)
for(p in q)
q[p]=void 0;
if(!this._validate(q,u))
{
return false;
}
if(this.idAttribute() in q)
this.id=q[this.idAttribute()];
var t=this.attributes;
var r=this._escapedAttributes;
var v=this._previousAttributes||{};
var o=this._setting;
this._setting=true;
for(p in q)
{
w=q[p];
if(!f(t[p],w))
delete r[p];
u.unset?delete t[p]:t[p]=w;
if(this._changing&&f(this._changed[p],w))
{
this.fire('change:'+p,this,w,u);
this._moreChanges=true;
}
delete this._changed[p];
if(!f(v[p],w)||(d(t,p)!=d(v,p)))
{
this._changed[p]=w;
}
}
if(!o)
{
if(!u.silent&&this.hasChanged())
this.change(u);
this._setting=false;
}
return this;
},unset:function(o,p){
(p||(p={})).unset=true;
return this.set(o,null,p);
},clear:function(o){
(o||(o={})).unset=true;
return this.set(b(this.attributes),o);
},fetch:function(p){
p=p?b(p):{};
var o=this;
var q=p.onsuccess;
p.onsuccess=function(r,s,t){
if(!o.set(o.parse(r,t),p))
{
return false;
}
if(q)
q(o,r);
};
p.onerror=m(p.onerror,o,p);
return this.sync.call(this,'read',this,p);
},save:function(q,w,t){
var o,p;
if($.isObj(q)||q==null)
{
o=q;
t=w;
}
else{
o={};
o[q]=w;
}
t=t?b(t):{};
if(t.wait)
p=b(this.attributes);
var u=$.extend({},t,{silent:true});
if(o&&!this.set(o,t.wait?u:t))
{
return false;
}
var s=this;
var v=t.onsuccess;
t.onsuccess=function(y,A,B){
var z=s.parse(y,B);
if(t.wait)
z=$.extend(o||{},z);
if(!s.set(z,t))
{
return false;
}
if(v)
{
v(s,y);
}
else{
s.fire('sync',s,y,t);
}
};
t.onerror=m(t.onerror,s,t);
var r=this.isNew()?'create':'update';
var x=this.sync.call(this,r,this,t);
if(t.wait)
this.set(p,u);
return x;
},destroy:function(p){
p=p?b(p):{};
var o=this;
var q=p.onsuccess;
var r=function(){
o.fire('destroy',o,o.collection,p);
};
if(this.isNew())
{
return r();
}
p.onsuccess=function(t){
if(p.wait)
r();
if(q)
{
q(o,t);
}
else{
o.fire('sync',o,t,p);
}
};
p.onerror=m(p.onerror,o,p);
var s=this.sync.call(this,'delete',this,p);
if(!p.wait)
r();
return s;
},url:function(){
var o=$.getValue(this.collection,'url')||$.getValue(this,'urlRoot')||l();
if(this.isNew())
{
return o;
}
return o+(o.charAt(o.length-1)=='/'?'':'/')+encodeURIComponent(this.id);
},parse:function(o,p){
return o;
},clone:function(){
return this.$.ctrl(this.name_(),{attributes:this.attributes});
},isNew:function(){
return this.id==null;
},change:function(p){
if(this._changing||!this.hasChanged())
{
return this;
}
this._changing=true;
this._moreChanges=true;
for(var o in this._changed)
{
this.fire('change:'+o,this,this._changed[o],p);
}
while(this._moreChanges)
{
this._moreChanges=false;
this.fire('change',this,p);
}
delete this._changed;
this._changing=false;
return this;
},hasChanged:function(o){
if(!arguments.length)
{
return !e(this._changed);
}
return this._changed&&d(this._changed,o);
},changedAttributes:function(q){
if(!q)
{
return this.hasChanged()?b(this._changed):false;
}
var s,p=false,r=this._previousAttributes;
for(var o in q)
{
if(f(r[o],(s=q[o])))
continue;
(p||(p={}))[o]=s;
}
return p;
},previous:function(o){
if(!arguments.length||!this._previousAttributes)
{
return null;
}
return this._previousAttributes[o];
},previousAttributes:function(){
return b(this._previousAttributes);
},isValid:function(){
return !this.validate(this.attributes);
},_validate:function(o,q){
if(q.silent||!this.validate)
{
return true;
}
o=$.extend({},this.attributes,o);
var p=this.validate(o,q);
if(!p)
{
return true;
}
if(q&&q.onerror)
{
q.onerror(this,p,q);
}
else{
this.fire('error',this,p,q);
}
return false;
}});
});
h.createCtrl("data.collection",{sSuper:"data.event"},function(n){
var o={init_:function(p){
p=p||{};
var q=p.models;
var r=p.options;
r||(r={});
if(r.comparator)
this.comparator=r.comparator;
this._reset();
this.initialize.apply(this,arguments);
if(q)
{
this.reset(q,{silent:true,parse:r.parse});
}
},initialize:function(){
},sync:function(){
},modelName:function(){
return "data.model";
},initialize:function(){
},toJSON:function(){
return this.map(function(p){
return p.toJSON();
});
},add:function(x,y){
var r,u,v,w,p,s,q={},t={};
y||(y={});
x=$.isArr(x)?x.slice():[x];
for(r=0,v=x.length;r<v;r++)
{
if(!(w=x[r]=this._prepareModel(x[r],y)))
{
throw new Error("Can't add an invalid model to a collection");
}
if(q[p=w.cid]||this._byCid[p]||(((s=w.id)!=null)&&(t[s]||this._byId[s])))
{
throw new Error("Can't add the same model to a collection twice");
}
q[p]=t[s]=w;
}
for(r=0;r<v;r++)
{
(w=x[r]).on("all",this._onModelEvent,{oContext:this});
this._byCid[w.cid]=w;
if(w.id!=null)
this._byId[w.id]=w;
}
this.length+=v;
u=y.at!=null?y.at:this.models.length;
i.apply(this.models,[u,0].concat(x));
if(this.comparator)
{
this.sort({silent:true});
}
if(y.silent)
{
return this;
}
for(r=0,v=this.models.length;r<v;r++)
{
if(!q[(w=this.models[r]).cid])
continue;
y.index=r;
w.fire('add',w,this,y);
}
return this;
},remove:function(t,u){
var p,r,q,s;
u||(u={});
t=$.isArr(t)?t.slice():[t];
for(p=0,r=t.length;p<r;p++)
{
s=this.getByCid(t[p])||this.get(t[p]);
if(!s)
continue;
delete this._byId[s.id];
delete this._byCid[s.cid];
q=this.indexOf(s);
this.models.splice(q,1);
this.length--;
if(!u.silent)
{
u.index=q;
s.fire('remove',s,this,u);
}
this._removeReference(s);
}
return this;
},get:function(p){
if(p==null)
{
return null;
}
return this._byId[p.id!=null?p.id:p];
},getByCid:function(p){
return p&&this._byCid[p.cid||p];
},at:function(p){
return this.models[p];
},sort:function(q){
q||(q={});
if(!this.comparator)
throw new Error('Cannot sort a set without a comparator');
var p=a(this.comparator,this);
if(this.comparator.length==1)
{
this.models=this.sortBy(p);
}
else{
this.models.sort(p);
}
if(!q.silent)
this.fire('reset',this,q);
return this;
},pluck:function(p){
return g.map(this.models,function(q){
return q.get(p);
});
},reset:function(r,s){
r||(r=[]);
s||(s={});
for(var p=0,q=this.models.length;p<q;p++)
{
this._removeReference(this.models[p]);
}
this._reset();
this.add(r,{silent:true,parse:s.parse});
if(!s.silent)
this.fire('reset',this,s);
return this;
},fetch:function(q){
q=q?b(q):{};
if(q.parse===undefined)
q.parse=true;
var p=this;
var r=q.onsuccess;
q.onsuccess=function(s,t,u){
p[q.add?'add':'reset'](p.parse(s,u),q);
if(r)
r(p,s);
};
q.onerror=m(q.onerror,p,q);
return this.sync.call(this,'read',this,q);
},create:function(q,r){
var p=this;
r=r?b(r):{};
q=this._prepareModel(q,r);
if(!q)
{
return false;
}
if(!r.wait)
p.add(q,r);
var s=r.onsuccess;
r.onsuccess=function(t,u,v){
if(r.wait)
p.add(t,r);
if(s)
{
s(t,u);
}
else{
t.fire('sync',q,u,r);
}
};
q.save(null,r);
return q;
},parse:function(p,q){
return p;
},_reset:function(p){
this.length=0;
this.models=[];
this._byId={};
this._byCid={};
},_prepareModel:function(q,r){
if(!$.instanceofCtrl(q,"data.model"))
{
var p=q;
r.collection=this;
q=$.ctrl($.getValue(this,"modelName"),{attributes:p,options:r});
if(!q._validate(q.attributes,r))
q=false;
}
else if(!q.collection)
{
q.collection=this;
}
return q;
},_removeReference:function(p){
if(this==p.collection)
{
delete p.collection;
}
p.off("all",this._onModelEvent);
},_onModelEvent:function(q,r,p,s){
if((q=='add'||q=='remove')&&p!=this)
{
return;
}
if(q=='destroy')
{
this.remove(r,s);
}
if(r&&q==='change:'+r.idAttribute())
{
delete this._byId[r.previous(r.idAttribute())];
this._byId[r.id]=r;
}
this.fire.apply(this,arguments);
}};
$.each(g.ctor(),function(p,q){
o[q]=function(){
return p.apply(p,[this.models].concat($.toArr(arguments)));
};
});
return o;
});
});
$.package('resume/base/ajax_proxy.js',['resume/lib/adaptor.js'],function(b){
var a=$.lib('resume.adaptor');
var d={sDataType:'json',sType:'POST',bCache:false,bProcessData:false,bProcessURL:true,onsuccess:$.noop};
var c=function(e){
var g=a.getUrlParams(e);
g=$.extend({sid:$.sid(),r:Math.random(),inputf:'json',outputf:'json',inputc:'utf-8',outputc:'utf-8'},g);
var f=[];
$.each(g,function(i,h){
i&&f.push(h+'='+encodeURIComponent(i));
});
return [e.indexOf('?')==-1?e:e.substr(0,e.indexOf('?')),'?',f.join('&')].join('');
};
$.createLib('resume.ajax',{bStatic:true},function(e){
return {ajax:function(f){
var h=f.sUrl;
var g=$.extend({},d,f);
if(g.bProcessURL)
{
g.sUrl=c(g.sUrl);
}
if(g.bProcessData===false&&$.isObj(g.vData))
{
g.vData=JSON.stringify(g.vData);
g.sContentType='application/json';
}
g=$.extend({},g,{onsuccess:function(j,l,k){
try{
var m=a.evalValue(j);
if(!m&&!!JSON)
{
m=JSON.parse(j);
}
if(m.result.errCode=='0')
{
f.onsuccess(m.data,l,k);
}
else{
this.onerror(k,l,m.result);
}
}
catch(i)
{
this.onerror(k,l,i);
BJ_REPORT&&BJ_REPORT.report("cgi result onsuccess :"+i.toString()+" , request url :"+h);
}
},onerror:function(j,k,i){
if(f.onerror)
{
f.onerror.apply(this,arguments);
}
else{
a.showError('\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u5019\u91CD\u8BD5');
}
var m="";
if(j.responseText&&j.responseText.indexOf("errCode")>=0)
{
try{
var l=a.evalValue(j.responseText);
if(l.result.errCode<0&&l.result.errCode!=-120&&l.result.errCode!=-1)
{
m="{errCode : "+l.result.errCode+", message :"+l.result.message+"}";
if(l.result.errCode==-1)
{
m="{errCode : "+l.result.errCode+", errorData :"+g.vData+"}";
}
}
else{
return;
}
}
catch(n)
{
m="{}";
}
}
BJ_REPORT&&BJ_REPORT.report("cgi error , {status : "+j.status+", errMsg:"+m+", state : "+k+"}");
},oncomplete:function(i,j){
if(j=='senderr')
{
BJ_REPORT&&BJ_REPORT.report("send error , {status : "+i.status+", readyState : "+i.readyState+", state : "+j+"}");
}
}});
return $.ajax(g);
}};
});
});
$.package('resume/base/model.js',[],function(a){
var b=$.lib('resume.ajax');
$.createCtrl('resume.model',{sSuper:'data.model'},function(c){
return {sync:function(f,d,e){
if(!e.sUrl)
{
e.sUrl=d.url();
}
return b.ajax(e);
},toTplJSON:function(){
return this.toJSON();
},toServJSON:function(){
return this.toJSON();
}};
});
$.createCtrl('resume.collection',{sSuper:'data.collection'},function(){
return {sync:function(e,c,d){
if(!d.sUrl)
{
d.sUrl=c.url();
}
return b.ajax(d);
}};
});
});
$.package('resume/base/modelmgr.js',[],function(a){
$.createLib('resume.modelmgr',{bStatic:true},function(b){
return {_sModelPrefix:'resume.model.',_sCollPrefix:'resume.collection.',init_:function(c){
this.super_(b,'init_',arguments);
this._moModels={};
this._moColls={};
return this;
},getModel:function(c){
if(c=='module_face')
{
c='module_baseinfo';
}
return this._get(c,this._moModels,this._sModelPrefix);
;
},getColl:function(c){
return this._get(c,this._moColls,this._sCollPrefix);
},getModModel:function(c){
return this.getModel('module_'+c);
},_get:function(d,c,e){
var f=c[d];
if(a===f)
{
var g=e+d;
f=c[d]=$.ctrl(g);
if(!f)
{
throw new Error('can not find $.ctrl: '+g);
}
}
return f;
}};
});
});
$.package('resume/base/view.js',[],function(a){
$.createCtrl('resume.view',{},function(b){
return {init_:function(c){
this.superEx_(b,'init_',arguments);
this._moViewRef={};
return this;
},setTpl:function(d,c){
if(c)
{
this._moViewRef[c]=d;
}
else{
this._moViewRef=d;
}
return this;
},getTpl:function(c){
return this._moViewRef[c];
},view:function(d,c){
var f=this.getTpl(d),e='';
if(f)
{
e=f.replace(c);
}
return e;
}};
});
});
$.package('resume/base/viewmgr.js',[],function(a){
var b='resume.view';
$.createLib('resume.viewmgr',{bStatic:true},function(c){
return {init_:function(d){
this.superEx_(c,'init_',arguments);
this._moViewCtrls={};
return this;
},view:function(e,d){
var g=this,f=e.split('.'),h=g.getViewCtrl_(f[0]);
return h.view.call(h,f[1],d);
},getTpl:function(d){
var e=d.split('.');
return this.getViewCtrl_(e[0]).getTpl(e[1]);
},getViewCtrl_:function(d){
var e=this,g=e._moViewCtrls,f=g[d];
if(a===f)
{
f=g[d]=$.ctrl([b,d].join('.'));
if(!f)
{
throw new Error('can not find $.ctrl: '+d);
}
}
return f;
}};
});
});
$.package('resume/base/controller.js',['comm/ctrl/tagevent.js'],function(a){
$.createCtrl('resume.controller',{sSuper:'data.event'},function(b){
return {init_:function(c){
this.superEx_(b,'init_',arguments);
this.initData_(c||{});
this.initEvents_();
return this;
},initData_:function(c){
var d=this;
d.moConfig=c;
d._moDom$=d.getDom$_();
d._moRule=d.rule()||{};
d._moEvents=d.events()||{};
d._moInitedCtrls=[];
d._moListenToInfo=[];
return this;
},initEvents_:function(){
var c=$.ctrl('TagEventModHandle');
c.handle(this);
return this;
},getDom$_:function(){
var d,c=this.moConfig,e='div';
if(c.oDom)
{
d=c.oDom;
}
else{
if(c.sTagName)
e=c.sTagName;
d=$.$('<'+e+'>');
if(c.sId)
{
d.attr('id',c.sId);
}
if(c.sClassName)
{
d.data(0).className=c.sClassName;
}
}
return d;
},listenTo_:function(d,e,c){
var f=e;
if($.isStr(e))
{
f={};
f[e]=c;
}
$.each(f,function(g,h){
function i()
{
return g.apply(this,arguments);
}
;this._moListenToInfo.push([d,h,i]);
d.on(h,i,{oContext:this});
},{oContext:this});
return this;
},stopListening_:function(){
$.each(this._moListenToInfo,function(c){
c[0]&&c[0].off(c[1],c[2]);
});
return this;
},ctrl:function(){
var c=$.ctrl.apply($,arguments);
this._moInitedCtrls.push(c);
return c;
},render:function(c){
return this;
},getView:function(d,c){
return $.lib('resume.viewmgr').view(d,c||{});
},remove:function(){
this.fire('remove');
this.dom$().remove();
this.stopListening_();
$.each(this._moInitedCtrls,function(c){
c.remove();
});
return this;
},dom$:function(){
return this._moDom$;
},$$:function(c){
return this.dom$().find(c);
},eventLibs:function(){
return [];
},rule:function(){
return {};
},events:function(){
return {};
}};
});
});
$.package("resume/controller/edit_base.js",['resume/base/controller.js','resume/lib/adaptor.js'],function(){
var a=$.lib('resume.adaptor');
$.createCtrl('resume.controller.editBase',{sSuper:'resume.controller'},function(b){
return {confirm:a.confirm,alert:a.alert,createDialog:a.createDialog,getDialog:a.getDialog,showInfo:a.showInfo,showError:a.showError,hideMsg:a.hideMsg,onsessiontimeout:function(){
this.showError('\u4F60\u5DF2\u9000\u51FA\u90AE\u7BB1\uFF0C\u8BF7<a href="/cgi-bin/loginpage?s=session_timeout" nocheck="true" target="_top">[\u91CD\u65B0\u767B\u5F55]</a>',-1);
},showValidateError:function(d,c,e){
var j=a.Top,i=j.QMSelector,k=j.parents('.resume_txt',d)[0];
if(c)
{
e||(e='\u8F93\u5165\u6709\u8BEF');
var h=i.next(d),f='<span class="arrowDown"></span>',g='<span class="resume_txt_Err_tip"></span>';
$.inWin().setTimeout(function(){
if(j.attr(d,'isValidate')==0)
{
if(h&&j.hasClass(h,'resume_txt_Err_tip'))
{
h.innerHTML=f+e;
}
else{
j.insertHTML(d,'afterEnd',g);
i.next(d).innerHTML=f+e;
}
j.addClass(k,'resume_txt_Err');
}
},300);
j.attr(d,'isValidate',0);
}
else{
$.inWin().setTimeout(function(){
if(j.attr(d,'isValidate')==1)
{
j.rmClass(k,'resume_txt_Err');
}
},300);
j.attr(d,'isValidate',1);
}
}};
});
});
$.package('resume/controller/module_base.js',['resume/lib/utils.js','resume/lib/adaptor.js','resume/controller/edit_base.js'],function(b){
var c=$.lib('array');
var a=$.lib('resume.adaptor');
var d=$.lib('resume.utils');
$.createCtrl('resume.controller.moduleBase',{sSuper:'resume.controller.editBase'},function(e){
return {init_:function(f){
this.sCtrlName=this.sId=this.name_().substr(25);
return this.super_(e,'init_',arguments);
},initEvents_:function(f){
this.listenTo_(this.getModel_(),'change',this.renderModel_);
return this.super_(e,'initEvents_',arguments);
},getSkinName:function(){
return $.lib('resume.modelmgr').getModel('config').getSkinView()+'.'+this.sCtrlName;
},getModel_:function(){
return $.lib("resume.modelmgr").getModModel(this.sId);
},getEditCtrl_:function(){
return this.ctrl('resume.controller.module_edit_'+this.sId);
},render:function(){
return this.renderModel_();
},renderModel_:function(){
if(this.sId=="custom")
{
var g=$.$(".js_custom").data(),f=g.length;
for(var j=0;j<f;j++)
{
$.$(g[j]).remove();
}
}
this.dom$().html(this.renderHTML());
if($.lib('resume.modelmgr').getModel('setting').getTypeSkin()=="4"&&this.sId=="baseinfo")
{
var h=$.inWin()['__app_ModuleInter__'];
h&&h.updateModule('face');
}
this.adjustRender_();
if(this.$$('.js_hover').data().length>0)
{
this.$$('.js_hover').attr('mot','hideBackground').attr('mor','showBackground');
}
else{
this.dom$().attr('mor','showBackground').attr('mot','hideBackground');
}
if(this.sId=="custom")
{
this.initEachEvents_();
$.ctrl("resume.controller.select")._sortModuleByOrder();
}
return this;
},adjustRender_:function(){
d.adjustRender();
},renderHTML:function(g,f){
return this.getView(g||this.getSkinName(),this.getTplData_(f));
},getTplData_:function(f){
var g=this.getModel_().toTplJSON(!(f===false));
g.imgVer=$.lib('resume.modelmgr').getModel('config').getSkinInfo().imgVer;
g.moduleName=$.lib('resume.modelmgr').getModel('config').getModuleName(this.sId);
return g;
},edit:function(g,f){
this.getEditCtrl_().renderDialog(g,f).setTextArea();
return this;
},showBackground:function(f){
if(!f)
{
f=this.$$('[mor="showBackground"]');
if(!f.data(0))
{
f=this.dom$();
}
}
f.addClass('tmpl_mod_Active').find('[ck="hideModule"]').show();
;if(f.hasClass('js_unActiveBaseInfo'))
{
var g=f.parents('.js_hover');
if(g&&g.hasClass('tmpl_mod_Active'))
{
g.rmClass('tmpl_mod_Active');
}
}
return this;
},hideBackground:function(f){
if(!f)
{
f=this.$$('[mor="showBackground"]');
if(!f.data(0))
{
f=this.dom$();
}
}
f.rmClass('tmpl_mod_Active').find('[ck="hideModule"]').hide();
return this;
},getClickIndex:function(f,g){
var h=$.target(f),i='0',j='index';
while(h&&h.getAttribute)
{
if(h.getAttribute('index'))
{
i=h.getAttribute('index');
break;
}
if(h===g)
{
break;
}
h=h.parentNode;
}
return i;
},toggleModule:function(g,f){
if(g=='face')
{
return;
}
var q=this,t=a.Top,o=t.getMainWin(),l=o.innerHeight||o.document.documentElement.clientHeight,p=o.document.body,j=o.pageYOffset||o.document.documentElement.scrollTop||p.scrollTop;
if(!isNaN(f))
{
var s=$.$('#_custom_'+f).find('[index="'+f+'"]'),r=s.data()[0].parentNode;
}
else{
var s=$.$('#'+g).find('[ck="edit"]'),r=s.data()[0].parentNode;
}
var m=r.offsetHeight,i,n,h;
r.style.overflow='hidden';
r.style.position='relative';
r.style.left='0px';
r.style.top='0px';
if(m)
{
n=$.$(r).offset()['top']+m-j-l;
if(n<0)
{
n=0;
}
i=m-n;
r.style.height='0px';
h=false;
}
else{
r.style.display='block';
h=true;
m=r.offsetHeight;
n=$.$(r).offset()['top']+m-j-l;
if(n<0)
{
n=0;
}
i=m-n;
r.style.height=i+'px';
}
var k=i*2;
if(k>1000)
{
k=1000;
}
else if(k<400)
{
k=400;
}
s.animate({},{vEasing:'swing',vDuration:k,onstep:function(u,v){
var w=h?(1-u):u;
r.style.height=i*w+'px';
q.adjustRender_();
},oncomplete:function(){
if(!h)
{
r.style.height=m+'px';
}
q.adjustRender_();
}});
},scrollToSelf:function(f,g){
var s=this,u=a.Top,v=g,p=u.getMainWin(),j=p.innerHeight||p.document.documentElement.clientHeight,q=p.document.body,h=p.pageYOffset||p.document.documentElement.scrollTop||q.scrollTop;
if(this.sId=='custom')
{
if(v=='-1')
{
var n=q.offsetHeight-j-h,l=q.offsetHeight,r=0,o=$.$(".js_custom").data(),v=o.length-1,t=u.finds('[index="'+v+'"]',o[v])[0];
}
else{
var t=u.finds('[index="'+v+'"]',u.S("_custom_"+v,p))[0];
if(!f)
{
t.parentNode.style.display='block';
}
var r=t.offsetHeight,l=$.$(t).offset()['top'],k=(j-r)/2>0?(j-r)/2:0,n=l-h-k;
}
if(l<h||l>h+j-r)
{
if(f)
{
t.parentNode.style.display='none';
}
var m=0,i=n*(n>0?2:-2);
if(i>1000)
{
i=1000;
}
else if(i<400)
{
i=400;
}
$.$(p).animate({},{vEasing:'swing',vDuration:i,onstep:function(w,x){
var y=p.pageYOffset||p.document.documentElement.scrollTop||q.scrollTop;
if(!isNaN(p.document.documentElement.scrollTop))
{
p.document.documentElement.scrollTop=h+n*w;
}
if(!isNaN(q.scrollTop))
{
q.scrollTop=h+n*w;
}
var z=p.pageYOffset||p.document.documentElement.scrollTop||q.scrollTop;
if(n*w-n*m>1&&y==z)
{
this.stop();
if(f)
{
t.parentNode.style.display='block';
}
else{
t.parentNode.style.display='none';
}
s.toggleModule(s.sId,v);
}
m=w;
},oncomplete:function(){
if(f)
{
t.parentNode.style.display='block';
}
else{
t.parentNode.style.display='none';
}
s.toggleModule(s.sId,v);
}});
}
else{
if(!f)
{
t.parentNode.style.display='none';
}
s.toggleModule(s.sId,v);
}
}
else{
var l=this.dom$().offset()['top'],r=this.dom$().data().offsetHeight,k=(j-r)/2>0?(j-r)/2:0,n=l-h-k;
if(l<h||l>h+j-r)
{
s.dom$().data().style.display='none';
var m=0,i=n*(n>0?2:-2);
if(i>1000)
{
i=1000;
}
else if(i<400)
{
i=400;
}
$.$(p).animate({},{vEasing:'swing',vDuration:i,onstep:function(w,x){
var y=p.pageYOffset||p.document.documentElement.scrollTop||q.scrollTop;
if(!isNaN(p.document.documentElement.scrollTop))
{
p.document.documentElement.scrollTop=h+n*w;
}
if(!isNaN(q.scrollTop))
{
q.scrollTop=h+n*w;
}
var z=p.pageYOffset||p.document.documentElement.scrollTop||q.scrollTop;
if(n*w-n*m>1&&y==z)
{
this.stop();
s.dom$().data().style.display='block';
s.toggleModule(s.sId);
}
m=w;
},oncomplete:function(){
s.dom$().data().style.display='block';
s.toggleModule(s.sId);
}});
}
else{
s.toggleModule(s.sId);
}
}
},rule:function(){
return {click:{edit:{bPropagable:false},hideModule:{bPropagable:false}},mouseover:{showBackground:{bPropagable:false}},mouseout:{hideBackground:{bPropagable:false}}};
},events:function(){
return {edit:function(f,g){
var h=$.inWin();
if(h.getSelection)
{
if(!h.getSelection().isCollapsed)
{
return;
}
}
else if(g.createTextRange)
{
if(g.createTextRange().text)
{
return;
}
}
var i=this.getClickIndex(f,g);
this.edit(i,false);
$.stopPropagation(f);
},hideModule:function(f,g){
$.stopPropagation(f);
var j=this.sCtrlName,h=$.$(g).parents('[ck="edit"]').data(0),i=$.$(h).attr('index');
if(j=='custom')
{
$.lib('resume.modelmgr').getModModel('custom').saveCustomById(i,{visible:false});
this.toggleModule(j,i);
}
else{
$.lib('resume.modelmgr').getModModel(j).save('visible',false);
this.toggleModule(j);
}
},showBackground:function(f,g){
$.stopPropagation(f);
this.showBackground($.$(g));
},hideBackground:function(f,g){
$.stopPropagation(f);
this.hideBackground($.$(g));
}};
}};
});
$.createCtrl('resume.controller.moduleEditBase',{sSuper:'resume.controller.editBase'},function(e){
return {sModelType:'single',sDialogId_:$.unikey('module_edit'),init_:function(f){
this.sCtrlName=this.name_().substr(25);
this.sId=this.name_().substr(30);
this.sName=$.lib('resume.modelmgr').getModel('config').getModuleName(this.sId);
this.isValidate=true;
this.sResumeType='';
var g=$.lib("resume.modelmgr").getModel("setting");
if(g.getResumeType()=='en')
{
this.sViewName='module_edit_en.'+this.sId;
this.sResumeType="en";
}
else{
this.sViewName='module_edit.'+this.sId;
}
return this.super_(e,'init_',arguments);
},getModel_:function(){
return $.lib("resume.modelmgr").getModModel(this.sId);
},getSelfView_:function(f){
if(f.data&&f.data.length==0)
{
f.data.push({});
}
return $.lib('resume.viewmgr').view(this.sViewName,f);
},getAllInputData:function(f){
if(this.sModelType=='single')
{
return this.getInputDataItem_(f);
}
return this.getArrInputData_(f);
},getInputDataItem_:function(f){
var h={},i=this,g=a.finds('input',f),g=g.concat(a.finds('textarea',f));
function j(k)
{
return (k||"").replace(/\u2028/gi,"");
}
$.each(g,function(k){
var m=a.attr(k,'name');
var l=a.attr(k,'date-type');
if(m)
{
h[m]=j(k.value);
if(l=='true')
{
h[m]=h[m]?parseFloat(h[m]):'';
}
if(a.Top.attr(k,'isValidate')==0)
i.isValidate=false;
}
if(h.start&&h.now=="now")
{
h.end="now";
}
delete h.now;
if(!h.start)
{
h.end="";
}
});
return h;
},getArrInputData_:function(f){
var l=this,k=[],h=a.finds('.resume_mod_exp',f);
for(var m=0;m<h.length;m++)
{
var g=true,j=l.getInputDataItem_(h[m]);
$.each(j,function(i){
if(i)
{
g=false;
}
});
if(!g)
{
k.push(j);
}
}
if(k.length==0)
{
k.push(l.getInputDataItem_(h[0]));
}
return k;
},setTextArea:function(){
var g=this,f=this.moDialog.S('content'),h=a.Top.finds('textarea',this.moDialog.S('content'));
$.each(h,function(i){
var j=a.attr(i,"min_width");
d.autoTextArea(f,i,j);
});
},generateFooterHtml_:function(){
return this.getView('module_edit.editToolBar',{});
},_scrollToModule:function(g,f){
$.inWin()['__app_ModuleInter__'].getModule(this.sId).scrollToSelf(g,f);
},renderDialog:function(g,f){
var i=this,h=506;
if(this.sResumeType=='en')
{
h=566;
}
this._moTargetData=g||0;
var j='resume_mod';
if(i.sResumeType=='en')
{
if(i.sId=='school_experience'||i.sId=='experience'||i.sId=='project')
{
j+=' resume_mod_EnLong';
}
else{
j+=' resume_mod_En';
}
}
if(i.sModelType=='multi'&&i.sId!='custom')
{
j+=' resume_mod_Exp';
}
i.moDialog=a.createDialog({sid:i.sDialogId_,sTitle:i.sName,nWidth:h,sClassName:j,sBodyHtml:'<div class="dialog_content" style="width:100%; max-height:600px; overflow:auto; position:relative;" id="content"></div>',sFootHtml:i.generateFooterHtml_(),onload:function(){
var l=this,m=l.S('content'),o=i.render().dom$().html();
if(i.sId!="custom"&&i.sModelType=="multi")
{
var o=[o,'<div class="resume_mod_addExp">','<a id="js_add" class="resume_mod_addExp_cnt" href="javascript:;">','<span class="resume_mod_addExpIco"></span>',,(i.sResumeType=='en'?'Add ':'\u6DFB\u52A0'),i.sName,'</a>','</div>'].join("");
}
l.setHtml('content',o);
var n=a.finds('.module_edit_single',m),k=n.length;
a.Top.addClass(n[k-1],'resume_mod_exp_Last');
i.bindDialogFootBtn_(l,f);
i.initValidata(m);
i.initPlaceholder(m);
i._showSelList(l);
i.ondialogload_(l);
},onshow:function(){
var t=this,x=a.Top;
i.scrollToEdit(t,g);
var p=parseFloat(g),s=a.finds('.module_edit_single',t.S('content'))[p],v=a.finds('.first_input',s)[0];
if(v)
{
d.focusLast(v);
}
var w=x.calcPos(t._moPanelDom,'json'),n=x.calcPos(t.S('_head_'),'json').height,m=x.calcPos(t.S('_foot_'),'json').height,u=t.S('content'),l=50,r=x.calcPos(x.window.document.body,'json');
var k=r.height-w.top-l;
k-=(m+n);
if(k<(+x.getStyle(u,'maxHeight').replace('px','')||600))
{
u.style.maxHeight=k+'px';
a.attr(u,'nMaxHeight',k);
}
var q=a.attr(u,'nMaxHeight')||600,o=u.scrollHeight;
if(o>q)
{
u.style.height=q+'px';
}
i.ondialogshow_(t);
},onbeforeclose:function(){
i.onbeforeremove();
},onclose:function(){
i.remove();
}});
return this;
},onbeforeremove:$.noop,resizeForIE6:function(f){
var j=a.Top;
if(!(j.gbIsIE&&j.gnIEVer<=7))
{
return false;
}
var h=f.S('content'),i=a.finds('.module_edit_single',h),g=i.length;
if((+j.getStyle(h,'height').replace('px','')||600)>j.calcPos(i[0],'json')['height']*g)
{
h.style.height='100%';
}
},scrollToEdit:function(f,g){
var i=a.Top,j=g||0;
_nScrollTop=0;
_oContent=f.S('content');
var h=i.finds('.module_edit_single',_oContent);
if(h[j])
_nScrollTop=h[j].offsetTop;
_oContent.scrollTop=_nScrollTop;
return this;
},adjustRender_:function(){
d.adjustRender();
},initValidata:function(f){
var j=a.Top,h=this;
var i=j.finds('textarea',f),g=j.finds('input',f);
$.each(i,function(k){
j.addEvent(k,'focus',function(l){
var m=j.getEventTarget(l);
h.showValidateError(m,false);
});
j.addEvent(k,'blur',function(l){
var m=j.getEventTarget(l);
if(d.getTextAreaLength(j.trim(m.value))>1000)
{
h.showValidateError(m,true,'\u8F93\u5165\u5B57\u7B26\u8D85\u8FC71000\u4E2A');
}
});
});
$.each(g,function(k){
j.addEvent(k,'focus',function(l){
var m=j.getEventTarget(l);
h.showValidateError(m,false);
});
j.addEvent(k,'blur',function(l){
var m=j.getEventTarget(l);
if(d.getTextAreaLength(j.trim(m.value))>128)
{
h.showValidateError(m,true,'\u8F93\u5165\u5B57\u7B26\u8D85\u8FC7128\u4E2A');
}
});
});
},validateData:function(g,f){
var h=true,n=a.Top,k=this;
var j=n.finds('input',g.S('content')),m=n.finds('textarea',g.S('content'));
var l=$.lib('resume.modelmgr').getModel('setting'),i=/^\d{4}(|\.00|\.0[1-9]|\.10|\.11|\.12)$/;
if(l.getResumeType()=='en')
{
i=/^(|00\/|0[1-9]\/|10\/|11\/|12\/)\d{4}$/;
}
if(j.length>0)
{
var o="";
$.each(j,function(p){
var w=n.attr(p,"name");
if(d.getTextAreaLength(n.trim(p.value))>128)
{
k.showValidateError(p,true,'\u8F93\u5165\u5B57\u7B26\u8D85\u8FC7128\u4E2A');
k.isValidate=false;
h=false;
}
else if((w=="start"||w=="end"||w=="time")&&p.value&&!(i.test(p.value)))
{
if(!(w=="end"&&(p.value=="\u81F3\u4ECA"||p.value=="Present")))
{
var s=new Date().getFullYear(),r=new Date().getMonth();
if(r<10)
{
r='0'+r;
}
var t=s+"."+r;
if(l.getResumeType()=='en')
{
t=r+'/'+s;
}
k.showValidateError(p,true,'\u793A\u4F8B\uFF1A'+t);
k.isValidate=false;
h=false;
}
}
else if(w=="start")
{
o=p.value;
}
else if(w=="end"&&p.value)
{
var q=p.value<o;
if(l.getResumeType()=='en')
{
var y=o.split('/')[1]||'',x=o.split('/')[0]||'',v=p.value.split('/')[1]||'',u=p.value.split('/')[0]||'';
q=[v,u].join('')<[y,x].join('')?true:false;
}
if(q)
{
k.showValidateError(p,true,'\u8BF7\u786E\u8BA4\u65E5\u671F\u5148\u540E\u987A\u5E8F');
k.isValidate=false;
h=false;
}
}
});
}
if(m.length>0)
{
$.each(m,function(p){
if(d.getTextAreaLength(n.trim(p.value))>1000)
{
k.showValidateError(p,true,'\u8F93\u5165\u5B57\u7B26\u8D85\u8FC71000\u4E2A');
k.isValidate=false;
h=false;
}
});
}
return h;
},bindDialogFootBtn_:function(g,f){
var k=this;
var i=function(){
var l=g.S('js_confirm');
if(a.hasClass(l,"qui_btn_BlueDisabled"))
{
return false;
}
else{
a.addClass(l,"qui_btn_BlueDisabled");
}
var m=k.getAllInputData(g.S('_body_'));
_sIndex=k.sModelType=='single'?'':m[0].index;
k.isValidate=true;
if(!k.validateData(g,m)||!k.isValidate)
{
a.rmClass(l,"qui_btn_BlueDisabled");
return;
}
k.save(m);
if(f)
{
k._scrollToModule(true,_sIndex);
}
g.close();
};
a.addEvent(g._moPanelDom,'keydown',function(l){
if(l.keyCode==13&&l.ctrlKey)
{
i();
}
});
a.addEvent(g.S('js_confirm'),'click',function(l){
i();
});
a.addEvent(g.S('js_cancel'),'click',function(l){
g.close();
});
var h=function(l,m){
var n={};
k.mergeWithGuideData(n);
return $.lib('resume.viewmgr').view(m,n);
};
var j=g.S('content');
a.addEvent(g.S('js_add'),'click',function(l){
var r=a.finds('.module_edit_single',j);
if(r.length==1)
{
a.Top.addClass(r[0],'resume_mod_exp_More');
}
a.insertHTML(j.lastChild,'beforeBegin',h(k.sId,k.sViewName));
r=a.finds('.module_edit_single',j);
k.initValidata(r[r.length-1]);
var o=r.length,t=r[o-1],s=a.finds('.first_input',t)[0];
a.Top.rmClass(r[o-2],'resume_mod_exp_Last');
a.Top.addClass(t,'resume_mod_exp_Last');
var p=t.parentNode.offsetHeight;
t.parentNode.style.position='relative';
t.parentNode.style.overflow='hidden';
t.parentNode.style.height='0px';
var n=a.attr(j,'nMaxHeight')||600,m=j.scrollHeight;
function u(v)
{
t.parentNode.style.height=v+'px';
var w=m+v;
if(w>n)
{
j.style.height=n+'px';
j.scrollTop=w-n;
}
else{
j.style.height=w+'px';
}
}
var q={from:0,to:p,speed:p*2,tween:'linear',onaction:function(v){
u(v);
},oncomplete:function(v){
u(v);
t.parentNode.style.position='';
t.parentNode.style.overflow='';
t.parentNode.style.height='';
if(s)
{
s.focus();
}
k.setTextArea();
k.initPlaceholder(t);
}};
a.createAnimation(t,q);
});
return this;
},initPlaceholder:function(f){
var h=this;
_oDomList=a.finds('input',f),_oDomList=_oDomList.concat(a.finds('textarea',f)),_oPlaceholders=a.finds(".resume_txt_placeholder",f);
var g=function(i){
var k=a.getEventTarget(i),j=a.finds(".resume_txt_placeholder",k.parentNode)[0];
if(j)
{
if(k.value.length==0)
{
j.style.display="block";
}
else{
j.style.display="none";
}
}
};
$.each(_oPlaceholders,function(i){
a.addEvent(i,"click",function(j){
var l=a.getEventTarget(j),k=a.finds(".resume_ipt",l.parentNode)[0];
if(k)
{
k.focus();
}
});
});
$.each(_oDomList,function(i){
a.addEvent(i,'input',g);
a.addEvent(i,'propertychange',g);
});
},_showSelList:function(f){
var i=this;
var g=f.S('content');
var h=$.lib('resume.modelmgr').getModel('module_edit_select');
a.liveEvent(g,{rule:function(){
return {click:{showSelList:{bPropagable:false},showDatePicker:{bPropagable:false},checkNow:{bPropagable:false}}};
},events:function(){
return {checkNow:function(j,k){
$.stopPropagation();
var l=a.parents(".resume_datePicker",k)[0],m=a.finds('[name="end"]',l)[0],n=a.attr(k,"value");
a.attr(k,"value",n=="now"?'':"now");
if(n=="now")
{
a.attr(m.parentNode,"ck","showDatePicker");
m.disabled=false;
m.value="";
}
else{
a.attr(m.parentNode,"ck","");
m.disabled=true;
if($.lib('resume.modelmgr').getModel('setting').getResumeType()=='en')
{
m.value="Present";
}
else{
m.value="\u81F3\u4ECA";
}
m.nextSibling.style.display="none";
}
},showDatePicker:function(k,l){
$.stopPropagation();
var j=$.lib('resume.calendar');
var r=a.finds(".resume_ipt",l)[0],p=a.finds(".resume_txt_placeholder",l)[0],q=a.calcPos(l),o=a.Top.document.body,s=$.lib('resume.modelmgr').getModel('setting');
if(s.getResumeType()=='en')
{
var m=/^(\d{2})\//.test(r.value)&&parseFloat(RegExp.$1);
var n=/\/(\d{4})$/.test(r.value)&&parseFloat(RegExp.$1);
}
else{
var n=/^(\d{4})\./.test(r.value)&&parseFloat(RegExp.$1);
var m=/\.(\d{2})$/.test(r.value)&&parseFloat(RegExp.$1);
}
var t={nCurrY:n,nCurrM:m,nX:q[3]+1,nY:q[2]+1,onCellClick:function(v){
if(parseFloat(v.month)<10)
{
v.month='0'+v.month;
}
var u=v.year+"."+v.month.split("\u6708")[0];
if(s.getResumeType()=='en')
{
u=v.month.split("\u6708")[0]+"/"+v.year;
}
r.value=u;
p.style.display="none";
},onClose:function(){
a.removeSelf(a.Top._oCalendar.calendar);
a.Top._oCalendar=null;
}};
a.Top._oCalendar=j.createCalendar(o,t);
},showSelList:function(j,k){
$.stopPropagation();
var o=a.calcPos(k,'json'),r=a.attr(k,'select-type'),q=k.firstChild.innerHTML;
var n=h.getItems(r);
function s(t)
{
for(var u=0;u<n.length;u++)
{
if(n[u].sItemValue==t)
{
return n[u].sId;
}
}
}
var m=o.top+k.offsetHeight,l=$.inWin().top.document.body.clientHeight;
if(m+k.offsetHeight*5>l)
{
m=o.top-k.offsetHeight*5-10;
}
var p=a.createMenu({oEmbedWin:$.inWin(k),nX:o.left+1,nY:m,nWidth:k.offsetWidth,nMaxItemView:5,nItemHeight:k.offsetHeight,oItems:n,onitemclick:function(z,t){
var w=t.sItemValue,y=a.attr(k,'to'),x=['[name=',y,']'].join(""),u=a.Top.parents('.module_edit_single',k)[0],v=a.Top.finds(x,u)[0];
if(w=='---')
{
v.value='';
}
else{
v.value=w;
}
k.firstChild.innerHTML=w;
k.firstChild.nextSibling.style.display="none";
if(r=='degree')
{
if(i.sResumeType!="en"?(w=='\u5176\u4ED6'):(w=='Other'))
{
v.value='';
v.style.display="";
v.focus();
}
else{
v.style.display="none";
}
}
}});
p.selectItem(s(q));
}};
}});
},ondialogload_:function(f){
var g=f.S('content'),i=this,h=a.finds('.module_edit_single',g);
if(h.length==1)
{
a.Top.rmClass(h[0],'resume_mod_exp_More');
}
a.liveEvent(g,{rule:function(){
return {click:{removeExp:{bPropagable:false}}};
},events:function(){
return {removeExp:function(j,k){
var r=a.finds('.module_edit_single',g),o=r.length;
if(o>1)
{
var q=k.parentNode,l=q.parentNode.offsetHeight;
var n=a.attr(g,'nMaxHeight')||600,m=g.scrollHeight;
q.parentNode.style.position='relative';
q.parentNode.style.overflow='hidden';
function s(t)
{
q.parentNode.style.height=t+'px';
var u=m-l+t;
if(u<n)
{
g.style.height=u+'px';
}
}
var p={from:l,to:0,speed:l*2,tween:'linear',onaction:function(t){
s(t);
},oncomplete:function(t){
s(t);
g.style.height=m-l>n?n+'px':'';
if(a.Top.hasClass(k.parentNode,'resume_mod_exp_Last'))
{
a.Top.addClass(r[o-2],'resume_mod_exp_Last');
}
a.removeSelf(q.parentNode);
if(o==2)
{
r=a.finds('.module_edit_single',g);
a.Top.rmClass(r[0],'resume_mod_exp_More');
}
}};
a.createAnimation(q.parentNode,p);
}
i.resizeForIE6(f);
}};
}});
},ondialogshow_:$.noop,resizeDialog:function(){
var f=this.moDialog;
f.S('content').scrollTop=9999999;
return this;
},mergeWithGuideData:function(f){
var g=this.getModel_().guideData();
if(g.data)
{
var h;
for(h in g.data[0])
{
if(!f.data||!f.data[0])
{
f.data=[{}];
}
$.each(f.data,function(i){
if(!i[h])
{
i[h+'GuideData']=g.data[0][h];
i[h+'IsDefault']=true;
}
else{
i[h+'IsDefault']=false;
i[h+'GuideData']=g.data[0][h];
}
});
}
}
else{
var h;
for(h in g)
{
if(!f[h])
{
f[h+'GuideData']=g[h];
f[h+'IsDefault']=true;
}
else{
f[h+'GuideData']=g[h];
f[h+'IsDefault']=false;
}
}
}
},render:function(){
var f=$.extend({},this.getModel_().toEscapeJSON());
this.mergeWithGuideData(f);
this.dom$().html(this.getSelfView_(f));
return this;
},save:function(f){
if(this.sModelType=='single')
{
this.getModel_().save(f);
}
else{
this.getModel_().save('data',f);
}
return this;
}};
});
});
$.package('resume/model/module_base.js',['resume/model/sync_proxy.js'],function(a){
var b=$.lib('array');
var c=$.lib('resume.utils');
$.createCtrl('resume.model.moduleBase',{sSuper:'resume.model'},function(d){
var e=$.lib('resume.modelmgr').getModel('sync_proxy');
return {sync:function(h,f,g){
var i=$.lib('resume.modelmgr').getModel('sync_proxy');
return i.sync(g);
},get:function(f){
return this.toJSON()[f];
},defaultVal:function(){
return this.super_(d,'defaultVal',arguments)||{};
},guideData:function(f){
if(!f)
{
f=this.name_().split("module_")[1];
}
if($.lib('resume.modelmgr').getModel('setting').getResumeType()=='en')
{
return $.lib('resume.modelmgr').getModel('module_en_data').getResume(f);
}
return $.lib('resume.modelmgr').getModel('module_cn_data').getResume(f);
},toJSON:function(){
var f=this.super_(d,'toJSON',arguments);
if(f.data)
{
f.data=b.map(f.data,function(g){
return $.extend({},g);
});
}
return $.extend({},this.defaultVal(),f);
},toEscapeJSON:function(){
return c.htmlEncodeAllData(this.toJSON());
},isEmpty:function(){
return this.getEditedPerInfo().nPercent==0;
},getEditedPerInfo:function(){
var j=this;
var i=this.guideData();
var h=this.attributes;
var g=0;
var f=0;
if(i.data)
{
if(h.data&&h.data.length)
{
$.each(i.data[0],function(l,k){
if(!j._isSettingItem(k))
{
$.each(h.data,function(m){
g++;
j._isEditedItem(k,m)&&f++;
});
}
});
}
else{
$.each(i.data[0],function(l,k){
g++;
});
}
}
else{
$.each(i,function(l,k){
if(!j._isSettingItem(k)&&k!='avatar')
{
g++;
j._isEditedItem(k,h)&&f++;
}
});
}
return {nTotal:g,nPercent:g?f/g:0,nEdited:f};
},_isEditedItem:function(g,f){
if(g in f)
{
var h=f[g];
if(typeof (h)=='string'&&!$.trim(h))
{
return false;
}
return true;
}
return false;
},_isSettingItem:function(f){
return f=='visible';
},oItemDefaults:{},setItemDefaults:function(f){
var g=this.oItemDefaults;
for(var h in f)
{
g[h]=f[h];
}
},getItemDefaults:function(f){
return (this.oItemDefaults||{})[f];
},oCnData:{},setCnData:function(f){
this.oCnData=$.extend({},f);
},getCnData:function(){
return this.oCnData;
},oEnData:{},setEnData:function(f){
this.oEnData=$.extend({},f);
},getEnData:function(){
return this.oEnData;
},checkOtherResumeIsNull:function(){
var f=false;
var i=$.lib('resume.modelmgr');
if(i.getModel('setting').getResumeType()=='en')
{
var h=i.getModel('sync_proxy').getAllJSON(),g=this.getCnData();
i.getModel('sync_proxy').reset({silent:true});
i.getModel('sync_proxy').setModModels(g,{silent:true});
i.getModel('setting').set('resume_type','cn',{silent:true});
if(i.getModel('config').getModuleEditedPer()===0)
{
f=true;
}
i.getModel('sync_proxy').reset({silent:true});
i.getModel('sync_proxy').setModModels(h,{silent:true});
i.getModel('setting').set('resume_type','en',{silent:true});
}
else{
var h=this.getEnData(),g=i.getModel('sync_proxy').getAllJSON();
i.getModel('sync_proxy').reset({silent:true});
i.getModel('sync_proxy').setModModels(h,{silent:true});
i.getModel('setting').set('resume_type','en',{silent:true});
if(i.getModel('config').getModuleEditedPer()===0)
{
f=true;
}
i.getModel('sync_proxy').reset({silent:true});
i.getModel('sync_proxy').setModModels(g,{silent:true});
i.getModel('setting').set('resume_type','cn',{silent:true});
}
return f;
},parseServ:function(f){
if(f.data)
{
var g=f.data,h=[];
$.each(g,function(i){
var j=$.extend({},i);
if($.lib('resume.modelmgr').getModel('setting').getResumeType()!='en')
{
if(j.start)
{
j.start=j.start.replace("-",".");
var l=/\.(\d+)$/.test(j.start)&&RegExp.$1;
if(l&&parseFloat(l)<10)
{
j.start=j.start.replace(/(\d+)$/,'0'+parseFloat(l));
}
}
if(j.end)
{
j.end=j.end.replace("-",".");
var k=/\.(\d+)$/.test(j.end)&&RegExp.$1;
if(k&&parseFloat(k)<10)
{
j.end=j.end.replace(/(\d+)$/,'0'+parseFloat(k));
}
}
}
h.push(j);
});
f.data=h;
return f;
}
return f;
},toServJSON:function(){
var f=this.super_(d,'toJSON',arguments);
if(f.data)
{
var g=[];
$.each(f.data,function(h){
var i=$.extend({},h);
g.push(i);
});
f.data=g;
}
return f;
}};
});
});
$.package('resume/lib/adaptor.js',[],function(){
var e=getTop();
var f=$.inWin();
e.loadJsFileToTop(['$js_path$com/kits/qmfileupload/qqmail/js/ftn2875f2.js']);
function b(j,i,h)
{
var k=typeof (j)=='function'?j:function(){
return e[j];
};
var l=f.setTimeout(function(){
l=null;
e.loadJsFileToTop(i);
},h||30*1000);
return function(m){
if(l)
{
f.clearTimeout(l);
l=null;
}
e.loadJsFileToTop(i);
$.wait(k,function(n){
if(n)
{
m(true,k());
}
else{
m(false);
}
});
};
}
var d={"t2AvatarDefault":{"1":e.getRes("$images_path$resume/template/ico_t2AvatarDefault269d17.png"),"2":e.getRes("$images_path$resume/template/ico_t2AvatarDefault_2x269d17.png")},"t1AvatarDefault":{"1":e.getRes("$images_path$resume/template/ico_t1AvatarDefault266ee1.png"),"2":e.getRes("$images_path$resume/template/ico_t1AvatarDefault_2x269d17.png")},"t1Account":{"1":e.getRes("$images_path$resume/template/ico_t1Account_png8204dc9.png"),"2":e.getRes("$images_path$resume/template/ico_t1Account_2x269d17.png")},"t1Edu":{"1":e.getRes("$images_path$resume/template/ico_t1Edu_png8204dc9.png"),"2":e.getRes("$images_path$resume/template/ico_t1Edu_2x269d17.png")},"t1Work":{"1":e.getRes("$images_path$resume/template/ico_t1Work_png8204dc9.png"),"2":e.getRes("$images_path$resume/template/ico_t1Work_2x269d17.png")},"t1Tel":{"1":e.getRes("$images_path$resume/template/ico_t1Tel_png8204dc9.png"),"2":e.getRes("$images_path$resume/template/ico_t1Tel_2x269d17.png")},"t1Email":{"1":e.getRes("$images_path$resume/template/ico_t1Email_png8204dc9.png"),"2":e.getRes("$images_path$resume/template/ico_t1Email_2x269d17.png")},"t1Assess":{"1":e.getRes("$images_path$resume/template/ico_t1Assess_png8204dc9.png"),"2":e.getRes("$images_path$resume/template/ico_t1Assess_2x269d17.png")},"t3AvatarDefault":{"1":e.getRes("$images_path$resume/template/ico_t3AvatarDefault266ee1.png"),"2":e.getRes("$images_path$resume/template/ico_t3AvatarDefault_2x269d17.png")},"timeline_top":{"1":e.getRes("$images_path$resume/template/timeline_top20704c.png"),"2":e.getRes("$images_path$resume/template/timeline_top_2x26ba16.png")},"timeline_bottom":{"1":e.getRes("$images_path$resume/template/timeline_bottom20704c.png"),"2":e.getRes("$images_path$resume/template/timeline_bottom_2x26ba16.png")},"timeline_mid":{"1":e.getRes("$images_path$resume/template/timeline_mid26bfcd.png"),"2":e.getRes("$images_path$resume/template/timeline_mid_2x26bfcd.png")},"t3EduExp":{"1":e.getRes("$images_path$resume/template/ico_t3EduExp_png8264f47.png"),"2":e.getRes("$images_path$resume/template/ico_t3EduExp_2x269d17.png")},"t3WorkExp":{"1":e.getRes("$images_path$resume/template/ico_t3WorkExp_png8264f47.png"),"2":e.getRes("$images_path$resume/template/ico_t3WorkExp_2x269d17.png")},"t3ProjectExp":{"1":e.getRes("$images_path$resume/template/ico_t3ProjectExp_png8264f47.png"),"2":e.getRes("$images_path$resume/template/ico_t3ProjectExp_2x269d17.png")},"t3SchoolExp":{"1":e.getRes("$images_path$resume/template/ico_t3SchoolExp_png8264f47.png"),"2":e.getRes("$images_path$resume/template/ico_t3SchoolExp_2x269d17.png")},"t3Awards":{"1":e.getRes("$images_path$resume/template/ico_t3Awards_png8264f47.png"),"2":e.getRes("$images_path$resume/template/ico_t3Awards_2x269d17.png")},"t3SelfEvaluation":{"1":e.getRes("$images_path$resume/template/ico_t3SelfEvaluation_png8264f47.png"),"2":e.getRes("$images_path$resume/template/ico_t3SelfEvaluation_2x269d17.png")},"t3CareerObjective":{"1":e.getRes("$images_path$resume/template/ico_t3CareerObjective_png8264f47.png"),"2":e.getRes("$images_path$resume/template/ico_t3CareerObjective_2x269d17.png")},"t3ProfessionalSkills":{"1":e.getRes("$images_path$resume/template/ico_t3ProfessionalSkills_png8264f47.png"),"2":e.getRes("$images_path$resume/template/ico_t3ProfessionalSkills_2x269d17.png")},"t3Custom":{"1":e.getRes("$images_path$resume/template/ico_t3Custom_png8264f47.png"),"2":e.getRes("$images_path$resume/template/ico_t3Custom_2x269d17.png")},"t4AvatarDefault":{"1":e.getRes("$images_path$resume/template/ico_t4AvatarDefault273b64.png"),"2":e.getRes("$images_path$resume/template/ico_t4AvatarDefault_2x273b64.png")},"t1EnAvatarDefault":{"1":e.getRes("$images_path$resume/template/ico_t1EnAvatarDefault273b64.png"),"2":e.getRes("$images_path$resume/template/ico_t1EnAvatarDefault_2x273b64.png")}};
e.getResumeIconUrl=g;
function g(h)
{
var i=e.devicePixelRatio,j,k;
if(d&&(j=d[h]))
{
k=j[i];
}
return k||"";
}
var c=b('QMPreviewer',["$js_path$qmplayer/player289cd9.js","$js_path$com/kits/qmpreviewer/js/qmpreviewer2a2601.js"],60*1000);
$.createLib("resume.adaptor",{bStatic:true},function(h){
return {S:e.S,show:e.show,showInfo:e.showInfo,showError:e.showError,hideMsg:e.hiddenMsg,hiddenMsg:e.hiddenMsg,QMAjax:e.QMAjax,QMLocalStorage:e.QMLocalStorage,getStyle:e.getStyle,preventDefault:e.preventDefault,oFileUploadUtil:e.QMFileUpload.oUtil,qmAnimation:e.qmAnimation,Top:e,setGlobalVarValue:e.setGlobalVarValue,getGlobalVarValue:e.getGlobalVarValue,getDomWin:e.getDomWin,regFilter:e.regFilter,removeSelf:e.removeSelf,calcPos:e.calcPos,getEventTarget:e.getEventTarget,attr:e.attr,getRes:e.getRes,insertHTML:e.insertHTML,liveEvent:e.liveEvent,getUrlParams:e.getUrlParams,rmClass:e.rmClass,addClass:e.addClass,hasClass:e.hasClass,gbIsIE:e.gbIsIE,gnIEVer:e.gnIEVer,textToHtml:e.textToHtml,evalValue:e.evalValue,QMDialog:e.QMDialog,reloadLeftWin:e.reloadLeftWin,bodyScroll:e.bodyScroll,GelTags:e.GelTags,LogKV:e.LogKV,ossLogCustom:e.ossLogCustom,msgBox:e.msgBox,showProcess:e.showProcess,getQMPreviewBox:b('QMPreviewBox',["$js_path$com/ui/qmpreviewbox/pkg24e6b9.js"]),getQMClipboard:b('QMClipboard',["$js_path$com/kits/qmclipboard/js/qmclipboard24e6b9.js"],120*1000),getQMPreviewer:c,getResumeIconUrl:g,waitForShowTip:e.waitForShowTip,addEvent:function(k,l,j,i){
if(i)
{
if(j)
{
e.addEvent(k,l,j.__orgfun__?j.__orgfun__:j,i);
}
else{
e.addEvent.apply(this,arguments);
}
}
else{
var m=BJ_REPORT.tryJs.spyCustom(j);
j.__orgfun__=m;
e.addEvent(k,l,m,i);
}
},removeEvent:function(j,k,i){
if(i)
{
e.removeEvent(j,k,i.__orgfun__?i.__orgfun__:i);
}
else{
e.removeEvent.apply(this,arguments);
}
},getQMTip:function(){
return e.QMTip;
},createMenu:function(i){
return new e.QMMenu(i);
},createAnimation:function(j,i){
return e.qmAnimation.play(j,i);
},createSelect:function(i){
return new e.QMSelect(i);
},getTopObject:function(){
var i=Array.prototype.slice.call(arguments);
i.unshift(new (e.Object)());
return $.extend.apply($,i);
},evalCss:function(i,j){
return e.evalCss(i,e,j);
},finds:function(j,i){
return e.finds(j,i||e.document);
},parents:function(j,i){
return e.parents(j,i);
},getImportUploaderCreater:function(i){
i(true,e.QMFileUpload.create,e.QMFileUpload);
},getWorksUploaderCreater:function(i){
$.wait(function(){
return e.QMFileUpload.createFtn;
},function(j){
if(j)
{
i(true,e.QMFileUpload.createFtn,e.QMFileUpload);
}
else{
i(false);
}
});
},getFileIcon:function(i,j){
return e.getIconByExt(e.getFileExt(i),j||'max');
},getUpdateFaceCom:function(i){
e.loadJsFile('$js_path$qmaddrface24e6b9.js',true,e.document,function(){
i(e.QMFaceEdit);
});
},getFilePreviewData:function(i){
return e.getFtnPreviewData(i);
},previewWorks:function(j,i){
var k=a.getFilePreviewData(j);
if(k)
{
c(function(l,m){
if(l)
{
m.show(k,i||{});
}
});
}
},confirm:function(i){
return e.confirmBox(i);
},alert:function(i){
return e.alertBox(i);
},getDialog:function(i){
return e.QMDialog('resume_'+i);
},createDialog:function(i){
i.sId='resume_'+(i.sId||$.unikey(''));
return new e.QMDialog(i);
}};
});
var a=$.lib('resume.adaptor');
});
$.package('resume/lib/utils.js',['resume/lib/adaptor.js'],function(b){
var a=$.lib('resume.adaptor');
var g=["navigationStart","unloadEventStart","unloadEventEnd","redirectStart","redirectEnd","fetchStart","domainLookupStart","domainLookupEnd","connectStart","connectEnd","requestStart","responseStart","responseEnd","domLoading","domInteractive","domContentLoadedEventStart","domContentLoadedEventEnd","domComplete","loadEventStart","loadEventEnd"];
$.ctor_().extend("method",(function(){
return {openWin:function(i,h){
h=h||{};
var l=h.oWin||$.inWin();
var j=l.document;
var k=j.createElement('form');
k.action=i||'';
k.target=h.sTarget||'_blank';
var m=k.method=(h.sMethod||'GET').toUpperCase();
k.style.display='none';
if(m=='POST'&&h.oData)
{
$.each(h.oData,function(o,n){
var p=j.createElement('input');
p.type='hidden';
p.name=n;
p.value=''+o;
k.appendChild(p);
});
}
j.body.appendChild(k);
k.submit();
$.$(k).remove();
}};
})());
var e=$.ctrl('data.event');
var d=function(h){
e.fire(h||'my_resume');
};
d.oEventer=e;
var c=function(){
if(/webdev.*\.mail\.qq\.com/gi.test(window.location.hostname))
{
return true;
}
return false;
};
var f={createTPL:function(h){
return function(i){
return $.TE(a.getRes($.T(i,'%').replace(h)));
};
},maybeNewUserForResume:function(){
a.reloadLeftWin();
},getDragLib:function(h){
return {initUploader:$.noop,editMsgBoxStyle_:function(){
this.msgDom$_().css({width:'100%',fontSize:'14px',textAlign:'center',lineHeight:this.dragDom$_().height()+'px'});
return this;
},initData_:function(){
this.super_(h,'initData_',arguments);
this._bDisabledSelect=false;
this._bShowing=false;
return this;
},enable:function(i){
this._bDisabledSelect=i===true;
return this;
},initWinEvents_:function(){
var k=this,l=$.inWin(),j;
if(!k.msgDom$_().data(0))
{
return this;
}
function i(m)
{
$.stopPropagation(m);
$.preventDefault(m);
k.hideDragDom_();
}
$.$(l).addEvent("dragover",function(m){
if(!a.oFileUploadUtil.isFileDragOver(m))
{
return;
}
if(!k._bDisabledSelect)
{
if(j)
{
l.clearTimeout(j);
j=null;
}
k.showDragDom_();
}
$.preventDefault(m);
}).addEvent('drop',i).addEvent('dragleave',function(){
if(j)
{
return;
}
j=l.setTimeout(function(){
j=null;
k.hideDragDom_();
},500);
});
k.dragDom$_().addEvent('drop',i);
k.msgDom$_().addEvent('drop',i);
k._initTopEvents();
return this;
},_initTopEvents:function(){
var i=this,j=getTop();
function l()
{
var m=i.dragDom$_().data(0);
m&&m.style&&i.hideDragDom_();
}
a.addEvent(j,"dragenter",l);
function k()
{
a.removeEvent(j,"dragenter",l);
}
$.addPageUnloadEvent(k);
this.on('remove',k);
return this;
},showDragDom_:function(){
if(!this._bShowing)
{
this._bShowing=true;
this.dragDom$_().addClass('qui_dragArea_Show');
this.editMsgBoxStyle_();
}
return this;
},msgDom$_:function(){
return this.dragDom$_().find('div[ui-type="html5drag_msg"]');
},_hideSelfDragDom:function(){
this._bShowing=false;
this.dragDom$_().rmClass('qui_dragArea_Show');
return this;
},dragDom$_:function(){
return this.dom$();
},_oDragCtrl:arguments.callee._oDragCtrl||(arguments.callee._oDragCtrl=[]),init_:function(){
this._oDragCtrl.push(this);
return this.super_(h,'init_',arguments);
},remove:function(){
for(var j=this._oDragCtrl.length;j--;)
{
if(this._oDragCtrl[j]===this)
{
this._oDragCtrl.splice(j,1);
break;
}
}
return this.super_(h,'remove',arguments);
},hideDragDom_:function(){
$.each(this._oDragCtrl,function(i){
i._hideSelfDragDom();
});
return this;
}};
},placeholder:function(h){
var j=h.length>=0?h:[h];
for(var l=0;l<j.length;l++)
{
if(!j[l].getAttribute("_has_placeholder"))
{
var k=j[l].getAttribute("default")||"";
if(a.gbIsIE&&a.gnIEVer<10.0)
{
this._IEPlaceholder(j[l],k);
}
else{
j[l].setAttribute("placeholder",k);
}
j[l].setAttribute("_has_placeholder","1");
}
}
},removePlaceholder:function(h){
h.value='';
h.style.cssText='';
a.rmClass(h,'placeholder');
},_IEPlaceholder:function(){
var h=this;
if(!_aoDom.value)
{
_aoDom.value=_asDefaultVal;
_aoDom.style.cssText='color: rgb(160,160,160)';
a.addClass(_aoDom,"placeholder");
}
a.addEvent(_aoDom,"focus",function(){
if(_aoDom.value==_asDefaultVal)
{
h.removePlaceholder(_aoDom);
}
});
a.addEvent(_aoDom,"blur",function(){
if(_aoDom.value=='')
{
_aoDom.value=_asDefaultVal;
_aoDom.style.cssText='color: rgb(160,160,160)';
a.addClass(_aoDom,"placeholder");
}
});
},adjustRender:d,focusLast:function(h){
var i=h.value.length;
if(h.setSelectionRange)
{
h.focus();
h.setSelectionRange(i,i);
}
else if(h.createTextRange)
{
var j=h.createTextRange();
j.collapse(true);
j.moveEnd('character',i);
j.moveStart('character',i);
j.select();
}
},autoTextArea:function(i,j,h){
var l=h,k=parseFloat(a.getStyle(j,'lineHeight')),m=a.getDomWin(i).document.createElement('div');
m.style.width=a.getStyle(j,'width');
m.style.lineHeight=k+'px';
m.style.fontFamily=a.getStyle(j,'fontFamily');
m.style.fontSize=a.getStyle(j,'fontSize');
m.style.position='absolute';
m.style.top='-99999px';
m.style.left='-99999px';
m.style.wordBreak='break-all';
j.parentNode.insertBefore(m,j);
var n=function(){
m.innerHTML=$.htmlEncode(j.value+'\n').replace(/ /g,'&nbsp;').replace(/\n/g,'<br />');
var p=Math.max(h,m.clientHeight+k),o=a.attr(i,'nMaxHeight')||600;
j.style.height=p+'px';
if(i.scrollHeight+(p-l)>o)
{
i.style.height=o+'px';
}
else{
i.style.height='';
}
l=p;
};
n();
a.addEvent(j,'propertychange',function(o){
if(o.propertyName=='value')
{
n();
}
});
a.addEvent(j,'input',n);
a.addEvent(j,'keydown',function(o){
if(o.keyCode==8||o.keyCode==46)
{
n();
}
});
},getTextAreaLength:function(h){
var i=h||"";
i=i.replace(/\r\n/g,'a');
return i.length;
},htmlEncodeAllData:function(h){
var i=function(j){
$.each(j,function(l,k){
if(typeof l==='string')
{
j[k]=$.htmlEncode(l).replace(/(\u00a0|\u0020){1,}/g,function(m){
if(m.length==1)
{
return ' ';
}
return ' '+new Array(m.length).join('&nbsp;');
});
}
else if(typeof l=="object")
{
j[k]=i(l);
}
});
return j;
};
return i(h);
},textToHtml:function(h){
return ['<DIV>',h.replace((h.indexOf("<BR>")>=0)?/<BR>/ig:/\n/g,"</DIV><DIV>"),"</DIV>"].join("").replace(new RegExp("\x0D","g"),"").replace(new RegExp("(<DIV><\/DIV>)*$","g"),"").replace(/<DIV><\/DIV>/g,"<DIV>&nbsp;</DIV>");
},indexSpeedReport:function(h,j){
if(j.length<=1||c())
{
return;
}
var l=function(i){
for(var o in i)
{
return i[o];
}
};
var k=function(i,o){
var p=l(i),q=l(o);
return q-p;
};
var m="";
for(var n=1;n<j.length;n++)
{
m+="&"+n+"="+k(j[n-1],j[n]);
}
m+="&"+j.length+"="+k(j[0],j[j.length-1]);
setTimeout(function(){
new Image().src="http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=6000&flag2=102&flag3="+h+m+"&_t="+(new Date()-0);
},0);
},performanceReport:function(h){
if(c())
{
return;
}
if(!window.performance||!performance.timing)
{
return;
}
var j=performance.timing;
var l="",m=g[0];
for(var n=1;n<g.length;n++)
{
var k=g[n];
if(j[k]>0)
{
l+="&"+n+"="+(j[k]-j[m]);
}
else{
}
}
setTimeout(function(){
new Image().src="http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=6000&flag2=102&flag3="+h+l+"&_t="+(new Date()-0);
},0);
}};
$.createLib("resume.utils",{bStatic:true},function(h){
return f;
});
});
$.package('resume/lib/validate.js',[],function(){
$.createLib('resume.validate',{bStatic:true},function(a){
return {required:function(b){
return b.length>0;
},email:function(b){
return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(b);
},url:function(b){
return /^((https|http|ftp|rtsp|mms)?:\/\/)?(([0-9a-z_!~\*'\(\)\.&=\+\$%-]+: )?[0-9a-z_!~\*'\(\)\.&=\+\$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~\*'\(\)-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~\*'\(\)\.;\?:@&=\+\$,%#-]+)+\/?)$/.test(b);
},date:function(b){
return /^(?:(?!0000)[0-9]{4}([-\/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-\/.]?)0?2\2(?:29))$/.test(b);
},mobile:function(b){
if(!b)
{
return false;
}
else{
return /(^(?:(?:\(\+?\d{1,5}\-?\)|\+?\d{1,5}\-?)?(?:1\d{3}(?:\-?\d{3,4}){2}|(?:[(]?\d{2,4}[)]?)?\d{3,5}\-?\d{3,5}(?:\-?(?:\d{1,8}|\(\d{1,8}\)))?))$)/.test(b)?true:false;
}
},minLength:function(c,b){
return c&&b&&c.length>b-1;
},maxlength:function(c,b){
return c&&b&&c.length<b+1;
},rangelength:function(d,c,b){
return d&&c&&b&&d.length>c-1&&d.length<b+1;
}};
});
});
$.package('resume/lib/calendar.js',[],function(b){
var a=function(c,d){
this.init(c,d);
};
a.prototype={init:function(c,d){
this.id='cal'+(new Date()-0);
this.container=c;
this.oWin=c.ownerDocument.parentWindow||c.ownerDocument.defaultView;
this.opts=d;
this.type='year';
this.nCurrY=d.nCurrY||new Date().getFullYear();
this.nChangedY=this.nCurrY;
this.nCurrM=d.nCurrM||new Date().getMonth()+1;
this.onCellClick=d.onCellClick||function(e){
};
this.onClose=d.onClose||function(){
};
this._drawCommon();
this._drawCalendar();
this._addEvents(this.calendar);
return this.calendar;
},_addEvents:function(d){
var c=function(e){
e=e||window.event;
if(e.stopPropagation)
{
e.stopPropagation();
}
else{
e.cancelBubble=true;
}
};
if(d.addEventListener)
{
d.addEventListener("mousedown",c);
}
else{
d.attachEvent("onmousedown",c);
}
},getCal:function(){
return this.calendar;
},_drawCommon:function(){
this.calendar=this.oWin.document.createElement("div");
this.calendar.setAttribute("id",this.id);
this.calendar.className="qui_cal qui_cal_Month";
this.oWin.document.body.insertBefore(this.calendar,this.oWin.document.body.firstChild);
this.calendar.style["left"]=this.opts.nX+"px";
this.calendar.style["top"]=this.opts.nY+"px";
this.calendar.style["z-index"]=1224;
this._drawHeader();
this.calMainBox=this.oWin.document.createElement("div");
this.calMainBox.className="qui_cal_box";
this.calendar.appendChild(this.calMainBox);
},_drawHeader:function(){
var e=this;
this.headBox=this.oWin.document.createElement("div");
this.headBox.className="qui_cal_head";
for(var d=0;d<2;d++)
{
var c=this.oWin.document.createElement("a");
d==0?c.className="qui_cal_head_icon qui_cal_head_pre":c.className="qui_cal_head_icon qui_cal_head_next";
c.href="javascript:void(0)";
var f=this.oWin.document.createElement("span");
f.className="qui_cal_shape qui_cal_shape_"+(d*2+2);
c.appendChild(f);
c.onclick=(function(g){
return function(){
e._redraw(g);
};
})(d);
this.headBox.appendChild(c);
}
this.calHeadTitle=this.oWin.document.createElement("span");
this.calHeadTitle.className="qui_cal_head_title";
this.headBox.appendChild(this.calHeadTitle);
this.calendar.appendChild(this.headBox);
},_drawCalendar:function(){
this.calMainBox.innerHTML="";
this.calBody=this.oWin.document.createElement("div");
this.calBody.className="qui_cal_main";
this.calMainBox.appendChild(this.calBody);
this._drawMain();
},_y_fillArray:function(e){
var c=[];
for(var d=-5;d<7;d++)
{
c.push({"className":"qui_cal_cell qui_cal_cell_Month","year":e+d});
}
return c;
},_m_fillArray:function(e){
var c=new Array(12);
for(var d=0;d<12;d++)
{
c[d]={"className":"qui_cal_cell qui_cal_cell_Month","year":e,"month":d+1+"\u6708"};
}
return c;
},_drawMain:function(){
var c;
var e=this.oWin.document.createDocumentFragment();
var g=this;
switch(this.type)
{case "year":
c=this._y_fillArray(this.nChangedY);
this.calHeadTitle.innerHTML=[this.nChangedY-5,this.nChangedY+6].join("-");
this.calHeadTitle.className="qui_cal_head_title";
this.calHeadTitle.onclick=function(){
};
for(var f=0;f<c.length;f++)
{
var h=this.oWin.document.createElement("a");
h.innerHTML=c[f].year;
h.className=c[f].className;
h.href="javascript:void(0)";
(this.nCurrY==c[f].year)&&(h.className+=" qui_cal_cell_Current");
h.onclick=(function(i){
return function(){
g.type="month";
g.nChangedY=i.year;
g._drawCalendar();
};
})(c[f]);
e.appendChild(h);
if(f%4==3)
{
var d=this.oWin.document.createElement("div");
d.style.clear="both";
e.appendChild(d);
}
}
break;
case "month":
c=this._m_fillArray(this.nChangedY);
this.calHeadTitle.innerHTML=this.nChangedY+'\u5E74';
this.calHeadTitle.className+=" qui_cal_head_title_Clickable";
this.calHeadTitle.onclick=function(){
g.type="year";
g._drawCalendar();
};
for(var f=0;f<c.length;f++)
{
var h=this.oWin.document.createElement("a");
h.innerHTML=c[f].month;
h.className=c[f].className;
h.href="javascript:void(0)";
(this.nCurrM==c[f].month.split("\u6708")[0])&&(h.className+=" qui_cal_cell_Current");
h.onclick=(function(i){
return function(){
g.onCellClick(i);
g.onClose();
};
})(c[f]);
e.appendChild(h);
if(f%this.lineCount==this.lineCount-1)
{
var d=this.oWin.document.createElement("div");
d.style.clear="both";
e.appendChild(d);
}
}
break;
}this.calBody.appendChild(e);
},_redraw:function(c){
if(c)
{
this.type=="year"?this.nChangedY+=12:this.nChangedY+=1;
}
else{
this.type=="year"?this.nChangedY-=12:this.nChangedY-=1;
}
this._drawCalendar();
}};
$.createLib("resume.calendar",{bStatic:true},function(c){
return {createCalendar:function(d,e){
return new a(d,e);
}};
});
});
$.package('resume/model/config.js',[],function(b){
var a=$.lib('resume.adaptor');
var c=$.lib('array');
var f=[{id:'baseinfo',name:'\u57FA\u672C\u8D44\u6599'},{id:'face',name:'\u4E2A\u4EBA\u7167\u7247'},{id:'apply_intention',name:'\u6C42\u804C\u610F\u5411'},{id:'education',name:'\u6559\u80B2\u7ECF\u5386'},{id:'school_experience',name:'\u6821\u5185\u7ECF\u5386'},{id:'experience',name:'\u5DE5\u4F5C\u7ECF\u5386'},{id:'project',name:'\u9879\u76EE\u7ECF\u5386'},{id:'awards',name:'\u83B7\u5956\u60C5\u51B5'},{id:'ability',name:'\u4E2A\u4EBA\u6280\u80FD'},{id:'self_evaluate',name:'\u81EA\u6211\u8BC4\u4EF7'},{id:'custom',name:'\u81EA\u5B9A\u4E49\u6A21\u5757'}];
var d=[{id:'baseinfo',name:'Basic Information'},{id:'face',name:'Avatar'},{id:'apply_intention',name:'Objective'},{id:'education',name:'Education'},{id:'school_experience',name:'Activites'},{id:'experience',name:'Work Experience'},{id:'project',name:'Projects'},{id:'awards',name:'Awards'},{id:'ability',name:'Skills'},{id:'self_evaluate',name:'Summary'},{id:'custom',name:'Custom'}];
var g=[{id:'2',name:'\u6807\u51C6',imgVer:'20150617',thumb:a.getRes('$images_path$resume/template226ba16.png'),midThumb:a.getRes('$images_path$resume/template2_mid26ba16.png'),largeThumb:a.getRes('$images_path$resume/template2_large_png827580b.png'),faceDefault:a.getRes('$images_path$resume/template/ico_t2AvatarDefault269d17.png'),faceDefault_png8:'',faceInstead:''},{id:'4',name:'\u8868\u683C',imgVer:'20150617',thumb:a.getRes('$images_path$resume/template326ba16.png'),midThumb:a.getRes('$images_path$resume/template3_mid26ba16.png'),largeThumb:a.getRes('$images_path$resume/template3_large_png827580b.png'),faceDefault:a.getRes('$images_path$resume/template/ico_t3AvatarDefault266ee1.png'),faceDefault_png8:'',faceInstead:''},{id:'1',name:'\u5206\u680F',imgVer:'20150617',thumb:a.getRes('$images_path$resume/template126ba16.png'),midThumb:a.getRes('$images_path$resume/template1_mid26ba16.png'),largeThumb:a.getRes('$images_path$resume/template1_large_png827580b.png'),faceDefault:a.getRes('$images_path$resume/template/ico_t1AvatarDefault266ee1.png'),faceDefault_png8:'',faceInstead:''},{id:'3',name:'\u65F6\u95F4\u8F74',imgVer:'20150617',thumb:a.getRes('$images_path$resume/template326ba16.png'),midThumb:a.getRes('$images_path$resume/template3_mid26ba16.png'),largeThumb:a.getRes('$images_path$resume/template3_large_png827580b.png'),faceDefault:a.getRes('$images_path$resume/template/ico_t3AvatarDefault266ee1.png'),faceDefault_png8:'',faceInstead:''}];
var e=[{id:'en_1',name:'\u82F1\u6587\u7248',imgVer:'20150617',thumb:a.getRes('$images_path$resume/template326ba16.png'),midThumb:a.getRes('$images_path$resume/template3_mid26ba16.png'),largeThumb:a.getRes('$images_path$resume/template3_large_png827580b.png'),faceDefault:a.getRes('$images_path$resume/template/ico_t3AvatarDefault266ee1.png'),faceDefault_png8:'',faceInstead:''}];
$.createCtrl('resume.model.config',{},function(h){
return {getModulesList:function(){
if($.lib('resume.modelmgr').getModel('setting').getResumeType()=='en')
{
return d;
}
return f;
},getModuleName:function(i){
var j=c.filter(this.getModulesList(),function(k){
return k.id==i;
});
if(j&&j.length)
{
return j[0].name;
}
},getModuleEditedPer:function(){
var k=$.lib('resume.modelmgr');
var j=0;
var i=0;
c.forEach(this.getModulesList(),function(l){
var m=k.getModModel(l.id);
if(m.get('visible')||l.id=='baseinfo'||l.id=='custom')
{
var n=m.getEditedPerInfo();
j+=n.nTotal;
i+=n.nEdited;
}
});
return j?i/j:0;
},getSkinId:function(){
return $.lib('resume.modelmgr').getModel('setting').getSkin();
},getSkinInfo:function(i){
var j=this.getSkinList();
i=i||this.getSkinId();
return c.filter(j,function(k){
return k.id==i;
})[0];
},getSkinView:function(){
return 'module_skin_'+this.getSkinId();
},getSkinList:function(){
if($.lib('resume.modelmgr').getModel('setting').getResumeType()=='en')
{
return e;
}
return g;
}};
});
});
$.package('resume/model/module_ability.js',[],function(a){
$.createCtrl('resume.model.module_ability',{sSuper:'resume.model.moduleBase'},function(b){
var c=$.lib('resume.utils');
return {defaultVal:function(){
return {visible:true,ability:''};
},toTplJSON:function(d){
var f=this.toEscapeJSON(),e=f.visible;
f.ability=c.textToHtml(f.ability);
f.isEmpty=this.isEmpty();
if(d&&f.isEmpty)
{
f=$.extend({},this.guideData());
f.visible=e;
f.falseDataColor="faseData_color";
}
return f;
}};
});
});
$.package('resume/model/module_apply_intention.js',[],function(a){
$.createCtrl('resume.model.module_apply_intention',{sSuper:'resume.model.moduleBase'},function(b){
return {defaultVal:function(){
return {visible:true,title:'',work_place:''};
},parseServ:function(c){
var d=c.data||{};
if('visible' in c)
{
d.visible=c.visible;
}
else{
d.visible=true;
}
return d;
},toTplJSON:function(c){
var e=this.toEscapeJSON(),d=e.visible;
e.isEmpty=this.isEmpty();
if(c&&e.isEmpty)
{
e=$.extend({},this.guideData());
e.visible=d;
e.falseDataColor="faseData_color";
}
return e;
},toServJSON:function(){
var c={},d=this.super_(b,'toServJSON',arguments);
c.visible=d.visible!==false?true:false;
delete d.visible;
c.data=d;
return c;
}};
});
});
$.package('resume/model/module_awards.js',[],function(a){
var b=$.lib('resume.utils');
$.createCtrl('resume.model.module_awards',{sSuper:'resume.model.moduleBase'},function(c){
return {defaultVal:function(){
return {"visible":true,"data":[{name:'',time:''}]};
},parseServ:function(d){
var e=d;
$.each(e.data,function(f){
if(f.time)
{
f.time=f.time.replace("-",".");
var g=/\.(\d+)$/.test(f.time)&&RegExp.$1;
if(g&&parseFloat(g)<10)
{
f.time=f.time.replace(/(\d+)$/,'0'+parseFloat(g));
}
}
});
e.data=e.data;
return e;
},toTplJSON:function(d){
var f=this.toEscapeJSON(),e=f.visible;
f.dataLength=f.data?f.data.length:0;
f.isEmpty=this.isEmpty();
if(d&&f.isEmpty)
{
f=$.extend({},this.guideData());
f.visible=e;
f.dataLength=3;
f.falseDataColor="faseData_color";
}
return f;
}};
});
});
$.package('resume/model/module_baseinfo.js',[],function(b){
var a=$.lib('resume.adaptor');
$.createCtrl('resume.model.module_baseinfo',{sSuper:'resume.model.moduleBase'},function(c){
return {defaultVal:function(){
return {visible:true,name:'',sex:'',age:'',city:'',highest_education:'',work_seniority:'',mobile:'',email:'',avatar:''};
},toTplJSON:function(d){
var f=this.toEscapeJSON(),e=f.visible,g=f.avatar;
delete f.detail;
if(f.age)
{
f.age=parseFloat(f.age);
}
f.isEmpty=this.isEmpty();
if(d&&f.isEmpty)
{
f=$.extend({},this.guideData());
f.visible=e;
f.avatar=g;
f.falseDataColorDark="faseData_colorDark";
f.falseDataColor="faseData_color";
}
f.bShowDefaultFace=false;
if($.inWin()._bInResumeCenter)
{
f.bShowDefaultFace=true;
}
return f;
},parseServ:function(d){
var e=d;
if(e.birthday&&e.birthday!="--")
{
e.age=new Date().getFullYear()-e.birthday.split("-")[0];
}
delete e.birthday;
return e;
}};
});
});
$.package('resume/model/module_custom.js',[],function(a){
$.createCtrl('resume.model.module_custom',{sSuper:'resume.model.moduleBase'},function(c){
var b=$.lib('resume.adaptor');
var d=$.lib('resume.utils');
return {defaultVal:function(){
return {data:[]};
},toTplJSON:function(e){
var f=this.toEscapeJSON();
if(f.data)
{
var g=[];
$.each(f.data,function(h){
var i=$.extend({},h);
i.content=h.content?d.textToHtml(h.content):'';
g.push(i);
});
f.data=g;
}
return f;
},deleteCustomById:function(e){
var h=this.get('data').slice(),g=parseFloat(e);
if(g>=0)
{
for(var m=0,o=0;m<h.length;m++)
{
if(m!=g)
{
h[o++]=h[m];
}
}
var k=$.lib('resume.modelmgr').getModel('setting'),j=$.ctrl("resume.controller.select_modules")._getModuleListOrder();
if(j.length==0)
{
j=k.getOrder();
}
for(var m=0;m<j.length;m++)
{
if(j[m]==("_custom_"+g))
{
j.splice(m,1);
break;
}
}
for(var m=0;m<j.length;m++)
{
var f=j[m].match(/_custom_(\d)/)&&RegExp.$1;
if(f>g)
{
j[m]="_custom_"+(f-1);
}
}
var l='order';
if(k.getResumeType()=='en')
{
l='order_en';
}
k.save(l,j.join("|"),{silent:true});
h.length-=1;
this.save('data',h);
}
return this;
},saveCustomById:function(f,e){
var g=this.get('data').slice(),i={};
if(e.index!==a)
delete e.index;
if(parseFloat(f)>=0)
{
i=g[f];
i=$.extend({},i,e);
i.index&&delete i.index;
if(i.visible=='true'||i.visible==true)
{
i.visible=true;
}
else{
i.visible=false;
}
g[f]=i;
}
else{
e.visible=true;
g.push(e);
var j=$.lib('resume.modelmgr').getModel('setting'),h=$.ctrl("resume.controller.select_modules")._getModuleListOrder();
if(h.length==0)
{
h=j.getOrder();
}
h.push('_custom_'+(g.length-1));
var k='order';
if(j.getResumeType()=='en')
{
k='order_en';
}
j.save(k,h.join("|"),{silent:true});
}
this.save('data',g);
return this;
}};
});
});
$.package('resume/model/module_edit_select.js',[],function(a){
$.createCtrl('resume.model.module_edit_select',{sSuper:'resume.model'},function(b){
return {defaults:function(){
return {"cn":{sex:[{sId:'1',sItemValue:'\u7537'},{sId:'2',sItemValue:'\u5973'}],degree:[{sId:'1',sItemValue:'\u5927\u4E13'},{sId:'2',sItemValue:'\u672C\u79D1'},{sId:'3',sItemValue:'\u7855\u58EB'},{sId:'4',sItemValue:'\u535A\u58EB'},{sId:'5',sItemValue:'\u5176\u4ED6'}],work_seniority:[{sId:'1',sItemValue:'\u5E94\u5C4A\u6BD5\u4E1A\u751F'},{sId:'2',sItemValue:'1\u5E74'},{sId:'3',sItemValue:'2\u5E74'},{sId:'4',sItemValue:'3\u5E74'},{sId:'5',sItemValue:'4\u5E74'},{sId:'6',sItemValue:'5\u5E74'},{sId:'7',sItemValue:'5\u5E74\u4EE5\u4E0A'}]},"en":{sex:[{sId:'1',sItemValue:'boy'},{sId:'2',sItemValue:'girl'}],degree:[{sId:'1',sItemValue:'Bachelor'},{sId:'2',sItemValue:'Master'},{sId:'3',sItemValue:'Doctor'},{sId:'4',sItemValue:'Other'}],work_seniority:[{sId:'1',sItemValue:'Graduates'},{sId:'2',sItemValue:'one year'},{sId:'3',sItemValue:'two years'},{sId:'4',sItemValue:'three years'},{sId:'5',sItemValue:'four years'},{sId:'6',sItemValue:'five years'},{sId:'7',sItemValue:'More than 5 years'}]}};
},getItems:function(c){
var d=this.toJSON();
if($.lib('resume.modelmgr').getModel('setting').getResumeType()=='en')
{
return d['en'][c];
}
return d['cn'][c];
}};
});
});
$.package('resume/model/module_education.js',[],function(a){
$.createCtrl('resume.model.module_education',{sSuper:'resume.model.moduleBase'},function(b){
return {defaultVal:function(){
return {visible:true,data:[{school:'',major:'',degree:'',start:'',end:''}]};
},toTplJSON:function(c){
var e=this.toEscapeJSON(),d=e.visible;
if(e.data)
{
var f=[];
$.each(e.data,function(g){
var h=$.extend({},g);
f.push(h);
});
e.data=f;
e.dataLength=e.data.length;
}
e.isEmpty=this.isEmpty();
if(c&&e.isEmpty)
{
e=$.extend({},this.guideData());
e.visible=d;
e.falseDataColor="faseData_color";
e.dataLength=1;
}
return e;
}};
});
});
$.package('resume/model/module_experience.js',[],function(a){
$.createCtrl('resume.model.module_experience',{sSuper:'resume.model.moduleBase'},function(c){
var b=$.lib('resume.adaptor');
var d=$.lib('resume.utils');
return {defaultVal:function(){
return {visible:true,data:[{company:'',start:'',end:'',title:'',performance:''}]};
},toTplJSON:function(e){
var g=this.toEscapeJSON(),f=g.visible;
if(g.data)
{
var h=[];
$.each(g.data,function(i){
var j=$.extend({},i);
j.performance=j.performance?d.textToHtml(j.performance):'';
h.push(j);
});
g.data=h;
g.dataLength=g.data.length;
}
g.isEmpty=this.isEmpty();
if(e&&g.isEmpty)
{
g=$.extend({},this.guideData());
g.visible=f;
g.falseDataColor="faseData_color";
g.dataLength=1;
}
return g;
}};
});
});
$.package('resume/model/module_project.js',[],function(a){
$.createCtrl('resume.model.module_project',{sSuper:'resume.model.moduleBase'},function(c){
var b=$.lib('resume.adaptor');
var d=$.lib('resume.utils');
return {defaultVal:function(){
return {visible:true,data:[{name:'',title:'',start:'',end:'',description:''}]};
},toTplJSON:function(e){
var g=this.toEscapeJSON(),f=g.visible;
if(g.data)
{
var h=[];
$.each(g.data,function(i){
var j=$.extend({},i);
j.description=j.description?d.textToHtml(j.description):'';
h.push(j);
});
g.data=h;
g.dataLength=g.data.length;
}
g.isEmpty=this.isEmpty();
if(e&&g.isEmpty)
{
g=$.extend({},this.guideData());
g.visible=f;
g.falseDataColor="faseData_color";
g.dataLength=1;
}
return g;
}};
});
});
$.package('resume/model/module_school_experience.js',[],function(a){
$.createCtrl('resume.model.module_school_experience',{sSuper:'resume.model.moduleBase'},function(c){
var b=$.lib('resume.adaptor');
var d=$.lib('resume.utils');
return {defaultVal:function(){
return {visible:true,data:[{organization:'',job:'',start:'',end:'',description:''}]};
},toTplJSON:function(e){
var g=this.toEscapeJSON(),f=g.visible;
if(g.data)
{
var h=[];
$.each(g.data,function(i){
var j=$.extend({},i);
j.description=j.description?d.textToHtml(j.description):'';
h.push(j);
});
g.data=h;
g.dataLength=g.data.length;
}
g.isEmpty=this.isEmpty();
if(e&&g.isEmpty)
{
g=$.extend({},this.guideData());
g.visible=f;
g.falseDataColor="faseData_color";
g.dataLength=1;
}
return g;
}};
});
});
$.package('resume/model/module_self_evaluate.js',[],function(a){
$.createCtrl('resume.model.module_self_evaluate',{sSuper:'resume.model.moduleBase'},function(c){
var b=$.lib('resume.adaptor');
var d=$.lib('resume.utils');
return {defaultVal:function(){
return {visible:true,content:''};
},parse:function(e){
return e;
},toTplJSON:function(e){
var g=this.toEscapeJSON(),f=g.visible;
g.content=g.content?d.textToHtml(g.content):'';
g.isEmpty=this.isEmpty();
if(e&&g.isEmpty)
{
g=$.extend({},this.guideData());
g.visible=f;
g.falseDataColor="faseData_color";
}
return g;
}};
});
});
$.package('resume/model/setting.js',[],function(a){
$.createCtrl('resume.model.setting',{sSuper:'resume.model'},function(b){
var c=$.lib('resume.modelmgr').getModel('sync_proxy');
return {defaults:function(){
return {title:'',title_en:'',imported:false,public_url:'',is_public:false,is_public_en:false,order:'',order_en:'',resume_type:'',skin:'',skin_en:''};
},sync:function(f,d,e){
e=e||{};
$.lib('resume.ajax').ajax({sUrl:'/cgi-bin/resume?func=Setting&kvclick=resume|my_resume|edit|setting',vData:{mailid:c.getMailId(),setting:this.toServJSON()},onsuccess:e.onsuccess,onerror:e.onerror});
},getTypeSkin:function(){
if(this.getResumeType()=='en')
{
return this.get('skin_en');
}
return this.get('skin');
},getSkin:function(){
var f=this.getTypeSkin();
var d=false;
var e=$.lib('resume.modelmgr').getModel('config').getSkinList();
$.each(e,function(g){
if(g.id==f)
{
d=true;
return false;
}
});
return d?f:e[0].id;
},getTypeTitle:function(){
if(this.getResumeType()=='en')
{
return this.get('title_en');
}
return this.get('title');
},titleGuideData:function(){
var d='\u4E92\u8054\u7F51\u4EA7\u54C1\u7ECF\u7406_QQ\u90AE\u7BB1';
if(this.getResumeType()=='en')
{
d='Product Manager_QQMail';
}
return d;
},getTitle:function(){
if($.trim(this.getTypeTitle()))
{
return $.trim(this.getTypeTitle());
}
var e=$.trim($.lib('resume.modelmgr').getModModel('baseinfo').get('name'));
var d=$.trim($.lib('resume.modelmgr').getModModel('apply_intention').get('title'));
if(d||e)
{
return d?d+'_'+e:e;
}
return this.titleGuideData();
},titleIsDefault:function(){
var d=true;
var f=$.trim($.lib('resume.modelmgr').getModModel('baseinfo').get('name'));
var e=$.trim($.lib('resume.modelmgr').getModModel('apply_intention').get('title'));
if($.trim(this.getTypeTitle())||e||f)
{
d=false;
}
return d;
},getTypeOrder:function(){
if(this.getResumeType()=='en')
{
return this.get('order_en');
}
return this.get('order');
},getOrder:function(){
if(this.getTypeOrder())
{
return this.getTypeOrder().split('|');
}
return ['baseinfo','face','apply_intention','education','school_experience','experience','project','awards','ability','self_evaluate'];
},getResumeType:function(){
return this.get("resume_type");
},toServJSON:function(){
var d=this.super_(b,'toServJSON',arguments);
delete d.knowImporte;
return d;
},parseServ:function(d){
if(d&&d.skin==0)
{
delete d.skin;
}
return d;
}};
});
});
$.package('resume/model/sync_proxy.js',['resume/lib/adaptor.js','resume/model/config.js'],function(a){
$.createCtrl('resume.model.sync_proxy',{sSuper:'data.event'},function(c){
var d=$.lib('resume.ajax'),b=$.lib('resume.adaptor'),e=$.lib('resume.modelmgr').getModel('config');
return {init_:function(f){
this.superEx_(c,'init_',arguments);
this._mbIsReady=null;
return this;
},isReady:function(){
return this._mbIsReady;
},getAllJSON:function(){
var f={};
$.each(e.getModulesList(),function(g){
if(g.id!='face')
{
f[g.id]=$.lib('resume.modelmgr').getModModel(g.id).toServJSON();
}
});
return f;
},getMailId:function(){
if($.lib('resume.modelmgr').getModel('setting').getResumeType()=='en')
{
return this._msMailId_en;
}
return this._msMailId;
},getVer:function(){
return this._mnVer||0;
},setAllModel:function(f,g){
g=g||{silent:true};
var i=$.lib('resume.modelmgr').getModel('setting');
var h=$.lib('resume.modelmgr').getModel('moduleBase');
this._msMailId=f.mailid||this._msMailId;
this._msMailId_en=f.mailid_en||this._msMailId_en;
f.setting&&i.set(i.parseServ(f.setting),g);
f.defaults&&h.setItemDefaults(f.defaults);
f.resume&&h.setCnData(f.resume);
f.resume_en&&h.setEnData(f.resume_en);
if(i.getResumeType()=='en')
{
this.setModModels(f['resume_en'],g);
}
else{
this.setModModels(f['resume'],g);
}
this._mbIsReady=true;
return this;
},setModModels:function(f,g){
g=g||{silent:true};
if(f)
{
this._mnVer=f.ver||this._mnVer;
$.each(e.getModulesList(),function(h){
if(f[h.id])
{
var i=$.lib('resume.modelmgr').getModModel(h.id);
i.set(i.parseServ(f[h.id]),g);
}
});
}
},reset:function(f){
f=f||{silent:false};
$.each(e.getModulesList(),function(g){
if(g.id)
{
var h=$.lib('resume.modelmgr').getModModel(g.id);
h.clear(f);
}
});
},onOnceReady:function(f){
if(this.isReady())
{
f(true);
}
else{
var g={fetch_success:function(){
this.off(g);
f(true);
},fetch_error:function(){
this.off(g);
f(false);
}};
this.on(g);
}
return this;
},fetchAll:function(){
var g=this,f={};
window.okloading=true;
if(g._mbIsReady===false)
{
return;
}
g._mbIsReady=false;
if(window.oResumeJsonpData&&window.oResumeJsonpData.result&&window.oResumeJsonpData.result["errCode"]=="0")
{
setTimeout(function(){
g.setAllModel(window.oResumeJsonpData.data);
g.fire('fetch_success');
new Image().src="http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=6000&flag2=102&flag3=4"+["&2="+1].join('')+"&_t="+(new Date()-0);
},0);
return;
}
else if(window.oResumeJsonpData!==false)
{
setTimeout(function(){
if(!window.oResumeJsonpData)
{
new Image().src="http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=6000&flag2=102&flag3=4"+["&3="+1].join('')+"&_t="+(new Date()-0);
}
else if(window.oResumeJsonpData&&window.oResumeJsonpData.result)
{
new Image().src="http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=6000&flag2=102&flag3=4"+["&4="+1].join('')+"&_t="+(new Date()-0);
BJ_REPORT.report("jsonp load error , errorCode="+window.oResumeJsonpData.result["errCode"]);
}
},500);
}
window.oResumeJsonpData=false;
f.sUrl='/cgi-bin/resume?func=Read';
f.vData={};
f.sType="GET";
f.onsuccess=function(h,j,i){
g.setAllModel(h);
g.fire('fetch_success');
};
f.onerror=function(h,j,i){
g._mbIsReady=null;
g.fire('fetch_error');
};
d.ajax(f);
},sync:function(f){
f||(f={});
f.sUrl='/cgi-bin/resume?func=Mod&kvclick=resume|my_resume|edit';
var j='|cn';
if($.lib('resume.modelmgr').getModel('setting').getResumeType()=='en')
{
j='|en';
}
f.sUrl+=j;
if(!f.vData)
{
f.vData={mailid:this.getMailId(),resume:this.getAllJSON()};
}
var l=f.success||function(){
};
var k=f.error||function(){
};
var i=this,g=f.onerror||$.noop,h=$.ctrl('resume.model.localstorage');
f.onsuccess=function(){
if(h.get())
{
h.clear();
}
if(!i._mbTmpHasSync)
{
i._mbTmpHasSync=true;
$.addPageUnloadEvent(function(){
b.QMAjax.send('/cgi-bin/resume_result');
});
}
l.apply(null,arguments);
};
f.onerror=function(n,o,m){
b.showError('\u4FDD\u5B58\u6570\u636E\u5931\u8D25\uFF0C\u8BF7<a href="javascript:;">\u91CD\u8BD5</a>');
var p=b.S('msgBoxDIV').getElementsByTagName('a')[0];
if(p)
{
p.onclick=function(){
b.hideMsg();
i.sync(f);
};
}
h.set(f.vData);
k.apply(null,arguments);
return $.call(this,g,arguments);
};
return d.ajax(f);
}};
});
});
$.package("resume/model/works.js",["resume/base/model.js",'resume/lib/adaptor.js'],function(){
var a=$.lib('resume.adaptor');
$.createCtrl('resume.model.works',{sSuper:'resume.model'},function(b){
return {_nAppId:55,init_:function(c){
var d=this;
d.super_(b,'init_',arguments);
if(c.options&&c.options.oFile)
{
d._setFile(c.options.oFile);
}
else{
this.set('nAppId',this._nAppId);
}
return this;
},_setFile:function(c){
this._moFile=c;
this._moFile.sModelCid=this.cid;
this.syncFile();
this.set('nAppId',this._nAppId);
return this;
},set:function(){
var c=this.super_(b,'set',arguments);
this._syncFileAnti();
return c;
},idAttribute:function(){
return 'sFileId';
},upload:function(){
return this._moFile&&this._moFile.uploadToFtn();
},cancel:function(){
var c=this;
c._moFile&&c._moFile.cancel();
c.syncFile();
return this;
},retry:function(){
var c=this;
c.set('sStatus','ready');
c._destroySync({onsuccess:function(){
c.fire('uploadRetry',c,c.collection);
},onerror:function(){
c.set('sStatus','error');
c.fire('error',c,{sMethod:'model.uploadRetry'});
}});
return this;
},resume:function(c){
if(this._moFile&&this._moFile.resumeLocal)
{
this._moFile.resumeLocal();
}
else if(c.resume&&this.hasLocalPath())
{
this._setFile(c.resume(this.attributes));
}
return this;
},hasLocalPath:function(){
var c=this.get('sLocalPath');
return c&&(c.indexOf('/')!=-1||c.indexOf('\\')!=-1);
},syncFile:function(){
this._moFile&&this.set(this._moFile.get());
return this;
},_syncFileAnti:function(){
this._moFile&&this._moFile.set(this.attributes);
return this;
},destroy:function(c){
var e=this;
e.cancel();
c=c||{};
c.wait=true;
this.bHasDestroyed=true;
var d=c.onerror;
c.onerror=function(f,g){
e.bHasDestroyed=false;
e.fire('error',f,g);
return $.call(this,d,arguments);
};
if(!c.silent)
{
e.fire('preDestroy',e,e.collection,c);
}
return e.super_(b,'destroy',[c]);
},sync:function(e,c,d){
d.sMethod='model.'+e;
if(e=='delete')
{
this._destroySync(d);
}
else{
d.onsuccess();
}
return this;
},_destroySync:function(c){
var d=this;
if(d.get('sFileId'))
{
$.ajax({sUrl:'/cgi-bin/ftnDelFile?t=ftn.json&s=oper&ef=js&pathid=&keytext=',vData:{sid:$.sid(),fid:d.get('sFileId')},onsuccess:function(e){
var f=$.evalVal(e);
if(f.errcode==0)
{
d.set('sFileId','');
c.onsuccess();
}
else{
this.onerror(null,'cgi_error',f);
}
},onerror:function(e,f,g){
if(f!='cgi_error')
{
c.sError=(g||(e.readyState==4?e.status:e.readyState))+'';
}
else{
c.sError=f+'/'+g.errcode;
}
c.onerror();
d.fire('destroy_err',d,d.collection,c);
}});
}
else{
c.onsuccess();
}
return this;
},toTplJSON:function(){
var c=this.get('sName');
return {filename:$.htmlEncode(c),status:this.get('sStatus'),uploadStep:this.get('sUploadStep'),icon:a.getFileIcon(c,'mid'),cid:this.cid,nSize:this._getSize(),size:this.formatSize(this.get('nSize')),uploadedSize:this.formatSize(this.get('nUploadedSize')),speed:this.get('nSpeed')?this.stringifySpeed(this.get('nSpeed')):null,errmsg:$.htmlEncode(this.get('sError')),spacer_gif:a.getRes('$images_path$spacer1e9c5d.gif'),signPercent:this.get('nSignPercent')?Math.round(this.get('nSignPercent')):0};
},stringifySpeed:function(c){
return a.oFileUploadUtil.stringifySpeed(c);
},formatSize:function(c){
return a.oFileUploadUtil.formatSize(this._getSize(c));
},_getSize:function(c){
c=c||this.get('nSize');
return !c||c<0?0:c;
}};
});
$.createCtrl('resume.collection.works',{sSuper:'resume.collection'},function(b){
return {modelName:'resume.model.works',init_:function(){
this._initEvents();
return this.super_(b,'init_',arguments);
},_initEvents:function(){
this.on('change:sStatus',function(c,d){
if(d=='error')
{
this.next();
}
else if(d=='complete')
{
this.next();
c.save();
}
});
this.on('preDestroy',function(c){
this.next();
});
this.on('destroy',function(c){
this.super_(b,'remove',[c]);
});
this.on('uploadRetry',function(){
this.next();
});
},remove:function(c,d){
var f=this;
var e=$.isArr(c)?c.slice():[c];
$.each(e,function(g){
!g.bHasDestroyed&&g.destroy(d);
});
return this;
},sync:function(e,c,d){
d.sMethod='coll.'+e;
if(e=='read')
{
this._fetchSync(c,d);
}
else{
d.onsuccess();
}
return this;
},_fetchSync:function(c,d){
$.ajax({sUrl:'/cgi-bin/ftnExs_files?t=ftn.json&s=list&ef=js&listtype=resume&r='+$.now(),vData:{sid:$.sid()},onsuccess:function(e){
var f=$.evalVal(e);
if(f.errcode===0&&f.oFiles)
{
d.onsuccess(f.oFiles);
}
else{
this.onerror();
}
},onerror:function(){
d.onerror();
}});
return this;
},addFile:function(c){
this.add(c.get(),{oFile:c});
return this;
},addFiles:function(c){
var d=this;
$.each(c,function(e){
d.addFile(e);
});
return this;
},next:function(){
var c=this.filter(function(d){
return d.get("sStatus")=="ready";
});
if(c.length)
{
$.each(c,function(d){
d.upload();
});
}
return this;
},getUploadList:function(){
return this.filter(function(c){
var d=c.get('sStatus');
return d!='complete'&&d!='error'&&d!='cancel'&&d!='stopped';
});
},getTotalSize:function(){
var c=0;
this.forEach(function(d){
if(d.get('nSize')>0)
{
c+=d.get('nSize');
}
});
return c;
},getVisibleList:function(){
return this.filter(function(c){
return !c.bHasDestroyed;
});
},toTplJSON:function(){
return this.map(function(c){
return c.toTplJSON();
});
}};
});
});
$.package('resume/model/localstorage.js',[],function(a){
$.createCtrl('resume.model.localstorage',{},function(c){
var b=$.lib('resume.adaptor'),d=b.QMLocalStorage;
return {_msLOCALSTORAGE_KEY:'resume_local_jsondata',check:function(){
var h=this;
var f=h.get();
var g=$.lib('resume.modelmgr');
var i=g.getModel('sync_proxy');
var e=i.getVer()||0;
var j=$.lib('resume.modelmgr').getModel('setting').getResumeType()=='en'?'en':'cn';
if(f&&f.ver>e&&f.resume_type==j)
{
i.setModModels(f,{});
i.sync();
b.LogKV('resume|my_resume|localstorage');
b.ossLogCustom("realtime","all",'resume_localstorage',f.ver+'>'+e);
}
return this;
},_generateVer:function(){
return Math.floor($.now()/1000);
},set:function(e){
if(!e)
{
return this;
}
delete e.mailid;
delete e.setting;
e.ver=this._generateVer();
e.resume_type=$.lib('resume.modelmgr').getModel('setting').getResumeType()=='en'?'en':'cn';
d.setUserItem(this._msLOCALSTORAGE_KEY,JSON.stringify(e));
return this;
},get:function(){
return JSON.parse(d.getUserItem(this._msLOCALSTORAGE_KEY));
},clear:function(){
d.removeUserItem(this._msLOCALSTORAGE_KEY);
return this;
}};
});
});
$.package('resume/model/module_en_data.js',[],function(a){
$.createCtrl('resume.model.module_en_data',{sSuper:'resume.model'},function(b){
return {defaults:function(){
return {'resume':{'baseinfo':{visible:true,name:'QQMail',city:'Guangzhou',mobile:'13800138000',email:'mail@qq.com'},'education':{visible:true,data:[{school:'Tencent University',major:'Computer Science',degree:'Master',start:'2005',end:'now'}]},'school_experience':{visible:true,data:[{organization:'PRODUCT CLUB, Tencent University',job:'Vice-President',start:'03/2005',end:'06/2015',description:'\u2022 Led the establishment of QQMail several products like large attachment, drift bottle and notepad.<br/>'+'\u2022 In charge of QQMail projects for Web, App, Foxmail and operated QQMail charity activity.'}]},'experience':{visible:true,data:[{company:'Tencent',start:'2015',end:'now',title:'Product Manager',performance:'\u2022 Led the QQMail update and coordinated resources to manage the projects as well as to polish up details to improve the quality of product.<br/>'+'\u2022 Participated in QQMail each version discussion and proposed effective solution.<br/>'+'\u2022 Managed market promotion and delivered the new function to users through various ways.<br/>'+'\u2022 Collected users\u2019 feedback and analyzed related data to optimize existing function.'}]},'project':{visible:true,data:[{name:'QQMail Charity Project',title:'Leader',start:'04/2014',end:'05/2014',description:'\u2022 Guided users to delete old email to release storage, which can save operating cost to devote into charity activity to help poor areas to improve their classroom illumination.<br/>'+'\u2022 During project, over 1.6 million users participated in it and save storage about 150T, which got highly of society.'}]},'apply_intention':{visible:true,title:'Product Manager',work_place:'Guangzhou'},'ability':{visible:true,ability:'\u2022 Languages: English CET 6, Cantonese<br/>'+'\u2022 Technical: Knowledgeable in Web, iOS and Android programming<br/>'+'\u2022 Computer: Office, AxureRP, Visio'},'awards':{"visible":true,"data":[{name:'Gold medal of \u201CTencent Culture Award\u201D',time:'08/2014'},{name:'Tencent Micro-Innovation Award',time:'05/2014'},{name:'Merit Student of Tencent University',time:'10/2005'}]},'self_evaluate':{visible:true,content:'\u2022 Passionate of Internet<br/>'+'\u2022 Have strong study ability and curious about fresh things<br/>'+'\u2022 Have a good sense of team spirits and responsible for work'},'custom':{data:[{visible:true,title:'Values',content:'Integrity,Proactive,Collaboration,Innovation'}]}}};
},getResume:function(c){
var d=this.toJSON();
return c?d['resume'][c]:d['resume'];
}};
});
});
$.package('resume/model/module_cn_data.js',[],function(a){
$.createCtrl('resume.model.module_cn_data',{sSuper:'resume.model'},function(b){
return {defaults:function(){
return {'resume':{'baseinfo':{visible:true,name:'QQ\u90AE\u7BB1',sex:'\u7537',age:10,city:'\u5E7F\u5DDE',highest_education:'\u672C\u79D1',work_seniority:'\u5E94\u5C4A\u6BD5\u4E1A\u751F',mobile:'13800138000',email:'mail@qq.com',avatar:''},'education':{visible:true,data:[{school:'\u817E\u8BAF\u5927\u5B66',major:'\u8BA1\u7B97\u673A',degree:'\u672C\u79D1',start:'2005.03',end:'now'}]},'school_experience':{visible:true,data:[{organization:'\u817E\u8BAF\u5927\u5B66\u5E7F\u5DDE\u7814\u53D1\u90E8',job:'\u4EA7\u54C1\u534F\u4F1A\u526F\u4E3B\u5E2D',start:'2005.03',end:'2015.06',description:'1\u3001\u4E3B\u5BFCQQ\u90AE\u7BB1\u8D85\u5927\u9644\u4EF6\u3001\u6F02\u6D41\u74F6\u3001\u8BB0\u4E8B\u672C\u7B49\u591A\u4E2A\u4EA7\u54C1\u7684\u7ACB\u9879\u3001\u8D44\u6E90\u534F\u8C03\u3001\u8FDB\u5EA6\u7BA1\u7406\u548C\u5BF9\u5916\u5408\u4F5C\u5DE5\u4F5C<br/>'+'2\u3001\u8D1F\u8D23QQ\u90AE\u7BB1\u7F51\u9875\u7248\u3001QQ\u90AE\u7BB1\u624B\u673A\u5BA2\u6237\u7AEF\u3001Foxmail\u5BA2\u6237\u7AEF\u7B49\u9879\u76EE\uFF0C\u8FD0\u8425\u4E86QQ\u90AE\u7BB1\u516C\u76CA\u6D3B\u52A8--\u201C\u6700\u4EAE\u7684\u660E\u5929\u201D\u6696\u706F\u884C\u52A8<br/>'}]},'experience':{visible:true,data:[{company:'\u817E\u8BAF\u79D1\u6280\u5E7F\u5DDE\u5206\u516C\u53F8',start:'2005.03',end:'now',title:'\u4EA7\u54C1\u7ECF\u7406',performance:'1\u3001\u4E3B\u5BFCQQ\u90AE\u7BB1\u7684\u7248\u672C\u8FED\u4EE3\uFF0C\u5E76\u8D1F\u8D23\u4E3B\u8981\u9700\u6C42\uFF0C\u534F\u8C03\u5F00\u53D1\u3001\u8BBE\u8BA1\u8D44\u6E90\uFF0C\u63A8\u52A8\u9879\u76EE\u8FDB\u5EA6\uFF0C\u4FDD\u8BC1\u4EA7\u54C1\u8D28\u91CF\uFF0C\u6253\u78E8\u7EC6\u8282\u4F53\u9A8C<br/>'+'2\u3001\u53C2\u4E0E\u8BA8\u8BBA\u53CA\u5236\u8BA2QQ\u90AE\u7BB1\u7684\u5404\u7248\u672C\u9700\u6C42\uFF0C\u6839\u636E\u884C\u4E1A\u70ED\u70B9\u53CA\u7528\u6237\u53CD\u9988\uFF0C\u63D0\u51FA\u6709\u6548\u7684\u4EA7\u54C1\u65B9\u6848<br/>'+'3\u3001\u8D1F\u8D23\u7248\u672C\u4E0A\u7EBF\u540E\u7684\u63A8\u5E7F\u5DE5\u4F5C\uFF0C\u901A\u8FC7\u5FAE\u535A\u3001\u535A\u5BA2\u548C\u8BBA\u575B\u7B49\u6E20\u9053\u5C06\u65B0\u529F\u80FD\u89E6\u8FBE\u7528\u6237<br/>'+'4\u3001\u8DDF\u8FDB\u7528\u6237\u53CD\u9988\u5E76\u5206\u6790\u6570\u636E\uFF0C\u6301\u7EED\u4F18\u5316\u5DF2\u6709\u529F\u80FD'}]},'project':{visible:true,data:[{name:'\u201C\u6700\u4EAE\u7684\u660E\u5929\u201D\u6696\u706F\u884C\u52A8',title:'\u9879\u76EE\u8D1F\u8D23\u4EBA',start:'2014.04',end:'2014.05',description:'1\u3001\u5F15\u5BFC\u7528\u6237\u5220\u9664\u65E7\u90AE\u4EF6\uFF0C\u91CA\u653E\u5B58\u50A8\u7A7A\u95F4\uFF0C\u5021\u5BFC\u8D44\u6E90\u8282\u7EA6\u548C\u5408\u7406\u5229\u7528\u3002\u5C06\u8282\u7EA6\u4E0B\u6765\u7684\u8FD0\u8425\u6210\u672C\u6295\u5165\u516C\u76CA\u9879\u76EE\uFF0C\u5E2E\u52A9\u8D2B\u56F0\u5C71\u533A\u7684\u6559\u5BA4\u6539\u5584\u7167\u660E\u73AF\u5883<br/>'+'2\u3001\u9879\u76EE\u4E0A\u7EBF\u671F\u95F4\uFF0C\u53C2\u4E0E\u7528\u6237\u8D85\u8FC7160\u4E07\uFF0C\u5220\u9664\u90AE\u4EF6\u603B\u91CF150T\uFF0C\u5F15\u53D1\u4E86\u793E\u4F1A\u70ED\u8BAE\uFF0C\u8BB8\u591A\u5A92\u4F53\u4EBA\u3001\u57FA\u91D1\u4EBA\u5BF9\u9879\u76EE\u521B\u610F\u7ED9\u4E88\u4E86\u9AD8\u5EA6\u7684\u80AF\u5B9A<br/>'+'3\u3001\u9879\u76EE\u83B7\u5F97\u817E\u8BAF\u5927\u5B66\u6C42\u662F\u676F\u201C\u817E\u8BAF\u6587\u5316\u5956\u201D\u91D1\u5956\u548C\u817E\u8BAF\u5927\u5B66\u521B\u65B0\u5927\u8D5B\u5FAE\u521B\u65B0\u5956'}]},'apply_intention':{visible:true,title:'\u4E92\u8054\u7F51\u4EA7\u54C1\u7ECF\u7406',work_place:'\u5E7F\u5DDE'},'ability':{visible:true,ability:'\u8BED\u8A00\u6280\u80FD\uFF1A\u82F1\u8BEDCET6\u3001\u7CA4\u8BED<br/>'+'\u4E13\u4E1A\u6280\u80FD\uFF1A\u719F\u6089Web\u3001iOS\u548CAndroid\u5F00\u53D1\uFF0C\u7CBE\u901A\u6570\u636E\u5E93\u3001C++\u53CAJava<br/>'+'\u529E\u516C\u6280\u80FD\uFF1A\u719F\u7EC3\u4F7F\u7528Office \u529E\u516C\u8F6F\u4EF6\u3001Axure RP\u3001Visio'},'awards':{"visible":true,"data":[{name:'\u817E\u8BAF\u5927\u5B66\u6C42\u662F\u676F\u201C\u817E\u8BAF\u6587\u5316\u5956\u201D\u91D1\u5956',time:'2014.08'},{name:'\u817E\u8BAF\u5927\u5B66\u521B\u65B0\u5927\u8D5B\u5FAE\u521B\u65B0\u5956',time:'2014.05'},{name:'\u817E\u8BAF\u5927\u5B66\u4E09\u597D\u5B66\u751F',time:'2005.10'}]},'self_evaluate':{visible:true,content:'\u70ED\u7231\u4E92\u8054\u7F51\u884C\u4E1A\uFF0C\u5173\u6CE8\u884C\u4E1A\u52A8\u6001<br/>'+'\u5B66\u4E60\u80FD\u529B\u5F3A\uFF0C\u5BF9\u65B0\u4E8B\u7269\u5145\u6EE1\u597D\u5947<br/>'+'\u5DE5\u4F5C\u6001\u5EA6\u8BA4\u771F\u8D1F\u8D23\uFF0C\u5177\u6709\u56E2\u961F\u5408\u4F5C\u7CBE\u795E'},'custom':{data:[{visible:true,title:'\u4EF7\u503C\u89C2',content:'\u6B63\u76F4\u3001\u8FDB\u53D6\u3001\u5408\u4F5C\u3001\u521B\u65B0'}]}}};
},getResume:function(c){
var d=this.toJSON();
return c?d['resume'][c]:d['resume'];
}};
});
});
$.package("resume/view/edit_public.js",[],function(){
var a=$.TE(['<div class="resume_createLink">','<div class="resume_createLink_cnt">','<input class="resume_ipt" type="text" readonly="readonly" id="url_input" value="$sUrl$">','<div class="resume_createLink_switch">','<span class="resume_createLink_switch_tip">\u9009\u62E9\u4F60\u8981\u516C\u5F00\u7684\u7B80\u5386\uFF1A</span>','<span class="resume_createLink_option">','<input class="resume_createLink_option_checkbox" type="checkbox" id="checkCn" name="public_type" $@$if($is_public$)$@$checked="checked"$@$endif$@$>','<label class="resume_createLink_option_label" for="checkCn">\u4E2D\u6587\u7B80\u5386</label>','</span>','<span class="resume_createLink_option">','<input class="resume_createLink_option_checkbox" type="checkbox" id="checkEn" name="public_type" $@$if($is_public_en$)$@$checked="checked"$@$endif$@$>','<label class="resume_createLink_option_label" for="checkEn">\u82F1\u6587\u7B80\u5386</label>','</span>','</div>','</div>','</div>']);
var b=$.TE(['<div class="resume_importLoading">','<div class="dialog_feedback">','<span class="dialog_icon ico_loading2"></span>','<div class="dialog_f_c">','<div>\u6B63\u5728\u751F\u6210\u94FE\u63A5...</div>','</div>','</div>','</div>']);
$.createCtrl('resume.view.editPublic',{sSuper:"resume.view"},function(c){
return {init_:function(){
this.superEx_(c,'init_',arguments);
this.setTpl({mainDialog:a,refreshDialog:b});
return this;
}};
});
});
$.package('resume/view/edit_rename.js',[],function(b){
var a={};
a.node=$.TE(['<a class="resume_switch" ck="changeResumeType"><span class="resume_switch_type">$@$if($resume_type$=="en")$@$\u82F1\u6587\u7B80\u5386$@$else$@$\u4E2D\u6587\u7B80\u5386$@$endif$@$</span><span class="resume_switch_triangle"></span></a>','<a class="resume_name$@$if($titleIsDefault$)$@$ resume_name_Default$@$endif$@$" href="javascript:;" ck="renameResume">','$@$if($titleIsDefault$)$@$','\uFF08\u7B80\u5386\u540D\u79F0\uFF09','$@$else$@$','$@$html($title$)$@$','$@$endif$@$','</a>']);
a.editRename=$.TE(['<div class="resume_mod_cnt qui_clear">','<div class="resume_txt resume_txt_Full">','<div class="resume_txt_cnt">','<input id="resume_name" class="resume_ipt resume_ipt_Full first_input" type="text" name="title"  value="$@$if(!$titleIsDefault$)$@$$@$html($title$)$@$$@$endif$@$" />','<span class="resume_txt_placeholder"$@$if($titleIsDefault$)$@$ style="display:block"$@$endif$@$>$titleGuideData$</span>','<span class="resume_txt_Err_tip"><span class="arrowDown"></span>\u7B80\u5386\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A</span>','</div>','</div>','</div>']);
$.createCtrl('resume.view.editRename',{sSuper:'resume.view'},function(c){
return {init_:function(d){
this.superEx_(c,'init_',arguments);
this.setTpl(a);
return this;
}};
});
});
$.package("resume/view/edit_send.js",[],function(){
var a=$.TE(['<p>\u9009\u62E9\u9644\u4EF6\u7C7B\u578B\uFF1Apdf \u683C\u5F0F</p>','<p>\u9644\u4EF6\u540D\uFF1A<input type="text" value="$attachname$" />']);
$.createCtrl('resume.view.editSend',{sSuper:"resume.view"},function(b){
return {init_:function(){
this.superEx_(b,'init_',arguments);
this.setTpl({selectAttachBox:a});
return this;
}};
});
});
$.package("resume/view/edit_works.js",[],function(){
var b=$.TE(['<div $@$if($status$=="error")$@$ck="retry"$@$endif$@$>','<div class="resume_collect_item_inner" href="javascript:;" ui-type="st:$status$">','<img class="ft_i_listItem_img ft_i_img" width="32" height="32" style="background-image:url($icon$)" src="$spacer_gif$" alt="" />','<div class="resume_collect_info">','<div class="qui_layoutRight qui_txtRight">','<a class="resume_collect_item_remove" ck="$removeMethod$"></a>','$@$if($status$=="error")$@$','<span class="resume_collect_item_errTip" title="$errmsg$">\u4E0A\u4F20\u5931\u8D25</span>','<span class="resume_collect_item_errOperation qui_cursorPointer" ck="retry">\u91CD\u8BD5</span>','$@$else if($status$=="uploading")$@$','$@$if(!$nSize$)$@$','<span class="resume_collect_item_status">\u6B63\u5728\u4E0A\u4F20\u4E2D</span>','$@$else if($uploadStep$=="signing")$@$','<span class="resume_collect_item_status">\u6B63\u5728\u626B\u63CF\u4E2D <span ui-type="signPercent">$signPercent$</span>%</span>','$@$else$@$','<div class="resume_collect_item_rate">','<span ui-type="speed">$speed$</span>','</div>','<div class="resume_collect_processWrap">','<div class="resume_collect_processBg"></div>','<div class="resume_collect_process" ui-type="percent" style="width:0%;"></div>','</div>','$@$endif$@$','$@$else if($status$=="stopped")$@$','$@$if($resumable$)$@$','<span class="resume_collect_item_errTip qui_cursorPointer" ck="resume">\u7EED\u4F20</span>','$@$else$@$','<span class="resume_collect_item_errTip qui_cursorPointer" ck="$removeMethod$">\u4E0A\u4F20\u5931\u8D25</span>','<span class="resume_collect_item_errOperation qui_cursorPointer" ck="$removeMethod$">\u8BF7\u5220\u9664</span>','$@$endif$@$','$@$else if($status$=="cancel")$@$','<span class="resume_collect_item_errTip">\u5220\u9664\u5931\u8D25</span>','<span class="resume_collect_item_errOperation qui_cursorPointer" ck="$removeMethod$">\u91CD\u8BD5</span>','$@$else if($status$=="ready")$@$','<span class="resume_collect_item_status">\u7B49\u5F85\u4E0A\u4F20</span>','$@$else$@$','$@$endif$@$','</div>','<span class="resume_collect_item_name">$filename$</span>','$@$if($nSize$)$@$<span class="resume_collect_item_size">$size$</span>$@$endif$@$','</div>','</div>','</div>']);
var c=$.TE(['<li class="resume_collect_item" ui-type="worksItem" ck="preview" mor="hoverPreviewClass" mot="leavePreviewClass">',b,'</li>']);
var a=$.TE(['<div class="resume_collect">','<div class="qui_dragArea" ui-type="resume_works_drag"></div>','<ul class="qui_clear resume_collect_cnt">','<li class="resume_collect_item" ui-type="uploadWorksBtn" style="position: relative;">','<div id="worksUploader" style="overflow:hidden;width:100%;height:100%;">','<div class="resume_collect_item_addWrap">','<a class="resume_collect_item_add" href="javascript:;"></a>','</div>','<div class="resume_collect_item_name resume_collect_item_name_Upload">\u4E0A\u4F20\u4F5C\u54C1</div>','</div>','</li>','</ul>','</div>']);
$.createCtrl('resume.view.works',{sSuper:"resume.view"},function(d){
return {init_:function(){
this.superEx_(d,'init_',arguments);
this.setTpl({editWordsItemBox:c,editWordsItem:b,editWordsBox:a});
return this;
}};
});
});
$.package('resume/view/layout.js',['resume/base/view.js'],function(){
var a={};
a.layout=$.TE(['<div class="txt_title">','</div>']);
a.loading=$.TE(['<div style="margin: 0 auto; padding: 310px; width: 80px; text-align:center;"><img src="$loading_gif$" /></div>']);
$.createCtrl('resume.view.layout',{sSuper:'resume.view'},function(b){
return {init_:function(c){
this.superEx_(b,'init_',arguments);
this.setTpl(a);
return this;
}};
});
});
$.package('resume/view/module_edit.js',[],function(b){
var a={};
a.editToolBar=$.TE(['<div class="resume_mod_foot">','<a id="js_confirm" class="qui_btn qui_btn_Blue resume_footBtn resume_footBtn_Save" href="javacript:;">\u4FDD\u5B58</a>','<a id="js_cancel" class="qui_btn resume_footBtn resume_footBtn_Cancel" href="javacript:;">\u53D6\u6D88</a>','</div>']);
a.baseinfo=$.TE(['<div class="resume_mod_cnt qui_clear module_edit_single">','<div class="resume_txtWrapLine">','<div class="resume_txt resume_txt_Space">','<div class="resume_txt_left">','<label class="resume_label">\u59D3\u540D</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt resume_ipt_MediumLong first_input" type="text" id="name" name="name" value="$name$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($nameIsDefault$)$@$ style="display:block"$@$endif$@$>$nameGuideData$</span>','</div>','</div>','<input name="sex" type="hidden" value="$sex$" tabindex="-1" autocomplete="off" />','<div class="resume_txt">','<div class="resume_txt_cnt resume_txt_cnt_NoLabel">','<a class="resume_ipt resume_ipt_Sel resume_ipt_Short" href="javascript:;" to="sex" select-type="sex" ck="showSelList" tabindex="-1">','<span class="resume_ipt_Sel_txt">$sex$</span>','<span class="resume_txt_placeholder"$@$if($sexIsDefault$)$@$ style="display:block"$@$endif$@$>$sexGuideData$</span>','<span class="resume_ipt_Sel_ico"></span>','</a>','</div>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">\u5E74\u9F84</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt" type="text" name="age"  value="$age$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($ageIsDefault$)$@$ style="display:block"$@$endif$@$>$ageGuideData$</span>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">\u6240\u5728\u57CE\u5E02</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt" type="text" name="city"  value="$city$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($cityIsDefault$)$@$ style="display:block"$@$endif$@$>$cityGuideData$</span>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">\u6700\u9AD8\u5B66\u5386</label>','</div>','<div class="resume_txt_cnt">','<a class="resume_ipt resume_ipt_Sel" href="javascript:;" to="highest_education" select-type="degree" ck="showSelList" tabindex="-1">','<span class="resume_ipt_Sel_txt">','$@$if(!$highest_education$ || $highest_education$=="\u5927\u4E13" || $highest_education$=="\u672C\u79D1" || $highest_education$=="\u7855\u58EB" || $highest_education$=="\u535A\u58EB")$@$','$highest_education$','$@$else$@$','\u5176\u4ED6','$@$endif$@$','</span>','<span class="resume_txt_placeholder"$@$if($highest_educationIsDefault$)$@$ style="display:block"$@$endif$@$>$highest_educationGuideData$</span>','<span class="resume_ipt_Sel_ico"></span>','</a>','</div>','</div>','<input class="resume_ipt resume_ipt_Other" style="display:','$@$if(!$highest_education$ || $highest_education$=="\u5927\u4E13" || $highest_education$=="\u672C\u79D1" || $highest_education$=="\u7855\u58EB" || $highest_education$=="\u535A\u58EB")$@$','none','$@$else$@$','','$@$endif$@$','" name="highest_education"  value="$highest_education$" autocomplete="off" />','<input name="work_seniority" type="hidden" value="$work_seniority$" tabindex="-1" autocomplete="off" />','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">\u5DE5\u4F5C\u5E74\u9650</label>','</div>','<div class="resume_txt_cnt">','<a class="resume_ipt resume_ipt_Sel" href="javascript:;" to="work_seniority" select-type="work_seniority" ck="showSelList" tabindex="-1">','<span class="resume_ipt_Sel_txt">$work_seniority$</span>','<span class="resume_txt_placeholder"$@$if($work_seniorityIsDefault$)$@$ style="display:block"$@$endif$@$>$work_seniorityGuideData$</span>','<span class="resume_ipt_Sel_ico"></span>','</a>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">\u624B\u673A</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt" type="text" id="mobile" name="mobile" value="$mobile$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($mobileIsDefault$)$@$ style="display:block"$@$endif$@$>$mobileGuideData$</span>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">\u90AE\u7BB1</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt" type="text" id="email" name="email" value="$email$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($emailIsDefault$)$@$ style="display:block"$@$endif$@$>$emailGuideData$</span>','</div>','</div>','</div>']);
a.educationItem=$.TE(['<div>','<div class="resume_mod_exp qui_clear module_edit_single resume_mod_exp_More">','<a class="resume_mod_removeExp" ck="removeExp" href="javascript:;" tabindex="-1"></a>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">\u5B66\u6821</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt first_input" type="text" name="school"  value="$school$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($schoolIsDefault$)$@$ style="display:block"$@$endif$@$>$schoolGuideData$</span>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">\u4E13\u4E1A</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt" type="text" name="major"  value="$major$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($majorIsDefault$)$@$ style="display:block"$@$endif$@$>$majorGuideData$</span>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">\u5B66\u5386</label>','</div>','<div class="resume_txt_cnt">','<a class="resume_ipt resume_ipt_Sel" href="javascript:;" to="degree" select-type="degree" ck="showSelList" tabindex="-1">','<span class="resume_ipt_Sel_txt">','$@$if(!$degree$ || $degree$=="\u5927\u4E13" || $degree$=="\u672C\u79D1" || $degree$=="\u7855\u58EB" || $degree$=="\u535A\u58EB")$@$','$degree$','$@$else$@$','\u5176\u4ED6','$@$endif$@$','</span>','<span class="resume_txt_placeholder"$@$if($degreeIsDefault$)$@$ style="display:block"$@$endif$@$>$degreeGuideData$</span>','<span class="resume_ipt_Sel_ico"></span>','</a>','</div>','</div>','<input class="resume_ipt resume_ipt_Other" style="display:','$@$if(!$degree$ || $degree$=="\u5927\u4E13" || $degree$=="\u672C\u79D1" || $degree$=="\u7855\u58EB" || $degree$=="\u535A\u58EB")$@$','none','$@$else$@$','','$@$endif$@$','" name="degree"  value="$degree$" autocomplete="off" />','<div class="resume_txtWrapLine resume_datePicker">','<div class="resume_txt resume_datePicker_item">','<div class="resume_txt_left">','<label class="resume_label">\u5728\u6821\u65F6\u95F4</label>','</div>','<div class="resume_txt_cnt" ck="showDatePicker">','<input class="resume_ipt resume_ipt_Medium" name="start" value="$start$" autocomplete="off" />','<span class="resume_txt_placeholder resume_text_placeholder_Other"$@$if($startIsDefault$)$@$ style="display:block"$@$endif$@$>$startGuideData$</span>','</div>','</div>','<div class="resume_datePicker_item resume_datePicker_item_Divider">','</div>','<div class="resume_txt resume_datePicker_item" $@$if($end$!="now")$@$ck="showDatePicker"$@$endif$@$>','<input class="resume_ipt resume_ipt_Medium" name="end"','$@$if($end$=="now")$@$disabled$@$endif$@$',' value="','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($endIsDefault$)$@$ style="display:block"$@$endif$@$>$@$if($endGuideData$=="now")$@$\u81F3\u4ECA$@$else$@$$endGuideData$$@$endif$@$</span>','</div>','<div class="resume_datePicker_item resume_datePicker_item_ToNow">','<input class="resume_datePicker_item_checkBox" type="checkbox" name="now" ck="checkNow" value="$end$" ','$@$if($end$=="now")$@$','checked="checked"','$@$endif$@$','autocomplete="off" tabindex="-1" />\u81F3\u4ECA','</div>','</div>','</div>','</div>']);
a.education=$.TE(['$@$for($data$)$@$',a.educationItem,'$@$endfor$@$']);
a.experienceItem=$.TE(['<div>','<div class="resume_mod_exp qui_clear module_edit_single resume_mod_exp_More">','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">\u516C\u53F8</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt first_input" type="text" name="company"  value="$company$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($companyIsDefault$)$@$ style="display:block"$@$endif$@$>$companyGuideData$</span>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">\u804C\u4F4D</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt" type="text" name="title"  value="$title$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($titleIsDefault$)$@$ style="display:block"$@$endif$@$>$titleGuideData$</span>','</div>','</div>','<div class="resume_txtWrapLine resume_datePicker">','<div class="resume_txt resume_datePicker_item">','<div class="resume_txt_left">','<label class="resume_label">\u5DE5\u4F5C\u65F6\u95F4</label>','</div>','<div class="resume_txt_cnt" ck="showDatePicker">','<input class="resume_ipt resume_ipt_Medium" name="start" value="$start$" autocomplete="off" />','<span class="resume_txt_placeholder resume_text_placeholder_Other"$@$if($startIsDefault$)$@$ style="display:block"$@$endif$@$>$startGuideData$</span>','</div>','</div>','<div class="resume_datePicker_item resume_datePicker_item_Divider">','</div>','<div class="resume_txt resume_datePicker_item" $@$if($end$!="now")$@$ck="showDatePicker"$@$endif$@$>','<input class="resume_ipt resume_ipt_Medium" name="end"','$@$if($end$=="now")$@$disabled$@$endif$@$',' value="','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($endIsDefault$)$@$ style="display:block"$@$endif$@$>$@$if($endGuideData$=="now")$@$\u81F3\u4ECA$@$else$@$$endGuideData$$@$endif$@$</span>','</div>','<div class="resume_datePicker_item resume_datePicker_item_ToNow">','<input class="resume_datePicker_item_checkBox" type="checkbox" name="now" ck="checkNow" value="$end$" ','$@$if($end$=="now")$@$','checked="checked"','$@$endif$@$','autocomplete="off" tabindex="-1" />\u81F3\u4ECA','</div>','</div>','<div class="resume_txt resume_txt_Area">','<div class="resume_txt_left">','<label class="resume_label">\u5DE5\u4F5C\u63CF\u8FF0</label>','</div>','<div class="resume_txt_cnt">','<textarea class="resume_ipt resume_ipt_Area" name="performance" style="height:170px;" min_width="170">$performance$</textarea>','<span class="resume_txt_placeholder"$@$if($performanceIsDefault$)$@$ style="display:block"$@$endif$@$>$performanceGuideData$</span>','<span class="resume_txt_Err_tip"><span class="arrowDown"></span>\u5B57\u6570\u8D85\u8FC7\u4E0A\u9650</span>','</div>','</div>','<a class="resume_mod_removeExp" ck="removeExp" href="javascript:;"  tabindex="-1"></a>','</div>','</div>']);
a.experience=$.TE(['$@$for($data$)$@$',a.experienceItem,'$@$endfor$@$']);
a.projectItem=$.TE(['<div>','<div class="resume_mod_exp qui_clear module_edit_single resume_mod_exp_More">','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">\u9879\u76EE</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt resume_ipt_Long first_input" type="text" name="name"  value="$name$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($nameIsDefault$)$@$ style="display:block"$@$endif$@$>$nameGuideData$</span>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">\u804C\u4F4D</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt" type="text" name="title" value="$title$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($titleIsDefault$)$@$ style="display:block"$@$endif$@$>$titleGuideData$</span>','</div>','</div>','<div class="resume_txtWrapLine resume_datePicker">','<div class="resume_txt resume_datePicker_item">','<div class="resume_txt_left">','<label class="resume_label">\u9879\u76EE\u65F6\u95F4</label>','</div>','<div class="resume_txt_cnt"  ck="showDatePicker">','<input class="resume_ipt resume_ipt_Medium" name="start" value="$start$" autocomplete="off" />','<span class="resume_txt_placeholder resume_text_placeholder_Other"$@$if($startIsDefault$)$@$ style="display:block"$@$endif$@$>$startGuideData$</span>','</div>','</div>','<div class="resume_datePicker_item resume_datePicker_item_Divider">','</div>','<div class="resume_txt resume_datePicker_item" $@$if($end$!="now")$@$ck="showDatePicker"$@$endif$@$>','<input class="resume_ipt resume_ipt_Medium" name="end"','$@$if($end$=="now")$@$disabled$@$endif$@$',' value="','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($endIsDefault$)$@$ style="display:block"$@$endif$@$>$@$if($endGuideData$=="now")$@$\u81F3\u4ECA$@$else$@$$endGuideData$$@$endif$@$</span>','</div>','<div class="resume_datePicker_item resume_datePicker_item_ToNow">','<input class="resume_datePicker_item_checkBox" type="checkbox" name="now" ck="checkNow" value="$end$" ','$@$if($end$=="now")$@$','checked="checked"','$@$endif$@$','autocomplete="off" tabindex="-1" />\u81F3\u4ECA','</div>','</div>','<div class="resume_txt resume_txt_Area">','<div class="resume_txt_left">','<label class="resume_label">\u9879\u76EE\u63CF\u8FF0</label>','</div>','<div class="resume_txt_cnt">','<textarea class="resume_ipt resume_ipt_Area" name="description" style="height:180px;" min_width="180">$description$</textarea>','<span class="resume_txt_placeholder"$@$if($descriptionIsDefault$)$@$ style="display:block"$@$endif$@$>$descriptionGuideData$</span>','<span class="resume_txt_Err_tip"><span class="arrowDown"></span>\u5B57\u6570\u8D85\u8FC7\u4E0A\u9650</span>','</div>','</div>','<a class="resume_mod_removeExp" ck="removeExp" href="javascript:;"  tabindex="-1"></a>','</div>','</div>']);
a.project=$.TE(['$@$for($data$)$@$',a.projectItem,'$@$endfor$@$']);
a.school_experienceItem=$.TE(['<div>','<div class="resume_mod_exp qui_clear module_edit_single resume_mod_exp_More">','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">\u7EC4\u7EC7</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt first_input" type="text" name="organization"  value="$organization$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($organizationIsDefault$)$@$ style="display:block"$@$endif$@$>$organizationGuideData$</span>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">\u804C\u4F4D</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt" type="text" name="job"  value="$job$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($jobIsDefault$)$@$ style="display:block"$@$endif$@$>$jobGuideData$</span>','</div>','</div>','<div class="resume_txtWrapLine resume_datePicker">','<div class="resume_txt resume_datePicker_item">','<div class="resume_txt_left">','<label class="resume_label">\u7ECF\u5386\u65F6\u95F4</label>','</div>','<div class="resume_txt_cnt"  ck="showDatePicker">','<input class="resume_ipt resume_ipt_Medium" name="start" value="$start$" autocomplete="off" />','<span class="resume_txt_placeholder resume_text_placeholder_Other"$@$if($startIsDefault$)$@$ style="display:block"$@$endif$@$>$startGuideData$</span>','</div>','</div>','<div class="resume_datePicker_item resume_datePicker_item_Divider">','</div>','<div class="resume_txt resume_datePicker_item" $@$if($end$!="now")$@$ck="showDatePicker"$@$endif$@$>','<input class="resume_ipt resume_ipt_Medium" name="end"','$@$if($end$=="now")$@$disabled$@$endif$@$',' value="','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($endIsDefault$)$@$ style="display:block"$@$endif$@$>$@$if($endGuideData$=="now")$@$\u81F3\u4ECA$@$else$@$$endGuideData$$@$endif$@$</span>','</div>','<div class="resume_datePicker_item resume_datePicker_item_ToNow">','<input class="resume_datePicker_item_checkBox" type="checkbox" name="now" ck="checkNow" value="$end$" ','$@$if($end$=="now")$@$','checked="checked"','$@$endif$@$','autocomplete="off" tabindex="-1" />\u81F3\u4ECA','</div>','</div>','<div class="resume_txt resume_txt_Area">','<div class="resume_txt_left">','<label class="resume_label">\u7ECF\u5386\u63CF\u8FF0</label>','</div>','<div class="resume_txt_cnt">','<textarea class="resume_ipt resume_ipt_Area" name="description" min_width="100" >$description$</textarea>','<span class="resume_txt_placeholder"$@$if($descriptionIsDefault$)$@$ style="display:block"$@$endif$@$>$descriptionGuideData$</span>','<span class="resume_txt_Err_tip"><span class="arrowDown"></span>\u5B57\u6570\u8D85\u8FC7\u4E0A\u9650</span>','</div>','</div>','<a class="resume_mod_removeExp" ck="removeExp" href="javascript:;"  tabindex="-1"></a>','</div>','</div>']);
a.school_experience=$.TE(['$@$for($data$)$@$',a.school_experienceItem,'$@$endfor$@$']);
a.awardsItem=$.TE(['<div>','<div class="resume_mod_exp qui_clear module_edit_single resume_mod_exp_More">','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">\u6240\u83B7\u5956\u9879</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt resume_ipt_Long first_input" type="text" name="name"  value="$name$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($nameIsDefault$)$@$ style="display:block"$@$endif$@$>$nameGuideData$</span>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">\u83B7\u5956\u65F6\u95F4</label>','</div>','<div class="resume_txt_cnt"  ck="showDatePicker">','<input class="resume_ipt resume_ipt_Long" name="time" value="$time$" tabindex="-1" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($timeIsDefault$)$@$ style="display:block"$@$endif$@$>$timeGuideData$</span>','</div>','</div>','<a class="resume_mod_removeExp" ck="removeExp" href="javascript:;" tabindex="-1"></a>','</div>','</div>']);
a.awards=$.TE(['$@$if($defaultVal$)$@$','$@$for($data$)$@$','$@$if($_idx_$<1)$@$',a.awardsItem,'$@$endif$@$','$@$endfor$@$','$@$else$@$','$@$for($data$)$@$',a.awardsItem,'$@$endfor$@$','$@$endif$@$']);
a.self_evaluate=$.TE(['<div class="resume_mod_cnt qui_clear module_edit_single">','<div class="resume_txt resume_txt_Full">','<div class="resume_txt_cnt">','<textarea class="resume_ipt resume_ipt_Full resume_ipt_Area resume_ipt_Area_High first_input" name="content" min_width="79" >$content$</textarea>','<span class="resume_txt_placeholder"$@$if($contentIsDefault$)$@$ style="display:block"$@$endif$@$>$contentGuideData$</span>','<span class="resume_txt_Err_tip"><span class="arrowDown"></span>\u5B57\u6570\u8D85\u8FC7\u4E0A\u9650</span>','</div>','</div>','</div>']);
a.apply_intention=$.TE(['<div class="resume_mod_cnt qui_clear module_edit_single">','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">\u671F\u671B\u804C\u4F4D</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt first_input" type="text" name="title"  value="$title$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($titleIsDefault$)$@$ style="display:block"$@$endif$@$>$titleGuideData$</span>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">\u671F\u671B\u5730\u70B9</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt" type="text" name="work_place"  value="$work_place$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($work_placeIsDefault$)$@$ style="display:block"$@$endif$@$>$work_placeGuideData$</span>','</div>','</div>','</div>']);
a.ability=$.TE(['<div>','<div class="resume_mod_exp qui_clear module_edit_single resume_mod_exp_More">','<a class="resume_mod_removeExp" ck="removeExp" href="javascript:;"  tabindex="-1"></a>','<div class="resume_txt resume_txt_Area resume_txt_Full">','<div class="resume_txt_cnt resume_txt_cnt_NoLabel">','<textarea class="resume_ipt resume_ipt_Full resume_ipt_Area resume_ipt_Area_High" name="ability" min_width="79" >$ability$</textarea>','<span class="resume_txt_placeholder"$@$if($abilityIsDefault$)$@$ style="display:block"$@$endif$@$>$abilityGuideData$</span>','<span class="resume_txt_Err_tip"><span class="arrowDown"></span>\u5B57\u6570\u8D85\u8FC7\u4E0A\u9650</span>','</div>','</div>','</div>','</div>']);
a.custom=$.TE(['<div class="resume_mod_exp resume_mod_exp_custom qui_clear module_edit_single">','<div class="resume_txt resume_txt_Long">','<div class="resume_txt_left">','<label class="resume_label">\u6A21\u5757\u6807\u9898</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt resume_ipt_Long first_input" type="text" name="title"  value="$title$" autocomplete="off" />','</div>','</div>','<input type="hidden" name="visible" value="$visible$" tabindex="-1" autocomplete="off" />','<input type="hidden" name="index" value="$index$"  tabindex="-1" autocomplete="off" />','<div class="resume_txt resume_txt_Area">','<div class="resume_txt_left">','<label class="resume_label">\u6A21\u5757\u5185\u5BB9</label>','</div>','<div class="resume_txt_cnt">','<textarea id="content" class="resume_ipt resume_ipt_Area" name="content" min_width="44" >$content$</textarea>','<span class="resume_txt_Err_tip"><span class="arrowDown"></span>\u5B57\u6570\u8D85\u8FC7\u4E0A\u9650</span>','</div>','</div>','</div>']);
$.createCtrl('resume.view.module_edit',{sSuper:'resume.view'},function(c){
return {init_:function(d){
this.superEx_(c,'init_',arguments);
this.setTpl(a);
return this;
}};
});
});
$.package('resume/view/module_edit_en.js',[],function(b){
var a={};
a.editToolBar=$.TE(['<div class="resume_mod_foot">','<a id="js_confirm" class="qui_btn qui_btn_Blue resume_footBtn resume_footBtn_Save" href="javacript:;">\u4FDD\u5B58</a>','<a id="js_cancel" class="qui_btn resume_footBtn resume_footBtn_Cancel" href="javacript:;">\u53D6\u6D88</a>','</div>']);
a.baseinfo=$.TE(['<div class="resume_mod_cnt qui_clear module_edit_single">','<div class="resume_txtWrapLine">','<div class="resume_txt resume_txt_Space">','<div class="resume_txt_left">','<label class="resume_label">Name</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt first_input" type="text" id="name" name="name" value="$name$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($nameIsDefault$)$@$ style="display:block"$@$endif$@$>$nameGuideData$</span>','</div>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">Address</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt" type="text" name="city"  value="$city$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($cityIsDefault$)$@$ style="display:block"$@$endif$@$>$cityGuideData$</span>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">Phone</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt" type="text" id="mobile" name="mobile" value="$mobile$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($mobileIsDefault$)$@$ style="display:block"$@$endif$@$>$mobileGuideData$</span>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">E-mail</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt" type="text" id="email" name="email" value="$email$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($emailIsDefault$)$@$ style="display:block"$@$endif$@$>$emailGuideData$</span>','</div>','</div>','</div>']);
a.educationItem=$.TE(['<div>','<div class="resume_mod_exp qui_clear module_edit_single resume_mod_exp_More">','<a class="resume_mod_removeExp" ck="removeExp" href="javascript:;" tabindex="-1"></a>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">College</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt first_input" type="text" name="school"  value="$school$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($schoolIsDefault$)$@$ style="display:block"$@$endif$@$>$schoolGuideData$</span>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">Major</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt" type="text" name="major"  value="$major$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($majorIsDefault$)$@$ style="display:block"$@$endif$@$>$majorGuideData$</span>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">Degree</label>','</div>','<div class="resume_txt_cnt">','<a class="resume_ipt resume_ipt_Sel" href="javascript:;" to="degree" select-type="degree" ck="showSelList" tabindex="-1">','<span class="resume_ipt_Sel_txt">','$@$if(!$degree$ || $degree$=="Bachelor" || $degree$=="Master" || $degree$=="Doctor")$@$','$degree$','$@$else$@$','other','$@$endif$@$','</span>','<span class="resume_txt_placeholder"$@$if($degreeIsDefault$)$@$ style="display:block"$@$endif$@$>$degreeGuideData$</span>','<span class="resume_ipt_Sel_ico"></span>','</a>','</div>','</div>','<input class="resume_ipt resume_ipt_Other" style="display:','$@$if(!$degree$ || $degree$=="Bachelor" || $degree$=="Master" || $degree$=="Doctor")$@$','none','$@$else$@$','','$@$endif$@$','" name="degree"  value="$degree$" autocomplete="off" />','<div class="resume_txtWrapLine resume_datePicker">','<div class="resume_txt resume_datePicker_item">','<div class="resume_txt_left">','<label class="resume_label">Date</label>','</div>','<div class="resume_txt_cnt" ck="showDatePicker">','<input class="resume_ipt resume_ipt_Medium" name="start" value="$start$" autocomplete="off" />','<span class="resume_txt_placeholder resume_text_placeholder_Other"$@$if($startIsDefault$)$@$ style="display:block"$@$endif$@$>$startGuideData$</span>','</div>','</div>','<div class="resume_datePicker_item resume_datePicker_item_Divider">','</div>','<div class="resume_txt resume_datePicker_item" $@$if($end$!="now")$@$ck="showDatePicker"$@$endif$@$>','<input class="resume_ipt resume_ipt_Medium" name="end"','$@$if($end$=="now")$@$disabled$@$endif$@$',' value="','$@$if($end$=="now")$@$Present$@$else$@$$end$$@$endif$@$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($endIsDefault$)$@$ style="display:block"$@$endif$@$>$@$if($endGuideData$=="now")$@$Present$@$else$@$$endGuideData$$@$endif$@$</span>','</div>','<div class="resume_datePicker_item resume_datePicker_item_ToNow">','<input class="resume_datePicker_item_checkBox" type="checkbox" name="now" ck="checkNow" value="$end$" ','$@$if($end$=="now")$@$','checked="checked"','$@$endif$@$','autocomplete="off" tabindex="-1" />Present','</div>','</div>','</div>','</div>']);
a.education=$.TE(['$@$for($data$)$@$',a.educationItem,'$@$endfor$@$']);
a.experienceItem=$.TE(['<div>','<div class="resume_mod_exp qui_clear module_edit_single resume_mod_exp_More">','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">Company</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt first_input" type="text" name="company"  value="$company$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($companyIsDefault$)$@$ style="display:block"$@$endif$@$>$companyGuideData$</span>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">Position</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt" type="text" name="title"  value="$title$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($titleIsDefault$)$@$ style="display:block"$@$endif$@$>$titleGuideData$</span>','</div>','</div>','<div class="resume_txtWrapLine resume_datePicker">','<div class="resume_txt resume_datePicker_item">','<div class="resume_txt_left">','<label class="resume_label">Date</label>','</div>','<div class="resume_txt_cnt" ck="showDatePicker">','<input class="resume_ipt resume_ipt_Medium" name="start" value="$start$" autocomplete="off" />','<span class="resume_txt_placeholder resume_text_placeholder_Other"$@$if($startIsDefault$)$@$ style="display:block"$@$endif$@$>$startGuideData$</span>','</div>','</div>','<div class="resume_datePicker_item resume_datePicker_item_Divider">','</div>','<div class="resume_txt resume_datePicker_item" $@$if($end$!="now")$@$ck="showDatePicker"$@$endif$@$>','<input class="resume_ipt resume_ipt_Medium" name="end"','$@$if($end$=="now")$@$disabled$@$endif$@$',' value="','$@$if($end$=="now")$@$Present$@$else$@$$end$$@$endif$@$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($endIsDefault$)$@$ style="display:block"$@$endif$@$>$@$if($endGuideData$=="now")$@$Present$@$else$@$$endGuideData$$@$endif$@$</span>','</div>','<div class="resume_datePicker_item resume_datePicker_item_ToNow">','<input class="resume_datePicker_item_checkBox" type="checkbox" name="now" ck="checkNow" value="$end$" ','$@$if($end$=="now")$@$','checked="checked"','$@$endif$@$','autocomplete="off" tabindex="-1" />Present','</div>','</div>','<div class="resume_txt resume_txt_Area">','<div class="resume_txt_left">','<label class="resume_label">Description</label>','</div>','<div class="resume_txt_cnt">','<textarea class="resume_ipt resume_ipt_Area" name="performance" style="height:180px;" min_width="180">$performance$</textarea>','<span class="resume_txt_placeholder"$@$if($performanceIsDefault$)$@$ style="display:block"$@$endif$@$>$performanceGuideData$</span>','<span class="resume_txt_Err_tip"><span class="arrowDown"></span>\u5B57\u6570\u8D85\u8FC7\u4E0A\u9650</span>','</div>','</div>','<a class="resume_mod_removeExp" ck="removeExp" href="javascript:;"  tabindex="-1"></a>','</div>','</div>']);
a.experience=$.TE(['$@$for($data$)$@$',a.experienceItem,'$@$endfor$@$']);
a.projectItem=$.TE(['<div>','<div class="resume_mod_exp qui_clear module_edit_single resume_mod_exp_More">','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">Project</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt resume_ipt_Long first_input" type="text" name="name"  value="$name$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($nameIsDefault$)$@$ style="display:block"$@$endif$@$>$nameGuideData$</span>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">Position</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt" type="text" name="title" value="$title$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($titleIsDefault$)$@$ style="display:block"$@$endif$@$>$titleGuideData$</span>','</div>','</div>','<div class="resume_txtWrapLine resume_datePicker">','<div class="resume_txt resume_datePicker_item">','<div class="resume_txt_left">','<label class="resume_label">Date </label>','</div>','<div class="resume_txt_cnt"  ck="showDatePicker">','<input class="resume_ipt resume_ipt_Medium" name="start" value="$start$" autocomplete="off" />','<span class="resume_txt_placeholder resume_text_placeholder_Other"$@$if($startIsDefault$)$@$ style="display:block"$@$endif$@$>$startGuideData$</span>','</div>','</div>','<div class="resume_datePicker_item resume_datePicker_item_Divider">','</div>','<div class="resume_txt resume_datePicker_item" $@$if($end$!="now")$@$ck="showDatePicker"$@$endif$@$>','<input class="resume_ipt resume_ipt_Medium" name="end"','$@$if($end$=="now")$@$disabled$@$endif$@$',' value="','$@$if($end$=="now")$@$Present$@$else$@$$end$$@$endif$@$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($endIsDefault$)$@$ style="display:block"$@$endif$@$>$@$if($endGuideData$=="now")$@$Present$@$else$@$$endGuideData$$@$endif$@$</span>','</div>','<div class="resume_datePicker_item resume_datePicker_item_ToNow">','<input class="resume_datePicker_item_checkBox" type="checkbox" name="now" ck="checkNow" value="$end$" ','$@$if($end$=="now")$@$','checked="checked"','$@$endif$@$','autocomplete="off" tabindex="-1" />Present','</div>','</div>','<div class="resume_txt resume_txt_Area">','<div class="resume_txt_left">','<label class="resume_label">Description</label>','</div>','<div class="resume_txt_cnt">','<textarea class="resume_ipt resume_ipt_Area" name="description" style="height:130px;" min_width="130">$description$</textarea>','<span class="resume_txt_placeholder"$@$if($descriptionIsDefault$)$@$ style="display:block"$@$endif$@$>$descriptionGuideData$</span>','<span class="resume_txt_Err_tip"><span class="arrowDown"></span>\u5B57\u6570\u8D85\u8FC7\u4E0A\u9650</span>','</div>','</div>','<a class="resume_mod_removeExp" ck="removeExp" href="javascript:;"  tabindex="-1"></a>','</div>','</div>']);
a.project=$.TE(['$@$for($data$)$@$',a.projectItem,'$@$endfor$@$']);
a.school_experienceItem=$.TE(['<div>','<div class="resume_mod_exp qui_clear module_edit_single resume_mod_exp_More">','<div class="resume_txt">','<div class="resume_txt_left resume_txt_left_Organization">','<label class="resume_label">Organization</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt first_input" type="text" name="organization"  value="$organization$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($organizationIsDefault$)$@$ style="display:block"$@$endif$@$>$organizationGuideData$</span>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">Position</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt" type="text" name="job" value="$job$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($jobIsDefault$)$@$ style="display:block"$@$endif$@$>$jobGuideData$</span>','</div>','</div>','<div class="resume_txtWrapLine resume_datePicker">','<div class="resume_txt resume_datePicker_item">','<div class="resume_txt_left">','<label class="resume_label">Date</label>','</div>','<div class="resume_txt_cnt"  ck="showDatePicker">','<input class="resume_ipt resume_ipt_Medium" name="start" value="$start$" autocomplete="off" />','<span class="resume_txt_placeholder resume_text_placeholder_Other"$@$if($startIsDefault$)$@$ style="display:block"$@$endif$@$>$startGuideData$</span>','</div>','</div>','<div class="resume_datePicker_item resume_datePicker_item_Divider">','</div>','<div class="resume_txt resume_datePicker_item" $@$if($end$!="now")$@$ck="showDatePicker"$@$endif$@$>','<input class="resume_ipt resume_ipt_Medium" name="end"','$@$if($end$=="now")$@$disabled$@$endif$@$',' value="','$@$if($end$=="now")$@$Present$@$else$@$$end$$@$endif$@$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($endIsDefault$)$@$ style="display:block"$@$endif$@$>$@$if($endGuideData$=="now")$@$Present$@$else$@$$endGuideData$$@$endif$@$</span>','</div>','<div class="resume_datePicker_item resume_datePicker_item_ToNow">','<input class="resume_datePicker_item_checkBox" type="checkbox" name="now" ck="checkNow" value="$end$" ','$@$if($end$=="now")$@$','checked="checked"','$@$endif$@$','autocomplete="off" tabindex="-1" />Present','</div>','</div>','<div class="resume_txt resume_txt_Area">','<div class="resume_txt_left">','<label class="resume_label">Description</label>','</div>','<div class="resume_txt_cnt">','<textarea class="resume_ipt resume_ipt_Area" name="description" min_width="100" >$description$</textarea>','<span class="resume_txt_placeholder"$@$if($descriptionIsDefault$)$@$ style="display:block"$@$endif$@$>$descriptionGuideData$</span>','<span class="resume_txt_Err_tip"><span class="arrowDown"></span>\u5B57\u6570\u8D85\u8FC7\u4E0A\u9650</span>','</div>','</div>','<a class="resume_mod_removeExp" ck="removeExp" href="javascript:;"  tabindex="-1"></a>','</div>','</div>']);
a.school_experience=$.TE(['$@$for($data$)$@$',a.school_experienceItem,'$@$endfor$@$']);
a.awardsItem=$.TE(['<div>','<div class="resume_mod_exp qui_clear module_edit_single resume_mod_exp_More">','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">Award</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt resume_ipt_Long first_input" type="text" name="name"  value="$name$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($nameIsDefault$)$@$ style="display:block"$@$endif$@$>$nameGuideData$</span>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">Date</label>','</div>','<div class="resume_txt_cnt"  ck="showDatePicker">','<input class="resume_ipt resume_ipt_Long" name="time" value="$time$" tabindex="-1" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($timeIsDefault$)$@$ style="display:block"$@$endif$@$>$timeGuideData$</span>','</div>','</div>','<a class="resume_mod_removeExp" ck="removeExp" href="javascript:;" tabindex="-1"></a>','</div>','</div>']);
a.awards=$.TE(['$@$if($defaultVal$)$@$','$@$for($data$)$@$','$@$if($_idx_$<1)$@$',a.awardsItem,'$@$endif$@$','$@$endfor$@$','$@$else$@$','$@$for($data$)$@$',a.awardsItem,'$@$endfor$@$','$@$endif$@$']);
a.self_evaluate=$.TE(['<div class="resume_mod_cnt qui_clear module_edit_single">','<div class="resume_txt resume_txt_Full">','<div class="resume_txt_cnt">','<textarea class="resume_ipt resume_ipt_Full resume_ipt_Area resume_ipt_Area_High first_input" name="content" min_width="79" >$content$</textarea>','<span class="resume_txt_placeholder"$@$if($contentIsDefault$)$@$ style="display:block"$@$endif$@$>$contentGuideData$</span>','<span class="resume_txt_Err_tip"><span class="arrowDown"></span>\u5B57\u6570\u8D85\u8FC7\u4E0A\u9650</span>','</div>','</div>','</div>']);
a.apply_intention=$.TE(['<div class="resume_mod_cnt qui_clear module_edit_single">','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">Position</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt first_input" type="text" name="title"  value="$title$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($titleIsDefault$)$@$ style="display:block"$@$endif$@$>$titleGuideData$</span>','</div>','</div>','<div class="resume_txt">','<div class="resume_txt_left">','<label class="resume_label">City</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt" type="text" name="work_place"  value="$work_place$" autocomplete="off" />','<span class="resume_txt_placeholder"$@$if($work_placeIsDefault$)$@$ style="display:block"$@$endif$@$>$work_placeGuideData$</span>','</div>','</div>','</div>']);
a.ability=$.TE(['<div>','<div class="resume_mod_exp qui_clear module_edit_single resume_mod_exp_More">','<a class="resume_mod_removeExp" ck="removeExp" href="javascript:;"  tabindex="-1"></a>','<div class="resume_txt resume_txt_Area resume_txt_Full">','<div class="resume_txt_cnt resume_txt_cnt_NoLabel">','<textarea class="resume_ipt resume_ipt_Full resume_ipt_Area resume_ipt_Area_High" name="ability" min_width="79" >$ability$</textarea>','<span class="resume_txt_placeholder"$@$if($abilityIsDefault$)$@$ style="display:block"$@$endif$@$>$abilityGuideData$</span>','<span class="resume_txt_Err_tip"><span class="arrowDown"></span>\u5B57\u6570\u8D85\u8FC7\u4E0A\u9650</span>','</div>','</div>','</div>','</div>']);
a.custom=$.TE(['<div class="resume_mod_exp resume_mod_exp_custom qui_clear module_edit_single">','<div class="resume_txt resume_txt_Long">','<div class="resume_txt_left">','<label class="resume_label">\u6A21\u5757\u6807\u9898</label>','</div>','<div class="resume_txt_cnt">','<input class="resume_ipt resume_ipt_Long first_input" type="text" name="title"  value="$title$" autocomplete="off" />','</div>','</div>','<input type="hidden" name="visible" value="$visible$" tabindex="-1" autocomplete="off" />','<input type="hidden" name="index" value="$index$"  tabindex="-1" autocomplete="off" />','<div class="resume_txt resume_txt_Area">','<div class="resume_txt_left">','<label class="resume_label">\u6A21\u5757\u5185\u5BB9</label>','</div>','<div class="resume_txt_cnt">','<textarea id="content" class="resume_ipt resume_ipt_Area" name="content" min_width="44" >$content$</textarea>','<span class="resume_txt_Err_tip"><span class="arrowDown"></span>\u5B57\u6570\u8D85\u8FC7\u4E0A\u9650</span>','</div>','</div>','</div>']);
$.createCtrl('resume.view.module_edit_en',{sSuper:'resume.view'},function(c){
return {init_:function(d){
this.superEx_(c,'init_',arguments);
this.setTpl(a);
return this;
}};
});
});
$.package('resume/view/module_skin_1.js',['resume/lib/utils.js'],function(f){
var o=$.isOS('mac')?' font-family: \'lucida Grande\', Verdana;':' font-family: \'lucida Grande\', Verdana, \'Microsoft YaHei\';';
var s={tmpl_wrapper:'802',tmpl_left:'padding: 0 14px 0 20px; background-color: #f5f5f5; color: #374760;',tmpl_leftWidth:'170',tmpl_left_top:'padding-top: 40px; line-height: 0;',tmpl_left_smallTop:'padding-top: 29px; line-height: 0;',tmpl_info:'',tmpl_infoImgWrap:'text-align: center;',tmpl_infoImg:'border: 1px solid #e1e1e1;',tmpl_infoImgDefault:'padding-top: 1px;',tmpl_infoImgBase_gap:'height: 13px;line-height: 13px;',tmpl_infoBase:'padding: 0 8px 4px;',tmpl_infoName:'text-align: center;font-size: 34px;font-weight: bold;color: #374760;',tmpl_infoName_gap:'height: 12px;line-height: 12px;',tmpl_leftList:'',tmpl_leftListItem_gap:'height: 5px;line-height: 5px;',tmpl_leftListImgWrap:'width: 14px;padding-top: 5px;',tmpl_leftListImg:'width: 14px;height: 14px;',tmpl_leftListText:'padding-left: 8px;',tmpl_leftList_gap:'height: 4px;line-height: 4px;',tmpl_leftGap:'padding: 9px 8px 9px 8px;line-height: 0;font-size: 1px;',tmpl_leftGap_line:'height: 0;border-top: 1px solid #e1e1e1;',tmpl_selfAssess:'padding: 3px 0px 4px;',tmpl_selfAssessText:'overflow: hidden;',tmpl_right:'padding: 15px 25px 45px 17px;',tmpl_rightWidth:'538',tmpl_mod_gap:'height: 18px;line-height: 18px;',tmpl_mod_headerWrap:'padding: 3px 8px 0;',tmpl_modCntWrap:'padding: 0 8px 4px;',tmpl_mod_header:'position: relative; padding-right: 32px; font-size: 16px;font-weight: bold;color: #374760;',tmpl_mod_header_gap:'height: 6px;line-height: 6px;',tmpl_mod_header_bigGap:'height: 9px;line-height: 9px;',tmpl_modCnt:'',tmpl_modCnt_gap:'height: 0px;line-height: 0x;',tmpl_modCnt_bigGap:'height: 7px;line-height: 7px;',tmpl_modCnt_title:'padding-bottom: 3px;font-weight: bold;',tmpl_modCnt_info:'color: #3b3b3b;',tmpl_modCnt_text:'',tmpl_modCnt_boldText:'font-weight: bold;',tmpl_modCnt_none:'',tmpl_modCnt_noneLine:'height: 17px;line-height: 17px;font-size: 1px;border-bottom: 1px solid #e6e6e6;',tmpl_modCnt_noneLine_First:'height: 15px;line-height: 15px;',tmpl_modCnt_noneLine_Last:'width: 261px;',tmpl_modCnt_noneLine_lastGap:'height: 3px;line-height: 3px;',tmpl_table:'background-color:#fff;color: #3b3b3b; border: 1px solid #dadada;',tmpl_tdFfFs:'font-size: 14px;line-height: 1.5;word-break: break-all; word-wrap: break-word; -webkit-font-smoothing: antialiased;'+o,tmpl_tdFfFsLh:'font-size: 14px;line-height: 1.5;word-break: break-all; word-wrap: break-word; -webkit-font-smoothing: antialiased;'+o,tmpl_gap:'font-size: 1px;'};
var q={tmpl_wrapper:'690',tmpl_left:'padding: 0 20px 0 26px;background-color: #f5f5f5;color: #374760;',tmpl_leftWidth:'158',tmpl_left_top:'padding-top: 43px; line-height: 0;',tmpl_left_smallTop:'padding-top: 29px; line-height: 0;',tmpl_info:'',tmpl_infoImg:'text-align: center;',tmpl_infoImgSelf:'border: 1px solid #e1e1e1;',tmpl_infoImgSelfDefault:'',tmpl_infoImgBase_gap:'height: 15px;line-height: 15px;',tmpl_infoBase:'padding: 0 8px 4px;',tmpl_infoName:'text-align: center;font-size: 34px;font-weight: bold;color: #374760;',tmpl_infoName_gap:'height: 15px;line-height: 15px;',tmpl_leftList:'',tmpl_leftListItem_gap:'height: 4px;line-height: 4px;',tmpl_leftListImgWrap:'width: 14px;padding-top: 5px;',tmpl_leftListImg:'width: 14px;height: 14px;',tmpl_leftListText:'padding-left: 14px;',tmpl_leftList_gap:'height: 4px;line-height: 4px;',tmpl_leftGap:'padding: 14px 8px 12px 8px;line-height: 0;font-size: 1px;',tmpl_leftGap_line:'height: 0;border-top: 1px solid #e1e1e1;',tmpl_selfAssess:'padding: 3px 0px 4px;',tmpl_selfAssessText:'overflow: hidden;',tmpl_right:'padding: 21px 0px 41px 17px;',tmpl_rightWidth:'453',tmpl_mod_gap:'height: 15px;line-height: 15px;',tmpl_mod_headerWrap:'padding: 3px 8px 5px;',tmpl_modCntWrap:'padding: 0 0 5px 8px;',tmpl_mod_header:'padding-right: 32px; font-size: 18px;font-weight: bold;color: #374760;',tmpl_mod_header_gap:'height: 0px;line-height: 0px;',tmpl_mod_header_bigGap:'height: 5px;line-height: 5px;',tmpl_modCnt:'',tmpl_modCnt_gap:'height: 0px;line-height: 0px;',tmpl_modCnt_bigGap:'height: 7px;line-height: 7px;',tmpl_modCnt_title:'padding-bottom: 7px;font-size: 15px;font-weight: bold;',tmpl_modCnt_smallBottomTitle:'padding-bottom: 4px;font-size: 15px;font-weight: bold;',tmpl_modCnt_info:'color: #3b3b3b;',tmpl_modCnt_text:'',tmpl_modCnt_boldText:'font-weight: bold;',tmpl_modCnt_none:'',tmpl_modCnt_noneLine:'height: 17px;line-height: 17px;font-size: 1px;border-bottom: 1px solid #e6e6e6;',tmpl_modCnt_noneLine_First:'height: 15px;line-height: 15px;',tmpl_modCnt_noneLine_Last:'width: 261px;',tmpl_modCnt_noneLine_lastGap:'height: 3px;line-height: 3px;',tmpl_table:'margin: 0 auto; background-color:#fff;color: #3b3b3b;',tmpl_tdFfFs:'font-size: 15px;line-height: 1.5;word-break: break-all; word-wrap: break-word;'+o,tmpl_tdFfFsLh:'font-size: 15px;line-height: 1.8;word-break: break-all; word-wrap: break-word;'+o,tmpl_gap:'font-size: 1px;'};
var c=$.lib('resume.utils').createTPL(s);
var a=$.lib('resume.utils').createTPL(q);
var d={};
var b={};
var p=['<table width="%tmpl_wrapper%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_table%" class="resume_tmpl resume_tmpl1">','<tbody>','<tr>','<td width="%tmpl_leftWidth%" valign="top" style="%tmpl_left%%tmpl_tdFfFsLh%" class="resume_tmpl1_left">','<div class="resume_modifyAvatarCtrl">$face$</div>','$baseinfo$','$self_evaluate$','</td>','<td id="resume_order_content" width="%tmpl_rightWidth%" valign="top" style="%tmpl_right%%tmpl_tdFfFsLh%" class="resume_tmpl1_right">','$apply_intention$','$education$','$school_experience$','$experience$','$project$','$awards$','$ability$','$custom$','</td>','</tr>','</tbody>','</table>'];
d.layout=c(p);
b.layout=a(p);
var l=['<div class="tmpl_ctrlDefaultShow">','<div class="tmpl_modCnt_none" style="%tmpl_modCnt_none%">','<div style="%tmpl_modCnt_noneLine%%tmpl_modCnt_noneLine_First%">&nbsp;</div>','<div style="%tmpl_modCnt_noneLine%">&nbsp;</div>','<div style="%tmpl_modCnt_noneLine%%tmpl_modCnt_noneLine_Last%">&nbsp;</div>','<div style="%tmpl_gap%%tmpl_modCnt_noneLine_lastGap%">&nbsp;</div>','</div>','</div>','<div class="tmpl_ctrlDefaultHide">','<div style="height: 55px; line-height: 55px;"><span style="display: block; line-height: 14px;"><img src="/zh_CN/htmledition/images/resume/template/ico_t1EditIcon_png8.png" alt="\u70B9\u51FB\u4FEE\u6539\u5185\u5BB9" style="float: left; margin-right: 5px;">\u70B9\u51FB\u4FEE\u6539\u5185\u5BB9</span></div>','</div>'];
d.empty_Info=c(l);
var n=['$@$if($visible$)$@$','<div style="%tmpl_gap%%tmpl_left_top%"><br /></div>','<div style="%tmpl_infoImgWrap%" ck="edit">','$@$if($avatar$)$@$','<img src="$avatar$" alt="\u7B80\u5386\u5934\u50CF" name="avatar.jpg" width="120" height="168" style="%tmpl_infoImg%" />','$@$else$@$','<img src="$images_path$resume/template/ico_t1AvatarDefault266ee1.png" name="ico_t1AvatarDefault.png" output="false" alt="\u7B80\u5386\u5934\u50CF" width="120" height="168" style="%tmpl_infoImgDefault% content: url($@$eval getTop().getResumeIconUrl("t1AvatarDefault") $@$); _content: url($images_path$resume/template/ico_t1AvatarDefault266ee1.png);" />','$@$endif$@$','<a class="resume_modifyAvatarWrap" output="false" hidefocus="" href="javascript:;">','<div class="resume_modifyAvatar">','<span class="resume_modifyAvatar_bg"></span>','<span class="resume_modifyAvatar_txt">\u4FEE\u6539\u5934\u50CF<span class="tmpl_mod_hiddenClick" ck="hideModule" mor="showFaceHideModeBtnUnderline" mot="hideFaceHideModeBtnUnderline">\u9690\u85CF</span></span>','</div>','</a>','</div>','<div class="tmpl_infoImgBase_gap" style="%tmpl_gap%%tmpl_infoImgBase_gap%">&nbsp;</div>','$@$else$@$','<div style="%tmpl_gap%%tmpl_left_smallTop%"><br /></div>','$@$endif$@$'];
d.face=c(n);
b.face=a(n);
var i=['<table width="%tmpl_leftWidth%" align="center" border="0" cellspacing="0" cellpadding="0" ck="edit">','<tbody>','<tr>','<td class="tmpl_infoBase $falseDataColor$" style="%tmpl_tdFfFsLh%%tmpl_infoBase%">','$@$if($isEmpty$)$@$','<div style="%tmpl_infoName%">\u59D3\u540D</div>','$@$else$@$','<div class="$falseDataColorDark$" style="%tmpl_infoName%">$name$</div>','$@$endif$@$','<div style="%tmpl_gap%%tmpl_infoName_gap%">&nbsp;</div>','<div style="%tmpl_leftList%">','$@$if($isEmpty$ || (!$isEmpty$ && ($age$ || $sex$ || $city$) ) )$@$','<table width="%tmpl_leftWidth%" align="center" border="0" cellspacing="0" cellpadding="0">','<tbody>','<tr>','<td valign="top" style="%tmpl_onlyImg%%tmpl_leftListImgWrap%">','<img name="ico_t1Account$imgVer$.png" src="$images_path$resume/template/ico_t1Account_png8204dc9.png" alt="\u5E74\u9F84\u6027\u522B" style="%tmpl_leftListImg% content: url($@$eval getTop().getResumeIconUrl("t1Account") $@$); _content: url($images_path$resume/template/ico_t1Account_png8204dc9.png);">','</td>','<td style="%tmpl_tdFfFsLh%%tmpl_leftListText%">','$@$if($isEmpty$)$@$','<div class="tmpl_ctrlDefaultShow" style="%tmpl_modCnt_noneLine%%tmpl_modCnt_noneLine_First%">&nbsp;</div>','$@$else$@$','$@$if($sex$)$@$$sex$&nbsp;&nbsp;$@$endif$@$','$@$if($age$)$@$$age$\u5C81&nbsp;&nbsp;$@$endif$@$','$@$if($city$)$@$$city$$@$endif$@$','$@$endif$@$','</td>','</tr>','</tbody>','</table>','$@$endif$@$','$@$if($isEmpty$ || (!$isEmpty$ && $highest_education$) )$@$','<div style="%tmpl_gap%%tmpl_leftListItem_gap%">&nbsp;</div>','<table width="%tmpl_leftWidth%" align="center" border="0" cellspacing="0" cellpadding="0">','<tbody>','<tr>','<td valign="top" style="%tmpl_onlyImg%%tmpl_leftListImgWrap%">','<img name="ico_t1Edu$imgVer$.png" src="$images_path$resume/template/ico_t1Edu_png8204dc9.png" alt="\u6700\u9AD8\u5B66\u5386" style="%tmpl_leftListImg% content: url($@$eval getTop().getResumeIconUrl("t1Edu") $@$); _content: url($images_path$resume/template/ico_t1Edu_png8204dc9.png);">','</td>','<td style="%tmpl_tdFfFsLh%%tmpl_leftListText%">','$@$if($isEmpty$)$@$','<div class="tmpl_ctrlDefaultShow" style="%tmpl_modCnt_noneLine%%tmpl_modCnt_noneLine_First%">&nbsp;</div>','$@$else$@$','$highest_education$$@$if($highest_education$ == "\u5927\u4E13" || $highest_education$ == "\u672C\u79D1" || $highest_education$ == "\u7855\u58EB" || $highest_education$ == "\u535A\u58EB")$@$$@$endif$@$','$@$endif$@$','</td>','</tr>','</tbody>','</table>','$@$endif$@$','$@$if($isEmpty$ || (!$isEmpty$ && $work_seniority$) )$@$','<div style="%tmpl_gap%%tmpl_leftListItem_gap%">&nbsp;</div>','<table width="%tmpl_leftWidth%" align="center" border="0" cellspacing="0" cellpadding="0">','<tbody>','<tr>','<td valign="top" style="%tmpl_onlyImg%%tmpl_leftListImgWrap%">','<img name="ico_t1Work$imgVer$.png" src="$images_path$resume/template/ico_t1Work_png8204dc9.png" alt="\u5DE5\u4F5C\u5E74\u9650" style="%tmpl_leftListImg%content: url($@$eval getTop().getResumeIconUrl("t1Work") $@$); _content: url($images_path$resume/template/ico_t1Work_png8204dc9.png);">','</td>','<td style="%tmpl_tdFfFsLh%%tmpl_leftListText%">','$@$if($isEmpty$)$@$','<div class="tmpl_ctrlDefaultShow" style="%tmpl_modCnt_noneLine%%tmpl_modCnt_noneLine_First%">&nbsp;</div>','$@$else$@$','$work_seniority$$@$if($work_seniority$ && $work_seniority$ != "\u5E94\u5C4A\u6BD5\u4E1A\u751F")$@$\u5DE5\u4F5C\u7ECF\u9A8C$@$endif$@$','$@$endif$@$','</td>','</tr>','</tbody>','</table>','$@$endif$@$','$@$if($isEmpty$ || (!$isEmpty$ && $mobile$) )$@$','<div style="%tmpl_gap%%tmpl_leftListItem_gap%">&nbsp;</div>','<table width="%tmpl_leftWidth%" align="center" border="0" cellspacing="0" cellpadding="0">','<tbody>','<tr>','<td valign="top" style="%tmpl_onlyImg%%tmpl_leftListImgWrap%">','<img name="ico_t1Tel$imgVer$.png" src="$images_path$resume/template/ico_t1Tel_png8204dc9.png" alt="\u624B\u673A" style="%tmpl_leftListImg% content: url($@$eval getTop().getResumeIconUrl("t1Tel") $@$); _content: url($images_path$resume/template/ico_t1Tel_png8204dc9.png);">','</td>','<td style="%tmpl_tdFfFsLh%%tmpl_leftListText%">','$@$if($isEmpty$)$@$','<div class="tmpl_ctrlDefaultShow" style="%tmpl_modCnt_noneLine%%tmpl_modCnt_noneLine_First%">&nbsp;</div>','$@$else$@$','$mobile$','$@$endif$@$','</td>','</tr>','</tbody>','</table>','$@$endif$@$','$@$if($isEmpty$ || (!$isEmpty$ && $email$) )$@$','<div style="%tmpl_gap%%tmpl_leftListItem_gap%">&nbsp;</div>','<table width="%tmpl_leftWidth%" align="center" border="0" cellspacing="0" cellpadding="0">','<tbody>','<tr>','<td valign="top" style="%tmpl_onlyImg%%tmpl_leftListImgWrap%_padding-top: 3px;">','<img name="ico_t1Email$imgVer$.png" src="$images_path$resume/template/ico_t1Email_png8204dc9.png" alt="\u90AE\u7BB1" style="%tmpl_leftListImg% content: url($@$eval getTop().getResumeIconUrl("t1Email") $@$); _content: url($images_path$resume/template/ico_t1Email_png8204dc9.png);">','</td>','<td style="%tmpl_tdFfFsLh%%tmpl_leftListText%">','$@$if($isEmpty$)$@$','<div class="tmpl_ctrlDefaultShow" style="%tmpl_modCnt_noneLine%%tmpl_modCnt_noneLine_First%">&nbsp;</div>','$@$else$@$','$email$','$@$endif$@$','</td>','</tr>','</tbody>','</table>','$@$endif$@$','</div></td>','</tr>','</tbody>','</table>'];
d.baseinfo=c(i);
b.baseinfo=a(i);
var u=['<table width="%tmpl_leftWidth%" align="center" border="0" cellspacing="0" cellpadding="0">','<tbody>','<tr>','<td style="%tmpl_leftGap%">','$@$if(!$isEmpty$)$@$','<div style="%tmpl_leftGap_line%">&nbsp;</div>','$@$endif$@$','</td>','</tr>','</tbody>','</table>','<div class="js_self_evaluate" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div ck="edit" class="js_hover">','<table width="%tmpl_leftWidth%" align="center" border="0" cellspacing="0" cellpadding="0">','<tbody>','<tr>','<td style="%tmpl_tdFfFsLh%%tmpl_selfAssess%">','<table width="%tmpl_leftWidth%" align="center" border="0" cellspacing="0" cellpadding="0">','<tbody>','<tr>','<td valign="top" style="%tmpl_onlyImg%%tmpl_leftListImgWrap%"><img name="ico_t1Assess$imgVer$.png" src="$images_path$resume/template/ico_t1Assess_png8204dc9.png" alt="\u81EA\u6211\u8BC4\u4EF7" style="%tmpl_leftListImg% content: url($@$eval getTop().getResumeIconUrl("t1Assess") $@$); _content: url($images_path$resume/template/ico_t1Assess_png8204dc9.png); vertical-align: -3px;"></td>','<td style="%tmpl_tdFfFsLh%%tmpl_leftListText%%tmpl_emptyText%position: relative;">\u81EA\u6211\u8BC4\u4EF7<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" style="right: 8px;" ck="hideModule" output="false">\u9690\u85CF</a></td>','</tr>','</tbody>','</table>','$@$if($isEmpty$)$@$','<div class="tmpl_ctrlDefaultShow" style="%tmpl_modCnt_noneLine%%tmpl_modCnt_noneLine_First%">&nbsp;</div>','<div class="tmpl_ctrlDefaultHide" style="%tmpl_modCnt_noneLine_First%">&nbsp;</div>','$@$else$@$','<div style="%tmpl_gap%%tmpl_leftListItem_gap%">&nbsp;</div>','<div class="tmpl_selfAssessText $falseDataColor$" style="%tmpl_selfAssessText% width: %tmpl_leftWidth%;">$content$</div>','$@$endif$@$','</td>','</tr>','</tbody>','</table>','</div>','</div>'];
d.self_evaluate=c(u);
b.self_evaluate=a(u);
var k=['<div class="js_education" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div style="%tmpl_gap%%tmpl_mod_gap%">&nbsp;</div>','<table width="%tmpl_rightWidth%" align="center" border="0" cellspacing="0" cellpadding="0" ck="edit" class="js_hover tmpl_mod">','<tbody>','<tr>','<td class="tmpl_mod_headerWrap" style="%tmpl_mod_headerWrap%%tmpl_tdFfFsLh%">','<div class="tmpl_mod_header" style="%tmpl_mod_header%">$moduleName$<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a></div>','</td>','</tr>','<tr>','<td class="tmpl_mod_header_gapWrap">','<div class="tmpl_mod_header_gap" style="%tmpl_gap%%tmpl_mod_header_gap%">&nbsp;</div>','</td>','</tr>','$@$if($isEmpty$)$@$','<tr>','<td class="tmpl_modCntWrap" style="%tmpl_modCntWrap%%tmpl_tdFfFsLh%">',d.empty_Info,'</td>','</tr>','$@$else$@$','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td class="tmpl_modCnt_gapWrap">','<div class="tmpl_modCnt_gap" style="%tmpl_gap%%tmpl_modCnt_gap%">&nbsp;</div>','</td>','</tr>','$@$endif$@$','<tr>','<td class="tmpl_modCntWrap $_root_.falseDataColor$" style="%tmpl_modCntWrap%%tmpl_tdFfFsLh%">','<div class="tmpl_modCnt" style="%tmpl_modCnt%" index="$_idx_$">','$@$if($start$ || $end$ )$@$','<span class="tmpl_modCnt_info $_root_.falseDataColor$" style="%tmpl_modCnt_info%">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</span>','$@$endif$@$','$@$if(($start$ || $end$) && ($school$ || $major$ || $degree$))$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if($school$ || $major$ || $degree$)$@$','<span class="tmpl_modCnt_text" style="%tmpl_modCnt_text%">','$@$if($school$)$@$$school$&nbsp;&nbsp;$@$endif$@$','$@$if($major$)$@$$major$&nbsp;&nbsp;$@$endif$@$','$degree$','</span>','$@$endif$@$','</div>','</td>','</tr>','$@$endfor$@$','$@$endif$@$','</tbody>','</table>','</div>'];
d.education=c(k);
b.education=a(k);
var g=['<div class="js_apply_intention" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div style="%tmpl_gap%%tmpl_mod_gap%">&nbsp;</div>','<table width="%tmpl_rightWidth%" align="center" border="0" cellspacing="0" cellpadding="0" ck="edit" class="js_hover tmpl_mod">','<tbody>','<tr>','<td class="tmpl_mod_headerWrap" style="%tmpl_mod_headerWrap%%tmpl_tdFfFsLh%">','<div class="tmpl_mod_header" style="%tmpl_mod_header%">$moduleName$<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a></div>','</td>','</tr>','<tr>','<td class="tmpl_mod_header_gapWrap">','<div class="tmpl_mod_header_gap" style="%tmpl_gap%%tmpl_mod_header_gap%">&nbsp;</div>','</td>','</tr>','$@$if($isEmpty$)$@$','<tr>','<td class="tmpl_modCntWrap" style="%tmpl_modCntWrap%%tmpl_tdFfFsLh%">',d.empty_Info,'</td>','</tr>','$@$else$@$','<tr>','<td class="tmpl_modCntWrap $falseDataColor$" style="%tmpl_modCntWrap%%tmpl_tdFfFsLh%">','<div class="tmpl_modCnt" style="%tmpl_modCnt%">','$@$if($title$)$@$$title$&nbsp;&nbsp;&nbsp;$@$endif$@$','$@$if($work_place$)$@$$work_place$$@$endif$@$','</div>','</td>','</tr>','$@$endif$@$','</tbody>','</table>','</div>'];
d.apply_intention=c(g);
b.apply_intention=a(g);
var m=['<div class="js_experience" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div style="%tmpl_gap%%tmpl_mod_gap%">&nbsp;</div>','<table width="%tmpl_rightWidth%" align="center" border="0" cellspacing="0" cellpadding="0" ck="edit" class="js_hover tmpl_mod">','<tbody>','<tr>','<td class="tmpl_mod_headerWrap" style="%tmpl_mod_headerWrap%%tmpl_tdFfFsLh%">','<div class="tmpl_mod_header" style="%tmpl_mod_header%">$moduleName$<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a></div>','</td>','</tr>','<tr>','<td class="tmpl_mod_header_gapWrap">','$@$if($_root_.dataLength$ > 1)$@$','<div class="tmpl_mod_header_bigGap" style="%tmpl_gap%%tmpl_mod_header_bigGap%">&nbsp;</div>','$@$else$@$','<div class="tmpl_mod_header_gap" style="%tmpl_gap%%tmpl_mod_header_gap%">&nbsp;</div>','$@$endif$@$','</td>','</tr>','$@$if($isEmpty$)$@$','<tr>','<td class="tmpl_modCntWrap" style="%tmpl_modCntWrap%%tmpl_tdFfFsLh%">',d.empty_Info,'</td>','</tr>','$@$else$@$','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td class="tmpl_modCnt_bigGapWrap">','<div class="tmpl_modCnt_bigGap" style="%tmpl_gap%%tmpl_modCnt_bigGap%">&nbsp;</div>','</td>','</tr>','$@$endif$@$','<tr>','<td class="tmpl_modCntWrap $_root_.falseDataColor$" style="%tmpl_modCntWrap%%tmpl_tdFfFs%">','<div class="tmpl_modCnt" style="%tmpl_modCnt%">','$@$if($start$ || $end$)$@$','<span class="tmpl_modCnt_info $_root_.falseDataColor$" style="%tmpl_modCnt_info%">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</span>','$@$endif$@$','$@$if(($start$ || $end$) && ($company$ || $title$))$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if($company$)$@$','<span class="tmpl_modCnt_title" style="%tmpl_modCnt_title%">$company$</span>','$@$endif$@$','$@$if($company$ && $title$)$@$','&nbsp;&nbsp;','$@$endif$@$','$@$if($title$)$@$','<span class="tmpl_modCnt_title" style="%tmpl_modCnt_title%">$title$</span>','$@$endif$@$','</div>','</td>','</tr>','$@$if($performance$)$@$','<tr>','<td class="tmpl_modCnt_gapWrap">','<div class="tmpl_modCnt_gap" style="%tmpl_gap%%tmpl_modCnt_gap%">&nbsp;</div>','</td>','</tr>','<tr>','<td class="tmpl_modCntWrap $_root_.falseDataColor$" style="%tmpl_modCntWrap%%tmpl_tdFfFsLh%">','<div class="tmpl_modCnt" style="%tmpl_modCnt%">','<div class="tmpl_modCnt_text" style="%tmpl_modCnt_text%">$performance$</div>','</div>','</td>','</tr>','$@$endif$@$','$@$endfor$@$','$@$endif$@$','</tbody>','</table>','</div>'];
d.experience=c(m);
b.experience=a(m);
var r=['<div class="js_project" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div style="%tmpl_gap%%tmpl_mod_gap%">&nbsp;</div>','<table width="%tmpl_rightWidth%" align="center" border="0" cellspacing="0" cellpadding="0" ck="edit" class="js_hover tmpl_mod">','<tbody>','<tr>','<td class="tmpl_mod_headerWrap" style="%tmpl_mod_headerWrap%%tmpl_tdFfFsLh%">','<div class="tmpl_mod_header" style="%tmpl_mod_header%">$moduleName$<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a></div>','</td>','</tr>','<tr>','<td class="tmpl_mod_header_gapWrap">','$@$if($_root_.dataLength$ > 1)$@$','<div class="tmpl_mod_header_bigGap" style="%tmpl_gap%%tmpl_mod_header_bigGap%">&nbsp;</div>','$@$else$@$','<div class="tmpl_mod_header_gap" style="%tmpl_gap%%tmpl_mod_header_gap%">&nbsp;</div>','$@$endif$@$','</td>','</tr>','$@$if($isEmpty$)$@$','<tr>','<td class="tmpl_modCntWrap" style="%tmpl_modCntWrap%%tmpl_tdFfFsLh%">',d.empty_Info,'</td>','</tr>','$@$else$@$','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td class="tmpl_modCnt_bigGapWrap">','<div class="tmpl_modCnt_bigGap" style="%tmpl_gap%%tmpl_modCnt_bigGap%">&nbsp;</div>','</td>','</tr>','$@$endif$@$','<tr>','<td class="tmpl_modCntWrap $_root_.falseDataColor$" style="%tmpl_modCntWrap%%tmpl_tdFfFs%">','<div class="tmpl_modCnt" style="%tmpl_modCnt%">','$@$if($start$ && $end$)$@$','<span class="tmpl_modCnt_info $_root_.falseDataColor$" style="%tmpl_modCnt_info%">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</span>','$@$endif$@$','$@$if(($start$ || $end$) && ($name$ || $title$))$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if($name$)$@$','<span class="tmpl_modCnt_title" style="%tmpl_modCnt_title%">$name$</span>','$@$endif$@$','$@$if($name$ && $title$)$@$','&nbsp;&nbsp;','$@$endif$@$','$@$if($title$)$@$','<span class="tmpl_modCnt_title" style="%tmpl_modCnt_title%">$title$</span>','$@$endif$@$','</div>','</td>','</tr>','$@$if($description$)$@$','<tr>','<td class="tmpl_modCnt_gapWrap">','<div class="tmpl_modCnt_gap" style="%tmpl_gap%%tmpl_modCnt_gap%">&nbsp;</div>','</td>','</tr>','<tr>','<td class="tmpl_modCntWrap $_root_.falseDataColor$" style="%tmpl_modCntWrap%%tmpl_tdFfFsLh%">','<div class="tmpl_modCnt" style="%tmpl_modCnt%">','<div class="tmpl_modCnt_text" style="%tmpl_modCnt_text%">$description$</div>','</div>','</td>','</tr>','$@$endif$@$','$@$endfor$@$','$@$endif$@$','</tbody>','</table>','</div>'];
d.project=c(r);
b.project=a(r);
var t=['<div class="js_school_experience" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div style="%tmpl_gap%%tmpl_mod_gap%">&nbsp;</div>','<table width="%tmpl_rightWidth%" align="center" border="0" cellspacing="0" cellpadding="0" ck="edit" class="js_hover tmpl_mod">','<tbody>','<tr>','<td class="tmpl_mod_headerWrap" style="%tmpl_mod_headerWrap%%tmpl_tdFfFsLh%">','<div class="tmpl_mod_header" style="%tmpl_mod_header%">$moduleName$<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a></div>','</td>','</tr>','<tr>','<td class="tmpl_mod_header_gapWrap">','$@$if($_root_.dataLength$ > 1)$@$','<div class="tmpl_mod_header_bigGap" style="%tmpl_gap%%tmpl_mod_header_bigGap%">&nbsp;</div>','$@$else$@$','<div class="tmpl_mod_header_gap" style="%tmpl_gap%%tmpl_mod_header_gap%">&nbsp;</div>','$@$endif$@$','</td>','</tr>','$@$if($isEmpty$)$@$','<tr>','<td class="tmpl_modCntWrap" style="%tmpl_modCntWrap%%tmpl_tdFfFsLh%">',d.empty_Info,'</td>','</tr>','$@$else$@$','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td class="tmpl_modCnt_bigGapWrap">','<div class="tmpl_modCnt_bigGap" style="%tmpl_gap%%tmpl_modCnt_bigGap%">&nbsp;</div>','</td>','</tr>','$@$endif$@$','<tr>','<td class="tmpl_modCntWrap $_root_.falseDataColor$" style="%tmpl_modCntWrap%%tmpl_tdFfFs%">','<div class="tmpl_modCnt" style="%tmpl_modCnt%">','$@$if($start$ || $end$)$@$','<span class="tmpl_modCnt_info $_root_.falseDataColor$" style="%tmpl_modCnt_info%">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</span>','$@$endif$@$','$@$if(($start$ || $end$) && ($organization$ || $job$))$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if($organization$)$@$','<span class="tmpl_modCnt_title" style="%tmpl_modCnt_title%">$organization$</span>','$@$endif$@$','$@$if($organization$ || $job$)$@$','&nbsp;&nbsp;','$@$endif$@$','$@$if($job$)$@$','<span class="tmpl_modCnt_title" style="%tmpl_modCnt_title%">$job$</span>','$@$endif$@$','</div>','$@$if($description$)$@$','<div class="tmpl_modCnt_gap" style="%tmpl_gap%%tmpl_modCnt_gap%">&nbsp;</div>','<div class="tmpl_modCnt" style="%tmpl_modCnt%">','<div class="tmpl_modCnt_text" style="%tmpl_modCnt_text%">$description$</div>','</div>','$@$endif$@$','</td>','</tr>','$@$endfor$@$','$@$endif$@$','</tbody>','</table>','</div>'];
d.school_experience=c(t);
b.school_experience=a(t);
var h=['<div class="js_awards" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div style="%tmpl_gap%%tmpl_mod_gap%">&nbsp;</div>','<table width="%tmpl_rightWidth%" align="center" border="0" cellspacing="0" cellpadding="0" ck="edit" class="js_hover tmpl_mod">','<tbody>','<tr>','<td class="tmpl_mod_headerWrap" style="%tmpl_mod_headerWrap%%tmpl_tdFfFsLh%">','<div class="tmpl_mod_header" style="%tmpl_mod_header%">$moduleName$<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a></div>','</td>','</tr>','<tr>','<td class="tmpl_mod_header_gapWrap">','<div class="tmpl_mod_header_gap" style="%tmpl_gap%%tmpl_mod_header_gap%">&nbsp;</div>','</td>','</tr>','$@$if($isEmpty$)$@$','<tr>','<td class="tmpl_modCntWrap" style="%tmpl_modCntWrap%%tmpl_tdFfFsLh%">',d.empty_Info,'</td>','</tr>','$@$else$@$','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td class="tmpl_modCnt_gapWrap">','<div class="tmpl_modCnt_gap" style="%tmpl_gap%%tmpl_modCnt_gap%">&nbsp;</div>','</td>','</tr>','$@$endif$@$','<tr>','<td class="tmpl_modCntWrap $_root_.falseDataColor$" style="%tmpl_modCntWrap%%tmpl_tdFfFs%">','<div class="tmpl_modCnt" style="%tmpl_modCnt%">','$@$if($time$)$@$','<span class="tmpl_modCnt_info $_root_.falseDataColor$" style="%tmpl_modCnt_info%">$time$</span>','$@$endif$@$','$@$if($time$ || $name$)$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if($name$)$@$','<span class="tmpl_modCnt_text" style="%tmpl_modCnt_text%">$name$</span>','$@$endif$@$','</div>','</td>','</tr>','$@$endfor$@$','$@$endif$@$','</tbody>','</table>','</div>'];
d.awards=c(h);
b.awards=a(h);
var e=['<div class="js_ability" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div style="%tmpl_gap%%tmpl_mod_gap%">&nbsp;</div>','<table width="%tmpl_rightWidth%" align="center" border="0" cellspacing="0" cellpadding="0" ck="edit" class="js_hover tmpl_mod">','<tbody>','<tr>','<td class="tmpl_mod_headerWrap" style="%tmpl_mod_headerWrap%%tmpl_tdFfFsLh%">','<div class="tmpl_mod_header" style="%tmpl_mod_header%">$moduleName$<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a></div>','</td>','</tr>','<tr>','<td class="tmpl_mod_header_gapWrap">','<div class="tmpl_mod_header_gap" style="%tmpl_gap%%tmpl_mod_header_gap%">&nbsp;</div>','</td>','</tr>','$@$if($isEmpty$)$@$','<tr>','<td class="tmpl_modCntWrap" style="%tmpl_modCntWrap%%tmpl_tdFfFsLh%">',d.empty_Info,'</td>','</tr>','$@$else$@$','<tr>','<td class="tmpl_modCntWrap $falseDataColor$" style="%tmpl_modCntWrap%%tmpl_tdFfFsLh%">','<div class="tmpl_modCnt" style="%tmpl_modCnt%" index="$_idx_$">','<span class="tmpl_modCnt_text" style="%tmpl_modCnt_text%">$ability$</span>','</div>','</td>','</tr>','$@$endif$@$','</tbody>','</table>','</div>'];
d.ability=c(e);
b.ability=a(e);
var j=['$@$for($data$)$@$','<div id="_custom_$_idx_$" class="js_custom">','<div>','<div style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div style="%tmpl_gap%%tmpl_mod_gap%">&nbsp;</div>','<table width="%tmpl_rightWidth%" align="center" border="0" cellspacing="0" cellpadding="0" ck="edit" index="$_idx_$" class="js_hover tmpl_mod">','<tbody>','<tr>','<td class="tmpl_mod_headerWrap" style="%tmpl_mod_headerWrap%%tmpl_tdFfFsLh%">','<div class="tmpl_mod_header" style="%tmpl_mod_header%">$title$<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a></div>','</td>','</tr>','<tr>','<td class="tmpl_mod_header_gapWrap">','<div class="tmpl_mod_header_gap" style="%tmpl_gap%%tmpl_mod_header_gap%">&nbsp;</div>','</td>','</tr>','<tr>','<td class="tmpl_modCntWrap" style="%tmpl_modCntWrap%%tmpl_tdFfFsLh%">','<div class="tmpl_modCnt" style="%tmpl_modCnt%">','<div class="tmpl_modCnt_text" style="%tmpl_modCnt_text%">$content$</div>','</div>','</td>','</tr>','</tbody>','</table>','</div>','</div>','</div>','$@$endfor$@$'];
d.custom=c(j);
b.custom=a(j);
$.createCtrl('resume.view.module_skin_1',{sSuper:'resume.view'},function(v){
return {init_:function(w){
this.superEx_(v,'init_',arguments);
this.setTpl(d);
return this;
},getPdfTPL:function(){
return b;
}};
});
});
$.package('resume/lib/module_skin_1_export.js',[],function(c){
var a=$.lib('resume.utils').createTPL({tmpl_infoImg:'border: 2px solid #dfdfdf;',tmpl_infoName:'margin: 10px 0px 0px 0px;font-size: 34px;color: #374760;text-align: center;',tmpl_infoNameGap:'margin: 0px 0px 4px 0px;',tmpl_mod_gap:'margin-bottom: 14px;',tmpl_mod_header:'margin-bottom:1px;font-size:18px;color: #374760;',tmpl_mod_bigHeader:'margin-bottom:6px;font-size:18px;color: #374760;',tmpl_mod_bodyGap:'margin-bottom: 1px;',tmpl_mod_cntGap:'margin-bottom: 4px;',tmpl_modCnt_title:'font-size:14px;line-height: 14px;color: #3b3b3b;',tmpl_modCnt_smallTitle:'margin-bottom:2px;font-size:14px;line-height: 14px;color: #3b3b3b;',tmpl_modCnt_info:'font-size: 14px;line-height: 14px;color: #3b3b3b;',tmpl_modCnt_text:'font-size: 14px;line-height: 1.2;color: #3b3b3b;',tmpl_gap:'font-size: 1px;'});
var b={};
b.layout=a(['<style>body{font-family: \'Microsoft YaHei\';font-size: 14px;}</style>','<table width="675" cellpadding="0" cellspacing="0" align="center">','<col width="210">','<col width="26">','<col width="413">','<col width="26">','<tr>','<td style="background-color: #f2f3f0;" valign="top" align="left">','<table width="210" border="0" bordercolor="#cccccc" cellpadding="0" cellspacing="0">','$face$','$baseinfo$','$self_evaluate$','</table>','</td>','<td valign="top"></td>','<td valign="top">','<div style="margin-top: 0px;font-size: 1px;"><br /></div>','<div>','<table width="413" border="0" cellpadding="0" cellspacing="0" align="center">','<tr>','<td id="resume_order_content">','$apply_intention$','$education$','$school_experience$','$experience$','$project$','$awards$','$ability$','$custom$','</td>','</tr>','</table>','</div>','<div style="margin-top: 37px;font-size: 1px;"><br /></div>','</td>','<td valign="top"></td>','</tr>','</table>']);
b.face=a(['$@$if($visible$ && $avatar$)$@$','<tr><td><div style="margin-top: 20px;font-size: 1px;"><br /></div></td></tr>','<tr>','<td>','<div style="text-align: center;">','<img src="$avatar$" alt="\u7B80\u5386\u5934\u50CF" name="avatar.jpg" width="125" height="175" style="%tmpl_infoImg%" />','</div>','</td>','</tr>','$@$else$@$','<tr><td><div style="margin-top: 0px;font-size: 1px;"><br /></div></td></tr>','$@$endif$@$']);
b.baseinfo=a(['<tr>','<td align="center">','<div class="tmpl_left_name" style="%tmpl_infoName%"><b>$name$</b></div>','</td>','</tr>','<tr>','<td>','<div style="%tmpl_gap%%tmpl_infoNameGap%"><br /></div>','</td>','</tr>','<tr>','<td>','<div style="%tmpl_gap%%tmpl_infoNameGap%"><br /></div>','</td>','</tr>','$@$if($isEmpty$ || $age$ || $sex$ || $city$)$@$','<tr><td><table width="210" border="0" cellpadding="0" cellspacing="0">','<col width="51">','<col width="14">','<col width="20">','<col width="105">','<col width="20">','<tr>','<td valign="top"></td>','<td height="25">','<div class="tmpl_left_tableImg" style="margin: 0px;"><img name="ico_t1Account$imgVer$.png" src="$images_path$resume/template/ico_t1Account.png" border="0" width="14" height="14" alt="\u5E74\u9F84\u6027\u522B" /></div>','</td>','<td valign="top"></td>','<td>','<div class="tmpl_left_tableText" style="color: #374760;">','$@$if($isEmpty$)$@$','\u5E74\u9F84\u6027\u522B','$@$else$@$','$@$if($sex$)$@$$sex$&nbsp;&nbsp;$@$endif$@$','$@$if($age$)$@$$age$\u5C81&nbsp;&nbsp;$@$endif$@$','$@$if($city$)$@$$city$$@$endif$@$','$@$endif$@$','</div>','</td>','<td valign="top"></td>','</tr>','$@$endif$@$','$@$if($isEmpty$ || $highest_education$)$@$','<tr>','<td valign="top"></td>','<td height="25">','<div class="tmpl_left_tableImg" style="margin: 0px;"><img name="ico_t1Edu$imgVer$.png" src="$images_path$resume/template/ico_t1Edu.png" border="0" width="14" height="14" alt="\u6700\u9AD8\u5B66\u5386" /></div>','</td>','<td valign="top"></td>','<td>','<div class="tmpl_left_tableText" style="color: #374760;">','$@$if($isEmpty$)$@$','\u6700\u9AD8\u5B66\u5386','$@$else$@$','$highest_education$$@$if($highest_education$ == "\u5927\u4E13" || $highest_education$ == "\u672C\u79D1" || $highest_education$ == "\u7855\u58EB" || $highest_education$ == "\u535A\u58EB")$@$$@$endif$@$','$@$endif$@$','</div>','</td>','<td valign="top"></td>','</tr>','$@$endif$@$','$@$if($isEmpty$ || $work_seniority$)$@$','<tr>','<td valign="top"></td>','<td height="25">','<div class="tmpl_left_tableImg" style="margin: 0px;"><img name="ico_t1Work$imgVer$.png" src="$images_path$resume/template/ico_t1Work.png" border="0" width="14" height="14" alt="\u5DE5\u4F5C\u5E74\u9650" /></div>','</td>','<td valign="top"></td>','<td>','<div class="tmpl_left_tableText" style="color: #374760;">','$@$if($isEmpty$)$@$','\u5DE5\u4F5C\u5E74\u9650','$@$else$@$','$@$if($work_seniority$ && $work_seniority$ != "\u5E94\u5C4A\u6BD5\u4E1A\u751F")$@$$@$endif$@$$work_seniority$\u5DE5\u4F5C\u7ECF\u9A8C','$@$endif$@$','</div>','</td>','<td valign="top"></td>','</tr>','$@$endif$@$','$@$if($isEmpty$ || $mobile$)$@$','<tr>','<td valign="top"></td>','<td height="25">','<div class="tmpl_left_tableImg" style="margin: 0px;"><img name="ico_t1Tel$imgVer$.png" src="$images_path$resume/template/ico_t1Tel.png" border="0" width="14" height="14"  alt="\u624B\u673A\u53F7\u7801" /></div>','</td>','<td valign="top"></td>','<td>','<div class="tmpl_left_tableText" style="color: #374760;">','$@$if($isEmpty$)$@$','\u624B\u673A','$@$else$@$','$mobile$','$@$endif$@$','</div>','</td>','<td valign="top"></td>','</tr>','$@$endif$@$','$@$if($isEmpty$ || $email$)$@$','<tr>','<td valign="top"></td>','<td align="center" height="25">','<div class="tmpl_left_tableImg" style="margin: 0px;"><img name="ico_t1Email$imgVer$.png" src="$images_path$resume/template/ico_t1Email.png" border="0" width="14" height="14" alt="\u90AE\u7BB1\u5730\u5740" /></div>','</td>','<td valign="top"></td>','<td>','<div class="tmpl_left_tableText" style="word-wrap: break-word;color: #374760;">','$@$if($isEmpty$)$@$','\u90AE\u7BB1','$@$else$@$','$email$','$@$endif$@$','</div>','</td>','<td valign="top"></td>','</tr>','$@$endif$@$','</table></td></tr>']);
b.self_evaluate=a(['$@$if(!$isEmpty$)$@$','<tr style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<td>','<div style="border-top: 1px solid #d1d1d2;margin: 5px 38px 10px;font-size: 1px;"><br /></div>','</td>','</tr>','<tr style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<td height="25">','<div class="tmpl_left_tableImg" style="margin: 0px 0px 0px 32px;color: #374760;"><img name="ico_t1Assess$imgVer$.png" src="$images_path$resume/template/ico_t1Assess.png" border="0" width="14" height="14" alt="\u81EA\u6211\u8BC4\u4EF7" />&nbsp;&nbsp;\u81EA\u6211\u8BC4\u4EF7</div>','</td>','</tr>','<tr style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<td>','<div style="margin: 0px 18px 0px 30px;color: #374760;line-height: 14px;">','$content$','</div>','</td>','</tr>','$@$endif$@$']);
b.education=a(['$@$if(!$isEmpty$)$@$','<div id="education" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="tmpl_mod">','<div class="tmpl_mod_gap" style="%tmpl_gap%%tmpl_mod_gap%"><br /></div>','<div class="tmpl_mod_header" style="%tmpl_mod_header%"><b>$moduleName$</b></div>','<div class="tmpl_mod_body">','$@$for($data$)$@$','<div class="tmpl_mod_cnt" style="%tmpl_mod_cntGap%">','$@$if($start$ || $end$)$@$','<span class="tmpl_modCnt_info" style="%tmpl_modCnt_info%">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</span>','$@$endif$@$','$@$if(($start$ || $end$) && ($school$ || $major$ || $degree$))$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if($school$ || $major$ || $degree$)$@$','<span class="tmpl_modCnt_text" style="%tmpl_modCnt_text%">','$@$if($school$)$@$$school$&nbsp;&nbsp;$@$endif$@$','$@$if($major$)$@$$major$&nbsp;&nbsp;$@$endif$@$','$degree$','</b>','$@$endif$@$','</div>','$@$endfor$@$','</div>','</div>','</div>','$@$endif$@$']);
b.apply_intention=a(['$@$if(!$isEmpty$)$@$','<div id="apply_intention" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="tmpl_mod_gap" style="%tmpl_gap%%tmpl_mod_gap%"><br /></div>','<div class="tmpl_mod">','<div class="tmpl_mod_header" style="%tmpl_mod_header%"><b>$moduleName$</b></div>','<div class="tmpl_mod_body">','<div class="tmpl_mod_cnt" style="%tmpl_mod_cntGap%">','<span class="tmpl_modCnt_text" style="tmpl_modCnt_text">','$@$if($title$)$@$$title$&nbsp;&nbsp;&nbsp;$@$endif$@$','$@$if($work_place$)$@$$work_place$$@$endif$@$','</span>','</div>','</div>','</div>','</div>','$@$endif$@$']);
b.experience=a(['$@$if(!$isEmpty$)$@$','<div id="experience" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="tmpl_mod_gap" style="%tmpl_gap%%tmpl_mod_gap%"><br /></div>','<div class="tmpl_mod">','$@$if($_idx_$ != ($_root_.dataLength$-1))$@$','<div class="tmpl_mod_bigHeader" style="%tmpl_mod_bigHeader%"><b>$moduleName$</b></div>','$@$else$@$','<div class="tmpl_mod_header" style="%tmpl_mod_header%"><b>$moduleName$</b></div>','$@$endif$@$','$@$for($data$)$@$','<div class="tmpl_mod_body">','$@$if($company$|| $title$ || $start$ || $end$ || $work_place$ || $work_nature$ || $report$ || $underling$ || $pay$)$@$','<div class="tmpl_mod_cnt" style="%tmpl_mod_cntGap%">','$@$if($start$ || $end$)$@$','<span class="tmpl_modCnt_info" style="%tmpl_modCnt_info%">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</span>','$@$endif$@$','$@$if(($start$ || $end$) && ($company$ || $title$))$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if($company$)$@$','<b class="tmpl_modCnt_title" style="%tmpl_modCnt_title%">$company$</b>','$@$endif$@$','$@$if($company$ && $title$)$@$','&nbsp;&nbsp;','$@$endif$@$','$@$if($title$)$@$','<b class="tmpl_modCnt_title" style="%tmpl_modCnt_title%">$title$</b>','$@$endif$@$','</div>','$@$endif$@$','$@$if($performance$)$@$','<div class="tmpl_mod_cnt" style="%tmpl_mod_cntGap%">','<div class="tmpl_modCnt_text" style="tmpl_modCnt_text">$performance$</div>','</div>','$@$endif$@$','</div>','$@$if($_idx_$ != $_root_.dataLength$ - 1)$@$','<div class="tmpl_mod_bodyGap" style="%tmpl_gap%%tmpl_mod_bodyGap%"><br /></div>','$@$endif$@$','$@$endfor$@$','</div>','</div>','$@$endif$@$']);
b.project=a(['$@$if(!$isEmpty$)$@$','<div id="project" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="tmpl_mod_gap" style="%tmpl_gap%%tmpl_mod_gap%"><br /></div>','<div class="tmpl_mod">','$@$if($_idx_$ != ($_root_.dataLength$-1))$@$','<div class="tmpl_mod_bigHeader" style="%tmpl_mod_bigHeader%"><b>$moduleName$</b></div>','$@$else$@$','<div class="tmpl_mod_header" style="%tmpl_mod_header%"><b>$moduleName$</b></div>','$@$endif$@$','$@$for($data$)$@$','<div class="tmpl_mod_body">','<div class="tmpl_mod_cnt" style="%tmpl_mod_cntGap%">','$@$if($start$ && $end$)$@$','<span class="tmpl_modCnt_info" style="%tmpl_modCnt_info%">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</span>','$@$endif$@$','$@$if(($start$ || $end$) && ($name$ || $title$))$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if($name$)$@$','<b class="tmpl_modCnt_title" style="%tmpl_modCnt_title%">$name$</b>','$@$endif$@$','$@$if($name$ && $title$)$@$','&nbsp;&nbsp;','$@$endif$@$','$@$if($title$)$@$','<b class="tmpl_modCnt_title" style="%tmpl_modCnt_title%">$title$</b>','$@$endif$@$','</div>','$@$if($description$)$@$','<div class="tmpl_mod_cnt" style="%tmpl_mod_cntGap%">','<div class="tmpl_modCnt_text" style="tmpl_modCnt_text">$description$</div>','</div>','$@$endif$@$','</div>','$@$if($_idx_$ != $_root_.dataLength$ - 1)$@$','<div class="tmpl_mod_bodyGap" style="%tmpl_gap%%tmpl_mod_bodyGap%"><br /></div>','$@$endif$@$','$@$endfor$@$','</div>','</div>','$@$endif$@$']);
b.school_experience=a(['$@$if(!$isEmpty$)$@$','<div id="school_experience" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="tmpl_mod_gap" style="%tmpl_gap%%tmpl_mod_gap%"><br /></div>','<div class="tmpl_mod">','$@$if($_idx_$ != ($_root_.dataLength$-1))$@$','<div class="tmpl_mod_bigHeader" style="%tmpl_mod_bigHeader%"><b>$moduleName$</b></div>','$@$else$@$','<div class="tmpl_mod_header" style="%tmpl_mod_header%"><b>$moduleName$</b></div>','$@$endif$@$','$@$for($data$)$@$','<div class="tmpl_mod_body">','$@$if($organization$ || $job$ || $start$ || $end$)$@$','<div class="tmpl_mod_cnt" style="%tmpl_mod_cntGap%">','$@$if($start$ || $end$)$@$','<span class="tmpl_modCnt_info" style="%tmpl_modCnt_info%">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</span>','$@$endif$@$','$@$if(($start$ || $end$) && ($organization$ || $job$))$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if($organization$ || $job$)$@$','<span class="tmpl_modCnt_title" style="%tmpl_modCnt_title%">','<b>$@$if($organization$)$@$$organization$&nbsp;&nbsp;$@$endif$@$$job$</b>','</span>','$@$endif$@$','</div>','$@$endif$@$','$@$if($description$)$@$','<div class="tmpl_mod_cnt" style="%tmpl_mod_cntGap%">','<div class="tmpl_modCnt_text" style="tmpl_modCnt_text">$description$</div>','</div>','$@$endif$@$','</div>','$@$if($_idx_$ != $_root_.dataLength$ - 1)$@$','<div class="tmpl_mod_bodyGap" style="%tmpl_gap%%tmpl_mod_bodyGap%"><br /></div>','$@$endif$@$','$@$endfor$@$','</div>','</div>','$@$endif$@$']);
b.awards=a(['$@$if(!$isEmpty$)$@$','<div id="awards" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="tmpl_mod_gap" style="%tmpl_gap%%tmpl_mod_gap%"><br /></div>','<div class="tmpl_mod">','<div class="tmpl_mod_header" style="%tmpl_mod_header%"><b>$moduleName$</b></div>','<div class="tmpl_mod_body">','$@$for($data$)$@$','$@$if($name$ || $time$)$@$','<div class="tmpl_mod_cnt" style="%tmpl_mod_cntGap%">','$@$if($time$)$@$','<span class="tmpl_modCnt_info" style="%tmpl_modCnt_info%">$time$</span>','$@$endif$@$','$@$if($time$ || $name$)$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if($name$)$@$','<span class="tmpl_modCnt_text" style="%tmpl_modCnt_text%">$name$</span>','$@$endif$@$','</div>','$@$endif$@$','$@$endfor$@$','</div>','</div>','</div>','$@$endif$@$']);
b.ability=a(['$@$if(!$isEmpty$)$@$','<div id="ability" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="tmpl_mod_gap" style="%tmpl_gap%%tmpl_mod_gap%"><br /></div>','<div class="tmpl_mod">','<div class="tmpl_mod_header" style="%tmpl_mod_header%"><b>$moduleName$</b></div>','<div class="tmpl_mod_body">','$@$if($ability$)$@$','<div class="tmpl_mod_cnt" style="%tmpl_mod_cntGap%">','<span class="tmpl_modCnt_text" style="tmpl_modCnt_text">$ability$</span>','</div>','$@$endif$@$','</div>','</div>','</div>','$@$endif$@$']);
b.custom=a(['$@$for($data$)$@$','$@$if($visible$)$@$','<div id="_custom_$_idx_$">','<div class="tmpl_mod_gap" style="%tmpl_gap%%tmpl_mod_gap%"><br /></div>','<div class="tmpl_mod">','<div class="tmpl_mod_header" style="%tmpl_mod_header%"><b>$title$</b></div>','<div class="tmpl_mod_body">','<div class="tmpl_mod_cnt" style="%tmpl_mod_cntGap%">','<div class="tmpl_modCnt_text" style="tmpl_modCnt_text">$content$</div>','</div>','</div>','</div>','</div>','$@$endif$@$','$@$endfor$@$']);
$.createCtrl('resume.view.module_skin_1_export',{sSuper:'resume.view'},function(d){
return {init_:function(e){
this.superEx_(d,'init_',arguments);
this.setTpl(b);
return this;
}};
});
});
$.package('resume/view/module_skin_2.js',['resume/lib/utils.js'],function(f){
var q=$.isOS('mac')?' font-family: \'lucida Grande\', Verdana;':' font-family: \'lucida Grande\', Verdana, \'Microsoft YaHei\';';
var u={tmpl_wrapper:'802',tmpl_content:'padding: 0 44px 60px;',tmpl_top:'height: 6px; background-color: #788396; font-size: 1px; line-height: 6px;',tmpl_infoRight:'padding: 35px 64px 0 0; text-align: center; line-height: 0;',tmpl_infoRightWidth:'180',tmpl_infoLeft:'padding: 61px 20px 4px 64px',tmpl_infoLeftWidth:'620',tmpl_infoImg:'width: 100px;height: 140px;border: 1px solid #e6e5e5;',tmpl_infoImg_Default:'padding-top: 1px;',tmpl_infoName:'padding: 7px 0 21px 7px; font-size: 30px;font-weight: bold;color: #374760; line-height: 1; word-break: break-all;'+q,tmpl_infoList:'padding: 0 0 7px 7px;',tmpl_infoListItem:'padding-right: 13px; word-break: break-all;',tmpl_infoListItem_title:'',tmpl_infoListItem_gap:'line-height: 4px; height: 4px;',tmpl_mod:'',tmpl_modWidth:'712',tmpl_mod_cntGap:'height: 5px; line-height: 5px;',tmpl_mod_header:'position: relative; padding: 27px 40px 9px 27px; font-size: 16px; font-weight: bold; color: #374760; line-height: 1;'+q,tmpl_mod_bigHeader:'position: relative; padding: 27px 40px 12px 27px; font-size: 16px; font-weight: bold; color: #374760; line-height: 1;'+q,tmpl_mod_single:'padding: 0 38px 22px 27px;',tmpl_mod_singleGap:'height: 7px; line-height: 7px;',tmpl_mod_cnt:'padding: 0 27px 0px;',tmpl_mod_single_item:'padding-bottom: 4px;',tmpl_mod_cnt_item:'padding-bottom: 6px;',tmpl_mod_cntAbility:'padding: 0 27px 12px',tmpl_modCnt_border:'border-bottom: 1px solid #efefef;',tmpl_modCnt_title:'font-size: 16px; font-weight: bold;',tmpl_modCnt_boldText:'font-weight: bold;',tmpl_modCnt_info:'color: #333;',tmpl_modCnt_separate:'color: #a7a7a7;',tmpl_mod_footGap:'height: 16px; line-height: 16px;',tmpl_table:'background-color:#fff; color: #333; table-layout: fixed; border: 1px solid #dadada;',tmpl_tdFfFs:'font-size: 14px; line-height: 21px; word-break: break-all; word-wrap: break-word; -webkit-font-smoothing: antialiased;'+q,tmpl_gap:'font-size: 1px;'};
var s={tmpl_wrapper:'725',tmpl_content:'padding: 0px 0px 60px;',tmpl_top:'display: none;',tmpl_infoRight:'padding: 31px 0px 0px 0px; text-align: center; line-height: 0;',tmpl_infoRightWidth:'100',tmpl_infoLeft:'padding: 36px 20px 0px 0px',tmpl_infoLeftWidth:'590',tmpl_infoImg:'width: 100px;height: 140px;border: 1px solid #e6e5e5;',tmpl_infoImg_Default:'',tmpl_infoName:'padding: 7px 0 22px 0px; font-size: 34px;font-weight: bold;color: #374760; line-height: 1;'+q,tmpl_infoList:'padding: 0 0 7px 0px;',tmpl_infoListItem:'padding-right: 12px; word-break: break-all;',tmpl_infoListItem_title:'padding-right: 6px;',tmpl_infoListItem_gap:'line-height: 6px; height: 6px;',tmpl_mod:'',tmpl_modWidth:'690',tmpl_mod_cntGap:'height: 5px; line-height: 5px;',tmpl_mod_header:'padding: 16px 0 11px 0px; font-size: 18px; font-weight: bold; color: #374760; line-height: 1;'+q,tmpl_mod_bigHeader:'padding: 16px 0 16px 0px; font-size: 18px; font-weight: bold; color: #374760; line-height: 1;'+q,tmpl_mod_single:'padding: 0 0 15px 0px;',tmpl_mod_singleGap:'height: 7px; line-height: 7px;',tmpl_mod_cnt:'padding: 0 0 3px;',tmpl_mod_single_item:'padding-bottom: 1px;',tmpl_mod_cnt_item:'padding-bottom: 3px;',tmpl_mod_cntAbility:'padding: 0 0px 12px',tmpl_modCnt_border:'',tmpl_modCnt_title:'font-size: 16px; font-weight: bold;',tmpl_modCnt_boldText:'font-weight: bold;',tmpl_modCnt_info:'color: #333;',tmpl_modCnt_separate:'color: #a7a7a7;',tmpl_mod_footGap:'height: 7px; line-height: 7px;',tmpl_table:'margin: 0 auto; background-color:#fff; color: #333; table-layout: fixed;',tmpl_tdFfFs:'font-size: 15px; line-height: 1.8; word-break: break-all; word-wrap: break-word;'+q,tmpl_gap:'font-size: 1px;'};
var c=$.lib('resume.utils').createTPL(u);
var a=$.lib('resume.utils').createTPL(s);
var d={};
var b={};
var r=['<table width="%tmpl_wrapper%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_table%" class="resume_tmpl2">','<tbody>','<tr><td><div style="%tmpl_top% width: %tmpl_infoLeftWidth%px;"></div></td><td width="180"><div style="%tmpl_top% width: %tmpl_infoRightWidth%px;"></div></td></tr>','<tr>','<td valign="top" style="%tmpl_infoLeft%">','$baseinfo$','</td>','<td valign="top" style="%tmpl_infoRight%" class="resume_modifyAvatarCtrl">','$face$','</td>','</tr>','<tr><td id="resume_order_content" colspan="2" style="%tmpl_content%">','$apply_intention$','$education$','$school_experience$','$experience$','$project$','$awards$','$ability$','$self_evaluate$','$custom$','</td></tr>','</tbody>','</table>'];
d.layout=c(r);
b.layout=a(r);
var n=['<tr class="tmpl_ctrlDefaultHide" output="false">','<td style="padding: 0 0 7px 27px; font-size: 12px; line-height: 1; color: #888;">','<div style="height: 48px; line-height: 48px;">','<span style="display: block; line-height: 14px;"><img name="ico_t2EditIcon$imgVer$.png" src="$images_path$resume/template/ico_t2EditIcon_png820552d.png" alt="\u70B9\u51FB\u4FEE\u6539\u5185\u5BB9" style="float: left; margin-right: 5px;" />\u70B9\u51FB\u4FEE\u6539\u5185\u5BB9</span>','</div>','</td>','</tr>'];
d.empty_line_hide=c(n);
var l=['<tr class="tmpl_ctrlDefaultShow">','<td style="padding: 0 0 7px 27px; font-size: 12px; line-height: 1; color: #888; ">','<div style="width: 680px; height: 11px; line-height: 11px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','<div style="width: 680px; height: 17px; line-height: 17px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','<div style="width: 340px; height: 17px; line-height: 17px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','</td>','</tr>',d.empty_line_hide];
d.empty_line=c(l);
var m=['<tr>','<td style="padding-left: 7px;">','<div class="tmpl_ctrlDefaultShow" style="font-size: 12px; line-height: 1; color: #888; ">','<div style="width: 340px; height: 5px; line-height: 5px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','<div style="width: 340px; height: 17px; line-height: 17px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','<div style="height: 7px; line-height: 7px; font-size: 1px;"></div>','</div>','<div class="tmpl_ctrlDefaultHide" style="font-size: 12px; line-height: 1; color: #888; " output="false">','<div style="height: 46px; line-height: 46px;">','<span style="display: block; line-height: 14px;"><img src="$images_path$resume/template/ico_t2EditIcon_png820552d.png" alt="\u70B9\u51FB\u4FEE\u6539\u5185\u5BB9" style="margin-right: 5px; vertical-align: -3px;" />\u70B9\u51FB\u4FEE\u6539\u5185\u5BB9</span>','</div>','<div style="height: 7px; line-height: 7px; font-size: 1px;"></div>','</div>','</td>','</tr>'];
d.empty_line_Base=c(m);
var p=['$@$if($visible$)$@$','<div ck="edit">','$@$if($avatar$)$@$','<img src="$avatar$" name="avatar.jpg" alt="\u7B80\u5386\u5934\u50CF" width="100" height="140" style="%tmpl_infoImg%" />','$@$else$@$','<div output="false">','<img src="$faceDefault$" name="ico_t2AvatarDefault.png" alt="\u7B80\u5386\u5934\u50CF" width="100" height="140" style="%tmpl_infoImg_Default% content: url($@$eval getTop().getResumeIconUrl("t2AvatarDefault") $@$); _content: url($images_path$resume/template/ico_t2AvatarDefault269d17.png);" />','</div>','$@$endif$@$','<a class="resume_modifyAvatarWrap" output="false" hidefocus="" href="javascript:;">','<div class="resume_modifyAvatar">','<span class="resume_modifyAvatar_bg"></span>','<span class="resume_modifyAvatar_txt">\u4FEE\u6539\u5934\u50CF<span class="tmpl_mod_hiddenClick" ck="hideModule" output="false" mor="showFaceHideModeBtnUnderline" mot="hideFaceHideModeBtnUnderline">\u9690\u85CF</span></span>','</div>','</a>','</div>','$@$endif$@$'];
d.face=c(p);
b.face=a(p);
var i=['<table width="544" border="0" cellspacing="0" cellpadding="0" ck="edit">','$@$if($isEmpty$ || (!$isEmpty$ && $name$) )$@$','<tr>','<td class="$falseDataColorDark$" colspan="3" style="%tmpl_infoName%">','$@$if($isEmpty$)$@$','\u59D3\u540D','$@$else$@$','$name$','$@$endif$@$','</td>','</tr>','$@$endif$@$','$@$if($isEmpty$)$@$','<tr class="tmpl_ctrlDefaultShow">','$@$else$@$','<tr>','$@$endif$@$','<td class="tmpl_infoList $falseDataColor$" valign="top" style="%tmpl_infoList%">','$@$if(!$isEmpty$)$@$','<div>','$@$if($sex$)$@$','<span style="%tmpl_infoListItem%%tmpl_tdFfFs%">','$sex$','</span>','$@$endif$@$','$@$if($age$)$@$','<span style="%tmpl_infoListItem%%tmpl_tdFfFs%">','$age$\u5C81','</span>','$@$endif$@$','$@$if($city$)$@$','<span style="%tmpl_infoListItem%%tmpl_tdFfFs%">','$city$','</span>','$@$endif$@$','$@$if(($sex$||$age$||$city$) && ($highest_education$ || $work_seniority$))$@$','<span class="$falseDataColor$" style="%tmpl_infoListItem%%tmpl_tdFfFs%%tmpl_modCnt_separate%font-family:simsun;">','|','</span>','$@$endif$@$','$@$if($highest_education$)$@$','<span style="%tmpl_infoListItem%%tmpl_tdFfFs%">','$highest_education$$@$if($highest_education$ == "\u5927\u4E13" || $highest_education$ == "\u672C\u79D1" || $highest_education$ == "\u7855\u58EB" || $highest_education$ == "\u535A\u58EB")$@$$@$endif$@$','</span>','$@$endif$@$','$@$if($work_seniority$)$@$','<span style="%tmpl_infoListItem%%tmpl_tdFfFs%">','$work_seniority$$@$if($work_seniority$ && $work_seniority$ != "\u5E94\u5C4A\u6BD5\u4E1A\u751F")$@$\u5DE5\u4F5C\u7ECF\u9A8C$@$endif$@$','</span>','$@$endif$@$','</div>','$@$if(($sex$ || $age$ || $work_seniority$ || $highest_education$) && ($mobile$||$email$))$@$','<div style="%tmpl_gap%%tmpl_infoListItem_gap%"></div>','$@$endif$@$','<div>','$@$if($mobile$)$@$','<span style="%tmpl_infoListItem%%tmpl_tdFfFs%">','$mobile$','</span>','$@$endif$@$','$@$if($email$)$@$','<span style="%tmpl_infoListItem%%tmpl_tdFfFs%">','$email$','</span>','$@$endif$@$','</div>','$@$endif$@$','</td>','</tr>','$@$if($isEmpty$)$@$',d.empty_line_Base,'$@$endif$@$','</table>'];
d.baseinfo=c(i);
b.baseinfo=a(i);
var k=['<div class="js_education" style="$@$if(!$isEmpty$)$@$%tmpl_modCnt_border%$@$endif$@$%tmpl_tdFfFs%display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0"  class="js_hover" ck="edit">','<tr>','<td class="tmpl_mod_header" colspan="2" style="%tmpl_mod_header%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>$moduleName$','</td>','</tr>','$@$if($isEmpty$)$@$',d.empty_line,'$@$else$@$','<tr>','<td class="tmpl_mod_single $falseDataColor$" style="%tmpl_mod_single%%tmpl_tdFfFs%">','<table border="0" cellspacing="0" cellpadding="0">','$@$for($data$)$@$','<tr index="$_idx_$">','$@$if($_idx_$ != ($_root_.dataLength$-1))$@$','<td class="tmpl_mod_single_item" style="%tmpl_mod_single_item%%tmpl_tdFfFs%">','$@$else$@$','<td style="%tmpl_tdFfFs%">','$@$endif$@$','$@$if($start$ || $end$ )$@$','<span class="tmpl_modCnt_info $_root_.falseDataColor$" style="%tmpl_modCnt_info%">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</span>','$@$endif$@$','$@$if(($start$ || $end$) && ($school$ || $major$ || $degree$) )$@$','&nbsp;&nbsp;','$@$endif$@$','$@$if($school$ || $major$ || $degree$)$@$','$school$$@$if($school$ && $major$)$@$&nbsp;&nbsp;$@$endif$@$$major$$@$if( ($school$ || $major$) && $degree$)$@$&nbsp;&nbsp;$@$endif$@$$degree$','$@$endif$@$','</td>','</tr>','$@$endfor$@$','</table>','</td>','</tr>','$@$endif$@$','</table>','</div>'];
d.education=c(k);
b.education=a(k);
var o=['<div class="js_experience" style="$@$if(!$isEmpty$)$@$%tmpl_modCnt_border%$@$endif$@$%tmpl_tdFfFs%display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" class="js_hover" ck="edit">','<tr>','$@$if($_root_.dataLength$ > 1)$@$','<td class="tmpl_mod_bigHeader" colspan="2" style="%tmpl_mod_bigHeader%">','$@$else$@$','<td class="tmpl_mod_header" colspan="2" style="%tmpl_mod_header%">','$@$endif$@$','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>$moduleName$','</td>','</tr>','$@$if($isEmpty$)$@$',d.empty_line,'$@$else$@$','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td><div class="tmpl_mod_cntGap" style="%tmpl_gap%%tmpl_mod_cntGap%"></div></td>','</tr>','$@$endif$@$','<tr index="$_idx_$">','<td class="tmpl_mod_cnt $_root_.falseDataColor$" style="%tmpl_mod_cnt%">','<table border="0" cellspacing="0" cellpadding="0">','$@$if($start$ || $end$ || $company$ || $title$)$@$','<tr>','<td class="tmpl_mod_cnt_item tmpl_modCnt_info $_root_.falseDataColor$" style="%tmpl_mod_cnt_item%%tmpl_modCnt_info%%tmpl_tdFfFs%" colspan="2">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','$@$if($start$ || $end$)$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if($company$ || $title$)$@$','<span style="%tmpl_modCnt_boldText%">$company$$@$if( $company$ )$@$&nbsp;&nbsp;$@$endif$@$$title$</span>','$@$endif$@$','</td>','</tr>','$@$endif$@$','$@$if( $performance$ )$@$','<tr>','<td class="tmpl_mod_cnt_item" style="%tmpl_mod_cnt_item%"><div style="%tmpl_tdFfFs%">$performance$</div></td>','</tr>','$@$endif$@$','</table>','</td>','</tr>','$@$endfor$@$','$@$endif$@$','<tr>','<td><div class="tmpl_mod_footGap" style="%tmpl_gap%%tmpl_gap%%tmpl_mod_footGap%"></div></td>','</tr>','</table>','</div>'];
d.experience=c(o);
b.experience=a(o);
var t=['<div class="js_project" style="$@$if(!$isEmpty$)$@$%tmpl_modCnt_border%$@$endif$@$%tmpl_tdFfFs%display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" class="js_hover" ck="edit">','<tr>','$@$if($_root_.dataLength$ > 1)$@$','<td class="tmpl_mod_bigHeader" colspan="2" style="%tmpl_mod_bigHeader%">','$@$else$@$','<td class="tmpl_mod_header" colspan="2" style="%tmpl_mod_header%">','$@$endif$@$','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>$moduleName$','</td>','</tr>','$@$if($isEmpty$)$@$',d.empty_line,'$@$else$@$','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td><div class="tmpl_mod_cntGap" style="%tmpl_gap%%tmpl_mod_cntGap%"></div></td>','</tr>','$@$endif$@$','<tr index="$_idx_$">','<td class="tmpl_mod_cnt $_root_.falseDataColor$" style="%tmpl_mod_cnt%">','<table border="0" cellspacing="0" cellpadding="0">','$@$if($start$ || $end$ || $name$ || $title$ )$@$','<tr>','<td class="tmpl_mod_cnt_item tmpl_modCnt_info $_root_.falseDataColor$" style="%tmpl_mod_cnt_item%%tmpl_modCnt_info%%tmpl_tdFfFs%" colspan="2">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','$@$if($start$ || $end$)$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if( $name$ || $title$ )$@$','<span style="%tmpl_modCnt_boldText%">','$@$if( $name$ )$@$$name$&nbsp;&nbsp;$@$endif$@$','$@$if( $title$ )$@$$title$$@$endif$@$','</span>','$@$endif$@$','</td>','</tr>','$@$endif$@$','$@$if( $description$ )$@$','<tr>','<td class="tmpl_mod_cnt_item" style="%tmpl_mod_cnt_item%"><div style="%tmpl_tdFfFs%">$description$</div></td>','</tr>','$@$endif$@$','</table>','</td>','</tr>','$@$endfor$@$','$@$endif$@$','<tr>','<td><div class="tmpl_mod_footGap" style="%tmpl_gap%%tmpl_mod_footGap%"></div></td>','</tr>','</table>','</div>'];
d.project=c(t);
b.project=a(t);
var v=['<div class="js_school_experience" style="$@$if(!$isEmpty$)$@$%tmpl_modCnt_border%$@$endif$@$%tmpl_tdFfFs%display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" class="js_hover" ck="edit">','<tr>','$@$if($_root_.dataLength$ > 1)$@$','<td class="tmpl_mod_bigHeader" colspan="2" style="%tmpl_mod_bigHeader%">','$@$else$@$','<td class="tmpl_mod_header" colspan="2" style="%tmpl_mod_header%">','$@$endif$@$','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>$moduleName$','</td>','</tr>','$@$if($isEmpty$)$@$',d.empty_line,'$@$else$@$','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td><div class="tmpl_mod_cntGap" style="%tmpl_gap%%tmpl_mod_cntGap%"></div></td>','</tr>','$@$endif$@$','<tr index="$_idx_$">','<td class="tmpl_mod_cnt $_root_.falseDataColor$" style="%tmpl_mod_cnt%">','<table border="0" cellspacing="0" cellpadding="0">','$@$if($start$ || $end$ || $organization$ || $job$ )$@$','<tr>','<td class="tmpl_mod_cnt_item tmpl_modCnt_info $_root_.falseDataColor$" style="%tmpl_mod_cnt_item%%tmpl_modCnt_info%%tmpl_tdFfFs%" colspan="2">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','$@$if($start$ || $end$)$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if( $organization$ || $job$ )$@$','<span style="%tmpl_modCnt_boldText%">$organization$$@$if( $job$ )$@$&nbsp;&nbsp;$@$endif$@$$job$</span>','$@$endif$@$','</td>','</tr>','$@$endif$@$','$@$if( $description$ )$@$','<tr>','<td class="tmpl_mod_cnt_item" style="%tmpl_mod_cnt_item%%tmpl_tdFfFs%">$description$</td>','</tr>','$@$endif$@$','</table>','</td>','</tr>','$@$endfor$@$','$@$endif$@$','<tr>','<td><div class="tmpl_mod_footGap" style="%tmpl_gap%%tmpl_mod_footGap%"></div></td>','</tr>','</table>','</div>'];
d.school_experience=c(v);
b.school_experience=a(v);
var h=['<div class="js_awards" style="$@$if(!$isEmpty$)$@$%tmpl_modCnt_border%$@$endif$@$%tmpl_tdFfFs%display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" class="js_hover" ck="edit">','<tr>','<td class="tmpl_mod_header" colspan="2" style="%tmpl_mod_header%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>$moduleName$','</td>','</tr>','$@$if($isEmpty$)$@$',d.empty_line,'$@$else$@$','<tr>','<td class="tmpl_mod_single $_root_.falseDataColor$" style="%tmpl_mod_single%%tmpl_tdFfFs%">','<table border="0" cellspacing="0" cellpadding="0">','$@$for($data$)$@$','<tr index="$_idx_$">','$@$if($_idx_$ != ($_root_.dataLength$-1))$@$','<td style="%tmpl_mod_single_item%%tmpl_tdFfFs%">','$@$else$@$','<td style="%tmpl_tdFfFs%">','$@$endif$@$','$@$if($time$)$@$','<span class="tmpl_modCnt_info $_root_.falseDataColor$" style="%tmpl_modCnt_info%">$time$</span>','$@$endif$@$','$@$if($time$ || $name$)$@$','&nbsp;&nbsp;','$@$endif$@$','$name$','</td>','</tr>','$@$endfor$@$','</table>','</td>','</tr>','$@$endif$@$','</table>','</div>'];
d.awards=c(h);
b.awards=a(h);
var w=['<div class="js_self_evaluate" style="$@$if(!$isEmpty$)$@$%tmpl_modCnt_border%$@$endif$@$%tmpl_tdFfFs%display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" class="js_hover" ck="edit">','<tr>','<td class="tmpl_mod_header" colspan="2" style="%tmpl_mod_header%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>$moduleName$','</td>','</tr>','$@$if($isEmpty$)$@$',d.empty_line,'$@$else$@$','<tr>','<td class="tmpl_mod_single $_root_.falseDataColor$" style="%tmpl_mod_single%%tmpl_tdFfFs%">','$content$','</td>','</tr>','$@$endif$@$','</table>','</div>'];
d.self_evaluate=c(w);
b.self_evaluate=a(w);
var g=['<div class="js_apply_intention" style="$@$if(!$isEmpty$)$@$%tmpl_modCnt_border%$@$endif$@$%tmpl_tdFfFs%display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" class="js_hover" ck="edit">','<tr>','<td class="tmpl_mod_header" colspan="2" style="%tmpl_mod_header%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>$moduleName$','</td>','</tr>','$@$if($isEmpty$)$@$',d.empty_line,'$@$else$@$','<tr>','<td class="tmpl_mod_single $falseDataColor$" style="%tmpl_mod_single%%tmpl_tdFfFs%">','$@$if( $title$ || $work_place$ || $expect_pay$)$@$','<div>','$@$endif$@$','$@$if($title$)$@$$title$&nbsp;&nbsp;$@$endif$@$','$work_place$','$@$if( $title$ || $work_place$ )$@$','</div>','$@$endif$@$','</td>','</tr>','$@$endif$@$','</table>','</div>'];
d.apply_intention=c(g);
b.apply_intention=a(g);
var e=['<div class="js_ability" style="$@$if(!$isEmpty$)$@$%tmpl_modCnt_border%$@$endif$@$%tmpl_tdFfFs%display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" class="js_hover" ck="edit">','<tr>','<td class="tmpl_mod_header" colspan="2" style="%tmpl_mod_header%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>$moduleName$','</td>','</tr>','$@$if($isEmpty$)$@$',d.empty_line,'$@$else$@$','<tr>','<td class="tmpl_mod_cntAbility $_root_.falseDataColor$" style="%tmpl_tdFfFs%%tmpl_mod_cntAbility%">','<div index="$_idx_$">$ability$</div>','</td>','</tr>','$@$endif$@$','</table>','</div>'];
d.ability=c(e);
b.ability=a(e);
var j=['$@$for($data$)$@$','<div id="_custom_$_idx_$" class="js_custom">','<div>','<div style="$@$if(!$isEmpty$)$@$%tmpl_modCnt_border%$@$endif$@$display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">',,'<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" class="js_hover" ck="edit" index="$_idx_$">','<tr>','<td class="tmpl_mod_header" colspan="2" style="%tmpl_mod_header%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>$title$','</td>','</tr>','<tr>','<td class="tmpl_mod_single" style="%tmpl_mod_single%%tmpl_tdFfFs%">','$content$','</td>','</tr>','</table>','</div>','</div>','</div>','$@$endfor$@$'];
d.custom=c(j);
b.custom=a(j);
$.createCtrl('resume.view.module_skin_2',{sSuper:'resume.view'},function(x){
return {init_:function(y){
this.superEx_(x,'init_',arguments);
this.setTpl(d);
return this;
},getPdfTPL:function(){
return b;
}};
});
});
$.package('resume/view/module_skin_2_export.js',['resume/lib/utils.js'],function(c){
var a=$.lib('resume.utils').createTPL({tmpl_infoRight:'margin: 0px 64px 0px 0px; text-align: center; line-height: 0;',tmpl_infoLeft:'margin: 0px 20px 0px 5px',tmpl_infoImg:'border: 2px solid #dfdfdf;',tmpl_infoName:'margin: 0px 0px 5px 0px; font-size: 34px;color: #374760; line-height: 32px;',tmpl_infoList:'margin: 0px 0px 7px 7px;',tmpl_infoListItem:'margin: 0px 10px 0px 0px; word-break: break-all;',tmpl_infoListItem_title:'margin: 0px 9px 0px 0px;',tmpl_infoListItem_gap:'margin: 0px 0px 1px;',tmpl_mod:'',tmpl_mod_cntGap:'margin: 0px 0px 7px 0px;',tmpl_mod_header:'margin: 20px 40px 2px 5px; font-size: 18px; color: #374760; line-height: 1;',tmpl_mod_bigHeader:'margin: 20px 40px 9px 5px; font-size: 18px; color: #374760; line-height: 1;',tmpl_mod_single:'margin: 0px 8px 15px 5px;',tmpl_mod_singleSmall:'margin: 0px 8px 0px 5px;',tmpl_mod_singleGap:'margin: 0px 0px 3px 0px;',tmpl_mod_single_item:'margin-bottom: 3px;',tmpl_mod_cnt:'margin: 0px 5px 3px;',tmpl_mod_cnt_item:'',tmpl_modCnt_title:'font-size: 16px;line-height: 15px;',tmpl_modCnt_info:'color: #333333;',tmpl_modCnt_separate:'color: #a7a7a7;',tmpl_tdFfFsTc:'font-size: 14px; line-height: 21px; word-break: break-all; color: #333333;',tmpl_tdFfFsTcSmallLineHeight:'font-size: 14px; line-height: 14px; word-break: break-all; color: #333333;',tmpl_gap:'font-size: 1px;'});
var b={};
b.layout=a(['<style>body {font-family: \'\u5FAE\u8F6F\u96C5\u9ED1\';font-size: 14px;}</style>','<table width="643" border="0" cellpadding="0" cellspacing="0" align="center">','<tr>','<td>','<table width="643" border="0" cellpadding="0" cellspacing="0" align="center">','<col width="521">','<col width="35">','<col width="117">','<tr>','<td valign="top">','$baseinfo$','</td>','<td valign="top">','</td>','<td>','$face$','</td>','</tr>','</table>','<div id="resume_order_content">','$apply_intention$','$education$','$school_experience$','$experience$','$project$','$awards$','$ability$','$self_evaluate$','$custom$','</div>','<div style="margin: 5px 0px 0px;font-size: 1px;"><br /></div>','</td>','</tr>','</table>']);
b.empty_info=a(['<tr>','<td>','</td>','<td>','<div class="tmpl_modCnt_none">','<div class="tmpl_emptyLineGap" style="margin: 13px 0px 0px;font-size:1px;"><br /></div>','<table width="545" border="0" cellpadding="0" cellspacing="0">','<tr>','<td bgcolor="e6e6e6"><div style="font-size: 1px;"><br /></div></td>','</tr>','</table>','<div class="tmpl_emptyLineGap" style="margin: 13px 0px 0px;font-size:1px;"><br /></div>','<table width="545" border="0" cellpadding="0" cellspacing="0">','<tr>','<td bgcolor="e6e6e6"><div style="font-size: 1px;"><br /></div></td>','</tr>','</table>','<div class="tmpl_emptyLineGap" style="margin: 13px 0px 0px;font-size:1px;"><br /></div>','<table width="270" border="0" cellpadding="0" cellspacing="0">','<tr>','<td bgcolor="e6e6e6"><div style="font-size: 1px;"><br /></div></td>','</tr>','</table>','<div class="tmpl_emptyLineGap" style="margin: 13px 0px 0px;font-size:1px;"><br /></div>','</div>','</td>','<td></td>','</tr>']);
b.empty_info2=a(['<tr>','<td>','</td>','<td>','<div class="tmpl_modCnt_none">','<div class="tmpl_emptyLineGap" style="margin: 13px 0px 0px;font-size:1px;"><br /></div>','<table width="545" border="0" cellpadding="0" cellspacing="0">','<tr>','<td bgcolor="e6e6e6"><div style="font-size: 1px;"><br /></div></td>','</tr>','</table>','<div class="tmpl_emptyLineGap" style="margin: 13px 0px 0px;font-size:1px;"><br /></div>','<table width="545" border="0" cellpadding="0" cellspacing="0">','<tr>','<td bgcolor="e6e6e6"><div style="font-size: 1px;"><br /></div></td>','</tr>','</table>','<div class="tmpl_emptyLineGap" style="margin: 13px 0px 0px;font-size:1px;"><br /></div>','<table width="270" border="0" cellpadding="0" cellspacing="0">','<tr>','<td bgcolor="e6e6e6"><div style="font-size: 1px;"><br /></div></td>','</tr>','</table>','<div class="tmpl_emptyLineGap" style="margin: 13px 0px 0px;font-size:1px;"><br /></div>','</div>','</td>','</tr>']);
b.baseinfo=a(['<div style="%tmpl_infoLeft%">','<table width="474" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','<div style="%tmpl_infoName%"><b>','$@$if($isEmpty$)$@$','\u59D3\u540D','$@$else$@$','$name$','$@$endif$@$','</b></div>','</td>','</tr>','<tr>','<td><div>','$@$if($sex$)$@$','<span>','$sex$&nbsp;&nbsp;&nbsp;','</span>','$@$endif$@$','$@$if($age$)$@$','<span>','$age$\u5C81&nbsp;&nbsp;&nbsp;','</span>','$@$endif$@$','$@$if($city$)$@$','<span>','$city$&nbsp;&nbsp;&nbsp;','</span>','$@$endif$@$','$@$if(($sex$||$age$||$city$) && ($highest_education$ || $work_seniority$))$@$','<span style="%tmpl_infoListItem%%tmpl_tdFfFsTc%%tmpl_modCnt_separate%font-family:simsun;">','|&nbsp;&nbsp;&nbsp;','</span>','$@$endif$@$','$@$if($highest_education$)$@$','<span>','$highest_education$$@$if($highest_education$ == "\u5927\u4E13" || $highest_education$ == "\u672C\u79D1" || $highest_education$ == "\u7855\u58EB" || $highest_education$ == "\u535A\u58EB")$@$$@$endif$@$&nbsp;&nbsp;&nbsp;','</span>','$@$endif$@$','$@$if($work_seniority$)$@$','<span>','$@$if($work_seniority$ && $work_seniority$ != "\u5E94\u5C4A\u6BD5\u4E1A\u751F")$@$$@$endif$@$$work_seniority$\u5DE5\u4F5C\u7ECF\u9A8C','</span>','$@$endif$@$','</div></td>','</tr>','$@$if(($sex$ || $age$ || $work_seniority$ || $highest_education$) && ($mobile$||$email$))$@$','<tr><td><div style="%tmpl_gap%%tmpl_infoListItem_gap%"><br /></div></td></tr>','$@$endif$@$','<tr>','<td><div>','$@$if($mobile$)$@$','<span>','$mobile$&nbsp;&nbsp;&nbsp;','</span>','$@$endif$@$','$@$if($email$)$@$','<span>','$email$','</span>','$@$endif$@$','</div></td>','</tr>','</table>','</div>']);
b.face=a(['<div style="%tmpl_infoRight%">','<table width="102" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','<div>','$@$if($visible$)$@$','$@$if($avatar$)$@$','<img name="avatar.jpg" src="$avatar$" width="100" height="140" alt="\u7B80\u5386\u5934\u50CF" style="%tmpl_infoImg%" />','$@$endif$@$','$@$endif$@$','</div>','</td>','</tr>','</table>','</div>']);
b.education=a(['<div id="education" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="643" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','<div style="%tmpl_mod_header%"><b>$moduleName$</b></div>','</td>','</tr>','$@$if($isEmpty$)$@$',b.empty_info,'$@$else$@$','<tr>','<td style="%tmpl_tdFfFsTc%">','<div style="%tmpl_mod_single%">','<table width="630" border="0" cellspacing="0" cellpadding="0">','$@$for($data$)$@$','<tr index="$_idx_$">','<td>','$@$if($_idx_$ != ($_root_.dataLength$-1))$@$','<div style="%tmpl_mod_single_item%%tmpl_tdFfFsTcSmallLineHeight%">','$@$else$@$','<div style="%tmpl_tdFfFsTcSmallLineHeight%">','$@$endif$@$','$@$if($start$ || $end$ )$@$','<span style="%tmpl_modCnt_info%">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</span>','$@$endif$@$','$@$if(($start$ || $end$) && ($school$ || $major$ || $degree$) )$@$','&nbsp;&nbsp;','$@$endif$@$','$@$if($school$ || $major$ || $degree$)$@$','$school$$@$if($school$ && $major$)$@$&nbsp;&nbsp;$@$endif$@$$major$$@$if( ($school$ || $major$) && $degree$)$@$&nbsp;&nbsp;$@$endif$@$$degree$','$@$endif$@$','</div>','</td>','</tr>','$@$endfor$@$','</table>','</div>','</td>','</tr>','$@$endif$@$','</table>','</div>']);
b.apply_intention=a(['<div id="apply_intention" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="643" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','<div style="%tmpl_mod_header%"><b>$moduleName$</b></div>','</td>','</tr>','$@$if($isEmpty$)$@$',b.empty_info2,'$@$else$@$','<tr>','<td style="%tmpl_tdFfFsTc%">','<div style="%tmpl_mod_single%">','<table width="630" border="0" cellspacing="0" cellpadding="0">','$@$if( $title$ || $work_place$ || $work_status$ )$@$','<tr><td style="%tmpl_tdFfFsTc%"><div>','$@$endif$@$','$@$if($title$)$@$$title$&nbsp;&nbsp;$@$endif$@$','$work_place$','$@$if( $title$ || $work_place$ )$@$','</div></td></tr>','$@$endif$@$','</table>','</div>','</td>','</tr>','$@$endif$@$','</table>','</div>']);
b.experience=a(['<div id="experience" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="643" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','$@$if($_root_.dataLength$ > 1)$@$','<div style="%tmpl_mod_bigHeader%"><b>$moduleName$</b></div>','$@$else$@$','<div style="%tmpl_mod_header%"><b>$moduleName$</b></div>','$@$endif$@$','</td>','</tr>','$@$if($isEmpty$)$@$',b.empty_info,'$@$else$@$','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td><div style="%tmpl_gap%%tmpl_mod_cntGap%"><br/ ></div></td>','</tr>','$@$endif$@$','<tr index="$_idx_$">','<td>','<div style="%tmpl_mod_cnt%">','<table width="633" border="0" cellspacing="0" cellpadding="0">','<col width="58">','<col width="575">','$@$if($start$ || $end$)$@$','<tr>','<td>','<div style="%tmpl_mod_cnt_shortItem%%tmpl_modCnt_info%%tmpl_tdFfFsTcSmallLineHeight%">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','$@$if($start$ || $end$)$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if($company$ || $title$)$@$','<b>$company$$@$if( $company$ )$@$&nbsp;&nbsp;$@$endif$@$$title$</b>','$@$endif$@$','</div>','</td>','</tr>','$@$endif$@$','$@$if( $performance$ )$@$','<tr>','<td><div style="%tmpl_mod_cnt_item%%tmpl_mod_cnt_right%%tmpl_tdFfFsTc%">$performance$</div></td>','</tr>','$@$endif$@$','</table>','</div>','</td>','</tr>','$@$endfor$@$','$@$endif$@$','</table>','</div>']);
b.project=a(['<div id="project" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="643" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','$@$if($_root_.dataLength$ > 1)$@$','<div style="%tmpl_mod_bigHeader%"><b>$moduleName$</b></div>','$@$else$@$','<div style="%tmpl_mod_header%"><b>$moduleName$</b></div>','$@$endif$@$','</td>','</tr>','$@$if($isEmpty$)$@$',b.empty_info,'$@$else$@$','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td><div style="%tmpl_gap%%tmpl_mod_cntGap%"><br /></div></td>','</tr>','$@$endif$@$','<tr index="$_idx_$">','<td>','<div style="%tmpl_mod_cnt%">','<table width="633" border="0" cellspacing="0" cellpadding="0">','<col width="58">','<col width="575">','$@$if($start$ || $end$)$@$','<tr>','<td>','<div style="%tmpl_mod_cnt_shortItem%%tmpl_modCnt_info%%tmpl_tdFfFsTcSmallLineHeight%">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','$@$if($start$ || $end$)$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if( $name$ || $title$ )$@$','<b>','$@$if( $name$ )$@$$name$&nbsp;&nbsp;$@$endif$@$','$@$if( $title$ )$@$$title$$@$endif$@$','</b>','$@$endif$@$','</div>','</td>','</tr>','$@$endif$@$','$@$if( $description$ )$@$','<tr>','<td><div style="%tmpl_mod_cnt_item%%tmpl_mod_cnt_right%%tmpl_tdFfFsTc%">$description$</div></td>','</tr>','$@$endif$@$','</table>','</div>','</td>','</tr>','$@$endfor$@$','$@$endif$@$','</table>','</div>']);
b.school_experience=a(['<div id="school_experience" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="643" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','$@$if($_root_.dataLength$ > 1)$@$','<div style="%tmpl_mod_bigHeader%"><b>$moduleName$</b></div>','$@$else$@$','<div style="%tmpl_mod_header%"><b>$moduleName$</b></div>','$@$endif$@$','</td>','</tr>','$@$if($isEmpty$)$@$',b.empty_info,'$@$else$@$','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td><div style="%tmpl_gap%%tmpl_mod_cntGap%"><br /></div></td>','</tr>','$@$endif$@$','<tr index="$_idx_$">','<td>','<div style="%tmpl_mod_cnt%">','<table width="633" border="0" cellspacing="0" cellpadding="0">','$@$if($start$ || $end$)$@$','<tr>','<td>','<div style="%tmpl_mod_cnt_shortItem%%tmpl_modCnt_info%%tmpl_tdFfFsTcSmallLineHeight%">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','$@$if($start$ || $end$)$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if( $organization$ || $job$ )$@$','<b>$organization$$@$if( $job$ )$@$&nbsp;&nbsp;$@$endif$@$$job$</b>','$@$endif$@$','</div>','</td>','</tr>','$@$endif$@$','$@$if( $description$ )$@$','<tr>','<td><div style="%tmpl_mod_cnt_item%%tmpl_tdFfFsTc%">$description$</div></td>','</tr>','$@$endif$@$','</table>','</div>','</td>','</tr>','$@$endfor$@$','$@$endif$@$','</table>','</div>']);
b.awards=a(['<div id="awards" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="643" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','<div style="%tmpl_mod_header%"><b>$moduleName$</b></div>','</td>','</tr>','$@$if($isEmpty$)$@$',b.empty_info,'$@$else$@$','<tr>','<td>','<div style="%tmpl_mod_single%">','<table width="630" border="0" cellspacing="0" cellpadding="0">','$@$for($data$)$@$','<tr index="$_idx_$">','<td>','$@$if($_idx_$ != ($_root_.dataLength$-1))$@$','<div style="%tmpl_mod_single_item%%tmpl_tdFfFsTcSmallLineHeight%">','$@$else$@$','<div style="%tmpl_tdFfFsTcSmallLineHeight%">','$@$endif$@$','$@$if($time$)$@$','<span style="%tmpl_modCnt_info%">$time$</span>','$@$endif$@$','$@$if($time$ || $name$)$@$','&nbsp;&nbsp;','$@$endif$@$','$name$','</div>','</td>','</tr>','$@$endfor$@$','</table>','</div>','</td>','</tr>','$@$endif$@$','</table>','</div>']);
b.ability=a(['<div id="ability" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="643" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','<div style="%tmpl_mod_header%"><b>$moduleName$</b></div>','</td>','</tr>','$@$if($isEmpty$)$@$',b.empty_info,'$@$else$@$','<tr>','<td>','<div style="%tmpl_tdFfFsTc%margin: 0px 5px 12px;">','<table width="633" border="0" cellpadding="0" cellspacing="0">','<tr><td>','<div style="%tmpl_tdFfFsTcSmallLineHeight%"><span>$ability$</div>','</td></tr>','$@$if($_idx_$ != ($_root_.dataLength$-1))$@$','<tr><td><div style="%tmpl_gap%margin: 0px 0px 2px 0px;"><br/ ></div></td></tr>','$@$endif$@$','</table>','</div>','</td>','</tr>','$@$endif$@$','</table>','</div>']);
b.self_evaluate=a(['<div id="self_evaluate" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="643" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','<div style="%tmpl_mod_header%"><b>$moduleName$</b></div>','</td>','</tr>','$@$if($isEmpty$)$@$',b.empty_info2,'$@$else$@$','<tr>','<td>','<div style="%tmpl_mod_singleSmall%%tmpl_tdFfFsTc%">$content$</div>','</td>','</tr>','$@$endif$@$','</table>','</div>']);
b.custom=a(['$@$for($data$)$@$','$@$if($visible$)$@$','<div id="_custom_$_idx_$">','<table width="643" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','<div style="%tmpl_mod_header%"><b>$title$</b></div>','</td>','</tr>','<tr>','<td>','<div style="%tmpl_mod_singleSmall%%tmpl_tdFfFsTc%">$content$</div>','</td>','</tr>','</table>','</div>','$@$endif$@$','$@$endfor$@$']);
$.createCtrl('resume.view.module_skin_2_export',{sSuper:'resume.view'},function(d){
return {init_:function(e){
this.superEx_(d,'init_',arguments);
this.setTpl(b);
return this;
}};
});
});
$.package('resume/view/module_skin_3.js',['resume/lib/utils.js'],function(f){
var n=$.isOS('mac')?' font-family: \'lucida Grande\', Verdana;':' font-family: \'lucida Grande\', Verdana, \'Microsoft YaHei\';';
var r={tmpl_wrapper:'802',tmpl_line:'height: 6px; background-color: #788396; font-size: 1px; line-height: 6px;',tmpl_infoRight:'padding: 35px 2px 20px 0px; text-align: center; line-height: 0;',tmpl_infoRightWidth:'181',tmpl_infoLeft:'padding: 66px 33px 21px 40px; color: #000; line-height: 1;',tmpl_infoLeftWidth:'620',tmpl_infoLeft_inner:'padding: 7px; ',tmpl_infoTitle:'',tmpl_infoImg:'width: 100px; height: 140px; border: 1px solid #e6e5e5;',tmpl_infoImg_Default:'padding-top: 1px;',tmpl_infoImg_None:'width: 100px; height: 100px; padding: 22px 0 18px; border: 1px solid #e6e5e5;',tmpl_infoName:'font-size: 34px; font-weight: bold; color: #374760; line-height: 1;',tmpl_infoNameGap:'height: 17px; line-height: 17px;',tmpl_infoGap:'height: 3px; line-height: 3px;',tmpl_content:'padding: 0 32px 30px;',tmpl_mod:'',tmpl_modWidth:'736',tmpl_modGap:'height: 6px; line-height: 6px;',tmpl_mod_inner:'',tmpl_mod_header:'position: relative; padding: 7px 40px 6px 8px; font-size: 16px; font-weight: bold; line-height: 1;'+n,tmpl_mod_header_ico:'width: 24px; height: 24px; vertical-align: -5px;',tmpl_mod_header_txt:'padding-left: 8px; color: #374760; ',tmpl_mod_line:' height: 1px; background-color: #e8e8e8; line-height: 1px; font-size: 1px;',tmpl_mod_lineWrap:' padding: 0 8px 8px;',tmpl_mod_lineWrap_Empty:' padding: 0 8px 5px;',tmpl_mod_cntWrap:'padding-left: 40px; ',tmpl_mod_cnt:' ',tmpl_mod_cntWidth:'685',tmpl_mod_singleCnt:'padding: 0 0 7px 40px; ',tmpl_mod_singleItem:'',tmpl_mod_singleItemGap:'height: 1px; line-height: 1px;',tmpl_mod_left:'',tmpl_mod_leftWidth:'151',tmpl_mod_leftSpacingWidth:'154',tmpl_mod_itemTitle:'padding: 0 0 0 4px;',tmpl_mod_data:' padding: 5px 0 0 18px; border-left: 3px solid #e8e8e8;',tmpl_mod_data_Last:' padding: 5px 0 0 21px;',tmpl_mod_data_Alone:'',tmpl_mod_bottom:'height: 11px; line-height: 11px;',tmpl_modCnt_wrap:'',tmpl_modCnt_wrapGap:'height: 8px; line-height: 8px;',tmpl_modCnt_title:'font-weight: bold;',tmpl_modCnt_title_Big:'font-weight: bold; font-size: 14px;',tmpl_modCnt_title_Special:'font-weight: bold;',tmpl_modCnt_info:'color: #3b3b3b;',tmpl_modCnt_text:'',tmpl_modCnt_timeline_bottom:'height: 16px; line-height: 16px;',tmpl_modCnt_timeline_bottomSmall:'height: 5px; line-height: 5px;',tmpl_modCnt_separate:'color: #bbb;',tmpl_table:'background-color: #fff; color: #3b3b3b; border: 1px solid #dadada; ',tmpl_tableFormat:'table-layout: fixed;',tmpl_tdFfFs:'font-size: 14px; line-height: 1.5; word-break: break-word; -webkit-font-smoothing: antialiased;'+n,tmpl_tdFfFsLh:'font-size: 14px; line-height: 1.5; word-break: break-word; -webkit-font-smoothing: antialiased;'+n,tmpl_gap:'font-size: 1px;',tmpl_modExtraPadding:'font-size: 0;line-height: 0;',experienceTopInfo:'font-weight: bold;',experienceBottomInfo:''};
var p={tmpl_wrapper:'690',tmpl_line:'',tmpl_infoRight:'padding: 3px 12px 20px 0px; text-align: center; line-height: 0;',tmpl_infoRightWidth:'110',tmpl_infoLeft:'padding: 31px 33px 0 10px; color: #000; line-height: 1;',tmpl_infoLeftWidth:'580',tmpl_infoLeft_inner:'padding: 7px; ',tmpl_infoTitle:'',tmpl_infoImg:'width: 100px; height: 140px; border: 1px solid #e6e5e5;',tmpl_infoImg_Default:'',tmpl_infoImg_None:'width: 100px; height: 100px; padding: 22px 0 18px; border: 1px solid #e6e5e5;',tmpl_infoName:'font-size: 34px; font-weight: bold; color: #374760; line-height: 1;',tmpl_infoNameGap:'height: 17px; line-height: 17px;',tmpl_infoGap:'height: 4px; line-height: 4px;',tmpl_content:'padding: 0 0 30px;',tmpl_mod:'',tmpl_modWidth:'690',tmpl_modGap:'height: 12px; line-height: 12px;',tmpl_mod_inner:'',tmpl_mod_header:'position: relative; padding: 13px 40px 6px 8px; font-size: 18px; font-weight: bold; line-height: 1;'+n,tmpl_mod_header_ico:'width: 26px; height: 26px; vertical-align: -7px;',tmpl_mod_header_txt:'padding-left: 8px; color: #374760; ',tmpl_mod_line:' height: 1px; background-color: #e8e8e8; line-height: 1px; font-size: 1px;',tmpl_mod_lineWrap:'padding: 0 8px 13px;',tmpl_mod_lineWrap_Empty:' padding: 0 8px 5px;',tmpl_mod_cntWrap:'padding-left: 40px; ',tmpl_mod_cnt:' ',tmpl_mod_cntWidth:'647',tmpl_mod_singleCnt:'padding: 0 0 7px 40px; ',tmpl_mod_singleItem:'',tmpl_mod_singleItemGap:'height: 7px; line-height: 7px;',tmpl_mod_left:'',tmpl_mod_leftWidth:'151',tmpl_mod_leftSpacingWidth:'154',tmpl_mod_itemTitle:'padding: 1px 0 3px 4px;',tmpl_mod_data:' padding: 11px 0 0 34px; border-left: 3px solid #e8e8e8;',tmpl_mod_data_Last:' padding: 11px 0 0 37px;',tmpl_mod_data_Alone:'',tmpl_mod_bottom:'height: 7px; line-height: 7px;',tmpl_modCnt_wrap:'',tmpl_modCnt_wrapGap:'height: 13px; line-height: 13px;',tmpl_modCnt_title:'font-weight: bold; font-size: 15px;margin-bottom:7px;',tmpl_modCnt_title_Big:'font-weight: bold; font-size: 15px;margin-bottom: 1px;',tmpl_modCnt_title_Special:'font-size: 15px; color: #777777;margin-bottom: 4px;',tmpl_modCnt_info:'color: #3b3b3b;',tmpl_modCnt_text:'font-size: 15px; line-height: 1.8;',tmpl_modCnt_timeline_bottom:'height: 16px; line-height: 16px;',tmpl_modCnt_timeline_bottomSmall:'height: 2px; line-height: 2px;',tmpl_modCnt_separate:'color: #bbb;',tmpl_table:'margin: 0 auto; background-color: #fff; color: #3b3b3b;',tmpl_tableFormat:'table-layout: fixed;',tmpl_tdFfFs:'font-size: 15px; line-height: 1.0; word-break: break-word;'+n,tmpl_tdFfFsLh:'font-size: 15px; line-height: 1.8; word-break: break-word;'+n,tmpl_gap:'font-size: 1px;',tmpl_modExtraPadding:'line-height: 9px;height:9px;',experienceTopInfo:'font-size: 15px; color: #777777;margin-bottom: 6px;',experienceBottomInfo:'font-size: 15px; color: #777777;margin-bottom: 0px;'};
var c=$.lib('resume.utils').createTPL(r);
var a=$.lib('resume.utils').createTPL(p);
var d={};
var b={};
var o=['<table width="%tmpl_wrapper%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_tableFormat%%tmpl_table%" class="resume_tmpl3">','<tbody>','<tr><td width="%tmpl_infoLeftWidth%"><div style="%tmpl_line% width: %tmpl_infoLeftWidth%px;"></div></td><td><div style="%tmpl_line% width: %tmpl_infoRightWidth%px;"></div></td></tr>','<tr>','<td valign="top" style="%tmpl_infoLeft%">','$baseinfo$','</td>','<td valign="top" align="right" style="%tmpl_infoRight%" class="resume_modifyAvatarCtrl">','$face$','</td>','</tr>','<tr>','<td id="resume_order_content" colspan="2" style="%tmpl_content%%tmpl_tdFfFsLh%">','$apply_intention$','$education$','$school_experience$','$experience$','$project$','$awards$','$ability$','$self_evaluate$','$custom$','</td>','</tr>','</tbody>','</table>'];
d.layout=c(o);
b.layout=a(o);
d.empty_line_Single=c(['<div class="tmpl_ctrlDefaultShow" style="font-size: 12px; line-height: 1; color: #888; ">','<div style="width: 680px; height: 11px; line-height: 11px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','<div style="width: 680px; height: 17px; line-height: 17px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','<div style="width: 340px; height: 17px; line-height: 17px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','<div style="height: 7px; line-height: 7px; font-size: 1px;"></div>','</div>','<div class="tmpl_ctrlDefaultHide" style="font-size: 12px; line-height: 1; color: #888; " output="false">','<div style="height: 48px; line-height: 48px;">','<span style="display: block; line-height: 14px;"><img src="$images_path$resume/template/ico_t2EditIcon_png820552d.png" alt="\u70B9\u51FB\u4FEE\u6539\u5185\u5BB9" style="float: left; margin-right: 5px;" />\u70B9\u51FB\u4FEE\u6539\u5185\u5BB9</span>','</div>','<div style="height: 7px; line-height: 7px; font-size: 1px;"></div>','</div>']);
d.empty_line=c(['<tr class="tmpl_ctrlDefaultShow">','<td colspan="2" style="padding: 0 0 7px 43px;"><table><tr>','<td style="font-size: 12px; line-height: 1; color: #888;" valign="top">','<div style="width: 104px; height: 9px; line-height: 9px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','<div style="width: 104px; height: 54px; line-height: 54px; font-size: 1px;"></div>','<div style="width: 104px; height: 17px; line-height: 17px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','</td>','<td style="padding: 0 28px 0 27px; font-size: 12px; line-height: 1; color: #888; " valign="top">','<img style="vertical-align: top; content: url($images_path$resume/template/timeline_short20704c.png); _content: url($images_path$resume/template/timeline_short_png820704c.png);" src="$images_path$resume/template/timeline_short_png820704c.png" alt="\u65F6\u95F4\u8F74" />','</td>','<td style="font-size: 12px; line-height: 1; color: #888; ">','<div style="width: 513px; height: 9px; line-height: 9px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','<div style="width: 513px; height: 17px; line-height: 17px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','<div style="width: 513px; height: 17px; line-height: 17px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','<div style="width: 513px; height: 24px; line-height: 24px; font-size: 1px;"></div>','<div style="width: 513px; height: 11px; line-height: 11px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','<div style="width: 513px; height: 17px; line-height: 17px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','<div style="width: 513px; height: 17px; line-height: 17px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','</td>','</tr></table></td>','</tr>','<tr class="tmpl_ctrlDefaultHide" output="false">','<td colspan="2" style="padding: 0 0 7px 43px; font-size: 12px; line-height: 1; color: #888; ">','<div style="height: 124px; line-height: 124px;">','<span style="display: block; line-height: 14px;"><img src="$images_path$resume/template/ico_t2EditIcon_png820552d.png" alt="\u70B9\u51FB\u4FEE\u6539\u5185\u5BB9" style="float: left; margin-right: 5px;" />\u70B9\u51FB\u4FEE\u6539\u5185\u5BB9</span>','</div>','</td>','</tr>']);
d.empty_line_Short=c(['<tr class="tmpl_ctrlDefaultShow">','<td colspan="2" style="padding: 0 0 7px 43px;"><table><tr>','<td style="font-size: 12px; line-height: 1; color: #888;" valign="top">','<div style="width: 104px; height: 9px; line-height: 9px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','<div style="width: 104px; height: 17px; line-height: 17px; font-size: 1px;"></div>','<div style="width: 104px; height: 17px; line-height: 17px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','</td>','<td style="padding: 0 28px 0 27px; font-size: 12px; line-height: 1; color: #888; " valign="top">','<img style="vertical-align: top; content: url($images_path$resume/template/timeline_less20704c.png); _content: url($images_path$resume/template/timeline_less_png820704c.png);" src="$images_path$resume/template/timeline_less_png820704c.png" alt="\u65F6\u95F4\u8F74" />','</td>','<td style="font-size: 12px; line-height: 1; color: #888; ">','<div style="width: 513px; height: 9px; line-height: 9px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','<div style="width: 513px; height: 17px; line-height: 17px; font-size: 1px;"></div>','<div style="width: 513px; height: 17px; line-height: 17px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','</td>','</tr></table></td>','</tr>','<tr class="tmpl_ctrlDefaultHide" output="false">','<td colspan="2" style="padding: 0 0 7px 43px; font-size: 12px; line-height: 1; color: #888; ">','<div style="height: 51px; line-height: 51px;">','<span style="display: block; line-height: 14px;"><img src="$images_path$resume/template/ico_t2EditIcon_png820552d.png" alt="\u70B9\u51FB\u4FEE\u6539\u5185\u5BB9" style="float: left; margin-right: 5px;" />\u70B9\u51FB\u4FEE\u6539\u5185\u5BB9</span>','</div>','</td>','</tr>']);
d.empty_line_Base=c(['<tr>','<td style="padding-right: 8px;">','<div class="tmpl_ctrlDefaultShow" style="font-size: 12px; line-height: 1; color: #888; ">','<div style="width: 220px; height: 5px; line-height: 5px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','<div style="width: 220px; height: 22px; line-height: 22px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','<div style="height: 7px; line-height: 7px; font-size: 1px;"></div>','</div>','<div class="tmpl_ctrlDefaultHide" style="font-size: 12px; line-height: 1; color: #888; " output="false">','<div style="height: 46px; line-height: 46px;">','<span style="display: block; line-height: 14px;"><img src="$images_path$resume/template/ico_t2EditIcon_png820552d.png" alt="\u70B9\u51FB\u4FEE\u6539\u5185\u5BB9" style="margin-right: 5px; vertical-align: -3px;" />\u70B9\u51FB\u4FEE\u6539\u5185\u5BB9</span>','</div>','<div style="height: 7px; line-height: 7px; font-size: 1px;"></div>','</div>','</td>','</tr>']);
var m=['$@$if($visible$)$@$','<div ck="edit">','$@$if($avatar$)$@$','<img src="$avatar$" name="avatar.jpg" alt="\u7B80\u5386\u5934\u50CF" width="100" height="140" style="%tmpl_infoImg%" />','$@$else$@$','<div output="false">','<img name="ico_t3AvatarDefault.png" src="$images_path$resume/template/ico_t3AvatarDefault266ee1.png" alt="\u7B80\u5386\u5934\u50CF" width="100" height="140" style="%tmpl_infoImg_Default% content: url($@$eval getTop().getResumeIconUrl("t3AvatarDefault") $@$); _content: url($images_path$resume/template/ico_t3AvatarDefault266ee1.png);" />','</div>','$@$endif$@$','<a class="resume_modifyAvatarWrap" output="false" hidefocus="" href="javascript:;">','<div class="resume_modifyAvatar">','<span class="resume_modifyAvatar_bg"></span>','<span class="resume_modifyAvatar_txt">\u4FEE\u6539\u5934\u50CF<span class="tmpl_mod_hiddenClick" ck="hideModule" output="false" mor="showFaceHideModeBtnUnderline" mot="hideFaceHideModeBtnUnderline">\u9690\u85CF</span></span>','</div>','</a>','</div>','$@$endif$@$'];
d.face=c(m);
b.face=a(m);
var i=['<div ck="edit">','<table border="0" cellspacing="0" cellpadding="0">','<tr>','<td align="left" class="tmpl_infoLeft_inner $falseDataColor$" style="%tmpl_tdFfFsLh%%tmpl_infoLeft_inner%" ck="edit">','<div class="$falseDataColorDark$" style="%tmpl_infoName%">','$@$if($isEmpty$)$@$','\u59D3\u540D','$@$else$@$','$name$','$@$endif$@$','</div>','$@$if($isEmpty$)$@$',d.empty_line_Base,'$@$else$@$','$@$if( $name$ && ($mobile$ || $email$) )$@$','<div style="%tmpl_gap%%tmpl_infoNameGap%"></div>','$@$endif$@$','$@$if( $age$ || $sex$ || $city$ || $work_seniority$ || $work_seniority$ )$@$','<div>','$@$endif$@$','$@$if($sex$)$@$','<span>','$sex$&nbsp;&nbsp;','</span>','$@$endif$@$','$@$if($age$)$@$','<span>','$age$&nbsp;&nbsp;','</span>','$@$endif$@$','$@$if($city$)$@$','<span>','$city$&nbsp;&nbsp;','</span>','$@$endif$@$','$@$if(($age$ || $sex$ || $city$) && ( $highest_education$ || $work_seniority$) )$@$','<span class="$falseDataColor$" style="%tmpl_modCnt_separate%">|</span>&nbsp;&nbsp;','$@$endif$@$','$@$if($highest_education$)$@$','<span>','$highest_education$&nbsp;&nbsp;','</span>','$@$endif$@$','$@$if($work_seniority$)$@$','<span>','$work_seniority$$@$if($work_seniority$ && $work_seniority$ != "\u5E94\u5C4A\u6BD5\u4E1A\u751F")$@$\u5DE5\u4F5C\u7ECF\u9A8C$@$endif$@$','</span>','$@$endif$@$','$@$if( $age$ || $sex$ || $work_seniority$ || $work_seniority$ )$@$','</div>','$@$endif$@$','$@$if( ( $age$ || $sex$ || $work_seniority$ || $work_seniority$ ) && ($mobile$ || $email$) )$@$','<div style="%tmpl_gap%%tmpl_infoGap%"></div>','$@$endif$@$','$@$if($mobile$ || $email$ )$@$','<div>','$@$endif$@$','$@$if($mobile$)$@$','<span>','$mobile$&nbsp;&nbsp;','</span>','$@$endif$@$','$@$if($email$)$@$','<span>','$email$','</span>','$@$endif$@$','$@$if($mobile$ || $email$ )$@$','</div>','$@$endif$@$','$@$endif$@$','</td>','</tr>','</table>','</div>'];
d.baseinfo=c(i);
b.baseinfo=a(i);
d.timeline_icon=c(['$@$if($_root_.dataLength$>1)$@$','$@$if($_idx_$ == 0)$@$','<td width="20" height="14" valign="bottom" style="%tmpl_tdFfFsLh%">','<img width="9" height="14" name="timeline_top$imgVer$.png_$@$eval Math.floor(100000*Math.random())$@$" style="vertical-align: bottom; content: url($@$eval getTop().getResumeIconUrl("timeline_top") $@$); _content: url($images_path$resume/template/timeline_top_png820704c.png);" src="$images_path$resume/template/timeline_top_png820704c.png" alt="\u65F6\u95F4\u8F74\u9876\u90E8" />','</td>','$@$else if($_idx_$ == $_root_.dataLength$-1)$@$','<td width="20" height="14" valign="top" style="%tmpl_tdFfFsLh%">','<img width="9" height="14" name="timeline_bottom$imgVer$.png_$@$eval Math.floor(100000*Math.random())$@$" style="vertical-align: top; content: url($@$eval getTop().getResumeIconUrl("timeline_bottom") $@$); _content: url($images_path$resume/template/timeline_bottom_png820704c.png);" src="$images_path$resume/template/timeline_bottom_png820704c.png" alt="\u65F6\u95F4\u8F74\u5E95\u90E8" />','</td>','$@$else$@$','<td width="20" height="21" valign="top" style="%tmpl_tdFfFsLh%">','<img width="9" height="21" name="timeline_mid$imgVer$.png_$@$eval Math.floor(100000*Math.random())$@$" style="vertical-align: top; content: url($@$eval getTop().getResumeIconUrl("timeline_mid") $@$); _content: url($images_path$resume/template/timeline_mid_png826bfcd.png);" src="$images_path$resume/template/timeline_mid_png826bfcd.png" alt="\u65F6\u95F4\u8F74\u4E2D\u95F4" />','</td>','$@$endif$@$','$@$else$@$','<td width="20" height="18" valign="center" style="%tmpl_tdFfFsLh%"></td>','$@$endif$@$']);
d.timeline_padding=c(['$@$if($_root_.dataLength$>1)$@$','$@$if($_idx_$ == $_root_.dataLength$-1)$@$','<td style="%tmpl_mod_data_Last%%tmpl_tdFfFsLh%">','$@$else$@$','<td style="%tmpl_mod_data%%tmpl_tdFfFsLh%">','$@$endif$@$','$@$else$@$','<td style="%tmpl_mod_data_Last%%tmpl_tdFfFsLh%">','$@$endif$@$']);
d.timeline_bottom_padding=c(['$@$if($_root_.dataLength$>1 && $_idx_$ != ($_root_.dataLength$-1))$@$','<tr>','<td colspan="3">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_tableFormat%">','<tr>','<td width="%tmpl_mod_leftSpacingWidth%" valign="top"></td>','<td style="padding-left: 66px; border-left: 3px solid #e8e8e8; %tmpl_tdFfFsLh%"><div style="%tmpl_gap%%tmpl_modCnt_timeline_bottom%">&nbsp;</div></td>','</tr>','</table>','</td>','</tr>','$@$else$@$','<tr><td colspan="3"><div style="%tmpl_gap%%tmpl_modExtraPadding%"></div></td></tr>','$@$endif$@$']);
d.timeline_bottom_padding_Small=c(['$@$if($_root_.dataLength$>1 && $_idx_$ != ($_root_.dataLength$-1))$@$','<tr>','<td colspan="3">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_tableFormat%">','<tr>','<td width="%tmpl_mod_leftSpacingWidth%" valign="top"></td>','<td style="padding-left: 66px; border-left: 3px solid #e8e8e8; line-height: 0; font-size: 1px;"><div style="%tmpl_gap%%tmpl_modCnt_timeline_bottomSmall%">&nbsp;</div></td>','</tr>','</table>','</td>','</tr>','$@$endif$@$']);
d.timeline_padding_Alone=c(['$@$if( $_idx_$ != 0)$@$','<tr>','<td height="6" style="line-height: 0; font-size: 1px;">&nbsp;</td>','</tr>','$@$endif$@$']);
var k=['<div class="js_education" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<div class="tmpl_modGap" style="%tmpl_gap%%tmpl_modGap%"></div>','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_tableFormat%" ck="edit" class="js_hover">','<tr>','<td class="tmpl_mod_header" colspan="2" style="%tmpl_mod_header%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>','<img name="ico_t3EduExp$imgVer$.png" style="%tmpl_mod_header_ico% content: url($@$eval getTop().getResumeIconUrl("t3EduExp") $@$); _content: url($images_path$resume/template/ico_t3EduExp_png8264f47.png);" src="$images_path$resume/template/ico_t3EduExp_png8264f47.png" alt="$moduleName$" />','<span style="%tmpl_mod_header_txt%">$moduleName$</span>','</td>','</tr>','$@$if($isEmpty$)$@$','<tr>','<td colspan="2" style="%tmpl_mod_lineWrap_Empty%"></td>','</tr>','$@$else$@$','<tr>','<td class="tmpl_mod_lineWrap" colspan="2" valign="top" style="%tmpl_mod_lineWrap%">','<div style="%tmpl_mod_line%"></div>','</td>','</tr>','$@$endif$@$','$@$if($isEmpty$)$@$',d.empty_line_Short,'$@$else$@$','$@$for($data$)$@$','<tr index="$_idx_$">','<td class="tmpl_mod_cntWrap $_root_.falseDataColor$" colspan="2" style="%tmpl_mod_cntWrap%">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_tableFormat%">','<tr>','<td class="tmpl_mod_left" width="%tmpl_mod_leftWidth%" valign="top" style="%tmpl_mod_left%%tmpl_tdFfFs%">','<div class="$_root_.falseDataColor$" style="%tmpl_modCnt_info%">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</div>','</td>',d.timeline_icon,'<td class="tmpl_mod_itemTitle" valign="top" style="%tmpl_mod_itemTitle%%tmpl_tdFfFs%">','<div>','$@$if($school$)$@$$school$&nbsp;&nbsp;$@$endif$@$','$@$if($major$)$@$$major$&nbsp;&nbsp;$@$endif$@$$degree$','</div>','</td>','</tr>',d.timeline_bottom_padding_Small,'</table>','</td>','</tr>','$@$endfor$@$','$@$endif$@$','<tr><td class="tmpl_mod_bottom" colspan="2" style="%tmpl_mod_bottom%"></td></tr>','</table>','</div>'];
d.education=c(k);
b.education=a(k);
var l=['<div class="js_experience" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<div class="tmpl_modGap" style="%tmpl_gap%%tmpl_modGap%"></div>','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_tableFormat%" ck="edit"  class="js_hover">','<tr>','<td class="tmpl_mod_header" colspan="2" style="%tmpl_mod_header%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>','<img name="ico_t3WorkExp$imgVer$.png" style="%tmpl_mod_header_ico% content: url($@$eval getTop().getResumeIconUrl("t3WorkExp") $@$); _content: url($images_path$resume/template/ico_t3WorkExp_png8264f47.png);" src="$images_path$resume/template/ico_t3WorkExp_png8264f47.png" alt="$moduleName$" />','<span style="%tmpl_mod_header_txt%">$moduleName$</span>','</td>','</tr>','$@$if($isEmpty$)$@$','<tr>','<td colspan="2" style="%tmpl_mod_lineWrap_Empty%"></td>','</tr>','$@$else$@$','<tr>','<td class="tmpl_mod_lineWrap" colspan="2" valign="top" style="%tmpl_mod_lineWrap%">','<div style="%tmpl_mod_line%"></div>','</td>','</tr>','$@$endif$@$','$@$if($isEmpty$)$@$',d.empty_line,'$@$else$@$','$@$for($data$)$@$','<tr index="$_idx_$">','<td class="tmpl_mod_cntWrap $_root_.falseDataColor$" colspan="2" style="%tmpl_mod_cntWrap%">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_tableFormat%">','<tr>','<td class="tmpl_mod_left" width="%tmpl_mod_leftWidth%" valign="top" style="%tmpl_mod_left%%tmpl_tdFfFs%">','<div class="$_root_.falseDataColor$" style="%tmpl_modCnt_info%">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</div>','</td>',d.timeline_icon,'<td class="tmpl_mod_itemTitle tmpl_modCnt_title" valign="top" style="%tmpl_mod_itemTitle%%tmpl_modCnt_title%%tmpl_tdFfFs%">','<div style="%tmpl_modCnt_title_Big%">$@$if($company$)$@$$company$&nbsp;&nbsp;$@$endif$@$$title$</div>','</td>','</tr>','<tr>','<td colspan="3">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_tableFormat%">','<tr>','<td width="%tmpl_mod_leftSpacingWidth%" valign="top"></td>',d.timeline_padding,'$@$if($performance$)$@$','<div class="tmpl_modCnt_wrap" style="%tmpl_modCnt_wrap%%tmpl_tdFfFsLh%">','<div style="%tmpl_modCnt_text%">$performance$</div>','</div>','$@$endif$@$','</td>','</tr>','</table>','</td>','</tr>',d.timeline_bottom_padding,'</table>','</td>','</tr>','$@$endfor$@$','$@$endif$@$','<tr><td class="tmpl_mod_bottom" colspan="2" style="%tmpl_mod_bottom%"></td></tr>','</table>','</div>'];
d.experience=c(l);
b.experience=a(l);
var q=['<div class="js_project" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<div class="tmpl_modGap" style="%tmpl_gap%%tmpl_modGap%"></div>','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_tableFormat%" ck="edit"  class="js_hover">','<tr>','<td class="tmpl_mod_header" colspan="2" style="%tmpl_mod_header%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>','<img name="ico_t3ProjectExp$imgVer$.png" style="%tmpl_mod_header_ico% content: url($@$eval getTop().getResumeIconUrl("t3ProjectExp") $@$); _content: url($images_path$resume/template/ico_t3ProjectExp_png8264f47.png);" src="$images_path$resume/template/ico_t3ProjectExp_png8264f47.png" alt="$moduleName$" />','<span style="%tmpl_mod_header_txt%">$moduleName$</span>','</td>','</tr>','$@$if($isEmpty$)$@$','<tr>','<td colspan="2" style="%tmpl_mod_lineWrap_Empty%"></td>','</tr>','$@$else$@$','<tr>','<td colspan="2" valign="top" style="%tmpl_mod_lineWrap%">','<div style="%tmpl_mod_line%"></div>','</td>','</tr>','$@$endif$@$','$@$if($isEmpty$)$@$',d.empty_line,'$@$else$@$','$@$for($data$)$@$','<tr index="$_idx_$">','<td class="tmpl_mod_cntWrap $_root_.falseDataColor$" colspan="2" style="%tmpl_mod_cntWrap%">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_tableFormat%">','<tr>','<td class="tmpl_mod_left" width="%tmpl_mod_leftWidth%" valign="top" style="%tmpl_mod_left%%tmpl_tdFfFs%">','<div class="$_root_.falseDataColor$" style="%tmpl_modCnt_info%">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</div>','</td>',d.timeline_icon,'<td class="tmpl_mod_itemTitle tmpl_modCnt_title" valign="top" style="%tmpl_mod_itemTitle%%tmpl_modCnt_title%%tmpl_tdFfFs%">','<div style="%tmpl_modCnt_title_Big%">$@$if($name$)$@$$name$&nbsp;&nbsp;$@$endif$@$$title$</div>','</td>','</tr>','<tr>','<td colspan="3">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_tableFormat%">','<tr>','<td width="%tmpl_mod_leftSpacingWidth%" valign="top"></td>',d.timeline_padding,'$@$if($description$)$@$','<div class="tmpl_modCnt_wrap" style="%tmpl_modCnt_wrap%">','<div style="%tmpl_modCnt_text%">$description$</div>','</div>','$@$endif$@$','</td>','</tr>','</table>','</td>','</tr>',d.timeline_bottom_padding,'</table>','</td>','</tr>','$@$endfor$@$','$@$endif$@$','<tr><td class="tmpl_mod_bottom" colspan="2" style="%tmpl_mod_bottom%"></td></tr>','</table>','</div>'];
d.project=c(q);
b.project=a(q);
var s=['<div class="js_school_experience" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<div class="tmpl_modGap" style="%tmpl_gap%%tmpl_modGap%"></div>','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_tableFormat%" ck="edit" class="js_hover">','<tr>','<td class="tmpl_mod_header" colspan="2" style="%tmpl_mod_header%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>','<img name="ico_t3SchoolExp$imgVer$.png" style="%tmpl_mod_header_ico% content: url($@$eval getTop().getResumeIconUrl("t3SchoolExp") $@$); _content: url($images_path$resume/template/ico_t3SchoolExp_png8264f47.png);" src="$images_path$resume/template/ico_t3SchoolExp_png8264f47.png" alt="$moduleName$" />','<span style="%tmpl_mod_header_txt%">$moduleName$</span>','</td>','</tr>','$@$if($isEmpty$)$@$','<tr>','<td colspan="2" style="%tmpl_mod_lineWrap_Empty%"></td>','</tr>','$@$else$@$','<tr>','<td class="tmpl_mod_lineWrap" colspan="2" valign="top" style="%tmpl_mod_lineWrap%">','<div style="%tmpl_mod_line%"></div>','</td>','</tr>','$@$endif$@$','$@$if($isEmpty$)$@$',d.empty_line,'$@$else$@$','$@$for($data$)$@$','<tr index="$_idx_$">','<td class="tmpl_mod_cntWrap $_root_.falseDataColor$" colspan="2" style="%tmpl_mod_cntWrap%">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_tableFormat%">','<tr>','<td width="%tmpl_mod_leftWidth%" valign="top" style="%tmpl_mod_left%%tmpl_tdFfFs%">','<div class="$_root_.falseDataColor$" style="%tmpl_modCnt_info%">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</div>','</td>',d.timeline_icon,'<td class="tmpl_mod_itemTitle tmpl_modCnt_title" valign="top" style="%tmpl_mod_itemTitle%%tmpl_modCnt_title%%tmpl_tdFfFs%">','<div style="%tmpl_modCnt_title%">$@$if($organization$)$@$$organization$&nbsp;&nbsp;$@$endif$@$$job$</div>','</td>','</tr>','<tr>','<td colspan="3">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_tableFormat%">','<tr>','<td width="%tmpl_mod_leftSpacingWidth%" valign="top"></td>',d.timeline_padding,'<div class="tmpl_modCnt_wrap" style="%tmpl_modCnt_wrap%">','<div style="%tmpl_modCnt_text%">$description$</div>','</div>','</td>','</tr>','</table>','</td>','</tr>',d.timeline_bottom_padding_Small,'</table>','</td>','</tr>','$@$endfor$@$','$@$endif$@$','<tr><td class="tmpl_mod_bottom" colspan="2" style="%tmpl_mod_bottom%"></td></tr>','</table>','</div>'];
d.school_experience=c(s);
b.school_experience=a(s);
var h=['<div class="js_awards" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<div class="tmpl_modGap" style="%tmpl_gap%%tmpl_modGap%"></div>','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_tableFormat%" ck="edit" class="js_hover">','<tr>','<td class="tmpl_mod_header" colspan="2" style="%tmpl_mod_header%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>','<img name="ico_t3Awards$imgVer$.png" style="%tmpl_mod_header_ico% content: url($@$eval getTop().getResumeIconUrl("t3Awards") $@$); _content: url($images_path$resume/template/ico_t3Awards_png8264f47.png);" src="$images_path$resume/template/ico_t3Awards_png8264f47.png" alt="$moduleName$" />','<span style="%tmpl_mod_header_txt%">$moduleName$</span>','</td>','</tr>','$@$if($isEmpty$)$@$','<tr>','<td colspan="2" style="%tmpl_mod_lineWrap_Empty%"></td>','</tr>','$@$else$@$','<tr>','<td class="tmpl_mod_lineWrap" colspan="2" valign="top" style="%tmpl_mod_lineWrap%">','<div style="%tmpl_mod_line%"></div>','</td>','</tr>','$@$endif$@$','$@$if($isEmpty$)$@$',d.empty_line_Short,'$@$else$@$','$@$for($data$)$@$','<tr index="$_idx_$">','<td class="tmpl_mod_cntWrap $_root_.falseDataColor$" colspan="2" style="%tmpl_mod_cntWrap%">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_tableFormat%">','<tr>','<td class="tmpl_mod_left" width="%tmpl_mod_leftWidth%" valign="top" style="%tmpl_mod_left%%tmpl_tdFfFs%">','<div class="$_root_.falseDataColor$" style="%tmpl_modCnt_info%">$time$</div>','</td>',d.timeline_icon,'<td class="tmpl_mod_itemTitle" valign="top" style="%tmpl_mod_itemTitle%%tmpl_tdFfFs%">','$name$','</td>','</tr>',d.timeline_bottom_padding_Small,'</table>','</td>','</tr>','$@$endfor$@$','$@$endif$@$','<tr><td class="tmpl_mod_bottom" colspan="2" style="%tmpl_mod_bottom%"></td></tr>','</table>','</div>'];
d.awards=c(h);
b.awards=a(h);
var t=['<div class="js_self_evaluate" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<div class="tmpl_modGap" style="%tmpl_gap%%tmpl_modGap%"></div>','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_tableFormat%" ck="edit"  class="js_hover">','<tr>','<td class="tmpl_mod_header" colspan="2" style="%tmpl_mod_header%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>','<img name="ico_t3SelfEvaluation.png" style="%tmpl_mod_header_ico% content: url($@$eval getTop().getResumeIconUrl("t3SelfEvaluation") $@$); _content: url($images_path$resume/template/ico_t3SelfEvaluation_png8264f47.png);" src="$images_path$resume/template/ico_t3SelfEvaluation_png8264f47.png" alt="$moduleName$" />','<span style="%tmpl_mod_header_txt%">$moduleName$</span>','</td>','</tr>','$@$if($isEmpty$)$@$','<tr>','<td colspan="2" style="%tmpl_mod_lineWrap_Empty%"></td>','</tr>','$@$else$@$','<tr>','<td class="tmpl_mod_lineWrap" colspan="2" valign="top" style="%tmpl_mod_lineWrap%">','<div style="%tmpl_mod_line%"></div>','</td>','</tr>','$@$endif$@$','<tr>','<td class="tmpl_mod_singleCnt $_root_.falseDataColor$" colspan="2" style="%tmpl_mod_singleCnt%%tmpl_tdFfFsLh%">','<div class="tmpl_mod_singleItem" style="%tmpl_mod_singleItem%">','$@$if($isEmpty$)$@$',d.empty_line_Single,'$@$else$@$','$content$','$@$endif$@$','</div>','</td>','</tr>','</table>','</div>'];
d.self_evaluate=c(t);
b.self_evaluate=a(t);
var g=['<div class="js_apply_intention" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<div class="tmpl_modGap" style="%tmpl_gap%%tmpl_modGap%"></div>','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_tableFormat%" ck="edit"  class="js_hover">','<tr>','<td class="tmpl_mod_header" colspan="2" style="%tmpl_mod_header%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>','<img name="ico_t3CareerObjective$imgVer$.png" style="%tmpl_mod_header_ico% content: url($@$eval getTop().getResumeIconUrl("t3CareerObjective") $@$); _content: url($images_path$resume/template/ico_t3CareerObjective_png8264f47.png);" src="$images_path$resume/template/ico_t3CareerObjective_png8264f47.png" alt="$moduleName$" />','<span style="%tmpl_mod_header_txt%">$moduleName$</span>','</td>','</tr>','$@$if($isEmpty$)$@$','<tr>','<td colspan="2" style="%tmpl_mod_lineWrap_Empty%"></td>','</tr>','$@$else$@$','<tr>','<td class="tmpl_mod_lineWrap" colspan="2" valign="top" style="%tmpl_mod_lineWrap%">','<div style="%tmpl_mod_line%"></div>','</td>','</tr>','$@$endif$@$','<tr>','<td class="tmpl_mod_singleCnt $falseDataColor$" colspan="2" style="%tmpl_mod_singleCnt%%tmpl_tdFfFsLh%">','<div class="tmpl_mod_singleItem" style="%tmpl_mod_singleItem%">','$@$if($isEmpty$)$@$',d.empty_line_Single,'$@$else$@$','$@$if( $title$ || $work_place$ )$@$','<div>','$@$if($title$)$@$$title$&nbsp;&nbsp;$@$endif$@$','$work_place$','</div>','$@$endif$@$','$@$endif$@$','</div>','</td>','</tr>','<tr><td class="tmpl_mod_bottom" colspan="2" style="%tmpl_mod_bottom%"></td></tr>','</table>','</div>'];
d.apply_intention=c(g);
b.apply_intention=a(g);
var e=['<div class="js_ability" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<div class="tmpl_modGap" style="%tmpl_gap%%tmpl_modGap%"></div>','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_tableFormat%" ck="edit" class="js_hover">','<tr>','<td class="tmpl_mod_header" colspan="2" style="%tmpl_mod_header%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>','<img name="ico_t3ProfessionalSkills$imgVer$.png" style="%tmpl_mod_header_ico% content: url($@$eval getTop().getResumeIconUrl("t3ProfessionalSkills") $@$); _content: url($images_path$resume/template/ico_t3ProfessionalSkills_png8264f47.png)"; src="$images_path$resume/template/ico_t3ProfessionalSkills_png8264f47.png" alt="$moduleName$" />','<span style="%tmpl_mod_header_txt%">$moduleName$</span>','</td>','</tr>','$@$if($isEmpty$)$@$','<tr>','<td colspan="2" style="%tmpl_mod_lineWrap_Empty%"></td>','</tr>','$@$else$@$','<tr>','<td class="tmpl_mod_lineWrap" colspan="2" valign="top" style="%tmpl_mod_lineWrap%">','<div style="%tmpl_mod_line%"></div>','</td>','</tr>','$@$endif$@$','$@$if($isEmpty$)$@$',d.empty_line,'$@$else$@$','<tr index="$_idx_$">','<td class="tmpl_mod_cntWrap $_root_.falseDataColor$" colspan="2" style="%tmpl_mod_cntWrap%">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_tableFormat%">',d.timeline_padding_Alone,'<tr>','<td valign="top" style="%tmpl_mod_data_Alone% padding-top: 1px; %tmpl_tdFfFsLh%">$ability$</td>','</tr>','</table>','</td>','</tr>','$@$endif$@$','<tr><td class="tmpl_mod_bottom" colspan="2" style="%tmpl_mod_bottom%"></td></tr>','</table>','</div>'];
d.ability=c(e);
b.ability=a(e);
var j=['$@$for($data$)$@$','<div id="_custom_$_idx_$" class="js_custom">','<div>','<div style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="tmpl_modGap" style="%tmpl_gap%%tmpl_modGap%"></div>','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_tableFormat%" ck="edit"  class="js_hover" index="$_idx_$">','<tr>','<td class="tmpl_mod_header" colspan="2" style="%tmpl_mod_header%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>','<img name="ico_t3Custom$imgVer$.png_$@$eval Math.floor(100000*Math.random())$@$" style="%tmpl_mod_header_ico% content: url($@$eval getTop().getResumeIconUrl("t3Custom") $@$); _content: url($images_path$resume/template/ico_t3Custom_png8264f47.png);" src="$images_path$resume/template/ico_t3Custom_png8264f47.png" alt="$title$" />','<span style="%tmpl_mod_header_txt%">$title$</span>','</td>','</tr>','$@$if($isEmpty$)$@$','<tr>','<td colspan="2" style="%tmpl_mod_lineWrap_Empty%"></td>','</tr>','$@$else$@$','<tr>','<td class="tmpl_mod_lineWrap" colspan="2" valign="top" style="%tmpl_mod_lineWrap%">','<div style="%tmpl_mod_line%"></div>','</td>','</tr>','$@$endif$@$','<tr>','<td class="tmpl_mod_singleCnt" colspan="2" style="%tmpl_mod_singleCnt%%tmpl_tdFfFsLh%">','<div class="tmpl_mod_singleItemGap" style="%tmpl_gap%%tmpl_mod_singleItemGap%"></div>','<div class="tmpl_mod_singleItem" style="%tmpl_mod_singleItem%">','$content$','</div>','</td>','</tr>','</table>','</div>','</div>','</div>','$@$endfor$@$'];
d.custom=c(j);
b.custom=a(j);
$.createCtrl('resume.view.module_skin_3',{sSuper:'resume.view'},function(u){
return {init_:function(v){
this.superEx_(u,'init_',arguments);
this.setTpl(d);
return this;
},getPdfTPL:function(){
return b;
}};
});
});
$.package('resume/view/module_skin_3_export.js',['resume/lib/utils.js'],function(c){
var a=$.lib('resume.utils').createTPL({tmpl_infoImg:'border: 2px solid #dfdfdf;',tmpl_infoName:'margin-bottom: 3px; font-size:34px;',tmpl_tdFfFsLhTc:'font-size: 14px; line-height: 21px; word-break: break-word; color: #3b3b3b;',tmpl_tdFfFsLhTcSmallLineHeight:'font-size: 14px; line-height: 14px; word-break: break-word; color: #3b3b3b;',tmpl_infoGap:'height: 3px; line-height: 3px;',tmpl_mod_gap:'margin-bottom: 14px;',tmpl_mod_headerLine:'margin-bottom: 3px; border-top:2px solid #dfdfdf;',tmpl_mod_left:'margin-bottom:0cm;margin-left:36px;margin-top:0px;',tmpl_mod_item:'margin-bottom: 4px;',tmpl_mod_itemGap:'margin-bottom: 6px;',tmpl_mod_item_title:'margin-bottom: 2px;',tmpl_modCnt_title:'font-size: 18px;',tmpl_modCnt_titleSmall:'font-size: 15px;',tmpl_modCnt_titleSpecial:'color: #777777',tmpl_modCnt_headLeft:'margin-bottom:2px;margin-top:1px;',tmpl_modCnt_headLeftWidth:'27',tmpl_modCnt_info:'color: #3b3b3b;',tmpl_modCnt_separate:'color: #bbbbbb;',tmpl_timeLineIcon:'margin: 0px 4px 0px 0px;',tmpl_gap:'font-size: 1px;'});
var b={};
b.layout=a(['<style>p{font-family: \'\u5FAE\u8F6F\u96C5\u9ED1\';}</style>','<div align="center">','<table width="643" cellpadding="0" cellspacing="0" align="center">','<col width="643">','<tr>','<td>','<div>','<table width="643" cellpadding="0" cellspacing="0" align="center">','<col width="643">','<tr>','<td>','<div>','<table width="643" border="0" bordercolor="#dadada" cellpadding="0" cellspacing="0" align="center">','<col width="533">','<col width="110">','<tr>','<td valign="bottom">','$baseinfo$','</td>','<td>','$face$','</td>','</tr>','</table>','</div>','<div id="resume_order_content">','$apply_intention$','$education$','$school_experience$','$experience$','$project$','$awards$','$ability$','$self_evaluate$','$custom$','</div>','</td>','</tr>','</table>','</div>','</td>','</tr>','</table>','</div>']);
b.baseinfo=a(['<div style="margin-bottom:0cm;">','<font color="#374760" style="%tmpl_infoName%"><b>','$@$if($isEmpty$)$@$','\u59D3\u540D','$@$else$@$','$name$','$@$endif$@$','</b></font>','</div>','$@$if( $age$ || $sex$ || $city$ || $work_seniority$ || $work_seniority$ )$@$','<div style="%tmpl_tdFfFsLhTc%">','$@$endif$@$','$@$if($sex$)$@$','$sex$&nbsp;&nbsp;','$@$endif$@$','$@$if($age$)$@$','$age$&nbsp;&nbsp;','$@$endif$@$','$@$if($city$)$@$','$city$&nbsp;&nbsp;','$@$endif$@$','$@$if(($age$ || $sex$ || $city$) && ( $highest_education$ || $work_seniority$) )$@$','<span style="%tmpl_modCnt_separate%">|</span>&nbsp;&nbsp;','$@$endif$@$','$@$if($highest_education$)$@$','$highest_education$&nbsp;&nbsp;','$@$endif$@$','$@$if($work_seniority$)$@$','$@$if($work_seniority$ != "\u5E94\u5C4A\u6BD5\u4E1A\u751F")$@$$@$endif$@$$work_seniority$\u5DE5\u4F5C\u7ECF\u9A8C','$@$endif$@$','$@$if( $age$ || $sex$ || $work_seniority$ || $work_seniority$ )$@$','</div>','$@$endif$@$','$@$if( ( $age$ || $sex$ || $work_seniority$ || $work_seniority$ ) && ($mobile$ || $email$) )$@$','<div style="%tmpl_gap%%tmpl_infoGap%"></div>','$@$endif$@$','$@$if($mobile$ || $email$ )$@$','<div style="%tmpl_tdFfFsLhTc%">','$@$endif$@$','$@$if($mobile$)$@$','$mobile$&nbsp;&nbsp;','$@$endif$@$','$@$if($email$)$@$','$email$','$@$endif$@$','$@$if($mobile$ || $email$ )$@$','</div>','$@$endif$@$']);
b.face=a(['<div>','$@$if($visible$)$@$','$@$if($avatar$)$@$','<img src="$avatar$" name="avatar.jpg" alt="\u7B80\u5386\u5934\u50CF" width="100" height="140" style="%tmpl_infoImg%" />','$@$endif$@$','$@$endif$@$','</div>']);
b.timeline_icon=a(['$@$if($_root_.dataLength$>1)$@$','$@$if($_idx_$ == 0)$@$','<td colspan="3" align="center" valign="bottom">','<div style="%tmpl_timeLineIcon%">','<img name="timeline_top$imgVer$.png_$@$eval Math.floor(Math.random() * 1000000)$@$" src="$images_path$resume/template/timeline_top20704c.png" width="9" height="14">','</div>','</td>','$@$else if($_idx_$ == $_root_.dataLength$-1)$@$','<td colspan="3" align="center" valign="top">','<div style="%tmpl_timeLineIcon%">','<img align="top" name="timeline_bottom$imgVer$.png_$@$eval Math.floor(Math.random() * 1000000)$@$" src="$images_path$resume/template/timeline_mid26bfcd.png" width="9" height="14">','</div>','</td>','$@$else$@$','<td colspan="3" align="center">','<div style="%tmpl_timeLineIcon%">','<img name="timeline_mid$imgVer$.png_$@$eval Math.floor(Math.random() * 1000000)$@$" src="$images_path$resume/template/timeline_bottom20704c.png" width="9" height="21">','</div>','</td>','$@$endif$@$','$@$else$@$','<td></td><td></td><td></td>','$@$endif$@$']);
b.education=a(['<div id="education">','<table width="643" cellpadding="0" cellspacing="0" align="center">','<col width="178">','<col width="15">','<col width="3">','<col width="19">','<col width="428">','<tr>','<td colspan="5">','<div style="margin-bottom:0cm;">','<table>','<col width="%tmpl_modCnt_headLeftWidth%">','<col width="585">','<tr>','<td>','<div style="%tmpl_modCnt_headLeft%">','<img name="ico_t3EduExp$imgVer$.png" src="$images_path$resume/template/ico_t3EduExp.png" width="24" height="24">','</div>','</td>','<td>','<div style="margin-bottom:0cm;">','<font color="#374760" style="%tmpl_modCnt_title%"><b>$moduleName$</b></font>','</div>','</td>','</tr>','</table>','</div>','</td>','</tr>','<tr>','<td colspan="5">','<div style="%tmpl_mod_headerLine%">','<div style="font-size:1px;"><br /></div>','</div>','</td>','</tr>','$@$for($data$)$@$','$@$if($_root_.dataLength$>1)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td>','<div style="margin-bottom:0cm;">','<div style="font-size:2px;"><br /></div>','</div>','</td>','<td>','<div style="margin-bottom:0cm;">','<div style="font-size:2px;"><br /></div>','</div>','</td>','<td bgcolor="#e8e8e8">','<div style="margin-bottom:0cm;">','<div style="font-size:2px;"><br /></div>','</div>','</td>','<td>','<div style="margin-bottom:0cm;">','<div style="font-size:2px;"><br /></div>','</div>','</td>','<td>','<div style="margin-bottom:0cm;">','<div style="font-size:2px;"><br /></div>','</div>','</td>','</tr>','$@$endif$@$','$@$endif$@$','<tr>','<td valign="top">','<div style="%tmpl_mod_left%%tmpl_tdFfFsLhTc%">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</div>','</td>',b.timeline_icon,'<td valign="top">','<div style="margin-bottom:0cm;">','<div style="%tmpl_tdFfFsLhTcSmallLineHeight%">','$@$if($school$)$@$$school$&nbsp;&nbsp;$@$endif$@$','$@$if($major$)$@$$major$&nbsp;&nbsp;$@$endif$@$','$degree$','</div>','</div>','</td>','</tr>','$@$endfor$@$','<tr>','<td colspan="5">','<div style="%tmpl_gap%%tmpl_mod_gap%"><br /></div>','</td>','</tr>','</table>','</div>']);
b.apply_intention=a(['<div id="apply_intention">','<table width="643" cellpadding="0" cellspacing="0" align="center">','<col width="643">','<tr>','<td>','<div style="margin-bottom:0cm;">','<table>','<col width="%tmpl_modCnt_headLeftWidth%">','<col width="585">','<tr>','<td>','<div style="%tmpl_modCnt_headLeft%">','<img name="ico_t3CareerObjective$imgVer$.png" src="$images_path$resume/template/ico_t3CareerObjective.png" width="24" height="24">','</div>','</td>','<td>','<div style="margin-bottom:0cm;">','<font color="#374760" style="%tmpl_modCnt_title%"><b>$moduleName$</b></font>','</div>','</td>','</tr>','</table>','</div>','</td>','</tr>','<tr>','<td>','<div style="%tmpl_mod_headerLine%">','<div style="font-size:1px;"><br /></div>','</div>','</td>','</tr>','<tr>','<td valign="top">','$@$if( $title$ || $work_place$ )$@$','<div style="margin-bottom:0cm;margin-left:40px;%tmpl_tdFfFsLhTc%">','$@$if($title$)$@$$title$&nbsp;&nbsp;$@$endif$@$','$work_place$','</div>','$@$endif$@$','</td>','</tr>','<tr>','<td>','<div style="%tmpl_gap%margin-bottom:3px;"><br /></div>','</td>','</tr>','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_gap%"><br /></div>','</td>','</tr>','</table>','</div>']);
b.experience=a(['<div id="experience">','<table width="643" cellpadding="0" cellspacing="0" align="center">','<col width="178">','<col width="15">','<col width="3">','<col width="19">','<col width="428">','<tr>','<td colspan="5">','<div style="margin-bottom:0cm;">','<table>','<col width="%tmpl_modCnt_headLeftWidth%">','<col width="585">','<tr>','<td>','<div style="%tmpl_modCnt_headLeft%">','<img name="ico_t3WorkExp$imgVer$.png" src="$images_path$resume/template/ico_t3WorkExp.png" width="24" height="24">','</div>','</td>','<td>','<div style="margin-bottom:0cm;">','<font color="#374760" style="%tmpl_modCnt_title%"><b>$moduleName$</b></font>','</div>','</td>','</tr>','</table>','</div>','</td>','</tr>','<tr>','<td colspan="5">','<div style="%tmpl_mod_headerLine%">','<div style="font-size:1px;"><br /></div>','</div>','</td>','</tr>','$@$for($data$)$@$','<tr>','<td valign="top">','<div style="%tmpl_mod_left%%tmpl_tdFfFsLhTc%">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</div>','</td>',b.timeline_icon,'<td valign="top">','<div style="margin-bottom:0cm;">','<div style="%tmpl_modCnt_titleSmall%"><b>$@$if($company$)$@$$company$&nbsp;&nbsp;$@$endif$@$$title$</b></div>','</div>','</td>','</tr>','<tr>','<td>','</td>','<td>','</td>','$@$if($_root_.dataLength$>1)$@$','$@$if($_idx_$ != $_root_.dataLength$-1)$@$','<td bgcolor="#e8e8e8">','</td>','$@$else$@$','<td>','</td>','$@$endif$@$','$@$else$@$','<td>','</td>','$@$endif$@$','<td>','</td>','<td valign="top">','$@$if($performance$)$@$','<div style="%tmpl_mod_item%">','<div style="%tmpl_tdFfFsLhTc%">$performance$</div>','</div>','$@$endif$@$','$@$if($_idx_$ != $_root_.dataLength$-1)$@$','<div style="%tmpl_gap%%tmpl_mod_itemGap%"><br /></div>','$@$endif$@$','</td>','</tr>','$@$endfor$@$','<tr>','<td colspan="5">','<div style="%tmpl_gap%%tmpl_mod_gap%"><br /></div>','</td>','</tr>','</table>','</div>']);
b.project=a(['<div id="project">','<table width="643" cellpadding="0" cellspacing="0" align="center">','<col width="178">','<col width="15">','<col width="3">','<col width="19">','<col width="428">','<tr>','<td colspan="5">','<div style="margin-bottom:0cm;">','<table>','<col width="%tmpl_modCnt_headLeftWidth%">','<col width="585">','<tr>','<td>','<div style="%tmpl_modCnt_headLeft%">','<img name="ico_t3ProjectExp$imgVer$.png" src="$images_path$resume/template/ico_t3ProjectExp.png" width="24" height="24">','</div>','</td>','<td>','<div style="margin-bottom:0cm;">','<font color="#374760" style="%tmpl_modCnt_title%"><b>$moduleName$</b></font>','</div>','</td>','</tr>','</table>','</div>','</td>','</tr>','<tr>','<td colspan="5">','<div style="%tmpl_mod_headerLine%">','<div style="font-size:1px;"><br /></div>','</div>','</td>','</tr>','$@$for($data$)$@$','<tr>','<td valign="top">','<div style="%tmpl_mod_left%%tmpl_tdFfFsLhTc%">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</div>','</td>',b.timeline_icon,'<td valign="top">','<div style="margin-bottom:0cm;">','<div style="%tmpl_modCnt_titleSmall%"><b>$@$if($name$)$@$$name$&nbsp;&nbsp;$@$endif$@$$title$</b></div>','</div>','</td>','</tr>','<tr>','<td>','</td>','<td>','</td>','$@$if($_root_.dataLength$>1)$@$','$@$if($_idx_$ != $_root_.dataLength$-1)$@$','<td bgcolor="#e8e8e8">','</td>','$@$else$@$','<td>','</td>','$@$endif$@$','$@$else$@$','<td>','</td>','$@$endif$@$','<td>','</td>','<td valign="top">','$@$if($description$)$@$','<div style="%tmpl_mod_item%">','<div style="%tmpl_tdFfFsLhTc%">$description$</div>','</div>','$@$endif$@$','$@$if($_idx_$ != $_root_.dataLength$-1)$@$','<div style="%tmpl_gap%%tmpl_mod_itemGap%"><br /></div>','$@$endif$@$','</td>','</tr>','$@$endfor$@$','<tr>','<td colspan="5">','<div style="%tmpl_gap%%tmpl_mod_gap%"><br /></div>','</td>','</tr>','</table>','</div>']);
b.awards=a(['<div id="awards">','<table width="643" cellpadding="0" cellspacing="0" align="center">','<col width="178">','<col width="15">','<col width="3">','<col width="19">','<col width="428">','<tr>','<td colspan="5">','<div style="margin-bottom:0cm;">','<table>','<col width="%tmpl_modCnt_headLeftWidth%">','<col width="585">','<tr>','<td>','<div style="%tmpl_modCnt_headLeft%">','<img name="ico_t3Awards$imgVer$.png" src="$images_path$resume/template/ico_t3Awards.png" width="24" height="24">','</div>','</td>','<td>','<div style="margin-bottom:0cm;">','<font color="#374760" style="%tmpl_modCnt_title%"><b>$moduleName$</b></font>','</div>','</td>','</tr>','</table>','</div>','</td>','</tr>','<tr>','<td colspan="5">','<div style="%tmpl_mod_headerLine%">','<div style="font-size:1px;"><br /></div>','</div>','</td>','</tr>','$@$for($data$)$@$','$@$if($_root_.dataLength$>1)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td>','<div style="margin-bottom:0cm;">','<div style="font-size:2px;"><br /></div>','</div>','</td>','<td>','<div style="margin-bottom:0cm;">','<div style="font-size:2px;"><br /></div>','</div>','</td>','<td bgcolor="#e8e8e8">','<div style="margin-bottom:0cm;">','<div style="font-size:2px;"><br /></div>','</div>','</td>','<td>','<div style="margin-bottom:0cm;">','<div style="font-size:2px;"><br /></div>','</div>','</td>','<td>','<div style="margin-bottom:0cm;">','<div style="font-size:2px;"><br /></div>','</div>','</td>','</tr>','$@$endif$@$','$@$endif$@$','<tr>','<td valign="top">','<div style="%tmpl_mod_left%%tmpl_tdFfFsLhTc%">','$time$','</div>','</td>',b.timeline_icon,'<td valign="top">','<div style="margin-bottom:0cm;">','<div style="%tmpl_modCnt_titleSmall%">$name$</div>','</div>','</td>','</tr>','$@$endfor$@$','<tr>','<td></td>','<td>','<div style="%tmpl_gap%%tmpl_mod_gap%"><br /></div>','</td>','</tr>','</table>','</div>']);
b.school_experience=a(['<div id="school_experience">','<table width="643" cellpadding="0" cellspacing="0" align="center">','<col width="178">','<col width="15">','<col width="3">','<col width="15">','<col width="428">','<tr>','<td colspan="5">','<div style="margin-bottom:0cm;">','<table>','<col width="%tmpl_modCnt_headLeftWidth%">','<col width="585">','<tr>','<td>','<div style="%tmpl_modCnt_headLeft%">','<img name="ico_t3SchoolExp$imgVer$.png" src="$images_path$resume/template/ico_t3SchoolExp.png" width="24" height="24">','</div>','</td>','<td>','<div style="margin-bottom:0cm;">','<font color="#374760" style="%tmpl_modCnt_title%"><b>$moduleName$</b></font>','</div>','</td>','</tr>','</table>','</div>','</td>','</tr>','<tr>','<td colspan="5">','<div style="%tmpl_mod_headerLine%">','<div style="font-size:1px;"><br /></div>','</div>','</td>','</tr>','$@$for($data$)$@$','<tr>','<td valign="top">','<div style="%tmpl_mod_left%%tmpl_tdFfFsLhTc%">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</div>','</td>',b.timeline_icon,'<td valign="top">','<div style="margin-bottom:0cm;">','<div style="%tmpl_modCnt_titleSmall%"><b>$organization$$@$if($job$)$@$&nbsp;&nbsp;$job$$@$endif$@$</b></div>','</div>','</td>','</tr>','<tr>','<td>','</td>','<td>','</td>','$@$if($_root_.dataLength$>1)$@$','$@$if($_idx_$ != $_root_.dataLength$-1)$@$','<td bgcolor="#e8e8e8">','</td>','$@$else$@$','<td>','</td>','$@$endif$@$','$@$else$@$','<td>','</td>','$@$endif$@$','<td>','</td>','<td valign="top">','$@$if($description$)$@$','<div style="%tmpl_mod_item%">','<div style="%tmpl_tdFfFsLhTc%">$description$</div>','</div>','$@$endif$@$','$@$if($_idx_$ != $_root_.dataLength$-1)$@$','<div style="%tmpl_gap%%tmpl_mod_itemGap%"><br /></div>','$@$endif$@$','</td>','</tr>','$@$endfor$@$','<tr>','<td></td>','<td>','<div style="%tmpl_gap%%tmpl_mod_gap%"><br /></div>','</td>','</tr>','</table>','</div>']);
b.ability=a(['<div id="ability">','<table width="643" cellpadding="0" cellspacing="0" align="center">','<col width="37">','<col width="606">','<tr>','<td colspan="2">','<div style="margin-bottom:0cm;">','<table>','<col width="%tmpl_modCnt_headLeftWidth%">','<col width="585">','<tr>','<td>','<div style="%tmpl_modCnt_headLeft%">','<img name="ico_t3ProfessionalSkills$imgVer$.png" src="$images_path$resume/template/ico_t3ProfessionalSkills.png" width="24" height="24">','</div>','</td>','<td>','<div style="margin-bottom:0cm;">','<font color="#374760" style="%tmpl_modCnt_title%"><b>$moduleName$</b></font>','</div>','</td>','</tr>','</table>','</div>','</td>','</tr>','<tr>','<td colspan="2">','<div style="%tmpl_mod_headerLine%">','<div style="font-size:1px;"><br /></div>','</div>','</td>','</tr>','<tr>','<td>','</td>','<td valign="top">','<div style="margin-bottom:0cm;">','<div style="%tmpl_tdFfFsLhTc%">$ability$</div>','</div>','</td>','</tr>','<tr>','<td></td>','<td>','<div style="%tmpl_gap%%tmpl_mod_gap%"><br /></div>','</td>','</tr>','</table>','</div>']);
b.self_evaluate=a(['<div id="self_evaluate">','<table width="643" cellpadding="0" cellspacing="0" align="center">','<col width="37">','<col width="578">','<tr>','<td colspan="2">','<div style="margin-bottom:0cm;">','<table>','<col width="%tmpl_modCnt_headLeftWidth%">','<col width="585">','<tr>','<td>','<div style="%tmpl_modCnt_headLeft%">','<img name="ico_t3SelfEvaluation$imgVer$.png" src="$images_path$resume/template/ico_t3SelfEvaluation.png" width="24" height="24">','</div>','</td>','<td>','<div style="margin-bottom:0cm;">','<font color="#374760" style="%tmpl_modCnt_title%"><b>$moduleName$</b></font>','</div>','</td>','</tr>','</table>','</div>','</td>','</tr>','<tr>','<td colspan="2">','<div style="%tmpl_mod_headerLine%">','<div style="font-size:1px;"><br /></div>','</div>','</td>','</tr>','<tr>','<td></td>','<td valign="top">','<div style="margin-bottom:0cm;">','<div style="%tmpl_tdFfFsLhTc%">$content$</div>','</div>','</td>','</tr>','<tr>','<td></td>','<td>','<div style="%tmpl_gap%%tmpl_mod_gap%"><br /></div>','</td>','</tr>','</table>','</div>']);
b.custom=a(['$@$for($data$)$@$','$@$if($visible$)$@$','<div id="_custom_$_idx_$">','<table width="643" cellpadding="0" cellspacing="0" align="center">','<col width="37">','<col width="578">','<tr>','<td colspan="2">','<div style="margin-bottom:0cm;">','<table>','<col width="%tmpl_modCnt_headLeftWidth%">','<col width="585">','<tr>','<td valign="top">','<div style="%tmpl_modCnt_headLeft%">','<img name="ico_t3Custom$imgVer$.png_$@$eval Math.floor(Math.random() * 1000000)$@$" src="$images_path$resume/template/ico_t3Custom.png" alt="$title$" width="24" height="24">','</div>','</td>','<td valign="top">','<div style="margin-bottom:0cm;">','<font color="#374760" style="%tmpl_modCnt_title%"><b>$title$</b></font>','</div>','</td>','</tr>','</table>','</div>','</td>','</tr>','<tr>','<td colspan="2">','<div style="%tmpl_mod_headerLine%">','<div style="font-size:1px;"><br /></div>','</div>','</td>','</tr>','<tr>','<td></td>','<td valign="top">','<div style="margin-bottom:0cm;">','<div style="%tmpl_tdFfFsLhTc%">$content$</div>','</div>','</td>','</tr>','<tr>','<td></td>','<td>','<div style="%tmpl_gap%%tmpl_mod_gap%"><br /></div>','</td>','</tr>','</table>','</div>','$@$endif$@$','$@$endfor$@$']);
$.createCtrl('resume.view.module_skin_3_export',{sSuper:'resume.view'},function(d){
return {init_:function(e){
this.superEx_(d,'init_',arguments);
this.setTpl(b);
return this;
}};
});
});
$.package('resume/view/module_skin_4.js',['resume/lib/utils.js'],function(g){
var u=$.isOS('mac')?' font-family: \'lucida Grande\', Verdana;':' font-family: \'lucida Grande\', Verdana, \'Microsoft YaHei\';';
var z={tmpl_wrapperWidth:'802',tmpl_wrapper:'padding: 36px 0; border: 1px solid #dadada;',tmpl_infoImg:'width: 100px; height: 140px; vertical-align: top;',tmpl_infoImg_Default:'padding-top: 1px; vertical-align: top;',tmpl_modWrap:'position: relative;',tmpl_mod_cnt:'padding: 16px 20px;',tmpl_mod_cntWidth:'734',tmpl_mod_item:'padding: 12px 14px;',tmpl_mod_item_cnt:'',tmpl_mod_cntGap:'height: 8px; line-height: 8px;',tmpl_modCnt_titleWidth:'60',tmpl_modCnt_titleHeight:'22',tmpl_modCnt_shortCntWidth:'198',tmpl_modCnt_shortCntWithoutAvatarWidth:'248',tmpl_modCnt_shortCntWithoutAvatarLeftWidth:'249',tmpl_modCnt_longCntWidth:'645',tmpl_modCnt_boldText:'font-weight: bold;',tmpl_cntTable:'background-color: #c9c9c9; color: #3c3c3c; table-layout: fixed;',tmpl_cntTable_Content:'margin-top: -1px;',tmpl_tdFfFs:'font-size: 14px; line-height: 22px; word-break: break-all; word-wrap: break-word; -webkit-font-smoothing: antialiased;'+u,tmpl_gap:'font-size: 1px;'};
var w={tmpl_wrapperWidth:'690',tmpl_wrapper:'margin: 0 auto;',tmpl_infoImg:'width: 100px; height: 143px; vertical-align: top;',tmpl_infoImg_Default:'',tmpl_modWrap:'',tmpl_mod_cnt:'float: left; width: 559px; border-left: 1px solid #c9c9c9; padding: 16px 20px 18px; background-color: #ffffff;',tmpl_mod_cntWidth:'690',tmpl_mod_item:'',tmpl_mod_item_cnt:'padding: 12px 10px 10px;',tmpl_mod_cntGap:'height: 10px; line-height: 10px;',tmpl_modCnt_titleWidth:'88',tmpl_modCnt_titleHeight:'44',tmpl_modCnt_shortCntWidth:'204',tmpl_modCnt_shortCntWithoutAvatarWidth:'255',tmpl_modCnt_shortCntWithoutAvatarLeftWidth:'254',tmpl_modCnt_longCntWidth:'501',tmpl_modCnt_boldText:'font-weight: bold;',tmpl_cntTable:'background-color: #c9c9c9; color: #3c3c3c; table-layout: fixed;',tmpl_cntTable_Content:'',tmpl_tdFfFs:'font-size: 15px; line-height: 21px; word-break: break-all; word-wrap: break-word;'+u,tmpl_gap:'font-size: 1px;',tmpl_cntWrap:'border: 1px solid #c9c9c9; border-top: 0; color: #3c3c3c; overflow: hidden;',tmpl_mod_left:'float: left; width: 68px; padding: 12px 10px 10px; background-color: #ffffff; text-align: center;'};
var c=$.lib('resume.utils').createTPL(z);
var a=$.lib('resume.utils').createTPL(w);
var d={};
var b={};
var v=['<table width="%tmpl_wrapperWidth%" border="0" cellspacing="0" cellpadding="0" class="resume_tmpl4" style="%tmpl_wrapper%">','<tbody>','<tr>','<td>','<table align="center" width="%tmpl_mod_cntWidth%" cellspacing="0" cellpadding="0" style="table-layout: fixed;">','<tr>','<td>','$baseinfo$','</td>','</tr>','<tr>','<td id="resume_order_content">','$apply_intention$','$education$','$school_experience$','$experience$','$project$','$awards$','$ability$','$self_evaluate$','$custom$','</td>','</tr>','</table>','</td>','</tr>','</tbody>','</table>'];
d.layout=c(v);
b.layout=a(v);
var t=['$@$if($visible$)$@$','<div ck="edit" class="js_hover js_unActiveBaseInfo">','$@$if($avatar$)$@$','<img src="$avatar$" name="avatar.jpg" alt="\u7B80\u5386\u5934\u50CF" width="100" height="140" style="%tmpl_infoImg%" />','$@$else$@$','<div output="false">','<img src="$faceDefault$" name="ico_t4AvatarDefault.png" alt="\u7B80\u5386\u5934\u50CF" width="100" height="140" style="%tmpl_infoImg_Default% content: url($@$eval getTop().getResumeIconUrl("t4AvatarDefault") $@$); _content: url($images_path$resume/template/ico_t4AvatarDefault273b64.png);" />','</div>','$@$endif$@$','<a class="resume_modifyAvatarWrap" output="false" hidefocus="" href="javascript:;">','<div class="resume_modifyAvatar">','<span class="resume_modifyAvatar_bg"></span>','<span class="resume_modifyAvatar_txt">\u4FEE\u6539\u5934\u50CF<span class="tmpl_mod_hiddenClick" ck="hideModule" output="false" mor="showFaceHideModeBtnUnderline" mot="hideFaceHideModeBtnUnderline">\u9690\u85CF</span></span>','</div>','</a>','</div>','$@$endif$@$'];
d.face=c(t);
b.face=a(t);
var l=['<table width="%tmpl_mod_cntWidth%" cellspacing="1" cellpadding="0" style="%tmpl_cntTable%" ck="edit" class="js_hover">','<tr>','<td width="%tmpl_modCnt_titleWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%%tmpl_modCnt_boldText%">','<div style="%tmpl_mod_item_cnt%">\u59D3\u540D</div>','</td>','$@$if($visible$ && ($bShowDefaultFace$ || $avatar$) )$@$','<td class="tmpl_mod_hoverBg $falseDataColor$" width="%tmpl_modCnt_shortCntWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','$@$else$@$','<td class="tmpl_mod_hoverBg $falseDataColor$" width="%tmpl_modCnt_shortCntWithoutAvatarWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','$@$endif$@$','<div style="%tmpl_mod_item_cnt%">$name$</div>','</td>','<td width="%tmpl_modCnt_titleWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%%tmpl_modCnt_boldText%">','<div style="%tmpl_mod_item_cnt%">\u6027\u522B</div>','</td>','$@$if($visible$ && ($bShowDefaultFace$ || $avatar$))$@$','<td class="tmpl_mod_hoverBg $falseDataColor$" width="%tmpl_modCnt_shortCntWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','$@$else$@$','<td class="tmpl_mod_hoverBg $falseDataColor$" width="%tmpl_modCnt_shortCntWithoutAvatarLeftWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','$@$endif$@$','<div style="%tmpl_mod_item_cnt%">$sex$</div>','</td>','$@$if($visible$ && ($bShowDefaultFace$ || $avatar$))$@$','<td width="100" height="140" bgcolor="#ffffff" align="center" rowspan="3">','<div id="face">','</div>','</td>','$@$endif$@$','</tr>','<tr>','<td width="%tmpl_modCnt_titleWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%%tmpl_modCnt_boldText%">\u5E74\u9F84</div>','</td>','<td class="tmpl_mod_hoverBg $falseDataColor$" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%">$age$</div>','</td>','<td width="%tmpl_modCnt_titleWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%%tmpl_modCnt_boldText%">\u6240\u5728\u57CE\u5E02</div>','</td>','<td class="tmpl_mod_hoverBg $falseDataColor$" bgcolor="#ffffff" align="center" height="%tmpl_modCnt_titleHeight%" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%">$city$</div>','</td>','</tr>','<tr>','<td width="%tmpl_modCnt_titleWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%%tmpl_modCnt_boldText%">\u6700\u9AD8\u5B66\u5386</div>','</td>','<td class="tmpl_mod_hoverBg $falseDataColor$" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%">','$highest_education$$@$if($highest_education$ == "\u5927\u4E13" || $highest_education$ == "\u672C\u79D1" || $highest_education$ == "\u7855\u58EB" || $highest_education$ == "\u535A\u58EB")$@$$@$endif$@$','</div>','</td>','<td width="%tmpl_modCnt_titleWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%%tmpl_modCnt_boldText%">\u5DE5\u4F5C\u5E74\u9650</div>','</td>','<td class="tmpl_mod_hoverBg $falseDataColor$" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%">$work_seniority$$@$if($work_seniority$ && $work_seniority$ != "\u5E94\u5C4A\u6BD5\u4E1A\u751F")$@$\u5DE5\u4F5C\u7ECF\u9A8C$@$endif$@$</div>','</td>','</tr>','<tr>','<td width="%tmpl_modCnt_titleWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%%tmpl_modCnt_boldText%">\u624B\u673A</div>','</td>','<td class="tmpl_mod_hoverBg $falseDataColor$" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%">$mobile$</div>','</td>','<td width="%tmpl_modCnt_titleWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%%tmpl_modCnt_boldText%">\u90AE\u7BB1</div>','</td>','$@$if($visible$ && ($bShowDefaultFace$ || $avatar$) )$@$','<td class="tmpl_mod_hoverBg $falseDataColor$" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%" colspan="2">','$@$else$@$','<td class="tmpl_mod_hoverBg $falseDataColor$" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%" colspan="1">','$@$endif$@$','<div style="%tmpl_mod_item_cnt%">$email$</div>','</td>','</tr>','</table>'];
var m=['<table width="%tmpl_mod_cntWidth%" cellspacing="1" cellpadding="0" style="%tmpl_cntTable%" ck="edit" class="js_hover">','<tr>','<td width="%tmpl_modCnt_titleWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%%tmpl_modCnt_boldText%">','<div style="%tmpl_mod_item_cnt%">\u59D3\u540D</div>','</td>','$@$if($visible$&&$avatar$)$@$','<td class="tmpl_mod_hoverBg $falseDataColor$" width="%tmpl_modCnt_shortCntWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','$@$else$@$','<td class="tmpl_mod_hoverBg $falseDataColor$" width="%tmpl_modCnt_shortCntWithoutAvatarWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','$@$endif$@$','<div style="%tmpl_mod_item_cnt%">$name$</div>','</td>','<td width="%tmpl_modCnt_titleWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%%tmpl_modCnt_boldText%">','<div style="%tmpl_mod_item_cnt%">\u6027\u522B</div>','</td>','$@$if($visible$&&$avatar$)$@$','<td class="tmpl_mod_hoverBg $falseDataColor$" width="%tmpl_modCnt_shortCntWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','$@$else$@$','<td class="tmpl_mod_hoverBg $falseDataColor$" width="%tmpl_modCnt_shortCntWithoutAvatarLeftWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','$@$endif$@$','<div style="%tmpl_mod_item_cnt%">$sex$</div>','</td>','$@$if($visible$&&$avatar$)$@$','<td width="100" height="140" bgcolor="#ffffff" align="center" rowspan="3">','<div id="face">','</div>','</td>','$@$endif$@$','</tr>','<tr>','<td width="%tmpl_modCnt_titleWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%%tmpl_modCnt_boldText%">\u5E74\u9F84</div>','</td>','<td class="tmpl_mod_hoverBg $falseDataColor$" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%">$age$</div>','</td>','<td width="%tmpl_modCnt_titleWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%%tmpl_modCnt_boldText%">\u6240\u5728\u57CE\u5E02</div>','</td>','<td class="tmpl_mod_hoverBg $falseDataColor$" bgcolor="#ffffff" align="center" height="%tmpl_modCnt_titleHeight%" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%">$city$</div>','</td>','</tr>','<tr>','<td width="%tmpl_modCnt_titleWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%%tmpl_modCnt_boldText%">\u6700\u9AD8\u5B66\u5386</div>','</td>','<td class="tmpl_mod_hoverBg $falseDataColor$" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%">','$highest_education$$@$if($highest_education$ == "\u5927\u4E13" || $highest_education$ == "\u672C\u79D1" || $highest_education$ == "\u7855\u58EB" || $highest_education$ == "\u535A\u58EB")$@$$@$endif$@$','</div>','</td>','<td width="%tmpl_modCnt_titleWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%%tmpl_modCnt_boldText%">\u5DE5\u4F5C\u5E74\u9650</div>','</td>','<td class="tmpl_mod_hoverBg $falseDataColor$" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%">$work_seniority$$@$if($work_seniority$ && $work_seniority$ != "\u5E94\u5C4A\u6BD5\u4E1A\u751F")$@$\u5DE5\u4F5C\u7ECF\u9A8C$@$endif$@$</div>','</td>','</tr>','<tr>','<td height="%tmpl_modCnt_titleHeight%" width="%tmpl_modCnt_titleWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%%tmpl_modCnt_boldText%">\u624B\u673A</div>','</td>','<td class="tmpl_mod_hoverBg $falseDataColor$" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%">$mobile$</div>','</td>','<td height="%tmpl_modCnt_titleHeight%" width="%tmpl_modCnt_titleWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%">','<div style="%tmpl_mod_item_cnt%%tmpl_modCnt_boldText%">\u90AE\u7BB1</div>','</td>','$@$if($visible$&&$avatar$)$@$','<td class="tmpl_mod_hoverBg $falseDataColor$" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%" colspan="2">','$@$else$@$','<td class="tmpl_mod_hoverBg $falseDataColor$" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%" colspan="1">','$@$endif$@$','<div style="%tmpl_mod_item_cnt%">$email$</div>','</td>','</tr>','</table>'];
d.baseinfo=c(l);
b.baseinfo=a(m);
var p=['<div class="js_education" style="%tmpl_modWrap% display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table class="js_hover" width="%tmpl_mod_cntWidth%" border="0" cellspacing="1" cellpadding="0" ck="edit" style="%tmpl_cntTable%%tmpl_cntTable_Content%">','<tr>','<td width="%tmpl_modCnt_titleWidth%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%%tmpl_modCnt_boldText%">$moduleName$</td>','<td class="tmpl_mod_hoverBg $falseDataColor$" bgcolor="#ffffff" style="%tmpl_tdFfFs%%tmpl_mod_cnt%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>','$@$for($data$)$@$','<div index="$_idx_$">','$@$if($start$ || $end$ )$@$','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','$@$endif$@$','$@$if(($start$ || $end$) && ($school$ || $major$ || $degree$) )$@$','&nbsp;&nbsp;','$@$endif$@$','$@$if($school$ || $major$ || $degree$)$@$','$school$$@$if($school$ && $major$)$@$&nbsp;&nbsp;$@$endif$@$$major$$@$if( ($school$ || $major$) && $degree$)$@$&nbsp;&nbsp;$@$endif$@$$degree$','$@$endif$@$','</div>','$@$endfor$@$','</td>','</tr>','</table>','</div>'];
var q=['<div class="js_education" style="%tmpl_modWrap% display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<div style="%tmpl_cntWrap%">','<div style="%tmpl_tdFfFs%%tmpl_modCnt_boldText%%tmpl_mod_left%">$moduleName$</div>','<div style="%tmpl_tdFfFs%%tmpl_mod_cnt%">','$@$for($data$)$@$','<div index="$_idx_$">','$@$if($start$ || $end$ )$@$','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','$@$endif$@$','$@$if(($start$ || $end$) && ($school$ || $major$ || $degree$) )$@$','&nbsp;&nbsp;','$@$endif$@$','$@$if($school$ || $major$ || $degree$)$@$','$school$$@$if($school$ && $major$)$@$&nbsp;&nbsp;$@$endif$@$$major$$@$if( ($school$ || $major$) && $degree$)$@$&nbsp;&nbsp;$@$endif$@$$degree$','$@$endif$@$','</div>','$@$endfor$@$','</div>','</div>','</div>'];
d.education=c(p);
b.education=a(q);
var r=['<div class="js_experience" style="%tmpl_modWrap% display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="1" cellpadding="0" class="js_hover" ck="edit" style="%tmpl_cntTable%%tmpl_cntTable_Content%">','<tr>','<td width="%tmpl_modCnt_titleWidth%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%%tmpl_modCnt_boldText%">$moduleName$</td>','<td class="tmpl_mod_hoverBg $falseDataColor$" bgcolor="#ffffff" style="%tmpl_tdFfFs%%tmpl_mod_cnt%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<div style="%tmpl_mod_cntGap%"></div>','$@$endif$@$','<div index="$_idx_$">','$@$if($start$ || $end$ || $company$ || $title$)$@$','<div>','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','$@$if($start$ || $end$)$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if($company$ || $title$)$@$','<span style="%tmpl_modCnt_boldText%">$company$$@$if( $company$ )$@$&nbsp;&nbsp;$@$endif$@$$title$</span>','$@$endif$@$','</div>','$@$endif$@$','$@$if( $performance$ )$@$','<div>','$performance$','</div>','$@$endif$@$','</div>','$@$endfor$@$','</td>','</tr>','</table>','</div>'];
var s=['<div class="js_experience" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<div style="%tmpl_cntWrap%">','<div style="%tmpl_tdFfFs%%tmpl_modCnt_boldText%%tmpl_mod_left%">$moduleName$</div>','<div style="%tmpl_tdFfFs%%tmpl_mod_cnt%">','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<div style="%tmpl_mod_cntGap%"></div>','$@$endif$@$','<div index="$_idx_$">','$@$if($start$ || $end$ || $company$ || $title$)$@$','<div>','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','$@$if($start$ || $end$)$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if($company$ || $title$)$@$','<span style="%tmpl_modCnt_boldText%">$company$$@$if( $company$ )$@$&nbsp;&nbsp;$@$endif$@$$title$</span>','$@$endif$@$','</div>','$@$endif$@$','$@$if( $performance$ )$@$','<div>','$performance$','</div>','$@$endif$@$','</div>','$@$endfor$@$','</div>','</div>','</div>'];
d.experience=c(r);
b.experience=a(s);
var x=['<div class="js_project" style="%tmpl_modWrap% display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="1" cellpadding="0" class="js_hover" ck="edit" style="%tmpl_cntTable%%tmpl_cntTable_Content%">','<tr>','<td width="%tmpl_modCnt_titleWidth%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%%tmpl_modCnt_boldText%">$moduleName$</td>','<td class="tmpl_mod_hoverBg $falseDataColor$" bgcolor="#ffffff" style="%tmpl_tdFfFs%%tmpl_mod_cnt%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<div style="%tmpl_mod_cntGap%"></div>','$@$endif$@$','<div index="$_idx_$">','$@$if($start$ || $end$ || $name$ || $title$ )$@$','<div>','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','$@$if($start$ || $end$)$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if( $name$ || $title$ )$@$','<span style="%tmpl_modCnt_boldText%">','$@$if( $name$ )$@$$name$&nbsp;&nbsp;$@$endif$@$','$@$if( $title$ )$@$$title$$@$endif$@$','</span>','$@$endif$@$','</div>','$@$endif$@$','$@$if( $description$ )$@$','<div>','$description$','</div>','$@$endif$@$','</div>','$@$endfor$@$','</td>','</tr>','</table>','</div>'];
var y=['<div class="js_project" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<div style="%tmpl_cntWrap%">','<div style="%tmpl_tdFfFs%%tmpl_modCnt_boldText%%tmpl_mod_left%">$moduleName$</div>','<div style="%tmpl_tdFfFs%%tmpl_mod_cnt%">','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<div style="%tmpl_mod_cntGap%"></div>','$@$endif$@$','<div index="$_idx_$">','$@$if($start$ || $end$ || $name$ || $title$ )$@$','<div>','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','$@$if($start$ || $end$)$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if( $name$ || $title$ )$@$','<span style="%tmpl_modCnt_boldText%">','$@$if( $name$ )$@$$name$&nbsp;&nbsp;$@$endif$@$','$@$if( $title$ )$@$$title$$@$endif$@$','</span>','$@$endif$@$','</div>','$@$endif$@$','$@$if( $description$ )$@$','<div>','$description$','</div>','$@$endif$@$','</div>','$@$endfor$@$','</div>','</div>','</div>'];
d.project=c(x);
b.project=a(y);
var A=['<div class="js_school_experience" style="%tmpl_modWrap% display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="1" cellpadding="0" class="js_hover" ck="edit" style="%tmpl_cntTable%%tmpl_cntTable_Content%">','<tr>','<td width="%tmpl_modCnt_titleWidth%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%%tmpl_modCnt_boldText%">$moduleName$</td>','<td class="tmpl_mod_hoverBg $falseDataColor$" bgcolor="#ffffff" style="%tmpl_tdFfFs%%tmpl_mod_cnt%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<div style="%tmpl_mod_cntGap%"></div>','$@$endif$@$','<div index="$_idx_$">','$@$if($start$ || $end$ || $organization$ || $job$ )$@$','<div>','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','$@$if($start$ || $end$)$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if( $organization$ || $job$ )$@$','<span style="%tmpl_modCnt_boldText%">$organization$$@$if( $job$ )$@$&nbsp;&nbsp;$@$endif$@$$job$</span>','$@$endif$@$','</div>','$@$endif$@$','$@$if( $description$ )$@$','<div>','$description$','</div>','$@$endif$@$','</div>','$@$endfor$@$','</td>','</tr>','</table>','</div>'];
var B=['<div class="js_school_experience" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<div style="%tmpl_cntWrap%">','<div style="%tmpl_tdFfFs%%tmpl_modCnt_boldText%%tmpl_mod_left%">$moduleName$</div>','<div style="%tmpl_tdFfFs%%tmpl_mod_cnt%">','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<div style="%tmpl_mod_cntGap%"></div>','$@$endif$@$','<div index="$_idx_$">','$@$if($start$ || $end$ || $organization$ || $job$ )$@$','<div>','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','$@$if($start$ || $end$)$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if( $organization$ || $job$ )$@$','<span style="%tmpl_modCnt_boldText%">$organization$$@$if( $job$ )$@$&nbsp;&nbsp;$@$endif$@$$job$</span>','$@$endif$@$','</div>','$@$endif$@$','$@$if( $description$ )$@$','<div>','$description$','</div>','$@$endif$@$','</div>','$@$endfor$@$','</div>','</div>','</div>'];
d.school_experience=c(A);
b.school_experience=a(B);
var j=['<div class="js_awards" style="%tmpl_modWrap% display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="1" cellpadding="0" class="js_hover" ck="edit" style="%tmpl_cntTable%%tmpl_cntTable_Content%">','<tr>','<td width="%tmpl_modCnt_titleWidth%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%%tmpl_modCnt_boldText%">$moduleName$</td>','<td class="tmpl_mod_hoverBg $falseDataColor$" bgcolor="#ffffff" style="%tmpl_tdFfFs%%tmpl_mod_cnt%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>','$@$for($data$)$@$','<div index="$_idx_$">','$@$if($time$)$@$','$time$','$@$endif$@$','$@$if($time$ || $name$)$@$','&nbsp;&nbsp;','$@$endif$@$','$name$','</div>','$@$endfor$@$','</td>','</tr>','</table>','</div>'];
var k=['<div class="js_awards" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<div style="%tmpl_cntWrap%">','<div style="%tmpl_tdFfFs%%tmpl_modCnt_boldText%%tmpl_mod_left%">$moduleName$</div>','<div style="%tmpl_tdFfFs%%tmpl_mod_cnt%">','$@$for($data$)$@$','<div index="$_idx_$">','$@$if($time$)$@$','$time$','$@$endif$@$','$@$if($time$ || $name$)$@$','&nbsp;&nbsp;','$@$endif$@$','$name$','</div>','$@$endfor$@$','</div>','</div>','</div>'];
d.awards=c(j);
b.awards=a(k);
var C=['<div class="js_self_evaluate" style="%tmpl_modWrap% display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="1" cellpadding="0" class="js_hover" ck="edit" style="%tmpl_cntTable%%tmpl_cntTable_Content%">','<tr>','<td width="%tmpl_modCnt_titleWidth%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%%tmpl_modCnt_boldText%">$moduleName$</td>','<td class="tmpl_mod_hoverBg $falseDataColor$" bgcolor="#ffffff" style="%tmpl_tdFfFs%%tmpl_mod_cnt%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>','$content$','</td>','</tr>','</table>','</div>'];
var D=['<div class="js_self_evaluate" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<div style="%tmpl_cntWrap%">','<div style="%tmpl_tdFfFs%%tmpl_modCnt_boldText%%tmpl_mod_left%">$moduleName$</div>','<div style="%tmpl_tdFfFs%%tmpl_mod_cnt%">','$content$','</div>','</div>','</div>'];
d.self_evaluate=c(C);
b.self_evaluate=a(D);
var h=['<div class="js_apply_intention" style="%tmpl_modWrap% display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="1" cellpadding="0" class="js_hover" ck="edit" style="%tmpl_cntTable%%tmpl_cntTable_Content%">','<tr>','<td width="%tmpl_modCnt_titleWidth%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%%tmpl_modCnt_boldText%">$moduleName$</td>','<td class="tmpl_mod_hoverBg $falseDataColor$" bgcolor="#ffffff" style="%tmpl_tdFfFs%%tmpl_mod_cnt%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>','$title$','$@$if($title$)$@$&nbsp;&nbsp;$@$endif$@$','$work_place$','</td>','</tr>','</table>','</div>'];
var i=['<div class="js_apply_intention" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<div style="%tmpl_cntWrap%">','<div style="%tmpl_tdFfFs%%tmpl_modCnt_boldText%%tmpl_mod_left%">$moduleName$</div>','<div style="%tmpl_tdFfFs%%tmpl_mod_cnt%">','$title$','$@$if($title$)$@$&nbsp;&nbsp;$@$endif$@$','$work_place$','</div>','</div>','</div>'];
d.apply_intention=c(h);
b.apply_intention=a(i);
var e=['<div class="js_ability" style="%tmpl_modWrap% display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="1" cellpadding="0" class="js_hover" ck="edit" style="%tmpl_cntTable%%tmpl_cntTable_Content%">','<tr>','<td width="%tmpl_modCnt_titleWidth%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%%tmpl_modCnt_boldText%">$moduleName$</td>','<td class="tmpl_mod_hoverBg $falseDataColor$" bgcolor="#ffffff" style="%tmpl_tdFfFs%%tmpl_mod_cnt%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>','<div>$ability$</div>','</td>','</tr>','</table>','</div>'];
var f=['<div class="js_ability" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<div style="%tmpl_cntWrap%">','<div style="%tmpl_tdFfFs%%tmpl_modCnt_boldText%%tmpl_mod_left%">$moduleName$</div>','<div style="%tmpl_tdFfFs%%tmpl_mod_cnt%">','$ability$','</div>','</div>','</div>'];
d.ability=c(e);
b.ability=a(f);
var n=['$@$for($data$)$@$','<div id="_custom_$_idx_$" class="js_custom">','<div>','<div style="%tmpl_modWrap% display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">',,'<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="1" cellpadding="0" class="js_hover" ck="edit" index="$_idx_$" style="%tmpl_cntTable%%tmpl_cntTable_Content%">','<tr>','<td width="%tmpl_modCnt_titleWidth%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%%tmpl_modCnt_boldText%">$title$</td>','<td class="tmpl_mod_hoverBg $falseDataColor$" bgcolor="#ffffff" style="%tmpl_tdFfFs%%tmpl_mod_cnt%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>','$content$','</td>','</tr>','</table>','</div>','</div>','</div>','$@$endfor$@$'];
var o=['$@$for($data$)$@$','<div id="_custom_$_idx_$" class="js_custom">','<div>','<div style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div style="%tmpl_cntWrap%">','<div style="%tmpl_tdFfFs%%tmpl_modCnt_boldText%%tmpl_mod_left%">$title$</div>','<div style="%tmpl_tdFfFs%%tmpl_mod_cnt%">','$content$','</div>','</div>','</div>','</div>','</div>','$@$endfor$@$'];
d.custom=c(n);
b.custom=a(o);
$.createCtrl('resume.view.module_skin_4',{sSuper:'resume.view'},function(E){
return {init_:function(F){
this.superEx_(E,'init_',arguments);
this.setTpl(d);
return this;
},getPdfTPL:function(){
return b;
}};
});
});
$.package('resume/view/module_skin_4_export.js',['resume/lib/utils.js'],function(c){
var a=$.lib('resume.utils').createTPL({tmpl_infoImg:'width: 100px; height: 140px; font-size: 1px;',tmpl_mod_cnt:'margin: 0px 20px;',tmpl_mod_cnt_top:'margin-bottom: 10px;',tmpl_mod_cnt_bottom:'margin-bottom: 12px;',tmpl_mod_item:'',tmpl_mod_item_cnt:'margin: 8px 10px 8px;',tmpl_mod_cntGap:'margin-bottom: 4px;',tmpl_modCnt_titleHeight:'38',tmpl_cntTable:'background-color: #c9c9c9; color: #3c3c3c; table-layout: fixed;',tmpl_tdFfFs:'font-size: 14px; line-height: 18px; word-break: break-all; word-wrap: break-word;',tmpl_gap:'font-size: 1px;'});
var b={};
b.layout=a(['<style>body {font-family: \'\u5FAE\u8F6F\u96C5\u9ED1\';font-size: 14px;}</style>','<table width="643" border="1" bordercolor="#c9c9c9" cellpadding="0" cellspacing="0" align="center" style="%tmpl_cntTable%">','$baseinfo$','$apply_intention$','$education$','$school_experience$','$experience$','$project$','$awards$','$ability$','$self_evaluate$','$custom$','</table>']);
b.baseinfo=a(['$@$if($visible$&&$avatar$)$@$','<col width="88">','<col width="184">','<col width="88">','<col width="183">','<col width="100">','$@$else$@$','<col width="88">','<col width="234">','<col width="88">','<col width="233">','$@$endif$@$','<tr>','<td height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_mod_item%">','<div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%"><b>\u59D3\u540D</b></div>','</td>','<td height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_mod_item%">','<div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%">$name$</div>','</td>','<td height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_mod_item%">','<div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%"><b>\u6027\u522B</b></div>','</td>','$@$if($visible$&&$avatar$)$@$','<td height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_mod_item%">','$@$else$@$','<td height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_mod_item%" colspan="2">','$@$endif$@$','<div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%">$sex$</div>','</td>','$@$if($visible$&&$avatar$)$@$','<td width="100" height="140" bgcolor="#ffffff" align="center" rowspan="3">','<img src="$avatar$" name="avatar.jpg" alt="\u7B80\u5386\u5934\u50CF" width="100" height="140" style="%tmpl_infoImg%" />','</td>','$@$endif$@$','</tr>','<tr>','<td height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_mod_item%">','<div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%"><b>\u5E74\u9F84</b></div>','</td>','<td height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_mod_item%">','<div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%">$age$</div>','</td>','<td height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_mod_item%">','<div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%"><b>\u6240\u5728\u57CE\u5E02</b></div>','</td>','$@$if($visible$&&$avatar$)$@$','<td bgcolor="#ffffff" align="center" height="%tmpl_modCnt_titleHeight%" style="%tmpl_mod_item%">','$@$else$@$','<td bgcolor="#ffffff" align="center" height="%tmpl_modCnt_titleHeight%" style="%tmpl_mod_item%" colspan="2">','$@$endif$@$','<div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%">$city$</div>','</td>','</tr>','<tr>','<td height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_mod_item%">','<div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%"><b>\u6700\u9AD8\u5B66\u5386</b></div>','</td>','<td height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_mod_item%">','<div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%">','$highest_education$$@$if($highest_education$ == "\u5927\u4E13" || $highest_education$ == "\u672C\u79D1" || $highest_education$ == "\u7855\u58EB" || $highest_education$ == "\u535A\u58EB")$@$$@$endif$@$','</div>','</td>','<td height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_mod_item%">','<div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%"><b>\u5DE5\u4F5C\u5E74\u9650</b></div>','</td>','$@$if($visible$&&$avatar$)$@$','<td class="tmpl_mod_hoverBg" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%" colspan="1">','$@$else$@$','<td class="tmpl_mod_hoverBg" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_tdFfFs%%tmpl_mod_item%" colspan="2">','$@$endif$@$','<div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%">$work_seniority$$@$if($work_seniority$ && $work_seniority$ != "\u5E94\u5C4A\u6BD5\u4E1A\u751F")$@$\u5DE5\u4F5C\u7ECF\u9A8C$@$endif$@$</div>','</td>','</tr>','<tr>','<td height="%tmpl_modCnt_titleHeight%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_mod_item%">','<div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%"><b>\u624B\u673A</b></div>','</td>','<td height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_mod_item%">','<div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%">$mobile$</div>','</td>','<td height="%tmpl_modCnt_titleHeight%" height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_mod_item%">','<div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%"><b>\u90AE\u7BB1</b></div>','</td>','<td height="%tmpl_modCnt_titleHeight%" bgcolor="#ffffff" align="center" style="%tmpl_mod_item%" colspan="2">','<div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%">$email$</div>','</td>','</tr>']);
b.face=a(['$@$if($visible$)$@$','$@$if($avatar$)$@$','<img src="$avatar$" name="avatar.jpg" alt="\u7B80\u5386\u5934\u50CF" width="100" height="140" style="%tmpl_infoImg%" />','$@$endif$@$','$@$endif$@$']);
b.education=a(['<tr id="education" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<td bgcolor="#ffffff" align="center" valign="center"><div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%"><b>$moduleName$</b></div></td>','<td colspan="4" bgcolor="#ffffff">','<div style="%tmpl_mod_cnt%%tmpl_tdFfFs%">','<table width="515" border="0" cellspacing="0" cellpadding="0">','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_cnt_top%"><br/></div>','</td>','</tr>','<tr>','<td>','$@$for($data$)$@$','<div index="$_idx_$" style="%tmpl_tdFfFs%">','$@$if($start$ || $end$ )$@$','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','$@$endif$@$','$@$if(($start$ || $end$) && ($school$ || $major$ || $degree$) )$@$','&nbsp;&nbsp;','$@$endif$@$','$@$if($school$ || $major$ || $degree$)$@$','$school$$@$if($school$ && $major$)$@$&nbsp;&nbsp;$@$endif$@$$major$$@$if( ($school$ || $major$) && $degree$)$@$&nbsp;&nbsp;$@$endif$@$$degree$','$@$endif$@$','</div>','$@$endfor$@$','</td>','</tr>','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_cnt_bottom%"><br/></div>','</td>','</tr>','</table>','</div>','</td>','</tr>']);
b.apply_intention=a(['<tr id="apply_intention">','<td bgcolor="#ffffff" align="center" valign="center"><div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%"><b>$moduleName$</b></div></td>','<td colspan="4" bgcolor="#ffffff">','<div style="%tmpl_mod_cnt%%tmpl_tdFfFs%">','<table width="515" border="0" cellspacing="0" cellpadding="0">','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_cnt_top%"><br/></div>','</td>','</tr>','<tr>','<td>','<div style="%tmpl_tdFfFs%">','$title$','$@$if($title$)$@$&nbsp;&nbsp;$@$endif$@$','$work_place$','</div>','</td>','</tr>','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_cnt_bottom%"><br/></div>','</td>','</tr>','</table>','</div>','</td>','</tr>']);
b.experience=a(['<tr id="experience" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<td bgcolor="#ffffff" align="center" valign="center"><div style="%tmpl_tdFfFs%%tmpl_mod_item%"><b>$moduleName$</b></div></td>','<td colspan="4" bgcolor="#ffffff">','<div style="%tmpl_mod_cnt%%tmpl_tdFfFs%">','<table width="515" border="0" cellspacing="0" cellpadding="0">','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_cnt_top%"><br/></div>','</td>','</tr>','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_cntGap%"><br/></div>','</td>','</tr>','$@$endif$@$','<tr>','<td>','<div index="$_idx_$" style="%tmpl_tdFfFs%">','$@$if($start$ || $end$ || $company$ || $title$)$@$','<div>','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','$@$if($start$ || $end$)$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if($company$ || $title$)$@$','<b>$company$$@$if( $company$ )$@$&nbsp;&nbsp;$@$endif$@$$title$</b>','$@$endif$@$','</div>','$@$endif$@$','$@$if( $performance$ )$@$','<div>','$performance$','</div>','$@$endif$@$','</div>','</td>','</tr>','$@$endfor$@$','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_cnt_bottom%"><br/></div>','</td>','</tr>','</table>','</div>','</td>','</tr>']);
b.project=a(['<tr id="project" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<td bgcolor="#ffffff" align="center" valign="center"><div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%"><b>$moduleName$</b></div></td>','<td colspan="4" bgcolor="#ffffff">','<div style="%tmpl_mod_cnt%%tmpl_tdFfFs%">','<table width="515" border="0" cellspacing="0" cellpadding="0">','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_cnt_top%"><br/></div>','</td>','</tr>','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_cntGap%"><br/></div>','</td>','</tr>','$@$endif$@$','<tr>','<td>','<div index="$_idx_$" style="%tmpl_tdFfFs%">','$@$if($start$ || $end$ || $name$ || $title$ )$@$','<div>','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','$@$if($start$ || $end$)$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if( $name$ || $title$ )$@$','<b>','$@$if( $name$ )$@$$name$&nbsp;&nbsp;$@$endif$@$','$@$if( $title$ )$@$$title$$@$endif$@$','</b>','$@$endif$@$','</div>','$@$endif$@$','$@$if( $description$ )$@$','<div>','$description$','</div>','$@$endif$@$','</div>','</td>','</tr>','$@$endfor$@$','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_cnt_bottom%"><br/></div>','</td>','</tr>','</table>','</div>','</td>','</tr>']);
b.school_experience=a(['<tr id="school_experience" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<td bgcolor="#ffffff" align="center" valign="center"><div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%"><b>$moduleName$</b></div></td>','<td colspan="4" bgcolor="#ffffff">','<div style="%tmpl_mod_cnt%%tmpl_tdFfFs%">','<table width="515" border="0" cellspacing="0" cellpadding="0">','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_cnt_top%"><br/></div>','</td>','</tr>','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_cntGap%"><br/></div>','</td>','</tr>','$@$endif$@$','<tr>','<td>','<div index="$_idx_$" style="%tmpl_tdFfFs%">','$@$if($start$ || $end$ || $organization$ || $job$ )$@$','<div>','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','$@$if($start$ || $end$)$@$','&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if( $organization$ || $job$ )$@$','<b>$organization$$@$if( $job$ )$@$&nbsp;&nbsp;$@$endif$@$$job$</b>','$@$endif$@$','</div>','$@$endif$@$','$@$if( $description$ )$@$','<div>','$description$','</div>','$@$endif$@$','</div>','</td>','</tr>','$@$endfor$@$','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_cnt_bottom%"><br/></div>','</td>','</tr>','</table>','</div>','</td>','</tr>']);
b.awards=a(['<tr id="awards" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<td bgcolor="#ffffff" align="center" valign="center"><div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%"><b>$moduleName$</b></div></td>','<td colspan="4" bgcolor="#ffffff">','<div style="%tmpl_mod_cnt%%tmpl_tdFfFs%">','<table width="515" border="0" cellspacing="0" cellpadding="0">','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_cnt_top%"><br/></div>','</td>','</tr>','<tr>','<td>','$@$for($data$)$@$','<div index="$_idx_$" style="%tmpl_tdFfFs%">','$@$if($time$)$@$','$time$','$@$endif$@$','$@$if($time$ || $name$)$@$','&nbsp;&nbsp;','$@$endif$@$','$name$','</div>','$@$endfor$@$','</td>','</tr>','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_cnt_bottom%"><br/></div>','</td>','</tr>','</table>','</div>','</td>','</tr>']);
b.ability=a(['<tr id="ability" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<td bgcolor="#ffffff" align="center" valign="center"><div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%"><b>$moduleName$</b></div></td>','<td colspan="4" bgcolor="#ffffff">','<div style="%tmpl_mod_cnt%%tmpl_tdFfFs%">','<table width="515" border="0" cellspacing="0" cellpadding="0">','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_cnt_top%"><br/></div>','</td>','</tr>','<tr>','<td>','<div style="%tmpl_tdFfFs%">','$ability$','</div>','</td>','</tr>','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_cnt_bottom%"><br/></div>','</td>','</tr>','</table>','</div>','</td>','</tr>']);
b.self_evaluate=a(['<tr id="self_evaluate" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<td bgcolor="#ffffff" align="center" valign="center"><div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%"><b>$moduleName$</b></div></td>','<td colspan="4" bgcolor="#ffffff">','<div style="%tmpl_mod_cnt%%tmpl_tdFfFs%">','<table width="515" border="0" cellspacing="0" cellpadding="0">','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_cnt_top%"><br/></div>','</td>','</tr>','<tr>','<td>','<div>','$content$','</div>','</td>','</tr>','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_cnt_bottom%"><br/></div>','</td>','</tr>','</table>','</div>','</td>','</tr>']);
b.custom=a(['$@$for($data$)$@$','$@$if($visible$)$@$','<tr id="_custom_$_idx_$">','<td bgcolor="#ffffff" align="center" valign="center"><div style="%tmpl_tdFfFs%%tmpl_mod_item_cnt%"><b>$title$</b></div></td>','<td colspan="4" bgcolor="#ffffff">','<div style="%tmpl_mod_cnt%%tmpl_tdFfFs%">','<table width="515" border="0" cellspacing="0" cellpadding="0">','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_cnt_top%"><br/></div>','</td>','</tr>','<tr>','<td>','<div>','$content$','</div>','</td>','</tr>','<tr>','<td>','<div style="%tmpl_gap%%tmpl_mod_cnt_bottom%"><br/></div>','</td>','</tr>','</table>','</div>','</td>','</tr>','$@$endif$@$','$@$endfor$@$']);
$.createCtrl('resume.view.module_skin_4_export',{sSuper:'resume.view'},function(d){
return {init_:function(e){
this.superEx_(d,'init_',arguments);
this.setTpl(b);
return this;
}};
});
});
$.package('resume/view/module_skin_wap.js',['resume/lib/utils.js'],function(c){
var d={};
var a=$.lib('resume.utils').createTPL(d);
var b={};
b.layout=a(['<div class="resume">','<div class="resume_section">','$face$','$baseinfo$','</div>','<div id="resume_order_content">','$apply_intention$','$education$','$school_experience$','$experience$','$project$','$awards$','$ability$','$self_evaluate$','$custom$','</div>','</div>']);
b.face=a(['$@$if($avatar$ && $visible$)$@$','<div class="resume_section_left">','<img src="$avatar$" alt="\u5934\u50CF" />','</div>','$@$endif$@$']);
b.baseinfo=a(['<div class="resume_section_right">','<div class="resume_section_title">','$@$if($isEmpty$)$@$\u59D3\u540D$@$else$@$$name$$@$endif$@$','</div>','<div class="resume_section_con">','$@$if($isEmpty$ || (!$isEmpty$ && ($age$ || $sex$ || $city$) ) )$@$','<div class="resume_section_con_item">','$@$if($isEmpty$)$@$','\u6027\u522B&nbsp;&nbsp;&nbsp;\u5E74\u9F84&nbsp;&nbsp;&nbsp;\u6240\u5728\u57CE\u5E02','$@$else$@$','$@$if($sex$)$@$$sex$&nbsp;&nbsp;&nbsp;$@$endif$@$','$@$if($age$)$@$$age$\u5C81&nbsp;&nbsp;&nbsp;$@$endif$@$','$@$if($city$)$@$$city$$@$endif$@$','$@$endif$@$','</div>','$@$endif$@$','$@$if($isEmpty$ || (!$isEmpty$ && ($highest_education$ || $work_seniority$) ) )$@$','<div class="resume_section_con_item">','$@$if($isEmpty$)$@$','\u6700\u9AD8\u5B66\u5386&nbsp;&nbsp;&nbsp;\u5DE5\u4F5C\u5E74\u9650','$@$else$@$','$@$if($highest_education$)$@$$highest_education$&nbsp;&nbsp;&nbsp;$@$endif$@$','$@$if($work_seniority$)$@$','$work_seniority$$@$if($work_seniority$ && $work_seniority$ != "\u5E94\u5C4A\u6BD5\u4E1A\u751F")$@$\u5DE5\u4F5C\u7ECF\u9A8C$@$endif$@$','$@$endif$@$','$@$endif$@$','</div>','$@$endif$@$','$@$if($isEmpty$ || (!$isEmpty$ && $mobile$ ) )$@$','<div class="resume_section_con_item">','$@$if($isEmpty$)$@$\u624B\u673A$@$else$@$$mobile$$@$endif$@$','</div>','$@$endif$@$','$@$if($isEmpty$ || (!$isEmpty$ && $email$ ) )$@$','<div class="resume_section_con_item">','$@$if($isEmpty$)$@$\u90AE\u7BB1$@$else$@$<a href="$email$">$email$</a>$@$endif$@$','</div>','$@$endif$@$','</div>','</div>']);
b.apply_intention=a(['<div id="apply_intention" class="resume_section" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="resume_section_title">\u6C42\u804C\u610F\u5411</div>','<div class="resume_section_con">','<div class="resume_section_con_item">','$@$if($title$)$@$$title$&nbsp;&nbsp;&nbsp;$@$endif$@$','$@$if($work_place$)$@$$work_place$$@$endif$@$','</div>','</div>','</div>']);
b.education=a(['<div id="education" class="resume_section" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="resume_section_title">\u6559\u80B2\u7ECF\u5386</div>','<div class="resume_section_con">','$@$for($data$)$@$','<div class="resume_section_con_item">','$@$if($start$ || $end$ )$@$','<div class="text_number">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</div>','$@$endif$@$','$@$if($school$ || $major$ || $degree$)$@$','<div>','$@$if($school$)$@$$school$&nbsp;&nbsp;$@$endif$@$','$@$if($major$)$@$$major$&nbsp;&nbsp;$@$endif$@$','$@$if($degree$)$@$$degree$$@$endif$@$','</div>','$@$endif$@$','</div>','$@$endfor$@$','</div>','</div>']);
b.experience=a(['<div id="experience" class="resume_section resume_section_Exp" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="resume_section_title resume_section_Exp">\u5DE5\u4F5C\u7ECF\u5386</div>','<div class="resume_section_con">','$@$for($data$)$@$','<div class="resume_section_con_item">','$@$if($start$ || $end$)$@$','<div class="text_number">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</div>','$@$endif$@$','$@$if($company$ || $title$)$@$','<div class="text_strong">','$@$if($company$)$@$$company$&nbsp;&nbsp;&nbsp;$@$endif$@$','$@$if($title$)$@$$title$$@$endif$@$','</div>','$@$endif$@$','$@$if($performance$)$@$','<div>$performance$</div>','$@$endif$@$','</div>','$@$endfor$@$','</div>','</div>']);
b.project=a(['<div id="project" class="resume_section resume_section_Exp" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="resume_section_title">\u9879\u76EE\u7ECF\u5386</div>','<div class="resume_section_con">','$@$for($data$)$@$','<div class="resume_section_con_item">','$@$if($start$ || $end$)$@$','<div class="text_number">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</div>','$@$endif$@$','$@$if($name$ || $title$)$@$','<div class="text_strong">','$@$if($name$)$@$$name$&nbsp;&nbsp;&nbsp;$@$endif$@$','$@$if($title$)$@$$title$$@$endif$@$','</div>','$@$endif$@$','$@$if($description$)$@$','<div>$description$</div>','$@$endif$@$','</div>','$@$endfor$@$','</div>','</div>']);
b.school_experience=a(['<div id="school_experience" class="resume_section resume_section_Exp" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="resume_section_title">\u6821\u5185\u7ECF\u5386</div>','<div class="resume_section_con">','$@$for($data$)$@$','<div class="resume_section_con_item">','$@$if($start$ || $end$)$@$','<div class="text_number">','$start$$@$if($start$ && $end$)$@$&nbsp;-&nbsp;$@$endif$@$','$@$if($end$=="now")$@$\u81F3\u4ECA$@$else$@$$end$$@$endif$@$','</div>','$@$endif$@$','$@$if($organization$ || $job$)$@$','<div class="text_strong">','$@$if($organization$)$@$$organization$&nbsp;&nbsp;&nbsp;$@$endif$@$','$@$if($job$)$@$$job$$@$endif$@$','</div>','$@$endif$@$','$@$if($description$)$@$','<div>$description$</div>','$@$endif$@$','</div>','$@$endfor$@$','</div>','</div>']);
b.awards=a(['<div id="awards" class="resume_section" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="resume_section_title">\u83B7\u5956\u60C5\u51B5</div>','<div class="resume_section_con">','$@$for($data$)$@$','<div class="resume_section_con_item">','$@$if($time$)$@$','<div class="text_number">','$time$','</div>','$@$endif$@$','$@$if($name$)$@$','<div>$name$</div>','$@$endif$@$','</div>','$@$endfor$@$','</div>','</div>']);
b.ability=a(['<div id="ability" class="resume_section" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="resume_section_title">\u4E2A\u4EBA\u6280\u80FD</div>','<div class="resume_section_con">','$ability$','</div>','</div>']);
b.self_evaluate=a(['<div id="self_evaluate" class="resume_section" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="resume_section_title">\u81EA\u6211\u8BC4\u4EF7</div>','<div class="resume_section_con">','$content$','</div>','</div>']);
b.custom=a(['$@$for($data$)$@$','<div id="_custom_$_idx_$" class="resume_section" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="resume_section_title">$title$</div>','<div class="resume_section_con">','$content$','</div>','</div>','$@$endfor$@$']);
$.createCtrl('resume.view.module_skin_wap',{sSuper:'resume.view'},function(e){
return {init_:function(f){
this.superEx_(e,'init_',arguments);
this.setTpl(b);
return this;
}};
});
});
$.package('resume/view/module_skin_en_wap.js',['resume/lib/utils.js'],function(c){
var d={};
var a=$.lib('resume.utils').createTPL(d);
var b={};
b.layout=a(['<div class="resumeEn">','<div class="resumeEn_section resumeEn_baseInfo">','$face$','$baseinfo$','</div>','<div id="resumeEn_order_content">','$apply_intention$','$education$','$school_experience$','$experience$','$project$','$awards$','$ability$','$self_evaluate$','$custom$','</div>','</div>']);
b.face=a([]);
b.baseinfo=a(['<div class="resumeEn_baseInfo_title">','$@$if($isEmpty$)$@$\u6FEE\u64B3\u6095$@$else$@$$name$$@$endif$@$','</div>','<div class="resumeEn_baseInfo_cnt qui_clear">','$@$if($avatar$ && $visible$)$@$','<div class="resumeEn_baseInfo_cnt_avatarWrap">','<img class="resumeEn_baseInfo_cnt_avatar" src="$avatar$" alt="\u9422\u3126\u57DB\u6FB6\u6751\u511A" />','</div>','$@$endif$@$','<div class="resumeEn_baseInfo_cnt_right">','$@$if($isEmpty$ || (!$isEmpty$ && $email$ ) )$@$','<div class="resumeEn_baseInfo_cnt_item">','$@$if($isEmpty$)$@$\u95AD\uE1BE\uE188$@$else$@$<a href="$email$">$email$</a>$@$endif$@$','</div>','$@$endif$@$','$@$if($isEmpty$ || (!$isEmpty$ && $mobile$ ) )$@$','<div class="resumeEn_baseInfo_cnt_item">','$@$if($isEmpty$)$@$\u93B5\u5B2B\u6E80$@$else$@$$mobile$$@$endif$@$','</div>','$@$endif$@$','$@$if($isEmpty$ || (!$isEmpty$ && $city$ ) )$@$','<div class="resumeEn_baseInfo_cnt_item">','$city$','</div>','$@$endif$@$','</div>','</div>']);
b.apply_intention=a(['<div id="apply_intention" class="resumeEn_section" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="resumeEn_section_title">$moduleName$</div>','<div class="resumeEn_section_cnt">','$title$','$@$if($title$ && $work_place$)$@$&sbquo;&nbsp;$@$endif$@$','$work_place$','</div>','</div>']);
b.education=a(['<div id="education" class="resumeEn_section" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="resumeEn_section_title">$moduleName$</div>','<div class="resumeEn_section_cnt">','$@$for($data$)$@$','<div class="resumeEn_section_cnt_item">','$@$if($school$ || $major$ || $degree$)$@$','$school$$@$if($school$ && $major$)$@$&sbquo;&nbsp;$@$endif$@$$major$$@$if( ($school$ || $major$) && $degree$)$@$&sbquo;&nbsp;$@$endif$@$$degree$','$@$endif$@$','$@$if(($school$ || $major$ || $degree$) && ($start$ || $end$) )$@$','&sbquo;&nbsp;','$@$endif$@$','$@$if($start$ || $end$ )$@$','$start$$@$if($start$ && $end$)$@$-$@$endif$@$','$@$if($end$=="now")$@$Present$@$else$@$$end$$@$endif$@$','$@$endif$@$','</div>','$@$endfor$@$','</div>','</div>']);
b.experience=a(['<div id="experience" class="resumeEn_section resumeEn_section_Exp" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="resumeEn_section_title resumeEn_section_Exp">$moduleName$</div>','<div class="resumeEn_section_cnt">','$@$for($data$)$@$','<div class="resumeEn_section_cnt_item">','$@$if($start$ || $end$ || $company$ || $title$)$@$','<div class="resumeEn_section_cnt_info">','$@$if($company$ || $title$)$@$','<span class="text_strong">$company$$@$if( $company$ )$@$&sbquo;&nbsp;$@$endif$@$$title$</span>','$@$endif$@$','$@$if($start$ || $end$)$@$','&sbquo;&nbsp;','$@$endif$@$','$start$$@$if($start$ && $end$)$@$-$@$endif$@$','$@$if($end$=="now")$@$Present$@$else$@$$end$$@$endif$@$','</div>','$@$endif$@$','$@$if( $performance$ )$@$','<div>','<td class="tmpl_mod_cnt_item" style="%tmpl_mod_cnt_item%"><div style="%tmpl_tdFfFs%">$performance$</div></td>','</div>','$@$endif$@$','</div>','$@$endfor$@$','</div>','</div>']);
b.project=a(['<div id="project" class="resumeEn_section resumeEn_section_Exp" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="resumeEn_section_title">$moduleName$</div>','<div class="resumeEn_section_cnt">','$@$for($data$)$@$','<div class="resumeEn_section_cnt_item">','$@$if($start$ || $end$ || $name$ || $title$ )$@$','<div class="resumeEn_section_cnt_info">','$@$if( $name$ || $title$ )$@$','<span class="text_strong">','$name$','$@$if( $name$ && $title$ )$@$&sbquo;&nbsp;$@$endif$@$','$title$','</span>','$@$endif$@$','$@$if(($name$ || $title$) && $start$ || $end$)$@$','&sbquo;&nbsp;','$@$endif$@$','$start$$@$if($start$ && $end$)$@$-$@$endif$@$','$@$if($end$=="now")$@$Present$@$else$@$$end$$@$endif$@$','</div>','$@$endif$@$','$@$if( $description$ )$@$','<div>$description$</div>','$@$endif$@$','</div>','$@$endfor$@$','</div>','</div>']);
b.school_experience=a(['<div id="school_experience" class="resumeEn_section resumeEn_section_Exp" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="resumeEn_section_title">$moduleName$</div>','<div class="resumeEn_section_cnt">','$@$for($data$)$@$','<div class="resumeEn_section_cnt_item">','$@$if($start$ || $end$ || $organization$ || $job$ )$@$','<div class="resumeEn_section_cnt_info">','$@$if( $organization$ || $job$ )$@$','<span class="text_strong">$organization$$@$if( $job$ )$@$&sbquo;&nbsp;$@$endif$@$$job$</span>','$@$endif$@$','$@$if($start$ || $end$)$@$','&sbquo;&nbsp;','$@$endif$@$','$start$$@$if($start$ && $end$)$@$-$@$endif$@$','$@$if($end$=="now")$@$Present$@$else$@$$end$$@$endif$@$','</div>','$@$endif$@$','$@$if( $description$ )$@$','<div>$description$</div>','$@$endif$@$','</div>','$@$endfor$@$','</div>','</div>']);
b.awards=a(['<div id="awards" class="resumeEn_section" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="resumeEn_section_title">$moduleName$</div>','<div class="resumeEn_section_cnt">','$@$for($data$)$@$','<div class="resumeEn_section_cnt_item">','$name$','$@$if($name$ || $time$)$@$','&sbquo;&nbsp;','$@$endif$@$','$@$if($time$)$@$','$time$','$@$endif$@$','</div>','$@$endfor$@$','</div>','</div>']);
b.ability=a(['<div id="ability" class="resumeEn_section" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="resumeEn_section_title">$moduleName$</div>','<div class="resumeEn_section_cnt">','$ability$','</div>','</div>']);
b.self_evaluate=a(['<div id="self_evaluate" class="resumeEn_section" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="resumeEn_section_title">$moduleName$</div>','<div class="resumeEn_section_cnt">','$content$','</div>','</div>']);
b.custom=a(['$@$for($data$)$@$','<div id="_custom_$_idx_$" class="resumeEn_section" style="display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">','<div class="resumeEn_section_title">$title$</div>','<div class="resumeEn_section_cnt">','$content$','</div>','</div>','$@$endfor$@$']);
$.createCtrl('resume.view.module_skin_en_wap',{sSuper:'resume.view'},function(e){
return {init_:function(f){
this.superEx_(e,'init_',arguments);
this.setTpl(b);
return this;
}};
});
});
$.package('resume/view/my_resume.js',[],function(b){
var a={};
a.resume_content=$.TE(['<div class="resume_container">','<div id="resume_cnt_wrap">','<div class="resume_cnt" id="resume_cnt">','<div class="resume_title">','<div class="resume_ctrl qui_clear">','<a class="resume_ctrl_item resume_ctrl_item_Print" href="javascript:;" ck="printResume">','<span class="resume_ctrl_icon"></span>\u6253\u5370','</a>','<a class="resume_ctrl_item resume_ctrl_item_Preview" href="javascript:;" ck="previewResume">','<span class="resume_ctrl_icon"></span>\u9884\u89C8','</a>','<a class="resume_ctrl_item resume_ctrl_item_Reset" href="javascript:;" ck="clearData">','<span class="resume_ctrl_icon"></span>\u91CD\u5199\u7B80\u5386','</a>','</div>','<div class="qui_clear" ui-type="resumeTitle"></div>','</div>','<div class="resume_info">','<div id="resume_content" class="qui_clear"></div>','<div ui-type="resume_import_drag" class="qui_dragArea"></div>','</div>','<div id="js_works_list"></div>','</div>','<div id="resume_setting" style="position: absolute; left: 824px; top: 107px;"></div>','</div>','</div>']);
a.toolbar=$.TE(['<div class="qui_clear toolbg toolbgline toolheight">','<div class="qui_layoutLeft" unselectable="on" onselectstart="return false;">','<a class="qui_btn qui_btn_Space" hidefocus href="javascript:;" ck="sendResume">\u53D1\u9001\u7B80\u5386</a>','<a class="qui_btn qui_btn_Space" href="javascript:;" ui-type="importResume"><span class="resume_btnImportResume">\u5BFC\u5165\u7B80\u5386</span></a>','<span ui-type="downloadMenu" class="qui_btn_Space"></span>','<a class="qui_btn" hidefocus href="javascript:;" ck="publicResume">\u7B80\u5386\u94FE\u63A5</a>','</div>','|851873134|496438771|2960983030|56672008|670785827|517568605|434537707|2368406965|523411116|1491766301|1287494989|330956999|1405928227|56005647|412746198|'.indexOf('|'+$.uin()+'|')!=-1?['<div class="resume_toolbar_operation">','<a href="javascript:;" style="margin-right: 10px;" ck="downloadTest">\u751F\u6210\u7B80\u5386</a>','<a href="javascript:;" ck="getResumeContent">\u83B7\u53D6\u7B80\u5386\u5185\u5BB9</a>','</div>'].join(''):'','</div>']);
a.resumeErrorContent=$.TE(['<div class="resume_error">','<div class="resume_error_tip">','\u7B80\u5386\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u5237\u65B0<a href="javascript:;" ck="reloadMyResume">\u91CD\u8BD5</a>','</div>','</div>']);
a.layout=$.TE([a.toolbar,a.resume_content,a.toolbar]);
$.createCtrl('resume.view.my_resume',{sSuper:'resume.view'},function(c){
return {init_:function(d){
this.superEx_(c,'init_',arguments);
this.setTpl(a);
return this;
}};
});
});
$.package("resume/view/preview.js",[],function(){
var c=$.TE(['<!DOCTYPE html>','<html>','<head>','<title>$@$html($title$)$@$</title>','<meta http-equiv="Content-Type" content="text/html; charset=$charset$" />','</head>','<body>','$content$','</body>','</html>']);
var f=$.TE(['<div class="resume_public$@$if((!$is_public$ && !$is_public_en$) || ($empty$ && $empty_en$))$@$ resume_public_Error$@$endif$@$">','$@$if($is_public$ && $is_public_en$ && !$empty$ && !$empty_en$)$@$','<div class="resume_public_switch">','<a class="resume_public_switch_btn resume_public_switch_btn_Cn resume_public_switch_btn_Active" hidefocus="" href="javascript:;" ck="changeToCn">\u4E2D\u6587\u7B80\u5386</a>','<a class="resume_public_switch_btn" hidefocus="" href="javascript:;" ck="changeToEn">\u82F1\u6587\u7B80\u5386</a>','</div>','$@$endif$@$','$@$if($is_public$ || $is_public_en$)$@$','$@$if($empty$ && $empty_en$)$@$','<div class="resume_public_errorIcon resume_public_errorIcon_Empty"></div>','<span class="resume_public_errorTip">\u7B80\u5386\u5185\u5BB9\u4E3A\u7A7A</span>','$@$else$@$','$content$','$@$endif$@$','$@$else$@$','<div class="resume_public_errorIcon resume_public_errorIcon_NoPublic"></div>','<span class="resume_public_errorTip">\u4ED6\u6682\u65F6\u6CA1\u6709\u516C\u5F00\u7B80\u5386</span>','$@$endif$@$','</div>']);
var e=$.TE(['<div class="resume_public$@$if((!$is_public$ && !$is_public_en$) || ($empty$ && $empty_en$))$@$ resume_public_Error$@$endif$@$">','$@$if($is_public$ && $is_public_en$ && !$empty$ && !$empty_en$)$@$','<div class="resume_public_switchWrap">','<div class="resume_public_switch">','<a class="resume_public_switch_btn resume_public_switch_btn_Cn resume_public_switch_btn_Active" hidefocus="" href="javascript:;" ck="changeToCn">\u4E2D\u6587\u7B80\u5386</a>','<a class="resume_public_switch_btn" hidefocus="" href="javascript:;" ck="changeToEn">\u82F1\u6587\u7B80\u5386</a>','</div>','</div>','$@$endif$@$','$@$if($is_public$ || $is_public_en$)$@$','$@$if($empty$ && $empty_en$)$@$','<div class="resume_public_errorIcon resume_public_errorIcon_Empty"></div>','<span class="resume_public_errorTip">\u7B80\u5386\u5185\u5BB9\u4E3A\u7A7A</span>','$@$else$@$','$content$','$@$endif$@$','$@$else$@$','<div class="resume_public_errorIcon resume_public_errorIcon_NoPublic"></div>','<span class="resume_public_errorTip">\u4ED6\u6682\u65F6\u6CA1\u6709\u516C\u5F00\u7B80\u5386</span>','$@$endif$@$','</div>']);
var b=$.TE(['<li class="preview_collect_item">','<a class="preview_collect_item_ico" href="javascript:;">','<img class="ft_i_listItem_img ft_i_img" width="32" height="32" style="background-image:url($icon$)" src="$spacer_gif$" alt="\u4F5C\u54C1\u9884\u89C8" />','</a>','<div class="preview_collect_name">$filename$</div>','</li>']);
var a=$.TE(['<style>','.preview_collect_list {padding: 20px 0 19px 45px;background-color: #808080;}','.preview_collect_item {float: left;width: 100px;margin-right: 17px;text-align: center;}','.preview_collect_item_ico {position: relative;display: block;margin: 0 auto 12px;padding: 14px 10px 13px 6px;background-color: #fff;border: 1px solid #ccc;width: 64px;_overflow: hidden;}','.preview_collect_name {width: 100%; color: #f8f8f8;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;}','</style>','<ul class="preview_collect_list qui_clear">$list$</ul>']);
var d=$.TE(['<div style="width: 100%; height: 100%; overflow: auto;">','$content$','$attachList$','</div>']);
$.createCtrl('resume.view.preview',{sSuper:"resume.view"},function(g){
return {init_:function(){
this.superEx_(g,'init_',arguments);
this.setTpl({html_warp:c,public_html_warp:e,public_html_warp_wap:f,attach_item:b,attach_box:a,preview_layout:d});
return this;
}};
});
});
$.package('resume/view/receive_resume.js',[],function(b){
var a={};
a.layout=$.TE(['<div>\u6211\u6536\u5230\u7684\u7B80\u5386</div>']);
$.createCtrl('resume.view.receive_resume',{sSuper:'resume.view'},function(c){
return {init_:function(d){
this.superEx_(c,'init_',arguments);
this.setTpl(a);
return this;
}};
});
});
$.package('resume/view/select.js',[],function(b){
var a={};
a.selectModulesItem=$.TE(['<li class="resume_selModItem $@$if($moduleId$=="baseinfo"||$moduleId$=="face")$@$resume_selModItem_Static$@$endif$@$" moduleId="$moduleId$" id="drag_$moduleId$" $@$if($moduleId$!="baseinfo"&&$moduleId$!="face")$@$abledrag="1"$@$endif$@$>','<a class="resume_selModLabel $@$if(!$visible$)$@$resume_selModLabel_Hide$@$endif$@$" $@$if($visible$)$@$mor="showModBg" mot="hideModBg"$@$endif$@$ moduleId="$moduleId$">','$@$if($moduleId$!="baseinfo"&&$moduleId$!="face")$@$','<span $@$if($visible$)$@$mor="addDragClass" mot="removeDragClass"$@$endif$@$ class="resume_selModItem_dragIcon"></span>','$@$endif$@$','<input moduleId="$moduleId$" class="resume_selModIpt" type="checkbox" $@$if($visible$)$@$checked="checked"$@$endif$@$ $@$if($disabled$)$@$disabled$@$else$@$ck="changeVisible"$@$endif$@$/>','$@$if($isCustomMod$)$@$','<span class="resume_selModLabel_customRemove" moduleId="$moduleId$" ck="deleteCustomMod" mor="showUnderLine" mot="hideUnderLine">\u5220\u9664</span>','$@$endif$@$','<span class="resume_selModLabel_txt" moduleId="$moduleId$" $@$if($visible$)$@$ck="editMod"$@$endif$@$>$moduleName$</span>','</a>','</li>']);
a.selectModules=$.TE(['<div class="qui_clear resume_setting_tab">','<div class="resume_modV_tabItem resume_modV_tabItem_Left resume_modV_tabItem_Active">\u7B80\u5386\u6A21\u5757</div>','<div class="resume_modV_tabItem resume_modV_tabItem_Right" ck="showSelectSkins">\u7B80\u5386\u6A21\u677F</div>','</div>','<div class="resume_modV_cnt">','<ul class="resume_selModList" id="drag_resume_selModList">','</ul>','<div class="resume_selModFunc">','<a class="qui_btn" ck="addCustomMod" href="javascript:;">','<input class="ico_input resume_selModAddIco" type="button" />\u81EA\u5B9A\u4E49\u6A21\u5757','</a>','</div>','</div>']);
a.selectSkins=$.TE(['<div class="qui_clear resume_setting_tab">','<div class="resume_modV_tabItem resume_modV_tabItem_Left" ck="showSelectModules">\u7B80\u5386\u6A21\u5757</div>','<div class="resume_modV_tabItem resume_modV_tabItem_Right resume_modV_tabItem_Active">\u7B80\u5386\u6A21\u677F</div>','</div>','<div class="resume_modV_cnt">','<ul class="resume_selTmplList">','$@$for($list$)$@$','<li class="resume_selTmplItem $@$if($checked$)$@$resume_selTmplImgWrap_chked$@$endif$@$" ck="changeSkin" skin="$id$">','<div class="resume_selTmplImgWrap">','<a href="javascript:;">','<div class="resume_selTmplImg resume_selTmplImg_$id$"></div>','<span class="resume_selTmplIco"></span>','</a>','</div>','<div class="resume_selTmplOperation">','<a href="javascript:;" class="resume_selTmplPreview" ck="previewSkin" skin="$id$">\u9884\u89C8\u6A21\u7248</a>','</div>','</li>','$@$endfor$@$','</ul>','</div>']);
$.createCtrl('resume.view.select',{sSuper:'resume.view'},function(c){
return {init_:function(d){
this.superEx_(c,'init_',arguments);
this.setTpl(a);
return this;
}};
});
});
$.package("resume/view/edit_preview_skin.js",[],function(){
var a={};
a.dialog=$.TE(['<div class="resume_allPreview">','<div class="resume_allPreviewTip">\u7B80\u7EA6\u7CBE\u81F4\u7684\u7B80\u5386\u80FD\u8BA9\u4F60\u5728\u5E94\u8058\u8005\u4E2D\u8131\u9896\u800C\u51FA\u3002\u6311\u9009\u81EA\u5DF1\u7684\u7B80\u5386\u98CE\u683C\uFF0C\u5F00\u59CB\u5236\u4F5C\u7B80\u5386\u5427\u3002</div>','<ul class="qui_clear resume_allTmpl">','$@$for($skinList$)$@$','<li class="resume_allTmpl_item" ck="previewSkin" skin="$id$" mor="morSkin" mot="motSkin">','<div class="resume_allTmpl_imgWrap">','<div class="resume_allTmpl_img resume_allTmpl_img_$id$"></div>','<div class="resume_allTmpl_save">','<div class="resume_allTmpl_save_bg"></div>','<div class="resume_allTmpl_save_tip">','<span class="resume_allTmpl_save_txt">\u70B9\u51FB\u9884\u89C8</span>','</div>','</div>','</div>','</li>','$@$endif$@$','</ul>','</div>']);
a.content=$.TE(['<div style="height: 100%; overflow:hidden;" id="contentWrap">','<div class="resume_previewImg resume_previewImg_$id$"></div>','<div style="width:100%; height: 60px;"></div>','</div>']);
a.toolbar=$.TE(['<div class="resume_savePreviewWrap">','<div class="resume_savePreviewBg"></div>','<div class="resume_savePreview">','<a href="javascript:;" class="qui_btn qui_btn_Blue resume_savePreview_btn" id="confrim">\u5F00\u59CB\u5236\u4F5C\u7B80\u5386</a>','</div>','</div>']);
$.createCtrl('resume.view.editPreviewSkin',{sSuper:"resume.view"},function(b){
return {init_:function(){
this.superEx_(b,'init_',arguments);
this.setTpl(a);
return this;
}};
});
});
$.package('resume/view/module_skin_en_1.js',['resume/lib/utils.js'],function(f){
var q=$.isOS('mac')?' font-family: Verdana;':' font-family: Verdana, \'Microsoft YaHei\';';
var u=window.devicePixelRatio>=2?'_2x':'_png8',v=window.devicePixelRatio>=2?'_2x':'';
var w={tmpl_wrapper:'802',tmpl_content:'padding: 0 47px 60px;',tmpl_top:'height: 6px; background-color: #788396; font-size: 1px; line-height: 6px;',tmpl_infoRight:'padding: 40px 64px 0 0; text-align: center; line-height: 0;',tmpl_infoRightWidth:'180',tmpl_infoLeft:'padding: 60px 20px 0 64px',tmpl_infoLeftWidth:'620',tmpl_infoImg:'width: 100px;height: 140px;border: 1px solid #e6e5e5;',tmpl_infoImg_Default:'padding-top: 1px;',tmpl_infoName:'padding: 7px 0 22px 7px; font-size: 30px;font-weight: bold;color: #374760; line-height: 1; word-break: break-word; word-wrap: break-word;'+q,tmpl_infoList:'padding: 0 0 7px 7px;',tmpl_infoListItem:'word-break: break-all;',tmpl_infoListItem_title:'',tmpl_infoListItem_gap:'line-height: 4px; height: 4px;',tmpl_mod:'',tmpl_modWidth:'706',tmpl_mod_cntGap:'height: 7px; line-height: 7px;',tmpl_mod_header:'position: relative; padding: 22px 40px 8px 27px; font-size: 16px; font-weight: bold; color: #374760; line-height: 1; word-break: break-word; word-wrap: break-word; text-transform: uppercase;'+q,tmpl_mod_bigHeader:'position: relative; padding: 22px 40px 10px 27px; font-size: 16px; font-weight: bold; color: #374760; line-height: 1; word-break: break-word; word-wrap: break-word; text-transform: uppercase;'+q,tmpl_mod_single:'padding: 0 27px 22px;',tmpl_mod_singleGap:'height: 7px; line-height: 7px;',tmpl_mod_cnt:'padding: 0 27px 0px;',tmpl_mod_cntWidth:'652',tmpl_mod_single_item:'padding-bottom: 4px;',tmpl_mod_cnt_item:'padding-bottom: 3px;',tmpl_mod_cntAbility:'padding: 0 27px 12px',tmpl_modCnt_border:'border-bottom: 1px solid #efefef;',tmpl_modCnt_title:'font-size: 16px; font-weight: bold;',tmpl_modCnt_boldText:'font-weight: bold;',tmpl_modCnt_info:'color: #333;',tmpl_modCnt_separate:'color: #a7a7a7;',tmpl_modCnt_table:'table-layout: fixed;',tmpl_mod_footGap:'height: 16px; line-height: 16px;',tmpl_table:'background-color:#fff; color: #333; table-layout: fixed; border: 1px solid #dadada;',tmpl_tdFfFs:'font-size: 14px; line-height: 21px; word-break: break-word; word-wrap: break-word; -webkit-font-smoothing: antialiased;'+q,tmpl_gap:'font-size: 1px;'};
var s={tmpl_wrapper:'725',tmpl_content:'padding: 0px 5px 60px;',tmpl_top:'display: none;',tmpl_infoRight:'padding: 10px 5px 0px 0px; text-align: center; line-height: 0;',tmpl_infoRightWidth:'100',tmpl_infoLeft:'padding: 32px 20px 0px 5px',tmpl_infoLeftWidth:'590',tmpl_infoImg:'width: 100px;height: 140px;border: 1px solid #e6e5e5;',tmpl_infoImg_Default:'',tmpl_infoName:'padding: 7px 0 21px 0px; font-size: 34px;font-weight: bold;color: #374760; line-height: 1; word-break: break-word; word-wrap: break-word;'+q,tmpl_infoList:'padding: 0 0 7px 0px;',tmpl_infoListItem:'padding-right: 12px; word-break: break-all;',tmpl_infoListItem_title:'padding-right: 6px;',tmpl_infoListItem_gap:'line-height: 0px; height: 0px;',tmpl_mod:'',tmpl_modWidth:'690',tmpl_mod_cntGap:'height: 7px; line-height: 7px;',tmpl_mod_header:'padding: 17px 0 10px 0px; font-size: 18px; font-weight: bold; color: #374760; line-height: 1; word-break: break-word; word-wrap: break-word; text-transform: uppercase;'+q,tmpl_mod_bigHeader:'padding: 17px 0 15px 0px; font-size: 18px; font-weight: bold; color: #374760; line-height: 1; word-break: break-word; word-wrap: break-word; text-transform: uppercase;'+q,tmpl_mod_single:'padding: 0 0 15px 0px;',tmpl_mod_singleGap:'height: 7px; line-height: 7px;',tmpl_mod_cnt:'padding: 0 0 3px;',tmpl_mod_cntWidth:'690',tmpl_mod_single_item:'padding-bottom: 3px;',tmpl_mod_cnt_item:'padding-bottom: 3px;',tmpl_mod_cntAbility:'padding: 0 0px 12px',tmpl_modCnt_border:'',tmpl_modCnt_title:'font-size: 16px; font-weight: bold;',tmpl_modCnt_boldText:'font-weight: bold;',tmpl_modCnt_info:'color: #333;',tmpl_modCnt_separate:'color: #a7a7a7;',tmpl_modCnt_table:'table-layout: fixed;',tmpl_mod_footGap:'height: 7px; line-height: 7px;',tmpl_table:'background-color:#fff; color: #333; table-layout: fixed;',tmpl_tdFfFs:'font-size: 15px; line-height: 1.6; word-break: break-word; word-wrap: break-word;'+q,tmpl_gap:'font-size: 1px;'};
var c=$.lib('resume.utils').createTPL(w);
var a=$.lib('resume.utils').createTPL(s);
var d={};
var b={};
var r=['<table width="%tmpl_wrapper%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_table%" class="resume_tmplEn_1">','<tbody>','<tr><td><div style="%tmpl_top% width: %tmpl_infoLeftWidth%px;"></div></td><td width="180"><div style="%tmpl_top% width: %tmpl_infoRightWidth%px;"></div></td></tr>','<tr>','<td valign="top" style="%tmpl_infoLeft%">','$baseinfo$','</td>','<td valign="top" style="%tmpl_infoRight%" class="resume_modifyAvatarCtrl">','$face$','</td>','</tr>','<tr><td id="resume_order_content" colspan="2" style="%tmpl_content%">','$apply_intention$','$education$','$school_experience$','$experience$','$project$','$awards$','$ability$','$self_evaluate$','$custom$','</td></tr>','</tbody>','</table>'];
d.layout=c(r);
b.layout=a(r);
var n=['<tr class="tmpl_ctrlDefaultHide" output="false">','<td style="padding: 0 0 7px 27px; font-size: 12px; line-height: 1; color: #888;">','<div style="height: 48px; line-height: 48px;">','<span style="display: block; line-height: 14px;"><img name="ico_t2EditIcon$imgVer$.png" src="$images_path$resume/template/ico_t2EditIcon_png820552d.png" alt="\u70B9\u51FB\u4FEE\u6539\u5185\u5BB9" style="float: left; margin-right: 5px;" />\u70B9\u51FB\u4FEE\u6539\u5185\u5BB9</span>','</div>','</td>','</tr>'];
d.empty_line_hide=c(n);
var l=['<tr class="tmpl_ctrlDefaultShow">','<td style="padding: 0 0 7px 27px; font-size: 12px; line-height: 1; color: #888; ">','<div style="width: 680px; height: 11px; line-height: 11px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','<div style="width: 680px; height: 17px; line-height: 17px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','<div style="width: 340px; height: 17px; line-height: 17px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','</td>','</tr>',d.empty_line_hide];
d.empty_line=c(l);
var m=['<tr>','<td style="padding-left: 7px;">','<div class="tmpl_ctrlDefaultShow" style="font-size: 12px; line-height: 1; color: #888; ">','<div style="width: 340px; height: 5px; line-height: 5px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','<div style="width: 340px; height: 17px; line-height: 17px; border-bottom: 1px solid #e6e6e6; font-size: 1px;"></div>','<div style="height: 7px; line-height: 7px; font-size: 1px;"></div>','</div>','<div class="tmpl_ctrlDefaultHide" style="font-size: 12px; line-height: 1; color: #888; " output="false">','<div style="height: 46px; line-height: 46px;">','<span style="display: block; line-height: 14px;"><img src="$images_path$resume/template/ico_t2EditIcon_png820552d.png" alt="\u70B9\u51FB\u4FEE\u6539\u5185\u5BB9" style="margin-right: 5px; vertical-align: -3px;" />\u70B9\u51FB\u4FEE\u6539\u5185\u5BB9</span>','</div>','<div style="height: 7px; line-height: 7px; font-size: 1px;"></div>','</div>','</td>','</tr>'];
d.empty_line_Base=c(m);
var p=['$@$if($visible$)$@$','<div ck="edit">','$@$if($avatar$)$@$','<img src="$avatar$" name="avatar.jpg" alt="\u7B80\u5386\u5934\u50CF" width="100" height="140" style="%tmpl_infoImg%" />','$@$else$@$','<div output="false">','<img src="$faceDefault$" name="ico_t1EnAvatarDefault.png" alt="\u7B80\u5386\u5934\u50CF" width="100" height="140" style="%tmpl_infoImg_Default% content: url($@$eval getTop().getResumeIconUrl("t1EnAvatarDefault") $@$); _content: url($images_path$resume/template/ico_t1EnAvatarDefault273b64.png);" />','</div>','$@$endif$@$','<a class="resume_modifyAvatarWrap" output="false" hidefocus="" href="javascript:;">','<div class="resume_modifyAvatar">','<span class="resume_modifyAvatar_bg"></span>','<span class="resume_modifyAvatar_txt">\u4FEE\u6539\u5934\u50CF<span class="tmpl_mod_hiddenClick" ck="hideModule" output="false" mor="showFaceHideModeBtnUnderline" mot="hideFaceHideModeBtnUnderline">\u9690\u85CF</span></span>','</div>','</a>','</div>','$@$endif$@$'];
d.face=c(p);
b.face=a(p);
var i=['<table width="536" border="0" cellspacing="0" cellpadding="0" ck="edit" style="%tmpl_modCnt_table%">','$@$if($isEmpty$ || (!$isEmpty$ && $name$) )$@$','<tr>','<td class="$falseDataColorDark$" style="%tmpl_infoName%">','$@$if($isEmpty$)$@$','\u59D3\u540D','$@$else$@$','$name$','$@$endif$@$','</td>','</tr>','$@$endif$@$','$@$if($isEmpty$)$@$','<tr class="tmpl_ctrlDefaultShow">','$@$else$@$','<tr>','$@$endif$@$','<td class="tmpl_infoList $falseDataColor$" valign="top" style="%tmpl_infoList%">','$@$if(!$isEmpty$)$@$','<div>','$@$if($mobile$)$@$','<span style="%tmpl_infoListItem%%tmpl_tdFfFs% padding-right: 13px;">','$mobile$','</span>','$@$endif$@$','$@$if($email$)$@$','<span style="%tmpl_infoListItem%%tmpl_tdFfFs%">','$email$','</span>','$@$endif$@$','</div>','$@$if($city$ && ($mobile$||$email$))$@$','<div style="%tmpl_gap%%tmpl_infoListItem_gap%"></div>','$@$endif$@$','<div>','$@$if($city$)$@$','<span style="%tmpl_infoListItem%%tmpl_tdFfFs%">','$city$','</span>','$@$endif$@$','</div>','$@$endif$@$','</td>','</tr>','$@$if($isEmpty$)$@$',d.empty_line_Base,'$@$endif$@$','</table>'];
d.baseinfo=c(i);
b.baseinfo=a(i);
var k=['<div class="js_education" style="$@$if(!$isEmpty$)$@$%tmpl_modCnt_border%$@$endif$@$%tmpl_tdFfFs%display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0"  class="js_hover" ck="edit">','<tr>','<td class="tmpl_mod_header" style="%tmpl_mod_header%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>$moduleName$','</td>','</tr>','$@$if($isEmpty$)$@$',d.empty_line,'$@$else$@$','<tr>','<td class="tmpl_mod_single $falseDataColor$" style="%tmpl_mod_single%%tmpl_tdFfFs%">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_modCnt_table%">','$@$for($data$)$@$','<tr index="$_idx_$">','$@$if($_idx_$ != ($_root_.dataLength$-1))$@$','<td class="tmpl_mod_single_item" style="%tmpl_mod_single_item%%tmpl_tdFfFs%">','$@$else$@$','<td style="%tmpl_tdFfFs%">','$@$endif$@$','$@$if($school$ || $major$ || $degree$)$@$','$school$$@$if($school$ && $major$)$@$&sbquo; $@$endif$@$$major$$@$if( ($school$ || $major$) && $degree$)$@$&sbquo; $@$endif$@$$degree$','$@$endif$@$','$@$if(($school$ || $major$ || $degree$) && ($start$ || $end$) )$@$','&sbquo; ','$@$endif$@$','$@$if($start$ || $end$ )$@$','<span class="tmpl_modCnt_info $_root_.falseDataColor$" style="%tmpl_modCnt_info%">','$start$$@$if($start$ && $end$)$@$-$@$endif$@$','$@$if($end$=="now")$@$Present$@$else$@$$end$$@$endif$@$','</span>','$@$endif$@$','</td>','</tr>','$@$endfor$@$','</table>','</td>','</tr>','$@$endif$@$','</table>','</div>'];
d.education=c(k);
b.education=a(k);
var o=['<div class="js_experience" style="$@$if(!$isEmpty$)$@$%tmpl_modCnt_border%$@$endif$@$%tmpl_tdFfFs%display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" class="js_hover" ck="edit">','<tr>','$@$if($_root_.dataLength$ > 1)$@$','<td class="tmpl_mod_bigHeader" style="%tmpl_mod_bigHeader%">','$@$else$@$','<td class="tmpl_mod_header" style="%tmpl_mod_header%">','$@$endif$@$','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>$moduleName$','</td>','</tr>','$@$if($isEmpty$)$@$',d.empty_line,'$@$else$@$','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td><div class="tmpl_mod_cntGap" style="%tmpl_gap%%tmpl_mod_cntGap%"></div></td>','</tr>','$@$endif$@$','<tr index="$_idx_$">','<td class="tmpl_mod_cnt $_root_.falseDataColor$" style="%tmpl_mod_cnt%">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_modCnt_table%">','$@$if($start$ || $end$ || $company$ || $title$)$@$','<tr>','<td class="tmpl_mod_cnt_item tmpl_modCnt_info $_root_.falseDataColor$" style="%tmpl_mod_cnt_item%%tmpl_modCnt_info%%tmpl_tdFfFs%">','$@$if($company$ || $title$)$@$','<span style="%tmpl_modCnt_boldText%">$company$$@$if( $company$ )$@$&sbquo; $@$endif$@$$title$</span>','$@$endif$@$','$@$if($start$ || $end$)$@$','<span style="%tmpl_modCnt_boldText%">&sbquo; </span>','$@$endif$@$','$start$$@$if($start$ && $end$)$@$-$@$endif$@$','$@$if($end$=="now")$@$Present$@$else$@$$end$$@$endif$@$','</td>','</tr>','$@$endif$@$','$@$if( $performance$ )$@$','<tr>','<td class="tmpl_mod_cnt_item" style="%tmpl_mod_cnt_item%"><div style="%tmpl_tdFfFs%">$performance$</div></td>','</tr>','$@$endif$@$','</table>','</td>','</tr>','$@$endfor$@$','$@$endif$@$','<tr>','<td><div class="tmpl_mod_footGap" style="%tmpl_gap%%tmpl_gap%%tmpl_mod_footGap%"></div></td>','</tr>','</table>','</div>'];
d.experience=c(o);
b.experience=a(o);
var t=['<div class="js_project" style="$@$if(!$isEmpty$)$@$%tmpl_modCnt_border%$@$endif$@$%tmpl_tdFfFs%display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" class="js_hover" ck="edit">','<tr>','$@$if($_root_.dataLength$ > 1)$@$','<td class="tmpl_mod_bigHeader" style="%tmpl_mod_bigHeader%">','$@$else$@$','<td class="tmpl_mod_header" style="%tmpl_mod_header%">','$@$endif$@$','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>$moduleName$','</td>','</tr>','$@$if($isEmpty$)$@$',d.empty_line,'$@$else$@$','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td><div class="tmpl_mod_cntGap" style="%tmpl_gap%%tmpl_mod_cntGap%"></div></td>','</tr>','$@$endif$@$','<tr index="$_idx_$">','<td class="tmpl_mod_cnt $_root_.falseDataColor$" style="%tmpl_mod_cnt%">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_modCnt_table%">','$@$if($start$ || $end$ || $name$ || $title$ )$@$','<tr>','<td class="tmpl_mod_cnt_item tmpl_modCnt_info $_root_.falseDataColor$" style="%tmpl_mod_cnt_item%%tmpl_modCnt_info%%tmpl_tdFfFs%">','$@$if( $name$ || $title$ )$@$','<span style="%tmpl_modCnt_boldText%">','$name$','$@$if( $name$ && $title$ )$@$&sbquo; $@$endif$@$','$title$','</span>','$@$endif$@$','$@$if(($name$ || $title$) && $start$ || $end$)$@$','<span style="%tmpl_modCnt_boldText%">&sbquo; </span>','$@$endif$@$','$start$$@$if($start$ && $end$)$@$-$@$endif$@$','$@$if($end$=="now")$@$Present$@$else$@$$end$$@$endif$@$','</td>','</tr>','$@$endif$@$','$@$if( $description$ )$@$','<tr>','<td class="tmpl_mod_cnt_item" style="%tmpl_mod_cnt_item%"><div style="%tmpl_tdFfFs%">$description$</div></td>','</tr>','$@$endif$@$','</table>','</td>','</tr>','$@$endfor$@$','$@$endif$@$','<tr>','<td><div class="tmpl_mod_footGap" style="%tmpl_gap%%tmpl_mod_footGap%"></div></td>','</tr>','</table>','</div>'];
d.project=c(t);
b.project=a(t);
var x=['<div class="js_school_experience" style="$@$if(!$isEmpty$)$@$%tmpl_modCnt_border%$@$endif$@$%tmpl_tdFfFs%display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" class="js_hover" ck="edit">','<tr>','$@$if($_root_.dataLength$ > 1)$@$','<td class="tmpl_mod_bigHeader" style="%tmpl_mod_bigHeader%">','$@$else$@$','<td class="tmpl_mod_header" style="%tmpl_mod_header%">','$@$endif$@$','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>$moduleName$','</td>','</tr>','$@$if($isEmpty$)$@$',d.empty_line,'$@$else$@$','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td><div class="tmpl_mod_cntGap" style="%tmpl_gap%%tmpl_mod_cntGap%"></div></td>','</tr>','$@$endif$@$','<tr index="$_idx_$">','<td class="tmpl_mod_cnt $_root_.falseDataColor$" style="%tmpl_mod_cnt%">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_modCnt_table%">','$@$if($start$ || $end$ || $organization$ || $job$ )$@$','<tr>','<td class="tmpl_mod_cnt_item tmpl_modCnt_info $_root_.falseDataColor$" style="%tmpl_mod_cnt_item%%tmpl_modCnt_info%%tmpl_tdFfFs%">','$@$if( $organization$ || $job$ )$@$','<span style="%tmpl_modCnt_boldText%">$organization$$@$if( $job$ )$@$&sbquo; $@$endif$@$$job$</span>','$@$endif$@$','$@$if($start$ || $end$)$@$','<span style="%tmpl_modCnt_boldText%">&sbquo; </span>','$@$endif$@$','$start$$@$if($start$ && $end$)$@$-$@$endif$@$','$@$if($end$=="now")$@$Present$@$else$@$$end$$@$endif$@$','</td>','</tr>','$@$endif$@$','$@$if( $description$ )$@$','<tr>','<td class="tmpl_mod_cnt_item" style="%tmpl_mod_cnt_item%%tmpl_tdFfFs%">$description$</td>','</tr>','$@$endif$@$','</table>','</td>','</tr>','$@$endfor$@$','$@$endif$@$','<tr>','<td><div class="tmpl_mod_footGap" style="%tmpl_gap%%tmpl_mod_footGap%"></div></td>','</tr>','</table>','</div>'];
d.school_experience=c(x);
b.school_experience=a(x);
var h=['<div class="js_awards" style="$@$if(!$isEmpty$)$@$%tmpl_modCnt_border%$@$endif$@$%tmpl_tdFfFs%display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" class="js_hover" ck="edit" style="%tmpl_modCnt_table%">','<tr>','<td class="tmpl_mod_header" style="%tmpl_mod_header%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>$moduleName$','</td>','</tr>','$@$if($isEmpty$)$@$',d.empty_line,'$@$else$@$','<tr>','<td class="tmpl_mod_single $_root_.falseDataColor$" style="%tmpl_mod_single%%tmpl_tdFfFs%">','<table width="%tmpl_mod_cntWidth%" border="0" cellspacing="0" cellpadding="0" style="%tmpl_modCnt_table%">','$@$for($data$)$@$','<tr index="$_idx_$">','$@$if($_idx_$ != ($_root_.dataLength$-1))$@$','<td style="%tmpl_mod_single_item%%tmpl_tdFfFs%">','$@$else$@$','<td style="%tmpl_tdFfFs%">','$@$endif$@$','$name$','$@$if($name$ || $time$)$@$','&sbquo; ','$@$endif$@$','$@$if($time$)$@$','<span class="tmpl_modCnt_info $_root_.falseDataColor$" style="%tmpl_modCnt_info%">$time$</span>','$@$endif$@$','</td>','</tr>','$@$endfor$@$','</table>','</td>','</tr>','$@$endif$@$','</table>','</div>'];
d.awards=c(h);
b.awards=a(h);
var y=['<div class="js_self_evaluate" style="$@$if(!$isEmpty$)$@$%tmpl_modCnt_border%$@$endif$@$%tmpl_tdFfFs%display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" class="js_hover" ck="edit" style="%tmpl_modCnt_table%">','<tr>','<td class="tmpl_mod_header" style="%tmpl_mod_header%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>$moduleName$','</td>','</tr>','$@$if($isEmpty$)$@$',d.empty_line,'$@$else$@$','<tr>','<td class="tmpl_mod_single $_root_.falseDataColor$" style="%tmpl_mod_single%%tmpl_tdFfFs%">','$content$','</td>','</tr>','$@$endif$@$','</table>','</div>'];
d.self_evaluate=c(y);
b.self_evaluate=a(y);
var g=['<div class="js_apply_intention" style="$@$if(!$isEmpty$)$@$%tmpl_modCnt_border%$@$endif$@$%tmpl_tdFfFs%display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" class="js_hover" ck="edit" style="%tmpl_modCnt_table%">','<tr>','<td class="tmpl_mod_header" style="%tmpl_mod_header%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>$moduleName$','</td>','</tr>','$@$if($isEmpty$)$@$',d.empty_line,'$@$else$@$','<tr>','<td class="tmpl_mod_single $falseDataColor$" style="%tmpl_mod_single%%tmpl_tdFfFs%">','$@$if( $title$ || $work_place$)$@$','<div>','$@$endif$@$','$title$','$@$if($title$ && $work_place$)$@$&sbquo; $@$endif$@$','$work_place$','$@$if( $title$ || $work_place$ )$@$','</div>','$@$endif$@$','</td>','</tr>','$@$endif$@$','</table>','</div>'];
d.apply_intention=c(g);
b.apply_intention=a(g);
var e=['<div class="js_ability" style="$@$if(!$isEmpty$)$@$%tmpl_modCnt_border%$@$endif$@$%tmpl_tdFfFs%display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" class="js_hover" ck="edit" style="%tmpl_modCnt_table%">','<tr>','<td class="tmpl_mod_header" style="%tmpl_mod_header%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>$moduleName$','</td>','</tr>','$@$if($isEmpty$)$@$',d.empty_line,'$@$else$@$','<tr>','<td class="tmpl_mod_cntAbility $_root_.falseDataColor$" style="%tmpl_tdFfFs%%tmpl_mod_cntAbility%">','<div index="$_idx_$">$ability$</div>','</td>','</tr>','$@$endif$@$','</table>','</div>'];
d.ability=c(e);
b.ability=a(e);
var j=['$@$for($data$)$@$','<div id="_custom_$_idx_$" class="js_custom">','<div>','<div style="$@$if(!$isEmpty$)$@$%tmpl_modCnt_border%$@$endif$@$display: $@$if($visible$)$@$$@$else$@$none$@$endif$@$">',,'<table width="%tmpl_modWidth%" border="0" cellspacing="0" cellpadding="0" class="js_hover" ck="edit" index="$_idx_$" style="%tmpl_modCnt_table%">','<tr>','<td class="tmpl_mod_header" style="%tmpl_mod_header%">','<a href="javascript:;" hidefocus="true" class="tmpl_ctrlDefaultHide tmpl_mod_hiddenClick" ck="hideModule" output="false">\u9690\u85CF</a>$title$','</td>','</tr>','<tr>','<td class="tmpl_mod_single" style="%tmpl_mod_single%%tmpl_tdFfFs%">','$content$','</td>','</tr>','</table>','</div>','</div>','</div>','$@$endfor$@$'];
d.custom=c(j);
b.custom=a(j);
$.createCtrl('resume.view.module_skin_en_1',{sSuper:'resume.view'},function(z){
return {init_:function(A){
this.superEx_(z,'init_',arguments);
this.setTpl(d);
return this;
},getPdfTPL:function(){
return b;
}};
});
});
$.package('resume/view/module_skin_en_1_export.js',['resume/lib/utils.js'],function(c){
var a=$.lib('resume.utils').createTPL({tmpl_infoRight:'margin: 0px 64px 0px 0px; text-align: center; line-height: 0;',tmpl_infoLeft:'margin: 0px 20px 0px 5px',tmpl_infoImg:'border: 2px solid #dfdfdf;',tmpl_infoName:'margin: 0px 0px 7px 0px; font-size: 34px;color: #374760; line-height: 32px; word-break: break-word;',tmpl_infoList:'margin: 0px 0px 7px 7px;',tmpl_infoListItem:'margin: 0px 10px 0px 0px; word-break: break-all;',tmpl_infoListItem_title:'margin: 0px 9px 0px 0px;',tmpl_mod:'',tmpl_mod_cntGap:'margin: 0px 0px 4px 0px;',tmpl_mod_header:'margin: 20px 40px 0px 5px; font-size: 18px; color: #374760; line-height: 1;',tmpl_mod_bigHeader:'margin: 20px 40px 1px 5px; font-size: 18px; color: #374760; line-height: 1;',tmpl_mod_single:'margin: 0px 8px 15px 5px;',tmpl_mod_singleSmall:'margin: 0px 8px 0px 5px;',tmpl_mod_singleGap:'margin: 0px 0px 3px 0px;',tmpl_mod_single_item:'margin-bottom: 0px;',tmpl_mod_cnt:'margin: 0px 5px 3px;',tmpl_mod_cnt_item:'',tmpl_modCnt_title:'font-size: 16px;line-height: 15px;',tmpl_modCnt_info:'color: #333333;',tmpl_modCnt_separate:'color: #a7a7a7;',tmpl_tdFfFsTc:'font-size: 14px; line-height: 21px; word-break: break-word; color: #333333;',tmpl_tdFfFsTcSmallLineHeight:'font-size: 14px; line-height: 14px; word-break: break-word; color: #333333;',tmpl_gap:'font-size: 1px;'});
var b={};
b.layout=a(['<style>body {font-family: \'\u5FAE\u8F6F\u96C5\u9ED1\';font-size: 14px;}</style>','<table width="643" border="0" cellpadding="0" cellspacing="0" align="center">','<tr>','<td>','<table width="643" border="0" cellpadding="0" cellspacing="0" align="center">','<col width="521">','<col width="35">','<col width="117">','<tr>','<td valign="top">','$baseinfo$','</td>','<td valign="top">','</td>','<td>','$face$','</td>','</tr>','</table>','<div id="resume_order_content">','$apply_intention$','$education$','$school_experience$','$experience$','$project$','$awards$','$ability$','$self_evaluate$','$custom$','</div>','<div style="margin: 5px 0px 0px;font-size: 1px;"><br /></div>','</td>','</tr>','</table>']);
b.empty_info=a(['<tr>','<td>','</td>','<td>','<div class="tmpl_modCnt_none">','<div class="tmpl_emptyLineGap" style="margin: 13px 0px 0px;font-size:1px;"><br /></div>','<table width="545" border="0" cellpadding="0" cellspacing="0">','<tr>','<td bgcolor="e6e6e6"><div style="font-size: 1px;"><br /></div></td>','</tr>','</table>','<div class="tmpl_emptyLineGap" style="margin: 13px 0px 0px;font-size:1px;"><br /></div>','<table width="545" border="0" cellpadding="0" cellspacing="0">','<tr>','<td bgcolor="e6e6e6"><div style="font-size: 1px;"><br /></div></td>','</tr>','</table>','<div class="tmpl_emptyLineGap" style="margin: 13px 0px 0px;font-size:1px;"><br /></div>','<table width="270" border="0" cellpadding="0" cellspacing="0">','<tr>','<td bgcolor="e6e6e6"><div style="font-size: 1px;"><br /></div></td>','</tr>','</table>','<div class="tmpl_emptyLineGap" style="margin: 13px 0px 0px;font-size:1px;"><br /></div>','</div>','</td>','<td></td>','</tr>']);
b.empty_info2=a(['<tr>','<td>','</td>','<td>','<div class="tmpl_modCnt_none">','<div class="tmpl_emptyLineGap" style="margin: 13px 0px 0px;font-size:1px;"><br /></div>','<table width="545" border="0" cellpadding="0" cellspacing="0">','<tr>','<td bgcolor="e6e6e6"><div style="font-size: 1px;"><br /></div></td>','</tr>','</table>','<div class="tmpl_emptyLineGap" style="margin: 13px 0px 0px;font-size:1px;"><br /></div>','<table width="545" border="0" cellpadding="0" cellspacing="0">','<tr>','<td bgcolor="e6e6e6"><div style="font-size: 1px;"><br /></div></td>','</tr>','</table>','<div class="tmpl_emptyLineGap" style="margin: 13px 0px 0px;font-size:1px;"><br /></div>','<table width="270" border="0" cellpadding="0" cellspacing="0">','<tr>','<td bgcolor="e6e6e6"><div style="font-size: 1px;"><br /></div></td>','</tr>','</table>','<div class="tmpl_emptyLineGap" style="margin: 13px 0px 0px;font-size:1px;"><br /></div>','</div>','</td>','</tr>']);
b.baseinfo=a(['<div style="%tmpl_infoLeft%">','<table width="474" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','<div style="%tmpl_infoName%"><b>','$@$if($isEmpty$)$@$','\u59D3\u540D','$@$else$@$','$name$','$@$endif$@$','</b></div>','</td>','</tr>','<tr>','<td><div style="%tmpl_tdFfFsTcSmallLineHeight%">','$@$if($mobile$)$@$','$mobile$&nbsp;&nbsp;&nbsp;','$@$endif$@$','$@$if($email$)$@$','$email$','$@$endif$@$','</div></td>','</tr>','<tr>','<td><div style="%tmpl_tdFfFsTcSmallLineHeight%">','$@$if($city$)$@$','$city$','$@$endif$@$','</div></td>','</tr>','</table>','</div>']);
b.face=a(['<div style="%tmpl_infoRight%">','<table width="102" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','<div>','$@$if($visible$)$@$','$@$if($avatar$)$@$','<img name="avatar.jpg" src="$avatar$" width="100" height="140" alt="\u7B80\u5386\u5934\u50CF" style="%tmpl_infoImg%" />','$@$endif$@$','$@$endif$@$','</div>','</td>','</tr>','</table>','</div>']);
b.education=a(['<div id="education" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="643" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','<div style="%tmpl_mod_header%"><b>EDUCATION</b></div>','</td>','</tr>','$@$if($isEmpty$)$@$',b.empty_info,'$@$else$@$','<tr>','<td style="%tmpl_tdFfFsTc%">','<div style="%tmpl_mod_single%">','<table width="630" border="0" cellspacing="0" cellpadding="0">','$@$for($data$)$@$','<tr index="$_idx_$">','<td>','$@$if($_idx_$ != ($_root_.dataLength$-1))$@$','<div style="%tmpl_mod_single_item%%tmpl_tdFfFsTcSmallLineHeight%">','$@$else$@$','<div style="%tmpl_tdFfFsTcSmallLineHeight%">','$@$endif$@$','$@$if($school$ || $major$ || $degree$)$@$','$school$$@$if($school$ && $major$)$@$&sbquo;&nbsp;$@$endif$@$$major$$@$if( ($school$ || $major$) && $degree$)$@$&sbquo;&nbsp;$@$endif$@$$degree$','$@$endif$@$','$@$if(($school$ || $major$ || $degree$) && ($start$ || $end$))$@$','&sbquo;&nbsp;','$@$endif$@$','$@$if($start$ || $end$ )$@$','<span style="%tmpl_modCnt_info%">','$start$$@$if($start$ && $end$)$@$-$@$endif$@$','$@$if($end$=="now")$@$Present$@$else$@$$end$$@$endif$@$','</span>','$@$endif$@$','</div>','</td>','</tr>','$@$endfor$@$','</table>','</div>','</td>','</tr>','$@$endif$@$','</table>','</div>']);
b.apply_intention=a(['<div id="apply_intention" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="643" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','<div style="%tmpl_mod_header%"><b>OBJECTIVE</b></div>','</td>','</tr>','$@$if($isEmpty$)$@$',b.empty_info2,'$@$else$@$','<tr>','<td style="%tmpl_tdFfFsTc%">','<div style="%tmpl_mod_single%">','<table width="630" border="0" cellspacing="0" cellpadding="0">','$@$if( $title$ || $work_place$ || $work_status$ )$@$','<tr><td style="%tmpl_tdFfFsTc%"><div>','$@$endif$@$','$@$if($title$)$@$$title$&sbquo;&nbsp;$@$endif$@$','$work_place$','$@$if( $title$ || $work_place$ )$@$','</div></td></tr>','$@$endif$@$','</table>','</div>','</td>','</tr>','$@$endif$@$','</table>','</div>']);
b.experience=a(['<div id="experience" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="643" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','$@$if($_root_.dataLength$ > 1)$@$','<div style="%tmpl_mod_bigHeader%"><b>WORK EXPERIENCE</b></div>','$@$else$@$','<div style="%tmpl_mod_header%"><b>WORK EXPERIENCE</b></div>','$@$endif$@$','</td>','</tr>','$@$if($isEmpty$)$@$',b.empty_info,'$@$else$@$','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td><div style="%tmpl_gap%%tmpl_mod_cntGap%"><br/ ></div></td>','</tr>','$@$endif$@$','<tr index="$_idx_$">','<td>','<div style="%tmpl_mod_cnt%">','<table width="633" border="0" cellspacing="0" cellpadding="0">','<col width="58">','<col width="575">','$@$if($start$ || $end$)$@$','<tr>','<td>','<div style="%tmpl_mod_cnt_shortItem%%tmpl_modCnt_info%%tmpl_tdFfFsTcSmallLineHeight%">','$@$if($company$ || $title$)$@$','<b>$company$$@$if( $company$ )$@$&sbquo;&nbsp;$@$endif$@$$title$</b>','$@$endif$@$','$@$if($start$ || $end$)$@$','&sbquo;&nbsp;','$@$endif$@$','$start$$@$if($start$ && $end$)$@$-$@$endif$@$','$@$if($end$=="now")$@$Present$@$else$@$$end$$@$endif$@$','</div>','</td>','</tr>','$@$endif$@$','$@$if( $performance$ )$@$','<tr>','<td><div style="%tmpl_mod_cnt_item%%tmpl_mod_cnt_right%%tmpl_tdFfFsTc%">$performance$</div></td>','</tr>','$@$endif$@$','</table>','</div>','</td>','</tr>','$@$endfor$@$','$@$endif$@$','</table>','</div>']);
b.project=a(['<div id="project" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="643" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','$@$if($_root_.dataLength$ > 1)$@$','<div style="%tmpl_mod_bigHeader%"><b>PROJECTS</b></div>','$@$else$@$','<div style="%tmpl_mod_header%"><b>PROJECTS</b></div>','$@$endif$@$','</td>','</tr>','$@$if($isEmpty$)$@$',b.empty_info,'$@$else$@$','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td><div style="%tmpl_gap%%tmpl_mod_cntGap%"><br /></div></td>','</tr>','$@$endif$@$','<tr index="$_idx_$">','<td>','<div style="%tmpl_mod_cnt%">','<table width="633" border="0" cellspacing="0" cellpadding="0">','<col width="58">','<col width="575">','$@$if($start$ || $end$)$@$','<tr>','<td>','<div style="%tmpl_mod_cnt_shortItem%%tmpl_modCnt_info%%tmpl_tdFfFsTcSmallLineHeight%">','$@$if( $name$ || $title$ )$@$','<b>','$name$','$@$if( $name$ && $title$ )$@$&sbquo;&nbsp;$@$endif$@$','$title$','</b>','$@$endif$@$','$@$if($start$ || $end$)$@$','&sbquo;&nbsp;','$@$endif$@$','$start$$@$if($start$ && $end$)$@$-$@$endif$@$','$@$if($end$=="now")$@$Present$@$else$@$$end$$@$endif$@$','</div>','</td>','</tr>','$@$endif$@$','$@$if( $description$ )$@$','<tr>','<td><div style="%tmpl_mod_cnt_item%%tmpl_mod_cnt_right%%tmpl_tdFfFsTc%">$description$</div></td>','</tr>','$@$endif$@$','</table>','</div>','</td>','</tr>','$@$endfor$@$','$@$endif$@$','</table>','</div>']);
b.school_experience=a(['<div id="school_experience" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="643" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','$@$if($_root_.dataLength$ > 1)$@$','<div style="%tmpl_mod_bigHeader%"><b>ACTIVITIES</b></div>','$@$else$@$','<div style="%tmpl_mod_header%"><b>ACTIVITIES</b></div>','$@$endif$@$','</td>','</tr>','$@$if($isEmpty$)$@$',b.empty_info,'$@$else$@$','$@$for($data$)$@$','$@$if($_idx_$ != 0)$@$','<tr>','<td><div style="%tmpl_gap%%tmpl_mod_cntGap%"><br /></div></td>','</tr>','$@$endif$@$','<tr index="$_idx_$">','<td>','<div style="%tmpl_mod_cnt%">','<table width="633" border="0" cellspacing="0" cellpadding="0">','$@$if($start$ || $end$)$@$','<tr>','<td>','<div style="%tmpl_mod_cnt_shortItem%%tmpl_modCnt_info%%tmpl_tdFfFsTcSmallLineHeight%">','$@$if( $organization$ || $job$ )$@$','<b>$organization$$@$if( $job$ )$@$&sbquo;&nbsp;$@$endif$@$$job$</b>','$@$endif$@$','$@$if($start$ || $end$)$@$','&sbquo;&nbsp;','$@$endif$@$','$start$$@$if($start$ && $end$)$@$-$@$endif$@$','$@$if($end$=="now")$@$Present$@$else$@$$end$$@$endif$@$','</div>','</td>','</tr>','$@$endif$@$','$@$if( $description$ )$@$','<tr>','<td><div style="%tmpl_mod_cnt_item%%tmpl_tdFfFsTc%">$description$</div></td>','</tr>','$@$endif$@$','</table>','</div>','</td>','</tr>','$@$endfor$@$','$@$endif$@$','</table>','</div>']);
b.awards=a(['<div id="awards" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="643" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','<div style="%tmpl_mod_header%"><b>AWARDS</b></div>','</td>','</tr>','$@$if($isEmpty$)$@$',b.empty_info,'$@$else$@$','<tr>','<td>','<div style="%tmpl_mod_single%">','<table width="630" border="0" cellspacing="0" cellpadding="0">','$@$for($data$)$@$','<tr index="$_idx_$">','<td>','$@$if($_idx_$ != ($_root_.dataLength$-1))$@$','<div style="%tmpl_mod_single_item%%tmpl_tdFfFsTcSmallLineHeight%">','$@$else$@$','<div style="%tmpl_tdFfFsTcSmallLineHeight%">','$@$endif$@$','$name$','$@$if($name$ || $time$ )$@$','&sbquo;&nbsp;','$@$endif$@$','$@$if($time$)$@$','<span style="%tmpl_modCnt_info%">$time$</span>','$@$endif$@$','</div>','</td>','</tr>','$@$endfor$@$','</table>','</div>','</td>','</tr>','$@$endif$@$','</table>','</div>']);
b.ability=a(['<div id="ability" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="643" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','<div style="%tmpl_mod_header%"><b>SKILLS</b></div>','</td>','</tr>','$@$if($isEmpty$)$@$',b.empty_info,'$@$else$@$','<tr>','<td>','<div style="%tmpl_tdFfFsTc%margin: 0px 5px 12px;">','<table width="633" border="0" cellpadding="0" cellspacing="0">','<tr><td>','<div style="%tmpl_tdFfFsTcSmallLineHeight%"><span>$ability$</div>','</td></tr>','$@$if($_idx_$ != ($_root_.dataLength$-1))$@$','<tr><td><div style="%tmpl_gap%margin: 0px 0px 2px 0px;"><br/ ></div></td></tr>','$@$endif$@$','</table>','</div>','</td>','</tr>','$@$endif$@$','</table>','</div>']);
b.self_evaluate=a(['<div id="self_evaluate" style="display: $@$if($visible$)$@$block$@$else$@$none$@$endif$@$">','<table width="643" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','<div style="%tmpl_mod_header%"><b>SUMMARY</b></div>','</td>','</tr>','$@$if($isEmpty$)$@$',b.empty_info2,'$@$else$@$','<tr>','<td>','<div style="%tmpl_mod_singleSmall%%tmpl_tdFfFsTc%">$content$</div>','</td>','</tr>','$@$endif$@$','</table>','</div>']);
b.custom=a(['$@$for($data$)$@$','$@$if($visible$)$@$','<div id="_custom_$_idx_$">','<table width="643" border="0" cellpadding="0" cellspacing="0">','<tr>','<td>','<div style="%tmpl_mod_header%"><b>$title$</b></div>','</td>','</tr>','<tr>','<td>','<div style="%tmpl_mod_singleSmall%%tmpl_tdFfFsTc%">$content$</div>','</td>','</tr>','</table>','</div>','$@$endif$@$','$@$endfor$@$']);
$.createCtrl('resume.view.module_skin_en_1_export',{sSuper:'resume.view'},function(d){
return {init_:function(e){
this.superEx_(d,'init_',arguments);
this.setTpl(b);
return this;
}};
});
});
$.package('resume/controller/attach_preview.js',['resume/controller/public_view.js'],function(a){
$.createCtrl('resume.controller.attach_preview',{sSuper:'resume.controller.public_view'},function(b){
return {getDataUrl_:function(){
var c=$.inWin().location.href;
return [c,c.indexOf('?')==-1?'?':'&','type=json&inputf=user'].join('');
},renderPages_:function(){
this.dom$().html($.ctrl('resume.controller.preview').render(this.moConfig.oAppCfg.sSubCmd=='inbox'?'attach_preview_inbox':'attach_preview'));
return this;
}};
});
});
$.package('resume/controller/resume_preview.js',['resume/controller/public_view.js'],function(a){
$.createCtrl('resume.controller.resume_preview',{sSuper:'resume.controller.public_view'},function(b){
return {getDataUrl_:function(){
var c='/cgi-bin/resume?func=Read';
return c;
},renderPages_:function(){
this.dom$().html($.ctrl('resume.controller.preview').render('resume_preview'));
return this;
}};
});
});
$.package('resume/controller/edit_import.js',['resume/controller/edit_import_base.js','resume/lib/adaptor.js'],function(){
var a=$.lib('resume.adaptor');
$.createCtrl('resume.controller.editImport',{sSuper:'resume.controller.editImportBase'},function(b){
return {init_:function(){
return this.superEx_(b,'init_',arguments).initUploader();
},initUploader:function(){
var c=this;
a.getImportUploaderCreater(function(d,e,f){
if(d)
{
var g=e('popup',c.getUploadConfig_(f.qmFileSelecter,{oComlist:["Html5PopupMail","RawinputPopupMail"],bMulti:false}));
if(g)
{
return;
}
}
});
return this;
},getUploadConfig_:function(c,d){
var f=this;
var e=new c({nMaxFileSize:10*1024*1024,nMaxFileNum:1,oFileTypes:['doc','pdf','docx','html','htm','txt','mht'],oLangs:{FILENUM_OVERFLOW:'\u4E0D\u652F\u6301\u540C\u65F6\u5BFC\u5165\u591A\u5C01\u7B80\u5386',FILESIZE_OVERFLOW:'\u6587\u4EF6\u8FC7\u5927\uFF0C\u65E0\u6CD5\u5BFC\u5165',FILESIZE_ZERO:'\u4E0D\u80FD\u5BFC\u5165\u7A7A\u6587\u4EF6',NOTSUPPERTYPE:'\u53EA\u652F\u6301\u5BFC\u5165doc pdf html txt mht\u6587\u4EF6'}});
return $.extend({sUrl:'/cgi-bin/parser?func=Parser',sBusiness:'resume.import',oQueryData:{t:'qmfileupload_logic',ef:null,mode:null,fver:null,lang:null,resp_charset:null},oContainer:f.dom$().data(0),sInputTitle:'\u70B9\u51FB\u5BFC\u5165\u7B80\u5386',onselect:function(g){
var h=e.selectFiles(g);
if(h)
{
f.showError(h[0].sMsg);
f.fire('complete',false,'selectFiles,'+h[0]);
}
else{
f.importFile(g[0]);
}
},onprocess:function(g){
if(g.get('nPercent')>0)
{
f.renderPercent_(Number(g.get('nPercent')));
}
},onerror:function(g){
var i=g.get('sError');
if(i=='cgi,-2')
{
f.onsessiontimeout();
}
else if(i=='cgi,-9006')
{
f.showError('\u8BE5\u6587\u4EF6\u5DF2\u52A0\u5BC6\uFF0C\u65E0\u6CD5\u5BFC\u5165');
}
else if(i=='cgi,-120')
{
a.LogKV('resume|my_resume|import|en');
f._closeDg();
f.confirm({title:'\u5BFC\u5165\u7B80\u5386',msg:'<div class="dialog_f_t">\u6682\u4E0D\u652F\u6301\u82F1\u6587\u7B80\u5386\u5BFC\u5165</div>',onreturn:function(j){
}});
}
else if(i=='cgi,120')
{
var h=g.get('resume');
f._closeDg();
f._overConfirm(function(){
var j=$.lib('resume.modelmgr').getModel('setting');
var k=$.lib('resume.modelmgr').getModel('sync_proxy');
var l=null;
if(j.getResumeType()=='en')
{
$.lib('resume.modelmgr').getModel('moduleBase').setCnData(h.resume);
l={mailid:h.mailid,resume:h.resume};
}
else{
k.setModModels(h.resume,{});
}
k.sync({vData:l,success:function(){
f.oncomplete_(h||{});
a.LogKV('resume|my_resume|import_suc');
},error:function(){
f.showError('\u5BFC\u5165\u7B80\u5386\u5931\u8D25');
}});
});
}
else{
f.showError('\u5BFC\u5165\u7B80\u5386\u5931\u8D25');
}
f.fire('complete',false,i);
a.LogKV('resume|my_resume|import_err');
},oncomplete:function(g){
f.oncomplete_(g.get('resume')||{});
a.LogKV('resume|my_resume|import_suc');
}},d);
},process_:function(c){
var d=this;
var e=c.get('sName');
c.oCfg=c.oCfg||{};
c.oCfg.oBodyData=$.extend(c.oCfg.oBodyData||{},{importfile:e});
if(/\.docx?$/i.test(e))
{
a.LogKV('resume|my_resume|import_type|doc');
}
else if(/\.pdf$/i.test(e))
{
a.LogKV('resume|my_resume|import_type|pdf');
}
else{
a.LogKV('resume|my_resume|import_type|other');
}
a.LogKV('resume|my_resume|import_from|'+(d.moConfig.sFrom||'tip'));
c.upload();
return this;
}};
});
});
$.package('resume/controller/edit_import_base.js',['resume/controller/edit_base.js'],function(){
$.createCtrl('resume.controller.editImportBase',{sSuper:'resume.controller.editBase'},function(a){
return {importFile:function(){
var d=this;
var c=arguments;
function b()
{
d._resertLoadingDg();
d.process_.apply(d,c);
d.fire('import_start',c);
}
b();
return this;
},process_:$.noop,oncomplete_:function(b){
var c=this;
b=b||{};
$.lib('resume.modelmgr').getModel('setting').save('imported',true);
c._closeDg();
c.showInfo('\u5BFC\u5165\u7B80\u5386\u6210\u529F');
$.lib('resume.modelmgr').getModel('sync_proxy').setAllModel(b,{});
var d=$.lib('resume.modelmgr').getModel('setting');
if(!d.getTypeSkin()||d.getTypeSkin()==0)
{
var e='skin';
if(d.getResumeType()=='en')
{
e='skin_en';
}
d.save(e,d.getSkin());
}
c.fire('complete',true,b);
if(window.JSON&&JSON.stringify&&'|2368406965|434537707|1491766301|'.indexOf('|'+$.uin()+'|')!=-1)
{
c.alert({title:'\u5BFC\u5165\u5185\u5BB9 (\u6D4B\u8BD5\u4E13\u7528)',msg:'<div style="width:960px; height: 600px; overflow: scroll;"><p>\u5BFC\u5165\u7684JSON\u6570\u636E</p><pre>'+JSON.stringify(b,null,'\t')+'</pre></div>'});
}
return this;
},_overConfirm:function(b){
this.confirm({title:'\u5BFC\u5165\u7B80\u5386',msg:'<div class="dialog_f_t">\u6587\u6863\u5C06\u4E0E\u4E2D\u6587\u7B80\u5386\u5408\u5E76\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F</div><div class="dialog_f_d">\u90E8\u5206\u4FE1\u606F\u53EF\u80FD\u4F1A\u88AB\u8986\u76D6\u3002</div>',onreturn:function(c){
c&&b();
}});
return this;
},_resertLoadingDg:function(){
var b=this;
b._moLoadingDg=b.createDialog({sTitle:'\u5BFC\u5165\u7B80\u5386',sId:'__resume_import_dg__',sBodyHtml:['<div class="resume_importLoading">','<div class="dialog_feedback">','<span class="dialog_icon ico_loading2"></span>','<div class="dialog_f_c">','<div>\u6B63\u5728\u5BFC\u5165\u6587\u6863...&nbsp;<span id="percent"></span><div>','</div>','</div>','</div>'].join(''),onclose:function(){
b._moLoadingDg=null;
}});
return this;
},renderPercent_:function(b){
if(this._moLoadingDg&&!this._moLoadingDg.isClose())
{
this._moLoadingDg.S('percent').innerHTML=Math.round(b)+'%';
}
return this;
},_closeDg:function(){
if(this._moLoadingDg&&!this._moLoadingDg.isClose())
{
this._moLoadingDg.close();
}
return this;
},showError:function(){
this._closeDg();
return this.superEx_(a,'showError',arguments);
}};
});
});
$.package('resume/controller/edit_import_drag.js',['resume/controller/edit_import.js','resume/lib/utils.js','resume/lib/adaptor.js'],function(){
var a=$.lib('resume.adaptor');
var b=$.lib('resume.utils');
$.createCtrl('resume.controller.editImportDrag',{sSuper:'resume.controller.editImport'},function(c){
return $.extend(b.getDragLib(c),{initUploader:function(){
var d=this;
a.getImportUploaderCreater(function(e,f,g){
if(e)
{
var i=d.getUploadConfig_(g.qmFileSelecter,{oComlist:["Html5DragMail"],sDragLeaveMsg:'\u5C06\u7B80\u5386\u62D6\u62FD\u81F3\u6B64\u533A\u57DF\uFF0C\u53EF\u76F4\u63A5\u5BFC\u5165',oContainer:d.dragDom$_().data(0),bNoStyle:true});
var h=i.onselect;
i.onselect=function(){
d.hideDragDom_();
return h.apply(this,arguments);
};
f('drag',i);
d.initWinEvents_();
d.fire('init_suc');
}
else{
d.fire('init_err');
}
});
return this;
},editMsgBoxStyle_:function(){
var d=this.dragDom$_().height();
var e=this.dragDom$_().offset().top;
var h=$.$($.inWin());
var g=h.scrollTop();
var f=Math.min(d+e-26,g+(Math.min(h.height()+g,d+e)-g-14)/2)-e;
this.msgDom$_().css({width:'100%',fontSize:'14px',textAlign:'center',lineHeight:'14px',paddingTop:f+'px',paddingBottom:(d-f)+'px'});
return this;
}});
});
});
$.package('resume/controller/edit_import_mail.js',['resume/model/sync_proxy.js','resume/lib/adaptor.js'],function(){
$.createCtrl('resume.controller.editImportMail',{sSuper:'resume.controller.editImportBase'},function(a){
return {init_:function(){
return this.superEx_(a,'init_',arguments)._importMail();
},_importMail:function(){
var b=this;
$.lib('resume.modelmgr').getModel('sync_proxy').onOnceReady(function(){
b.importFile(b.moConfig.oImportArgs);
});
return this;
},process_:function(b){
var c=this;
$.lib('resume.ajax').ajax({nTimeout:20*1000,sUrl:'/cgi-bin/parser?func=Parser&t=readtemplate&s=xmldata&fid='+getTop().encodeURI(b.fid)+'&inputf=&outputf=&inputc=&outputc=',bProcessData:true,sType:'GET',onsuccess:function(d){
c.oncomplete_(d);
},onerror:function(e,f,d){
if(d&&d.errCode==-9006)
{
c.showError('\u8BE5\u6587\u4EF6\u5DF2\u52A0\u5BC6\uFF0C\u65E0\u6CD5\u5BFC\u5165');
}
else{
c.showError('\u5BFC\u5165\u7B80\u5386\u90AE\u4EF6\u5931\u8D25');
}
}});
return this;
}};
});
});
$.package('resume/controller/edit_import_tip.js',['resume/controller/edit_base.js','resume/lib/adaptor.js'],function(){
var a=$.lib('resume.adaptor');
$.createCtrl('resume.controller.editImportTip',{sSuper:'resume.controller.editBase'},function(b){
return {_nTipId:92,_sDefaultDomId:'resumeImportPlaceholder',initData_:function(){
this.super_(b,'initData_',arguments);
this._mbHasClose=true;
this._moTargetNode=this.moConfig.oTargetNode;
return this;
},render:function(){
var d=this;
var c=$.lib('resume.modelmgr');
var e=c.getModel('setting');
if(!e.get('imported')&&!e.get('knowImporte')&&c.getModel('config').getModuleEditedPer()<0.5)
{
this._showTip();
}
return this;
},_showTip:function(){
var c=this;
var d=this._moTargetNode.id;
if(!d)
{
d=c._moTargetNode.id=c._sDefaultDomId;
}
a.waitForShowTip({win:$.inWin(),tipid:c._nTipId,domid:d,arrow_direction:'down',arrow_offset:30,tip_offset:-76,msg:'<b>\u4ECE\u672C\u5730\u6587\u6863\u5BFC\u5165</b><br />\u667A\u80FD\u5BFC\u5165\u7B80\u5386\uFF0C\u65E0\u9700\u624B\u52A8\u586B\u5199\u3002',closeforever:'\u6211\u77E5\u9053\u4E86',onclose:function(){
$.lib('resume.modelmgr').getModel('setting').set('knowImporte',true);
}},'show',function(e){
c._mbHasClose=!e;
});
return this;
},remove:function(){
if(!this._mbHasClose)
{
this._mbHasClose=true;
a.getQMTip().close('know',this._nTipId,1,1);
}
return this.super_(b,'remove',arguments);
}};
});
});
$.package("resume/controller/edit_public.js",['resume/controller/edit_base.js','resume/lib/adaptor.js'],function(){
var a=$.lib('resume.adaptor');
$.createCtrl('resume.controller.editPublic',{sSuper:'resume.controller.editBase'},function(b){
return {init_:function(){
this.super_(b,'init_',arguments);
this._checkData();
return this;
},getModel_:function(){
return $.lib('resume.modelmgr').getModel('setting');
},_initClipboard:function(c){
var e=this;
var d=c.S('copy_btn');
a.getQMClipboard(function(f,g){
if(f)
{
if(g.detect())
{
var h;
g.setup({bHandCursor:true,oContainer:d.parentNode,onmousedown:function(){
g.setText(e.getModel_().get('public_url'));
e._selectText(c);
},oncomplete:function(){
e.showInfo('\u590D\u5236\u6210\u529F');
}});
return;
}
}
});
return this;
},_selectText:function(c){
var d=this;
setTimeout(function(){
c.S('url_input').select();
});
},_checkData:function(){
var c=this;
if(c.getModel_().get('public_url'))
{
c._createPublicDg();
}
else{
c.confirm({title:'\u7B80\u5386\u94FE\u63A5',sClassName:'resume_dialogLink',msg:'\u751F\u6210\u7B80\u5386\u94FE\u63A5\u540E\uFF0C\u4ED6\u4EBA\u53EF\u901A\u8FC7\u6B64\u94FE\u63A5\u8BBF\u95EE\u4F60\u7684\u7B80\u5386\u3002',confirmBtnTxt:'\u786E\u8BA4',cancelBtnTxt:'\u53D6\u6D88',nWidth:440,onreturn:function(d){
if(d)
{
c.refreshLink(function(e){
if(c.getModel_().getResumeType=='en')
{
c.getModel_().save('is_public_en',true);
}
else{
c.getModel_().save('is_public',true);
}
e&&c._createPublicDg();
},{nWidth:440,nY:this.option('nY'),nX:this.option('nX')});
}
else{
c.remove();
}
}});
}
},_createPublicDg:function(){
var c=this;
a.createDialog({sTitle:'\u7B80\u5386\u94FE\u63A5',nWidth:440,sClassName:'resume_dialogLink',sBodyHtml:c.getView('editPublic.mainDialog',{sUrl:$.htmlEncode(c.getModel_().get('public_url')),is_public:c.getModel_().get('is_public'),is_public_en:c.getModel_().get('is_public_en')}),sFootHtml:$.T(['<a class="qui_btn qui_btn_Space" href="javascript:;" hidefocus="true"><span id="copy_btn">\u590D\u5236\u94FE\u63A5</span></a>','<a href="javascript:;" hidefocus="true" class="qui_btn" id="refresh_btn">\u91CD\u65B0\u751F\u6210\u94FE\u63A5</a>']),onload:function(){
var d=this;
a.addEvent(d.S('url_input'),'focus',function(){
c._selectText(d);
});
a.addEvent(d.S('checkCn'),'click',function(e){
$.stopPropagation(e);
var f=a.getEventTarget(e);
c.getModel_().save('is_public',f.checked);
});
a.addEvent(d.S('checkEn'),'click',function(e){
$.stopPropagation(e);
var f=a.getEventTarget(e);
c.getModel_().save('is_public_en',f.checked);
});
a.addEvent(d.S('refresh_btn'),'click',function(e){
$.stopPropagation(e);
function f()
{
c._syncDialogOption(d,g,['nY','nX']);
}
var g=c.confirm({title:'\u7B80\u5386\u94FE\u63A5',sClassName:'resume_dialogLink',msg:'\u91CD\u65B0\u751F\u6210\u94FE\u63A5\u540E\uFF0C\u65E7\u94FE\u63A5\u5C06\u5931\u6548\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F',confirmBtnTxt:'\u662F',cancelBtnTxt:'\u5426',onload:function(){
c._syncDialogOption(this,d);
d.option('nY',-99999999);
},onreturn:function(h){
if(h)
{
c.refreshLink(f,this);
}
else{
f();
}
}});
});
c.listenTo_(c.getModel_(),'change:public_url',function(e,f){
c._setUrlDialogWidth(d,f);
});
c._setUrlDialogWidth(d,c.getModel_().get('public_url'));
a.addEvent(d.S('copy_btn'),'click',function(){
c.showError('\u590D\u5236\u5185\u5BB9\u5931\u8D25\uFF0C\u8BF7\u76F4\u63A5\u62F7\u8D1D\u6587\u5B57');
c._selectText(d);
});
},onshow:function(){
c._initClipboard(this);
},onclose:function(){
c.remove();
}});
return this;
},_syncDialogOption:function(c,d,e){
$.each(e||['nX','nY','nWidth'],function(f){
c.option(f,d[f]||d.option(f));
});
return this;
},_setUrlDialogWidth:function(c,d){
var f=c.S('url_input');
if(f)
{
f.value=d;
var e=Math.max(360,d.length*8+10);
f.style.width=e+'px';
c.option('nWidth',e+60);
}
},_refreshingDG:function(c,d){
var i=this;
var e=false;
var h=i.createDialog({sTitle:'\u7B80\u5386\u94FE\u63A5',sClassName:'resume_dialogLink',bAnimation:false,sBodyHtml:i.getView('editPublic.refreshDialog'),onload:function(){
i._syncDialogOption(this,d);
}});
function f(j)
{
if(j)
{
i.showInfo('\u5237\u65B0\u6210\u529F');
}
else{
i.showError('\u5237\u65B0\u516C\u5F00\u94FE\u63A5\u5931\u8D25');
}
h.close();
$.call(c,[j]);
}
var g=$.inWin().setTimeout(function(){
g=null;
e&&f(true);
},400);
return function(j){
if(!g||!j)
{
!g&&$.inWin().clearTimeout(g);
f(j);
}
e=true;
};
},refreshLink:function(c,d){
var f=this;
var e=f._refreshingDG(c,d);
$.lib('resume.ajax').ajax({nTimeout:20*1000,sUrl:'/cgi-bin/resume?func=ShareUrl',vData:{},onsuccess:function(g){
f.getModel_().set('public_url',g.url);
a.LogKV('resume|my_resume|public');
e(true);
},onerror:function(){
e(false);
}});
return this;
}};
});
});
$.package("resume/controller/edit_rename.js",['resume/controller/edit_base.js','resume/lib/adaptor.js'],function(){
var a=$.lib('resume.adaptor'),b=$.lib('resume.utils');
$.createCtrl('resume.controller.editRename',{sSuper:'resume.controller.editBase'},function(c){
return {_getModel:function(){
return $.lib('resume.modelmgr').getModel('setting');
},initEvents_:function(){
this.listenTo_(this._getModel(),'change:title',this.render);
this.listenTo_(this._getModel(),'change:title_en',this.render);
this.listenTo_($.lib('resume.modelmgr').getModModel('baseinfo'),'change:name',this.render);
this.listenTo_($.lib('resume.modelmgr').getModModel('apply_intention'),'change:title',this.render);
return this.super_(c,'initEvents_',arguments);
},render:function(){
var d=this;
d.dom$().html(d.getView('editRename.node',{resume_type:this._getModel().getResumeType(),title:this._getModel().getTitle(),titleIsDefault:this._getModel().titleIsDefault()}));
return this;
},_save:function(d){
var f=this;
var g=d.value,e=true;
if(g)
{
if(g!=f._getModel().getTitle())
{
a.LogKV('resume|my_resume|rename');
var h='title';
if(f._getModel().getResumeType()=='en')
{
h='title_en';
}
f._getModel().save(h,g);
}
f.showValidateError(d,false);
e=true;
}
else{
f.showValidateError(d,true,'\u8BF7\u8F93\u5165\u7B80\u5386\u540D\u79F0');
e=false;
}
return e;
},changeToCn:function(){
a.LogKV('resume|my_resume|changetype|cn');
if(this._getModel().getResumeType()!='en')
{
return;
}
var f=$.lib('resume.modelmgr').getModel('moduleBase');
var g=$.lib('resume.modelmgr').getModel('sync_proxy');
var d=f.getCnData();
var e=g.getAllJSON();
g.reset({silent:true});
g.setModModels(d);
f.setEnData(e);
this._getModel().save('resume_type','cn');
},changeToEn:function(){
a.LogKV('resume|my_resume|changetype|en');
if($.lib('resume.modelmgr').getModel('setting').getResumeType()=='en')
{
return;
}
var f=$.lib('resume.modelmgr').getModel('moduleBase');
var g=$.lib('resume.modelmgr').getModel('sync_proxy');
var d=g.getAllJSON();
var e=f.getEnData();
g.reset({silent:true});
g.setModModels(e);
f.setCnData(d);
this._getModel().save('resume_type','en');
},rule:function(){
return {click:{renameResume:{bPropagable:false},changeResumeType:{bPropagable:false}}};
},events:function(){
return {renameResume:function(d,e){
$.stopPropagation(d);
var f=this;
a.createDialog({sTitle:'\u7B80\u5386\u540D\u79F0',nWidth:506,nOffsetX:140/2,sClassName:'resume_mod',sBodyHtml:'<div style="width:100%; max-height:600px; overflow:auto;position:relative;" id="content"></div>',sFootHtml:f.getView('module_edit.editToolBar',{isSingle:true}),onload:function(){
var g=this,h=g.S('content'),i=f._getModel().getTitle();
g.setHtml('content',f.getView('editRename.editRename',{title:i,titleIsDefault:f._getModel().titleIsDefault(),titleGuideData:f._getModel().titleGuideData()}));
a.addEvent(g.S('js_confirm'),'click',function(j){
var k=g.S('resume_name');
if(f._save(k))
{
g.close();
}
});
a.addEvent(g.S('js_cancel'),'click',function(j){
g.close();
});
$.ctrl('resume.controller.moduleEditBase').initPlaceholder(h);
},onshow:function(){
var g=this;
b.focusLast(g.S('resume_name'));
}});
},changeResumeType:function(d,e){
$.stopPropagation();
var h=this,f=a.calcPos(e,'json'),i=e.firstChild.innerHTML;
var g=a.createMenu({oEmbedWin:$.inWin(e),nX:14,nY:f.bottom+10,nWidth:e.offsetWidth+5,nItemHeight:e.offsetHeight+15,oItems:[{sId:'1',sItemValue:'\u4E2D\u6587\u7B80\u5386'},{sId:'2',sItemValue:'\u82F1\u6587\u7B80\u5386'}],onitemclick:function(k,j){
if(k==1)
{
h.changeToCn();
}
else{
h.changeToEn();
}
}});
g.selectItem(i=='\u4E2D\u6587\u7B80\u5386'?1:2);
}};
}};
});
});
$.package('resume/controller/edit_send.js',['resume/controller/edit_base.js'],function(){
var a=$.lib('resume.adaptor');
$.createCtrl('resume.controller.editSend',{sSuper:'resume.controller.editBase'},function(b){
var c=$.lib('resume.modelmgr');
return {initData_:function(){
this.super_(b,'initData_',arguments);
this.oFiles=this.moConfig.oFiles;
return this;
},getWorksListJSON:function(){
var e={};
var d=0;
c.getColl('works').forEach(function(f){
if(f.get('sStatus')=='complete')
{
e[d++]=a.getTopObject({id:d,filesize:f.formatSize(),filename:f.get('sName'),downloadlink:'/cgi-bin/ftnExs_download?k='+f.get('sKey')+'&t=exs_ftn_download&code='+f.get('sFetchCode'),code:f.get('sFetchCode'),key:f.get('sKey'),fid:f.get('sFileId'),exptime:f.get('nServerSecond'),appid:f.get('nAppId')});
}
});
return e;
},getResumeJSON:function(d){
var e={};
if(d.fileid)
{
e['cn']={bResumeAttach:true,sName:d.filename,sUploadMode:'control',nSize:d.filesize,sFileId:d.fileid,sMailId:d.mailid,sResumeId:c.getModel('sync_proxy')._msMailId,sStauts:'complete',bVirtual:true,sDownload:d.url,sFileUrl:$.T('/cgi-bin/resume?func=Preview&sid=$sid$&resumeid=$resume_id$&r=$r$&s=inbox').replace({sid:$.sid(),resume_id:c.getModel('sync_proxy')._msMailId,r:Math.random()})};
}
if(d.fileid_en)
{
e['en']={bResumeAttach:true,sName:d.filename_en,sUploadMode:'control',nSize:d.filesize_en,sFileId:d.fileid_en,sMailId:d.mailid_en,sResumeId:c.getModel('sync_proxy')._msMailId_en,sStauts:'complete',bVirtual:true,sDownload:d.url_en,sFileUrl:$.T('/cgi-bin/resume?func=Preview&sid=$sid$&resumeid=$resume_id$&r=$r$&s=inbox').replace({sid:$.sid(),resume_id:c.getModel('sync_proxy')._msMailId_en,r:Math.random()})};
}
return e;
},render:function(){
var d=this;
if(!d._checkProcess())
{
return this;
}
else{
if(c.getModel('moduleBase').checkOtherResumeIsNull())
{
d.buildResumeAttach(false,function(f,g){
d._buildResumeAttachCallbak(f,g);
});
}
else{
var e='\u662F\u5426\u4E00\u8D77\u53D1\u9001\u82F1\u6587\u7B80\u5386\uFF1F';
if(c.getModel('setting').getResumeType()=='en')
{
e='\u662F\u5426\u4E00\u8D77\u53D1\u9001\u4E2D\u6587\u7B80\u5386\uFF1F';
}
d._moDialog=a.createDialog({sId:'__resumeQMConfirm__',sTitle:'\u53D1\u9001\u786E\u8BA4',sBodyHtml:a.Top.TE(['<div>','<div class="cnfx_content">','<span class="dialog_icon icon_info_b"></span>','<div class="dialog_f_c">$msg$</div>','</div>','</div>']).replace({msg:e}),sFootHtml:['<div class=" txt_right cnfx_btn">','<a class="btn_gray confirm" id="js_yes" href="javascript:;">\u662F</a>','<a class="btn_gray cancel" id="js_no" href="javascript:;">\u5426</a>','<a class="btn_gray" id="js_cancel" href="javascript:;">\u53D6\u6D88\u53D1\u9001</a>','</div>'].join(''),onload:function(){
var f=this;
a.addEvent(f.S('js_yes'),'click',function(){
d.buildResumeAttach(true,function(g,h){
d._buildResumeAttachCallbak(g,h);
});
f.close();
});
a.addEvent(f.S('js_no'),'click',function(){
d.buildResumeAttach(false,function(g,h){
d._buildResumeAttachCallbak(g,h);
});
f.close();
});
a.addEvent(f.S('js_cancel'),'click',function(){
f.close();
});
}});
}
}
return this;
},_buildResumeAttachCallbak:function(d,e){
var f=this;
if(d)
{
a.setGlobalVarValue('resume',a.getTopObject({sSubject:$.trim(c.getModel('setting').getTitle()),sSender:$.trim(c.getModModel('baseinfo').get('name')),sMailId:c.getModel('sync_proxy')._msMailId,sMailIdEn:c.getModel('sync_proxy')._msMailId_en,oResumeAttach:a.getTopObject(f.getResumeJSON(e)),oResumeWorks:a.getTopObject(f.getWorksListJSON())}));
window.location.href='/cgi-bin/readtemplate?t=compose&s=cnew&s=left&loc=readtemplate,resume_center,,21&kvclick=resume|my_resume|send_to_compose&sid='+$.sid();
}
else{
f.showError('\u751F\u6210\u7B80\u5386\u5931\u8D25');
}
},_checkProcess:function(){
var d=this;
if(d.oFiles.getUploadList().length!=0)
{
d.alert({title:'\u53D1\u9001\u7B80\u5386',sType:'custom',msg:'<div class="resume_workUploading"><div class="dialog_feedback"><span class="dialog_icon ico_loading2"></span><div class="dialog_f_c"><div>\u8BF7\u7B49\u5F85\u4F5C\u54C1\u4E0A\u4F20\u5B8C\u6210...</div></div></div></div>',confirmBtnTxt:'\u6211\u77E5\u9053\u4E86'});
return false;
}
else if(c.getModel('config').getModuleEditedPer()===0)
{
d.showError('\u8BF7\u586B\u5199\u7B80\u5386\u5185\u5BB9\u540E\u53D1\u9001');
return false;
}
return true;
},buildResumeAttach:function(f,e,d){
var k=this;
var i;
var l=$.inWin();
var h=l.setTimeout(function(){
h=null;
if(d)
{
return;
}
i=k.createDialog({bAnimation:false,sTitle:'\u751F\u6210\u7B80\u5386',sBodyHtml:'<div class="resume_createResume"><div class="dialog_feedback"><span class="dialog_icon ico_loading2"></span><div class="dialog_f_c"><div>\u6B63\u5728\u751F\u6210\u7B80\u5386...</div></div></div></div>',onclose:function(){
h&&l.clearTimeout(h);
}});
},600);
function g()
{
i&&i.close();
h&&l.clearTimeout(h);
h=null;
}
var j={sid:$.sid()};
if(c.getModel('setting').getResumeType()=='en')
{
j=$.extend({},j,{filename_en:c.getModel('setting').getTitle()+'.pdf',content_en:$.ctrl('resume.controller.preview').render('attach_pdf')});
}
else{
j=$.extend({},j,{filename:c.getModel('setting').getTitle()+'.pdf',content:$.ctrl('resume.controller.preview').render('attach_pdf')});
}
if(f)
{
j=$.extend({},j,k._getOtherResumeAttachData());
}
$.lib('resume.ajax').ajax({sUrl:'/cgi-bin/resume_export?outputf=json&func=ExportSend',bProcessURL:false,bProcessData:true,nTimeout:15000,vData:j,onsuccess:function(m){
if(!i||!i.isClose())
{
g();
e(true,m);
}
},onerror:function(){
if(!i||!i.isClose())
{
g();
e(false);
}
}});
return this;
},_getOtherResumeAttachData:function(){
var f={};
if(c.getModel('setting').getResumeType()=='en')
{
var e=c.getModel('sync_proxy').getAllJSON(),d=c.getModel('moduleBase').getCnData();
c.getModel('sync_proxy').reset({silent:true});
c.getModel('sync_proxy').setModModels(d,{silent:true});
c.getModel('setting').set('resume_type','cn',{silent:true});
f={filename:c.getModel('setting').getTitle()+'.pdf',content:$.ctrl('resume.controller.preview').render('attach_pdf')};
c.getModel('sync_proxy').reset({silent:true});
c.getModel('sync_proxy').setModModels(e,{silent:true});
c.getModel('setting').set('resume_type','en',{silent:true});
}
else{
var e=c.getModel('moduleBase').getEnData(),d=c.getModel('sync_proxy').getAllJSON();
c.getModel('sync_proxy').reset({silent:true});
c.getModel('sync_proxy').setModModels(e,{silent:true});
c.getModel('setting').set('resume_type','en',{silent:true});
f={filename_en:c.getModel('setting').getTitle()+'.pdf',content_en:$.ctrl('resume.controller.preview').render('attach_pdf')};
c.getModel('sync_proxy').reset({silent:true});
c.getModel('sync_proxy').setModModels(d,{silent:true});
c.getModel('setting').set('resume_type','cn',{silent:true});
}
return f;
}};
});
});
$.package('resume/controller/edit_works.js',['resume/controller/edit_base.js','resume/controller/edit_works_btn.js','resume/controller/edit_works_drag.js','resume/controller/edit_works_item.js'],function(){
var a=$.lib('resume.utils');
$.createCtrl('resume.controller.editWorks',{sSuper:'resume.controller.editBase'},function(b){
return {nMaxFileNum:10,initData_:function(){
this.super_(b,'initData_',arguments);
this.oFiles=this.moConfig.oFiles;
return this;
},render:function(){
var c=this;
c.dom$().html(c.getView('works.editWordsBox',{maxfilesize:c.nMaxFileNum}));
setTimeout(function(){
c._initUploader(function(){
c._resetAll();
c.listenTo_(c.oFiles,{add:c._addOne,reset:c._resetAll,destroy:c._adjustRender,preDestroy:c._adjustRender,destroy_err:c._adjustRender});
});
},400);
return this;
},_resetAll:function(){
var c=this;
c.$$('[ui-type="worksItem"]').remove();
c.oFiles.forEach(function(d){
c._addOne(d);
});
},_addOne:function(c){
var d=this;
$.ctrl('resume.controller.editWorksItem',{oFiles:d.oFiles,oModel:c,oContainer$:d.$$('[ui-type="uploadWorksBtn"]'),getWorksUploader:function(){
return d._moUploader;
}});
this._adjustRender();
return this;
},_adjustRender:function(){
a.adjustRender();
return this;
},_initUploader:function(c){
var d=this;
$.ctrl('resume.controller.editWorksBtn',{oDom:d.$$('[ui-type="uploadWorksBtn"]'),oFiles:d.oFiles,nMaxFileNum:d.nMaxFileNum}).initUploader(function(e){
d._moUploader=e;
c();
});
d.ctrl('resume.controller.editWorksDrag',{oDom:d.$$('[ui-type="uploadWorksBtn"]'),oUploaderContainer$:d.$$('[ui-type="resume_works_drag"]'),oFiles:d.oFiles,nMaxFileNum:d.nMaxFileNum}).initUploader();
return this;
},rule:function(){
return {mouseover:{showBackground:{bPropagable:false}},mouseout:{hideBackground:{bPropagable:false}}};
},events:function(){
return {showBackground:function(c,d){
$.stopPropagation(c);
$.$(d).addClass('resume_collect_Active');
},hideBackground:function(c,d){
$.stopPropagation(c);
$.$(d).rmClass('resume_collect_Active');
}};
}};
});
});
$.package('resume/controller/edit_works_btn.js',['resume/controller/edit_base.js','resume/lib/adaptor.js'],function(){
var a=$.lib('resume.adaptor');
$.createCtrl('resume.controller.editWorksBtn',{sSuper:'resume.controller.editBase'},function(b){
return {nTotalFileSize:1024*1024*1024,initData_:function(){
this.super_(b,'initData_',arguments);
this.oFiles=this.moConfig.oFiles;
this.mnMaxFileNum=this.moConfig.nMaxFileNum||5;
return this;
},initEvents_:function(){
this.listenTo_(this.oFiles,{add:this._toggle,reset:this._toggle,destroy:this._toggle,preDestroy:this._toggle,destroy_err:this._toggle});
return this.super_(b,'initEvents_',arguments);
},_syncFile:function(c){
var d=this.oFiles.getByCid(c.sModelCid);
d&&d.syncFile();
},_checkTotalFileSize:function(c){
var d=0;
$.each(c,function(e){
var f=e.get('nSize');
d+=!f||f<0?0:f;
});
return (this._getLeaveFileSize()-d>0);
},_getLeaveFileSize:function(){
return this.nTotalFileSize-this.oFiles.getTotalSize();
},initUploader:function(c){
var d=this;
if(d._moUploader)
{
c(d._moUploader);
return this;
}
a.getWorksUploaderCreater(function(e,f,g){
if(e)
{
d._moUploader=f("popup",d.getUploadConfig_(g.qmFileSelecter));
c(d._moUploader);
}
d._toggle();
});
return this;
},getUploadConfig_:function(c,d){
var g=this;
var e=$.T('\u6700\u591A\u8FD8\u80FD\u4E0A\u4F20$maxnum$\u90E8\u4F5C\u54C1');
var f=new c({nMaxFileNum:g.mnMaxFileNum,nMaxFileSize:g.nTotalFileSize,oLangs:{FILENUM_OVERFLOW:e.replace({maxnum:g.mnMaxFileNum}),FILESIZE_ZERO:'\u4E0D\u80FD\u5BFC\u5165\u7A7A\u6587\u4EF6'}});
return $.extend({sInputTitle:'\u70B9\u51FB\u4E0A\u4F20\u4F5C\u54C1',onselect:function(h){
var i=g.mnMaxFileNum-g._getFilesLength();
if(i<=0)
{
g.showError('\u6700\u591A\u53EA\u80FD\u4E0A\u4F20'+g.mnMaxFileNum+'\u90E8\u4F5C\u54C1');
a.LogKV('resume|my_resume|works_err|filenum_overflow');
return;
}
f.setConfig('nMaxFileNum',i);
f.setLang('FILENUM_OVERFLOW',e.replace({maxnum:i}));
var j=f.selectFiles(h);
if(j)
{
if(j.FILENUM_OVERFLOW)
{
a.LogKV('resume|my_resume|works_err|filenum_overflow');
}
g.showError(j[0].sMsg);
}
else if(!g._checkTotalFileSize(h))
{
g.showError('\u6587\u4EF6\u5BB9\u91CF\u4E0D\u8DB3\uFF0C\u4F60\u8FD8\u53EF\u4EE5\u4E0A\u4F20'+a.oFileUploadUtil.formatSize(g._getLeaveFileSize())+'\u7684\u6587\u4EF6');
}
else{
a.LogKV('resume|my_resume|works_init');
g.oFiles.addFiles(h).next();
if(i-h.length<=0)
{
g.showError('\u4F5C\u54C1\u6570\u91CF\u5DF2\u8FBE'+g.mnMaxFileNum+'\u4E2A\u4E0A\u9650');
a.LogKV('resume|my_resume|works_err|filenum_full');
}
}
},onprocess:$.bindContext(g,g._syncFile),onerror:function(h){
var i=h.get('sError')||'';
if(i.indexOf(/cgi,-2,ftnCreatefile/)!=-1)
{
g.onsessiontimeout();
}
g._syncFile(h);
},oncomplete:function(h){
a.LogKV('resume|my_resume|works_suc');
g._syncFile(h);
},oContainer:g.$$('#worksUploader').data(0)},d);
},_toggle:function(){
if(this._getFilesLength()>=this.mnMaxFileNum)
{
this.dom$().addClass('resume_collect_hiddenAdd');
}
else{
this.dom$().rmClass('resume_collect_hiddenAdd');
}
},_getFilesLength:function(){
return this.oFiles.getVisibleList().length;
}};
});
});
$.package('resume/controller/edit_works_drag.js',['resume/controller/edit_works_btn.js','resume/lib/utils.js','resume/lib/adaptor.js'],function(){
var a=$.lib('resume.adaptor');
var b=$.lib('resume.utils');
$.createCtrl('resume.controller.editWorksDrag',{sSuper:'resume.controller.editWorksBtn'},function(c){
return $.extend(b.getDragLib(c),{initUploader:function(){
var d=this;
a.getWorksUploaderCreater(function(e,f,g){
if(e)
{
var i=d.getUploadConfig_(g.qmFileSelecter,{sDragLeaveMsg:'\u5C06\u6587\u4EF6\u62D6\u62FD\u81F3\u6B64\u533A\u57DF\uFF0C\u53EF\u76F4\u63A5\u4E0A\u4F20',oContainer:d.dragDom$_().data(0),bNoStyle:true});
var h=i.onselect;
i.onselect=function(){
d.hideDragDom_();
return h.apply(this,arguments);
};
f('drag',i);
d.initWinEvents_();
d.fire('init_suc');
}
else{
d.fire('init_err');
}
});
return this;
},dragDom$_:function(){
return this.moConfig.oUploaderContainer$||this.dom$();
}});
});
});
$.package('resume/controller/edit_works_item.js',['resume/controller/edit_base.js','resume/lib/adaptor.js'],function(){
var a=$.lib('resume.adaptor');
$.createCtrl('resume.controller.editWorksItem',{sSuper:'resume.controller.editBase'},function(b){
return {init_:function(){
this.super_(b,'init_',arguments);
this.listenTo_(this._moModel,{destroy:this.remove,preDestroy:this._toggle,destroy_err:this._toggle,'change:sStatus':this.render,'change:sUploadStep':this.render,'change:nPercent':this.renderPercent_,'change:nSignPercent':this.renderSizeContent_('signPercent',Math.round,Math),'change:nSpeed':this.renderSizeContent_('speed',this._moModel.stringifySpeed,this._moModel)});
return this;
},initData_:function(c){
this.super_(b,'initData_',arguments);
this._moFiles=c.oFiles;
this._moModel=c.oModel;
this._moModel.oCom=this;
this._getWorksUploader=c.getWorksUploader||function(){
};
this._render();
return this;
},_toggle:function(){
if(this._moModel.bHasDestroyed)
{
this.dom$().hide();
}
else{
this.dom$().show();
}
},rule:function(){
var c={bPropagable:false};
return {click:{remove:c,removeDirect:c,retry:c,preview:c,resume:c},mouseover:{hoverPreviewClass:c},mouseout:{leavePreviewClass:c}};
},events:function(){
var c=this;
return {hoverPreviewClass:function(d,e){
$.stopPropagation(d);
if(this._moModel.get('sStatus')=='complete'&&!$.$($.target(d)).attr('ck'))
{
$.$(e).addClass('resume_collect_item_Hover');
}
},leavePreviewClass:function(d,e){
$.stopPropagation(d);
$.$(e).rmClass('resume_collect_item_Hover');
},remove:function(d,e){
$.stopPropagation(d);
c.confirm({title:'\u5220\u9664\u63D0\u793A',msg:'\u5220\u9664\u540E\u4E0D\u53EF\u6062\u590D\uFF0C\u786E\u5B9A\u8981\u5220\u9664\uFF1F',confirmBtnTxt:'\u662F',cancelBtnTxt:'\u5426',onreturn:function(f){
f&&c._moFiles.remove(c._moModel);
}});
},removeDirect:function(){
this._moFiles.remove(this._moModel);
},retry:function(d,e){
$.stopPropagation(d);
this._moModel.retry();
},resume:function(d,e){
$.stopPropagation(d);
this._getWorksUploader()&&this._moModel.resume(this._getWorksUploader());
},preview:function(d,e){
$.stopPropagation(d);
var g=this._moModel;
var f=this._moFiles;
if(g.get('sStatus')!='complete')
{
return;
}
a.previewWorks(g,{fPrev:function(h){
var j=f.indexOf(f.getByCid(h.cid));
var m=f.models;
for(var n=j,k,l;n-->0;)
{
l=m[n];
k=l&&l.get('sStatus')=='complete'&&a.getFilePreviewData(l);
if(k)
{
return k;
}
}
return null;
},fNext:function(h){
var j=f.indexOf(f.getByCid(h.cid));
var m=f.models;
for(var n=j,o=m.length,k,l;++n<o;)
{
l=m[n];
k=l&&l.get('sStatus')=='complete'&&a.getFilePreviewData(l);
if(k)
{
return k;
}
}
return null;
}});
}};
},dom$:function(){
return this._moDom$;
},_render:function(){
this._moDom$=$.fragment(this.getView('works.editWordsItemBox',this.getFileInfo_())).insertTo(this.moConfig.oContainer$,'beforeBegin');
this.initEvents_();
return this;
},render:function(){
this.dom$().html(this.getView('works.editWordsItem',this.getFileInfo_()));
},renderPercent_:function(d,c){
var e=this.$$('[ui-type="percent"]').data(0);
e&&(e.style.width=(c||0)+'%');
},renderSizeContent_:function(e,c,d){
var f=this;
return function(h,g){
var i=f.$$('[ui-type="'+e+'"]').data(0);
i&&(i.innerHTML=c.call(d,g||0));
};
},getFileInfo_:function(){
var c=this._moModel.toTplJSON();
c.resumable=this._getWorksUploader()&&this._getWorksUploader().resume&&this._moModel.hasLocalPath();
c.removeMethod=(c.status=='stopped'&&!c.resumable)||c.status=='cancel'?'removeDirect':'remove';
return c;
}};
});
});
$.package('resume/controller/select.js',['resume/lib/utils.js','resume/lib/adaptor.js','resume/controller/edit_base.js'],function(b){
var a=$.lib('resume.adaptor');
var c=$.lib('resume.utils');
$.createCtrl('resume.controller.select',{sSuper:'resume.controller.editBase'},function(d){
return {initData_:function(e){
this.super_(d,'initData_',arguments);
this._moSelectCtrl=null;
return this;
},render:function(){
this._showSelectModules();
return this;
},initEvents_:function(){
$.$($.inWin()).addEvent('scroll',this._fAdjustSettingScroll,{oContext:this});
this.listenTo_(c.adjustRender.oEventer,'my_resume',this._fAdjustSettingScroll);
this.listenTo_($.lib('resume.modelmgr').getModel('setting'),'change:order',function(e,f){
this._sortModuleByOrder();
});
this.listenTo_($.lib('resume.modelmgr').getModel('setting'),'change:order_en',function(e,f){
this._sortModuleByOrder();
});
return this.super_(d,'initEvents_',arguments);
},remove:function(){
$.$($.inWin()).delEvent('scroll',this._fAdjustSettingScroll,{oContext:this});
return this.super_(d,'remove');
},_sortModuleByOrder:function(e){
var h=$.$("#resume_order_content").data(),j=$.lib('resume.modelmgr').getModel('setting'),f=e||j.getOrder();
for(var k=2;k<f.length;k++)
{
if(j.getTypeSkin()=="1"&&f[k]=="self_evaluate")
{
continue;
}
var g=$.$("#"+f[k]);
if(g.data())
{
g.insertTo(h,"beforeEnd");
}
}
$.$("#custom").insertTo(h,"beforeEnd");
},_fAdjustSettingScroll:function(){
var e=0,k=$.$('.resume_info'),l=$.$(a.S("resume_setting",$.inWin())),f=l.height(),h=k.height(),i=k.offset().top;
var j=$.$($.inWin()).scrollTop();
if(i<j&&f<h)
{
l.css('top',Math.min(j+e,h-f+i));
var g=j-(h-f+i);
l.find('.resume_setting_tab').css('top',Math.max(Math.min(g,f-120),0));
}
else{
l.css('top',i);
}
},rule:function(){
return {click:{showSelectModules:{bPropagable:false},showSelectSkins:{bPropagable:false}}};
},events:function(){
return {showSelectModules:function(e,f){
$.stopPropagation(e);
this._showSelectModules();
a.LogKV('resume|my_resume|module_select|btn');
},showSelectSkins:function(e,f){
$.stopPropagation(e);
this._showSelectSkins();
a.LogKV('resume|my_resume|skin|btn');
}};
},_keeyOnly:function(f,e){
if(this._moSelectCtrl)
{
this._moSelectCtrl.remove();
}
var g=this.ctrl(f,e).render();
this.dom$().append(g.dom$());
this._moSelectCtrl=g;
this.listenTo_(g,'remove',function(){
this._moSelectCtrl=null;
});
return this;
},_showSelectModules:function(){
var f='resume_modV resume_modV_Sel';
if($.lib('resume.modelmgr').getModel('setting').getResumeType()=='en')
{
f+=' resume_modV_Sel_En';
}
var e=this._keeyOnly('resume.controller.select_modules',{sClassName:f});
c.adjustRender();
return e;
},_showSelectSkins:function(){
var f='resume_modV resume_modV_Tmpl';
if($.lib('resume.modelmgr').getModel('setting').getResumeType()=='en')
{
f+=' resume_modV_Tmpl_En';
}
var e=this._keeyOnly('resume.controller.select_skins',{sClassName:f});
c.adjustRender();
return e;
}};
});
});
$.package('resume/controller/select_modules.js',['resume/controller/edit_base.js'],function(b){
var a=$.lib('resume.adaptor');
var c=$.lib('resume.utils');
$.createCtrl('resume.controller.select_modules',{sSuper:'resume.controller.editBase'},function(d){
return {_sCustomIdPrefix:'_custom_',initEvents_:function(){
var f=this,e=$.lib('resume.modelmgr').getModel('config').getModulesList();
f._eachModel(function(g,h){
if(h.id=='custom')
{
f.listenTo_(g,'change',f._renderModuleList);
}
else if(h.id!='baseinfo')
{
f.listenTo_(g,'change:visible',f._renderModuleList);
}
});
$.$($.inWin()).addEvent('resize',this._fAdjustHeight,{oContext:this});
return this.super_(d,'initEvents_',arguments);
;
},_fAdjustHeight:function(){
return false;
var m=$.$($.inWin()),e=60,i=m.scrollTop(),j=m.height(),l=this.$$('.resume_modV_cnt'),k=$.$('#resume_content'),f=l.height(),g=l.offset().top,h=k.offset().top;
if(f>=j-h-e)
{
l.css('overflowY','auto');
l.css('overflowX','hidden');
l.css('height',j-h-e);
}
else{
l.css('overflowY','auto');
l.css('overflowX','hidden');
l.css('height','auto');
}
},remove:function(){
$.$($.inWin()).delEvent('resize',this._fAdjustHeight,{oContext:this});
return this.super_(d,'remove');
},_getModule:function(e){
var f=$.inWin()['__app_ModuleInter__'];
return f&&f.getModule(e);
},_getModuleListOrder:function(){
var g=$.$("#drag_resume_selModList"),e=g.find("li"),f=[];
for(var h=0;h<e.data().length;h++)
{
f.push($.$(e.data(h)).attr("moduleid"));
}
return f;
},render:function(){
var e=this;
e.dom$().html(e.getView('select.selectModules',{}));
e._renderModuleList();
c.adjustRender();
setTimeout(function(){
e._fAdjustHeight();
});
return this;
},_eachModel:function(e){
var g=this;
var f=[];
$.each($.lib('resume.modelmgr').getModel('config').getModulesList(),function(h){
e($.lib('resume.modelmgr').getModModel(h.id),h);
});
},_renderModuleList:function(){
var f=$.lib('resume.viewmgr').getTpl('select.selectModulesItem'),e='';
$.each(this.getModuleInfo_(),function(g){
e+=f.replace(g);
});
this.$$('.resume_selModList').html(e);
this._initDrag(this.$$('#drag_resume_selModList').data()[0]);
},_saveModuleOrder:function(e){
var f=$.lib('resume.modelmgr').getModel('setting'),g='order';
if(f.getResumeType()=='en')
{
g='order_en';
}
f.save(g,e.join("|"));
},_initDrag:function(e){
var n=this,o=a.Top,p=$.inWin(),f=e,m=o.GelTags("li",f),s=f.id,u='resumedragtitle',h=o.S(u,p),w='resumedragmoving',k=o.S(w,p);
o.QMDragDrop.delGroup(s);
var r="resume_selModItemDragWrap",v="position:absolute;width:186px;display:none;z-index:1000;",t="position:absolute;width:185px;display:none;z-index:1000;";
if($.lib('resume.modelmgr').getModel('setting').getResumeType()=='en')
{
r="resume_selModItemDragWrap resume_modV_Sel_En";
v="position:absolute;width:186px;display:none;z-index:1000;";
t="position:absolute;width:185px;display:none;z-index:1000;";
}
h&&o.removeSelf(h);
o.insertHTML(p.document.body,'afterBegin','<div id="'+u+'" class="'+r+'" style="'+v+'"></div>');
h=o.S(u,p);
k&&o.removeSelf(k);
o.insertHTML(p.document.body,'afterBegin','<div id="'+w+'" class="'+r+'" style="'+t+'"></div>');
k=o.S(w,p);
var q="abledrag",x="initdrag";
var g={};
g[s]={};
g[s]._moDropLiPos=[];
g[s]._moContainerPos=null;
g[s]._moCurDragLi=null;
g[s]._moCurDropLi=null;
g[s]._mnCurDropLiIndex=-1;
g[s]._mbCurDropLast=false;
var z=function(){
var B=[];
for(var C=o.GelTags("li",f),i=C.length,E=0;E<i;E++)
{
if(C[E].getAttribute(q))
{
var D=o.calcPos(C[E]);
D[4]=C[E];
B.push(D);
}
}
return B;
};
for(var A=m.length-1;A>=0;A--)
{
if(m[A].getAttribute(q)&&m[A].getAttribute(x)!="1")
{
m[A].setAttribute(x,"1");
var j=new o.QMDragDrop.Draggable(m[A],{handle:$.$(m[A]).find(".resume_selModItem_dragIcon").data(0),oTitle:h,threshold:5},{ondragstart:function(i){
$.preventDefault(i);
var B=this;
g[s]._moCurDragLi=B.getElement();
o.addClass(g[s]._moCurDragLi.firstChild,"resume_selModLabel_DragChanging");
h.innerHTML=o.S(g[s]._moCurDragLi.id,p).innerHTML;
o.addClass(h.firstChild,"resume_selModLabel_DragMoving");
h.firstChild.style.cursor="move";
o.show(h,1);
g[s]._moContainerPos=o.calcPos(f);
g[s]._moContainerPos[0]+=65;
g[s]._moContainerPos[2]+=g[s]._moCurDragLi.offsetHeight-16;
g[s]._moCurDropLi=null;
g[s]._moDropLiPos=z();
},ondrag:function(i){
$.preventDefault(i);
var F=h.ownerDocument,C=Math.max(o.bodyScroll(F,'scrollLeft')+i.clientX-5,g[s]._moContainerPos[3]),E=Math.max(o.bodyScroll(F,'scrollTop')+i.clientY-5,g[s]._moContainerPos[0]),D=h.offsetWidth+C,B=h.offsetHeight+E;
if(D>g[s]._moContainerPos[1])
{
C=g[s]._moContainerPos[1]-h.offsetWidth;
}
if(B>g[s]._moContainerPos[2])
{
E=g[s]._moContainerPos[2]-h.offsetHeight;
}
h.style.left=C+2+'px';
h.style.top=E-8+'px';
},ondragend:function(i){
}});
o.QMDragDrop.addGroup(s,j);
}
}
var y=function(i,B){
var F=o.calcPos(i),G=o.calcPos(B);
k.innerHTML=B.innerHTML;
o.show(k,0);
o.addClass(B.firstChild,"resume_selModLabel_DragChanging");
k.style.top=F[0]+"px";
k.style.left=F[3]+1+"px";
o.show(k,1);
var D=10,C=1,E=(G[0]-F[0])/D;
if(g[s]._moTimer)
{
clearInterval(g[s]._moTimer);
}
g[s]._moTimer=setInterval(function(){
if(C<=D)
{
k.style.top=Math.ceil(F[0]+E*C)+"px";
C++;
}
else{
o.show(k,0);
o.rmClass(B.firstChild,"resume_selModLabel_DragChanging");
clearInterval(g[s]._moTimer);
}
},30);
};
var l=new o.QMDragDrop.DropTarget(f,{ondrop:function(i){
if(g[s]._moCurDropLi)
{
o.LogKV('resume|selectmodule|dragdrop|1');
n._saveModuleOrder(n._getModuleListOrder());
}
var F=o.calcPos(h),E=o.calcPos(g[s]._moCurDragLi);
if(Math.abs(E[0]-F[0])>1)
{
var C=8,B=1,D=(E[0]-F[0])/C;
var G=setInterval(function(){
if(B<=C)
{
h.style.top=Math.ceil(F[0]+D*B)+"px";
B++;
}
else{
o.show(h,0);
o.rmClass(h.firstChild,"resume_selModLabel_DragMoving");
o.rmClass(g[s]._moCurDragLi.firstChild,"resume_selModLabel_DragChanging");
clearInterval(G);
}
},20);
}
else{
o.show(h,0);
o.rmClass(h.firstChild,"resume_selModLabel_DragMoving");
o.rmClass(g[s]._moCurDragLi.firstChild,"resume_selModLabel_DragChanging");
}
}},function(B,C,D){
var I=h.offsetLeft+h.offsetWidth/2,J=h.offsetTop+h.offsetHeight/2,H=g[s]._moDropLiPos.length-1,M=null,G=0,E,F,L=o.calcPos(h),K=o.calcPos(g[s]._moCurDragLi);
L[0]<K[0]?F=true:F=false;
if(J<g[s]._moDropLiPos[H][2])
{
if(F)
{
for(var N=0;N<=H;N++)
{
if(J<g[s]._moDropLiPos[N][2])
{
M=g[s]._moDropLiPos[G=N][4];
N==H?E=true:E=false;
break;
}
}
}
else{
for(var N=H;N>=0;N--)
{
if(g[s]._moDropLiPos[N][0]<=J)
{
M=g[s]._moDropLiPos[G=N][4];
N==H?E=true:E=false;
break;
}
}
}
}
if(g[s]._moCurDragLi!=M)
{
if(g[s]._moCurDropLi)
{
o.rmClass(g[s]._moCurDropLi.firstChild,"resume_selModLabel_DragChanging");
}
g[s]._moCurDropLi=M;
g[s]._mnCurDropLiIndex=G;
g[s]._mbCurDropLast=E;
if(E)
{
M.parentNode.appendChild(g[s]._moCurDragLi);
}
else if(F)
{
M.parentNode.insertBefore(g[s]._moCurDragLi,M);
}
else{
M.parentNode.insertBefore(g[s]._moCurDragLi,M.nextSibling);
}
y(g[s]._moCurDragLi,M);
g[s]._moDropLiPos=z();
}
return true;
});
o.QMDragDrop.addGroup(s,l);
},_cutCustomTitle:function(e){
if(!e)
{
return;
}
var f=e.split(' ');
var g=f[0];
var h='';
if(g.length>10)
{
return g.substring(0,9)+'...';
}
for(var j=1;j<f.length;j++)
{
if(f[j]=='')
{
continue;
}
if(g.length+f[j].length<10&&h=='')
{
g=g+' '+f[j];
}
else{
if(h=='')
{
h=f[j];
}
else{
h=h+' '+f[j];
}
if(h.length>10)
{
h=h.substring(0,9)+'...';
break;
}
}
}
return g+' '+h;
},getModuleInfo_:function(){
var g=this;
var f=[];
g._eachModel(function(i,j){
if(j.id=='custom')
{
var k=i.get('data');
$.each(k,function(o,p){
if(!o.title)
{
return;
}
f.push({isCustomMod:true,moduleId:g._sCustomIdPrefix+p,moduleName:a.Top.htmlEncode(g._cutCustomTitle(o.title)),visible:o.visible});
});
}
else if(j.id=='baseinfo')
{
f.push({moduleId:j.id,moduleName:j.name,visible:true,disabled:true});
}
else{
f.push({moduleId:j.id,moduleName:j.name,visible:i.get('visible')});
}
});
var e=$.lib('resume.modelmgr').getModel('setting').getOrder();
var n=0;
for(var l=0;l<e.length;l++)
{
for(var m=n;m<f.length;m++)
{
if(f[m].moduleId==e[l])
{
var h=f[n];
f[n]=f[m];
f[m]=h;
n++;
}
}
}
return f;
},_isCustomMod:function(e){
return e.indexOf(this._sCustomIdPrefix)>-1;
},rule:function(){
return {click:{changeVisible:{bPropagable:true},addCustomMod:{bPropagable:true},editMod:{bPropagable:true},deleteCustomMod:{bPropagable:true}},mouseover:{showModBg:{bPropagable:true},showUnderLine:{bPropagable:true},addDragClass:{bPropagable:true}},mouseout:{hideModBg:{bPropagable:true},hideUnderLine:{bPropagable:true},removeDragClass:{bPropagable:true}}};
},events:function(){
var f=this;
function e(g)
{
return function(h,i){
$.stopPropagation(h);
var k=$.$(i);
var m=k.attr('moduleId');
var l=this._isCustomMod(m)?m.split(this._sCustomIdPrefix)[1]:null;
var j=l?this._getModule('custom'):this._getModule(m);
if(j)
{
return g.call(this,l,j,m,k,h,i);
}
};
}
return {changeVisible:e(function(g,h,j,i){
var k=i.attr('checked');
if(g)
{
$.lib('resume.modelmgr').getModModel('custom').saveCustomById(g,{visible:k});
h.scrollToSelf(k,g);
}
else{
$.lib('resume.modelmgr').getModModel(j).save('visible',k);
h.scrollToSelf(k);
}
}),addCustomMod:function(g){
$.stopPropagation(g);
$.ctrl('resume.controller.module_edit_custom').renderDialog(undefined,true);
},showUnderLine:function(g,h){
$.stopPropagation(g);
$.$(h).addClass('qui_txtUnderline').parents('a').addClass('qui_txtNoUnderline');
},hideUnderLine:function(g,h){
$.stopPropagation(g);
$.$(h).rmClass('qui_txtUnderline').parents('a').rmClass('qui_txtNoUnderline');
},addDragClass:function(g,h){
$.stopPropagation(g);
$.$(h).parents('a').addClass('resume_selModLabel_DragBegan');
},removeDragClass:function(g,h){
$.stopPropagation(g);
$.$(h).parents('a').rmClass('resume_selModLabel_DragBegan');
},deleteCustomMod:function(g,h){
$.stopPropagation(g);
var i=$.$(h).attr('moduleId').split('_')[2];
f.confirm({title:'\u5220\u9664\u63D0\u793A',msg:'\u5220\u9664\u540E\u4E0D\u53EF\u6062\u590D\uFF0C\u786E\u5B9A\u8981\u5220\u9664\uFF1F',confirmBtnTxt:'\u662F',cancelBtnTxt:'\u5426',onreturn:function(j){
j&&$.lib('resume.modelmgr').getModel('module_custom').deleteCustomById(i);
}});
},showModBg:e(function(g,h,i,j){
if(g)
{
var k=a.S("_custom_"+g,$.inWin());
h.showBackground($.$(k).find('[index="'+g+'"]'));
}
else{
h.showBackground();
}
}),hideModBg:e(function(g,h,i,j){
if(g)
{
var k=a.S("_custom_"+g,$.inWin());
h.hideBackground($.$(k).find('[index="'+g+'"]'));
}
else{
h.hideBackground();
}
}),editMod:e(function(g,h){
if(g)
{
h.edit(g,true);
}
else{
h.edit(0,true);
}
})};
}};
});
});
$.package('resume/controller/select_skins.js',['resume/lib/adaptor.js','resume/lib/utils.js'],function(b){
var a=$.lib('resume.adaptor');
var c=$.lib('resume.utils');
$.createCtrl('resume.controller.select_skins',{sSuper:'resume.controller'},function(d){
return {initEvents_:function(){
this.listenTo_($.lib('resume.modelmgr').getModel('setting'),'change:skin',function(f,e){
this.$$('.resume_selTmplList li').rmClass('resume_selTmplImgWrap_chked');
this.$$('[skin="'+e+'"]').addClass('resume_selTmplImgWrap_chked');
a.LogKV('resume|my_resume|skins|'+e);
});
$.$($.inWin()).addEvent('resize',this._fAdjustHeight,{oContext:this});
return this.super_(d,'initEvents_',arguments);
},remove:function(){
$.$($.inWin()).delEvent('resize',this._fAdjustHeight,{oContext:this});
return this.super_(d,'remove');
},_fAdjustHeight:function(){
return false;
var m=$.$($.inWin()),e=41,i=m.scrollTop(),j=m.height(),l=this.$$('.resume_modV_cnt'),k=$.$('#resume_content'),f=l.height(),g=l.offset().top,h=k.offset().top;
if(f>=j-h-e)
{
l.css('overflowY','auto');
l.css('overflowX','hidden');
l.css('height',j-h-e);
}
else{
l.css('overflowY','auto');
l.css('overflowX','hidden');
l.css('height','auto');
}
},render:function(e){
var h=$.lib('resume.modelmgr').getModel('config').getSkinList().slice(),f=$.lib('resume.modelmgr').getModel('setting').getSkin();
$.each(h,function(j,k){
j=$.extend({},j);
if(j['id']==f)
{
j.checked=true;
}
h[k]=j;
});
var i=$.lib('resume.viewmgr').view('select.selectSkins',{list:h});
this.dom$().html(i);
c.adjustRender();
var g=this;
setTimeout(function(){
g._fAdjustHeight();
});
return this;
},rule:function(){
return {click:{changeSkin:{bPropagable:false},previewSkin:{bPropagable:false}}};
},events:function(){
return {changeSkin:function(e,f){
$.stopPropagation(e);
var g=$.$(f).attr('skin'),h='skin';
if($.lib('resume.modelmgr').getModel('setting').getResumeType()=='en')
{
h='skin_en';
}
g&&$.lib('resume.modelmgr').getModel('setting').save(h,g);
},previewSkin:function(e,f){
$.stopPropagation(e);
this.ctrl('resume.controller.editPreviewSkin',{skin:$.$(f).attr('skin')});
}};
}};
});
});
$.package('resume/controller/edit_preview_skin_dialog.js',['resume/controller/edit_base.js','resume/lib/adaptor.js'],function(){
var a=$.lib('resume.adaptor');
$.createCtrl('resume.controller.editPreviewSkinDialog',{sSuper:'resume.controller.editBase'},function(b){
return {init_:function(){
return this.superEx_(b,'init_',arguments).render();
},getModel_:function(){
return $.lib('resume.modelmgr').getModel('setting');
},render:function(){
var d=this;
var c=d.createDialog({sId:'edit_preview_skin_dialog',sTitle:'\u5F00\u59CB\u5236\u4F5C\u7B80\u5386',nWidth:700,sBodyHtml:d.getView('editPreviewSkin.dialog',{skinList:$.lib('resume.modelmgr').getModel('config').getSkinList()}),onload:function(){
var e=this;
a.liveEvent(e.getPanelDom(),{rule:function(){
return {click:{previewSkin:{bPropagable:false},useSkin:{bPropagable:false}},mouseout:{motSkin:{bPropagable:false}},mouseover:{morSkin:{bPropagable:false}}};
},events:function(){
return {previewSkin:function(f,g){
$.stopPropagation(f);
setTimeout(function(){
d.listenTo_(d.ctrl('resume.controller.editPreviewSkin',{skin:a.attr(g,'skin')}),'remove',function(){
if(!d.getModel_().getTypeSkin())
{
e.show();
}
});
},100);
e.hide();
},useSkin:function(f,g){
$.stopPropagation(f);
var h='skin';
if(d.getModel_().getResumeType()=='cn')
{
h='skin_en';
}
d.getModel_().save(h,$.$(g).attr('skin'));
e.close();
},morSkin:function(f,g){
$.stopPropagation(f);
a.addClass(g,'resume_allTmpl_item_Hover');
},motSkin:function(f,g){
$.stopPropagation(f);
a.rmClass(g,'resume_allTmpl_item_Hover');
}};
}});
},onclose:function(){
d.remove();
}});
d.listenTo_(d.getModel_(),'change:skin',function(){
c.close();
});
return this;
}};
});
});
$.package('resume/controller/edit_preview_skin.js',['resume/controller/edit_base.js','resume/lib/adaptor.js'],function(){
var a=$.lib('resume.adaptor');
$.createCtrl('resume.controller.editPreviewSkin',{sSuper:'resume.controller.editBase'},function(b){
return {init_:function(){
return this.superEx_(b,'init_',arguments)._renderPreviewBox();
},getModel_:function(){
return $.lib('resume.modelmgr').getModel('setting');
},initData_:function(){
this.super_(b,'initData_',arguments);
this._moInitSkin=this.moConfig.skin||this.getModel_().getSkin();
return this;
},_renderPreviewBox:function(){
var c=this;
var d=c._moInitSkin;
a.getQMPreviewBox(function(e,f){
if(e)
{
f({nZIndex:1400,sContent:c.getView('editPreviewSkin.content',$.lib('resume.modelmgr').getModel('config').getSkinInfo(d)),nWidth:800,onshow:function(){
var j=this;
var g=j.getBodyDom();
var i=g.ownerDocument;
var h=i.createElement('div');
h.innerHTML=j.preContent(c.getView('editPreviewSkin.toolbar'));
j.getContainerDom().appendChild(h);
a.addEvent(j.S('confrim'),'click',function(){
var k='skin';
if(c.getModel_().getResumeType()=='en')
{
k='skin_en';
}
c.getModel_().save(k,d);
j.close();
});
c._initMouseWheelEvents(j);
},onclose:function(){
c.remove();
}});
}
});
return this;
},_initMouseWheelEvents:function(c){
var h=this;
var i=$.inWin();
var g=c.S('contentWrap');
if($.isOS('mac'))
{
g.style.overflowY='auto';
return;
}
var f=0;
var e=100;
function d(j)
{
var k=g.scrollTop;
if(j.wheelDelta>0||j.detail<0)
{
if(f<k)
{
f-=e;
}
else{
f=k-e;
}
}
else{
if(f>k)
{
f+=e;
}
else{
f=k+e;
}
}
a.qmAnimation.stop(g);
a.qmAnimation.play(g,{from:k,to:f,speed:'fast',easing:'easeOut',onaction:function(l){
g.scrollTop=l;
}});
}
a.addEvent(g,'mousewheel',d);
a.addEvent(g,'DOMMouseScroll',d);
return this;
}};
});
});
$.package('resume/controller/preview.js',['resume/controller/edit_base.js','resume/view/preview.js','resume/lib/adaptor.js'],function(){
var a=$.lib('resume.adaptor');
var b=$.lib('resume.modelmgr');
$.createCtrl('resume.controller.preview',{sSuper:'resume.controller.editBase'},function(c){
return {render:function(d){
switch(d)
{case 'preview':
return this._renderContentForPreview();
case 'compose':
return this._removeExtAttrs(this._getResumeHtml());
case 'public_view':
return this._renderContentForPublic();
case 'resume_preview':
case 'attach_preview_inbox':
case 'attach_preview':
return this._setContentCenter(this._removeExtAttrs(this._getResumeHtml()));
case 'download_doc':
case 'attach_doc':
return this._renderPageForDoc();
case 'download_pdf':
case 'attach_pdf':
return this._renderPageForPdf();
case 'print':
default:
return this._renderPage(this._setPrintContentCenter(this._removeExtAttrs(this._getResumeHtml('pdf'))));
}
},_removeExtAttrs:function(d){
var g=$.inWin();
var e=g.document;
var f=e.createElement('div');
f.innerHTML=d;
$.$('*',f).forEach(function(h){
if(h.nodeType!=3)
{
var i=$.$(h);
if(i.attr('output')=="false")
{
i.remove();
}
else{
i.rmAttr('ui-type').rmAttr('id').rmAttr('class').rmAttr('ck').rmAttr('mor').rmAttr('mov');
}
}
});
return f.innerHTML;
},_getResumeHtml:function(d){
var h=this;
var g=$.lib('resume.modelmgr').getModel('config');
var e={};
$.each(g.getModulesList(),function(j){
var k=h.ctrl('resume.controller.module_'+j.id);
if(k.getModel_().get('visible')!==false||j.id=='face'||j.id=='baseinfo')
{
if((k.getModel_().isEmpty&&!k.getModel_().isEmpty())||j.id=='custom')
{
if(d=='pdf')
{
var l=$.ctrl("resume.view."+g.getSkinView()).getPdfTPL();
e[j.id]=l[j.id].replace(k.getTplData_(false));
}
else{
e[j.id]=k.renderHTML(h._getSkinTplName(d,k.getSkinName()),false);
}
}
else{
e[j.id]='';
}
}
else{
e[j.id]='';
}
k.remove();
});
var i;
if(d=='pdf')
{
var f=$.ctrl("resume.view."+g.getSkinView()).getPdfTPL();
i=f.layout.replace(e);
}
else{
i=$.lib('resume.viewmgr').view(h._getSkinTplName(d,g.getSkinView()+'.layout'),e);
}
return h._sortModuleByOrder(i,d);
},_sortModuleByOrder:function(d,e){
var p=$.inWin(),f=p.document.createElement("div"),g=$.$(f),o=$.lib('resume.modelmgr').getModel('setting'),k=$.ctrl("resume.controller.select_modules")._getModuleListOrder();
if(k.length==0)
{
k=o.getOrder();
}
f.style.height=0;
f.style.overflow="hidden";
f.innerHTML=d;
g.insertTo(p.document.body,"afterBegin");
if(o.getTypeSkin()=="4"&&$.lib('resume.modelmgr').getModModel('baseinfo').get('visible')&&$.lib('resume.modelmgr').getModModel('baseinfo').get('avatar'))
{
var h=this.ctrl('resume.controller.module_face');
var j=g.find("#face");
if(e=='pdf')
{
var m=$.ctrl("resume.view."+$.lib('resume.modelmgr').getModel('config').getSkinView()).getPdfTPL();
j.insert(m['face'].replace(h.getTplData_(false)),'beforeBegin');
}
else{
j.insert(h.renderHTML(this._getSkinTplName(e,h.getSkinName()),false),'beforeBegin');
}
g.remove(j.data(0));
}
var n=g.find("#resume_order_content").data(0);
for(var r=2;r<k.length;r++)
{
if(o.getTypeSkin()=="1"&&k[r]=="self_evaluate")
{
continue;
}
var l=g.find("#"+k[r]).data(0)||g.find(".js_"+k[r]).data(0);
if(l)
{
$.$(l).insertTo(n,"beforeEnd");
}
}
var q=g.html()||d;
g.remove();
return q;
},_getSkinTplName:function(e,d){
switch(e)
{case "wap":
return ["module_skin_wap",d.split('.')[1]].join(".");
case "en_wap":
return ["module_skin_en_wap",d.split('.')[1]].join(".");
case "export":
return d.split('.').join('_'+e+'.');
default:
return d;
}
},_renderPage:function(d){
var e=b.getModel('setting');
return this.getView('preview.html_warp',{title:e.getTitle(),charset:'gb18030',content:d});
},_setContentCenter:function(d){
return '<div class="resume_cntTableWrap">'+d+'</div>';
},_setPrintContentCenter:function(d){
var e='<style>.resumeOther_wrapper {position: relative; width: 802px; margin: 0 auto; text-align: left; background-color: #fff; box-shadow: 0 0 2px rgba(0, 0, 0, .1); } .resumeOther_shadowForIe {position: absolute; left: -2px; top: -2px; right: 2px; bottom: 2px; z-index: 1; background-color: #000; filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=5); -ms-filter:"progid:DXImageTransform.Microsoft.Blur(pixelradius=3)" "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)"; *zoom:1; opacity: 0; } .resumeOther_cnt {position: relative; z-index: 2; margin: 0 auto; padding: 20px 0; background-color: #fff; }</style>';
return e+'<div class="resumeOther_wrapper"><div class="resumeOther_shadowForIe"></div><div class="resumeOther_cnt">'+d+'</div></div>';
},_renderPageForDoc:function(){
return this._renderPage(this._getResumeHtml('export').replace(/&nbsp\;&nbsp\;/g,'&nbsp; '));
},_renderPageForPdf:function(){
var d=$.lib('resume.modelmgr').getModel('config');
var e=[this._renderPage(this._setContentCenter(this._getResumeHtml('pdf'))),'<style>.noBreak {page-break-inside: avoid !important;}</style>','<script>',';(function(){','function each(_aoNodes, _afCallback){for(var i = 0; i < _aoNodes.length; i++){if(_afCallback(_aoNodes[i],i) === false){return}}}','each(document.querySelectorAll("[output=\'false\']"), function(_aoNode){','try{_aoNode.parentNode.removeChild(_aoNode)}catch(e){}','});','each(document.getElementsByTagName("*"),function(_aoNode){','if(_aoNode.type!=3){','_aoNode.style.content="";','each(_aoNode.childNodes,function(_aoChildNode){','if (_aoChildNode.nodeType==3 && _aoChildNode.textContent.trim()){_aoNode.className="noBreak"; return false;}','})','}','});','})();','</script>'].join('');
return e;
},_renderContentForPublic:function(){
var g=$.lib('resume.modelmgr'),h=g.getModel('setting');
var d={is_public:h.get('is_public'),is_public_en:h.get('is_public_en'),empty:false,empty_en:false};
if(h.getResumeType()=='en')
{
d.resume_type='en';
if(g.getModel('config').getModuleEditedPer()===0)
{
d.empty_en=true;
}
if(g.getModel('moduleBase').checkOtherResumeIsNull())
{
d.empty=true;
}
if((d.empty_en||!d.is_public_en)&&!d.empty&&d.is_public)
{
var e=g.getModel('moduleBase').getCnData();
g.getModel('sync_proxy').reset({silent:true});
g.getModel('sync_proxy').setModModels(e,{silent:true});
g.getModel('setting').set('resume_type','cn',{silent:true});
d.resume_type='cn';
}
}
else{
d.resume_type='cn';
if(g.getModel('config').getModuleEditedPer()===0)
{
d.empty=true;
}
if(g.getModel('moduleBase').checkOtherResumeIsNull())
{
d.empty_en=true;
}
if((d.empty||!d.is_public)&&!d.empty_en&&d.is_public_en)
{
var f=g.getModel('moduleBase').getEnData();
g.getModel('sync_proxy').reset({silent:true});
g.getModel('sync_proxy').setModModels(f,{silent:true});
g.getModel('setting').set('resume_type','en',{silent:true});
d.resume_type='en';
}
}
var i='preview.public_html_warp';
if($.inWin()._bResumeInWap)
{
if(d.resume_type=='en')
{
d.content=this._getResumeHtml('en_wap');
}
else{
d.content=this._getResumeHtml('wap');
}
i='preview.public_html_warp_wap';
}
else{
d.content=this._setContentCenter(this._removeExtAttrs(this._getResumeHtml()));
}
if((!d.is_public&&!d.is_public_en)||(d.empty&&d.empty_en))
{
$.$($.inWin().document.body).addClass('resume_publicErrorBody');
$.$($.inWin().document.body.parentNode).addClass('resume_publicErrorHtml');
}
return this.getView(i,d);
},_renderContentForPreview:function(){
var d=this;
return this.getView('preview.preview_layout',{content:this._removeExtAttrs(this._getResumeHtml()),attachList:d.getView('preview.attach_box',{list:b.getColl('works').filter(function(e){
return e.get('sStatus')=='complete';
}).map(function(e){
return d.getView('preview.attach_item',e.toTplJSON());
}).join('')})});
}};
});
});
$.package('resume/controller/public_view.js',['resume/model/sync_proxy.js','resume/controller/edit_base.js','resume/controller/preview.js','resume/lib/adaptor.js'],function(b){
var a=$.lib('resume.adaptor');
var c=$.lib('resume.modelmgr').getModel('sync_proxy');
$.createCtrl('resume.controller.public_view',{sSuper:'resume.controller.editBase'},function(d){
return {render:function(){
var e=this;
e.ondata(function(f){
if(f)
{
e.renderPages_();
$.inWin().document.title='QQ\u90AE\u7BB1 - '+$.lib('resume.modelmgr').getModel('setting').getTitle();
}
else{
e.dom$().html('<div style="text-align:center; width: 200px; margin: 0 auto; padding: 300px 0 150px;">\u83B7\u53D6\u7B80\u5386\u6570\u636E\u5931\u8D25</div>');
}
});
return this;
},ondata:function(e){
var f=this;
if(c.isReady())
{
e(true);
}
else{
var g=function(h){
var i=h.setting;
if(i&&f.getDataUrl_().indexOf('resume.qmail.com')>-1)
{
if(i.resume_type=='en'&&i.is_public)
{
i.resume_type='cn';
}
}
c.setAllModel(h);
e(true);
};
if(window.oResumeJsonpData&&window.oResumeJsonpData.result&&window.oResumeJsonpData.result["errCode"]=="0")
{
setTimeout(function(){
g(window.oResumeJsonpData.data);
window.oResumeJsonpData=false;
},0);
return this;
}
$.lib('resume.ajax').ajax({sUrl:f.getDataUrl_(),vData:{},onsuccess:function(h){
g(h);
},onerror:function(){
e(false);
}});
}
return this;
},getDataUrl_:function(){
var e=$.inWin().location.href;
return [e,e.indexOf('?')==-1?'?':'&','type=json&inputf=user&sid='].join('');
},renderPages_:function(){
this.dom$().html(this.ctrl('resume.controller.preview').render('public_view'));
return this;
},rule:function(){
return {click:{changeToCn:{bPropagable:false},changeToEn:{bPropagable:false}}};
},events:function(){
var e=this;
var g=$.lib('resume.modelmgr').getModel('sync_proxy');
var f=$.lib('resume.modelmgr').getModel('setting');
return {changeToCn:function(h,i){
var l=$.lib('resume.modelmgr').getModel('moduleBase'),j=l.getCnData(),k=l.getEnData();
f.set('resume_type','cn',{silent:true});
g.reset({silent:true});
g.setModModels(j);
e.renderPages_();
e.dom$().find('[ck="changeToCn"]').addClass('resume_public_switch_btn_Active');
e.dom$().find('[ck="changeToEn"]').rmClass('resume_public_switch_btn_Active');
},changeToEn:function(h,i){
var l=$.lib('resume.modelmgr').getModel('moduleBase'),j=l.getCnData(),k=l.getEnData();
f.set('resume_type','en',{silent:true});
g.reset({silent:true});
g.setModModels(k);
e.renderPages_();
e.dom$().find('[ck="changeToEn"]').addClass('resume_public_switch_btn_Active');
e.dom$().find('[ck="changeToCn"]').rmClass('resume_public_switch_btn_Active');
}};
}};
});
});
$.package('resume/controller/module_ability.js',[],function(a){
$.createCtrl('resume.controller.module_ability',{sSuper:'resume.controller.moduleBase'},function(b){
return {};
});
$.createCtrl('resume.controller.module_edit_ability',{sSuper:'resume.controller.moduleEditBase'},function(c){
var b=$.lib('resume.adaptor');
return {};
});
});
$.package('resume/controller/module_apply_intention.js',[],function(a){
$.createCtrl('resume.controller.module_apply_intention',{sSuper:'resume.controller.moduleBase'},function(b){
return {};
});
$.createCtrl('resume.controller.module_edit_apply_intention',{sSuper:'resume.controller.moduleEditBase'},function(b){
return {};
});
});
$.package('resume/controller/module_awards.js',[],function(a){
$.createCtrl('resume.controller.module_awards',{sSuper:'resume.controller.moduleBase'},function(b){
return {};
});
$.createCtrl('resume.controller.module_edit_awards',{sSuper:'resume.controller.moduleEditBase'},function(c){
var b=$.lib('resume.adaptor');
return {sModelType:'multi'};
});
});
$.package('resume/controller/module_baseinfo.js',['resume/controller/module_base.js'],function(a){
$.createCtrl('resume.controller.module_baseinfo',{sSuper:'resume.controller.moduleBase'},function(b){
return {};
});
$.createCtrl('resume.controller.module_edit_baseinfo',{sSuper:'resume.controller.moduleEditBase'},function(d){
var b=$.lib('resume.adaptor');
var c=$.lib('resume.validate');
var e=$.lib('array');
return {initData_:function(){
this.super_(d,'initData_',arguments);
this._moSelList={};
return this;
},validateData:function(g,f){
this.superEx_(d,'validateData',arguments);
var n=b.Top,h=true,m=this,i=g.S('content');
var l=n.finds('input[name="name"]',i)[0],j=n.finds('input[name="email"]',i)[0],k=n.finds('input[name="mobile"]',i)[0];
if($.trim(f['name'])=='')
{
m.showValidateError(l,true,'\u59D3\u540D\u4E0D\u80FD\u4E3A\u7A7A');
h=false;
}
if(f['email']=='')
{
m.showValidateError(j,true,'\u90AE\u7BB1\u4E0D\u80FD\u4E3A\u7A7A');
h=false;
}
else if(!c.email(f['email']))
{
m.showValidateError(j,true,'\u90AE\u7BB1\u683C\u5F0F\u9519\u8BEF');
h=false;
}
if(f['mobile']=='')
{
m.showValidateError(k,true,'\u624B\u673A\u53F7\u7801\u4E0D\u80FD\u4E3A\u7A7A');
h=false;
}
else if(!c.mobile(f['mobile']))
{
m.showValidateError(k,true,'\u624B\u673A\u53F7\u7801\u683C\u5F0F\u9519\u8BEF');
h=false;
}
f['age']=parseFloat(f['age']);
if(f['age']%1!==0||!f['age']||f['age']<0||f['age']>Math.pow(2,32)-1)
{
f['age']=undefined;
}
return h;
},onbeforeremove:function(){
$.each(this._moSelList,function(f){
f&&f.close();
});
return this.super_(d,'onbeforeremove',arguments);
}};
});
});
$.package('resume/controller/module_custom.js',[],function(a){
$.createCtrl('resume.controller.module_custom',{sSuper:'resume.controller.moduleBase'},function(b){
return {toggle:$.noop,initEvents_:function(){
this.listenTo_(this.getModel_(),'change',this.renderModel_);
},initEachEvents_:function(){
var d=this;
var e=$.ctrl('TagEventModHandle');
var c=this.$$(".js_custom").data();
for(var f=0;f<c.length;f++)
{
e.handle(this,{oDom:c[f]});
}
return this;
}};
});
$.createCtrl('resume.controller.module_edit_custom',{sSuper:'resume.controller.moduleEditBase'},function(c){
var b=$.lib('resume.adaptor'),d=$.lib('resume.utils');
return {sModelType:'multi',render:function(){
var e={};
if(this._moTargetData)
{
e=this.getModel_().get('data')[this._moTargetData];
e.index=this._moTargetData;
}
else{
e.visible=true;
e.index='-1';
}
this.dom$().html(this.getSelfView_(d.htmlEncodeAllData(e)));
return this;
},save:function(e){
this.getModel_().saveCustomById(e[0].index,e[0]);
},ondialogload_:function(e){
var f=e.S('content'),g=b.Top.finds('textarea',f);
$.each(g,function(h){
d.autoTextArea(f,h,44);
});
},validateData:function(f,e){
this.superEx_(c,'validateData',arguments);
var i=b.Top;
_bIsValidate=true,_oSelf=this,_oContent=f.S('content');
var h=i.finds('input[name="title"]',_oContent)[0],g=i.finds('textarea[name="content"]',_oContent)[0];
if(e[0]['title']=='')
{
if(i.attr(h,'isValidate')!='0')
{
_oSelf.showValidateError(h,true,'\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A');
}
_bIsValidate=false;
}
if(e[0]['content']=='')
{
if(i.attr(g,'isValidate')!='0')
{
_oSelf.showValidateError(g,true,'\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A');
}
_bIsValidate=false;
}
return _bIsValidate;
}};
});
});
$.package('resume/controller/module_education.js',[],function(a){
$.createCtrl('resume.controller.module_education',{sSuper:'resume.controller.moduleBase'},function(b){
return {};
});
$.createCtrl('resume.controller.module_edit_education',{sSuper:'resume.controller.moduleEditBase'},function(c){
var b=$.lib('resume.adaptor');
return {sModelType:'multi'};
});
});
$.package('resume/controller/module_experience.js',[],function(a){
$.createCtrl('resume.controller.module_experience',{sSuper:'resume.controller.moduleBase'},function(b){
return {};
});
$.createCtrl('resume.controller.module_edit_experience',{sSuper:'resume.controller.moduleEditBase'},function(c){
var b=$.lib('resume.adaptor');
return {sModelType:'multi',ondialogload_:function(d){
this.super_(c,'ondialogload_',arguments);
var e=d.S('content');
b.liveEvent(e,{rule:function(){
return {click:{expandExp:{bPropagable:false}}};
},events:function(){
return {expandExp:function(f,g){
$.stopPropagation(f);
var l=b.Top.parents('.module_edit_single',g)[0],o=b.Top.finds('.resume_hideExpWrap',l)[0],n=g.lastChild,m=g.firstChild;
var r=function(s){
var t=0;
while(!b.Top.hasClass(s,'dialog_content'))
{
t+=s.offsetTop;
s=s.offsetParent;
}
return t;
};
if(o.style.display=='none')
{
var j=b.attr(e,'nMaxHeight')||600,h=e.scrollHeight;
o.style.display='block';
var i=o.offsetHeight;
o.style.overflow='hidden';
o.style.height='0px';
function p(s)
{
o.style.height=s+'px';
var t=h+s;
if(t>j)
{
e.style.height=j+'px';
var u=l.scrollHeight+r(l);
if(u>e.scrollTop+e.clientHeight)
{
e.scrollTop+=u-(e.scrollTop+e.clientHeight)+1;
}
}
else{
e.style.height=t+'px';
}
}
var k={from:0,to:i,speed:i*2,tween:'linear',onaction:function(s){
p(s);
},oncomplete:function(s){
p(s);
o.style.overflow='';
o.style.height='';
n.innerHTML='\u6536\u8D77';
b.Top.rmClass(m,'resume_expandExpIco_show');
b.Top.addClass(m,'resume_expandExpIco_hide');
}};
b.createAnimation(o,k);
}
else{
var i=o.offsetHeight,j=b.attr(e,'nMaxHeight')||600,h=e.scrollHeight;
o.style.overflow='hidden';
function q(s)
{
o.style.height=s+'px';
var t=h-i+s;
if(t<j)
{
e.style.height=t+'px';
}
}
var k={from:i,to:0,speed:i*2,tween:'linear',onaction:function(s){
q(s);
},oncomplete:function(s){
q(s);
o.style.display='none';
o.style.height=i+'px';
o.style.position='';
o.style.overflow='';
n.innerHTML='\u5C55\u5F00\u66F4\u591A';
b.Top.rmClass(m,'resume_expandExpIco_hide');
b.Top.addClass(m,'resume_expandExpIco_show');
}};
b.createAnimation(o,k);
}
}};
}});
}};
});
});
$.package("resume/controller/module_face.js",['resume/lib/adaptor.js','resume/controller/module_base.js'],function(){
var a=$.lib('resume.adaptor');
$.createCtrl('resume.controller.module_face',{sSuper:'resume.controller.moduleBase'},function(b){
return {getTplData_:function(){
return $.extend(this.super_(b,'getTplData_',arguments),$.lib('resume.modelmgr').getModel('config').getSkinInfo());
},rule:function(){
var c=this.super_(b,'rule',arguments);
c.mouseover=c.mouseover||{};
c.mouseout=c.mouseout||{};
c.mouseover.showFaceHideModeBtnUnderline=c.mouseout.hideFaceHideModeBtnUnderline={bPropagable:false};
return c;
},events:function(){
var c=this.super_(b,'events',arguments);
c.edit=function(d,e){
$.stopPropagation(d);
this.edit();
};
c.showFaceHideModeBtnUnderline=function(d,e){
$.stopPropagation(d);
$.$(e).addClass('qui_txtUnderline');
};
c.hideFaceHideModeBtnUnderline=function(d,e){
$.stopPropagation(d);
$.$(e).rmClass('qui_txtUnderline');
};
return c;
},edit:function(){
var c=this;
a.getUpdateFaceCom(function(d){
d({sImgUrl:c._getImgUrl(),sSavingMsg:'\u6B63\u5728\u4FDD\u5B58\u5934\u50CF...',nWidth:125,nHeight:175,nSaveWidth:125*2,nSaveHeight:175*2,oDialogOpts:{nWidth:540,sTitle:'\u4E0A\u4F20\u7167\u7247'},oDialogBodyOpts:{bRmoveImg:false,nOuterHeight:250,nNoImgPaddingTop:250/2-8,sLeftMargin:'0 42px 0 50px'},onreturn:function(f,e){
if(f)
{
$.lib('resume.ajax').ajax({sUrl:'/cgi-bin/picsvr?func=Upload',vData:{'url':f},onsuccess:function(g){
e();
c._setImgUrl(g.url);
},onerror:function(){
c.showError('\u88C1\u526A\u56FE\u7247\u5931\u8D25');
}});
return false;
}
}});
});
},_setImgUrl:function(c){
this.getModel_().save('avatar',c);
return this;
},_getImgUrl:function(){
return this.getModel_().get('avatar');
}};
});
});
$.package('resume/controller/module_init.js',[],function(a){
$.createCtrl('resume.controller.moduleInit',{sSuper:'resume.controller'},function(b){
var c=$.lib('resume.modelmgr').getModel('sync_proxy');
return {init_:function(){
this.super_(b,'init_',arguments);
$.inWin()['__app_ModuleInter__']=this;
return this;
},initData_:function(){
this._moModulesCtrls={};
return this.super_(b,'initData_',arguments);
},getModule:function(d){
return this._moModulesCtrls[d];
},updateModule:function(d){
var f='resume.controller.module_'+d;
var e=this._moModulesCtrls[d];
e&&e.remove();
e=this.ctrl(f,{oDom:$.$('<div>').appendTo(this.$$("#"+d))});
this._moModulesCtrls[d]=e;
e.render();
},render:function(){
var e=$.lib('resume.modelmgr').getModel('config');
var d={};
$.each(e.getModulesList(),function(f){
d[f.id]='<div id="'+f.id+'"></div>';
});
this.dom$().html($.lib('resume.viewmgr').view(e.getSkinView()+'.layout',d));
$.each(e.getModulesList(),function(f){
this._renderModule(f.id);
},{oContext:this});
this._initSelectAllEvt();
$.ctrl("resume.controller.select")._sortModuleByOrder();
return this;
},_renderModule:function(d){
var f='resume.controller.module_'+d;
var e=this._moModulesCtrls[d];
e&&e.remove();
e=this.ctrl(f,{oDom:$.$('<div>').appendTo(this.$$("#"+d))});
this._moModulesCtrls[d]=e;
e.render();
return this;
},_initSelectAllEvt:function(){
var f=$.inWin();
var d=f.document;
var e=this;
$.$(f).addEvent('keydown',function(g){
if(g.ctrlKey&&g.keyCode==65)
{
var h=e.dom$().data(0);
if(f.getSelection)
{
var j=f.getSelection(),i=d.createRange();
j.rangeCount>0&&j.removeAllRanges();
i.selectNode(h);
j.addRange(i);
}
else{
var i=d.body.createTextRange();
i.moveToElementText(h);
i.select();
}
$.preventDefault(g);
}
});
}};
});
});
$.package('resume/controller/module_project.js',[],function(a){
$.createCtrl('resume.controller.module_project',{sSuper:'resume.controller.moduleBase'},function(b){
return {};
});
$.createCtrl('resume.controller.module_edit_project',{sSuper:'resume.controller.moduleEditBase'},function(c){
var b=$.lib('resume.adaptor');
return {sModelType:'multi'};
});
});
$.package('resume/controller/module_school_experience.js',[],function(a){
$.createCtrl('resume.controller.module_school_experience',{sSuper:'resume.controller.moduleBase'},function(b){
return {};
});
$.createCtrl('resume.controller.module_edit_school_experience',{sSuper:'resume.controller.moduleEditBase'},function(c){
var b=$.lib('resume.adaptor');
return {sModelType:'multi'};
});
});
$.package('resume/controller/module_self_evaluate.js',[],function(a){
$.createCtrl('resume.controller.module_self_evaluate',{sSuper:'resume.controller.moduleBase'},function(b){
return {};
});
$.createCtrl('resume.controller.module_edit_self_evaluate',{sSuper:'resume.controller.moduleEditBase'},function(b){
return {};
});
});
$.package('resume/controller/my_resume.js',['resume/model/sync_proxy.js','resume/model/setting.js','resume/lib/adaptor.js','resume/lib/utils.js'],function(b){
var a=$.lib('resume.adaptor');
var f=$.lib('resume.utils');
var c=$.lib('resume.modelmgr');
var e=c.getModel('sync_proxy');
var d=c.getModel('setting');
$.createCtrl('resume.controller.my_resume',{sSuper:'resume.controller.editBase'},function(g){
return {init_:function(h){
h||(h={});
this.superEx_(g,'init_',arguments);
return this;
},initEvents_:function(){
var h=this;
this.listenTo_($.lib('resume.modelmgr').getColl('works'),{error:function(i,j){
if(j)
{
switch(j.sMethod)
{case 'model.uploadRetry':
h.showError('\u91CD\u8BD5\u5931\u8D25');
break;
case 'coll.read':
h.showError('\u83B7\u53D6\u4F5C\u54C1\u6570\u636E\u5931\u8D25 <a href="javascript:;">[\u91CD\u8BD5]</a>');
a.S('msgBoxDIV').getElementsByTagName('a')[0].onclick=function(){
i.fetch();
};
break;
}
}
},destroy_err:function(j,i,k){
if(k&&k.sError=='cgi_error/-2')
{
h.onsessiontimeout();
}
else{
h.showError('\u5220\u9664\u4F5C\u54C1\u5931\u8D25');
}
},destroy:function(){
h.showInfo('\u5220\u9664\u4F5C\u54C1\u6210\u529F');
}});
h.listenTo_(e,{'fetch_success':h._render,'fetch_error':function(){
h._renderError();
}});
h.listenTo_(d,'change:skin',h._renderContentBody);
h.listenTo_(d,'change:skin_en',h._renderContentBody);
h.listenTo_(d,'change:resume_type',h._renderEdit);
h.listenTo_(f.adjustRender.oEventer,'my_resume',h._adjustContrainerHeight);
return this.super_(g,'initEvents_',arguments);
},render:function(){
var h=this;
a.LogKV('resume|my_resume|use');
$.inWin()._bInResumeCenter=true;
if(e.isReady())
{
h._render();
}
else{
$.lib('resume.modelmgr').getColl('works').fetch();
e.fetchAll();
}
e.onOnceReady(function(){
if($.inWin().location.href.indexOf('kvclick=resume|entry|leftpanel')==-1)
{
f.maybeNewUserForResume();
}
$.lib('resume.modelmgr').getModel('localstorage').check();
});
return this;
},_render:function(){
var h=this;
T_SPEED.push({cgiEnd:+new Date()});
h._renderEdit();
h._initImportTip();
T_SPEED.push({allEnd:+new Date()});
if(!this._hadError&&!this._hadReport)
{
$.lib('resume.utils').indexSpeedReport(1,T_SPEED);
}
!this._hadReport&&$.lib('resume.utils').performanceReport(2);
this._hadReport=true;
return this;
},_renderError:function(){
$.$($.inWin().document.body).addClass('resume_errorBody');
$.$($.inWin().document.body.parentNode).addClass('resume_errorHtml');
this.dom$().html(this.getView('my_resume.resumeErrorContent'));
this._hadError=true;
},_renderEdit:function(){
var h=this;
if(!h._moModelIniter)
{
h.dom$().html(h.getView('my_resume.layout'));
h._moModelIniter=h.ctrl('resume.controller.moduleInit',{oDom:h.$$('#resume_content')});
h._renderWorks();
h._initDownloadSelect();
h.initImport_();
}
h.ctrl('resume.controller.editRename',{oDom:h.$$('[ui-type="resumeTitle"]')}).render();
if(h._moSettingCtrl)
{
h._moSettingCtrl.render();
}
else{
h._moSettingCtrl=h.ctrl('resume.controller.select',{oDom:h.$$('#resume_setting')});
h._moSettingCtrl.render();
}
h._renderContentBody();
return this;
},initImport_:function(){
var h=this;
h.$$('[ui-type="importResume"]').each(function(j,i){
var k=$.$(j);
setTimeout(function(){
var l=h.ctrl('resume.controller.editImport',{oDom:k,sFrom:'select_module'}).render().on('import_start',function(){
h._moTipsCtrl&&h._moTipsCtrl.remove();
});
},500);
});
h.ctrl('resume.controller.editImportDrag',{oDom:h.$$('[ui-type="resume_import_drag"]')}).on('import_start',function(){
h._moTipsCtrl&&h._moTipsCtrl.remove();
});
},_initImportTip:function(){
if(this.moConfig.sSubCmd!='importMail'&&!this._moTipsCtrl)
{
this._moTipsCtrl=this.ctrl('resume.controller.editImportTip',{oTargetNode:this.$$('[ui-type="importResume"]').data(0)}).render();
}
},_adjustContrainerHeight:function(){
var i=this;
var h=arguments.callee;
if(h.nWaiter)
{
return;
}
h.nWaiter=$.inWin().setTimeout(function(){
h.nWaiter=null;
var l=i.$$('#resume_cnt_wrap');
var j=i.$$('#resume_cnt').height();
var k=Math.max(j,i.$$('#resume_setting').height()+38);
if(j==k)
{
l.css('height','auto');
}
else if(l.height()<k)
{
l.css('height',k);
}
},100);
},_renderContentBody:function(){
this._moModelIniter.render();
var h=this.$$('.resume_container');
var i=d.getSkin();
var j=h.attr('skin');
j&&h.rmClass('resume_tmpl'+j);
h.addClass('resume_tmpl'+i);
h.attr('skin',i);
return this;
},_renderWorks:function(){
this.ctrl('resume.controller.editWorks',{oDom:this.$$('#js_works_list'),oFiles:$.lib('resume.modelmgr').getColl('works')}).render();
return this;
},_initDownloadSelect:function(){
var h=this;
h.$$('[ui-type="downloadMenu"]').each(function(i){
a.createSelect({oContainer:i,sDefaultItemValue:"\u5BFC\u51FA\u7B80\u5386",sMenuType:"dropdown",oMenu:{nWidth:"auto",nMaxWidth:180,nMinWidth:90,bAutoItemView:true,bAutoClose:true,oItems:[{sId:'pdf',sItemValue:'PDF \u683C\u5F0F'},{sId:'doc',sItemValue:'DOC \u683C\u5F0F'}]},onselect:function(j){
var k=j.sId=='pdf'?'pdf':'doc';
a.LogKV('resume|my_resume|download');
a.LogKV('resume|my_resume|download|'+k);
if(c.getModel('config').getModuleEditedPer()===0)
{
h.showError('\u8BF7\u586B\u5199\u7B80\u5386\u5185\u5BB9\u540E\u5BFC\u51FA');
}
else{
$.openWin('/cgi-bin/resume_export',{sMethod:'POST',oData:{sid:$.sid(),filename:d.getTitle()+'.'+k,content:h.ctrl('resume.controller.preview').render('download_'+k),r:$.now()}});
}
return true;
}});
$.$(i).find('.btn_select_txt').addClass('resume_btnDownloadResume');
});
},rule:function(){
return {click:{sendResume:{bPropagable:false},previewResume:{bPropagable:false},printResume:{bPropagable:false},publicResume:{bPropagable:false},reloadMyResume:{bPropagable:false},clearData:{bPropagable:false},getResumeContent:{bPropagable:false},downloadTest:{bPropagable:false}}};
},events:function(){
var h=this;
return {sendResume:function(i,j){
$.stopPropagation(i);
h.ctrl('resume.controller.editSend',{oFiles:$.lib('resume.modelmgr').getColl('works')}).render();
},publicResume:function(i,j){
$.stopPropagation(i);
$.preventDefault(i);
h.ctrl('resume.controller.editPublic');
return false;
},previewResume:function(i,j){
$.stopPropagation(i);
a.Top.goNewWin('/cgi-bin/readtemplate?t=resume_center&cmd=resume_preview&nocheckframe=true&kvclick=resume|my_resume|resume_preview&sid='+$.sid());
},printResume:function(i,j){
$.stopPropagation(i);
if(c.getModel('config').getModuleEditedPer()===0)
{
h.showError('\u8BF7\u586B\u5199\u7B80\u5386\u5185\u5BB9\u540E\u6253\u5370');
}
else{
$.openWin('/cgi-bin/readtemplate?s=content&func=print&kvclick=resume|my_resume|print&sid='+$.sid(),{sMethod:'POST',oData:{content:h.ctrl('resume.controller.preview').render('print')}});
}
},getResumeContent:function(i,j){
$.stopPropagation(i);
this.confirm({title:'\u83B7\u53D6\u7B80\u5386html (\u6D4B\u8BD5\u4E13\u7528)',confirmBtnTxt:'\u65B0\u7A97\u53E3\u9884\u89C8',cancelBtnTxt:'\u5173\u95ED',msg:['<div>','<select id="type"><option value="download_pdf">pdf</option><option value="download_doc">doc</option><option value="compose">compose</option><option value="attach_preview">preview</option><option value="attach_preview_inbox">preview_inbox</option></select>','</div>','<div style="width: 800px; height: 600px;"><textarea style="width:100%; height:100%" id="content"></textarea></div>'].join(''),onload:function(){
var l=this;
var m=l.S('type');
function k()
{
l.S('content').value=h.ctrl('resume.controller.preview').render(m.value);
}
;m.onchange=k;
k();
},onreturn:function(k){
if(k)
{
$.openWin('/cgi-bin/readtemplate?s=content&sid='+$.sid(),{sMethod:'POST',oData:{content:this.S('content').value}});
}
}});
},downloadTest:function(){
h.confirm({title:'\u7B80\u5386\u751F\u6210 (\u6D4B\u8BD5\u4E13\u7528)',msg:'<div><input id="filename" placeholder="\u6587\u4EF6\u540D" /><select id="type"><option>doc</option><option>pdf</option></select></div><div style="width: 800px; height: 600px;"><textarea style="width:100%; height:100%" id="content"></textarea></div>',onreturn:function(i){
if(i)
{
$.openWin('/cgi-bin/resume_export',{sMethod:'POST',oData:{sid:$.sid(),filename:($.trim(this.S('filename').value)||'\u6D4B\u8BD5\u7B80\u5386'+$.unikey())+'.'+this.S('type').value,content:this.S('content').value,r:$.now()}});
}
}});
},clearData:function(i,j){
$.stopPropagation(i);
var k=this;
k.confirm({title:'\u91CD\u5199\u7B80\u5386',msg:'\u91CD\u5199\u7B80\u5386\u524D\u5C06\u6E05\u7A7A\u539F\u6709\u7B80\u5386\u5185\u5BB9\uFF0C\u786E\u5B9A\u8981\u91CD\u5199\uFF1F',confirmBtnTxt:'\u662F',cancelBtnTxt:'\u5426',onreturn:function(l){
if(l)
{
a.LogKV('resume|my_resume|reset');
var m={onbeforesend:function(){
return false;
}};
e.sync(m);
m.vData.resume={};
delete m.onbeforesend;
m.onsuccess=function(){
e.reset();
k.showInfo('\u6E05\u7A7A\u7B80\u5386\u6210\u529F');
var n=d.getOrder().join('|').replace(/\|_custom_\d/g,'');
if(d.getResumeType()=='en')
{
$.lib('resume.modelmgr').getModel('moduleBase').setEnData({});
d.save('order_en',n,{silent:true});
}
else{
$.lib('resume.modelmgr').getModel('moduleBase').setCnData({});
d.save('order',n,{silent:true});
}
};
m.onerror=function(){
k.showError('\u6E05\u7A7A\u7B80\u5386\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5');
};
$.lib('resume.ajax').ajax(m);
$.lib('resume.modelmgr').getModel('localstorage').clear();
}
}});
},reloadMyResume:function(){
var i=$.lib('resume.viewmgr').getTpl('layout.loading').replace({loading_gif:a.getRes('$images_path$ico_loading21e9c5d.gif')});
$.$($.inWin().document.body).rmClass('resume_errorBody');
$.$($.inWin().document.body.parentNode).rmClass('resume_errorHtml');
h.dom$().html(i);
e.fetchAll();
}};
}};
});
});
$.package('resume/controller/receive_resume.js',[],function(a){
$.createCtrl('resume.controller.receive_resume',{sSuper:'resume.controller'},function(b){
return {init_:function(c){
this.superEx_(b,'init_',arguments);
return this;
},render:function(c){
var d=$.lib('resume.viewmgr').view('receive_resume.layout',{});
this.dom$().html(d);
return this;
},rule:function(){
return {};
},events:function(){
return {};
}};
});
});
$.package('resume/controller/layout.js',['resume/base/controller.js','resume/lib/adaptor.js'],function(b){
var a=$.lib('resume.adaptor');
$.createCtrl('resume.controller.layout',{sSuper:'resume.controller'},function(c){
return {render:function(d){
var e=this.getView('layout.layout',d);
this.dom$().html(e);
return this;
},renderTabContainer:function(d){
this._moLastCtrl&&this._moLastCtrl.remove();
var f=$.$('<div>').appendTo(this.dom$());
;var e=$.extend({},this.moConfig.oAppCfg,{oDom:f});
this._renderLoading(f);
if(d=='my_resume')
{
this._moLastCtrl=this.ctrl('resume.controller.my_resume',e).render();
}
else{
this._moLastCtrl=this.ctrl('resume.controller.receive_resume',e).render();
}
},_renderLoading:function(d){
d.html(this.getView('layout.loading',{loading_gif:a.getRes('$images_path$ico_loading21e9c5d.gif')}));
return this;
},rule:function(){
return {click:{changeTab:{bPropagable:false}}};
},events:function(){
return {changeTab:function(d,e){
console.log(d,e);
var f=$.$(e),g=f.attr('for');
this.renderTabContainer(g);
}};
}};
});
});
$.package('resume/app.js',['resume/lib/adaptor.js','resume/base/modelmgr.js','resume/model/setting.js'],function(){
var a=$.lib('resume.adaptor');
$.createApp('resume',{},function(b){
return {init_:function(c){
this.oCfg=c||{};
$.lib('resume.modelmgr').getModel('setting').set('knowImporte',this.oCfg.bShownImportTip?true:false);
return this.super_(b,'init_',arguments);
},process_:function(){
if($.inWin().location.href.indexOf('nocmd=true')!=-1)
{
return;
}
this._addCssToTop();
if(this.oCfg.bNoframe)
{
a.msgBox.createMessageBox(0);
a.showProcess.createProcessBox(0);
}
this.router_(this.oCfg.sCmd||($.locSearch()&&$.locSearch()['cmd'])||'my_resume');
return this;
},router_:function(c){
if(c=='share'||c=='preview')
{
$.ctrl('resume.controller.'+(c=='share'?'public_view':'attach_preview'),{oDom:$.$('#mainContainer'),oAppCfg:this.oCfg}).render();
}
else if(c=='resume_preview')
{
$.ctrl('resume.controller.resume_preview',{oDom:$.$('#mainContainer'),oAppCfg:this.oCfg}).render();
}
else{
$.ctrl('resume.controller.layout',{oDom:$.$('#mainContainer'),oAppCfg:this.oCfg}).render().renderTabContainer(c);
if(this.oCfg.sSubCmd=='importMail')
{
$.ctrl('resume.controller.editImportMail',{oImportArgs:this.oCfg.oImportArgs});
}
}
return this;
},destroy_:function(){
return this;
},_addCssToTop:function(){
var c=['.resume_ipt{*float:left;display:block;width:374px;height:14px;margin:0;padding:7px 0 7px 8px;background-color:#fff;border:1px solid #c3c3c3;border-top:1px solid #7c7c7c;border-left:1px solid #9a9a9a;font-size:14px;line-height:16px;_line-height:18px;color:#000;box-shadow:inset 0 1px 0 #d4d4d4;-webkit-font-smoothing:antialiased;}input.resume_ipt:disabled{background:#f3f3f3;color:#888;}.resume_ipt_Sel{position:relative;color:#a0a0a0;_overflow:hidden;}.resume_ipt_Sel:hover{text-decoration:none;}.resume_ipt_Sel .resume_ipt_Sel_txt{color:#000;}.resume_ipt_Sel .resume_ipt_Sel_ico{width:34px;height:30px;position:absolute;right:0;top:0;background:url($images_path$resume/icon_resume_sprite2761b6.png) no-repeat -18px -20px;_background-image:url($images_path$resume/icon_resume_sprite_png82761b6.png);}.resume_ipt_Sel_Active{color:#000;}.resume_selList{position:absolute;z-index:2;width:223px;padding-bottom:8px;_padding-bottom:3px;background-color:#fff;border:1px solid #a0a0a0;box-shadow:0 1px 3px rgba(0,0,0,.25);}.resume_selList .resume_selOpt{margin-bottom:2px;}.resume_selList .resume_selOpt_inner{display:block;height:28px;_height:29px;padding:0 8px;font-size:14px;line-height:27px;line-height:30px\u005C0;_line-height:27px;color:#000;}.resume_selList .resume_selOpt_inner:hover{background-color:#3470cc;color:#fff;text-decoration:none;}.resume_ipt_Short{width:103px;}.resume_ipt_Medium{width:143px;}.resume_ipt_MediumLong{width:253px;}.resume_ipt_Full{margin-left:6px;width:435px;}.resume_ipt_Other{margin-left:68px;_margin-left:33px;margin-bottom:20px;}textarea.resume_ipt_Full,textarea.resume_ipt_Area{height:100px;line-height:18px;resize:none;overflow-x:hidden;overflow-y:auto;word-break:break-all;}textarea.resume_ipt_Area_High{height:79px;}.resume_label{height:28px;line-height:28px;line-height:30px\u005C9;*line-height:34px;overflow:hidden;zoom:1;}.resume_txt{float:left;width:auto;padding-bottom:20px;position:relative;}.resume_txt_Space{margin-right:8px;}.resume_txt_NoLineSpace{margin-right:50px;}.resume_txt_left{float:left;width:58px;text-align:right;}.resume_txt_cnt{margin-left:68px;_margin-left:65px;}.resume_txt_cnt_NoLabel{margin-left:0;}.resume_txt_Full .resume_txt_cnt{margin-left:0;}.resume_txt_placeholder{position:absolute;top:4px;left:68px;_left:65px;height:20px;line-height:22px;color:#ccc;padding-left:9px;font-size:14px;display:none;right:0;-webkit-font-smoothing:antialiased;}.resume_mod_Placeholder .resume_txt_placeholder{display:block;}.resume_txt_Full .resume_txt_placeholder{left:6px;_left:12px;}.resume_ipt_Sel .resume_txt_placeholder,.resume_datePicker_item .resume_txt_placeholder{left:0;_left:0;}.resume_mod_exp_More .resume_text_placeholder_Other{_margin-left:10px;}.resume_txt_Err{position:relative;z-index:2;}.resume_txt_Err_tip{display:none;position:absolute;bottom:0;left:68px;_left:65px;height:20px;line-height:22px;padding:0 12px;background-color:#ef8f00;color:#fff;border-radius:3px;font-size:12px;text-align:center;}.resume_txt_Full .resume_txt_Err_tip{left:6px;_left:12px;}.resume_txt_Err_tip .arrowDown{position:absolute;top:-5px;left:50%;margin-left:-5px;display:block;content:" ";width:0;line-height:0;font-size:0;border:5px solid transparent;_border-color:red;_filter:chroma(color=red);border-top:0;border-bottom-color:#ef8f00;_border-top-color:#ef8f00;}.resume_txt_Err .resume_txt_Err_tip{display:block;}.resume_txt_Err .resume_ipt{border-color:#ef8f00;}.resume_txt_Err_ico{display:inline-block;width:16px;height:16px;margin-right:5px!important;background:url($images_path$resume/icon_resume_sprite2761b6.png) no-repeat 0 -96px;_background-image:url($images_path$resume/icon_resume_sprite_png82761b6.png);vertical-align:-4px;vertical-align:-3px\u005C0;*vertical-align:-2px;_vertical-align:1px;display:none;}.resume_txtWrapLine{float:left;width:100%;}.resume_footBtn{padding:0 15px;height:24px;}.resume_footBtn_Save{margin-right:5px!important;}.resume_footBtn_Cancel{margin-right:10px!important;}.resume_mod{width:506px;font-size:14px;}.resume_mod_btnRemove{top:10px;}.resume_mod_cnt{padding:30px 0 10px 24px;padding-bottom:12px\u005C9;}.resume_mod_exp{position:relative;padding:30px 0 10px 24px;border-bottom:1px solid #ddd;}.resume_mod_exp_Last{border-bottom:none;}.resume_mod_exp_More .resume_ipt{width:355px;}.resume_mod_exp_More .resume_ipt_Medium{width:133px;}.resume_mod_exp_More .resume_ipt_Full{width:416px;}.resume_mod_removeExp{position:absolute;left:466px;top:15px;display:none;width:16px;height:16px;background:url($images_path$resume/icon_resume_sprite2761b6.png) no-repeat -32px -64px;_background-image:url($images_path$resume/icon_resume_sprite_png82761b6.png);}.resume_mod_exp_More .resume_mod_removeExp{display:block;}.resume_hideExpWrap{float:left;display:none;}.resume_expandExp{clear:both;height:15px;margin-left:-14px;padding-bottom:5px;text-align:center;}.resume_expandExp_btn{color:#8c8c8c;}.resume_expandExpIco{width:11px;height:10px;margin-right:5px;background:url($images_path$resume/icon_resume_sprite2761b6.png) no-repeat;_background-image:url($images_path$resume/icon_resume_sprite_png82761b6.png);vertical-align:-1px;vertical-align:-6px\u005C9;*vertical-align:-5px;_vertical-align:-2px;}@media all and (min-width:0){.resume_mod_addExpIco{vertical-align:-1px\u005C9;}}.resume_expandExpIco_hide{background-position:0 -128px;}.resume_expandExpIco_show{background-position:-32px -128px;}.resume_mod_addExp{margin-top:-10px;background-color:#fff;padding-bottom:20px;}.resume_mod_addExp_cnt{margin:0 29px;padding:9px 0;display:block;height:15px;line-height:14px;line-height:15px\u005C9;*line-height:14px;text-align:center;color:#1e5494;border:1px dashed #ddd;}.resume_mod_addExpIco{display:inline-block;width:12px;height:12px;margin-right:5px!important;background:url($images_path$resume/icon_resume_sprite2761b6.png) no-repeat -32px -96px;_background-image:url($images_path$resume/icon_resume_sprite_png82761b6.png);vertical-align:-1px;vertical-align:-2px\u005C9;*vertical-align:1px;_vertical-align:1px;_margin-top:4px!important;}@media all and (min-width:0){.resume_mod_addExpIco{vertical-align:0\u005C9;}}.resume_mod_addExp_left{float:left;width:7px;height:35px;background:url($images_path$resume/icon_resume_sprite2761b6.png) no-repeat -123px -176px;_background-image:url($images_path$resume/icon_resume_sprite_png82761b6.png);}.resume_mod_addExp_mid{height:35px;margin:0 9px 0 1px;padding-left:13px;*padding-left:16px;background:url($images_path$resume/addExpMid2055c6.png) repeat-x;_background-image:url($images_path$resume/addExpMid_png82055c6.png);}.resume_mod_addExp_right{float:right;width:11px;height:35px;background:url($images_path$resume/icon_resume_sprite2761b6.png) no-repeat 0 -176px;_background-image:url($images_path$resume/icon_resume_sprite_png82761b6.png);}.resume_mod .dialog_operate{padding-right:0;padding-left:0;}.resume_datePicker{overflow:hidden;padding-bottom:20px;zoom:1;}.resume_datePicker_item{float:left;width:auto;position:relative;padding-bottom:0;}.resume_datePicker_item_Divider{margin-left:3px;margin-right:3px;width:15px;border-top:1px solid #a3a3a3;margin-top:14px;}.resume_datePicker_item_ToNow{margin-left:8px;line-height:30px;*margin-top:-2px;_margin-top:8px;*margin-left:12px;}.resume_datePicker_item_checkBox{vertical-align:-2px;width:12px;height:14px;margin-right:5px;*vertical-align:-1px;_vertical-align:2px;}.resume_datePicker_item .resume_txt_cnt{position:relative;}.resume_datePicker_item .resume_txt_cnt .resume_txt_Err_tip,.resume_datePicker_item .resume_txt_cnt .resume_txt_placeholder{_left:-153px;}.resume_datePicker_item .resume_txt_Err_tip{left:0;bottom:-20px;*top:30px;}.resume_mod_cntInfo{margin-bottom:5px;padding:15px 29px 0 19px;}.resume_mod_self{padding:15px 24px 15px 14px;}.resume_mod_self .resume_iptArea{width:664px;}.resume_mod_exp_custom{border-bottom:none;}.resume_mod_En .resume_txt_left{width:60px;}.resume_mod_En .resume_txt_cnt{margin-left:70px;}.resume_mod_En .resume_txt_Full .resume_txt_cnt{margin-left:0;}.resume_mod_En .resume_txt_placeholder{top:6px;left:70px;line-height:18px;word-wrap:break-word;word-break:break-word;}.resume_mod_En .resume_txt_Full .resume_txt_placeholder{left:6px;_left:12px;}.resume_mod_En .resume_ipt_Sel .resume_txt_placeholder,.resume_mod_En .resume_datePicker_item .resume_txt_placeholder{left:0;}.resume_mod_En .resume_ipt{width:432px;}.resume_mod_En .resume_ipt_Other{margin-left:70px;}.resume_mod_En .resume_ipt_Area{word-wrap:break-word;word-break:break-word;}.resume_mod_En .resume_txt_Full .resume_ipt{width:495px;}.resume_mod_En .resume_ipt_Medium{width:160px;}.resume_mod_En .resume_mod_exp_More .resume_ipt{width:413px;}.resume_mod_En .resume_mod_exp_More .resume_ipt_Medium{width:150px;}.resume_mod_En .resume_txt_Err_tip{left:70px;}.resume_mod_En .resume_datePicker_item .resume_txt_Err_tip{left:0;}.resume_mod_En .resume_mod_removeExp{left:526px;}.resume_mod_EnLong .resume_txt_left{width:91px;}.resume_mod_EnLong .resume_txt_cnt{margin-left:101px;}.resume_mod_EnLong .resume_txt_Full .resume_txt_cnt{margin-left:0;}.resume_mod_EnLong .resume_txt_placeholder{top:6px;left:101px;line-height:18px;word-wrap:break-word;word-break:break-word;}.resume_mod_EnLong .resume_txt_Full .resume_txt_placeholder{left:6px;_left:12px;}.resume_mod_EnLong .resume_ipt_Sel .resume_txt_placeholder,.resume_mod_EnLong .resume_datePicker_item .resume_txt_placeholder{left:0;}.resume_mod_EnLong .resume_ipt{width:402px;}.resume_mod_EnLong .resume_ipt_Other{margin-left:101px;}.resume_mod_EnLong .resume_ipt_Area{word-wrap:break-word;word-break:break-word;}.resume_mod_EnLong .resume_txt_Full .resume_ipt{width:495px;}.resume_mod_EnLong .resume_ipt_Medium{width:144px;}.resume_mod_EnLong .resume_mod_exp_More .resume_ipt{width:383px;}.resume_mod_EnLong .resume_mod_exp_More .resume_ipt_Medium{width:134px;}.resume_mod_EnLong .resume_txt_Err_tip{left:101px;}.resume_mod_EnLong .resume_datePicker_item .resume_txt_Err_tip{left:0;}.resume_mod_EnLong .resume_mod_removeExp{left:526px;}.resume_create{padding:23px 0 28px;}.resume_importLoading{padding:18px 0 33px;}.resume_importLoading .dialog_feedback{padding:23px 30px 17px 37px;}.resume_workUploading{padding-top:5px;}.resume_workUploading .dialog_feedback{padding:23px 30px 25px 37px;}.resume_createResume{padding:23px 0 28px;}.resume_createResume .dialog_feedback{padding:20px 30px 20px 37px;}.resume_createLink{padding:30px 24px 35px 20px;}.resume_createLink_cnt{position:relative;*zoom:1;}.resume_createLink_cnt .resume_ipt{float:none;width:360px;margin-bottom:17px;padding:9px 8px 10px;}.resume_createLink_switch_tip{margin-right:2px;}.resume_createLink_option{margin-right:9px;}.resume_createLink_option_checkbox{vertical-align:-2px;}.ico_loading2{width:32px;height:32px;display:block;background:url($images_path$ico_loading21e9c5d.gif) no-repeat center center;}.resume_previewImg{width:100%;background-repeat:no-repeat;}.resume_previewImg_1{height:1005px;background-image:url($images_path$resume/template1_large_png827580b.png);}.resume_previewImg_2{height:1419px;background-image:url($images_path$resume/template2_large_png827580b.png);}.resume_previewImg_3{height:1406px;background-image:url($images_path$resume/template3_large_png827580b.png);}.resume_previewImg_4{height:1150px;background-image:url($images_path$resume/template4_large_png827397f.png);}.resume_previewImg_en_1{height:1150px;background-image:url($images_path$resume/template1En_large_png8277e81.png);}@media only screen and (-webkit-min-device-pixel-ratio:2),only screen and (min-device-pixel-ratio:2){.resume_previewImg_1{background-image:-webkit-image-set(url($images_path$resume/template1_large_png827580b.png) 1x,url($images_path$resume/template1_large_png8_2x26bdae.png) 2x);}.resume_previewImg_2{background-image:-webkit-image-set(url($images_path$resume/template2_large_png827580b.png) 1x,url($images_path$resume/template2_large_png8_2x26bdae.png) 2x);}.resume_previewImg_3{background-image:-webkit-image-set(url($images_path$resume/template3_large_png827580b.png) 1x,url($images_path$resume/template3_large_png8_2x26bdae.png) 2x);}.resume_previewImg_4{background-image:-webkit-image-set(url($images_path$resume/template4_large_png827397f.png) 1x,url($images_path$resume/template4_large_png8_2x27397f.png) 2x);}.resume_previewImg_en_1{background-image:-webkit-image-set(url($images_path$resume/template1En_large_png8277e81.png) 1x,url($images_path$resume/template1En_large_png8_2x277e81.png) 2x);}}.resume_savePreviewWrap{position:absolute;bottom:0;left:0;z-index:1403;width:100%;height:65px;text-align:center;}.resume_savePreviewBg{position:absolute;left:0;top:0;z-index:1;width:100%;height:65px;background-color:#000;opacity:0.9;filter:alpha(opacity=90);}.resume_savePreview{position:absolute;left:0;top:0;z-index:2;width:100%;height:40px;padding:13px 0 12px;text-align:center;}.resume_savePreview_btn{padding:8px 42px!important;font-size:14px;}.resume_dialogLink{min-width:0;}.resume_dialogLink .cnfx_content{*padding-bottom:43px;}@media only screen and (-webkit-min-device-pixel-ratio:2),only screen and (min-device-pixel-ratio:2){.resume_ipt_Sel .resume_ipt_Sel_ico,.resume_txt_Err_ico,.resume_mod_removeExp,.resume_expandExpIco,.resume_mod_addExpIco,.resume_mod_addExp_left,.resume_mod_addExp_right,.resume_allTmpl_save_ico{background-image:-webkit-image-set(url($images_path$resume/icon_resume_sprite2761b6.png) 1x,url($images_path$resume/icon_resume_sprite_2x2761b6.png) 2x);}.resume_mod_addExp_left{width:4px;background-position:-126px -176px;}.resume_mod_addExp_mid{margin:0 2px 0 4px;background-image:-webkit-image-set(url($images_path$resume/addExpMid2055c6.png) 1x,url($images_path$resume/addExpMid_2x211d83.png) 2x);}.resume_mod_addExp_right{width:2px;}}'].join('\n');
c&&$.lib('resume.adaptor').evalCss(c,"qmResumeForDialog");
}};
});
});
