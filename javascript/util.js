// JavaScript Document

document.domain = "mdeduco.com";

var strInitial	= 'AP';
var currentOS;
var isMobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
//isMobile=true;
if (isMobile) {
	// 유저에이전트를 불러와서 OS를 구분합니다.
	var userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.search("android") > -1)
		currentOS = "android";
	else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1)
				|| (userAgent.search("ipad") > -1))
		currentOS = "ios";
	else
		currentOS = "else";
} else {
	// 모바일이 아닐 때
	currentOS = "nomobile";

}
var nScale=1;
var nScale2=1;
var isOldWidth;

var thisURL = document.location.href.split("?")[0].split("#")[0];
var thisURLArr = thisURL.split("/")
var thisChapNum = parseInt(thisURLArr[thisURLArr.length-2],10);
var isCurrentModule="MO1";

function _doModuleChk(){
	if(thisChapNum>=1 && thisChapNum<=8){
		isCurrentModule="MO1";
	}else if(thisChapNum>=9 && thisChapNum<=16){
		isCurrentModule="MO2";
	}else if(thisChapNum>=17 && thisChapNum<=24){
		isCurrentModule="MO3";
	}else if(thisChapNum>=25 && thisChapNum<=32){
		isCurrentModule="MO4";
	}
	$("div").addClass(isCurrentModule);
	$("button").addClass(isCurrentModule);
	$("ul").addClass(isCurrentModule);
	$("ul").find("li").addClass(isCurrentModule);
	$("span").addClass(isCurrentModule);
	$("#nar_close").addClass(isCurrentModule);
}

function _ReturnModuleChk(){
	if(thisChapNum>=1 && thisChapNum<=8){
		isCurrentModule="MO1";
	}else if(thisChapNum>=9 && thisChapNum<=16){
		isCurrentModule="MO2";
	}else if(thisChapNum>=17 && thisChapNum<=24){
		isCurrentModule="MO3";
	}else if(thisChapNum>=25 && thisChapNum<=32){
		isCurrentModule="MO4";
	}
	return isCurrentModule;
}


function _doMobileSizeChk(){
		if(isMobile) {
			
			_doMobileDesign();
			
			$(window).resize(function() {	resizeScale();	});
		
			
			
			resizeScale();
		}

}

function resizeScale() {
	if($(window).width()==isOldWidth){
		return;
	}
	//if ($(window).width() < 1120) {
		var $content = $("body");
		nScale = 1;
		nScale2 = 1;
		switch (window.orientation) {
			case 0 :					
				nScale = Number($(window).width()) / 1000;
				// nScale = Number(screen.width) / 1000;
				nScale2 = Number($(window).height()) / 597;
				break;
			case 90 : case -90 :
				nScale = Number($(window).height()) / 1000;
				nScale2 = Number($(window).width()) / 597;
				// nScale = Number(screen.height) / 720;
				break;
		}
		// alert(nScale);
		//$content.css({ transformOrigin: "0% 0%", transform: "scale(" + nScale+","+nScale2 + ")" });
	//}

	var $content = $("body");
	isOldWidth = $(window).width();
	//var 
	//nScale = 0.7//test
	//alert(window.orientation+" :: "+nScale+" , "+nScale2)
	
	
	if(isMobile) {
	
	var tmpML = window.screen.availWidth/2 - $content.width()/2;
    var tmpLR =500 * nScale - 10;
	//alert($(window).width()+" / "+$content.width()+" // isOldWidth = "+isOldWidth+"///"+tmpLR+" :: "+nScale+"/"+$("#container").offset().top+"/"+$("#container").offset().right+" >> "+$("#container").offset().left+" /// "+$(window).outerWidth());
		
		var tmpContainer = $("#container");
		//alert(tmpContainer.css('marginLeft')+" / "+tmpLR)
		var tmpLL1 = 1000 * nScale2;
		var tmpLL2 = 1000 * nScale;
		
		var tmpCW =   (tmpLL2 - tmpLL1) / 2;
		
		if(window.orientation==0){
			tmpContainer.css({ transformOrigin: "0% 0%", transform: "scale(" + nScale + ")" });
			tmpContainer.offset({left:0});
		}else{
			//$content.css({ transformOrigin: "0% 0%", transform: "scale(" + nScale2+","+nScale + ")" });	
			tmpContainer.css({ transformOrigin: "0% 0%", transform: "scale(" + nScale + ")" });
			//tmpContainer.css("left","calc(50% - "+tmpCW+"px)");
			//tmpContainer.css("left",tmpCW+"px");
			//tmpContainer.css("marginLeft",-250+"px");
			tmpContainer.offset({left:-tmpCW});
			//alert($content.width()+" // "+tmpContainer.width()+" :: "+tmpCW+" / "+window.screen.availWidth+"::"+window.screen.width+" /// "+tmpCW)

		}
	}
	
}


function thisMovie(movieName) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
		if (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) {
		  return window[movieName];
		}else{
			return document[movieName];
		}
    }
    else {
        return document[movieName];
    }
}
function getInternetExplorerVersion() {    
	 var rv = -1; // Return value assumes failure.    
	if (navigator.appName.indexOf("Microsoft") != -1) {
		  var ua = navigator.userAgent;        
		  var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");        
		  if (re.exec(ua) != null)            
			  rv = parseFloat(RegExp.$1);    
	}else{
		if (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) {
			rv=11;		
		}else if (navigator.appName == 'Netscape' && navigator.userAgent.search('Edge') != -1) {
			rv=12;		
		}
	}
	 return rv; 
} 
var isIEVersion =getInternetExplorerVersion();
var isExp;
if(isIEVersion==-1){
	isExp=false;
}else{
	isExp=true;
}
//alert("isExp = "+isExp+" / isIEVersion = "+isIEVersion)
if(isExp && isIEVersion<9){
	if(isIEVersion<=9){
		var console=this;
		function log(s){
			top.status=s;
		}
	}
}else{
}



function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function itostr(n){
	if(n<10){
		return "0"+n;
	}else{
		return ""+n;
	}
}

