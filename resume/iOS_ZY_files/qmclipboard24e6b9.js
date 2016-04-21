var QMClipboardAdaptor=(function(a){
var b=getTop();
return {browserVer:function(){
return b.gnIEVer;
},getDomWin:function(c){
var d=c.ownerDocument;
return d.parentWindow||d.defaultView;
},generateFlashCode:b.generateFlashCode,insertHTML:b.insertHTML,qmFlash:b.qmFlash,T:b.T,getRes:b.getRes};
})();
(function(a,c){
var d=window,b=a.T(['<span style="top:0;left:0;position:absolute;width:$width$px;height:$height$px;margin:$margin$;z-index:0;overflow:hidden;">','$code$','</span>']);
function e()
{
return ({setup:function(f){
var g=this;
f.sId=Math.random();
g._initContainer(f);
},detect:function(){
return a.qmFlash.isSupported();
},_getWrapHtml:function(g,f){
var h=this;
return b.replace({height:f.nHeight||g.offsetHeight,width:f.nWidth||g.offsetWidth,margin:f.nMargin||0,code:a.generateFlashCode("flashClipboard_"+f.sId,f.sFlashUrl||a.getRes("$swf_path$QMClipboard14a11c.swf"),{width:"100%",height:"100%"},{wmode:"transparent"})});
},_initContainer:function(f){
var h=this,g=f.oContainer,i=a.getDomWin(g);
if(!i.QMClipboard)
i.QMClipboard=this;
if(g)
{
var j=h._getWrapHtml(g,f);
g.style.position="relative";
if(a.browserVer()==6)
{
g.style.zoom=1;
g.style.overflow="hidden";
}
a.insertHTML(g,"afterBegin",j);
setTimeout(function(){
var k=new a.qmFlash({id:"flashClipboard_"+f.sId,win:i});
k.setup(function(l,m){
if(l)
{
g.firstChild.style.zIndex=2;
h.initFlash_(this.getFlash(),f);
f.onload&&f.onload();
}
else{
g.removeChild(g.firstChild);
debug("the flash uploader is not ok..."+m);
}
});
},300);
}
},getFlash:function(){
return this._moFlash;
},initFlash_:function(g,f){
var h=this,i="flashClipboard_"+f.sId;
h._moFlash=g;
g.initlize();
g.setClientId(i);
g.setHandCursor(f.bHandCursor);
h._oCallBack=h._oCallBack||{};
h._oCallBack[i]=f;
},setText:function(f){
return this._moFlash.setText(f);
},dispatch:function(f,g){
var i=this,h=i._oCallBack[f]||{};
switch(g)
{case "load":
h.onload&&h.onload();
break;
case "mouseDown":
h.onmousedown&&h.onmousedown();
break;
case "complete":
h.oncomplete&&h.oncomplete();
break;
}
}});
}
d.QMClipboard=new e();
})(QMClipboardAdaptor);
