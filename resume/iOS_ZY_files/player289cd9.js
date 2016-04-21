(function(c){
var k={};
var g=function(m){
var n=m.ownerDocument;
return n.defaultView||n.parentWindow;
};
var j={};
var h=function(m){
return function(n){
var o=n.returnData||[];
m.apply(null,o);
};
};
var f=function(m,n){
if(!m)
{
return "_error_";
}
return ["qmplayer_",m.getType(),"_",n,"_",m.getId()].join("");
};
function d(m,p,o)
{
var n={};
var q=m.ownerDocument,s=q.defaultView,r=q.createEvent("MouseEvents");
r.initMouseEvent(p,true,true,s,0,0,0,0,0,!!n.ctrlKey,!!n.altKey,!!n.shiftKey,!!n.metaKey,0,null);
r.returnData=o;
m.dispatchEvent(r);
}
;var l=function(m,n){
var q=f(m,n),o=getTop().document,p=o.body;
{
if(p.dispatchEvent)
{
removeEvent(p,q,j[q]);
}
else{
delete j[q];
}
}
};
var i=function(n,o,m){
var r=f(n,o),p=getTop().document,q=p.body;
j[r]=h(m);
if(q.dispatchEvent)
{
addEvent(q,r,j[r]);
}
};
var e=function(n,o,m){
var s=f(n,o),p=j[s],q=getTop().document,r=q.body;
if(r.dispatchEvent)
{
d(r,s,m);
}
else{
p&&p.call(null,{returnData:m});
}
};
var b=function(){
var m=this;
m._moListMap={};
m._sortList=function(){
};
m._delInfo=function(n){
};
};
b.prototype={set:function(m){
this._moList=m;
},get:function(){
return this._moList;
},add:function(m){
this._moList.push(m);
},del:function(m){
this._delInfo();
},clear:function(m){
this._moList=[];
},delPlayListById:function(m){
delete this._moListMap[m];
},getPlayListById:function(m){
return this._moListMap[m]||[];
}};
var a=function(m){
var n=this;
n._moOutter=null;
n._moCurrentWin=null;
n._moInstanceMap={};
n._msType=m;
};
a.prototype={_get:function(m){
var o=this,n=m.sId,p=g(m.oContainer);
_oInstance=o._moInstanceMap[n];
if(_oInstance&&_oInstance.getCurrentWin()!=p)
{
o._del(m);
return o._add(m);
}
return _oInstance;
},_add:function(m){
var o=this,n=new c[o._msType=="KERNEL"?"QMPlayerKernel":"QMPlayerSkin"](m);
o._moInstanceMap[m.sId]=n;
i(n,"destory",function(p){
l(o._moInstanceMap[p],"destory");
o.delInstanceById(p);
});
return n;
},_del:function(m){
var n=this,o=m.sId;
n.delInstanceById(o);
},init:function(m){
var o=this,p=g(m.oContainer),n=o._get(m);
o._moOutter=m.oContainer;
o._moCurrentWin=p;
if(n)
{
return n;
}
else{
return o._add(m);
}
},getInstanceById:function(m){
return this._moInstanceMap[m];
},delInstanceById:function(m){
var n=this;
if(n._moInstanceMap[m])
{
n._moInstanceMap[m].destory();
n._moInstanceMap[m]=null;
delete n._moInstanceMap[m];
return true;
}
else{
return;
}
},destory:function(){
var n=this,m=n._moInstanceMap;
for(var o in m)
{
m[o].destory();
m[o]=null;
delete m[o];
}
}};
extend(k,{_moKernelCtrl:new a("KERNEL"),_moSkinCtrl:new a("SKIN"),init:function(m){
if((!m.oSkin||!m.oKernel)&&(!m.sId||!m.oContainer))
{
debug("\u9700\u8981\u6307\u5B9A\u76AE\u80A4\u548C\u5185\u6838\u3002");
return;
}
var p=this._moCurrentSkin=m.oSkin||this._moSkinCtrl.init(m),o=this._moCurrentKernel=m.oKernel||this._moKernelCtrl.init(m);
o.plug(p);
var n=m.oInfo||o.getInfo();
if(n&&n.autoplay)
{
o.operate("play",n);
}
return this;
},evt:{listen:i,fire:e,silent:l},getKernelMgr:function(){
return this._moKernelCtrl;
},getSkinMgr:function(){
return this._moSkinCtrl;
},initKernel:function(m){
return this._moKernelCtrl.init(m);
},initSkin:function(m){
return this._moSkinCtrl.init(m);
},getCurrentSkin:function(){
return this._moCurrentSkin;
},getCurrentKernel:function(){
return this._moCurrentKernel;
},getSkinById:function(m){
return this._moSkinCtrl.getInstanceById(m);
},getKernelById:function(m){
return this._moKernelCtrl.getInstanceById(m);
},delSkinById:function(m){
return this._moSkinCtrl.delInstanceById(m);
},delKernelById:function(m){
return this._moKernelCtrl.delInstanceById(m);
},destory:function(){
this._moSkinCtrl.destory();
this._moKernelCtrl.destory();
}});
extend(k,{stop:function(){
var m=this.getCurrentKernel();
m&&m.operate("stop");
},pause:function(){
var m=this.getCurrentKernel();
m&&m.operate("pause");
},play:function(){
var m=this.getCurrentKernel();
m&&m.operate("play");
},getPlayIdx:function(){
var m=this.getCurrentKernel();
return m&&m.operate("getPlayIdx")||-1;
},playByIdx:function(){
var m=this.getCurrentKernel();
m&&m.operate("playByIdx");
},next:function(){
var m=this.getCurrentKernel();
m&&m.operate("next");
},prev:function(){
var m=this.getCurrentKernel();
m&&m.operate("prev");
},delUIById:function(m){
this.delSkinById(m);
this.delKernelById(m);
}});
c["QMPlayer"]=k;
})(window);
(function(b){
var f=getTop(),e={_CONTAINER:TE(['<div id="playlist_$id$" class="playlist_con" style="$style$" $canfocus$ hidefocus="true"></div>']),_TEMPLATE:TE(['<div class="playlist_head" style="line-height:20px;display:none">\u64AD\u653E\u5217\u8868\uFF1A</div>','<ul id="playlistcon_$id$" class="playlist_body $sSkin$">','$@$for($list$)$@$','$@$if($idx$ == $_parent_.idx$)$@$','<li class="playing"><a href="javascript:;">$@$eval ($idx$+1)$@$. $title$</a><span class="ico_playing"></span></li>','$@$else$@$','<li><a href="javascript:;" idx="$idx$" url="$url$">$@$eval ($idx$+1)$@$. $title$</a></li>','$@$endif$@$','$@$endfor$@$','</ul>','<div class="clr"></div>'])};
function c(h,g)
{
return h.slice(0,g).concat(h.slice(g+1,h.length));
}
;function d(h,g)
{
return S(h+"_"+g,f);
}
var a=function(g){
var h=this,i=g.sId;
h._moPlayList=null;
h._moOutter=null;
h._moCurrentInfo=null;
h._sortList=function(j){
for(var m=0,k=[];m<j.length;m++)
{
var l=extend({idx:m},j[m]);
k.push(l);
}
return k;
};
h._delete=function(j){
if(j>-1)
{
h._moPlayList=c(h._moPlayList,j);
}
};
h._find=function(j){
var l=h._moPlayList,k=-1;
for(var m=0;m<l.length;m++)
{
if(j.title==l[m].title&&j.url==l[m].url)
{
k=m;
break;
}
}
return k;
};
h._initEvent=function(j){
if(j)
{
j.focus();
j.onblur=function(){
h.hide(this);
};
j.onclick=function(k){
var l=k||b.event,m=getEventTarget(l),n=m.getAttribute("idx");
if(m.tagName=="A"&&n)
{
QMPlayer.evt.fire(h,"play",[h.getInfoByIdx(+n)]);
}
};
}
};
h._init=function(j){
h._moPlayList=[];
h._moCfg=j;
h._moOutter=j.oContainer;
if(j.oInfo)
{
h.add(j.oInfo);
}
};
h._init(g);
};
a.prototype={_update:function(g,h){
var m=this,j=m._moCfg,n=h||j.sId,k=g||d("playlist",n);
if(k)
{
var l=k.getElementsByTagName("ul")[0],i=l&&l.scrollTop||0;
k.innerHTML=e._TEMPLATE.replace({id:n,list:m.get(),idx:m.getIdx()});
l=k.getElementsByTagName("ul")[0];
if(l)
{
setTimeout(function(){
l.scrollTop=i;
});
}
m._initEvent(k);
}
},destory:function(){
this._moPlayList=null;
},getType:function(){
return "playlist";
},getId:function(){
return this._moCfg&&this._moCfg.sId||"";
},show:function(h,i,g){
var k=this,j=k._moCfg,l=i.id;
if(!g)
{
if(h==1)
{
if(!d("playlist",l))
{
insertHTML(i,"beforeEnd",e._CONTAINER.replace(extend({id:l,style:""},j)));
}
}
else{
if(!d("playlist",l))
{
insertHTML(f.document.body,"beforeEnd",e._CONTAINER.replace(extend({id:l,canfocus:'tabindex="-1"',style:["position:absolute;z-index:10000;border:1px solid #999;left:",i.offsetLeft,"px;top:",i.offsetTop+i.clientHeight+5,"px;"].join("")},j)));
}
}
}
k._update(d("playlist",l),l);
setTimeout(function(){
k._moCfg.onShowPlaylist&&k._moCfg.onShowPlaylist.apply(k,[h,g]);
});
},hide:function(g){
var h=this;
if(g)
{
g.parentNode.removeChild(g);
g=null;
}
},getCurrent:function(){
return this._moCurrentInfo;
},getInfoByIdx:function(g){
return this._moPlayList[g];
},getIdx:function(g){
return this._find(g||this.getCurrent()||{});
},playByIdx:function(g){
var h=this;
QMPlayer.evt.fire(h,"play",[h.getInfoByIdx(g)]);
},playPrev:function(){
var i=this,g=i.getIdx()-1,h=i.getInfoByIdx(g);
h&&QMPlayer.evt.fire(i,"play",[h]);
},playNext:function(){
var i=this,g=i.getIdx()+1,h=i.getInfoByIdx(g);
h&&QMPlayer.evt.fire(i,"play",[h]);
},set:function(g){
this._moPlayList=g;
},get:function(g){
var h=this;
return g?h._moPlayList:h._sortList(h._moPlayList);
},add:function(g){
var h=this;
if(h._find(g)<0)
{
h._moPlayList.push(g);
}
h._moCurrentInfo=g;
},del:function(g){
var h=this;
h._delete(h._find(g));
},clear:function(){
this._moPlayList=[];
}};
b["QMPlaylist"]=a;
})(window);
(function(h,g){
var l=getTop(),j=50,k={kernel:T(['<div id="kernel_$id$" class="video_content" style="$style$"></div>']),html5:T(['<div class="kernel html5_kernel" style="$style$">','<video id="$vid$" width="$width$" height="$height$" style="$style$"></video>','</div>']),wmp:!window.attachEvent?T(['<div class="kernel wmp_kernel" style="$style$">','<embed id="$id$" name="$id$" type="application/x-ms-wmp" ','uiMode="$uiMode$" autoStart="true" width="$width$" height="$height$" src="$url$" ></embed>','</div>']):T(['<div class="kernel wmp_kernel" style="$style$">','<object id="$id$" name="$id$" classid="clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6" width="$width$" height="$height$" >','<param name="uiMode" value="$uiMode$" ></param>','<param name="autoStart" value="false" ></param>','<param name="PlayCount" value="9999"></param>','<param name="url" value="$url$"></param>','<param name="FileName" value="$url$">','</object>','</div>']),flash:T(['<div class="kernel flash_kernel" style="$style$">',generateFlashCode("$id$",["/zh_CN/htmledition/swf/audioplayer.swf?rand=$rand$&width=$width$&height=$height$&panel=$panel$","&uin=",l.getUin()].join(""),{},{wmode:"opaque",allowScriptAccess:"always",allowFullScreen:true}),'</div>']),swf_container:T(['<div class="kernel swf_kernel" style="$style$">','<div id="$id$" style="width:100%;height:100%;position:relative;left:0;top:0;line-height:300px;text-align:center;color:gray;">\u4E0D\u652F\u6301swf\u9884\u89C8</div>','</div>'])};
var i=function(m){
var n=m.ownerDocument;
return n.defaultView||n.parentWindow;
};
var d=function(){
var m=this;
m._mbInitFinish=false;
m._msKernelType="_not_init_";
m._msDefaultType="mp3";
d._msMediaType="";
m.showKernel=function(n){
var o=m._moContainer.childNodes;
for(var q=0,r=o.length;q<r;q++)
{
var p=m._moPlayerObj.parentNode==o[q];
o[q].style.zIndex=p?3:1;
o[q].style.left=p?"":"-10000px";
}
};
m.getKernelType=function(){
return m._msKernelType;
};
m.getPlayObj=function(){
var n=m._moKernelCtrl._getMediaType();
if(n)
{
m._moContainer.style.position=n=="audio"?"absolute":"relative";
m._moContainer.style.marginTop=n=="audio"?"-10000px":"";
}
return m._moPlayerObj;
};
m.detectError=function(n){
var o=m._moKernelCtrl;
if(o._moCurrentKernel==m)
{
if(n=="stalled")
{
o.operate("pause");
o.operate("play");
}
else{
o.operate("retry");
}
}
};
};
d.prototype={init:null,play:null,pause:null,stop:null,getURL:null,getOpenState:null,getPlayState:null,setPlayPos:null,getPlayPos:null,getBuffer:null,getCurrentPositionString:null,getDurationString:null,toggleFullScreen:null,setURL:null,setUiMode:function(){
},canPlayType:function(){
return '';
}};
var b=function(n,m,o){
d.apply(this,arguments);
var p=this,r='htmlvedioplayer'+m.sId;
insertHTML(n,'afterBegin',k["html5"].replace({style:'position:absolute;width:100%;height:100%',width:'100%',height:'100%',vid:r}));
p._moPlayerObj=l.S(r,n.ownerDocument);
p._msKernelType="HTML5";
p._mbInitFinish=true;
p._moKernelCtrl=o;
p._moContainer=n;
q();
function q()
{
setTimeout(function(){
var s=p._moPlayerObj;
p._mnHTML5KernelStat=0;
p._mnHTML5KernelStatTimer=0;
if(s&&s.addEventListener)
{
E("error".split("|"),function(t){
(function(u){
s.addEventListener(u,function(v){
debug("html5 load... "+u);
p.setURL("");
p.detectError(u);
s.removeEventListener(u,arguments.callee,false);
},false);
})(t);
});
E("play|ended".split("|"),function(t){
(function(u){
s.addEventListener(u,function(v){
p._msPlayStat=u;
if(u=="ended")
{
p._moKernelCtrl.operate("stop",true);
}
},false);
})(t);
});
s.addEventListener("dblclick",function(){
p.toggleFullScreen();
},false);
s.addEventListener("mousemove",function(t){
if(p._mnPosX!=t.screenX||p._mnPosY!=t.screenY)
{
p._showBar(p._isFullScreen()&&true);
p._mnPosX=t.screenX;
p._mnPosY=t.screenY;
}
},false);
}
});
}
debug('HTML5Kernel init');
};
b.prototype={_showBar:function(m){
var o=this,n=o.getPlayObj();
n.controls=m||false;
if(m)
{
clearTimeout(o._mnBarTimer);
o._mnBarTimer=setTimeout(function(){
n.controls=false;
},3000);
}
},_isFullScreen:function(){
var o=this,n=o.getPlayObj(),m=!!n.webkitRequestFullScreen;
return m?document.webkitIsFullScreen:document.mozFullScreen;
},toggleFullScreen:function(){
var o=this,n=o.getPlayObj(),m=!!n.webkitRequestFullScreen;
if(o._isFullScreen())
{
m?document.webkitCancelFullScreen():document.mozCancelFullScreen();
n.parentNode.parentNode.style.zIndex="1";
}
else{
m?n.parentNode.parentNode.webkitRequestFullScreen():n.parentNode.parentNode.mozRequestFullScreen();
n.parentNode.parentNode.style.zIndex="999";
o._showBar(true);
}
},play:function(){
var m=this;
try{
debug("html5 playing");
setTimeout(function(){
m.getPlayObj().play();
});
}
catch(n)
{
debug("play error");
}
},pause:function(){
var m=this;
try{
m.getPlayObj().pause();
}
catch(n)
{
debug("pause error");
}
},stop:function(){
var n=this;
try{
var m=n.getPlayObj();
m.currentTime=0;
m.pause();
}
catch(o)
{
debug("stop error");
}
},setVolume:function(m){
try{
this.getPlayObj().volume=m/100;
this._mnVolume=m;
}
catch(n)
{
debug("set volume error");
}
},getVolume:function(){
return this._mnVolume!==undefined?this._mnVolume:100;
},setMuted:function(m){
try{
this.getPlayObj().muted=+m;
}
catch(n)
{
debug("muted error");
}
},getMuted:function(){
try{
return this.getPlayObj().muted;
}
catch(m)
{
debug("set muted error");
}
},setURL:function(m){
var n=this;
n.getPlayObj().src=m;
},getURL:function(){
return this.getPlayObj().src;
},setUiMode:function(m){
this.getPlayObj().settings.uiMode=m;
},canPlayType:function(m){
var p=c.playType,s=m||this._msDefaultType;
for(var r in p)
{
var n=p[r];
for(var q in n)
{
if(s==q.toLowerCase())
{
var o=n[q].split(",");
for(var t=0,u=o.length;t<u;t++)
{
if(this.getPlayObj().canPlayType(o[t]))
{
if(l.gbIsSafari)
{
return false;
}
else{
return true;
}
}
}
break;
}
}
}
return false;
},getPlayState:function(){
var n=this,o=n.getPlayObj().readyState,m=c.playState;
if(o==0)
{
o=m._UNDEFINED;
}
else if(n._msPlayStat=="play")
{
o=m._PLAYING;
}
else if(n._msPlayStat=="ended")
{
o=m._STOPPED;
}
return o;
},getOpenState:function(){
var n=this.getPlayObj().networkState,m=c.openState;
return n;
},setPlayPos:function(m){
var r=this.getPlayObj(),o=this.getDurationString(),p=(Math.max(+m,0)/100)*o,n=(this.getBuffer()/100)*o||0,q=p;
if(this.getPlayState()==1||this.getPlayState()==2)
{
this.play();
}
try{
r.currentTime=q;
}
catch(s)
{
debug(s);
}
return q;
},getPlayPos:function(){
return this.getPlayObj().currentTime/this.getPlayObj().duration*100;
},getBuffer:function(){
var n=this.getPlayObj(),m=n&&n.buffered;
return (m&&m.length&&m.end(m.length-1)||0)/this.getDurationString()*100;
},getCurrentPositionString:function(){
return this.getPlayObj().currentTime;
},getDurationString:function(){
return this.getPlayObj().duration;
},getInitFinish:function(){
return this._mbInitFinish;
}};
var f=function(n,m,o){
d.apply(this,arguments);
var p=this,q='windowsmediaplayer'+m.sId;
insertHTML(n,'afterBegin',k["wmp"].replace({style:'position:absolute;width:100%;height:100%',id:q,url:'',width:'100%',height:'100%',uiMode:'none'}));
p._moKernelCtrl=o;
p._moPlayerObj=l.S(q,n.ownerDocument);
p._msKernelType="WMP";
p._mbInitFinish=true;
p._moContainer=n;
debug('WMPKernel init');
};
f.prototype={toggleFullScreen:function(){
var n=this,m=n._moPlayerObj;
if(m.playState==c.playState._PLAYING)
{
m.fullScreen=true;
}
else{
debug("\u64AD\u653E\u72B6\u6001\u4E0D\u4E3A\u64AD\u653E\u4E2D[code=3]\uFF0C\u5F53\u524Dcode="+m.playState);
}
},play:function(){
debug("wmp playing");
var m=this.getPlayObj().controls;
setTimeout(function(){
m&&m.play();
});
},pause:function(){
var m=this.getPlayObj().controls;
m&&m.pause();
},stop:function(){
var m=this.getPlayObj().controls;
m&&m.stop();
},setVolume:function(m){
if(this.getPlayObj().settings)
{
this.getPlayObj().settings.volume=(m/100)*255;
this._mnVolume=m;
}
},getVolume:function(){
return this._mnVolume!==undefined?this._mnVolume:100;
},setMuted:function(m){
if(this.getPlayObj().settings)
{
this.getPlayObj().settings.mute=!!+m;
}
},getMuted:function(){
return this.getPlayObj().settings&&this.getPlayObj().settings.mute;
},setURL:function(m){
var n=this.getPlayObj();
try{
if(gbIsFF)
{
n.src=m;
}
else{
n.URL=m;
}
}
catch(o)
{
debug(o.message);
}
},setUiMode:function(m){
this.getPlayObj().settings.uiMode=m;
},getURL:function(){
var m=this.getPlayObj();
if(gbIsFF)
{
return m.src;
}
else{
return m.URL;
}
},getPlayState:function(){
return this.getPlayObj().playState;
},getOpenState:function(){
return this.getPlayObj().openState;
},getBuffer:function(){
var m=this.getPlayObj().network&&this.getPlayObj().network.bufferingProgress||0;
return m;
},setPlayPos:function(m){
var r=this.getPlayObj(),o=this.getDurationString(),p=(Math.max(+m,0)/100)*o,n=(this.getBuffer()/100)*o||0,q=p;
if(this.getPlayState()==1||this.getPlayState()==2)
{
this.play();
}
try{
r.controls&&(r.controls.currentPosition=q);
}
catch(s)
{
debug(s);
}
return q;
},getPlayPos:function(){
return this.getCurrentPositionString()/this.getDurationString()*100;
},getCurrentPositionString:function(){
var m=this.getPlayObj().controls;
return m&&m.currentPosition||0;
},getDurationString:function(){
var m=this.getPlayObj().currentMedia;
return m&&m.duration||0;
},getInitFinish:function(){
return this._mbInitFinish;
},canPlayType:function(m){
return m!="swf";
}};
var a=function(n,m,o){
d.apply(this,arguments);
var q=this,p=n.ownerDocument,r=p.defaultView||p.parentWindow,t='audioplayer'+m.sId,s=k["flash"].replace({id:t,rand:Math.random(),width:n.clientWidth,height:n.clientHeight+((m.oInfo&&typeof (m.oInfo.panel)!="undefined")?0:j),panel:(m.oInfo&&typeof (m.oInfo.panel)!="undefined")?m.oInfo.panel:1,style:'position:absolute;width:100%;height:100%;'});
if(!l.S(t,p))
{
insertHTML(n,'afterBegin',s);
q._moPlayerObj=l.S(t,p);
if(q._moPlayerObj)
{
q._moPlayerObj.width="100%";
q._moPlayerObj.height="100%";
}
(new (l.qmFlash)({id:t,win:r,flash:q._moPlayerObj,fjLog:function(u){
log(u);
}})).setup(function(v,u){
if(v)
{
q._mbInitFinish=true;
}
else{
debug(["flash ","- setup error::",u," --- id:",t].join(""));
q.canPlayType=function(){
return false;
};
q.detectError();
}
});
}
q._msKernelType="FLASH";
q._msMimeTypeContainer="mp3,mp4,mov,flv,f4p,f4v,f4a,f4b,f4m,m4a,m4v";
q._moContainer=n;
q._moKernelCtrl=o;
l['QMFlashRetry']=function(){
if(!o._msLastStatus||o._msLastStatus=="play")
{
o.operate("stop");
o.operate("retry");
}
};
q._operQueue=function(u){
q._moActionQueue=q._moActionQueue||[];
q._moActionQueue.push(u);
waitFor(function(){
return q._mbInitFinish;
},function(v){
if(v)
{
var w=q._moActionQueue.shift();
try{
w&&w.call(q);
}
catch(x)
{
debug("flash operate failed.");
q.detectError();
}
}
});
};
debug('FlashKernel init');
};
a.prototype={toggleFullScreen:function(){
var m=this;
m._operQueue(function(){
m.getPlayObj().jfFullscreen&&m.getPlayObj().jfFullscreen();
});
},play:function(){
var m=this;
debug("flash playing : "+m.getPlayObj().id);
m._operQueue(function(){
m.getPlayObj().jfPlay&&m.getPlayObj().jfPlay();
});
},pause:function(){
var m=this;
m._operQueue(function(){
m.getPlayObj().jfPause&&m.getPlayObj().jfPause();
});
},stop:function(){
var m=this;
m._operQueue(function(){
m.getPlayObj().jfStop&&m.getPlayObj().jfStop();
});
},setVolume:function(m){
var n=this;
n._mnVolume=m;
n._operQueue(function(){
n.getPlayObj().jfSetVolume&&n.getPlayObj().jfSetVolume(m);
});
},getVolume:function(){
return this._mnVolume!==undefined?this._mnVolume:100;
},setMuted:function(m){
this._operQueue(function(){
this.getPlayObj().jfSetMute&&this.getPlayObj().jfSetMute(!!m);
});
},getMuted:function(){
var m=this.getPlayObj();
if(this._mbInitFinish&&m.jfGetMute)
{
return m.jfGetMute();
}
},setURL:function(n,m){
var o=this;
this._operQueue(function(){
if(o.getPlayObj().jfSetUrl)
{
if(!!m)
{
o.getPlayObj().jfSetType("cloud");
o.getPlayObj().jfSetUrl(m);
}
else{
o.getPlayObj().jfSetType(o._moKernelCtrl._getMediaType());
n=[n&&n.indexOf("http")!=0&&(location.protocol+"//"+location.hostname)||"",n].join("");
o.getPlayObj().jfSetUrl(n);
}
var p=o._moKernelCtrl.getInfo()||{};
o.getPlayObj().jfSetTitle(p.title||"");
}
});
},setUiMode:function(m){
this._operQueue(function(){
});
},getURL:function(){
var m=this.getPlayObj();
if(this._mbInitFinish&&m.jfGetUrl)
{
return m.jfGetUrl();
}
},getOpenState:function(){
if(this._mbInitFinish&&this.getPlayObj().jfGetOpenState)
{
return this.getPlayObj().jfGetOpenState();
}
else {
return 22;
}
},getPlayState:function(){
if(this._mbInitFinish&&this.getPlayObj().jfGetPlayState)
{
return this.getPlayObj().jfGetPlayState();
}
else {
return 0;
}
},setPlayPos:function(m){
var r=this.getPlayObj();
if(this._mbInitFinish&&r.jfPlay)
{
var o=this.getDurationString(),p=(Math.max(+m,0)/100)*o,n=(this.getBuffer()/100)*o||0,q=Math.round(p*1000);
debug(q);
try{
r.jfSeek&&r.jfSeek(q);
}
catch(s)
{
debug(s);
}
return q;
}
return;
},getPlayPos:function(){
if(this._mbInitFinish&&this.getPlayObj().jfGetCurPos)
{
return (this.getPlayObj().jfGetCurPos())/(this.getPlayObj().jfGetDuration())*100;
}
},getBuffer:function(){
if(this._mbInitFinish&&this.getPlayObj().jfGetLoadPercent)
{
return this.getPlayObj().jfGetLoadPercent();
}
else {
return 0;
}
},getCurrentPositionString:function(){
if(this._mbInitFinish&&this.getPlayObj().jfGetCurPos)
{
return this.getPlayObj().jfGetCurPos()/1000;
}
return 0;
},getDurationString:function(){
if(this._mbInitFinish&&this.getPlayObj().jfGetDuration)
{
return this.getPlayObj().jfGetDuration()/1000;
}
return 0;
},getInitFinish:function(){
return this._mbInitFinish;
},canPlayType:function(m){
return this._msMimeTypeContainer.indexOf(m||this._msDefaultType)>-1;
},_handleFlashUrl:function(n,m){
var o=m||"";
if("flv|f4p|f4v|f4a|f4b".indexOf(o)>-1)
{
n=l.T(["/cgi-bin/readtemplate?sid=$sid$&t=video_ref.smil&vsrc=$src$"]).replace({sid:l.getSid(),src:encodeURIComponent(n.substr(1,n.length))});
}
return n;
}};
var e=function(n,m,o){
d.apply(this,arguments);
var p=this,q='swfplayer'+m.sId;
insertHTML(n,'afterBegin',k["swf_container"].replace({style:'position:absolute;width:100%;height:100%',id:q}));
p._moKernelCtrl=o;
p._moPlayerObj=l.S(q,n.ownerDocument);
p._msKernelType="SWF";
p._mbInitFinish=true;
p._moContainer=n;
debug('SWFPlayer init');
};
e.prototype={toggleFullScreen:function(m){
return;
var r=this,s=["type",r._msKernelType].join("_"),p=null,o=r._moPlayerObj.ownerDocument.body.clientWidth,n=r._moPlayerObj.ownerDocument.body.clientHeight,q=r._moPlayerObj;
while(q.tagName!="BODY")
{
if(l.hasClass(q,s))
{
p=q;
break;
}
else{
q=q.parentNode;
}
}
if(p)
{
if(m||!l.hasClass(p,"full_screen"))
{
p.style.width=o+"px";
p.style.height=n-j+"px";
!l.hasClass(p,"full_screen")&&l.addClass(p,"full_screen");
p.style.marginTop="-"+p.parentNode.style.top;
p.style.marginLeft="-"+p.parentNode.style.left;
p.parentNode.parentNode.style.zIndex="11";
r._mnResizeTimer&&clearInterval(r._mnResizeTimer);
r._mnResizeTimer=setInterval(function(){
l.hasClass(p,"full_screen")&&r.toggleFullScreen(true);
},100);
}
else{
p.style.width="100%";
p.style.height="";
l.rmClass(p,"full_screen");
p.style.margin="0";
p.parentNode.parentNode.style.zIndex="";
r._mnResizeTimer&&clearInterval(r._mnResizeTimer);
}
}
},play:function(){
return;
var o=this,m=(Math.random()+"").split(".").pop(),n=this._moPlayerObj.ownerDocument,q=this._msSWFUrl,p="swf"+m;
if(!this._moPlayerObj.innerHTML)
{
this._moPlayerObj.innerHTML=generateFlashCode(p,q,{width:"100%",height:"100%",bgcolor:"#000000",wmode:"window",play:"true"},{allowscriptaccess:"never",allownetworking:"none"});
this._moSWFObject=l.S(p,n);
}
else if(this._moSWFObject)
{
this._moSWFObject.Play();
}
},pause:function(){
if(this._moSWFObject)
{
this._moSWFObject.StopPlay();
}
},stop:function(){
return;
this._moSWFObject=null;
this._moPlayerObj.innerHTML="";
this._mnResizeTimer&&clearInterval(this._mnResizeTimer);
},getURL:function(){
return this._msSWFUrl;
},setURL:function(m){
this._msSWFUrl=m;
},setVolume:function(){
},getVolume:function(){
},setMuted:function(){
},getMuted:function(){
},setPlayPos:function(){
},getPlayPos:function(){
},getOpenState:function(){
var n=this._moSWFObject;
if(n)
{
var m=n.PercentLoaded();
if(m>0&&m<100)
{
return 1;
}
else if(m==100)
{
return 2;
}
}
else{
return -1;
}
return 0;
},getPlayState:function(){
},getCurrentPositionString:function(){
return this._moSWFObject?this._moSWFObject.CurrentFrame():0;
},getDurationString:function(){
if(this._moSWFObject)
{
return !window.attachEvent?this._moSWFObject.TotalFrames():this._moSWFObject.TotalFrames;
}
else {
return 0;
}
},getBuffer:function(){
return Math.min((this._moSWFObject&&this._moSWFObject.PercentLoaded()||0),100);
},getInitFinish:function(){
return this._mbInitFinish;
},canPlayType:function(m){
return m=="swf";
}};
var c=function(p){
var r=this,s=c,q=p.oContainer,t=i(q);
r._moFlashKernel=null;
r._moWMPKernel=null;
r._moHTML5Kernel=null;
r._moSWFPlayer=null;
r._moCurrentKernel=null;
r._moPlayList=null;
r._mnUpdateId=0;
r._moConnectSkins=[];
r._msMediaType=null;
r._moCurrentWin=t;
r._moCfg=p;
insertHTML(q,'afterBegin',k["kernel"].replace({style:'position:absolute;margin-top:-10000px;',id:p.sId}));
r._moOutter=q;
r._moContainer=q.firstChild;
var m=[],o=10,n={_set:function(u){
m.push(u);
if(m.length>o)
{
m.shift();
}
},_get:function(u){
u=typeof u!="undefined"?u:0;
var w=m.join("|").split("|"),v=Math.max(0,w.length-u);
return w.slice(v);
},_rule:function(v,u){
var w=[];
for(var x=0;x<u;x++)
{
w.push(v);
}
return w;
},_clear:function(){
m=[];
}};
r._getStateMsg=function(u){
var z=u.getKernelType(),v=u.getOpenState(),w=u.getPlayState(),x=c.openState,y=c.playState;
if(z=="FLASH"||z=="WMP")
{
if(v==x._INITNOTFINISH)
{
return 'init';
}
else if(v==x._PLAYLISTOPENNOMEDIA&&w==y._UNDEFINED)
{
return "empty";
}
else if(v==x._MEDIALOCATING&&w==y._TRANSITIONING)
{
return "locating";
}
else if(v==x._MEDIAOPENING&&w==y._TRANSITIONING)
{
return "openning";
}
else if(v==x._MEDIACONNECTING&&w==y._TRANSITIONING)
{
return "connecting";
}
else if(v==x._OPENUNKNOWNURL&&w==y._TRANSITIONING)
{
return "buffering";
}
else if(v==x._MEDIAOPEN&&w==y._BUFFERING)
{
return "buffering";
}
else if(v==x._MEDIAOPEN&&w==y._PLAYING)
{
r._onStatChange("play");
return "play";
}
else if(v==x._MEDIAOPEN&&w==y._PAUSED)
{
return "pause";
}
else if(w==y._READY)
{
return "ready";
}
else if(w==y._STOPPED)
{
return "stop";
}
else{
return "ready";
}
}
else if(z=="SWF")
{
if(v==0)
{
return "ready";
}
else if(v==1)
{
return "buffering";
}
else if(v==2)
{
r._onStatChange("play");
return "play";
}
else{
return "stop";
}
}
else{
if(w>0)
{
r._onStatChange("play");
return "play";
}
else if(v==2)
{
return "buffering";
}
else if(v==3)
{
return "error";
}
else{
return "stop";
}
}
};
r._translate=function(u){
return {"init":"\u521D\u59CB\u5316\u64AD\u653E\u5668","empty":"\u8BF7\u9009\u62E9\u64AD\u653E\u6587\u4EF6","locating":"\u6B63\u5728\u5B9A\u4F4D\u5A92\u4F53","openning":"\u6B63\u5728\u6253\u5F00\u5A92\u4F53","connecting":"\u6B63\u5728\u8FDE\u63A5\u5230\u5A92\u4F53","buffering":"\u6B63\u5728\u7F13\u51B2","play":"\u6B63\u5728\u64AD\u653E","pause":"\u5DF2\u6682\u505C","ready":"\u51C6\u5907\u5C31\u7EEA","error":"\u64AD\u653E\u5931\u8D25","stop":""}[u];
};
r._getRuntimeStat=function(B){
var D=B.getKernelType(),u=B.getMuted()||false,A=B.getVolume(),G=B.getPlayState(),F=B.getOpenState(),H=r._getStateMsg(B),I=r._translate(H),x=B.getCurrentPositionString(),z=B.getDurationString(),v=0,y=x?(x/z)*100:0,w=B.getBuffer(),C=numToTimeStr(x,x>=3600?'':'$MM$:$SS$'),J=numToTimeStr(z,z>=3600?'':'$MM$:$SS$');
return ({kernel:D,mediaType:r._getMediaType(),muted:u,volume:A,playStat:G,openStat:F,statMsg:H,statStr:I,current:x,total:z,buffer:v,currPercent:y,buffPercent:w,currentStr:C,totalStr:J});
};
r.getCurrentStat=function(){
return this._getRuntimeStat(this._moCurrentKernel);
};
r.getCurrentKernel=function(){
return this._moCurrentKernel;
};
r.updateStat=function(v,u,w){
var y=w||{};
clearInterval(r._mnUpdateId);
r.eachSkin(function(z){
if(z.getConnectingKernel()===r)
{
QMPlayer.evt.fire(z,"loading",[false]);
}
});
if(u)
{
function x()
{
var A=r._moCurrentKernel,B=extend({msg:v.title||""},v,A?r._getRuntimeStat(A):{},y),C=B["statMsg"],z=C=="stop";
n._set(C);
if(z||n._get(o).join("|")==n._rule("ready",o).join("|"))
{
r.operate("stop");
clearInterval(r._mnUpdateId);
n._clear();
}
else if(n._get(o).join("|")==n._rule("error",o).join("|"))
{
r.operate("retry");
clearInterval(r._mnUpdateId);
n._clear();
}
r.eachSkin(function(D){
if(D.getConnectingKernel()===r)
{
QMPlayer.evt.fire(D,"stat",[B]);
QMPlayer.evt.fire(D,"loading",[C=="buffering"]);
}
});
}
;x();
if(y.bIsSeek)
{
setTimeout(function(){
r._mnUpdateId=setInterval(x,500);
});
}
else{
r._mnUpdateId=setInterval(x,500);
}
}
};
r._bindPlayListCtrl=function(){
var w=new QMPlaylist(p),u=p.oInfo,v=p.oInfoList;
QMPlayer.evt.listen(w,"play",function(x){
r.operate("play",x);
});
if(v&&v.length)
{
this.setInfo(v[0]);
w.set(v);
}
else if(u)
{
r.setInfo(u);
}
return w;
};
r._unbindPlayListCtrl=function(){
QMPlayer.evt.silent(r._moPlayList,"play");
r._moPlayList=null;
};
r._init=function(){
if(s.isSupport("HTML5")&&r._moCfg.bIsNote!=true&&r._moCfg.bUseHTML5)
{
r._moHTML5Kernel=new b(r._moContainer,p,r);
}
if(s.isSupport("FLASH"))
{
r._moFlashKernel=new a(r._moContainer,p,r);
}
if(s.isSupport("WMP"))
{
r._moWMPKernel=new f(r._moContainer,p,r);
}
if(t!=l)
{
addEvent(t,"unload",function(){
QMPlayer.evt.fire(r,"destory",[r.getId()]);
});
}
r._moPlayList=r._bindPlayListCtrl();
};
r._init();
};
extend(c,{playState:{_UNDEFINED:0,_STOPPED:1,_PAUSED:2,_PLAYING:3,_SCANFORWARD:4,_SCANREVERSE:5,_BUFFERING:6,_WAITING:7,_MEDIAENDED:8,_TRANSITIONING:9,_READY:10,_RECONNECTING:11,_LAST:12},openState:{_UNDEFINED:0,_PLAYLISTCHANGING:1,_PLAYLISTLOCATING:2,_PLAYLISTCONNECTING:3,_PLAYLISTLOADING:4,_PLAYLISTOPENING:5,_PLAYLISTOPENNOMEDIA:6,_PLAYLISTCHANGED:7,_MEDIACHANGING:8,_MEDIALOCATING:9,_MEDIACONNECTING:10,_MEDIALOADING:11,_MEDIAOPENING:12,_MEDIAOPEN:13,_BEGINCODECACQUISITION:14,_ENDCODECACQUISITION:15,_BEGINLICENSEACQUISITION:16,_ENDLICENSEACQUISITION:17,_BEGININDIVIDUALIZATION:18,_ENDINDIVIDUALIZATION:19,_MEDIAWAITING:20,_OPENUNKNOWNURL:21,_INITNOTFINISH:22},playType:{"media":{"mp4":"audio/mp4,video/mp4","ogg":"audio/ogg,video/ogg","webm":"audio/webm,video/webm","swf":"application/x-shockwave-flash"},"audio":{"wma":"audio/x-ms-wma","mp3":"audio/mpeg,audio/mp3","oga":"audio/ogg","m4a":"audio/mp4","webma":"audio/webm","wav":"audio/wav","f4a":"audio/mp4","f4b":"audio/mp4","mid":"audio/mid","mp1":"audio/mp1","mp2":"audio/mp2","rmi":"audio/mid"},"video":{"mov":"video/quicktime","wmv":"video/x-ms-wmv","m4v":"video/mp4","ogv":"video/ogg","webmv":"video/webm","flv":"video/x-flv","f4v":"video/mp4","f4p":"video/mp4"}},isSupport:function(m){
if(!c.coreType)
{
c.coreType={WMP:false,FLASH:false,HTML5:false};
if(window.Audio&&!l.gbIsIE)
{
c.coreType['HTML5']=true;
}
var p=navigator.plugins;
if(p&&p.length)
{
for(var s=0,n=p.length;s<n;s++)
{
var q=p[s].name;
if(q.indexOf("Windows Media Player")!=-1&&q.indexOf("Microsoft")!=-1)
{
c.coreType['WMP']=true;
break;
}
}
}
else{
try{
if(new ActiveXObject('WMPlayer.OCX'))
{
c.coreType['WMP']=true;
}
}
catch(o)
{
}
}
try{
c.coreType['FLASH']=l.qmFlash.isSupported();
}
catch(r)
{
debug(r.message);
}
}
if(l.QMCoreType)
{
c.coreType=l.QMCoreType;
}
return c.coreType[m];
},getMediaType:function(m){
var o=c.playType;
for(var q in o)
{
var n=o[q];
for(var p in n)
{
if(m.toLowerCase()==p)
{
return q;
}
}
}
return "video";
},getFileType:function(m){
var o=c.playType;
for(var r in o)
{
var n=o[r];
for(var q in n)
{
var p=new RegExp("\."+q,"gi");
if(p.test(m))
{
return q;
}
}
}
return "mp3";
},download:function(){
var m={microsoft:"http://www.microsoft.com/windows/windowsmedia/default.mspx",port25:"http://port25.technet.com/pages/windows-media-player-firefox-plugin-download.aspx",apple:"http://www.microsoft.com/windows/windowsmedia/player/mac/default.aspx",flash:"http://get.adobe.com/flashplayer/"};
var n=m.microsoft;
if(gbIsMac||gbIsLinux)
{
n=m.flash;
}
else if(gbIsWebKit||gbIsFF)
{
n=navigator.platform.toLowerCase().indexOf("mac")==0?m.apple:m.port25;
}
debug('wmp init fail');
return T(['\u9700\u8981<a href="$url$" target="_blank">\u5B89\u88C5WMP</a>']).replace({url:n});
}});
c.prototype={_hasSkin:function(m){
var n=this._moConnectSkins;
for(var o=0;o<n.length;o++)
{
if(n[o].getId()==m.getId())
{
return o+"";
}
}
return false;
},_addSkin:function(m){
if(!this._hasSkin(m))
{
this._moConnectSkins.push(m);
}
},_rmSkin:function(m){
var p=this._hasSkin(m),o=this._moConnectSkins;
if(p)
{
var n=+p;
this._moConnectSkins=o.slice(0,n).concat(o.slice(n+1));
}
},_stopOrPause:function(m){
var q=this,r=m=="stop"?m:"pause",n=q.getInfo(),p=[q._moHTML5Kernel,q._moFlashKernel,q._moSWFPlayer,q._moWMPKernel];
for(var s=0;s<p.length;s++)
{
var o=p[s];
if(o)
{
o[r]();
}
}
},_setMediaType:function(m){
this._msMediaType=m;
},_getMediaType:function(){
return this._msMediaType;
},_updateMidiaTypeByInfo:function(m){
var n=this,o=c.getFileType(m.url||""),p=c.getMediaType(m.fileType||o);
n._setMediaType(p);
return p;
},_genTimeLimitsByInfo:function(m){
var o=this,r="|$@$|";
if(o._msTimeLimitId)
{
var p=o._msTimeLimitId.split(r),q=p[0],n=+p[1];
if(q==[m.title,m.url].join(""))
{
if(!isNaN(n)&&n>1)
{
o._msTimeLimitId=[q,--n].join(r);
debug("**Limited: "+n+" , retry...");
return true;
}
else{
debug("**Limited: overflow...");
return false;
}
}
}
o._msTimeLimitId=[[m.title,m.url].join(""),3].join(r);
debug("##getInfoLimit: it's a fresh new delegate##");
return true;
},_choose:function(n,m){
var s=this,t=c.getFileType(n.url||""),u=n.fileType||t,w=c.getMediaType(u),v=s._moCurrentKernel&&s._moCurrentKernel.getKernelType()||"";
s._moCurrentKernel&&s._moCurrentKernel.getPlayState()!=c.playState._PLAYING&&s._moCurrentKernel.setURL("");
var o=function(y){
return {HTML5:s._moHTML5Kernel&&s._moHTML5Kernel.canPlayType(u),FLASH:s._moFlashKernel&&s._moFlashKernel.canPlayType(u),WMP:s._moWMPKernel&&s._moWMPKernel.canPlayType(u),SWF:s._moSWFPlayer&&s._moSWFPlayer.canPlayType(u)}[y];
};
if(n.hash&&o("FLASH"))
{
s._moCurrentKernel=s._moFlashKernel;
}
else if(!m)
{
if(o("HTML5"))
{
s._moCurrentKernel=s._moHTML5Kernel;
}
else if(o("FLASH"))
{
s._moCurrentKernel=s._moFlashKernel;
}
else if(o("SWF"))
{
s._moCurrentKernel=s._moSWFPlayer;
}
else if(o("WMP"))
{
s._moCurrentKernel=s._moWMPKernel;
}
else{
s._moCurrentKernel=s._moWMPKernel;
}
}
else{
var p=[],r=s._moCurrentKernel;
debug("choose another kernel...");
if(!s._genTimeLimitsByInfo(n))
{
s._onStatChange("limited");
return false;
}
s._moFlashKernel&&s._moFlashKernel.getKernelType()!=r.getKernelType()&&p.push(s._moFlashKernel);
s._moSWFPlayer&&s._moSWFPlayer.getKernelType()!=r.getKernelType()&&p.push(s._moSWFPlayer);
s._moWMPKernel&&s._moWMPKernel.getKernelType()!=r.getKernelType()&&p.push(s._moWMPKernel);
s._moHTML5Kernel&&s._moHTML5Kernel.getKernelType()!=r.getKernelType()&&p.push(s._moHTML5Kernel);
debug("choose before:"+s._moCurrentKernel.getKernelType());
for(var x=0;x<p.length;x++)
{
var q=p[x];
if(o(q.getKernelType()))
{
s._moCurrentKernel=q;
break;
}
}
debug("choose after:"+s._moCurrentKernel.getKernelType());
}
if(s._moCurrentKernel)
{
v!=s._moCurrentKernel.getKernelType()&&s._moCurrentKernel.setURL("");
s._moCurrentKernel.showKernel(n);
}
s._setMediaType(w);
return s._moCurrentKernel;
},_getFileTypeByInfo:function(m){
var n=this,o=c.getFileType(m.url||""),p=m.fileType||o;
return p.toLowerCase();
},_setQQMusicCookie:function(m){
var n=m.url;
if(n.indexOf("qqmusic.qq.com")!=-1)
{
setCookie("qqmusic_fromtag","36",null,"/","qq.com");
setCookie("qqmusic_uin","12345678",null,"/","qq.com");
setCookie("qqmusic_key","12345678",null,"/","qq.com");
setCookie("qqmusic_privatekey","",null,"/","qq.com");
}
},_chooseOne:function(n,m){
n=n||{};
var p=this,q=p._getFileTypeByInfo(n),o=null;
if(!m)
{
o=(p._moCurrentKernel&&p._moCurrentKernel.getKernelType()!="WMP"&&p._moCurrentKernel.canPlayType(q))?p._moCurrentKernel:p._choose(n);
}
else{
o=p._choose(n,m);
}
p._markKernelType(o&&o.getKernelType()||"");
return o;
},_markKernelType:function(m){
var p=this,o=["FLASH","HTML5","WMP","SWF"],n=p._moContainer.parentNode.parentNode.parentNode;
for(var r=0;r<o.length;r++)
{
var q="type_"+o[r];
l.hasClass(n,q)&&l.rmClass(n,q);
}
m&&l.addClass(n,"type_"+m);
},destory:function(){
var m=this;
m.operate("stop");
m._unbindPlayListCtrl();
m._moContainer.style.cssText="position:absolute;margin-top:-10000px";
m._moConnectSkins=[];
m._moOutter.removeChild(m._moContainer);
m._moContainer=null;
m._moOutter=null;
m._moCurrentWin=null;
m._moCfg=null;
},setInfoList:function(m){
this.setInfo(m[0]);
this._moPlayList.set(m);
return this;
},getInfoList:function(){
return this._moPlayList.get();
},setInfo:function(m){
this._moCfg.oInfo=m;
return this;
},getInfo:function(){
return this._moCfg&&this._moCfg.oInfo||{};
},getPlayList:function(){
return this._moPlayList;
},getConnectingSkin:function(){
return this._moConnectSkins;
},eachSkin:function(m){
var n=this._moConnectSkins||[];
for(var o=0;o<n.length;o++)
{
n[o]&&m&&m.apply(this,[n[o],o]);
}
},getType:function(){
return "core";
},getId:function(){
return this._moCfg&&this._moCfg.sId||"";
},plug:function(m){
var n=this;
m.connect(n);
m.sendMsg(n,function(o,p){
n.operate(o,p);
});
n.rmListener(m);
n.addListener(m);
n._rmSkin(m);
n._addSkin(m);
},unplug:function(m){
var n=this;
n.rmListener(m);
n._rmSkin(m);
m.disconnect();
},addListener:function(m){
var n=["loading","stat","played","stopped","paused","playswf","nokernel","updateplaylist"];
for(var o=0;o<n.length;o++)
{
(function(p,q){
QMPlayer.evt.listen(p,q,function(){
p.recvMsg(q,arguments);
});
})(m,n[o]);
}
},rmListener:function(m){
QMPlayer.evt.fire(m,"stopped");
var n=["loading","stat","played","stopped","paused","playswf","nokernel","updateplaylist"];
for(var o=0;o<n.length;o++)
{
(function(p,q){
QMPlayer.evt.silent(p,q);
})(m,n[o]);
}
},operate:function(m,n){
if(!this._moContainer)
{
debug("kenel has been destoryed");
return;
}
var z=this,v=z.getInfo(),w=z._chooseOne(v);
if(!w)
{
var C=c.download();
z.eachSkin(function(D){
QMPlayer.evt.fire(D,"nokernel",[C]);
});
z._onStatChange("nokernel");
return;
}
var y=w;
switch(m)
{case "retry":
debug("retry...");
z._stopOrPause("stop");
y=z._chooseOne(v,true);
var o=true;
if(!y)
{
z.operate("stop");
return;
}
case "play":
z._moCfg.onPlay&&z._moCfg.onPlay();
debug("play interface");
if(n)
{
z._stopOrPause("stop");
v=n;
z.updateStat(v,false);
z._updateMidiaTypeByInfo(v);
if(!o)
{
y=z._chooseOne(v);
z._onStatChange("init");
}
z._setQQMusicCookie(v);
}
else{
z.eachSkin(function(D){
if(D.getConnectingKernel()===z)
{
QMPlayer.evt.fire(D,"played");
}
});
}
if(!y.getURL()||(y.getURL()!=v.url&&y.getURL()!=v.hash))
{
debug(v.url);
y.setURL(v.url,v.hash);
}
z.eachSkin(function(D){
if(D.getConnectingKernel()===z)
{
QMPlayer.evt.fire(D,"updateplaylist");
}
});
var B=z._getFileTypeByInfo(v),p=B=="swf";
y.play();
y.setVolume(y.getVolume());
z.eachSkin(function(D){
if(D.getConnectingKernel()===z)
{
QMPlayer.evt.fire(D,"playswf",[p]);
}
});
setTimeout(function(){
z.updateStat(v,true);
});
break;
case "prev":
var x=z.getPlayList();
x.playPrev();
break;
case "next":
var x=z.getPlayList();
x.playNext();
break;
case "getPlayIdx":
var x=z.getPlayList();
return x.getIdx();
case "playByIdx":
var x=z.getPlayList();
x.playByIdx(n);
break;
case "pause":
z.eachSkin(function(D){
if(D.getConnectingKernel()===z)
{
QMPlayer.evt.fire(D,"paused");
}
});
z._stopOrPause("pause");
z.updateStat(v,false);
break;
case 'close':
var A=n;
z.unplug(A);
y.stop();
QMPlayer.delUIById(A.getId());
z.getConnectingSkin().length>1&&z.eachSkin(function(D){
QMPlayer.delUIById(D.getId());
});
break;
case "stop":
z._onStatChange("stop");
z._moCfg.onStop&&z._moCfg.onStop();
z.eachSkin(function(D){
if(D.getConnectingKernel()===z)
{
QMPlayer.evt.fire(D,"stopped");
}
});
if(!n)
{
y.setURL("");
}
z._stopOrPause("stop");
z.updateStat(v,false);
if(z.getPlayList().get().length>1)
{
z.getPlayList().playNext(v);
}
break;
case "seek":
if(y.getURL())
{
var q=+y.getBuffer(),r=q/100*y.getDurationString();
y.setPlayPos(n);
var s=+y.getBuffer(),u=+n,t=s/100*y.getDurationString();
!z._mnOffset&&(z._mnOffset=0);
Math.abs(r-t)>299&&(z._mnOffset=s);
z.updateStat(v,true,{bIsSeek:true,nOffset:v.hash?z._mnOffset:null});
}
break;
case "playlist":
z.getPlayList().show(n[0],n[1],n[2]);
break;
case 'muted':
y.setMuted(n);
break;
case 'volume':
return n!==undefined&&typeof n=='number'?y.setVolume(n):y.getVolume();
break;
case 'fullscreen':
y.toggleFullScreen();
break;
default:
}
},getCurrentWin:function(){
return this._moCurrentWin;
},_onStatChange:function(m){
var n=this.getInfo();
switch(m)
{case "init":
this._msLastStatus=g;
break;
case "play":
this._msLastStatus!="play"&&n.onsuccess&&n.onsuccess();
this._msLastStatus!="play"&&debug("qmplayer stat succ:"+m);
this._msLastStatus=m;
break;
case "nokernel":
case "stop":
case "limited":
!this._msLastStatus&&this._onError(m);
this._msLastStatus=m;
break;
default:
this._msLastStatus=m;
}
},_onError:function(m){
var n=this.getInfo();
debug("qmplayer stat error:"+m);
n.onerror&&n.onerror(m);
}};
h["QMPlayerKernel"]=c;
})(window);
(function(b){
var f=getTop(),e={Nil:{_TEMPLATE:T(['<div id="playerpanel_$sId$" class="player_control" style=""></div>'])},Global:{_TEMPLATE:T(['<div id="playerpanel_$sId$" class="gplayer" style="" closehide="yes">','<div class="gclose_wrap right" hovercss="" >','<div id="close_$sId$" action="close" class="close" defcss="close" hovercss="close_h" style="cursor:pointer;"><img action="close" src="$imgpath$spacer.gif" style="width:14px; height:14px; zoom:1;"></div>','</div>','<div class="gmsg_wrap right" hovercss="" >','<div class="gmsg" title="$info$">','<div id="stateMsg_$sId$">$statemsg$</div>','<div style="display:none;"><span id="currentPositionString_$sId$">0:00</span>/<span id="durationString_$sId$">0:00</span></div>','</div>','</div>','<div class="goperate_wrap right" hovercss="" >','<div class="play"  id="play_$sId$"  action="play" defcss="play" hovercss="play_h" style="cursor:pointer;"><img action="play" src="$imgpath$spacer.gif" style="width:14px; height:14px; zoom:1;"></div>','<div class="pause" id="pause_$sId$" action="pause" defcss="pause" hovercss="pause_h" style="display:none;cursor:pointer; "><img action="pause" src="$imgpath$spacer.gif" style="width:14px; height:14px; zoom:1;"></div>','</div>','</div>'])},Preview:{_TEMPLATE:T(['HTML here...'])},Birthday:{_TEMPLATE:T(['<div id="playerpanel_$sId$" class="player_control" style="">','<div class="birth2013_toolbar" style="position:absolute;left:0;bottom:0;width:100%;overflow:hidden;margin:-42px 0 0;padding:0;text-align:right;z-index:2;cursor:pointer;">','<div style="position:absolute;top:0;left:0;width:100%;height:100%;background:black;filter:alpha(opacity=55);opacity:0.55;"></div>','<a id="play_$sId$" class="birth2013_btn_start" href="javascript:;" hidefocus></a>','<a id="pause_$sId$" style="display:none" class="birth2013_btn_pause" href="javascript:;" hidefocus></a>','<div id="progress_$sId$" style="position:absolute;top:19px;left:66px;width:364px;height:3px;background:none;">','<div id="progressbar_$sId$" style="position:absolute;top:0;left:0;width:364px;height:3px;border:solid black;border-width:0 4px;background:#858585;">','<div style="position:absolute;top:0;left:0;width:0%;height:3px;overflow:hidden;background:#D0D0D0;" id="loaded_$sId$"></div>','<div id="played_$sId$" class="played_line" style="width:0%;display:none" ></div>','<span class="birth2013_playpoint" style="left:0%" id="handle_$sId$"></span>','</div>','</div>','<span class="birth2013_shadow0"></span>','</div>','</div>'])},Attach:{_TEMPLATE:T(['<div id="playerpanel_$sId$" class="player_control" style="">','<div class="right" >','<a id="muted_$sId$" class="volume" title="\u9759\u97F3" action="muted" actionparam="1"><span class="ico_vol" action="muted" actionparam="1"></span></a>','<a id="muted2_$sId$" class="volume" title="\u53D6\u6D88\u9759\u97F3" style="display:none" action="muted"><span class="ico_muted" action="muted"></span></a>','<div class="vol_control" style="display:none;">','<div class="vol_line">','<div class="volstatus_line" style="height:30%;"></div>','<a class="handle" style="bottom:30%;" title="30%"></a>','</div>','</div>','</div>','<div class="left">','<a class="play" title="\u64AD\u653E" action="play" id="play_$sId$"><span action="play" class="ico_play"></span></a>','<a class="play" title="\u6682\u505C" action="pause" id="pause_$sId$" style="display:none"><span action="pause" class="ico_pause"></span></a>','</div>','<div class="progress">','<div class="time_info graytext" id="stateMsg_$sId$" style="line-height:14px;">$statemsg$</div>','<span class="time_info graytext" style="display:none">','<font id="currentPositionString_$sId$">00:00</font>','/','<font id="durationString_$sId$">00:00</font>','</span>','<div id="progress_$sId$" class="progress_div" mousedown="setPos" style="cursor:pointer" title="\u62D6\u52A8\u53EF\u6539\u53D8\u64AD\u653E\u8FDB\u5EA6">','<div id="progressbar_$sId$" class="progress_line"></div>','<div id="loaded_$sId$" class="loaded_line" style="width:0%;" ></div>','<div id="played_$sId$" class="played_line" style="width:0%;" ></div>','<a id="handle_$sId$" class="handle" style="left:0%;cursor:default" ></a>','</div>','</div>','</div>'])},Mini:{_TEMPLATE:T(['<div id="playerpanel_$sId$" class="mplayer" closehide="">','<div id="play_$sId$"  class="play left"  action="play"></div>','<div id="pause_$sId$" class="pause left" action="pause" style="display:none;"></div>','<div class="mmsg">','<span id="stateMsg_$sId$">&nbsp;</span>','<span style="display:none;"><span id="currentPositionString_$sId$">00:00</span>/<span id="durationString_$sId$">00:00</span></span>','</div>','</div>'])},Simple:{_TEMPLATE:T(['<div id="playerpanel_$sId$" class="qmplayer_mini_btn" closehide="">','<div id="play_$sId$"  class="play pointer"  style="float:left;" action="play"></div>','<div id="pause_$sId$" class="pause pointer" style="float:left;display:none;" action="pause"></div>','<div class="qmplayer_mini_time">','<span style="display:none;"><span id="stateMsg_$sId$">&nbsp;</span></span>','<span style="display:none;"><span id="currentPositionString_$sId$">00:00</span><span id="durationString_$sId$" style="display:none;">00:00</span></span>','</div>','</div>'])},Proxy:{_TEMPLATE:T(['<div id="playerpanel_$sId$" style="visibility:hidden;position:absolute;left:-10000px;"></div>'])},Postcard:{_TEMPLATE:T(['<div id="playerpanel_$sId$" class="gplayer" style="" closehide="yes">','<div class="gclose_wrap right" hovercss="" style="width:3px;" >','</div>','<div class="gmsg_wrap right" hovercss="" >','<div class="gmsg" title="$info$">','<div class="tf" style="line-height:16px;" >$author$-$title$</div>','</div>','</div>','<div class="goperate_wrap right" hovercss="" >','<div class="play"  id="play_$sId$"  action="play" defcss="play" hovercss="play_h" style="cursor:pointer;"><img action="play" src="$imgpath$spacer.gif" style="width:14px; height:16px; zoom:1;"></div>','<div class="pause" id="pause_$sId$" action="pause" defcss="pause" hovercss="pause_h" style="display:none;cursor:pointer; "><img action="pause" src="$imgpath$spacer.gif" style="width:14px; height:16px; zoom:1;"></div>','</div>','</div>'])}};
var d=function(g){
var h=g.ownerDocument;
return h.defaultView||h.parentWindow;
};
function c(g)
{
return g.offsetLeft;
}
;var a=function(g){
var j=this,l=g.sId,i=g.oContainer,k=d(i);
var h=function(m){
return S(m+"_"+l,k);
};
j._moCurrentWin=null;
j._moOutter=null;
j._moKernel=null;
j._moCfg=null;
j._moSeek=null;
j._moConnentingKernel=null;
j._getSkin=function(m,n){
if(typeof n=="string")
{
var o=e[n||"Global"]._TEMPLATE;
}
else{
var o=n;
}
return o.replace(extend(m,{imgpath:getPath('image'),statemsg:m.msg||""}));
};
j._init=function(m){
insertHTML(i,'afterBegin',j._getSkin(m,m.oSkinTemplate||m.sSkin));
j._mnOffset=-1;
j._moContainer=i.firstChild;
j._moOutter=m.oContainer;
j._moCurrentWin=k;
j._moCfg=m;
if(k!=getTop())
{
addEvent(k,"unload",function(){
QMPlayer.evt.fire(j,"destory",[j.getId()]);
});
}
m.onReady&&setTimeout(function(){
m.onReady();
});
};
j._updateView=function(m){
if(!m)
{
return;
}
var D=m.statMsg;
j._moStat=m;
try{
var u=h("playerpanel"),w=h("play"),v=h("pause"),A=h("stateMsg"),x=h("playtitle"),q=h("currentPositionString"),r=h("durationString"),z=h("muted"),C=h("muted2"),t=h("loaded"),y=h("played"),s=h("handle"),B=[];
m.title&&B.push((m.mediaType=="audio"?"\u6B4C\u66F2\uFF1A":"\u89C6\u9891\uFF1A")+m.title);
m.author&&B.push("\u4F5C\u8005\uFF1A"+m.author);
u&&(u.title=B.join("\n"));
x&&(x.innerHTML=j.getConnectingKernel().getInfo().title);
if(D=="play")
{
q&&(q.parentNode.style.display='');
A&&(A.style.display='none');
q&&(q.innerHTML=m.currentStr);
r&&(r.innerHTML=m.totalStr);
w&&(w.style.display="none");
v&&(v.style.display="");
}
else if(D=="buffering")
{
q&&(q.parentNode.style.display='none');
A&&(A.style.display='');
A&&(A.innerHTML=m.statStr||m.msg);
w&&(w.style.display="none");
v&&(v.style.display="");
}
else{
q&&(q.parentNode.style.display='none');
A&&(A.style.display='');
A&&(A.innerHTML=m.statStr||m.msg);
w&&(w.style.display="");
v&&(v.style.display="none");
A&&(A.style.display="none");
}
if(z&&C)
{
z.style.display=m.muted?"none":"";
C.style.display=m.muted?"":"none";
if(u)
{
if(m.muted&&!f.hasClass(u,"mute_mode"))
{
f.addClass(u,"mute_mode");
}
else if(!m.muted&&f.hasClass(u,"mute_mode"))
{
f.rmClass(u,"mute_mode");
}
}
}
if(y)
{
var n=Math.round(+m.buffPercent||0);
typeof (m.nOffset)=="number"&&(j._mnOffset=m.nOffset);
if(j._mnOffset>-1)
{
t.style.width=Math.max((n-j._mnOffset),2)+"%";
t.style.left=j._mnOffset+"%";
}
else{
t.style.width=n+"%";
}
if(s&&!s.getAttribute("isdragdrop"))
{
if(D=="stop")
{
s.style.left="0";
y.style.width="0";
}
else{
var p=Math.round(+m.currPercent||0),o=s.parentNode.offsetWidth;
s.style.left=Math.min(o*p/100,o-s.clientWidth)+"px";
y.style.width=p+"%";
}
}
}
}
catch(F)
{
getTop().debug(F,2);
}
};
j._updateFullScreenIcon=function(m){
if(h("playerpanel")==undefined||h("playerpanel")==null)
{
return;
}
var n=h("playerpanel"),o;
if(n==undefined||n==null)
{
return;
}
o=n.parentNode.parentNode;
if(m&&f.hasClass(o,"full_screen_mode"))
{
f.rmClass(o,"full_screen_mode");
}
else if(!m&&!f.hasClass(o,"full_screen_mode"))
{
f.addClass(o,"full_screen_mode");
}
};
j._showLoading=function(m){
var n=h("kernel");
if(!n)
{
return;
}
if(m&&!f.hasClass(n,"video_loading"))
{
f.addClass(n,"video_loading");
}
else if(!m&&f.hasClass(n,"video_loading"))
{
f.rmClass(n,"video_loading");
}
};
j._changePlay=function(m,n){
try{
var t=h("play"),s=h("pause"),v=h("stateMsg"),o=h("currentPositionString"),p=h("durationString"),r=h("loaded"),u=h("played"),q=h("handle");
if(m!="played")
{
o&&(o.parentNode.style.display='none');
if(v)
{
v.style.display='';
if(m=="paused")
{
v.innerHTML="\u5DF2\u6682\u505C";
}
else if(m=="nokernel")
{
v.innerHTML=n;
}
else if(m=="stopped")
{
v.style.display="none";
}
else{
j._moStat&&(v.innerHTML=j._moStat.msg);
}
}
s&&(s.style.display="none");
t&&(t.style.display="");
}
else{
o&&(o.parentNode.style.display='');
v&&(v.style.display='none');
s&&(s.style.display="");
t&&(t.style.display="none");
}
}
catch(w)
{
debug("changePlay: error");
}
};
j._operateViaSkin=function(){
j._moConnentingKernel&&QMPlayer.evt.fire(j._moConnentingKernel,"operate",arguments);
};
j._togglePanel=function(m){
var n=h("playerpanel");
if(typeof m=="undefined")
{
n.style.display=n.style.display=="none"?"":"none";
}
else{
n.style.display=m?"":"none";
}
};
j._initEvent=function(m){
var r=h("playerpanel"),t=h("play"),n=h("close"),s=h("pause"),v=h("muted"),x=h("muted2"),w=h("fullscreen"),D=h("volshow"),z=h("volctrl"),B=h("volume"),y=h("volumebar"),C=h("volumeset"),A=h("volumehandle"),o=h("handle"),u=h("played"),q=h("progress"),p=h("progressbar");
if(w)
{
w.onclick=function(){
j.getConnectingKernel()&&j.getConnectingKernel().operate("fullscreen");
};
}
r.onmouseover=function(F){
if(j.getConnectingKernel()&&m.oPlayList&&m.oPlayList.nType==2)
{
j._operateViaSkin("playlist",[m.oPlayList.nType,m.oPlayList.oContainer||m.oContainer]);
}
};
if(m.oPlayList&&m.oPlayList.nType==1)
{
setTimeout(function(){
j._operateViaSkin("playlist",[m.oPlayList.nType,m.oPlayList.oContainer||m.oContainer]);
});
}
if(t)
{
t.onclick=function(){
j._operateViaSkin("play");
};
s.onclick=function(){
j._operateViaSkin("pause");
};
}
n&&(n.onclick=function(){
j._operateViaSkin("close",j);
});
if(v)
{
v.onclick=function(){
j._operateViaSkin("muted",true);
C.style.width="0%";
A.style.left="0%";
v.style.display="none";
x.style.display="";
if(!f.hasClass(r,"mute_mode"))
{
f.addClass(r,"mute_mode");
}
};
x.onclick=function(){
j._operateViaSkin("muted",false);
j._operateViaSkin("volume",50);
C.style.width="50%";
A.style.left="50%";
v.style.display="";
x.style.display="none";
if(f.hasClass(r,"mute_mode"))
{
f.rmClass(r,"mute_mode");
}
};
}
if(D&&z)
{
D.onmouseover=function(){
z.style.display="";
};
z.onmouseout=function(){
if(A.getAttribute("isdragdrop"))
{
return;
}
clearTimeout(j._mnMouseLock);
j._mnMouseLock=setTimeout(function(){
z.style.display="none";
},500);
};
z.onmouseover=function(){
clearTimeout(j._mnMouseLock);
};
}
if(p)
{
if(!f.QMDragDrop)
{
f.loadJsFileToTop(getPath('js'),[f.getFullResSuffix('qmtool.js')]);
}
f.waitFor(function(){
return !!f.QMDragDrop;
},function(F){
if(F)
{
j._moSeek=new (f.QMDragDrop.Draggable)(o,{locky:true},{ondragstart:function(G){
o.setAttribute("isdragdrop","1");
},ondrag:function(G){
var H=c(o);
if(H<0||H>p.clientWidth)
{
o.clientWidth&&(o.style.left=(Math.max(0,Math.min(H,p.clientWidth-o.clientWidth)))+"px");
}
var I=Math.max(0,Math.min(100,c(o)/p.clientWidth*100));
u.style.width=I+"%";
},ondragend:function(G){
var H=Math.max(0,Math.min(100,c(o)/p.clientWidth*100));
j._operateViaSkin("seek",H);
u.style.width=H+"%";
setTimeout(function(){
o.removeAttribute("isdragdrop");
});
}});
j._moVolume=new (f.QMDragDrop.Draggable)(A,{locky:true},{ondragstart:function(G){
A.setAttribute("isdragdrop","1");
},ondrag:function(G){
if(!y.getAttribute("oriwidth"))
{
y.setAttribute("oriwidth",y.clientWidth);
}
var I=c(A),H=+y.getAttribute("oriwidth");
if(I<0||I>H)
{
A.style.left=(Math.max(0,Math.min(I,H)))+"px";
}
var J=Math.max(0,Math.min(100,c(A)/y.clientWidth*100));
C.style.width=J+"%";
},ondragend:function(G){
var H=Math.max(0,Math.min(100,c(A)/y.clientWidth*100));
C.style.width=H+"%";
A.style.left=H+"%";
j._operateViaSkin("muted",H==0);
j._operateViaSkin("volume",H);
setTimeout(function(){
A.removeAttribute("isdragdrop");
z.onmouseout&&z.onmouseout();
});
}});
}
else{
debug("dragdrop is unusable");
}
q&&(q.onmouseup=function(G){
var G=G||d(p).event,J=p.clientWidth,I=f.getEventTarget(G).offsetLeft+(gbIsFF?G.layerX:G.offsetX),H=(Math.min(I,J)/J)*100;
if(o.getAttribute("isdragdrop")||f.getEventTarget(G).tagName=="A")
{
return;
}
j._operateViaSkin("seek",H);
});
B&&(B.onmouseup=function(G){
var G=G||d(y).event;
_nTotal=y.clientWidth,_nPos=gbIsFF?G.layerX:G.offsetX,_nPercent=(Math.min(_nPos,_nTotal)/_nTotal)*100;
if(A.getAttribute("isdragdrop")||f.getEventTarget(G).tagName=="A")
{
return;
}
C.style.width=Math.max(_nPercent,3)+"%";
A.style.left=_nPercent+"%";
j._operateViaSkin("volume",_nPercent);
j._operateViaSkin("muted",_nPercent==0);
});
});
}
};
j._init(g);
j._initEvent(g);
};
a.prototype={destory:function(){
var g=this;
if(g._moConnentingKernel)
{
g._moConnentingKernel.unplug(g);
}
g._moOutter.removeChild(g._moContainer);
g._moContainer=null;
g._moOutter=null;
g._moCurrentWin=null;
g._moConnentingKernel=null;
g._moSeek=null;
},getConnectingKernel:function(){
return this._moConnentingKernel;
},getType:function(){
return "skin";
},getId:function(){
return this._moCfg&&this._moCfg.sId||"";
},recvMsg:function(g,h){
var k=this,j=k._moConnentingKernel.getInfo();
if(j.updatecallback)
{
j.updatecallback(g,h);
}
else{
switch(g)
{case "loading":
k._showLoading.apply(k,h);
break;
case "stat":
var l=k._moConnentingKernel._getMediaType();
k._updateView.apply(k,h);
k._updateFullScreenIcon(l=="audio");
break;
case "paused":
case "stopped":
k._changePlay(g);
break;
case "played":
k._changePlay(g);
break;
case "nokernel":
k._changePlay(g,h[0]);
break;
case "playswf":
k._changePlay("played");
break;
case "updateplaylist":
var i=k._moCfg;
if(i.oPlayList)
{
k._operateViaSkin("playlist",[i.oPlayList.nType,i.oPlayList.oContainer||i.oContainer,true]);
}
break;
default:
}
}
},sendMsg:function(h,g){
this._moConnentingKernel=h;
QMPlayer.evt.silent(h,"operate");
QMPlayer.evt.listen(h,"operate",function(j,i){
var k=arguments;
setTimeout(function(){
g.apply(null,k);
});
});
},connect:function(g){
this._moConnentingKernel=g;
},disconnect:function(){
this._moConnentingKernel=null;
},getCurrentWin:function(){
return this._moCurrentWin;
}};
b["QMPlayerSkin"]=a;
})(window);
