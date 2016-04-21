var QMPreviewBox=(function(b,f){
if(b.QMPreviewBox)
{
return b.QMPreviewBox;
}
var a=(function(){
var g=getTop();
return {S:g.S,T:g.T,E:g.E,extend:g.extend,evalCss:g.evalCss,callBack:g.callBack,insertHTML:g.insertHTML,removeSelf:g.removeSelf,addEvent:g.addEvent,removeEvent:g.removeEvent,insertHTML:g.insertHTML,getMainWin:g.getMainWin,unikey:g.unikey,getDomWin:g.getDomWin};
})();
function e(g)
{
this._moCfg=a.extend({},this.oDefaults,g);
this._msIdPrex=a.unikey('_id');
this._moWin=a.getDomWin(this._moCfg.oEmbedToDom);
this.init_();
}
e.prototype={oDefaults:{nZIndex:1000,sContent:'',bDisplay:true,oEmbedToDom:a.S('resize',b),sInsertWhere:'beforeEnd',sCssTagName:'__qmPreviewBox__',onclose:null,onshow:null,onbeforeclose:null,nWidth:null,onwinresize:null},_oTpl:a.T(['<div id="__container__" style="position:absolute; width:100%; top:0; left: 0; z-index: $nZIndex$;">','<div id="__mask__" class="gift_preview_mask"></div>','<div id="__close__" class="gift_preview_minibar_area">','<div class="gift_preview_bar">','<a class="ico close"></a>','</div>','</div>','<div id="__content__" class="gift_preview_iframe">$sContent$</div>','</div>']),_sStyle:['@-webkit-keyframes opacity_7{0%{opacity:0;}100%{opacity:0.7;}}@-moz-keyframes opacity_7{0%{opacity:0;}100%{opacity:0.7;}}.gift_preview_mask{position:absolute;top:0;left:0;z-index:1;width:100%;height:100%;background:#000;filter:alpha(opacity=70);opacity:0.7;-webkit-animation:opacity_7 0.25s ease;-moz-animation:opacity_7 0.25s ease;}.gift_preview_minibar_area{position:absolute;z-index:3;right:0;top:0;width:50px;height:50px;overflow:hidden;}.gift_preview_bar{position:absolute;right:-50px;top:-50px;background:#393939;width:100px;height:100px;border-radius:100px;top:0\u005C9;right:0\u005C9;width:50px\u005C9;height:50px\u005C9;background:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_ie61e9c5d.png) 0 -224px no-repeat\u005C9;border-radius:0;}:root .gift_preview_bar{right:-50px;top:-50px;background:#393939;width:100px;height:100px;border-radius:100px;}.gift_preview_bar .close{background:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview1e9c5d.png) -106px -52px no-repeat;cursor:pointer;width:50px;height:50px;position:absolute;top:50px;right:50px;background:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_ie61e9c5d.png) -106px -52px no-repeat\u005C9;top:0\u005C9;right:0\u005C9;}:root .gift_preview_bar .close{background:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview1e9c5d.png) -106px -52px no-repeat;top:50px;right:50px;}.gift_preview_bar .close:active{opacity:0.5;filter:alpha(opacity=50);}.gift_preview_iframe{position:absolute;margin:0 auto;width:860px;top:0;z-index:2;background-color:#fff;border-left:1px solid #666;border-right:1px solid #666;box-shadow:0 0 15px #000;}'].join('\n'),init_:function(){
if(this._moCfg.bDisplay)
{
this.open();
}
},S:function(g){
return a.S(this._msIdPrex+g,this._moWin);
},getContainerDom:function(){
return this.S('__container__');
},getBodyDom:function(){
return this.S('__content__');
},getMaskDom:function(){
return this.S('__mask__');
},getCloseDom:function(){
return this.S('__close__');
},setBody:function(g){
this.getBodyDom().innerHTML=this.preContent(g);
},preContent:function(g){
var i=this;
var h=document.createElement('div');
h.innerHTML=g;
a.E(h.getElementsByTagName('*'),function(j){
if(j.id&&j.id.indexOf(i._msIdPrex)!==0)
{
j.id=i._msIdPrex+j.id;
}
});
return h.innerHTML;
},open:function(){
var h=this;
var g=h._moCfg;
var i=h._moWin;
if(h.bClose)
{
return;
}
a.evalCss(h._sStyle,i,g.sCssTagName);
i.focus();
i.setTimeout(function(){
if(h.bClose)
{
return;
}
a.insertHTML(h._moCfg.oEmbedToDom,g.sInsertWhere,h.preContent(h._oTpl.replace({sContent:g.sContent,nZIndex:g.nZIndex})));
h.onwinresize();
a.callBack.call(h,g.onshow);
i.setTimeout(function(){
if(!h.bClose)
{
h.initEvent_();
}
},10);
},10);
},onwinresize:function(){
var n=this;
var o=n._moWin;
if(n.bClose)
{
return;
}
var m=n._moCfg.oEmbedToDom;
var j=m.offsetWidth;
var h=n._moCfg.nWidth?Math.min(n._moCfg.nWidth,j-120):j-300;
var g=m.offsetHeight;
var i=Math.floor((j-h)/2);
if(a.callBack.call(n,n._moCfg.onwinresize,h,g,i,j)!==false)
{
var l=n.getBodyDom();
var k=n.getContainerDom();
k.style.width=j+'px';
l.style.height=k.style.height=g+'px';
l.style.width=h+'px';
l.style.left=i+'px';
}
},initEvent_:function(){
var g=this,h=g._moWin;
_fClosePreview=function(){
g.close();
};
g._winResizeEvent=function(){
g.onwinresize();
};
g._winKeyUpEvent=function(i){
if(i.keyCode==27)
{
g.close();
}
};
a.addEvent(g.getMaskDom(),"click",_fClosePreview);
a.addEvent(g.getCloseDom(),"click",_fClosePreview);
a.addEvent(h,'resize',g._winResizeEvent);
a.addEvent(h.document.body,'keyup',g._winKeyUpEvent);
},close:function(){
var g=this;
var h=g._moWin;
if(g.bClose||a.callBack.call(g,g._moCfg.onbeforeclose)===false)
{
return;
}
a.removeEvent(h,'keyup',h.document.body);
a.removeEvent(h,'resize',g._winResizeEvent);
a.removeSelf(g.getContainerDom());
g.bClose=true;
a.callBack.call(g,g._moCfg.onclose);
}};
var d;
var c=function(g){
if(d)
{
d.close();
}
;g=g||{};
var h=g.onclose;
g.onclose=function(){
d=null;
return a.callBack.call(this,h,arguments);
};
d=new e(g);
return d;
};
c.close=function(){
if(d)
{
d.close();
return true;
}
return false;
};
c.get=function(){
return d;
};
c.isShow=function(){
return d&&!d.bClose?true:false;
};
c.qmPreviewBox=e;
return c;
})(window);
