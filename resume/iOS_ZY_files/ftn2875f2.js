(function(a){
var e=QMFileUpload;
var c=new e.qmCreater(),d={};
c.orders={"popup":a.isBrowser("chrome")?["Ftn","PPFtn","FlashH5PopupMail","FlashPopupFMail","ActivexPopupMail","RawinputPopupMail"]:["Ftn","FlashH5PopupMail","FlashPopupFMail","RawinputPopupMail"],"drag":["FlashH5DragMailCROS","Html5DragCROS"],"paste":["Ftn"]};
var b=e.oUtil.getDragCode4Ax,f='\u5C06\u6587\u4EF6\u62D6\u62FD\u81F3\u6B64\u533A\u57DF',g='\u91CA\u653E\u9F20\u6807';
e.createFtn=function(i,h){
var j=getTop();
getTop().ppContainer=(getTop().attr(h.oContainer,"id")!=="selectFile")?h.oContainer:h.oContainer.parentNode;
if(d[i])
{
if(!d[i].detect(i))
{
return;
}
if(typeof h=="function")
{
h=h.call(_oSelf,_oSelf.name);
}
h.sType=i;
d[i].initConfg(h);
d[i]._initContainer(h);
return d[i];
}
return c.create(i,function(k){
return function(l){
if(/^Ftn/.test(l)&&!d[k])
{
d[k]=this;
}
else if(l=="RawinputPopupMail"&&/^https/.test(j.getTopHost()))
{
j.LogKV("https|RawinputPopupMail|cannot|upload");
}
return h;
};
}(i));
};
e.createFtn.oCreaterInstance=c;
e.createCom("Ftn",function(h){
return a.extend(e.getMailLib(h),e.getFtnLib(h),e.getChipLib(h),{nConcurrent:3,init_:function(i){
var j=this;
j.oCfgs={};
h.init_.call(j,i);
j._initActivex();
j._initContainer(j.oCfg);
},initConfg:function(i){
var k=this,j;
if(!i)
{
i={};
}
if(!i.sId)
{
i.sId='ftn_id'+Math.random();
}
h.initConfg.call(k,i);
j=k.oCfg;
if(j&&j.sId)
{
k.oCfgs[j.sId]=a.extend(k.oCfgs[j.sId]||{},j);
}
},callBack:function(j,i){
var m=this,l=i[0],k;
if(j=='onselect')
{
l=l&&l[0];
}
if(l&&l.get&&l.get('sFtnCfgId')&&(k=m.oCfgs[l.get('sFtnCfgId')]))
{
if(k[j])
{
k[j].apply(m,i);
}
}
else{
h.callBack.apply(m,arguments);
}
},uploadToFtn:function(i){
var j=this;
if(i._fResume)
{
if(!j.prepareUpload_(i))
{
return false;
}
i._fResume();
i._fResume=null;
return true;
}
return j.uploadInChip(i.set('bFtnFile',true));
},doChipFileSign_:function(i){
var l=this,k=l._moActivex,j=k.FileSign(i.get("sLocalPath"),i.get("sId"));
i.set({nLocalID:j});
},doChipUpload_:function(i){
var k=this,j=k._moActivex.UploadFile(i.get("sIP"),i.get("nPort"),i.get("sKey"),i.get("sSHA"),i.get("sFileId"),i.get("sLocalPath"),i.get("sId"));
i.set('nLocalID',j);
},detect:function(i){
if(i=="popup")
{
return a.detectActiveX(3,1);
}
else if(i=="drag")
{
return a.isBrowser("ie")&&a.detectActiveX(4,1)&&a.detectActiveX(3,1);
}
else if(i=="paste")
{
return a.detectActiveX(2,1)&&a.detectActiveX(4,1);
}
},_initActivex:function(){
var k=this,j=function(){
},i={"1":k._onFileSignEnd,"2":k._onFileSigning,"3":k._onUploadFileEnd,"4":k._onUploadFileing,"6":k._onGetResumeInfoEnd};
if(k._moActivex)
{
return;
}
k._moActivex=a.createActiveX(3);
k._moActivex.RetryTime=20;
k._moActivex.TimeOut=90*1000;
k._moActivex.BlockSize=128*1024;
k._moActivex.BreakSize=64*1024;
k._moActivex.MaxConcurrentUploadNum=k.nConcurrent;
k._moActivex.OnEvent=function(l){
var n=k._moActivex.UserDatabyLocalID(l.LocalID);
if((l.ErrorCode&&l.ErrorCode!="0")||(l.Step&&l.Step!="0"))
{
debug(["ax onevent error:",l.ErrorCode,l.Step]);
var m=k.getFile(n);
if(m.get("sUploadStep")=="posting")
{
m.set("sUploadStep","paused");
}
k.onerror(m.set("sError",k.err("internal",l.ErrorCode,l.Step,k._moActivex.Version,m.get("sFileId")||"",m.get("sSHA")||"",m.get("sIP")||"")));
k.ossLog(m);
}
else if(l.FileSize<0&&typeof l.FileSizeH=="undefined")
{
var m=k.getFile(n);
if(m)
{
k.onerror(m.set("sError",k.err(a.T("\u60A8\u4E0A\u4F20\u7684\u6587\u4EF6\u8D85\u8FC72G\uFF0C\u8BF7<a href='/cgi-bin/readtemplate?t=browser_addon&check=false&returnsid=$sid$' target='_blank'>\u5347\u7EA7\u63A7\u4EF6</a> ").replace({sid:a.getSid()}))));
}
else{
debug("can`t find:"+n);
}
}
else{
if(k.getFile(n))
{
(i[l.EventType]||j).call(k,l,n);
}
else{
debug("can`t find:"+n);
}
}
};
a.addEvent(window,'unload',function(){
k._releaseAllLocalID();
});
},_releaseAllLocalID:function(){
var m=this,l=m.getFile();
if(m._moActivex)
{
for(var n in l)
{
var k=l[n],j;
if(j=k.get("nLocalID"))
{
m._moActivex.ReleaseLocal(j);
}
}
}
},_onUploadFileEnd:function(i,j){
var l=this,k=l.getFile(j);
l.onChipUploadEnd_(k);
l.oncomplete(k);
l._moActivex.ReleaseLocal(i.LocalID);
k.set("nLocalID",0);
},_setOpt:function(i,j){
var k=this;
if(!i.pause)
{
i.fCancel=function(){
k._moActivex.StopUpload(j);
k._moActivex.ReleaseLocal(j);
i.set("nLocalID",0);
};
i.pause=function(){
if(i.get("sUploadStep")=="posting")
{
k._moActivex.StopUpload(j);
k.callBack("onprocess",[i.set({sStatus:"stopped",sUploadStep:"paused"})]);
k.chipUpdateFileSize_(i,-1);
k.ossLog(i);
}
};
i.resumeLocal=function(){
i._fResume=function(){
if(i.get("sUploadStep")=="paused")
{
k.callBack("onprocess",[i.set({sStatus:"uploading",sUploadStep:"posting",nStartTime:new Date().valueOf(),nRealPostTime:0,nRealPostSize:0})]);
setTimeout(function(){
k._moActivex.ResumeFileLocal(j);
},500);
}
};
i.uploadToFtn();
};
}
},_onUploadFileing:function(i,j){
var q=this,p=q.getFile(j);
q._setOpt(p,i.LocalID);
var o=p.get("nUploadedSize")||0,m=p.get("nRealPostSize")||0,n=p.get("nRealPostTime")||0,l=i.FileSize>0?i.Processed:(i.ProcessedH*4294967296+(i.Processed>>>0)),k=i.FileSize>0?i.FileSize:(i.FileSizeH*4294967296+(i.FileSize>>>0));
_nTmpSizeDiff=l-o;
if(_nTmpSizeDiff>0)
{
if(_nTmpSizeDiff<128*1024+1)
{
m+=_nTmpSizeDiff;
n+=(new Date().valueOf()-p.get("nStartTime"));
p.set({nRealPostTime:n,nRealPostSize:m});
}
p.set("nStartTime",new Date().valueOf());
}
q.onprocess(p.set({nUploadPercent:l/k*100,nUploadedSize:l}));
},calcSpeed:function(j,i){
var n=this,k=new Date().valueOf();
if(!j.get("nSize"))
{
return;
}
if(!j._nLastProcssTime)
{
j._nLastProcssTime=k;
return;
}
else if(k-j._nLastProcssTime>(i||1000))
{
var m=j.get("nRealPostSize")/j.get("nRealPostTime"),l=(j.get("nSize")-j.get("nUploadedSize"))/m;
if(m>0)
{
j.set({nSpeed:(m/1024*1000).toFixed(2),nRemainTime:(l/1000).toFixed(2)});
}
j._nLastProcssTime=k;
}
},_onFileSignEnd:function(i,j){
var l=this,k=l.getFile(j);
l.onChipFileSignEnd_(k,{sMD5:i.Md5,sSHA:i.SHA,sSHA3:i.SHA3});
l._moActivex.ReleaseLocal(i.LocalID);
k.set("nLocalID",0);
},_onFileSigning:function(i,j){
var o=this,m=(i.FileSize>0)?i.Processed:(i.ProcessedH*4294967296+(i.Processed>>>0)),k=(i.FileSize>0)?i.FileSize:(i.FileSizeH*4294967296+(i.FileSize>>>0)),l=m/k*100,n=o.getFile(j);
n.fCancel=function(){
o._moActivex.ReleaseLocal(i.LocalID);
n.set("nLocalID",0);
};
o.onChipFileSigning_(n,l);
},_initContainer:function(i){
var k=this,j=i.oContainer,l=i.sId,m=i.sType||"popup";
if(m=="popup")
{
if(i.oContainer&&i.bBindEvent!==false)
{
a.addEvent(i.oContainer,"click",function(){
k.callBack('onbeforepopupselect',[]);
k.doSelectFile(l);
});
}
}
else if(m=="drag")
{
j.innerHTML=b();
setTimeout(function(){
var n=k._moActivexDom=j.firstChild;
a.extend(n,{text:f,backColor:0xffffff,textColor:0x000000,textFacName:"\u5B8B\u4F53",textFontSize:10,textFontWeight:500,OnFilesDroped:function(o){
k._onFilesDroped(o,l);
}});
},200);
}
else if(m=="paste")
{
}
},_onFilesDroped:function(j,k){
var o=this,l=o._moActivexDom;
switch(j)
{case "ENTER":
l.text=g;
break;
case "LEAVE":
l.text=f;
break;
case "OVER":
break;
default:
if(j)
{
var m=(j||"").split("\r\n");
if(m.length===0)
{
return false;
}
else{
var n=[];
for(var p in m)
{
n.push(m[p].replace(/^(.*?)\s/ig,""));
}
o.selectFiles(n,k);
}
}
break;
}
},_getFileSize:function(j){
var m=["getFileSizeString","GetFileSize","getFileSize"],l=this._moActivex,k=0;
for(var o in m)
{
try{
k=+l[m[o]](j);
}
catch(n)
{
debug(n,2);
}
if(k)
{
return k;
}
}
return k;
},doSelectFile:function(i){
var l=this,k=l._moActivex,j=function(n){
var o=(n||"").split("\r\n");
if(o.length===0)
{
return false;
}
else{
l.selectFiles(o,i);
}
};
if(!a.isBrowser("safari")&&k.SelectFilesAsync)
{
k.SelectFilesAsync(window,j);
}
else{
try{
k.focus();
}
catch(m)
{
}
j(k.SelectFiles(window));
}
},selectFiles:function(j,k){
var p=this,q,n,m,r,o=[];
for(var s=0,l=j.length;s<l;s++)
{
r=j[s];
if(r)
{
q=r.split(/(\\|\/)/g).pop();
m=p._getFileSize(r);
n=p.addFile({sLocalPath:r,sName:q,nSize:m,sFtnCfgId:k});
o.push(n);
}
}
o.length&&p.onselect(o);
},resume:function(i){
var k=this,j=k.addFile(i);
j._fResume=function(){
k._getResumeServerInfo(this);
};
j.uploadToFtn();
return j;
},_getResumeServerInfo:function(i){
var j=this;
i.set({sStatus:"uploading",sUploadStep:"creating",nUploadPercent:i.get('nUploadedSize')/i.get('nSize'),bFtnFile:true});
a.QMAjax.send(a.T("/cgi-bin/ftnGetTmpFileInfo?sid=$sid$&filekey=$filekey$&ef=js&t=ftnCreatefile&s=ftnResume").replace({sid:a.getSid(),filekey:i.get("sFileId")}),{method:"GET",headers:{"If-Modified-Since":"0","Cache-Control":"no-cache, max-age=0"},onload:function(k,l){
var m=a.evalValue(l||"{}");
if(k&&m.errcode=="0")
{
i.set(m.data);
j._resumeServer(i);
}
else{
j.onerror(i.set({nPercent:0,sStatus:"error",sError:(_oRet&&_oRet.errcode)?j.err("cgi",_oRet.errcode):j.err("http",_aoXhr.status)}));
}
}});
},_resumeServer:function(i){
var k=this,j=k._moActivex.ResumeFile(i.get("sIP"),parseInt(i.get("nPort")),i.get("sKey"),i.get("sSHA"),i.get("sFileId"),i.get("sLocalPath"),i.get("nUploadedSize"),i.get("sId"));
k.callBack("onprocess",[i.set({nLocalID:j,nStartTime:new Date().valueOf(),nRealPostTime:0,nRealPostSize:0,nUpTime:new Date().valueOf()})]);
}});
},"Base");
})(QMFileAdaptor);
(function(a){
var b=QMFileUpload,c=getTop();
b.createCom("PPFtn",function(d){
return a.extend(b.getMailLib(d),b.getFtnLib(d),b.getChipLib(d),{nConcurrent:3,init_:function(e){
var f=this;
f.oCfgs={};
d.init_.call(f,e);
f._initActivex();
delete getTop().ppContainer;
},initConfg:function(e){
var g=this,f;
if(!e)
{
e={};
}
if(!e.sId)
{
e.sId='ppftn_id'+Math.random();
}
d.initConfg.call(g,e);
f=g.oCfg;
if(f&&f.sId)
{
g.oCfgs[f.sId]=a.extend(g.oCfgs[f.sId]||{},f);
}
},_initActivex:function(){
var e=this;
e._moActivex=a.createActiveX(5);
window.setTimeout(function(){
e._moActivex.readyState=1;
e._moActivex.dispatchEvent(new CustomEvent('loadstart'));
e._moActivex.readyState=4;
e._moActivex.dispatchEvent(new CustomEvent('load'));
e._moActivex.dispatchEvent(new CustomEvent('loadend'));
},100);
a.addEvent(e._getWin(e.oCfg.oContainer),'unload',function(){
e._releaseAllResource();
});
e._oEventsMap={"evtLog":e._logToDebug,"evtPluginDidInit":e._doCheckInit,"evtPostFileInfo":e._doSelectFile,"evtScanFilePrgs":e._doFileSign,"evtPostFileData":e._doUploadFileing,"evtPostFileDataPostResult":e._doUploadFileEnd};
e.oCfg.oContainer.parentNode.addEventListener('message',function(f){
e._fHandleMsg(f);
},true);
e.oCfg.oContainer.parentNode.addEventListener('crash',function(f){
c.LogKV("ppftn|init|crash");
},true);
e.oCfg.oContainer.parentNode.addEventListener('error',function(f){
c.LogKV("ppftn|init|error");
},true);
},_getWin:function(h){
try{
var f=h.ownerDocument;
return f.defaultView||f.parentWindow;
}
catch(g)
{
return window;
}
},_releaseAllResource:function(){
var g=this,f=g.getFile();
if(g._moActivex)
{
for(var h in f)
{
var e=f[h];
g._releaseResource(e.get("nTaskId"),e.get("sFileRes"));
}
}
},detect:function(e){
return a.detectActiveX(5,1);
},_fHandleMsg:function(h){
var f=this,e=h.data,g=e.evt;
if(e.dict)
f._syncFile(e.dict);
if(!(f._oEventsMap[g]))
{
f.onerror(f.getFile(e.dict.file_res).set("sError",f.err("internal","unhandled evt: "+g)));
return;
}
f._oEventsMap[g].apply(f,[e,f.oCfg.sId]);
},_syncFile:function(e){
var g=this,f=g.getFile(e.file_res),h=g._convert(e);
if(f)
{
f.set(h);
}
else{
g.addFile(h);
}
},_convert:function(e){
var h=getTop(),g=this,f={},i;
for(key in e)
{
i=g._oDictMapping[key];
if(key==="file_size")
{
e[key]=parseInt(e[key]);
}
else if(key==="file_data")
{
f[i]=e[key].byteLength;
continue;
}
if(h.isArr(i))
{
for(iKey in i)
{
f[i[iKey]]=e[key];
}
}
else{
f[i]=e[key];
}
}
return f;
},_oDictMapping:{"file_name":["sLocalPath","sName"],"file_size":"nSize","file_res":["sFileRes","sId"],"task_id":"nTaskId","request_url":"sUrl","file_data":"nTempSize","prgs":"nTmpPercent","processed_file_size":"nTempUploadSize","md5":"sMD5","sha":"sSHA","sha3":"sSHA3"},_logToDebug:function(e){
debug(JSON.stringify(e));
},_doCheckInit:function(){
},_doSelectFile:function(e,f){
var h=this,g=h.getFile(e.dict.file_res);
g.set("bIsHideRetryToShowResume",false);
if(!h.oCfg.oResumeFile)
{
g.set("oUploader",h);
g.set({"sFtnCfgId":f});
h.onselect([g]);
}
else{
delete h.oCfg.oResumeFile.sFileRes;
delete h.oCfg.oResumeFile.sId;
h.oCfg.oResumeModel.oFile=g.set(h.oCfg.oResumeFile);
g.set("oUploader",h);
h.oCfg.oResumeModel.set(h.oCfg.oResumeModel.oFile.get());
g.uploadToFtn();
}
},uploadToFtn:function(e){
var f=this;
if(e._fResume)
{
if(!f.prepareUpload_(e))
{
return false;
}
e._fResume();
e._fResume=null;
return true;
}
return f.uploadInChip(e.set('bFtnFile',true));
},doChipFileSign_:function(e){
var g=this,f=g._moActivex;
f.postMessage({"cmd":"cmdScanFile","file_res":e.get("sFileRes")});
e.set({nLocalID:e.get("sFileRes")});
},_doFileSign:function(e){
var g=this,h=e.result,f=g.getFile(e.dict.file_res);
if(h==0)
{
this._onFileSignEnd(f);
}
else if(h==1)
{
this._onFileSigning(f);
}
else if(h==2)
{
g.onerror(f.set("sError",g.err("internal","failed to scan file : read failed ; file is "+f.get("sName"))));
}
},_onFileSigning:function(e){
var h=this,g=e,i=g.get("sFileRes"),f=g.get("nTmpPercent");
g.fCancel=function(){
h._stopUploadTask(g.get("nTaskId"));
h._releaseFileRes(i);
g.set("nLocalID",0);
};
g.set({"nScanPercent":f});
h.onChipFileSigning_(g,f);
},_onFileSignEnd:function(e){
var g=this,f=e;
if(!g.oCfg.oResumeFile)
{
g.onChipFileSignEnd_(f,{});
}
else if(e.get("sSHA")===g.oCfg.oResumeFile.sSHA)
{
g._getResumeServerInfo(f);
}
else{
g._releaseAllResource();
g.onerror(e.set({sError:"\u4E0D\u662F\u540C\u4E00\u4E2A\u6587\u4EF6\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9",bIsHideRetryToShowResume:true}));
e.set(a.extend({},g.oCfg.oResumeFile,{bIsHideRetryToShowResume:true}));
g.rmFile(e);
console.log("warning: \u4E0D\u662F\u540C\u4E00\u4E2A\u6587\u4EF6...");
}
f.set("nLocalID",0);
},callBack:function(f,e){
var i=this,h=e[0],g;
if(f=='onselect')
{
h=h&&h[0];
}
if(h&&h.get&&h.get('sFtnCfgId')&&(g=i.oCfgs[h.get('sFtnCfgId')]))
{
if(g[f])
{
g[f].apply(i,e);
}
}
else{
d.callBack.apply(i,arguments);
}
},doChipUpload_:function(e){
var f=this;
f._moActivex.postMessage({"cmd":"cmdUploadFile","file_res":+e.get("sFileRes"),"svr":e.get("sIP"),"port":80,"svr_key":e.get("sKey"),"sha":e.get("sSHA")});
e.set('nLocalID',e.get("sFileRes"));
},_doUploadFileing:function(e){
var h=this,g=e.dict,f=h.getFile(g.file_res),i;
h._setOpt(f);
f.get("nUploadPercent")||f.set("nUploadPercent",0);
if(f.get("nSize")*(f.get("nTmpPercent")-f.get("nUploadPercent"))/100>f.get("nTempSize"))
{
f.set("bIsResume",true);
}
else{
f.set("bIsResume",false);
}
if(f.get("nUploadPercent")<=f.get("nTmpPercent"))
{
f.set("nUploadPercent",f.get("nTmpPercent"));
f.set("nUploadedSize",f.get("nTempUploadSize"));
}
i=h._getHttpProcesser(f).xhr;
i.ontimeout=function(){
h._doUploadFileing(e);
c.LogKV("ppftn|upload|timeout");
};
i.send(new Uint8Array(g.file_data));
},_doUploadFileEnd:function(e){
var g=this,h=e.dict.file_res,f=g.getFile(h);
if(e.result==0)
{
g.onChipUploadEnd_(f);
g.oncomplete(f);
f.set("nLocalID",0);
g._releaseResource(f.get("nTaskId"),h);
}
},_releaseResource:function(f,g){
try{
var i=this,h=i._oHttpProcesserPool[f];
delete i._oHttpProcesserPool[f];
i._releaseFileRes(g);
i._stopUploadTask(f);
}
catch(j)
{
console.log(j);
}
},_releaseFileRes:function(e){
var f=this;
f._moActivex.postMessage({"cmd":"cmdReleaseFileRes","file_res":e});
},_stopUploadTask:function(e){
var f=this;
f._moActivex.postMessage({"cmd":"cmdStopByTaskId","task_id":e});
},_oHttpProcesserPool:{},_getHttpProcesser:function(e){
var h=this,f=e.get("nTaskId"),g=h._oHttpProcesserPool[f];
if(!g)
{
g=new h.HttpProcesser(e,h);
h._oHttpProcesserPool[f]=g;
}
else{
g.xhr=h._getXhr(e.get("sUrl"),g.xhr);
}
return g;
},HttpProcesser:function(f,e){
this.id=f.get("nTaskId");
this.xhr=e._getHttpRequest(f);
},_getHttpRequest:function(e){
var f=this,g=new XMLHttpRequest();
g.onreadystatechange=function(){
if(g.readyState==4)
{
if(g.status==200)
{
if(/uploading/i.test(e.get("sStatus")))
{
f._renderProcess(e);
f._doUploadFileContinue(e,g.response);
}
}
else if(g.status==0)
{
}
else{
f.onerror(e.set("sError",f.err("internal",f._moActivex.Version,e.get("sFileId")||"",e.get("sSHA")||"",e.get("sIP")||"")));
}
}
};
return f._getXhr(e.get("sUrl"),g);
},_renderProcess:function(e){
var k=this,f=e.get("nRealPostSize")||0,g=e.get("nRealPostTime")||0,h=e.get("nTempSize")||0,j=e.get("nUploadedSize")||0,i=0;
if(h>0)
{
if(h)
{
f+=h;
g+=(new Date().valueOf()-e.get("nStartTime"));
e.set({nRealPostTime:g,nRealPostSize:f});
}
e.set("nStartTime",new Date().valueOf());
}
if(e.get("sUploadStep")=="paused")
{
return;
}
i=e.get("nUploadPercent");
k.onprocess(e.set({nUploadPercent:i,nUploadedSize:j}));
},_doUploadFileContinue:function(e,f){
var g=this;
g._moActivex.postMessage({"cmd":"cmdContinuePostFileData","task_id":+e.get("nTaskId"),"task_response":f});
},_getXhr:function(f,e){
e.open("POST",f,true);
e.timeout=20000;
e.responseType='arraybuffer';
e.setRequestHeader('Accept','*/*');
e.setRequestHeader('Cache-Control','no-cache');
return e;
},_setOpt:function(e){
var f=this;
if(!e.pause)
{
e.fCancel=function(){
f._releaseResource(this.get("nTaskId"),this.get("sFileRes"));
e.set("nLocalID",0);
};
e.pause=function(){
if(e.get("sUploadStep")=="posting")
{
f._stopUploadTask(this.get("nTaskId"));
f.callBack("onprocess",[e.set({sStatus:"stopped",sUploadStep:"paused"})]);
delete f._oHttpProcesserPool[e.get("nTaskId")];
f.chipUpdateFileSize_(e,-1);
f.ossLog(e);
}
};
e.resumeLocal=function(){
e._fResume=function(){
if(e.get("sUploadStep")=="paused")
{
f.callBack("onprocess",[e.set({sStatus:"uploading",sUploadStep:"posting",nStartTime:new Date().valueOf()})]);
setTimeout(function(){
f.doChipUpload_(e);
},500);
}
};
e.uploadToFtn();
};
}
},calcSpeed:function(f,e){
var j=this,g=new Date().valueOf();
if(!f.get("nSize"))
{
return;
}
if(!f._nLastProcssTime)
{
f._nLastProcssTime=g;
return;
}
else if(g-f._nLastProcssTime>(e||1000))
{
var i=f.get("nRealPostSize")/f.get("nRealPostTime"),h=(f.get("nSize")-f.get("nUploadedSize"))/i;
if(i>0)
{
f.set({nSpeed:(i/1024*1000).toFixed(2),nRemainTime:(h/1000).toFixed(2)});
}
f._nLastProcssTime=g;
}
},resume:function(e){
var g=this,f=g.addFile(e);
f._fResume=function(){
g._getResumeServerInfo(this);
};
f.uploadToFtn();
return f;
},_getResumeServerInfo:function(e){
var f=this;
e.set({sStatus:"uploading",sUploadStep:"creating",nUploadPercent:e.get('nUploadedSize')/e.get('nSize'),bFtnFile:true});
a.QMAjax.send(a.T("/cgi-bin/ftnGetTmpFileInfo?sid=$sid$&filekey=$filekey$&ef=js&t=ftnCreatefile&s=ftnResume").replace({sid:a.getSid(),filekey:e.get("sFileId")}),{method:"GET",headers:{"If-Modified-Since":"0","Cache-Control":"no-cache, max-age=0"},onload:function(g,h){
var i=a.evalValue(h||"{}");
if(g&&i.errcode=="0")
{
e.set(i.data);
e.set("oUploader",f);
f.onChipUpload_(e);
}
else{
f.onerror(e.set({nPercent:0,sStatus:"error",sError:(_oRet&&_oRet.errcode)?f.err("cgi",_oRet.errcode):f.err("http",_aoXhr.status)}));
}
}});
}});
},"Base");
})(QMFileAdaptor);
