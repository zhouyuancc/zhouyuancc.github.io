var QMComAdaptar=(function(a){
var d={"eml":"eml","pdf":"pdf","txt":"txt,h,m,js,java,c,cpp,plist,ini,stp,csv,xml","html":"html,htm,xhtml,mht","rar":"zip,7z,rar,bz2,gz,tar,tbz,tgz,cab,gzip,bzip2,deb","mov":"mp3,m4a,wma,wav,aac,ac3,mp2,ape,flac,f4a,mkv,rmvb,wmv,mp4,f4v,flv,avi,mov,qt,m4v,asf,rm,mpeg,mpg,vob,ts,3gp,3gpp,3gp2,ogg,ogv,mp4,webm,f4m,avi","jpg":"jpg,png,bmp,gif,jpeg,tiff","fl":"fla,swf","psd":"psd","exl":"xls,xlsx","ppt":"ppt,pptx","doc":"doc,docx,rtf,dot,docm","blank":""};
d=(function(e){
var f={};
for(var g in e)
{
for(var m=e[g].split(","),h=0,k=m.length;h<k;h++)
{
f[m[h]]=g;
}
}
return f;
})(d);
var c;
function b(e)
{
var g=getTop(),h=e.sInsName,f=e.oCallbacks||{};
if(!g[h])
{
g.loadJsFileToTop(["$js_path$qmplayer/player289cd9.js"]);
}
g.waitFor(function(){
return !!g[h];
},function(i){
if(i)
{
f.fSucc&&f.fSucc(g[h]);
}
else{
f.fErr&&f.fErr();
}
});
}
;return {isBrowser:function(e){
return {ie:gbIsIE}[e];
},browserVer:function(){
return gnIEVer;
},S:S,CN:CN,SN:SN,C:function(e){
return document.createElement(e);
},$:function(f,e){
return (e||document).getElementsByTagName(f);
},attr:attr,insertHTML:insertHTML,getScaleCon:Scale.getContainer,evalCss:evalCss,bodyScroll:bodyScroll,contain:isObjContainTarget,show:show,isShow:isShow,posShow:function(e,f,g){
if(e)
{
e.style.left=typeof f!="string"?(f||0)+"px":f;
e.style.top=typeof g!="string"?(g||0)+"px":g;
e.style.display="block";
e.style.visibility="visible";
}
},posHide:function(e){
e&&(e.style.left=e.style.top="-99999px")&&(e.style.visibility="hidden");
},isPosShow:function(e){
return this.isShow(e)&&e.style.left!="-99999px";
},getStyle:getStyle,hasClass:hasClass,addClass:addClass,setClass:setClass,rmClass:rmClass,addEvent:addEvent,delEvent:removeEvent,target:getEventTarget,relatedTarget:function(e){
return e.toElement||e.relatedTarget;
},stopPropagation:stopPropagation,preventDef:preventDefault,get:function(e,f){
if(typeof f=="function")
{
QMAjax.send(e,{method:"GET",onload:f});
}
else{
QMAjax.send(e,{method:"GET",timeout:f.nTimeout,onload:f.oncomplete},f.bGlobal&&(c||(c=new QMAjax())));
}
},T:T,TE:TE,E:E,callBack:callBack,extend:extend,cookQueryString:cookQueryString,htmlEncode:htmlEncode,parseJson:function(f){
var g;
try{
g=evalValue(f);
}
catch(h)
{
alert([f,h.message]);
}
return g;
},funcProxy:function(f,e){
return function(){
e.apply(f,arguments);
};
},getPlayer:function(e,f){
b({sInsName:"QMPlayer",oCallbacks:{fSucc:e,fErr:f}});
},generateIconUrl:function(e){
return getIconByFileType(e);
},ossLog:ossLog,calcPos:calcPos,finds:finds,twoDCodeImgUrl:twoDCodeImgUrl};
})();
(function(a,c){
var d=window.QMPreviewerTmpl||(window.QMPreviewerTmpl={});
d.config={oUseHotKeys:{27:1,8:1,37:1,38:1,39:1,40:1}};
d.frame=a.TE(['<div id="preview_div_container" class="preview_wrapper" style="">','<div id="$sId$" orgcls="$sClass$" class="$sClass$" style="position:absolute;width:100%;height:100%;top:0;left:0;overflow:hidden;">','<a id="$sId$_focus" href="javascript:;"></a>','<iframe id="$sId$_downframe" style="display:none;"></iframe>','<div id="$sId$_scorllarea" class="scroll_area"></div>','</div>','</div>']);
d.loading=a.T(['<div id="$sId$_loading" class="tip_loading"></div>','<div id="$sId$_msg" class="tip_msg"></div>']);
d.operator=a.T(['<div id="$sId$_minibar" class="minibar_area">','<div class="minibar unselect">','<a id="$sId$_minimize" orgcls="ico minimize" opt="minimize" title="\u6700\u5C0F\u5316"></a>','<span class="breakline"></span>','<a id="$sId$_close" orgcls="ico close" opt="close"></a>','</div>','</div>','<div id="$sId$_navbar" class="navigatebar unselect" opt="back">','<div id="$sId$_nav" orgcls="pv_navtxt"></div><i></i>','</div>','<div id="$sId$_mainbar" class="mainbar unselect" hide="auto">','<div class="mainbar_line">','<p class="mainbar_filename" id="$sId$_titletxt"></p>','</div>','<div class="breakline breakline_horizontal"></div>','<div class="mainbar_line mainbar_line_btns">','<a id="$sId$_prev" orgcls="pv_btn pv_btn_first" opt="prev">','<span class="ico prev"></span>','</a> ','<a id="$sId$_next" orgcls="pv_btn" opt="next">','<span class="ico next"></span>','</a> ','<span id="$sId$_breakline" orgcls="breakline"></span>','<a id="$sId$_info" orgcls="pv_btn" opt="info">','<span class="ico info"></span>','</a> ','<a id="$sId$_list" orgcls="pv_btn" opt="list">','<span class="ico list"></span>','</a> ','<a id="$sId$_send" orgcls="pv_btn" opt="send">','<span class="ico send"></span>','</a> ','<a id="$sId$_down" orgcls="pv_btn" opt="down">','<span class="ico down"></span>','</a> ','<span id="$sId$_breakline" orgcls="breakline" class="breakline"></span>','<a id="$sId$_scan" orgcls="pv_btn" opt="scan">','<span class="ico qrcode"></span>','</a> ','<a id="$sId$_zoombtn" class="pv_btn ico_pf_zoomb" orgcls="pv_btn ico_pf_zoomb" opt="zoom" zb_ttl="\u6700\u5927\u5C3A\u5BF8" zs_ttl="\u9002\u5E94\u7A97\u53E3" zs_cls="ico_pf_zooms">','<span class="ico"></span>','</a>','<a id="$sId$_rotate" class="pv_btn ico_pf_right pv_btn_last" orgcls="pv_btn ico_pf_right pv_btn_last" opt="rotate_r">','<span class="ico"></span>','</a>','</div>','</div>']);
d.compressframe=a.T(['<div class="cps_nav unselect" opt="cps_back">','<div id="$sId$_navtxt" class="cps_navtxt"></div><i></i>','</div>','<div class="cps_ctt">','<div id="$sId$_title" class="cps_title"></div>','<div id="$sId$_ctt" class="cps_list"></div>','</div>']);
d.compresscontent=a.TE(['<ul>','$@$if(!$oContent$)$@$','<div id="$sId$_doc_err" class="previewfailed">','<span class="icon_failed"></span>','<div id="$sId$_doc_err_default" style="margin:0 0 0 42px; line-height:18px;">','\u9644\u4EF6\u9884\u89C8\u65F6\u53D1\u751F\u9519\u8BEF\uFF0C\u8BF7 <a href="javascript:;" style="color:#000; text-decoration:underline;" opt="retry">\u91CD\u8BD5</a> ','\u6216\u76F4\u63A5 <a style="color:#000; text-decoration:underline;" href="$sDown$" opt="down">\u4E0B\u8F7D</a> \u67E5\u770B\u3002','</div>','</div>','$@$else if($oContent$ == "encryption" || $oContent$ == "pwderror")$@$','<li style="list-style:none;">','<div style="position:absolute;top:50%;left:50%;width: 288px;margin:-100px 0 0 -187px;white-space: nowrap;border: 1px solid #dadada;padding: 34px 42px;border-radius: 4px;box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);font-size: 14px;background: #fafafa;">','<div>\u8BE5\u6587\u4EF6\u5DF2\u52A0\u5BC6\uFF0C\u8BF7\u8F93\u5165\u5BC6\u7801\u540E\u9884\u89C8\uFF1A</div>','<div style="margin-top: 16px;"><input id="$sId$_pwd" type="password" autofocus="autofocus" style="height:22px;vertical-align:middle;margin-right:6px;width:228px;" class="txt" ><a class="btn_gray" opt="cps_pwd">\u786E\u5B9A</a></div>','<div id="$sId$_pwd_tip" style="display:none;font-size:12px;margin-top:5px;color:#C00;">\u8BF7\u8F93\u5165\u5BC6\u7801</div>','$@$if($oContent$ == "pwderror")$@$','<div id="$sId$_pwd_err" style="font-size:12px;margin-top:5px;color:#C00;">\u8F93\u5165\u5BC6\u7801\u6709\u8BEF</div>','$@$endif$@$','</div>','</li>','$@$else$@$','$@$for($oContent$)$@$','<li class="cps_column" opt="cps_read" idx="$_idx_$">','$@$eval (_sSuffix_=$sName$.split(".").pop()) && ""$@$','$@$if($sType$=="dir")$@$','<div class="ico_file_dir"></div>','$@$else if($sType$=="img"&&$sThumb$)$@$','<div class="cps_img">','<table cellspacing="0"><tbody><tr><td>','<img style="display:none" name="preview_unloaded_img" tmpsrc="$sThumb$" ','onload="this.style.display=\x27\x27;" ','onerror="this.parentNode.className=\x27ico_file_img\x27;"/>','</td></tr></tbody></table>','</div>','$@$else if($sType$=="img")$@$','<div class="ico_file_img"></div>','$@$else if($sType$=="music")$@$','<div class="ico_file_audio"></div>','$@$else if($sType$=="video")$@$','<div class="ico_file_video"></div>','$@$else if(_sSuffix_=="html"||_sSuffix_=="htm"||_sSuffix_=="xhtml"||_sSuffix_=="mht")$@$','<div class="ico_file_html"></div>','$@$else if(_sSuffix_=="doc"||_sSuffix_=="docx"||_sSuffix_=="docm"||_sSuffix_=="dot"||_sSuffix_=="dotx"||_sSuffix_=="dotm"||_sSuffix_=="rtf"||_sSuffix_=="wps"||_sSuffix_=="wpt")$@$','<div class="ico_file_doc"></div>','$@$else if(_sSuffix_=="xls"||_sSuffix_=="xlsx"||_sSuffix_=="et"||_sSuffix_=="ett")$@$','<div class="ico_file_xls"></div>','$@$else if(_sSuffix_=="ppt"||_sSuffix_=="pptx"||_sSuffix_=="dps"||_sSuffix_=="dpt")$@$','<div class="ico_file_ppt"></div>','$@$else if(_sSuffix_=="pdf")$@$','<div class="ico_file_pdf"></div>','$@$else if(_sSuffix_=="txt")$@$','<div class="ico_file_txt"></div>','$@$else if(_sSuffix_=="eml")$@$','<div class="ico_file_eml"></div>','$@$else if(_sSuffix_=="psd")$@$','<div class="ico_file_psd"></div>','$@$else if(_sSuffix_=="fla")$@$','<div class="ico_file_fla"></div>','$@$else if($sType$=="doc")$@$','<div class="ico_file_txt"></div>','$@$else if($sType$=="compress")$@$','<div class="ico_file_compress"></div>','$@$else$@$','<div class="ico_file_other"></div>','$@$endif$@$','<div class="cps_detail">$@$eval $_root_.oJs$.htmlEncode($sName$)$@$</div>','<div class="cps_size">$oInfo.sSize$</div>','</li>','$@$endfor$@$','$@$endif$@$','</ul>','<div style="clear:both"></div>']);
d.doc=a.TE(['<div id="$sId$_doc_container" class="doc_iframe" f="$oFileInfo.bIsNav$">','$@$if(!$oFileInfo.bIsNav$ && !$oFileInfo.bIsBook$)$@$','<div id="$sId$_doc_title" class="$@$if($oFileInfo.sSuffix$=="eml")$@$eml_title$@$else$@$doc_title$@$endif$@$" style="zoom:1;$@$if(!$oFileInfo.sName$)$@$dipslay:none;$@$endif$@$">','<div>$@$html($oFileInfo.sName$)$@$</div>','</div>','$@$endif$@$','$@$if($oFileInfo.bIsBook$)$@$','<div id="$sId$_doc_title" style="zoom:1;boder-top:2px solid #fff;$@$if(!$oFileInfo.sName$)$@$dipslay:none;$@$endif$@$">','$@$html($oFileInfo.sName$)$@$','</div>','$@$endif$@$','<iframe id="$sId$_doc_view" frameborder="0" src="$oFileInfo.sUrl$" allowTransparency="true" ','onload="this.className=\x27 doc_finish\x27;"></iframe>','<div id="$sId$_doc_err" class="previewfailed" style="display:none">','<span class="icon_failed"></span>','<div id="$sId$_doc_err_default" style="margin:0 0 0 42px; line-height:18px;">','\u9644\u4EF6\u9884\u89C8\u65F6\u53D1\u751F\u9519\u8BEF\uFF0C\u8BF7 <a href="javascript:;" style="color:#000; text-decoration:underline;" opt="retry">\u91CD\u8BD5</a> ','\u6216\u76F4\u63A5 <a style="color:#000; text-decoration:underline;" href="$oFileInfo.sDown$" opt="down">\u4E0B\u8F7D</a> \u67E5\u770B\u3002','<iframe id="$sId$_doc_down" style="display:none"></iframe>','</div>','<div id="$sId$_doc_err_notexist" style="margin:0 0 0 42px; line-height:18px;display:none;">','\u60A8\u9884\u89C8\u7684\u6587\u4EF6\u4E0D\u5B58\u5728\u3002\u53EF\u80FD\u662F\u5DF2\u8FC7\u671F\uFF0C\u6216\u88AB\u53D1\u9001\u8005\u63D0\u524D\u5220\u9664\u3002','</div>','</div>','</div>']);
d.classifier=a.TE(['<div class="mutil unselect" id="$sId$_con" opt="close">','<ul class="mutil_select">','$@$for($oFilesMap.oMap$)$@$','<li opt="chooseMod" sel="$_idx_$" hover="mutil_hover" class="mutil_$@$eval ($_idx_$.toLowerCase())$@$">','<div class="mutil_$@$eval ($_idx_$.toLowerCase())$@$_ico"></div>','<div class="file_quantity">$@$eval ($_this_$.length)$@$</div>','</li>','$@$endfor$@$','<div style="clear:both"></div>','</ul>','</div>']);
var b=' onload="this.setAttribute(\'loaded\',1);" onerror="this.setAttribute(\'err\',1);this.style.display=\x27none\x27;"';
d.img=a.TE(['<div $@$if(!$oFileInfo.sThumb$)$@$style="background:#bbb; width:100%; height:100%;"$@$endif$@$>','<div id="$sId$_load" class="img_load">loading</div>','<div id="$sId$_fail" class="img_fail">','<p class="fail_info">$@$html($oFileInfo.sName$)$@$</p>','<div class="fail_disp"></div>','<div id="$sId$_err_notexist" style="color:#c00; margin:10px 0; display:none;">\u60A8\u9884\u89C8\u7684\u6587\u4EF6\u4E0D\u5B58\u5728\u3002<br>\u53EF\u80FD\u662F\u5DF2\u8FC7\u671F\uFF0C\u6216\u88AB\u53D1\u9001\u8005\u63D0\u524D\u5220\u9664\u3002</div>','</div>','$@$if($oFileInfo.sThumb$)$@$','<img id="$sId$_thumb" class="image" src="$oFileInfo.sThumb$"',b,'/>','$@$endif$@$','<img id="$sId$_img" class="image" src="','$@$if($oFileInfo.sUrl$)$@$','$oFileInfo.sUrl$','$@$else$@$','errurl','$@$endif$@$','" ',b,'/>','<div id="$sId$_bar" class="img_bar img_bar_hide">','</div>','</div>']);
d.musicframe=a.TE(['<div id="$sId$_music_container" class="player_con a_player $@$if($oFileList$)$@$ play_list $@$endif$@$">','<div id="$sId$_music_player" class="" style="">','</div>','<div id="$sId$_playlist"></div>','</div>']);
d.musicskin=a.TE(['<div id="playerpanel_$sId$"  class="player_panel">','<a class="btn_play" title="\u64AD\u653E" action="play" id="play_$sId$">','<span class="ico_play" action="play"></span>','</a>','<a class="btn_play" title="\u6682\u505C" action="pause" id="pause_$sId$" style="display:none">','<span class="ico_pause" action="pause"></span>','</a>','<div class="media_info">','<p class="media_name" id="playtitle_$sId$">$statemsg$</p>','<div id="progress_$sId$" class="progress" mousedown="setPos">','<div id="progressbar_$sId$" class="progress_line"></div>','<div id="loaded_$sId$" class="loaded_line" style="width:0%; "></div>','<div id="played_$sId$" class="played_line" style="width:0%; "></div>','<a id="handle_$sId$" class="handle" style="left:0%;" title="\u62D6\u52A8\u53EF\u8C03\u6574\u64AD\u653E\u8FDB\u5EA6"></a>','</div>','<p class="media_time graytext" style="display:none">','<span id="currentPositionString_$sId$">00:00</span>/<span id="durationString_$sId$">00:00</span>','</p>','<p class="media_time graytext" id="stateMsg_$sId$" style="line-height:14px; display:none;">\u6B63\u5728\u7F13\u51B2</p>','</div>','<a id="volshow_$sId$" class="btn_vol" title="\u97F3\u91CF\u63A7\u5236">','<span class="ico_vol"></span>','</a>','<div id="volctrl_$sId$" class="vol_control" style="display:none">','<a id="muted_$sId$" class="btn_vol" title="\u9759\u97F3" action="muted" actionparam="1">','<span class="ico_vol"></span>','</a>','<a id="muted2_$sId$" class="btn_vol" title="\u53D6\u6D88\u9759\u97F3" action="muted" style="display:none">','<span class="ico_vol2"></span>','</a>','<div id="volume_$sId$" class="progress" title="\u62D6\u52A8\u53EF\u8C03\u8282\u97F3\u91CF">','<div  id="volumebar_$sId$" class="progress_line"></div>','<div id="volumeset_$sId$" class="played_line" style="width:100%; "></div>','<a id="volumehandle_$sId$" class="handle" style="left:100%;" ></a>','</div>','</div>','</div>']);
d.videoframe=a.TE(['<div id="$sId$_video_container" class="player_con v_player $@$if($oFileList$)$@$ play_list $@$endif$@$" style="">','<div class="v_player_content" unselectable="on">','<div class="video">','<div style="position:relative;background-color:#000;height:100%;" id="$sId$_kernel"></div>','</div>','<div class="player_panel" id="$sId$_skin"></div>','</div>','<div id="$sId$_playlist"></div>','</div>']);
d.videoskin=a.TE(['<div id="playerpanel_$sId$" class="full_screen_mode">','<div id="progress_$sId$" class="progress" mousedown="setPos">','<div id="progressbar_$sId$" class="progress_line"></div>','<div id="loaded_$sId$" class="loaded_line" style="width:0%; "></div>','<div id="played_$sId$" class="played_line" style="width:0%; "></div>','<a id="handle_$sId$" class="handle" style="left:0%;"  title="\u62D6\u52A8\u53EF\u8C03\u6574\u64AD\u653E\u8FDB\u5EA6"></a>','</div>','<a class="btn_play" title="\u64AD\u653E" action="play" id="play_$sId$">','<span class="ico_play" action="play"></span>','</a>','<a class="btn_play" title="\u6682\u505C" action="pause" id="pause_$sId$" style="display:none">','<span class="ico_pause" action="pause"></span>','</a>','<div class="media_info">','<p class="media_name" id="playtitle_$sId$">$statemsg$</p>','<p class="media_time graytext" style="display:none">','<span id="currentPositionString_$sId$">00:00</span>/<span id="durationString_$sId$">00:00</span>','</p>','<p class="media_time graytext" id="stateMsg_$sId$" style="line-height:14px; display:none;">\u6B63\u5728\u7F13\u51B2</p>','</div>','<a class="btn_fullscreen" title="\u5207\u6362\u5168\u5C4F" id="fullscreen_$sId$">','<span class="img_bar_btn ico_pf_zoomb_black"></span>','</a>','<div id="volume_$sId$" class="v_vol_control">','<div id="volumebar_$sId$" class="v_progress_line"></div>','<div id="volumeset_$sId$" class="v_played_line" style="width:100%;"></div>','<a id="volumehandle_$sId$" class="v_handle" style="left:100%;"></a>','</div>','<div id="volctrl_$sId$" class="vol_control" style="display:;">','<a id="muted_$sId$" class="btn_vol" title="\u9759\u97F3" action="muted" actionparam="1">','<span class="ico_vol"></span>','</a>','<a id="muted2_$sId$" class="btn_vol" title="\u53D6\u6D88\u9759\u97F3" action="muted" style="display:none">','<span class="ico_vol2"></span>','</a>','</div>','</div>']);
d.other=a.TE(['<div class="other_disp"></div>','<div class="other_name">','$@$html($oFileInfo.sName$)$@$','</div>','<div class="other_desc">$oFileInfo.sFileDesc$</div>']);
d.menu=a.TE(['<div id="$sId$_ctt" class="menu_ctt"></div>','<a class="ico_close_s" opt="menu_hide"></a>','<div id="$sId$_bg" class="menu_bg"></div>','<span id="$sId$_arr" class="ico_b_arrow"></span>']);
d.menuinfo=a.TE(['<div class="menu_info">','$@$if($oInfo.sSender$)$@$','<div opt="menu_openurl">','<span class="ico_mi_mail"></span>','<span class="right">$@$eval $oJs$.htmlEncode($oInfo.sTime$)$@$</span>','<div class="bold ssender">$@$eval $oJs$.htmlEncode($oInfo.sSender$)$@$</div>','<p class="ssubject">$@$eval $oJs$.htmlEncode($oInfo.sSubject$)||"\u65E0\u4E3B\u9898"$@$</p>','</div>','$@$endif$@$','$@$if($oInfo.sSize$)$@$','<p>$oInfo.sSize$</p>','$@$endif$@$','</div>']);
d.menuscan=a.TE(['<div class="menu_info">','<img height="250" width="250" src="$src$">','<p style="margin:0;text-align:center;padding:5px 30px 5px 0;">\u626B\u63CF\u4E8C\u7EF4\u7801\uFF0C\u5728\u624B\u673A\u4E2D\u6253\u5F00\u9644\u4EF6\u3002</p>','<p style="margin:0;text-align:center;padding:5px 30px 5px 0;">\uFF08\u4E8C\u7EF4\u7801\u6709\u6548\u671F\u4E3A5\u5206\u949F\uFF09</p>','</div>']);
d.menuselector_ctt=a.TE(['<li id="$_root_.sId$_item$_idx_$" opt="menu_select" sel="$_idx_$" class="menu_list_item">','$@$if($sMinThumb$)$@$','<div class="menu_list_img">','<table cellspacing="0" cellpadding="0"><tbody><tr><td>','<img src="$sMinThumb$" onerror="this.style.display=\x27none\x27;this.parentNode.className=\x27menu_list_img ico_fail_min\x27;"/>','</td></tr></tbody></table>','</div>','$@$else$@$','<div class="menu_list_img ico_fail_min"></div>','$@$endif$@$','<div class="menu_list_txt">$@$eval $_root_.oJs$.htmlEncode($sName$)$@$</div>','</li>']);
d.menuselector=a.TE(['$@$for($oList$)$@$','$@$if(($_idx_$%$_root_.nItemPerPage$)==0)$@$','<ul id="$_root_.sId$_list$@$eval Math.floor($_idx_$/$_root_.nItemPerPage$)$@$" class="menu_list" ','$@$if($_idx_$/$_root_.nItemPerPage$>0)$@$style="display:none;"$@$endif$@$>','$@$endif$@$',d.menuselector_ctt,'$@$if(((+($_idx_$)+1)%$_root_.nItemPerPage$)==0||$_idx_$==($_root_.oList.length$-1))$@$','</ul>','$@$endif$@$','$@$endfor$@$','<div style="clear:both;"></div>','<div class="menu_multi_slide" $@$if($oPage.length$==1)$@$style="display:none;"$@$endif$@$>','<div class="menu_multi_slide_bar">','<a id="$_root_.sId$_prev" opt="menu_prev" class="ico_s_pre" title="\u4E0A\u4E00\u9875"></a>','$@$for($oPage$)$@$','<a id="$_root_.sId$_page$@$eval $_this_$-1$@$" opt="menu_page" page="$@$eval $_this_$-1$@$" class="ico_s_page" title="$_this_$"></a>','$@$endfor$@$','<a id="$_root_.sId$_next" opt="menu_next" page="$nNext$" class="ico_s_next" title="\u4E0B\u4E00\u9875"></a>','</div>','</div>']);
d.menuside=a.TE(['<div class="menu_mask" opt="menu_hide_cancel"></div>','<div id="$sId$_ctt" class="menu_ctt"></div>']);
d.menusideselector=a.TE(['<div class="menu_close">','\u9644\u4EF6($oList.length$\u4E2A)','</div>','<ul class="menu_list">','$@$for($oList$)$@$',d.menuselector_ctt,'$@$endfor$@$','</ul>']);
var e=['.ico_close,.ico_mini,.ico_pre,.ico_next,.ico_send,.ico_download,.ico_more{background:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview1e9c5d.png) no-repeat;cursor:pointer;}.ico_close{background-position:-128px -64px;width:21px;height:20px;position:absolute;top:74px;right:74px;}.ico_mini{background-position:-192px -64px;width:27px;height:21px;position:absolute;top:74px;right:110px;border-right:1px solid #000;padding-right:15px;}.ico_pre{background-position:0 0;width:50px;height:32px;display:inline-block;margin:15px 0 0 18px}.ico_next{background-position:-64px 0;width:50px;height:32px;display:inline-block;margin:15px 0 0 23px}.ico_more{background-position:-64px -64px;width:30px;height:28px;display:inline-block;margin:15px 0 0 23px}.ico_send{background-position:-128px 0;width:50px;height:28px;display:inline-block;margin:15px 0 0 23px}.ico_download{background-position:-192px 0;width:50px;height:27px;display:inline-block;margin:15px 0 0 23px}.ico_play,.ico_pause,.ico_vol,.ico_vol2,.ico_close_s,.ico_b_arrow{background:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_func2669ed.png) no-repeat;cursor:pointer;}.ico_play{background-position:-64px 0;width:27px;height:29px;display:inline-block;margin:22px 0 0 28px}.v_player .ico_play{margin:12px 0 0 18px;width:15px;height:19px;background-position:-122px -129px;}.ico_pause{background-position:0 0;width:27px;height:29px;display:inline-block;margin:22px 0 0 28px}.v_player .ico_pause{margin:12px 0 0 18px;width:15px;height:19px;background-position:-97px -129px;}.ico_vol{background-position:-128px 2px;width:28px;height:20px;display:inline-block;}.ico_close_s{background-position:-192px 0;height:28px;width:28px;position:absolute;right:-17px;top:-17px;z-index:2;}.ico_b_arrow{background-position:-240px -5px;position:absolute;left:50%;bottom:-15px;_bottom:-3px;width:32px;height:10px;margin-left:-16px;_margin-left:-45px;cursor:default;}.ico_s_pre,.ico_s_pagenow,.ico_s_page,.ico_s_next{background:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_func2669ed.png) no-repeat;display:inline-block;cursor:pointer;}.ico_s_pre{background-position:-144px -32px;width:13px;height:15px;margin-right:15px;}.ico_s_next{background-position:-160px -32px;width:13px;height:15px;margin-left:10px;}.ico_s_page{background-position:-240px -32px;width:16px;height:16px;margin-right:10px;}.ico_s_page.select{background-position:-256px -32px;}a.ico_s_pre,a.ico_s_next,a.ico_s_page{opacity:0.8;filter:alpha(opacity=80);}a.ico_s_pre:hover,a.ico_s_next:hover,a.ico_s_page:hover{opacity:1;filter:alpha(opacity=100);}a.ico_s_pre:active,a.ico_s_next:active,a.ico_s_page:active{opacity:0.6;filter:alpha(opacity=60);}.ico_vol{background-position:-128px 0;width:22px;height:16px;display:inline-block;}.ico_vol2{background-position:-128px 0;width:11px;height:16px;overflow:hidden;display:inline-block;}a.btn_play:hover .ico_play{filter:alpha(opacity=80);opacity:0.8;}a.btn_vol:hover .ico_vol{filter:alpha(opacity=80);opacity:0.8;}a.btn_vol:hover .ico_vol2{filter:alpha(opacity=80);opacity:0.8;}.ico_mi_mail{background:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_func2669ed.png) no-repeat -96px -32px;width:17px;height:11px;display:inline-block;margin:2px 0 0 -25px;position:absolute;}.img_bar_btn{background:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_func2669ed.png) no-repeat;display:inline-block;text-align:center;opacity:0.8;filter:(opacity=80);}.img_bar_btn:hover{opacity:1;filter:(opacity=100);}.full_screen .img_bar_btn{background-position:-212px -32px;width:21px;height:18px;}.ico_pf_zoomb{background-position:0 -128px;width:25px;height:20px;margin:14px 18px 0 18px;}.ico_pf_zooms{background-position:-32px -128px;width:27px;height:21px;margin:13px 17px 0 17px;}.ico_pf_zoomb_black{background-position:-192px -32px;width:19px;height:15px;margin:0;}.ico_pf_right{background-position:-64px -128px;width:22px;height:21px;margin:14px 10px 0 20px;}.icon_failed{width:31px;height:31px;background:url($images_path$newicon/prompt1e9c5d.gif) no-repeat -192px 0;float:left;}.previewer{z-index:100;}.previewer .scroll_area{position:absolute;*position:static;width:100%;_width:100%!important;height:100%;overflow:hidden;}.previewer .minibar_area{position:absolute;z-index:10;right:0;top:0;width:50px;height:50px;overflow:hidden;}.previewer .minibar{position:absolute;right:-50px;top:-50px;background-color:#393939;width:100px;height:100px;border-radius:100px;cursor:pointer;}.previewer .minibar_l{width:150px;}.previewer .minibar_l .minibar{width:150px;}.previewer .minibar .breakline{display:none;}.previewer .minibar_l .breakline{display:block;position:absolute;top:56px;height:20px;right:77px;}.previewer .mainbar{position:absolute;bottom:20px;z-index:10;height:90px;*width:480px;background-color:#7b7c7c;background-color:rgba(51,51,51,0.8);padding:0 15px;border-radius:10px;-webkit-transition:opacity 0.2s linear;-moz-transition:opacity 0.2s linear;-ms-transition:opacity 0.2s linear;text-align:center;}.previewer .mainbar_filename{margin:0;height:40px;line-height:40px;text-align:center;max-width:426px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#ffffff;font-size:16px;}.previewer .navigatebar{position:absolute;left:20px;top:20px;z-index:11;cursor:pointer;}.previewer .pv_navtxt{background:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview1e9c5d.png) no-repeat 0 -128px;width:55px;height:55px;display:block;}.previewer .pv_btn{margin:0 3px;width:56px;height:48px;line-height:48px;display:inline-block;cursor:pointer;text-align:center;font-size:0;*word-spacing:-1px;vertical-align:top;}.previewer .pv_btn span{font-size:12px;letter-spacing:normal;word-spacing:normal;}.previewer .pv_btn_first{margin-left:-7px;}.previewer .pv_btn_last{margin-right:-7px;}.previewer .mainbar a.select{background:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview1e9c5d.png) no-repeat -96px -128px;}.previewer .ico{display:inline-block;background:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview1e9c5d.png) no-repeat;cursor:pointer;vertical-align:middle;}.previewer .mainbar .mouseover{}.previewer .col{background-position:-128px -224px;width:16px;height:16px;display:inline-block;}.previewer .close{background-position:-106px -52px;width:50px;height:50px;position:absolute;top:50px;right:50px;z-index:1;}.previewer .minimize{background-position:-171px -52px;width:55px;height:50px;position:absolute;top:50px;right:95px;z-index:2;}.previewer .prev{background-position:0 0;width:29px;height:27px;*margin-top:10px;}.previewer .next{background-position:-64px 0;width:29px;height:27px;*margin-top:10px;}.previewer .list{background-position:-64px -64px;width:26px;height:24px;*margin-top:12px;}.previewer .send{background-position:-128px 0;width:28px;height:26px;*margin-top:11px;}.previewer .down{background-position:-192px 0;width:26px;height:24px;*margin-top:12px;}.previewer .qrcode{background-position:-256px -64px;width:24px;height:24px;*margin-top:12px;}.previewer .info{background-position:-256px 0;width:24px;height:24px;*margin-top:12px;}.previewer .pv_btn.ico_pf_right .ico,.previewer .pv_btn.ico_pf_zoomb .ico,.previewer .pv_btn.ico_pf_zooms .ico{background-image:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_func2669ed.png);margin:0;display:inline-block;}.ie6 .pv_btn.ico_pf_right .ico{background-image:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_func_ie62669ed.png)!important;}.ie6 .pv_btn.ico_pf_zoomb .ico{background-image:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_func_ie62669ed.png);}.ie6 .pv_btn.ico_pf_zooms .ico{background-image:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_func_ie62669ed.png);}.previewer .pv_btn.ico_pf_right .ico{background-position:-64px -128px;width:22px;height:21px;*margin:13px 0 0 0;}.previewer .pv_btn.ico_pf_zoomb .ico{background-position:0 -128px;width:25px;height:20px;*margin:14px 0 0 0;}.previewer .pv_btn.ico_pf_zooms .ico{background-position:-32px -128px;width:27px;height:21px;*margin:13px 0 0 0;}.previewer .mainbar_line{font-size:0;*word-spacing:-1px;}.previewer .breakline{display:inline-block;margin:5px 15px;width:2px;height:38px;overflow:hidden;background-color:#000;filter:alpha(opacity=20);opacity:0.2;vertical-align:top;}.previewer .breakline_horizontal{display:block;width:100%;margin:0;height:2px;background-color:#000;filter:alpha(opacity=20);opacity:0.2;}.previewer .disable{filter:alpha(opacity=100);opacity:1;cursor:default;}.previewer .disable:hover,.previewer .disable:active{filter:alpha(opacity=100);opacity:1;cursor:default;}.previewer .disable .ico{cursor:default;opacity:0.3;filter:alpha(opacity=30);}.previewer .minibar .mousedown,.previewer .mainbar .mousedown span{filter:alpha(opacity=50);opacity:0.5;}.previewer .mainbar .mouseover{filter:alpha(opacity=80);opacity:0.8;}.previewer .mainbar .select{filter:alpha(opacity=60);opacity:0.6;}.previewer .hidebtn{display:none;}.previewer .allow_mo_hide .hidebar{opacity:0;filter:alpha(opacity=0);}.previewer .layer_tip{position:absolute;z-index:10;width:120px;height:120px;margin-left:-60px;margin-top:-60px;filter:alpha(opacity=50);opacity:0.5;background:#000;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;}.previewer .tip_loading{width:48px;height:48px;background:url($images_path$../js/com/kits/qmpreviewer/img/loading1e9c5d.gif) no-repeat;margin:36px 0 0 -24px;position:relative;left:50%;}.previewer .tip_msg{text-align:center;width:100%;color:#fff;position:absolute;}.previewer .onlymsg .tip_loading{display:none;}.previewer .onlymsg .tip_msg{top:50%;margin-top:-6px;}.previewer .onlyloading .tip_msg{display:none;}.previewer .loading{height:140px;}.previewer .loading .tip_msg{bottom:20px;}.previewer .layer_img{position:absolute;border:6px solid #fff;overflow:hidden;background:#fff;z-index:1;}.previewer .layer_img_ts{-webkit-transition:all .3s linear;-moz-transition:all .3s linear;-ms-transition:all .3s linear;}.previewer .layer_img .image{position:absolute;cursor:move}.previewer .layer_img .img_load,.previewer .layer_img .img_fail,.previewer .img_show .image{position:absolute;width:100%;height:100%;cursor:move}.previewer .layer_img .img_load{width:300px;height:200px;text-align:center;line-height:30px;background:#000;color:#fff;display:none;}.previewer .layer_img .img_fail{background:#fff;width:280px;height:230px;text-align:center;color:#bababa;}.previewer .img_bar{position:absolute;z-index:9;bottom:0;background-color:#000;background:rgba(0,0,0,0.6);color:#fff;filter:alpha(opacity=60);width:100%;height:45px;overflow:hidden;-webkit-transition:height .3s linear;-moz-transition:height .3s linear;-ms-transition:height .3s linear;}.previewer .img_bar_hide{height:0px;}.previewer .img_bar_btn{cursor:pointer;float:right;}.previewer .img_bar_txt{float:left;margin:0 10px;line-height:45px;font-size:14px;font-weight:bold;}.previewer .move{cursor:move;}.previewer .zoom_percentage{position:absolute;display:inline-block;top:50%;left:50%;width:136px;height:37px;margin-left:-68px;margin-top:-18px;font-size:16px;line-height:37px;text-align:center;color:#ffffff;background-color:#000;background-color:rgba(0,0,0,0.4);_background-color:#000;user-select:none;border-radius:5px;}.previewer .fail_disp{background:url($images_path$../js/com/kits/qmpreviewer/img/load_fail1e9c5d.png) no-repeat 0 0;width:173px;height:104px;margin:20px auto 0;}.fail_info{text-align:center;color:#808080;margin-top:25px;font-size:16px;font-weight:bold;}.previewer .layer_other{position:absolute;background:#fff;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;padding:100px 20px 0;z-index:1;height:220px;*width:320px;overflow:hidden;}.previewer .other_disp{width:174px;height:96px;margin:0 auto;background:url($images_path$../js/com/kits/qmpreviewer/img/no_preview1e9c5d.png) no-repeat;}.previewer .other_name{text-align:center;margin-top:30px;line-height:20px;width:300px;word-break:break-all;word-warp:break-word;overflow:hidden;color:gray;}.previewer .other_desc{text-align:center;margin-top:10px;line-height:20px;width:300px;word-break:break-all;word-warp:break-word;overflow:hidden;color:gray;}.previewer .layer_doc{position:absolute;z-index:1;width:800px;margin:0 auto;background-color:#000;border:1px solid #666;box-shadow:0 0 15px #000;-webkit-box-shadow:0 0 15px #000;}.previewer .doc_iframe{width:100%;margin:0 auto;background-color:#fff;}.previewer .doc_iframe iframe{background:url($images_path$../js/com/kits/qmpreviewer/img/loading_bw1e9c5d.gif) no-repeat center center;width:100%;height:100%;position:absolute;}.previewer .doc_title{position:absolute;font:bold 26px lucida Grande,Verdana;width:100%;color:#ccc;}.previewer .doc_title div{border-bottom:1px solid #ccc;padding-bottom:10px;margin:10px 10px 0;word-break:break-all;word-wrap:break-word;}.previewer .eml_title{position:absolute;font:bold 26px lucida Grande,Verdana;width:100%;color:#000;}.previewer .eml_title div{border-bottom:1px solid #ccc;padding-bottom:10px;margin:10px 10px 0;word-break:break-all;word-wrap:break-word;}.previewer .doc_iframe .doc_finish{background:#fff;}.previewer .previewfailed{font-size:12px;border:4px solid #DDD;padding:15px 20px 12px;z-index:20;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;background:#F5F5F5;color:#494949;position:absolute;width:220px;height:40px;top:40%;left:50%;margin:-30px 0 0 -134px;}.previewer .player_panel{height:70px;background:#f2f2f2;z-index:1;background:-webkit-gradient(linear,left top,left bottom,color-stop(0,rgb(255,255,255)),color-stop(0.10,rgb(242,242,242)),color-stop(1,rgb(223,223,223)));background:-moz-linear-gradient(center top,rgb(255,255,255) 0%,rgb(242,242,242) 10%,rgb(223,223,223) 100%);}.v_player .player_panel{height:49px;}.previewer .player_panel .handle{position:absolute;top:-2px;margin-left:-1px;background:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_func2669ed.png) no-repeat -32px -32px;display:block;width:12px;height:12px;z-index:4;cursor:pointer;}.previewer .player_panel .v_handle{position:absolute;top:-2px;margin-left:-2px;background:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_func2669ed.png) no-repeat -144px -135px;display:block;width:6px;height:6px;z-index:4;cursor:pointer;}.btn_play{width:76px;height:69px;display:block;float:left;border-right:1px solid #d6d6d6;margin-right:30px;cursor:pointer;}.btn_play:hover{background-color:#d8d8d8;border-right:1px solid #ccc;}.v_player .btn_play{width:50px;height:42px;margin-right:10px;}.btn_vol{display:block;float:left;margin:28px 0 0 19px;cursor:pointer;height:16px;overflow:hidden;}.v_player .btn_vol{margin:13px 0 0 10px;_display:inline;}.v_player .btn_fullscreen{display:none;margin:13px 10px 0 10px;float:right;*width:19px;}.vol_control{position:absolute;right:-90px;padding:10px 22px 10px 12px;background:#eaeaea;border:1px solid #ababab;border-radius:8px;box-shadow:0 0 2px rgba(0,0,0,0.3);}.v_vol_control{float:right;width:50px;position:relative;margin:20px 10px 0 6px;}.v_progress_line,.v_played_line{position:absolute;left:0;top:0;height:2px;overflow:hidden;cursor:pointer;}.v_progress_line{;width:50px;background-color:#ccc;z-index:2;}.v_played_line{width:0%;background-color:#6d6d6d;z-index:3;}.fullscreen_mode .v_vol_control{width:60px;}.fullscreen_mode .v_progress_line{width:60px;}.media_info{float:left;width:280px;}.media_name{color:#444;text-align:center;margin:10px 10px 0;height:14px;word-break:break-all;word-wrap:break-word;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.v_player .media_name{margin:5px 0 3px 0;text-align:left;}.media_time{text-align:center;margin:0;}.v_player .media_time{text-align:left;}.fullscreen_mode .media_name{margin:14px 30px 14px 100px;text-align:center;}.fullscreen_mode .media_time{margin:-28px 0 0 0;*margin:-26px 0 0 0;}.progress{position:relative;margin:8px 0 6px 0;width:280px;height:7px;}.v_player .progress{margin:0px;width:460px;}.progress_line,.loaded_line,.played_line{position:absolute;left:0;right:0;overflow:hidden;width:280px;height:7px;cursor:pointer;}.progress_line{background-color:#d8d8d8;z-index:2;}.v_player .progress_line{width:460px;}.loaded_line{background-color:#d1d1d1;width:0%;z-index:3;}.v_player .loaded_line{width:460px;background-color:#acc74f;background:-moz-linear-gradient(top,#cddf67,#91b33a);background:-webkit-gradient(linear,0 0,0 100%,from(#cddf67),to(#91b33a));}.played_line{background-color:#acc74f;background:-moz-linear-gradient(top,#cddf67,#91b33a);background:-webkit-gradient(linear,0 0,0 100%,from(#cddf67),to(#91b33a));width:0%;z-index:4;}.v_player .played_line{width:460px;background:none;}.media_info .loaded_line{background-color:#acc74f;background:-moz-linear-gradient(top,#cddf67,#91b33a);background:-webkit-gradient(linear,0 0,0 100%,from(#cddf67),to(#91b33a));-webkit-transition:width .3s ease-in-out;-moz-transition:width .3s ease-in-out;-ms-transition:width .3s ease-in-out;-o-transition:width .3s ease-in-out;transition:width .3s ease-in-out;-webkit-transition:left .3s ease-in-out;-moz-transition:left .3s ease-in-out;-ms-transition:left .3s ease-in-out;-o-transition:left .3s ease-in-out;transition:left .3s ease-in-out;}.media_info .played_line{display:none;}.vol_control .progress{margin:3px 0 0 30px;width:80px;}.vol_control .progress_line,.vol_control .loaded_line,.vol_control .played_line{width:80px;-webkit-transition:width .2s ease-in-out;-moz-transition:width .2s ease-in-out;-ms-transition:width .2s ease-in-out;-o-transition:width .2s ease-in-out;transition:width .2s ease-in-out;}.vol_control .btn_vol{margin:0;}.play_list.a_player{height:auto;}.play_list.v_player{width:710px;height:413px;}.playlist_body{background-color:#ececec;border:solid #575757;}.playlist_body li{height:30px;overflow:hidden;}.playlist_body li a{display:block;padding:0 25px;height:30px;line-height:30px;cursor:pointer;text-decoration:none;color:#000;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}.playlist_body li a:hover{background-color:#528BCB;color:#fff;text-decoration:none;color:#fff;}.playlist_body .playing{background-color:#ddd;position:relative;}.playlist_body .playing .ico_playing{background:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_func2669ed.png) no-repeat 0 -32px;width:12px;height:14px;display:block;position:absolute;margin:10px 0 0 9px;top:0;left:0;}.v_player_content{float:left;background-color:#6a6a6a;border:1px solid #bbb;-moz-user-select:none;-webkit-user-select:none;}.play_list.a_player .player_panel{border-radius:8px 8px 0 0;border-color:#575757;border-bottom:1px solid #ababab;}.play_list.v_player .video{width:460px;border-top-right-radius:8px;}.play_list.a_player .playlist_body{border-width:0 1px 1px 1px;padding:5px 0 10px;border-radius:0 0 8px 8px;width:448px;max-height:150px;overflow-x:hidden;overflow-y:auto;}.play_list.v_player .playlist_body{border-width:0;padding:10px 0;margin-left:451px;width:210px;height:393px;overflow-x:hidden;overflow-y:auto;border-right:1px solid #ABABAB;border:1px solid #575757;border-radius:8px;box-shadow:0 2px 3px #555;}.a_player .vol_control{top:18px;}.v_player .vol_control{float:right;position:relative;right:auto;padding:0;width:30px;height:20px;margin:13px -8px 0 0;background:none;border:none;border-radius:0;box-shadow:none;}.v_player .type_FLASH .player_panel{display:none;}.v_player .type_FLASH .video{height:350px}.v_player .type_FLASH .video_loading{background:none;}.v_player .type_SWF{width:100%;}.v_player .type_SWF .player_panel{width:100%;}.v_player .type_SWF .video{width:100%;}.v_player .type_SWF.full_screen .video{height:100%;}.v_player .type_SWF .video_loading{}.v_player .type_SWF .progress{width:100%}.v_player .type_SWF .progress_line{width:100%;}.v_player .type_SWF .progress .handle,.v_player .type_SWF .vol_control,.v_player .type_SWF .v_vol_control{display:none}.previewer .layer_music{position:static!important;width:100%;height:100%;z-index:1;}.previewer .layer_music .player_con{position:absolute;}.a_player{width:450px;height:70px;margin:0 auto;top:50%;}.a_player .player_panel{width:448px;border:1px solid #ababab;box-shadow:0 2px 3px #555;box-shadow:0 2px 3px #555;}.previewer .video_content{width:100%;height:100%;top:0;z-index:1;}.v_player{width:460px;margin:0 auto;top:50%;border-radius:8px;}.v_player .player_panel{width:460px;position:relative;}.video{height:300px;width:460px;padding:0;}.full_screen_mode .btn_fullscreen{display:block;}.full_screen_mode .media_info,.full_screen_mode .media_info .progress,.full_screen_mode .media_info .progress_line,.full_screen_mode .media_info .loaded_line,.full_screen_mode .media_info .played_line{width:242px;}.v_player .full_screen_mode .vol_control{}.mute_mode .ico_vol{background-position:-128px 0;width:11px;height:16px;overflow:hidden;}.video_loading .kernel{top:- 3000px;margin:-3000px 0 0 -3000px;}.video_loading .flash_kernel{top:0;margin:0;}.video_loading{background:url($images_path$../js/com/kits/qmpreviewer/img/loading1e9c5d.gif) no-repeat 50% 50%;}.previewer .layer_cps{position:absolute;z-index:1;background:#fff;border:1px solid #666;box-shadow:0 0 15px #000;-webkit-box-shadow:0 0 15px #000;}.layer_cps .cps_ctt{overflow-y:auto;height:100%;}.layer_cps .cps_list{padding:10px 20px 70px;user-select:none;-moz-user-select:none;-o-user-select:none;-webkit-user-select:none;}.layer_cps .cps_title{padding:25px 20px 10px;border-bottom:3px solid #e7e7e7;font-weight:bold;font-size:20px;margin:0;-webkit-transition:margin 0.2s linear;-moz-transition:margin 0.2s linear;-ms-transition:margin 0.2s linear;}.layer_cps .cps_column{float:left;width:120px;height:120px;overflow:hidden;padding:15px 20px;border:3px solid #fff;list-style:none;cursor:pointer;}.layer_cps .cps_column:hover{border:3px solid #ececec;border-radius:5px;}.layer_cps .cps_img{width:114px;height:102px;margin:0 auto;overflow:hidden;}.layer_cps .cps_img table,.layer_cps .cps_img tr,.layer_cps .cps_img td{text-align:center;width:100%;height:100%;overflow:hidden;}.layer_cps .cps_detail{text-align:center;height:14px;line-height:14px;overflow:hidden;text-overflow:ellipsis;}.scale1_10 .layer_cps .cps_detail,.scale1_25 .layer_cps .cps_detail{height:16px;line-height:16px;}.layer_cps .cps_size{color:#808080;text-align:center;}.layer_cps .cps_nav{position:absolute;left:-10px;top:10px;background:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_func2669ed.png) no-repeat 0 -64px;height:39px;padding-right:8px;cursor:pointer;opacity:0;-webkit-transition:all 0.2s linear;-moz-transition:left 0.2s linear,opacity 0.2s linear;-ms-transition:left 0.2s linear,opacity 0.2s linear;visibility:hidden;}.layer_cps .cps_navtxt{font-size:20px;font-weight:normal;color:#fff;margin:5px 0 0 18px;padding:0;min-width:150px;max-width:280px;height:25px;text-align:center;overflow:hidden;text-overflow:ellipsis;}.layer_cps .cps_nav i{background:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_func2669ed.png) no-repeat top right;width:6px;height:39px;position:absolute;right:0;top:0px;}.cps_shownav .cps_nav{left:-30px;opacity:1;visibility:visible;}.cps_shownav .cps_title{margin-top:30px;}.ico_file_doc,.ico_file_xls,.ico_file_ppt,.ico_file_eml,.ico_file_compress,.ico_file_dir,.ico_file_psd,.ico_file_fla,.ico_file_pdf,.ico_file_html,.ico_file_audio,.ico_file_video,.ico_file_txt,.ico_file_other,.ico_file_img{width:114px;height:102px;margin:0 auto;background:url($images_path$xdisk/ico_file_all1e9c5d.jpg) no-repeat;}.ico_file_doc{background-position:0px 0px;}.ico_file_xls{background-position:-114px 0px;}.ico_file_ppt{background-position:-228px 0px;}.ico_file_eml{background-position:0px -102px;}.ico_file_compress{background-position:-114px -102px;}.ico_file_dir{background-position:-228px -102px;}.ico_file_psd{background-position:0px -204px;}.ico_file_fla{background-position:-114px -204px;}.ico_file_pdf{background-position:-228px -204px;}.ico_file_html{background-position:0px -306px;}.ico_file_audio{background-position:-114px -306px;}.ico_file_video{background-position:-228px -306px;}.ico_file_txt{background-position:0px -408px;}.ico_file_other{background-position:-114px -408px;}.ico_file_img{background-position:-228px -408px;}.previewer .classifier{}.mutil{position:absolute;top:50%;left:50%;width:780px;min-width:780px;height:540px;margin:-225px 0 0 -380px;z-index:1;}.mutil_select{position:relative;}.mutil_music,.mutil_video,.mutil_image,.mutil_document,.mutil_compress,.mutil_other{position:relative;float:left;width:220px;height:220px;margin:0 20px 20px 0;cursor:pointer;}.mutil_music_ico,.mutil_video_ico,.mutil_image_ico,.mutil_document_ico,.mutil_compress_ico,.mutil_other_ico{display:block;width:150px;height:160px;margin:28px 0 0 35px;}.mutil_music_ico{background:url($images_path$../js/com/kits/qmpreviewer/img/mutil_audio1e9c5d.png) no-repeat 0 0;width:160px;height:140px;margin:30px 0 0 35px;}.mutil_video_ico{background:url($images_path$../js/com/kits/qmpreviewer/img/mutil_vedio1e9c5d.png) no-repeat 0 0;width:170px;height:140px;margin:28px 0 0 24px;}.mutil_image_ico{background:url($images_path$../js/com/kits/qmpreviewer/img/mutil_pic1e9c5d.png) no-repeat 0 0;width:165px;height:140px;margin:30px 0 0 26px}.mutil_document_ico{background:url($images_path$../js/com/kits/qmpreviewer/img/mutil_doc1e9c5d.png) no-repeat 0 0;}.mutil_compress_ico{background:url($images_path$../js/com/kits/qmpreviewer/img/mutil_compress1e9c5d.png) no-repeat 0 0;}.mutil_other_ico{background:url($images_path$../js/com/kits/qmpreviewer/img/mutil_unknow1e9c5d.png) no-repeat 0 0;}.mutil_hover{background-color:#44454a;background-color:rgba(34,37,44,0.64);border-radius:8px;}.mutil_hover:active{background-color:#393c41;background-color:rgba(34,37,44,0.75);box-shadow:inset 0 0 15px #333;}.file_quantity{position:absolute;right:46px;top:38px;width:25px;height:25px;line-height:25px;background-color:#000;border:2px solid #fff;border-radius:30px;color:#fff;font-weight:bold;text-align:center;}.mutil_music .file_quantity{right:23px;}.mutil_video .file_quantity{right:23px;}.mutil_image .file_quantity{right:32px;}.mutil_tip{position:absolute;left:48px;bottom:38px;padding:3px 5px;background-color:#000;border-radius:5px;color:#fff;}.previewer .opt_menu{position:absolute;z-index:10;left:50px;top:100px;_padding:15px;_background-color:#353535;_margin-top:10px;}.opt_menu .menu_ctt{}.opt_menu .menu_bg{position:absolute;z-index:-1;top:-15px;left:-15px;padding:15px;_padding:0;width:100%;height:100%;_width:0;_height:0;background-color:#303030;border-radius:10px;opacity:0.95;filter:alpha(opacity=95);}.opt_menu .ico_b_arrow{margin-bottom:-10px;}.opt_menu .ico_close_s{top:-23px;right:-29px;}.menu_info .ssender{color:#fff;width:115px;height:14px;overflow:hidden;text-overflow:ellipsis;font-weight:bold;}.menu_info .ssubject{clear:both;margin:10px 0 0 0;max-height:28px;_height:14px;overflow:hidden;}.menu_info .ssubject a{color:#8D8D8D;text-decoration:none;}.menu_info .ssubject a:hover{text-decoration:none;}.previewer .menu_list,.menu_multi_slide{width:505px;}.menu_list_item{float:left;height:50px;width:250px;margin-bottom:5px;border-radius:8px;overflow:hidden;cursor:pointer;}.menu_list_item:hover,.menu_list_hover_ie6{background-color:#357ca8;}.menu_list_item:active{background-color:#1e3848;}.menu_list .select,.menu_list .select:hover{background-color:#1e3848;}.menu_list_img{width:32px;height:32px;margin:10px 10px 0 10px;float:left;overflow:hidden;}.menu_list_img table tr td{width:32px;height:32px;text-align:center;line-height:0;}.menu_list_img img{width:32px;}.menu_list_item .ico_fail_min{background:url($images_path$../js/com/kits/qmpreviewer/img/ico_fail_min1e9c5d.png) no-repeat 0 0;width:31px;height:31px;}.menu_list_txt{float:left;width:190px;line-height:50px;color:#fff;white-space:nowrap;}.menu_multi_slide{height:30px;}.menu_multi_slide_bar{position:absolute;bottom:5px;width:100%;text-align:center;}.menu_multi_slide a.select{opacity:1;filter:alpha(opacity=100);cursor:default;}.previewer .menu_side{position:absolute;right:-300px;top:51px;bottom:0;z-index:2;width:300px;background:#fff;overflow:hidden;overflow-y:auto;border-left:1px solid #e5e5e5;box-shadow:0 0 15px #000;-webkit-box-shadow:-4px 0 6px rgba(0,0,0,.08);-webkit-transition:all 0.5s ease;-moz-transition:all 0.5s ease;}.menu_side .menu_mask{position:absolute;width:100%;height:100%;background:#fff;opacity:0;filter:alpha(opacity=0);}.menu_side .menu_list{list-style:none;margin:0px;padding:0px;width:100%;}.menu_side .menu_list li{list-style-type:none;}.previewer .menu_info{padding:10px 10px 10px 35px;color:#8d8d8d;width:280px;}.previewer .menu_info:hover{border-radius:8px;}.ie .mainbar{background-color:#474747;opacity:0.5;}.ie .minibar{background:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview1e9c5d.png) no-repeat 0 -224px;right:0;top:0;width:50px;height:50px;}.ie .minibar_l{width:100px;}.ie .minibar_l .minibar{width:100px;}.ie .close{right:0;top:0;}.ie .minimize{right:45px;top:0;}.ie .minibar .breakline{top:5px;right:23px;}.ie6 .minibar{background-image:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_ie61e9c5d.png)}.ie6 .ico_close,.ie6 .ico_mini,.ie6 .ico_pre,.ie6 .ico_next,.ie6 .ico_send,.ie6 .ico_download,.ie6 .ico_more{background-image:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_ie61e9c5d.png)}.ie6 .ico_play,.ie6 .ico_pause,.ie6 .ico_vol,.ie6 .ico_close_s,.ie6 .ico_b_arrow{background-image:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_func_ie62669ed.png)}.ie6 .ico{background-image:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_ie61e9c5d.png);}.ie6 .ico_close_s{right:-7px;top:-11px;width:24px;height:24px;}.ie6 .ico_s_pre,.ie6 .ico_s_page,.ie6 .ico_s_next{background-image:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_func_ie62669ed.png)}.ie6 .mutil_music_ico{background-image:url($images_path$../js/com/kits/qmpreviewer/img/mutil_audio_ie61e9c5d.png)}.ie6 .mutil_video_ico{background-image:url($images_path$../js/com/kits/qmpreviewer/img/mutil_vedio_ie61e9c5d.png)}.ie6 .mutil_image_ico{background-image:url($images_path$../js/com/kits/qmpreviewer/img/mutil_pic_ie61e9c5d.png)}.ie6 .mutil_document_ico{background-image:url($images_path$../js/com/kits/qmpreviewer/img/mutil_doc_ie61e9c5d.png)}.ie6 .mutil_compress_ico{background-image:url($images_path$../js/com/kits/qmpreviewer/img/mutil_compress_ie61e9c5d.png)}.ie6 .mutil_other_ico{background-image:url($images_path$../js/com/kits/qmpreviewer/img/mutil_unknow_ie61e9c5d.png)}.ie6 .ico_mi_mail{background-image:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_func_ie62669ed.png)}.ie6 .playlist_body .playing .ico_playing{background-image:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_func_ie62669ed.png)}.ie6 .v_player .playlist_body{position:absolute;top:0;}.ie6 .menu_list_txt{width:180px;overflow:hidden;}.ie6 .a_player .playlist_body{height:150px;}.ie6 .vol_control{right:-93px;}.ie6 .v_player .vol_control{right:auto;}.ie7 .vol_control{right:-78px;}.ie7 .v_player .vol_control{right:auto;}.ie6 .progress,.ie7 .progress{zoom:1;}.ie6 .vol_control .progress,ie7 .vol_control .progress{margin-top:15px;}.ie6 .cps_nav .pv_navtxt{width:180px;}.ie6 .navigatebar .pv_navtxt{background-image:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_ie61e9c5d.png);}.ie6 .mutil_select{zoom:1;}.ie6 .player_panel .handle{background-image:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_func_ie62669ed.png);}.ie6 .player_panel .v_handle{background-image:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_func_ie62669ed.png);}.ie6 .img_bar_btn{background-image:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_func_ie62669ed.png);}.ie6 .layer_cps .cps_nav{background-image:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_func_ie62669ed.png);}.ie6 .layer_cps .cps_navtxt{width:280px;}.ie6 .doc_iframe iframe{}.ie6 .doc_title{}.ie6 .eml_title{}@-webkit-keyframes scale{0%{-webkit-transform:scale(0.9);opacity:0}51%{-webkit-transform:scale(0.9);opacity:0}100%{-webkit-transform:scale(1);opacity:1}}@-moz-keyframes scale{0%{-moz-transform:scale(0.9);opacity:0}51%{-moz-transform:scale(0.9);opacity:0}100%{-moz-transform:scale(1);opacity:1}}@-webkit-keyframes opacity_7{0%{opacity:0;}100%{opacity:0.7;}}@-moz-keyframes opacity_7{0%{opacity:0;}100%{opacity:0.7;}}@-webkit-keyframes opacity_7_0{0%{opacity:0.7;}100%{opacity:0;}}@-moz-keyframes opacity_7_0{0%{opacity:0.7;}100%{opacity:0;}}@-webkit-keyframes opacity_X{0%{visibility:hidden;}66%{height:0px;visibility:hidden;}100%{}}@-moz-keyframes opacity_X{0%{visibility:hidden;}66%{height:0px;visibility:hidden;}100%{}}.previewer .mask,.previewer .layer_mask{position:absolute;top:0;left:0;z-index:0;width:100%;height:100%;background:#000;filter:alpha(opacity=70);opacity:0.7;-webkit-animation:opacity_7 0.25s ease;-moz-animation:opacity_7 0.25s ease;}.previewer .layer_mask{z-index:1;}.viewer_animation .mainbar,.viewer_animation .minibar{overflow:hidden;-webkit-animation:opacity_X 0.75s ease;-moz-animation:opacity_X 0.75s ease;}.viewer_animation .layer_other,.viewer_animation .layer_doc,.viewer_animation .layer_cps,.viewer_animation .layer_img{-webkit-transform:scale(1);-webkit-animation:scale 0.5s ease;-moz-transform:scale(1);-moz-animation:scale 0.5s ease;}.previewer_hide .mask{opacity:0;-webkit-animation:opacity_7_0 0.25s ease;-moz-animation:opacity_7_0 0.25s ease;}.previewer .no_ts{-webkit-transition:none;-moz-transition:none;-ms-transition:none;}.video_content:-webkit-full-screen{background:#000;}.video_content:-moz-full-screen{background:#000;}.graytext{color:#A0A0A0;}.underline{text-decoration:underline;}.subscri_box{position:absolute;top:0;left:0;width:100%;}.subscri_title{padding-bottom:10px;margin:10px 15px 0;border-bottom:1px solid #ccc;}.subscri_title h1{color:#1E5494;font-size:14px;line-height:1;font-weight:bold;margin:0 0 6px 0;}.subscri_title .graytext a{color:#A0A0A0;}.read_ori{color:#A0A0A0;cursor:pointer;}.read_ori:hover{text-decoration:none;}.read_ori .underline{color:#A0A0A0;}.read_ori:hover .underline{text-decoration:underline;}.ico_read_ori{cursor:pointer;vertical-align:middle;margin:-2px 2px 0 5px;border:0 none;}img{border:0 none;}.wx_c_bar,.wx_close{background:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview1e9c5d.png) no-repeat;}.ie6 .wx_c_bar,.ie6 .wx_close{background:url($images_path$../js/com/kits/qmpreviewer/img/ico_preview_ie61e9c5d.png) no-repeat;}.qr_previewer .editor_mask{position:absolute;top:0;left:0;z-index:998;background:black;opacity:0.7;filter:alpha(opacity=70);width:100%;height:100%;-webkit-animation:opacity_7 0.25s ease;-moz-animation:opacity:opacity 0.25s ease;}.qr_previewer .wx_c_bar{position:absolute;right:0;top:0;z-index:1001;width:50px;height:50px;display:inline-block;background-position:0 -222px;-webkit-animation:opacity_X 0.75s ease;-moz-animation:opacity_X 0.75s ease;}.qr_previewer .wx_close{background-position:-128px -64px;width:16px;height:16px;position:absolute;top:12px;left:24px;display:inline-block;}.newtips{min-width:200px;_width:200px;line-height:16px;font-size:12px;position:absolute;top:0px;left:0px;z-index:1001;text-align:left!important;}.newtips .tipcontainer{z-index:99;position:absolute;*position:none;padding-right:2px;*padding-right:0px;*padding-top:6px;*width:100%;}.newtips .tipbackground{z-index:90;position:absolute;top:0px;left:0px;background:#beb49c;border-bottom:4px solid #beb49c;margin:8px 0 0 2px;*margin:10px 0 0 2px;width:300px;display:none;*display:none;}.newtips .container{width:100%;margin-top:6px;*border:2px solid #ddd;*border-width:0 2px 2px 0;padding-top:0px!important;position:relative;}.newtips .contentcontainer{*width:100%;padding:0px!important;border:1px solid #beb49c;border-radius:4px;box-shadow:0px 2px 4px rgba(0,0,0,0.25);background:#fefbe4;}.newtips .content{padding:15px 25px 28px 14px;*padding:15px 25px 18px 10px;border:0px solid #fff;border-radius:3px;background:#fefbe4 url($images_path$../js/com/kits/qmpreviewer/img/newtips1e9c5d.gif) repeat-x 0 bottom;white-space:nowrap;position:relative;zoom:1;}.newtips .tipsicon{width:40px;position:absolute;zoom:1;float:left;}.newtips .tipsico{width:36px;height:36px;display:block;}.newtips .tipsico_normal{background:url($images_path$../js/com/kits/qmpreviewer/img/newtipsicon1e9c5d.gif) no-repeat 0 0;}.newtips .tipstxt{line-height:19px;zoom:1;padding-left:40px;}.newtips .tipsico_note{background:url($images_path$../js/com/kits/qmpreviewer/img/tips_note1e9c5d.gif) no-repeat 4px 0;}.newtips .tipsrightpanel{text-align:left;text-decoration:none!important;height:10px;*height:18px;}.newtips .opertbar{position:absolute;right:15px;*right:12px;margin-top:10px;text-align:right;font-weight:normal!important;color:#000!important;}.newtips .opertbar  a{float:none!important;display:inline!important;color:#1E5494;text-decoration:none;}.newtips .opertbar a:hover{text-decoration:underline;}.newtips a.btnClose{position:absolute;right:2px;margin:-6px 8px 0 4px;*margin:-6px 8px 0 4px;width:12px!important;height:12px!important;background:url($images_path$../js/com/kits/qmpreviewer/img/newtips1e9c5d.gif) no-repeat -48px 0;z-index:1001;}.newtips a.btnClose:hover,.newtips a.btnClose:active{background:url($images_path$../js/com/kits/qmpreviewer/img/newtips1e9c5d.gif) no-repeat -32px 0}.newtips .arrowup{position:absolute;z-index:99;display:block;width:12px;height:7px;margin-bottom:-1px;*margin-top:-6px;margin-left:100px;background:url($images_path$../js/com/kits/qmpreviewer/img/newtips1e9c5d.gif) no-repeat 0 0;}.newtips .arrowdown{position:absolute;z-index:100;display:block;width:12px;height:9px;margin-top:-1px;*margin-top:-3px;margin-left:50px;background:url($images_path$../js/com/kits/qmpreviewer/img/newtips1e9c5d.gif) no-repeat -16px 0;}a.newtips_btnClose{float:right;margin-top:3px;width:12px!important;height:12px!important;background:url($images_path$../js/com/kits/qmpreviewer/img/newtips1e9c5d.gif) no-repeat -48px 0}a.newtips_btnClose:hover,a.newtips_btnClose:active{background:url($images_path$../js/com/kits/qmpreviewer/img/newtips1e9c5d.gif) no-repeat -32px 0}'].join("\n");
e&&a.evalCss(e,window,"qmPreviewerDefault");
})(QMComAdaptar);
var QMPreviewer=(function(a,e){
var k={img:"Image",music:"Music",video:"Video",doc:"Document",compress:"Compress",other:"Other"},d=0,c=1,b=50,j={},i={},l={},m=[];
function n(p,o)
{
var q=p;
o.sSkin&&i[p+o.sSkin]&&(q=p+o.sSkin);
return new (i[q])(o);
}
function g(o,p)
{
var q=a.target(o),r=a.attr(q,p);
while(!r&&(q=q.parentNode)&&q.nodeType==1)
{
r=a.attr(q,p);
}
return r&&q;
}
function h(o,p)
{
var r=this._moEventList||(this._moEventList=[]),s=p.split("|"),t,q;
for(var u=s.length-1;u>=0;u--)
{
t=s[u];
q=a.funcProxy(this,this[t+"_"]);
r.push([o,t,q]);
a.addEvent(o,t,q);
}
}
function f()
{
if(this._moEventList)
{
var p=this._moEventList,o;
while(o=p.shift())
{
a.delEvent.apply(this,o);
}
this._moEventList=e;
}
}
j.show=function(q,p,o){
var s=this;
if(!s._mbIsOpen)
{
var r=o||{};
s._open(r);
s._moMask.show();
s._msMode=r.oFileList?"List":"Callback";
s._mbShowApp=r.isShowApp||false;
s._mbNoOpt=r.bNoOpt;
s._moEvents=p||{};
s._mbShowBreakLine=typeof (r.bIsShowBreakLine)=="boolean"?r.bIsShowBreakLine:true;
s._mbShowDownBtn=typeof (r.bShowDownBtn)=="boolean"?r.bShowDownBtn:true;
if(r.oFileList)
{
for(var t=0,u=r.oFileList.length;t<u;t++)
{
r.oFileList[t].nListIdx=t;
}
s._moFilesMap={oMap:{List:r.oFileList}};
s._moOperator.setFileList(r.oFileList);
}
s._installFileViewer(s._createFileViewer(q),false,true);
}
};
j.play=function(q,p,o){
var r=this;
if(!r._mbIsOpen&&(q||{}).length)
{
r._open(o||{});
r._moMask.show();
r._moFilesMap=this._classify(q);
r._mbNoOpt=_oCfg.bNoOpt;
r._moEvents=p||{};
r._mbShowBreakLine=typeof (_oCfg.bIsShowBreakLine)=="boolean"?_oCfg.bIsShowBreakLine:true;
r._mbShowDownBtn=typeof (_oCfg.bShowDownBtn)=="boolean"?_oCfg.bShowDownBtn:true;
r._moFilesMap.oTypes.length==1?r._play(r._moFilesMap.oTypes[0]):r._installClassifyViewer();
}
};
j.close=function(){
this._mbIsOpen&&this._close();
};
j.component=function(p,o,q){
var r,s=i[q];
r=i[p]=function(){
arguments.length&&this.init&&this.init.apply(this,arguments);
};
o(r.prototype=s?new s():{},s&&s.prototype);
return this;
};
j.getFrameInfo_=function(o){
return this._moDomFrame[o];
};
j._init=function(o){
if(!this._mbIsInited)
{
var q=this._msId="pRevIEweR"+Math.random().toString().split(".").pop();
var p=a.isBrowser("ie")?"previewer previewer_hide ie"+a.browserVer()+(a.browserVer()<9?" ie":""):"previewer previewer_hide";
gbIsMac&&(p+=" MacOS");
a.insertHTML(a.getScaleCon(),"afterBegin",j.getView("frame",{sId:q,sClass:p}));
this._moDomFrame=a.S(q);
this._moDomScrollArea=a.S(q+"_scorllarea");
this._mbIsInited=true;
}
return this;
};
j._destroy=function(){
this._clearCache();
this._moMask&&this._moMask.destroy();
this._moOperator&&this._moOperator.destroy();
this._moTip&&this._moTip.destroy();
this._moOperator=this._moTip=this._moMask=this._moDomFrame=this._moDomScrollArea=e;
};
j._open=function(o){
this._mbIsOpen=true;
!this._mbIsInited&&this._init();
this._msBodyOverflow=a.getStyle(document.body,"overflow");
document.body.style.overflow="hidden";
this._moDomFrame.style.top=a.bodyScroll(window,"scrollTop")+"px";
a.setClass(this._moDomFrame,a.attr(this._moDomFrame,"orgcls")+({Skin1:" previewer_skin1"}[this._msSkin=o.sSkin]||""));
a.show(this._moDomFrame,true);
a.rmClass(this._moDomFrame,"previewer_hide");
!this._moMask&&(this._moMask=n("Mask",{sId:this._msId+"_mask",sSkin:this._msSkin,oDomContainer:this._moDomScrollArea,oEvents:{fClick:a.funcProxy(this,this._back)}}));
!this._moOperator&&(this._moOperator=n("Operator",{sId:this._msId+"_operator",sSkin:this._msSkin,oDomFrame:this._moDomFrame,oDomContainer:this._moDomScrollArea,oDomScrollArea:this._moDomScrollArea,oMenuContainer:this._moDomFrame,oEvents:{fClick:a.funcProxy(this,this._operate),fSelect:a.funcProxy(this,this._operate),fResizeVisualRange:a.funcProxy(this,this._visualRangeResize)}}));
!this._moTip&&(this._moTip=n("Tip",{sId:this._msId+"_tip",sSkin:this._msSkin,oDomContainer:this._moDomFrame,oVisualRange:this._moOperator.getVisualRange()}));
h.call(this,document,"keydown");
a.S(this._msId+"_focus").focus();
return this;
};
j._back=function(){
if(!this._moCurViewer||!this._moCurViewer.back())
{
this._msMode=="Callback"||this._msMode=="Classifier"||this._moFilesMap.oTypes&&this._moFilesMap.oTypes.length==1?this._close():this._installClassifyViewer();
}
};
j._close=function(){
if(this._mbIsOpen)
{
var o=this._moEvents.fClose;
f.call(this);
this._addCache(this.genCacheKey(this._moCurViewer.getFileInfo()),this._moCurViewer);
this._destroyViewer(this._moCurViewer);
this._destroyViewer(this._moPrevViewer);
this._destroyViewer(this._moNextViewer);
this._moOperator.destroy();
this._moTip.destroy();
this._moFilesMap=this._moEvents=this._moOperator=this._moTip=this._moCurViewer=this._moPrevViewer=this._moNextViewer=e;
a.rmClass(this._moDomFrame,"viewer_animation");
a.addClass(this._moDomFrame,"previewer_hide");
if(a.isBrowser("ie"))
{
a.show(this._moDomFrame,false);
document.body.style.overflow=this._msBodyOverflow;
a.callBack.call(this,o);
}
else{
setTimeout(function(){
a.show(j._moDomFrame,false);
document.body.style.overflow=j._msBodyOverflow;
a.callBack.call(this,o);
},300);
}
this._mbIsOpen=false;
}
};
j._addCache=function(p,o){
if(o.status()=="loaded")
{
if(l[p])
{
for(var r=m.length-1;r>=0;r--)
{
if(m[r]==p)
{
m.splice(r);
break;
}
}
l[p]!=o&&!this._isViewerInOperateList(l[p])&&l[p].destroy();
}
if(m.length>=b)
{
var q=m.shift();
!this._isViewerInOperateList(l[q])&&l[q].destroy();
delete l[q];
}
m.push(p);
l[p]=o;
if(o._msType=="compress")
{
setTimeout(function(){
try{
delete l[p];
m[m.indexOf(p)]=e;
debug("key:"+p+" clear");
}
catch(s)
{
}
},30*60*1000);
debug("key:"+p+" cached");
}
}
};
j._clearCache=function(){
for(var o in l)
{
l[o].destroy();
delete l[o];
}
m=[];
};
j._getFromCache=function(o){
return l[o];
};
j.genCacheKey=function(o){
return this._calcViewerType(o)+o.sUrl;
};
j._isViewerInOperateList=function(o){
return o==this._moCurViewer||o==this._moNextViewer||o==this._moPrevViewer;
};
j._calcViewerType=function(o){
var p=k[o.sType]||k["other"];
return p!="Other"&&!o.sUrl?"Loader":p;
};
j._classify=function(o){
var r={oTypes:[],oMap:{}};
for(var u=0,p=o.length;u<p;u++)
{
var q=o[u],t=this._calcViewerType(q),s=r.oMap[t]||(r.oMap[r.oTypes[r.oTypes.length]=t]=[]);
s[q.nListIdx=s.length]=q;
}
return r;
};
j._play=function(o){
var p=this._moFilesMap.oMap[o];
this._msMode=o;
this._moOperator.setFileList(p);
this._installFileViewer(this._createFileViewer(p));
};
j._installViewer=function(o){
var q=this._moOperator.getVisualRange(),p=this._moCurViewer;
p&&p.uninstall();
this._moTip.changeVisualRange(q);
o.changeVisualRange(q);
if(o.getFileInfo())
{
this._moOperator.setFileInfo(o.getFileInfo().oInfo);
this._moOperator.setTwoDCodeUrl(o.getFileInfo().sTwoDCodeUrl);
this._moOperator.setFileName(o.getFileInfo().sName);
}
(this._moCurViewer=o).install();
if(p)
{
this._addCache(this.genCacheKey(p.getFileInfo()),p);
this._destroyViewer(p);
}
};
j._createFileViewer=function(o){
var p=o.length?o[0]:o,q=o.length?o:e,r=p.sUrl&&this._getFromCache(this.genCacheKey(p));
if(r)
{
r.update({oTip:this._moTip,oOperator:this._moOperator,oVisualRange:this._moOperator.getVisualRange(),oFileInfo:p,oFileList:q});
}
else{
var s=this._calcViewerType(o);
r=n(s,{sId:this._msId+"_viewer",sSkin:this._msSkin,oTip:this._moTip,oOperator:this._moOperator,oDomContainer:s=="Image"?this._moDomFrame:this._moDomScrollArea,oVisualRange:this._moOperator.getVisualRange(),oFileInfo:p,oFileList:q,oEvents:s!="Loader"?e:{fLoad:a.funcProxy(this,this._loadUrl),fCancelLoad:a.funcProxy(this,this._cancelLoadUrl),fFinish:a.funcProxy(this,this._loadUrlFinish)}});
}
return r;
};
j._installFileViewer=function(q,o,p){
var t=q.getFileInfo(),s=this._msMode!="Callback",r=false,v,u;
if(!o)
{
if(this._moNextViewer==q)
{
this._destroyViewer(this._moPrevViewer);
this._moPrevViewer=this._moCurViewer;
this._moNextViewer=e;
}
else if(this._moPrevViewer==q)
{
this._destroyViewer(this._moNextViewer);
this._moNextViewer=this._moCurViewer;
this._moPrevViewer=e;
}
else if(this._moCurViewer)
{
this._moNextViewer=this._moPrevViewer=e;
}
}
if(s)
{
u=this._moFilesMap.oMap[this._msMode][t.nListIdx+1];
v=this._moFilesMap.oMap[this._msMode][t.nListIdx-1];
r=this._moFilesMap.oMap[this._msMode].length==1;
this._moOperator.selectFile(t.nListIdx);
}
else if(!this._moEvents.fNext)
{
r=true;
}
else{
u=this._moEvents.fNext(t);
v=this._moEvents.fPrev(t);
}
if(c)
{
!this._moNextViewer&&u&&this._calcViewerType(u)=="Image"&&(this._moNextViewer=this._createFileViewer(u));
}
if(!a.isBrowser("ie")||a.browserVer()>6)
{
(p?a.addClass(this._moDomFrame,"viewer_animation"):a.rmClass(this._moDomFrame,"viewer_animation"));
}
var w=this._calcViewerType(t);
this._moOperator.enable({navbar:false,minibar:{minimize:w=="Music"},mainbar:{Video:1,Music:1}[this._msMode]||this._mbNoOpt?false:{zoombtn:w=="Image"?true:"disable",rotate:w=="Image"?true:"disable",app:this._mbShowApp,next:r?false:(u?true:"disable"),prev:r?false:(v?true:"disable"),breakline:this._mbShowBreakLine?!r:false,send:!!this._moEvents.fFrwd?(t.bIsTimeout==1?"disable":true):false,list:r?false:s,info:t.oInfo,scan:d&&t.bIsTimeout!=1&&!!t.sTwoDCodeUrl,down:this._mbShowDownBtn?(!t.sDown?false:(t.bIsTimeout==1?"disable":true)):false}},{Document:true,Compress:true,Image:true}[this._calcViewerType(t)]);
this._installViewer(q);
t.sName&&this._moOperator.setTitle&&this._moOperator.setTitle(t.sName);
};
j._installClassifyViewer=function(){
this._moOperator.enable({navbar:false,mainbar:false});
this._installViewer(n(this._msMode="Classifier",{sId:this._msId+"_classifier",sSkin:this._msSkin,oTip:this._moTip,oDomContainer:this._moDomFrame,oVisualRange:this._moOperator.getVisualRange(),oFilesMap:this._moFilesMap,oEvents:{fClick:a.funcProxy(this,this._operate)}}));
};
j._destroyViewer=function(o){
if(o)
{
this._getFromCache(this.genCacheKey(o.getFileInfo()))||this._isViewerInOperateList(o)?o.uninstall():o.destroy();
}
};
j._operate=function(o,p){
switch(o)
{case "chooseMod":
this._play(p);
break;
case "close":
this._close();
break;
case "minimize":
this._moCurViewer.minimize&&this._moCurViewer.minimize();
this._close();
break;
case "next":
if(this._moNextViewer)
{
this._installFileViewer(this._moNextViewer);
}
else{
var r=this._msMode=="Callback"?this._moEvents.fNext(this._moCurViewer.getFileInfo()):this._moFilesMap.oMap[this._msMode][this._moCurViewer.getFileInfo().nListIdx+1];
r&&this._installFileViewer(this._createFileViewer(r));
}
break;
case "prev":
if(this._moPrevViewer)
{
this._installFileViewer(this._moPrevViewer);
}
else{
var r=this._msMode=="Callback"?this._moEvents.fPrev(this._moCurViewer.getFileInfo()):this._moFilesMap.oMap[this._msMode][this._moCurViewer.getFileInfo().nListIdx-1];
r&&this._installFileViewer(this._createFileViewer(r));
}
break;
case "send":
var q=this._moEvents;
q.fFrwd&&q.fFrwd(this._moCurViewer.getFileInfo());
break;
case "down":
var q=this._moEvents;
if(q.fDown)
{
q.fDown(p||this._moCurViewer.getFileInfo());
}
else{
var s=(p||this._moCurViewer.getFileInfo()).sDown;
if(!getTop().isHttp()&&(s.indexOf("http://")>-1||s.indexOf("ftnDownload302")>-1))
{
window.open(s,"_blank");
}
else{
a.S(this._msId+"_downframe").src=s;
}
}
break;
case "select":
var r=this._moFilesMap.oMap[this._msMode][p];
r&&this._installFileViewer(this._createFileViewer(r));
break;
case "openurl":
var q=this._moEvents;
if(q.fOpenUrl)
{
q.fOpenUrl(p||this._moCurViewer.getFileInfo());
}
break;
case "rotate_r":
case "rotate_l":
this._moCurViewer.rotate&&this._moCurViewer.rotate(o);
break;
case "zoom":
this._moCurViewer._toggleMode&&this._moCurViewer._toggleMode();
break;
}
};
j._visualRangeResize=function(o){
this._moDomFrame.style.top=a.bodyScroll(window,"scrollTop")+"px";
this._moCurViewer&&this._moCurViewer.changeVisualRange(o);
this._moTip.changeVisualRange(o);
};
j.keydown_=function(o){
var r=o.keyCode,p=true;
if(!QMPreviewerTmpl.config.oUseHotKeys[r])
{
return;
}
switch(r)
{case 27:
this._close();
break;
case 8:
this._back();
break;
default:
if({Callback:1,"Image":1,Document:1,Compress:1,Other:1,"List":1}[this._msMode])
{
var s={37:"prev",39:"next",38:"select",40:"select"}[r];
if(s)
{
if(s=="select")
{
if(!a.isShow(a.CN("menu_side")[0]))
{
p=false;
break;
}
var q=this._moCurViewer.getFileInfo().nListIdx;
r==38?q--:q++;
this._operate(s,q);
}
else{
this._operate(s);
}
}
else{
p=false;
}
}
else if(this._moCurViewer&&!this._moCurViewer.key(r))
{
p=false;
}
}if(p)
{
a.preventDef(o);
a.stopPropagation(o);
}
};
a.addEvent(window,"unload",function(){
j._destroy();
});
j.component("Base",function(o){
o.init=function(p){
if(p)
{
this._msId=p.sId=p.sId+Math.random().toString().substr(5);
this._moEvents=p.oEvents||{};
p.oDomContainer.appendChild(this._moDom=a.C('div'));
var q,r,s;
if((q=p.oFileInfo)&&(r=q.sFrom)&&(s=q.sType))
{
getTop().LogKV("newwindow|preview|"+(r).toLowerCase()+"|"+(s).toLowerCase());
}
}
};
o.destroy=function(){
this._destroyEvent();
this._moDom.parentNode&&this._moDom.parentNode.removeChild(this._moDom);
this._moDom=this._moEvents=e;
};
o.update=function(p){
};
o._dom=function(p){
return a.S(this._msId+"_"+p);
};
o._initEvent=h;
o._destroyEvent=f;
o._useComponent=n;
o._attrTarget=g;
});
j.component("VisualRange",function(p,o){
p.init=function(q){
o.init.call(this,q);
this._moVisualRange=q.oVisualRange;
};
p.destroy=function(){
o.destroy.call(this);
this._moVisualRange=e;
};
p.update=function(q){
o.update.call(this,q);
this._moVisualRange=q.oVisualRange;
};
p.changeVisualRange=function(q){
q&&(this._moVisualRange=q);
};
},"Base");
j.component("Tip",function(p,o){
p.init=function(q){
o.init.call(this,q);
this._moDom.className="layer_tip";
this._moDom.innerHTML=j.getView("loading",q);
a.posHide(this._moDom);
this._moDomMsg=this._dom("msg");
};
p.destroy=function(){
o.destroy.call(this);
this._moDomMsg=e;
};
p.show=function(q,r){
if(q=="loading")
{
var t=r||"",u=t.length>14?"...":"";
a.setClass(this._moDom,"layer_tip "+(t?"loading":"onlyloading"));
t&&(this._moDomMsg.innerHTML=a.htmlEncode(u?t.substr(0,14-u.length):t)+u);
}
else if(q=="percent")
{
var s=+r;
a.setClass(this._moDom,"layer_tip "+(s?"loading":"onlyloading"));
!isNaN(s)&&(this._moDomMsg.innerHTML=s+"%");
}
else{
a.setClass(this._moDom,"layer_tip onlymsg");
this._moDomMsg.innerHTML=a.htmlEncode(r||"");
}
this._show();
};
p.hide=function(){
a.posHide(this._moDom);
};
p.changeVisualRange=function(){
o.changeVisualRange.apply(this,arguments);
a.isPosShow(this._moDom)&&this._show();
};
p._show=function(){
var q=this._moVisualRange;
a.posShow(this._moDom,Math.floor(q.nLeft+(q.nWidth-this._moDom.clientWidth)/2),Math.floor(q.nTop+(q.nHeight-this._moDom.clientHeight)/2));
};
},"VisualRange");
j.component("Viewer",function(p,o){
p.init=function(q){
o.init.call(this,q);
this._moTip=q.oTip;
this._moOperator=q.oOperator;
this._moFileInfo=q.oFileInfo;
this._msStatus="init";
this._msOssParam=(q||{}).sOssParam;
};
p.destroy=function(){
this.uninstall();
o.destroy.call(this);
this._moTip=this._moOperator=this._moFileInfo=e;
};
p.getFileInfo=function(){
return this._moFileInfo;
};
p.status=function(){
return this._msStatus;
};
p.update=function(q){
o.update.call(this,q);
this._moTip=q.oTip;
this._moOperator=q.oOperator;
a.extend(this._moFileInfo,q.oFileInfo);
};
p.install=function(){
this._mbInstall=true;
this.logReset_();
};
p.uninstall=function(){
if(this._mbInstall)
{
this._mbInstall=false;
this._hideTip();
this.log_(2);
}
};
p.key=function(q){
return false;
};
p.back=function(){
return false;
};
p.log_=function(q){
if(!this._mbHasLoged&&this._moFileInfo)
{
var r=this._moFileInfo,s=a.extend({stat:"previewer",from:{attach:0,bigattach:1}[r.sFrom],type:{other:0,image:1,"document":2,music:3,video:4,compress:5}[this._msType],suffix:(r.sName||"").split(".").pop()||r.sSuffix||"none",result:q,trans:r.sHash?1:0},this._msOssParam);
this._mbHasLoged=true;
if(!isNaN(s.from)&&!isNaN(s.type)&&s.result>=0&&s.result<=2)
{
a.ossLog("delay","all",s);
if(q==1)
{
var t={other:"preview_other_suc",image:"preview_img_suc","document":"preview_doc_suc",music:"preview_music_suc",video:"preview_video_suc",compress:"preview_compress_suc"}[this._msType];
a.ossLog('delay','all','kw='+t);
}
}
}
};
p.logReset_=function(){
this._mbHasLoged=false;
};
p._operator=function(){
return this._isInstall()&&this._moOperator;
};
p._getComType=function(q){
return k[q]||k["other"];
};
p._showTip=function(q,r){
this._moTip.show(q,r);
};
p._hideTip=function(){
this._moTip.hide();
};
p._isInstall=function(){
return this._mbInstall;
};
},"VisualRange");
j.component("Loader",function(o,p){
o.install=function(){
var q=this;
p.install.apply(this,arguments);
this._showTip("loading",this._moFileInfo.sName);
a.callBack(this._moEvents.fLoad,[this,function(r){
q._mbIsCallBack=true;
if(r)
{
a.extend(q.getFileInfo(),r);
a.callBack(q._moEvents.fFinish,[q]);
}
else{
q._showTip("err",q.getFileInfo().sName+" \u52A0\u8F7D\u5931\u8D25\uFF01");
}
}]);
};
o.uninstall=function(){
p.uninstall.apply(this,arguments);
!this._mbIsCallBack&&a.callBack(this._moEvents.fCancelLoad,[this]);
};
},"Viewer");
j._loadUrl=function(p,o){
a.callBack(this._moEvents.fLoadUrl,[p.getFileInfo(),o]);
};
j._loadUrlFinish=function(o){
if(this._moCurViewer==o)
{
this._installFileViewer(this._createFileViewer(o.getFileInfo()),true);
}
};
j._cancelLoadUrl=function(o){
a.callBack(this._moEvents.fCancelLoadUrl,[o.getFileInfo()]);
};
j.getView=function(p,o){
return (QMPreviewerTmpl[p]||"").replace(o);
};
j.getTemplate=function(o){
return QMPreviewerTmpl[o]||"";
};
return j;
})(QMComAdaptar);
(function(a,b){
QMPreviewer.component("Mask",function(c,d){
c.init=function(e){
d.init.call(this,e);
this._moDom.className=e.bIsLayerLever?"layer_mask":"mask";
this._initEvent(this._moDom,"click");
};
c.show=function(){
a.show(this._moDom,true);
};
c.hide=function(){
a.show(this._moDom,false);
};
c.click_=function(e){
a.callBack(this._moEvents.fClick);
};
},"Base");
QMPreviewer.component("MaskSkin1",function(c,d){
c.show=function(){
a.show(this._moDom,false);
};
},"Mask");
})(QMComAdaptar);
(function(a,b){
QMPreviewer.component("Operator",function(e,f){
var c=1500,d=0,g={minibar:{minimize:false,close:true},navbar:{nav:false},mainbar:{zoombtn:"disable",rotate:"disable",prev:true,next:true,breakline:true,list:false,send:true,scan:true,down:true,info:false}};
e.init=function(h,j){
var k=this;
if(j&&j.sTmpl=="operator_skin1")
{
if(h)
{
this._msId=h.sId=h.sId+Math.random().toString().substr(5);
this._moEvents=h.oEvents||{};
h.oDomContainer.parentNode.insertBefore(this._moDom=a.C('div'),h.oDomContainer);
}
}
else{
f.init.call(k,h);
}
k._moBtnFulCfg={};
k._moCurBtnCfg=k._moBtnNonCfg={};
k._moBtnDefCfg=(j&&j.oBtnDefCfg)||g;
for(var l in k._moBtnDefCfg)
{
k._moBtnFulCfg[l]={};
k._moBtnNonCfg[l]=false;
}
k._moDom.style.cssText="position:static;";
k._moDom.innerHTML=QMPreviewer.getView((j&&j.sTmpl||"operator"),h);
k._moDomRange=h.oDomContainer;
k.saveDom_();
k.initMenu_(h);
k.initEvent_();
h.bAutoResize!==false&&k._initEvent(window,"resize");
k.calcVisualRange_();
};
e.destroy=function(){
var h=this;
f.destroy.call(h);
h._moListMenu&&h._moListMenu.destroy();
h._moInfoMenu&&h._moInfoMenu.destroy();
h._moScanMenu&&h._moScanMenu.destroy();
h._moCurMenu=h._moListMenu=h._moInfoMenu=h._moScanMenu;
h._moDomRange=h._moCurBtnCfg=h._moBtnFulCfg=h._moBtnNonCfg=h._moDomMainBar=h._moDomNavBar=h._moDomMiniBar=b;
};
e.enable=function(i,h){
var j=this;
h?a.addClass(j._moDom,"allow_mo_hide"):a.rmClass(j._moDom,"allow_mo_hide");
j._parseCfg(i===false?j._moBtnNonCfg:i||{});
j._showMainBar();
j._moCurMenu&&(j._moCurBtnCfg.mainbar===false||!j._moBtnFulCfg.mainbar[j._msCurMenu])&&j._hideMenu();
return j;
};
e.hideBar=function(h){
this._hideMainBar();
this._startHideBarTimer(h===b?c:h);
return this;
};
e.getBtnCfg=function(){
return this._moCurBtnCfg;
};
e.getVisualRange=function(){
return this._moVisualRange;
};
e.setFileList=function(h){
this._moListMenu.setFileList(h);
};
e.selectFile=function(h){
this._moListMenu.selectFile(h);
};
e.setFileInfo=function(h){
this._moInfoMenu&&this._moInfoMenu.setInfo(h);
};
e.setTwoDCodeUrl=function(h){
this._moScanMenu&&this._moScanMenu.setTwoDCodeUrl(h);
};
e.setFileName=function(h){
this._moScanMenu&&this._moScanMenu.setFileName(h);
};
e.resize=function(h){
var i=this;
i.adjustPos_().calcVisualRange_(h).resizeMenu_();
a.callBack(i._moEvents.fResizeVisualRange,[i.getVisualRange()]);
return i;
};
e.operate=function(h,i){
a.callBack(this._moEvents.fClick,[h,i]);
return this;
};
e.saveDom_=function(){
var h=this;
a.show(h._moDomMiniBar=h._dom("minibar"),false);
a.show(h._moDomNavBar=h._dom("navbar"),false);
a.show(h._moDomMainBar=h._dom("mainbar"),false);
h._moTitleTxt=h._dom("titletxt");
};
e.initMenu_=function(h){
var j=this,i=h.oMenuContainer||h.oDomContainer;
j._moListMenu=j._useComponent("Menu.Selector",{sId:j._msId+"_list",sType:"list",oDomContainer:i,oEvents:{fClick:a.funcProxy(j,j._menuOpt),fHide:a.funcProxy(j,j._unselectListBtn)}});
j._moInfoMenu=j._useComponent("Menu.Info",{sId:j._msId+"_info",sType:"info",oDomContainer:i,oEvents:{fClick:a.funcProxy(j,j._menuOpt),fHide:a.funcProxy(j,j._unselectInfoBtn)}});
j._moScanMenu=j._useComponent("Menu.Scan",{sId:j._msId+"_scan",sType:"scan",oDomContainer:i,oEvents:{fClick:a.funcProxy(j,j._menuOpt),fHide:a.funcProxy(j,j._unselectScanBtn)}});
};
e.initEvent_=function(){
this._initEvent(this._moDom,"click|mousedown|mouseup|mouseover|mouseout");
};
e.adjustPos_=function(h){
var i=this;
if(h===b||h=="minibar")
{
a.hasClass(this._dom("minimize"),"hidebtn")?a.rmClass(i._moDomMiniBar,"minibar_l"):a.addClass(i._moDomMiniBar,"minibar_l");
}
;if(h===b||h=="mainbar")
{
this._moDomMainBar.style.left=(i._mnMainBarLeft=Math.floor((i._moDomRange.clientWidth-i._moDomMainBar.clientWidth)/2))+"px";
}
;return i;
};
e.calcVisualRange_=function(){
var o=this,n=o._moDomRange.clientWidth,m=o._moDomRange.clientHeight,j=0,k=a.isShow(o._moDomNavBar)?parseInt(a.getStyle(o._moDomNavBar,"left"))+o._moDomNavBar.clientWidth:0,i=a.isShow(o._moDomMiniBar)?(n-(parseInt(a.getStyle(o._moDomMiniBar,"right"))||0)-(parseInt(a.getStyle(o._moDomMiniBar,"width"))||0))-10:n,h=o._mnMainBarTop=a.isShow(o._moDomMainBar)?(m-(parseInt(a.getStyle(o._moDomMainBar,"bottom"))||0)-o._moDomMainBar.clientHeight):m,l=Math.max(n-i,k);
o._moVisualRange={nTop:j,nBottom:h,nLeft:l,nRight:n-l,nWidth:n-(l*2),nHeight:h-j,nFullTop:0,nFullBottom:m,nFullLeft:0,nFullRight:n,nFullWidth:n,nFullHeight:m};
return o;
};
e.showMenu_=function(h){
if(h==this._msCurMenu)
{
this._hideMenu();
a.rmClass(this._dom(h),"select");
}
else if({list:1,info:1,scan:1}[h])
{
this._hideMenu();
this._msCurMenu=h;
this._moCurMenu={list:this._moListMenu,info:this._moInfoMenu,scan:this._moScanMenu}[h],a.addClass(this._dom(h),"select");
this.resizeMenu_();
}
};
e.resizeMenu_=function(){
var i=this;
if(i._msCurMenu)
{
var h=this._dom(i._msCurMenu);
i._moCurMenu.show(i._mnMainBarLeft+h.offsetLeft+h.clientWidth/2,i._mnMainBarTop+h.offsetTop);
}
};
e._parseCfg=function(h){
var m=this;
for(var n in m._moBtnDefCfg)
{
var q=h[n],i=m._moBtnDefCfg[n],j=this._dom(n);
q===b&&(q=i);
if(q===false)
{
a.show(j,false);
}
else{
var l=m._moBtnFulCfg[n];
for(var o in i)
{
var r=q[o];
r===b&&(r=i[o]);
if(l[o]!=r)
{
var k=this._dom(o),p=a.attr(k,"orgcls");
if(!r)
{
p+=" hidebtn";
}
else if(r=="disable")
{
p+=" disable";
}
else if(typeof r=="string")
{
k.title=r;
}
a.setClass(k,p);
l[o]=r;
}
}
a.show(j,true);
m.adjustPos_(n);
}
}
m.calcVisualRange_()._moCurBtnCfg=h;
};
e._menuOpt=function(h,i){
switch(h)
{case "select":
a.callBack(this._moEvents.fSelect,[h,i]);
break;
case "openurl":
a.callBack(this._moEvents.fClick,[h,i]);
break;
default:
}
};
e._hideMenu=function(){
if(this._moCurMenu)
{
this._moCurMenu.hide();
}
};
e._unselectListBtn=function(){
var h=this;
a.rmClass(this._dom("list"),"select");
h._msCurMenu=h._moCurMenu=b;
h.hideBar();
};
e._unselectInfoBtn=function(){
var h=this;
a.rmClass(this._dom("info"),"select");
h._msCurMenu=h._moCurMenu=b;
h.hideBar();
};
e._unselectScanBtn=function(){
var h=this;
a.rmClass(this._dom("scan"),"select");
h._msCurMenu=h._moCurMenu=b;
h.hideBar();
};
e._showMainBar=function(){
a.hasClass(this._moDomMainBar,"hidebar")&&a.rmClass(this._moDomMainBar,"hidebar");
};
e._hideMainBar=function(){
this.showMenu_(this._msCurMenu);
!a.hasClass(this._moDomMainBar,"hidebar")&&a.addClass(this._moDomMainBar,"hidebar");
};
e._startHideBarTimer=function(h){
var j=this;
j._destroyHideBarTimer();
if(!j._mbIsMouseInMainBar)
{
var i=typeof h=="number"?h:0;
i?(j._mnTimer=setTimeout(a.funcProxy(j,j._hideMainBar),h)):j._hideMainBar();
}
};
e._destroyHideBarTimer=function(){
if(this._mnTimer)
{
clearTimeout(this._mnTimer);
this._mnTimer=0;
}
};
e.click_=function(h){
var i=this._attrTarget(h,"opt"),j=a.attr(i,"opt");
if(j&&!a.hasClass(i,"disable"))
{
if({list:1,info:1,scan:1}[j])
{
if(a.isShow(this._moListMenu._moDom)&&a.getStyle(this._moListMenu._moDom,"visibility")!="hidden")
{
this.hideMenu_(j);
}
else{
this.showMenu_(j);
}
}
else{
a.callBack(this._moEvents.fClick,[j]);
}
}
};
e.mousedown_=function(h){
var i=this._attrTarget(h,"opt");
i&&!a.hasClass(i,"disable")&&a.addClass(i,"mousedown");
};
e.mouseup_=function(h){
var i=this._attrTarget(h,"opt");
i&&a.rmClass(i,"mousedown");
};
e.mouseover_=function(h){
var i=this._attrTarget(h,"opt");
if(i&&!a.hasClass(i,"mouseover"))
{
!a.hasClass(i,"disable")&&!a.hasClass(i,"select")&&a.addClass(i,"mouseover");
}
if((i=this._attrTarget(h,"hide"))==this._moDomMainBar)
{
this._mbIsMouseInMainBar=true;
this._destroyHideBarTimer();
this._showMainBar();
}
};
e.mouseout_=function(h){
var i=this._attrTarget(h,"opt"),j=a.relatedTarget(h);
if(i&&!a.contain(i,j))
{
a.rmClass(i,"mouseover");
a.rmClass(i,"mousedown");
}
if(!this._moCurMenu&&(i=this._attrTarget(h,"hide"))==this._moDomMainBar&&!a.contain(i,j))
{
this._mbIsMouseInMainBar=false;
this._startHideBarTimer(d);
}
};
e.resize_=function(h){
this.resize();
};
e.setTitle=function(h){
var i=this._moTitleTxt;
i.innerHTML=a.htmlEncode(h);
};
},"Base");
QMPreviewer.component("OperatorSkin1",function(c,d){
var e={mainbar:{zoombtn:"disable",rotate:"disable",app:true,prev:true,next:true,breakline:false,list:true,send:false,scan:true,down:true,info:false}};
c.init=function(f){
var g=this;
d.init.call(g,f,{oBtnDefCfg:e,sTmpl:"operator_skin1"});
g._mbShowMenu=false;
};
c.enable=function(g,f){
var h=this;
h._parseCfg(g===false?h._moBtnNonCfg:g||{});
if(getTop().S(h._msId+"_app",window)&&h._moBtnFulCfg.mainbar.app)
{
getTop().requestShowTip(h._msId+"_app",91,getTop());
getTop().S(h._msId+"_app",window).onclick=function(){
getTop().QMAjax.send("/cgi-bin/readtemplate?kvclick=readtemplate|qmpreviewer|read_attach_mobile|1&loc=readtemplate,qmpreviewer,read_attach_mobile,1");
};
}
return h;
};
c.setTitle=function(f){
var g=this._moTitleTxt;
g.innerHTML=a.htmlEncode(f);
a.show(g,true);
};
c.saveDom_=function(){
var f=this;
a.show(f._moDomMainBar=f._dom("mainbar"),false);
a.show(f._moTitleTxt=f._dom("titletxt"),false);
};
c.initMenu_=function(f){
var h=this,g=f.oMenuContainer||f.oDomContainer;
h._moListMenu=h._useComponent("Menu.Selector.Side",{sId:h._msId+"_list",sType:"list",oDomContainer:f.oDomScrollArea,oEvents:{fClick:a.funcProxy(h,h._menuOpt),fHide:a.funcProxy(h,h._unselectListBtn)}});
h._moScanMenu=h._useComponent("Menu.ScanSkin1",{sId:h._msId+"_scan",oDomScrollArea:f.oDomScrollArea,sType:"scan",oDomContainer:g,oEvents:{fClick:a.funcProxy(h,h._menuOpt),fHide:a.funcProxy(h,h._unselectScanBtn)}});
};
c.initEvent_=function(){
this._initEvent(this._moDom,"click");
};
c.adjustPos_=function(f){
var m=this,l;
if(f===b||f=="mainbar")
{
var k=m._dom("optarea"),h,i,g;
if(i=m._moDomRange.offsetWidth)
{
k.style.left=0;
g=k.offsetWidth;
k.style.left=(i-g-20)+"px";
}
}
;if(l=a.S("preview_div_container"))
{
l.style.height=document.body.clientHeight+"px";
l.style.zoom='normal';
l.style.zoom='1';
var j=calcPos(m._moDom);
m._moDomRange.style.height=document.body.clientHeight-j[0]-j[5]+"px";
setTimeout(function(){
m.adjustPos_();
},500);
}
return m;
};
c.calcVisualRange_=function(f){
var m=this,g=(getTop().gnIEVer==6),l=g?m._moDomRange.parentNode:m._moDomRange,k=l.clientWidth,j=l.clientHeight,h=(m._moDomMainBar.clientHeight||parseInt(a.getStyle(m._moDomMainBar,"height")))+1+3;
if(k&&j)
{
m._moVisualRange={nTop:h,nBottom:j,nLeft:0,nRight:k,nWidth:k,nHeight:j,nFullTop:0,nFullBottom:j,nFullLeft:0,nFullRight:k,nFullWidth:k,nFullHeight:j};
if(!(f===false)&&a.isShow(m._moListMenu._moDom))
{
var i=parseInt(a.getStyle(m._moListMenu._moDom,"width"))+1;
m._moVisualRange.nWidth-=i;
m._moVisualRange.nRight-=i;
}
}
return m;
};
c.showMenu_=function(f){
if(f=="list")
{
this._moListMenu.show();
this.resize();
}
else if(f=="scan")
{
this._msCurMenu=f;
this._moCurMenu=this._moScanMenu;
this.resizeMenu_();
}
};
c.hideMenu_=function(f){
this._moListMenu.hide();
this.resize(false);
};
c.resizeMenu_=function(){
var i=this;
if(i._msCurMenu=="scan")
{
var f=i._dom(i._msCurMenu),h=i._dom("optarea"),g=i._moCurMenu;
g.show(h.offsetLeft+f.offsetLeft+f.offsetWidth/2,f.offsetTop+f.offsetHeight+20);
}
};
c._hideMainBar=function(){
};
},"Operator");
})(QMComAdaptar);
(function(a,b){
QMPreviewer.component("Menu",function(c,d){
c.init=function(e){
d.init.call(this,e);
this.init_(e);
};
c.destroy=function(){
d.destroy.call(this);
this._moDomCtt=b;
};
c.show=function(e,f){
this._mnLeft=e;
this._mnTop=f;
this.show_();
};
c.hide=function(){
if(a.isPosShow(this._moDom))
{
a.posHide(this._moDom);
a.callBack(this._moEvents.fHide);
}
};
c.init_=function(e){
a.posHide(this._moDom);
this._moDom.className="opt_menu";
this._moDom.innerHTML=QMPreviewer.getView("menu",e);
this._moDomCtt=this._dom("ctt");
this._initEvent(this._moDom,"click");
};
c.show_=function(){
this._moDom.style.zIndex="-999999";
this._moDom.style.display="block";
var e=this._dom("arr");
a.posShow(this._moDom,this._mnLeft-e.offsetLeft-e.offsetWidth/2,this._mnTop-e.offsetHeight-e.offsetTop);
this._moDom.style.zIndex="999999";
};
c.resize_=function(){
a.isPosShow(this._moDom)&&this.show_();
};
c._draw=function(e){
this._moDomCtt.innerHTML=e;
this.resize_();
};
c.click_=function(f,e){
var g=e||this._attrTarget(f,"opt"),h=a.attr(g,"opt");
switch(h)
{case "menu_hide":
this.hide();
break;
}a.stopPropagation(f);
};
},"Base");
})(QMComAdaptar);
(function(a,b){
QMPreviewer.component("Menu.Info",function(c,d){
c.show=function(){
this._redraw();
d.show.apply(this,arguments);
};
c.destroy=function(){
d.destroy.call(this);
this._moInfo=b;
};
c.setInfo=function(e){
if(e!=this._moInfo)
{
this._moInfo=e;
this._mbChange=true;
a.isPosShow(this._moDom)&&this._redraw();
}
};
c._redraw=function(){
if(this._mbChange)
{
this._draw(QMPreviewer.getView("menuinfo",{sId:this._msId,oInfo:this._moInfo,oJs:a}));
this._mbChange=false;
}
};
c.click_=function(e){
var f=this._attrTarget(e,"opt"),g=a.attr(f,"opt");
if(g=="menu_openurl")
{
a.callBack(this._moEvents.fClick,["openurl"]);
this.hide();
}
d.click_.call(this,e,f);
};
},"Menu");
})(QMComAdaptar);
(function(a,b){
QMPreviewer.component("Menu.Scan",function(c,d){
c.init=function(e){
d.init.call(this,e);
this._mbShowed=false;
this._mbNewData=false;
};
c.show=function(){
this._redraw();
d.show.apply(this,arguments);
};
c.destroy=function(){
d.destroy.call(this);
};
c.setTwoDCodeUrl=function(e){
this._msTwoDCodeUrl=e;
this._mbNewData=true;
};
c.setFileName=function(e){
this._msName=e;
};
c._redraw=function(){
if(this._mbNewData||!this._mbShowed)
{
this._draw(QMPreviewer.getView("menuscan",{sId:this._msId,src:this._msTwoDCodeUrl,name:this._msName,oJs:a}));
this._mbShowed=true;
this._mbNewData=false;
}
};
c.resize_=function(){
this._moDom.style.width="320px";
this._moDom.style.height=this._dom("bg").style.height=this._moDomCtt.scrollHeight+"px";
a.isPosShow(this._moDomCt)&&this.show_();
};
c.click_=function(e){
var f=this._attrTarget(e,"opt");
d.click_.call(this,e,f);
};
},"Menu");
QMPreviewer.component("Menu.ScanSkin1",function(c,d){
c.init_=function(e){
a.posHide(this._moDom);
this._moDom.className="menu_scan_skin1";
this._moDom.innerHTML=QMPreviewer.getView("menuskin1",e);
this._moDomCtt=this._dom("ctt");
this._moDomCt=this._dom("ct");
this._mbShowed=false;
this._mbNewData=false;
this._initEvent(this._moDom,"click");
};
c.show=function(e,f){
this._redraw();
e-=this._dom("ctt").offsetWidth/2;
this._moDomCt.style.top=f+"px";
this._moDomCt.style.left=e+"px";
d.show.call(this);
};
c._redraw=function(){
if(this._mbNewData||!this._mbShowed)
{
this._draw(QMPreviewer.getView("menuscanskin1",{sId:this._msId,src:this._msTwoDCodeUrl,name:this._msName,oJs:a}));
this._mbShowed=true;
this._mbNewData=false;
}
};
c.resize_=function(){
debug("resize");
this._moDomCt.style.width="250px";
this._moDomCt.style.height=this._dom("bg").style.height=(this._moDomCtt.scrollHeight+10)+"px";
};
},"Menu.Scan");
})(QMComAdaptar);
(function(a,b){
QMPreviewer.component("Menu.Selector",function(d,e){
var c=6;
d.show=function(){
this.select_();
e.show.apply(this,arguments);
};
d.setFileList=function(f){
var h=[];
this._mnCurPage=-1;
this._mnTotalPage=Math.floor((f.length-1)/c)+1;
for(var j=0,g=this._mnTotalPage;j<g;j++)
{
h[j]=j+1;
}
this._draw(QMPreviewer.getView("menuselector",{sId:this._msId,oList:f,nItemPerPage:c,oPage:h,oJs:a}));
this._page(0);
};
d.selectFile=function(f){
this._mnSelect=f;
a.isPosShow(this._moDom)&&this.select_();
};
d.select_=function(f){
var g=f||this._mnSelect;
if(this._mnCurSelect!=g)
{
a.rmClass(this._dom("item"+(this._mnCurSelect||0)),"select");
a.addClass(this._dom("item"+(this._mnCurSelect=g)),"select");
this._page(Math.floor(g/c));
}
};
d._page=function(f){
if(f!=this._mnCurPage&&f>-1&&f<this._mnTotalPage)
{
if(this._mnCurPage>-1)
{
a.show(this._dom("list"+this._mnCurPage),false);
a.rmClass(this._dom("page"+this._mnCurPage),"select");
}
a.show(this._dom("list"+(this._mnCurPage=f)),true);
a.addClass(this._dom("page"+this._mnCurPage),"select");
f==0?a.addClass(this._dom("prev"),"disable"):a.rmClass(this._dom("prev"),"disable");
f+1==this._mnTotalPage?a.addClass(this._dom("next"),"disable"):a.rmClass(this._dom("next"),"disable");
}
};
d.click_=function(f){
var h=this._attrTarget(f,"opt"),i=a.attr(h,"opt");
switch(i)
{case "menu_select":
var g=parseInt(a.attr(h,"sel"));
this.select_(g,false);
a.callBack(this._moEvents.fClick,["select",g]);
break;
case "menu_page":
this._page(parseInt(a.attr(h,"page")));
break;
case "menu_prev":
this._page(this._mnCurPage-1);
break;
case "menu_next":
this._page(this._mnCurPage+1);
break;
}e.click_.call(this,f,h);
};
},"Menu");
QMPreviewer.component("Menu.Selector.Side",function(c,d){
c.init_=function(e){
a.show(this._moDom,false);
this._moDom.className="menu_side";
a.attr(this._moDom,"id",e.sId+'_ctt');
this._moDomCtt=this._moDom;
this._initEvent(this._moDom,"click");
};
c.show=function(e,f){
this.select_();
a.show(this._moDom,true);
var g=this._moDomCtt;
setTimeout(function(){
g.style.marginRight=0;
});
};
c.hide=function(){
var e=this._moDom;
this._moDomCtt.style.cssText="";
setTimeout(function(){
a.show(e,false);
},a.isBrowser("ie")?0:500);
};
c.setFileList=function(e){
this._draw(QMPreviewer.getView("menusideselector",{sId:this._msId,oList:e,oJs:a}));
};
c.selectFile=function(e){
this._mnSelect=e;
a.isShow(this._moDom)&&this.select_();
};
c.select_=function(f,e){
var g=f||this._mnSelect;
if(this._mnCurSelect!=g)
{
a.rmClass(this._dom("item"+(this._mnCurSelect||0)),"select");
a.addClass(this._dom("item"+(this._mnCurSelect=g)),"select");
}
e&&this.hide();
};
c.resize_=function(){
};
},"Menu.Selector");
})(QMComAdaptar);
(function(a,b){
QMPreviewer.component("Classifier",function(c,d){
c.init=function(e){
d.init.call(this,e);
this._moDom.className="classifier";
this._moDom.innerHTML=QMPreviewer.getView("classifier",e);
this._initEvent(this._moDom,"click|mouseover|mouseout");
};
c.destroy=function(){
d.destroy.call(this);
};
c.install=function(){
if(!this._isInstall())
{
d.install.apply(this,arguments);
}
};
c.uninstall=function(){
if(this._isInstall())
{
d.uninstall.apply(this,arguments);
}
};
c.changeVisualRange=function(){
d.changeVisualRange.apply(this,arguments);
};
c.key=function(e){
var f=this._getIdx();
switch(e)
{case 37:
case 39:
this._keySelect(f+(e==37?-1:1));
break;
case 38:
case 40:
this._keySelect(f<0?0:f>2?f-3:Math.min(a.$("li",this._moDom).length-1,f+3));
break;
case 13:
this._choose(a.$("li",this._moDom)[Math.max(0,f)]);
break;
default:
return false;
}return true;
};
c._clearSelection=function(){
var e=a.$("li",this._moDom);
for(var f=0,g=e.length;f<g;f++)
{
if(a.hasClass(e[f],"mutil_hover"))
{
a.rmClass(e[f],"mutil_hover");
}
}
};
c._getIdx=function(){
var f=a.$("li",this._moDom),e=-1;
for(var g=0,h=f.length;g<h;g++)
{
if(a.hasClass(f[g],"mutil_hover"))
{
e=g;
break;
}
}
return e;
};
c._keySelect=function(e){
var f=a.$("li",this._moDom);
this._clearSelection();
if(f.length)
{
if(e+1>f.length)
{
e=0;
}
else if(e<0)
{
e=f.length-1;
}
a.addClass(f[e],"mutil_hover");
}
};
c._choose=function(e){
var f=a.attr(e,"opt");
f&&a.callBack(this._moEvents.fClick,[f,f=="chooseMod"&&a.attr(e,"sel")]);
};
c.click_=function(e){
var f=this._attrTarget(e,"opt");
this._choose(f);
};
c.mouseover_=function(e){
var f=this._attrTarget(e,"hover"),g=a.attr(f,"hover");
this._clearSelection();
f&&!a.hasClass(f,g)&&a.addClass(f,g);
};
c.mouseout_=function(e){
var f=this._attrTarget(e,"hover"),g=a.attr(f,"hover");
f&&a.hasClass(f,g)&&a.rmClass(f,g);
};
;
},"Viewer");
})(QMComAdaptar);
(function(a,b){
QMPreviewer.component("Document",function(c,d){
var e=false;
c.init=function(f){
var g=this;
d.init.call(g,f);
a.posHide(g._moDom);
g._moDom.className="layer_doc";
if(f&&f.bFromCompress)
{
g._moDom.style.position="absolute";
}
else{
getTop().addClass(g._moDom,"layer_doc2");
}
g._moDom.innerHTML=QMPreviewer.getView("doc",f);
g._moDomDocContainer=g._dom("doc_container");
g._moDomDocTitle=g._dom("doc_title");
g._moDomDocFrame=g._dom("doc_view");
g._moDomDocErr=g._dom("doc_err");
g._moDomDocErrDefault=g._dom("doc_err_default");
g._moDomDocErrNotExist=g._dom("doc_err_notexist");
g._msType="document";
g._initEvent(g._dom("doc_view"),"error|load");
g._initEvent(g._moDomDocContainer,"click");
g._moFileInfo.bIsTimeout==1&&g._showErr(true);
};
c.destroy=function(){
d.destroy.call(this);
this._moDomDocErr=this._moDomDocFrame=this._moDomDocTitle=this._moDomDocContainer=this._moDomDocErrDefault=this._moDomDocErrNotExist=b;
};
c.install=function(){
if(!this._isInstall())
{
d.install.call(this);
this._mbIsOnload&&this._operator().hideBar();
this._show();
this._showHandle();
this.checkScrolling_();
}
};
c.uninstall=function(){
if(this._isInstall())
{
d.uninstall.call(this);
this._hide();
}
};
c.changeVisualRange=function(f){
d.changeVisualRange.call(this,f);
this.resize_();
};
c.resize_=function(){
var k=this._moVisualRange;
if(k)
{
var g=0,l=this._moFileInfo.sSuffix||(this._moFileInfo.sName||"".split(".").pop()),f=k.nFullHeight-g-k.nFullTop,i=(e||{xls:1,xlsx:1,ppt:1,pptx:1,eml:1}[l])?(this._moDomDocTitle?this._moDomDocTitle.clientHeight:0):0,h={xls:1024,xlsx:1024,pdf:960,ppt:990,pptx:990}[l]||840,j=(k.nFullWidth<h+g?k.nFullWidth:h)-g;
this._moDomDocContainer.style.height=f+"px";
this._moDom.style.padding=(g/2)+"px";
this._moDom.style.top=k.nFullTop+"px";
this._moDom.style.width=j+"px";
this._moDom.style.left=k.nLeft+(k.nWidth-j-g)/2+"px";
this._moDomDocFrame.style.top=(i+2)+"px";
this._moDomDocFrame.style.height=Math.max(0,f-i)+"px";
}
};
c.checkScrolling_=function(){
};
c._show=function(f){
a.show(this._moDomDocContainer,true);
a.posShow(this._moDom);
this.resize_();
};
c._showErr=function(f){
var g=this;
a.show(g._moDomDocErr,f);
if(g._moFileInfo.bIsTimeout==1)
{
a.show(g._moDomDocErrDefault,false);
a.show(g._moDomDocErrNotExist,true);
}
};
c._showHandle=function(){
try{
var g=this._moDomDocFrame&&this._moDomDocFrame.contentWindow&&this._moDomDocFrame.contentWindow.document;
if(g&&g.childNodes.length>0)
{
var h=this._moDomDocFrame.contentWindow.document.childNodes[0],f=h&&h.nodeName=="#comment"&&h.data.toLowerCase().indexOf("exception")>-1;
this._showErr(f);
this.log_(f?0:1);
this._mbIsOnload&&this._moDomDocTitle&&(this._moDomDocTitle.style.color="#000");
}
}
catch(i)
{
if(this._mbIsOnload)
{
this.log_(0);
}
}
};
c._hide=function(){
a.show(this._moDomDocContainer,false);
a.posHide(this._moDom);
};
c.error_=function(){
this._isInstall()&&this._showErr(true);
};
c.load_=function(){
var f=this;
this._mbIsOnload=true;
this._msStatus="loaded";
if(this._isInstall())
{
this._operator().hideBar();
this._showHandle();
}
};
c.click_=function(f){
var g=this._attrTarget(f,"opt"),h=a.attr(g,"opt");
if(h=="retry")
{
this.logReset_();
this._msStatus="loading";
a.hasClass(this._moDomDocFrame,"doc_finish")&&a.rmClass(this._moDomDocFrame,"doc_finish");
this._moDomDocFrame.src=this._moDomDocFrame.src;
this._showErr(false);
}
else if(h=="down")
{
this._dom("doc_down").src=a.attr(g,"href");
a.preventDef(f);
}
};
},"Viewer");
QMPreviewer.component("DocumentSkin1",function(c,d){
var e=false;
c.init=function(f){
var g=this;
d.init.call(g,f);
g._moSrollArea=f.oDomContainer;
};
c.uninstall=function(){
var f=this;
if(f._isInstall())
{
f._mnTimer&&clearInterval(f._mnTimer);
f._mnTimer=b;
f._mnCurHeight=0;
d.uninstall.call(f);
f._moSrollArea.onscroll=null;
}
};
c.load_=function(){
var f=this;
d.load_.call(f);
a.browserVer()==6&&setTimeout(function(){
f._moDom.style.zoom=1;
},100);
f._moSrollArea.onscroll=function(){
var g=f._moDomDocFrame.contentWindow;
g.doScrollEvt&&g.doScrollEvt();
};
};
c.resize_=function(){
var h=this,i=h._moVisualRange;
if(i)
{
var j=h._moFileInfo.sName.split(".").pop(),f=(e||{xls:1,xlsx:1,ppt:1,pptx:1}[j])?(h._moDomDocTitle?h._moDomDocTitle.clientHeight:0):0;
var g=calcPos(h._moOperator._moDom);
h._moSrollArea.style.height=document.body.clientHeight-g[0]-g[5]+"px";
h._moDom.style.top=i.nTop+"px";
h._moDom.style.width="100%";
h._moDom.style.left=i.nLeft+"px";
try{
}
catch(k)
{
}
}
};
c.checkScrolling_=function(){
var f=this;
if(!f._mnTimer&&getTop().gbIsIE)
{
f._mnTimer=setInterval(function(){
f.resize_();
},500);
}
};
c._resizeHeight=function(){
var k=this;
if(k._moVisualRange)
{
var g=0,f,j,i,h;
try{
j=k._moDomDocFrame.contentWindow,i=j.document.documentElement,h=j.document.body;
if(!a.S("xlsContainer",j)&&!a.S("slideGuide",j))
{
g=j.getHeight?j.getHeight():a.bodyScroll(j.document,"scrollHeight");
}
}
catch(l)
{
}
!(f=!(k._moVisualRange.nHeight>=g))&&(g=k._moVisualRange.nHeight);
if(k._mnCurHeight!=g)
{
k._moDomDocContainer.style.height=(k._mnCurHeight=g)+"px";
h&&(h.style.overflowY=f?"hidden":"auto");
if(a.browserVer()==6)
{
f&&(i.style.overflowY="hidden");
if(a.S("xlsContainer",j)||a.S("slideGuide",j))
{
k._moDomDocFrame.style.height=k._mnCurHeight+"px";
}
}
}
if(f&&h&&j.loadMorePage&&k._mnScrollTop!=QMPreviewer.getFrameInfo_("scrollTop"))
{
(k._mnScrollTop=QMPreviewer.getFrameInfo_("scrollTop"))+k._moVisualRange.nFullHeight>QMPreviewer.getFrameInfo_("scrollHeight")-100&&j.loadMorePage();
}
}
};
},"Document");
})(QMComAdaptar);
(function(a,b){
QMPreviewer.component("Compress",function(c,d){
c.init=function(e,f){
var g=this;
d.init.call(g,e);
g._moTmpl=(f&&f.oTmpl)||{};
show(g._moDom,false);
a.setClass(g._moDom,"layer_cps");
g._moDom.innerHTML=QMPreviewer.getView(g._moTmpl.sFrame||"compressframe",e);
g._msType="compress";
g._moPath=[];
g._moDomContainer=e.oDomContainer;
g._moNavOpter=g._useComponent("Operator",{sId:g._msId+"_navopt",oDomContainer:g._moDomContainer,bAutoResize:false,oEvents:{fClick:a.funcProxy(g,g._operate),fResizeVisualRange:a.funcProxy(g,g._subVisualRangeResize)}});
g._initEvent(g._moDom,"click");
};
c.destroy=function(){
d.destroy.call(this);
this._moNavOpter.destroy();
this._moNavOpter=this._moOptBtnCfg=this._moPath=this._moDomContainer=b;
};
c.install=function(){
if(!this._isInstall())
{
d.install.apply(this,arguments);
this.resize_();
a.show(this._moDom,true);
this._enterDir(this._moFileInfo);
}
};
c.uninstall=function(){
if(this._isInstall())
{
clearInterval(this._mnTimer);
this._mbIsFirstEnter=false;
this.uninstallFileViewer_();
this._moPath=[];
a.show(this._moDom,false);
d.uninstall.apply(this,arguments);
}
};
c.changeVisualRange=function(){
d.changeVisualRange.apply(this,arguments);
a.isShow(this._moDom)&&this.resize_();
this._isInstall()&&this._moNavOpter.resize();
};
c.back=function(){
if(this._moViewer)
{
!this._moViewer.back()&&this.uninstallFileViewer_();
return true;
}
else if(this._moPath.length>1)
{
this._backDir();
return true;
}
return d.back.apply(this,arguments);
};
c.minimize=function(){
this._moViewer&&this._moViewer.minimize&&this._moViewer.minimize();
};
c.resize_=function(){
var g=this._moVisualRange;
if(g)
{
var f=(g.nWidth<840?g.nWidth:840);
this._moDom.style.top=g.nFullTop;
this._moDom.style.height=g.nFullHeight+"px";
this._moDom.style.width=f+"px";
this._moDom.style.left=g.nLeft+(g.nWidth-f)/2+"px";
try{
this.createLazyLoadPic()();
}
catch(h)
{
}
;
}
};
c.installFileViewer_=function(e){
var f=e.getFileInfo();
this.uninstallFileViewer_();
this._changeBasicOperator();
this._moNavOpter.enable({navbar:{nav:this._moPath[this._moPath.length-1].sName},minibar:{minimize:f.sType=="music"},mainbar:{zoombtn:f.sType=="img"?true:"disable",rotate:f.sType=="img"?true:"disable",next:false,prev:false,breakline:false,list:false,send:false,scan:false,info:false}},{doc:true,img:true}[f.sType]);
this._moViewer=e;
this._moNavOpter.resize();
this._moNavOpter.setFileInfo(a.extend({sName:f.sName},f.oInfo));
this._moViewer.install();
show(this._moDom,false);
f.sName&&this._moViewer._moOperator.setTitle&&this._moViewer._moOperator.setTitle(f.sName);
};
c.uninstallFileViewer_=function(){
if(this._moViewer)
{
show(this._moDom,true);
this._revertBasicOperator();
this._moNavOpter.enable(false);
this._moViewer.destroy();
this._moViewer=b;
}
};
c.drawTitle_=function(){
if(this._moPath.length<2)
{
a.rmClass(this._moDom,"cps_shownav");
}
else{
a.addClass(this._moDom,"cps_shownav");
this._dom("navtxt").innerHTML=a.htmlEncode(this._moPath[this._moPath.length-2].sName);
}
this._dom("title").innerHTML=a.htmlEncode(this._moPath[this._moPath.length-1].sName);
};
c._subVisualRangeResize=function(e){
this._moViewer&&this._moViewer.changeVisualRange(this._moNavOpter.getVisualRange());
};
c._dataTimer=function(e){
var h=this;
if(e===false)
{
clearInterval(h._mnTimer);
if(h._mnLoadPercent<100)
{
h._mnTimer=setInterval(function(){
if(h._mnLoadPercent>99)
{
clearInterval(h._mnTimer);
h._hideTip();
}
else{
h._showTip("percent",++h._mnLoadPercent);
}
},10);
}
}
else if(this._moFileInfo.sBytesize)
{
var g=+new Date(),f=+this._moFileInfo.sBytesize/((200*1024*1024)/(30*1000));
h._showTip("percent",0);
this._mnTimer=setInterval(function(){
h._showTip("percent",h._mnLoadPercent=Math.min(99,Math.floor((+new Date()-g)/f*100)));
},200);
}
};
c._data=function(e,f){
var h=e&&a.parseJson(f),g=this._moPath[this._moPath.length-1];
h&&h.oContent&&(g.oContent=h.oContent);
this._drawCtt();
this._hideTip();
this._dataTimer(false);
};
c._drawCtt=function(e){
var h=this,f=h._moPath[h._moPath.length-1].oContent;
h._dom("ctt").innerHTML=e=="clear"?"":QMPreviewer.getView(h._moTmpl.sContent||"compresscontent",a.extend({oJs:a,sId:h._msId},h._moPath[h._moPath.length-1]));
if(e!="clear")
{
if(h._mbIsFirstEnter)
{
if(f)
{
h._msStatus="loaded";
h._mbIsFirstEnter=false;
h._operator().hideBar();
h.log_(1);
}
else{
h.log_(0);
}
}
if(f=="encryption"||f=="pwderror")
{
var g=h._dom("pwd");
g.focus();
a.addEvent(g,"keydown",function(i){
if(i.keyCode==13)
{
h._decrypt();
}
});
}
h._lazyLoadPic=h.createLazyLoadPic();
h._dom("ctt").parentNode.onscroll=h._lazyLoadPic;
;h._lazyLoadPic();
}
};
c.createLazyLoadPic=function(){
var k=this,e=k._dom("ctt"),h=a.calcPos(e),f=e.parentNode,g=a.calcPos(f),i=k._moDom,j=a.finds("li.cps_column",i);
_oItem=j[0],_oItemPos=a.calcPos(_oItem),_nRowNum=Math.ceil(window.document.body.clientHeight/_oItemPos[5]),_nColumnNum=Math.floor(h[4]/_oItemPos[4]);
return a.funcProxy(k,function(){
if(k._mnLazyLoadTimer)
{
clearTimeout(k._mnLazyLoadTimer);
}
var o,n=Math.floor(f.scrollTop/_oItemPos[4]),m=n*_nColumnNum,l=m+_nRowNum*_nColumnNum;
k._mnLazyLoadTimer=setTimeout(function(){
a.E(j.slice(m,l),function(r,p,q){
o=a.finds("img[name='preview_unloaded_img']",r)[0];
if(a.contain(i,o)&&a.attr(o,"tmpsrc"))
{
var s=a.attr(o,"tmpsrc");
if(s)
{
o.src=s;
o.removeAttribute("tmpsrc");
}
o=s=b;
}
});
},300);
});
};
c._readDir=function(){
var e=this._moPath[this._moPath.length-1],f=e.sUrl;
e.pwd&&(f+="&pwd="+e.pwd);
this.drawTitle_();
if(!e.oContent)
{
this._showTip("loading");
this._drawCtt("clear");
this._dataTimer(true);
a.get(f,{bGlobal:true,nTimeout:120000,oncomplete:a.funcProxy(this,this._data)});
}
else{
this._drawCtt();
}
};
c._enterDir=function(e){
this._moPath.length==0&&(this._mbIsFirstEnter=true);
this._moPath.push(e);
this._readDir();
};
c._backDir=function(){
this._moPath.pop();
this._readDir();
};
c._viewFile=function(e){
var h=this._getComType(e.sUrl?e.sType:"other");
if(e.sType=="doc"&&e.sUrl)
{
var f={redirect:true,t:"attachments_content",s:"yozo",fromattach:"1"},g=new RegExp("(.*)(&curfile=)(.*?)\\&","gi");
g.test(e.sUrl)&&(f.filename=RegExp.$3);
e.sUrl=a.cookQueryString(e.sUrl,f);
}
e.pwd&&(e.sUrl+="&pwd="+e.pwd);
this.installFileViewer_(this._useComponent(h,{sId:this._msId+"_"+h,oTip:this._moTip,bFromCompress:true,oOperator:this._moNavOpter,oDomContainer:this._moDomContainer,oVisualRange:this._moVisualRange,oFileInfo:e}));
};
c._changeBasicOperator=function(){
if(!this._moOptBtnCfg)
{
this._moOptBtnCfg=this._operator().getBtnCfg();
}
this._operator().enable(false);
};
c._revertBasicOperator=function(){
if(this._moOptBtnCfg)
{
this._operator().enable(this._moOptBtnCfg,true).resize().hideBar();
}
};
c._operate=function(e,f){
switch(e)
{case "back":
this.back();
break;
case "close":
case "minimize":
case "down":
this._operator().operate(e,f||this._moViewer.getFileInfo());
break;
case "rotate_r":
case "rotate_l":
this._moViewer.rotate&&this._moViewer.rotate(e);
break;
case "zoom":
this._moViewer._toggleMode&&this._moViewer._toggleMode();
break;
}
};
c._decrypt=function(){
var g=this,f=g._dom("pwd"),h=f.value,e=this._moPath[this._moPath.length-1],i=e.sUrl+"&pwd="+h;
if(h)
{
a.show(g._dom("pwd_tip"),false);
e.pwd=h;
this._showTip("loading");
this._drawCtt("clear");
this._dataTimer(true);
a.get(i,{bGlobal:true,nTimeout:120000,oncomplete:a.funcProxy(this,this._data)});
}
else{
a.show(g._dom("pwd_tip"),true);
a.show(g._dom("pwd_err"),false);
f.focus();
}
};
c.click_=function(e){
var g=this._attrTarget(e,"opt");
switch(g&&a.attr(g,"opt"))
{case "retry":
this._readDir();
case "cps_read":
var f=this._moPath[this._moPath.length-1],h=f.oContent[a.attr(g,"idx")];
f.pwd&&(h.pwd=f.pwd);
h&&h.sType=="dir"?this._enterDir(h):this._viewFile(h);
break;
case "cps_back":
this.back();
break;
case "cps_pwd":
this._decrypt();
break;
}
};
},"Viewer");
QMPreviewer.component("CompressSkin1",function(c,d){
c.init=function(e){
d.init.call(this,e,{oTmpl:{sFrame:"compressframe_skin1"}});
this._moLayerMask=this._useComponent("Mask",{sId:this._msId+"_cpsmask",oDomContainer:this._moDomContainer,bIsLayerLever:true,oEvents:{fClick:a.funcProxy(this,this.back)}});
this._moLayerMask.hide();
};
c.destroy=function(){
this._moLayerMask.destroy();
this._moLayerMask=b;
d.destroy.call(this);
};
c.resize_=function(){
var f=this._moVisualRange;
if(f)
{
this._moDom.style.top=f.nTop+"px";
this._moDom.style.height=f.nHeight+"px";
this._moDom.style.width=f.nWidth+"px";
this._moDom.style.left=f.nLeft+"px";
try{
this.createLazyLoadPic()();
}
catch(g)
{
}
;
}
};
c.installFileViewer_=function(e){
var f=e.getFileInfo();
this.uninstallFileViewer_();
this._moNavOpter.enable({navbar:{nav:this._moPath[this._moPath.length-1].sName},minibar:false,mainbar:{zoombtn:f.sType=="img"?true:"disable",rotate:f.sType=="img"?true:"disable",next:false,prev:false,breakline:false,list:false,send:false,scan:false,info:false}},{doc:true,img:true}[f.sType]);
this._moViewer=e;
this._moNavOpter.resize();
this._moNavOpter.setFileInfo(a.extend({sName:f.sName},f.oInfo));
this._moLayerMask.show();
this._moViewer.install();
f.sName&&this._moViewer._moOperator.setTitle&&this._moViewer._moOperator.setTitle(f.sName);
};
c.uninstallFileViewer_=function(){
if(this._moViewer)
{
this._moLayerMask.hide();
}
d.uninstallFileViewer_.call(this);
};
c.drawTitle_=function(){
if(this._moPath.length<2)
{
a.rmClass(this._moDom,"cps_shownav");
}
else{
a.addClass(this._moDom,"cps_shownav");
this._dom("navtxt").innerHTML=a.htmlEncode(this._moPath[this._moPath.length-2].sName);
}
this._dom("title").innerHTML=a.htmlEncode(this._moPath[this._moPath.length-1].sName);
};
},"Compress");
})(QMComAdaptar);
(function(a,b){
QMPreviewer.component("Image",function(c,d){
c.init=function(e,f){
var i=this,h=parseInt(e.oFileInfo.sWidth)||0,g=parseInt(e.oFileInfo.sHeight)||0;
d.init.call(i,e);
a.posHide(i._moDom);
i._moDom.className="layer_img";
i._moDom.innerHTML=QMPreviewer.getView((f&&f.sTmpl||"img"),e);
a.insertHTML(i._moDom,"afterEnd",a.T(['<div class="zoom_percentage" style="z-Index:1;display:none" id="$sId$_zoom">\u7F29\u653E\u6BD4\u4F8B </div>']).replace(e));
i._msType="image";
i._mnRangeDelta=isNaN((f||{}).nRangeDelta)?40:f.nRangeDelta;
i._mnRangeDef=isNaN((f||{}).nRangeDef)?20:f.nRangeDef;
e.oDomContainer.appendChild(i._moDomBar=i._dom("bar"));
i._moDomErrNotExist=i._dom("err_notexist");
a.posHide(i._moDomLoad=i._dom("load"));
a.posHide(i._moDomFail=i._dom("fail"));
a.posHide(i._moDomImg=i._dom("img"));
a.posHide(i._moDomThumb=i._dom("thumb"));
h&&g&&(i._moImgSize={nWidth:h,nHeight:g});
i._mbIsZoomMode=false;
i._initEvent(i._moDom,"mouseover|mouseout|mousedown|mousemove|dblclick|mousewheel|DOMMouseScroll");
i._initEvent(i._moDomBar,"click|mousemove|mouseout");
};
c.destroy=function(){
d.destroy.call(this);
this._moDomBar.parentNode.removeChild(this._moDomBar);
this._mfMouseUpProxy=this._mfMouseMoveProxy=this._moDomErrNotExist=this._moDomBar=this._moDomCurShow=this._moDomLoad=this._moDomFail=this._moDomThumb=this._moDomImg=b;
};
c.install=function(){
if(!this._isInstall())
{
var e=this;
d.install.apply(this,arguments);
this._mCursorX=-1;
if(!this._showImgOrFail(this._imgSize()))
{
this._showLoading();
this._setDetect();
}
}
};
c.uninstall=function(){
if(this._isInstall())
{
this._changeMode(false);
this._hideBar(true);
this._clearDetect();
this._moDom.nAngle&&!(this._mbIsRotate=false)&&this._rotate(this._moDom,-1*this._moDom.nAngle);
this._mbIsAllowTransition=false;
a.rmClass(this._moDom,"layer_img_ts");
a.posHide(this._moDom);
d.uninstall.apply(this,arguments);
}
};
c.back=function(){
if(this._mbIsZoomMode)
{
this._toggleMode();
return true;
}
return d.back.apply(this,arguments);
};
c.changeVisualRange=function(e){
d.changeVisualRange.call(this,e);
!this._mbIsZoomMode&&a.isPosShow(this._moDom)&&!this._showImgOrFail(this._imgSize())&&this._showLoading();
};
c.showLoadTip_=function(e){
this._showTip("loading",e);
};
c._imgSize=function(){
var e=this._calcImgSize(this._moDomImg);
if(e)
{
return e;
}
if(this._moImgSize&&this._isImgReady(this._moDomThumb))
{
return this._moImgSize;
}
};
c._clearDetect=function(){
if(this._mnTimer)
{
clearTimeout(this._mnTimer);
this._mnTimer=0;
}
};
c._setDetect=function(){
var e=this;
this._mnTimer=setTimeout(function(){
e._showImgOrFail(e._imgSize())?e._clearDetect():e._setDetect();
},300);
};
c._show=function(g,f,e){
var l=this;
if(!(l._mbIsFail)&&e)
{
a.show(l._dom("zoom"),true);
l._dom("zoom").innerHTML="\u7F29\u653E\u6BD4\u4F8B "+l._mnZoom+"%";
setTimeout(function(){
l._showByAnimation(l._dom("zoom"),false);
},500);
}
var m=this._moVisualRange,i=this._calcBorder(),j=Math.floor(m.nLeft+(m.nWidth-g-i)/2),k=Math.floor(m.nTop+(m.nHeight-f-i)/2);
this._moDom.style.width=g+"px";
this._moDom.style.height=f+"px";
this._mbIsAllowTransition&&a.addClass(this._moDom,"layer_img_ts");
var h=!this._mbIsRotate;
_nBottom=m.nFullHeight-(h?k:Math.floor(m.nTop+(m.nHeight-g-i)/2))-(h?f:g)-(i/2);
this._moDomBar.style.width=(h?g:f)+"px";
this._moDomBar.style.left=(h?j:Math.floor(m.nLeft+(m.nWidth-f-i)/2))+(i/2)+"px";
this._moDomBar.style.bottom=(_nBottom>0?_nBottom:0)+"px";
a.posShow(this._moDom,j,k);
};
c._showByAnimation=function(f,e){
qmAnimation.play(f,{from:e?0.5:1,to:e?1:0.5,speed:'slow',onaction:function(g){
a.show(f,true);
setOpacity(f,g);
},oncomplete:function(){
show(f,e);
setOpacity(f,!e?1:0.5);
gbIsIE&&(f.style.filter='');
}});
};
c._showLoading=function(){
a.posHide(this._moDomCurShow);
this._moDomCurShow=this._moDomLoad;
a.isShow(this._moDomLoad)&&this._show(parseInt(a.getStyle(this._moDomLoad,"width")),parseInt(a.getStyle(this._moDomLoad,"height")));
this.showLoadTip_(this._moFileInfo.sName);
};
c._showFail=function(){
var e=this;
a.posHide(e._moDomCurShow);
a.posShow(e._moDomCurShow=e._moDomFail);
a.isShow(e._moDomFail)&&e._show(parseInt(a.getStyle(e._moDomFail,"width")),parseInt(a.getStyle(e._moDomFail,"height")));
e._hideTip();
e._mbIsFail=true;
if(e._moFileInfo.bIsTimeout==1)
{
a.show(e._moDomErrNotExist,true);
}
a.addClass(e._moOperator._dom("zoombtn"),"disable");
a.addClass(e._moOperator._dom("rotate"),"disable");
};
c._showImg=function(e){
a.posHide(this._moDomCurShow);
a.addClass(this._moDom,"img_show");
a.posShow(this._moDomThumb);
a.posShow(this._moDomImg);
this._fitImg(e);
this._hideTip();
this._mbIsAllowTransition=true;
};
c._showImgOrFail=function(e){
if(e)
{
if(e.nWidth>0)
{
this._msStatus="loaded";
this._showImg(e);
this.log_(1);
}
else{
this._showFail();
this.log_(0);
}
return true;
}
};
c._fitImg=function(e){
var o=this,f=this._calcBorder(),p=this._moVisualRange,m=(p.nWidth-this._mnRangeDelta-f)||this._mnRangeDef,l=(p.nHeight-this._mnRangeDelta-f)||this._mnRangeDef,i=this._mbIsRotate?l:m,h=this._mbIsRotate?m:l,k=e.nWidth,j=e.nHeight,n=k/i,g=j/h;
if(n>1||g>1)
{
if(n>g)
{
this._mnZoom=Math.round(100/(k/i));
;k=i;
j=Math.floor(j/n);
}
else{
this._mnZoom=Math.round(100/(j/h));
;k=Math.floor(k/g);
j=h;
}
}
else{
this._mnZoom=100;
}
o._mbIsFail=false;
o._show(k,j);
};
c._revertImg=function(e){
this._mnZoom=100;
this._show(e.nWidth,e.nHeight);
};
c._calcBorder=function(){
return 2*(parseInt(a.getStyle(this._moDom,"borderTopWidth"))||0);
};
c._calcImgSize=function(e){
if(a.attr(e,"err"))
{
return {nWidth:-1,nHeight:-1};
}
else if(e)
{
var g,f;
if(!(g=e.naturalWidth||e.width))
{
a.show(e,true);
a.show(this._moDom,true);
g=e.naturalWidth||e.width;
f=e.naturalHeight||e.height;
a.show(e,false);
a.show(this._moDom,false);
}
else{
g=e.naturalWidth||e.width;
f=e.naturalHeight||e.height;
}
if(a.attr(e,"loaded")||Math.min(g,f)>100)
{
if(!e.naturalWidth)
{
e.naturalWidth=g;
e.naturalHeight=f;
}
return {nWidth:g,nHeight:f};
}
}
};
c._isImgReady=function(e){
return a.attr(e,"loaded")||(this._calcImgSize(e)||{}).nWidth>0;
};
c._toggleMode=function(){
this._changeMode(!this._mbIsZoomMode);
};
c._changeMode=function(e){
if(e!=this._mbIsZoomMode)
{
var f=this._operator()._dom("zoombtn");
if(this._mbIsZoomMode=e)
{
a.addClass(this._moDom,"move");
this._moOptBtnCfg=this._operator().getBtnCfg();
this._revertImg(this._imgSize());
a.addClass(f,a.attr(f,"zs_cls"));
this._hideBar(true);
setTimeout(a.funcProxy(this,this._showBar));
}
else{
this._mnRotateTime=+new Date();
this._hideBar(true);
a.rmClass(this._moDom,"move");
this._fitImg(this._imgSize());
a.rmClass(f,a.attr(f,"zs_cls"));
}
}
};
c._showBar=function(e){
};
c._hideBar=function(e){
};
c._hideBarNotZoomMode=function(){
!this._mbIsZoomMode&&this._hideBar();
};
c._delayHideBar=function(f,e){
this._clearHideBarTimer()._mnHideBarTimer=setTimeout(a.funcProxy(this,e?this._hideBarNotZoomMode:this._hideBar),f||500);
};
c._clearHideBarTimer=function(){
if(this._mnHideBarTimer)
{
clearTimeout(this._mnHideBarTimer);
this._mnHideBarTimer=0;
}
return this;
};
c._rotate=function(f,e){
var g=f.nAngle=((f.nAngle||0)+e);
if(document.addEventListener)
{
f.style.cssText=f.style.cssText.replace(/-[a-z]+-transform:[\s]?rotate[^;]+;/g,"")+"-webkit-transform:rotate("+g+"deg);"+"-moz-transform:rotate("+g+"deg);"+"-o-transform:rotate("+g+"deg);"+"-ms-transform:rotate("+g+"deg);";
}
else{
var g=g%360,i=g>=0?Math.PI*g/180:Math.PI*(360+g)/180,h=Math.cos(i),j=Math.sin(i);
f.style.filter="progid:DXImageTransform.Microsoft.Matrix(M11="+h+",M12="+(-j)+",M21="+j+",M22="+h+",SizingMethod='auto expand')";
if(g%180==0)
{
a.delEvent(f,"propertychange",this._adjustPosForMsRotate);
f.style.marginLeft=f.style.marginTop=0;
}
else{
this._adjustPosForMsRotate({srcElement:f,propertyName:"style.height"});
a.addEvent(f,"propertychange",this._adjustPosForMsRotate);
}
}
};
c._adjustPosForMsRotate=function(e){
var f=e.srcElement;
if({"style.height":1}[e.propertyName])
{
f.style.marginLeft=(f.clientWidth-f.clientHeight)/2+"px";
f.style.marginTop=(f.clientHeight-f.clientWidth)/2+"px";
}
};
c.mouseover_=function(e){
};
c.mousemove_=function(e){
var f=e.x||e.pageX,g=e.y||e.pageY;
if(this._mCursorX!=-1)
{
if(Math.max(Math.abs(this._mCursorX-f),Math.abs(this._mCursorY-g))>5&&(new Date()-(this._mnRotateTime||0)>200))
{
this._showBar();
this._delayHideBar(1000,true);
}
a.contain(this._moDomBar,a.relatedTarget(e))&&this._clearHideBarTimer();
}
this._mCursorX=f;
this._mCursorY=g;
};
c.mouseout_=function(e){
var f=a.relatedTarget(e);
!a.contain(this._moDom,f)&&!a.contain(this._moDomBar,f)&&this._delayHideBar();
};
c.mousedown_=function(e){
this._moMovingInfo={_oDomCapture:this._moDom.setCapture?this._moDom:window,_nMouseX:e.clientX,_nMouseY:e.clientY,_nDomX:parseInt(a.getStyle(this._moDom,"left")),_nDomY:parseInt(a.getStyle(this._moDom,"top"))};
a.rmClass(this._moDom,"layer_img_ts");
a.addEvent(this._moMovingInfo._oDomCapture,"mouseup",this._mfMouseUpProxy||(this._mfMouseUpProxy=a.funcProxy(this,this._mouseup)));
a.addEvent(this._moMovingInfo._oDomCapture,"mousemove",this._mfMouseMoveProxy||(this._mfMouseMoveProxy=a.funcProxy(this,this._mousemove)));
if(this._moMovingInfo._oDomCapture.setCapture)
{
this._moMovingInfo._oDomCapture.setCapture();
a.addEvent(this._moMovingInfo._oDomCapture,"losecapture",this._mfMouseUpProxy);
}
else{
captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
a.addEvent(this._moMovingInfo._oDomCapture,'blur',this._mfMouseUpProxy);
}
a.preventDef(e);
a.stopPropagation(e);
};
c._mousemove=function(e,f){
if(this._mbIsFail)
{
return;
}
var g=this._moMovingInfo||f;
if(g)
{
a.posShow(this._moDom,e.clientX-g._nMouseX+g._nDomX,e.clientY-g._nMouseY+g._nDomY);
}
};
c._mouseup=function(e){
if(this._moMovingInfo)
{
var f=this._moMovingInfo;
this._moMovingInfo=b;
if(f._oDomCapture.releaseCapture)
{
f._oDomCapture.releaseCapture();
a.delEvent(f._oDomCapture,"losecapture",this._mfMouseUpProxy);
}
else{
releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP);
a.delEvent(f._oDomCapture,'blur',this._mfMouseUpProxy);
}
e&&this._mousemove(e,f);
a.addClass(this._moDom,"layer_img_ts");
}
};
c.click_=function(e){
var f=this._attrTarget(e,"opt"),g=f&&a.attr(f,"opt");
switch(g)
{case "rotate_r":
case "rotate_l":
this._mbIsRotate=!this._mbIsRotate;
a.addClass(this._moDom,"layer_img_ts");
this._hideBar(true);
this._mnRotateTime=+new Date();
this._rotate(this._moDom,g=="rotate_r"?90:-90);
break;
case "zoom":
this._toggleMode();
break;
}
};
c.rotate=function(e){
this._mbIsRotate=!this._mbIsRotate;
a.addClass(this._moDom,"layer_img_ts");
this._hideBar(true);
this._mnRotateTime=+new Date();
this._rotate(this._moDom,e=="rotate_r"?90:-90);
};
c.dblclick_=function(e){
if(this._mbIsFail)
{
return;
}
this._toggleMode();
};
c.mousewheel_=function(e){
a.preventDef(e);
if(this._mbIsFail)
{
return;
}
var l=this._moDom,k=this._moDomImg,g=k.naturalHeight||k.height||0,i=k.naturalWidth||k.width||0,j=this._mnZoom,f=j;
if(!k.naturalHeight)
{
k.naturalHeight=g;
k.naturalWidth=i;
}
var h=typeof (e.wheelDelta)=="undefined"?-e.detail:e.wheelDelta;
this._mnZoom=(j+=Math.round(j*(h>0?0.1:-0.1)));
if((f==500&&j==500)||(f==5&&j==5))
{
return;
}
if(j>500)
{
this._mnZoom=j=500;
}
else if(j<5)
{
this._mnZoom=j=5;
}
this._show(i*j/100,g*j/100,true);
getTop().LogKV("image|preivew|mousewheel|"+(h>0?"up":"down"));
this._operator().hideBar();
};
c.DOMMouseScroll_=function(e){
a.preventDef(e);
this.mousewheel_(e);
};
},"Viewer");
QMPreviewer.component("ImageSkin1",function(c,d){
c.init=function(e){
d.init.call(this,e,{sTmpl:"img_skin1",nRangeDelta:0,nRangeDef:0});
};
c.showLoadTip_=function(e){
this._showTip("loading");
};
c._calcBorder=function(){
return 0;
};
},"Image");
})(QMComAdaptar);
(function(a,b){
QMPreviewer.component("Music",function(c,d){
var e=function(f){
var h=this;
if(typeof f.length=="undefined")
{
return ({title:f.sName,autoplay:true,fileType:f.sSuffix,url:f.sUrl,onsuccess:function(){
h.log_(1);
},onerror:function(){
h.log_(0);
}});
}
else{
var g=[];
for(var j=0;j<f.length;j++)
{
g.push({title:f[j].sName,autoplay:true,fileType:f[j].sSuffix,url:f[j].sUrl,onsuccess:function(){
h.log_(1);
},onerror:function(){
h.log_(0);
}});
}
return g;
}
};
c.init=function(f){
var g=this;
d.init.call(g,f);
g._moDom.className="layer_music";
g._moDom.innerHTML=QMPreviewer.getView("musicframe",f);
g._moDomMusicContainer=g._dom("music_container");
g._moDomPlaylist=g._dom("playlist");
g._moDomMusic=g._dom("music_player");
g._msType="music";
g._moCfg=f;
a.posHide(g._moDom);
};
c.destroy=function(){
d.destroy.call(this);
this._mbIsMinimize=this._moPlayer=this._moDomMusicContainer=this._moDomMusic=this._moDomPlaylist=this._moCfg=b;
};
c.install=function(){
if(!this._isInstall())
{
d.install.call(this);
this._show();
}
};
c.uninstall=function(){
if(this._isInstall())
{
d.uninstall.call(this);
this._hide();
}
};
c.changeVisualRange=function(f){
d.changeVisualRange.call(this,f);
this._resize();
};
c.minimize=function(){
this._mbIsMinimize=true;
};
c.key=function(f){
var g=this;
if(f==37||f==38)
{
if(g._moPlayer)
{
g._moPlayer.prev();
}
}
else if(f==39||f==40)
{
if(g._moPlayer)
{
g._moPlayer.next();
}
}
else if(f==13)
{
}
};
c._resize=function(){
var f=this._moVisualRange;
if(f)
{
this._moDomMusicContainer.style.top=(Math.max(0,f.nHeight-this._moDomMusicContainer.clientHeight)/2)+"px";
this._moDomMusicContainer.style.left=f.nLeft+(f.nWidth-this._moDomMusicContainer.clientWidth)/2+"px";
}
};
c._show=function(){
a.posShow(this._moDom);
this._addPlayer();
};
c._addPlayer=function(){
var i=this,g=i._moCfg,j="gplayer_kernel",k="gplayer_container",h={sId:"qmPreViewERaudio",oContainer:this._moDomMusic,oSkinTemplate:QMPreviewer.getTemplate("musicskin")};
if(g.oFileList)
{
h.oInfoList=e.call(i,g.oFileList);
h.oPlayList={nType:1,oContainer:this._moDomPlaylist};
}
else{
h.oInfo=e.call(i,g.oFileInfo);
}
i._showTip("loading");
a.getPlayer(function(l){
var m=l.initKernel({sId:j,oContainer:f(),onShowPlaylist:function(){
}}),n=l.initSkin({sId:j,sSkin:"Global",oContainer:a.S(k)});
i._moPlayer=l;
l.init({oSkin:n,oKernel:m});
l.init({oSkin:l.initSkin(h),oKernel:h.oInfoList?m.setInfoList(h.oInfoList):m.setInfo(h.oInfo)});
i._hideTip();
setTimeout(function(){
i._resize();
},20);
},function(){
i._showTip("err","\u64AD\u653E\u5668\u52A0\u8F7D\u5931\u8D25");
this.log_(0);
});
function f()
{
var m=j+"_dom";
if(a.S(m))
{
return a.S(m);
}
else{
var l=document.createElement("div");
l.id=m;
l.style.cssText="position:absolute;left:-100000px;";
document.body.appendChild(l);
return l;
}
}
;
};
c._rmPlayer=function(){
var f=this;
a.getPlayer(function(){
f._moPlayer.delSkinById("qmPreViewERaudio");
!f._mbIsMinimize&&f._moPlayer.pause();
});
};
c._hide=function(){
a.posHide(this._moDom);
this._rmPlayer();
};
},"Viewer");
})(QMComAdaptar);
(function(a,b){
QMPreviewer.component("Other",function(c,d){
c.init=function(e){
var f=this;
d.init.call(f,e);
a.posHide(f._moDom);
f._moDom.className="layer_other";
f._moDom.innerHTML=QMPreviewer.getView("other",e);
f._msType="other";
};
c.install=function(){
d.install.apply(this,arguments);
this._show();
};
c.uninstall=function(){
d.uninstall.apply(this,arguments);
this._hide();
};
c._show=function(){
var g=this._moVisualRange,e,f;
if(!(this._moDom.clientWidth))
{
a.show(this._moDom,true);
f=(this._moDom.clientWidth||0);
e=(this._moDom.clientHeight||0);
a.show(this._moDom,false);
}
else{
f=(this._moDom.clientWidth||0);
e=(this._moDom.clientHeight||0);
}
a.posShow(this._moDom,Math.floor(g.nLeft+(g.nWidth-f)/2),Math.floor((g.nHeight-e)/2));
this.log_(1);
};
c._hide=function(){
a.posHide(this._moDom);
};
c.changeVisualRange=function(){
d.changeVisualRange.apply(this,arguments);
a.isPosShow(this._moDom)&&this._show();
};
},"Viewer");
QMPreviewer.component("OtherSkin1",function(c,d){
c.init=function(e){
var f=this;
d.init.call(f,e);
a.posHide(f._moDom);
f._moDom.className="layer_other";
f._moDom.innerHTML=QMPreviewer.getView("other_skin1",e);
f._msType="other";
};
},"Other");
})(QMComAdaptar);
(function(a,b){
QMPreviewer.component("Video",function(d,c){
var e=function(f){
var h=this;
if(typeof f.length=="undefined")
{
return ({title:f.sName,autoplay:true,fileType:f.sSuffix,url:f.sUrl,hash:f.sHash,onsuccess:function(){
h.log_(1);
},onerror:function(){
h.log_(0);
}});
}
else{
var g=[];
for(var j=0;j<f.length;j++)
{
g.push({title:f[j].sName,autoplay:true,fileType:f[j].sSuffix,url:f[j].sUrl,hash:f[j].sHash,onsuccess:function(){
h.log_(1);
},onerror:function(){
h.log_(0);
}});
}
return g;
}
};
d.init=function(f){
var g=this;
c.init.call(g,f);
g._moDom.className="layer_music";
g._moDom.innerHTML=QMPreviewer.getView("videoframe",f);
g._moDomMusicContainer=g._dom("video_container");
g._moDomKernel=g._dom("kernel");
g._moDomSkin=g._dom("skin");
g._moDomPlaylist=g._dom("playlist");
g._msType="video";
g._moCfg=f;
a.posHide(g._moDom);
};
d.destroy=function(){
c.destroy.call(this);
this._moPlayer=this._moDomMusicContainer=this._moDomKernel=this._moDomSkin=this._moDomPlaylist=this._moCfg=b;
};
d.install=function(){
if(!this._isInstall())
{
c.install.call(this);
this._resize();
this._show();
}
};
d.uninstall=function(){
if(this._isInstall())
{
c.uninstall.call(this);
this._hide();
}
};
d.changeVisualRange=function(f){
c.changeVisualRange.call(this,f);
this._resize();
};
d.key=function(f){
var g=this;
if(f==37||f==38)
{
if(g._moPlayer)
{
g._moPlayer.prev();
}
}
else if(f==39||f==40)
{
if(g._moPlayer)
{
g._moPlayer.next();
}
}
else if(f==13)
{
}
};
d._resize=function(){
var f=this._moVisualRange;
if(f)
{
this._moDomMusicContainer.style.top=Math.max(0,f.nHeight-this._moDomMusicContainer.clientHeight)/2+"px";
this._moDomMusicContainer.style.left=f.nLeft+(f.nWidth-this._moDomMusicContainer.clientWidth)/2+"px";
}
};
d._show=function(){
this._addPlayer();
};
d._addPlayer=function(){
var g=this,f=g._moCfg,h=QMPreviewer.getTemplate("videoskin");
g._showTip("loading");
a.getPlayer(function(i){
g._moPlayer=i;
g._hideTip();
if(f.oFileList)
{
i.init({oSkin:i.initSkin({sId:"qmPreViewERvidio",oContainer:g._moDomSkin,oSkinTemplate:h,oPlayList:{nType:1,oContainer:g._moDomPlaylist}}),oKernel:i.initKernel({sId:"qmPreViewERvidio",oContainer:g._moDomKernel,oInfoList:e.call(g,f.oFileList)})});
}
else{
i.init({oSkin:i.initSkin({sId:"qmPreViewERvidio",oContainer:g._moDomSkin,oSkinTemplate:h}),oKernel:i.initKernel({sId:"qmPreViewERvidio",oContainer:g._moDomKernel,oInfo:e.call(g,f.oFileInfo)})});
}
a.posShow(g._moDom);
g._resize();
},function(){
g._showTip("err","\u64AD\u653E\u5668\u52A0\u8F7D\u5931\u8D25");
this.log_(0);
});
};
d._rmPlayer=function(){
var f=this;
a.getPlayer(function(){
f._moPlayer.delUIById("qmPreViewERvidio");
});
};
d._hide=function(){
a.posHide(this._moDom);
this._rmPlayer();
};
},"Viewer");
})(QMComAdaptar);
