// JavaScript Document
var thisMain = this;
var thisParent=null;
if(this!=parent){
	thisParent = parent;
}

try{
var clickSnd = new Audio();
clickSnd.autoplay = true;
clickSnd.controls=false;
}catch(e){}
$(window).load(function(e){
	//$("#container").css("display",'block');
	$("body").show();
});
$(document).ready(function(e) {	
	$("body").hide();
	$("#start_btn").bind("click",function(){
		if(thisParent){
			try{
			clickSnd.src="../common/mp3/click.mp3";
			clickSnd.load(function(){
				
			}); 
			clickSnd.volume = parent.isVolDragPercent;
			}catch(e){
				try{
					parent._doAlertSnd("../common/mp3/click.mp3");
				}catch(e1){
					
				}
			}
			setTimeout(_doNext,200);
			
		}
	});
	$(".syncObj").hide();
	if(thisParent){

		thisParent._doSyncInit(syncArray,$(document));

	}
	_doModuleChk();
	$(document).bind("contextmenu", function(e){
        return false;
    });
	
	var agent = navigator.userAgent.toLowerCase();
	if (!isMobile && agent.indexOf("chrome") != -1) {
		$("button").css("outline",0);
	}
});


function _doNext(){
	thisParent._doQuizLoad();
}