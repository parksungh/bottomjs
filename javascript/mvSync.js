// JavaScript Document
var syncArray = new Array();
var isCurrentSyncNum=0;
var isCurrentSyncID="";


var isSyncShowArray=new Array();
var isTmpSyncNum=-1;
var isSyncTypeArray = new Array();

var isStartWatchNum=-1;
//alert(isSyncShowArray);
var isTargetFrame = this;
var thisMain = this;
var isNoSoundDev = false;

function _doSyncInit(arr,target){
	
	syncArray = arr;
	if(!target){
		
	}else{
		isTargetFrame = target;
	}

	isCurrentSyncNum = 0;
	isCurrentSyncID="";
	
	isSyncShowArray=[];
	isTmpSyncNum = -1;
	isSyncTypeArray = [];
	
	
	for(i=1;i<syncArray.length;i++){
		var tmp = syncArray[i][1];
		if(isTmpSyncNum!=tmp){
			isSyncShowArray.push(Number(tmp));
			isTmpSyncNum = tmp;
		}
	}

	isSyncShowArray.sort(function(a, b){return a-b});
	setTimeout(_doShowConDiv,500);
	return;
	
}

function _doShowConDiv(){
	
}


function _doSync(cTime,tTime){

	if(isTargetFrame){
		for(i=1;i<isSyncShowArray.length;i++){
			if(	cTime>=isSyncShowArray[i] && cTime<isSyncShowArray[i+1]){
				isCurrentSyncNum = isSyncShowArray[i];
			}
		}
		if( cTime>isSyncShowArray[isSyncShowArray.length-1]){
			isCurrentSyncNum=isSyncShowArray[isSyncShowArray.length-1];
		}

		if(isCurrentSyncNum!=isStartWatchNum){
			isStartWatchNum = isCurrentSyncNum;

			_doSyncStartWatcher();
		}
	}

			// 박성훈 : 수정
}


function _doSyncStartWatcher(){

	//console.log("\n isStartWatchNum = "+isStartWatchNum+" / "+syncArray);
	for(i=1;i<syncArray.length;i++){
		var tmp = syncArray[i][0].toString();
		if(isTargetFrame  == thisMain ){
			var tmpDIv = $("#"+tmp);
			
		}else{
			var tmpDIv = isTargetFrame.contents().find("#"+tmp);
		}
		console.log("isS//tartWatchNum = "+isStartWatchNum+"/tmpDIv = "+tmpDIv.attr('id'))
		if(syncArray[i][3]){
			tmpDIv.attr("effType",syncArray[i][3]);
		}else{
			tmpDIv.attr("effType","opacity");
		}
		//try{console.log(isStartWatchNum+" == "+syncArray[i][1])}catch(e){}
		


		tmpDIv.removeClass("act");	//퀴즈 start_btn버튼
		var _syncNum = syncArray[i][1];	//번호 기억
		if(isStartWatchNum == syncArray[i][1]){
			tmpDIv.fadeIn(400, function(){
				//console.log(tmpDIv.attr('id') + "<----" + isStartWatchNum +" / "+ _syncNum);

				//### 퀴즈 start_btn 버튼 커스텀 코드 추가(jquery 효과와 css 효과 겹쳐서 보완)
				if (tmpDIv.attr('id') == "start_btn" && isStartWatchNum == _syncNum)
				{
					tmpDIv.addClass("act");
				}			
			});



		}else if(isStartWatchNum > syncArray[i][1]){
			tmpDIv.show();
			//console.log(tmpDIv.attr('id')+" show")
		}else if(isStartWatchNum < syncArray[i][1]){
			tmpDIv.hide();
			//console.log(tmpDIv.attr('id')+" hide")
		}
		
		
		/*
		if(isStartWatchNum>=syncArray[i][1] && isStartWatchNum<syncArray[i][2]){
			
			_doEffAct(tmpDIv,tmp);
			tmpDIv.show();
		}else{
			tmpDIv.addClass("_doHide");
			tmpDIv.removeClass("_doShow");
			tmpDIv.attr("effDoing",false);
			tmpDIv.hide();
			_activityInit();
		}
		*/
	}
	
}


function _doSyncFullView(){
	for(i=1;i<syncArray.length;i++){
		var tmp = syncArray[i][0].toString();
		if(isTargetFrame  == thisMain ){
			var tmpDIv = $("#"+tmp);
			
		}else{
			var tmpDIv = isTargetFrame.contents().find("#"+tmp);
		}
		//console.log("isStartWatchNum = "+isStartWatchNum+"/tmpDIv = "+tmpDIv.attr('id'))
		if(syncArray[i][3]){
			tmpDIv.attr("effType",syncArray[i][3]);
		}else{
			tmpDIv.attr("effType","opacity");
		}
		//try{console.log(isStartWatchNum+" == "+syncArray[i][1])}catch(e){}
		


		tmpDIv.removeClass("act");	//퀴즈 start_btn버튼
		var _syncNum = syncArray[i][1];	//번호 기억
		if(isStartWatchNum == syncArray[i][1]){
			tmpDIv.fadeIn(400, function(){
				//console.log(tmpDIv.attr('id') + "<----" + isStartWatchNum +" / "+ _syncNum);

				//### 퀴즈 start_btn 버튼 커스텀 코드 추가(jquery 효과와 css 효과 겹쳐서 보완)
				if (tmpDIv.attr('id') == "start_btn" && isStartWatchNum == _syncNum)
				{
					tmpDIv.addClass("act");
				}			
			});



		} else {
			tmpDIv.show();
		}

	}
	
}

function _activityInit(){
	$("#actContents").html("");
	$("#actContents").hide();
	if(isTargetFrame  == thisMain ){
		return;
	}
}

function _doEffAct(obj,strN){
	if(obj.attr("effDoing")){
		return;
	}
	//console.log("isStartWatchNum = "+isStartWatchNum);
	top.status = "isStartWatchNum = "+isStartWatchNum
	//try{$("#mvEndContents").html("");}catch(e){}
	
	obj.attr("effDoing",true);
	obj.fadeIn("slow");
	
	if(obj.attr("effType") =="LEFT"){
		obj.css({'transform': 'translate(-70px)'});
		TweenMax.to(obj, 
			0.5, 
			{
				css:{'transform': 'translate(0px)'},
				onComplete:function(){
					obj.attr("effDoing",false);
				}
			
			}
		); 
	}else if(obj.attr("effType") =="RIGHT"){
		obj.css({'transform': 'translate(70px)'});
		TweenMax.to(obj, 
			0.5, 
			{
				css:{'transform': 'translate(0px)'},
				onComplete:function(){
					obj.attr("effDoing",false);
				}
			
			}
		); 
	}else{
		obj.attr("effDoing",false);
	}
	return;
	
}


var eduCommon={
	//모바일 판단====================================================
	isMobile:{
			Android:function(){
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry:function(){
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS:function(){
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera:function(){
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows:function(){
				return navigator.userAgent.match(/IEMobile/i);
			},
			any:function(){
				return (eduCommon.isMobile.Android() || eduCommon.isMobile.BlackBerry() || eduCommon.isMobile.iOS() || eduCommon.isMobile.Opera() || eduCommon.isMobile.Windows());
			}
	},
	
	mobile:function(){
		return eduCommon.isMobile.any() !=null;
		//return true;
	},

	//PC 판단====================================================
	isPc:{
			word:"",
			version:"N/A",
			agent:navigator.userAgent.toLowerCase(),
			msie:function(){
				if (eduCommon.isPc.word == "msie") { return true; }
				else { return false; }
			},
			ie11:function(){
				if (eduCommon.isPc.word == "trident") { return true; }
				else { return false; }
			},
			edge:function(){
				if (eduCommon.isPc.word == "edge") { return true; }
				else { return false; }
			},
			chrome:function(){
				return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
			},
			chk:function(){
				// IE old version ( IE 10 or Lower ) 
				if ( navigator.appName == "Microsoft Internet Explorer" ) eduCommon.isPc.word = "msie"; 
				else { 
				 // IE 11 
				 if ( eduCommon.isPc.agent.search( "trident" ) > -1 ) eduCommon.isPc.word = "trident"; 

				 // Microsoft Edge  
				 else if ( eduCommon.isPc.agent.search( "edge/" ) > -1 ) eduCommon.isPc.word = "edge"; 

				 // 그외, IE가 아니라면 ( If it's not IE or Edge )  
				 else return eduCommon.isPc.version; 
				}
				var ua = navigator.userAgent;  var msie = ua.indexOf('MSIE ');
				if (eduCommon.isPc.agent != null) eduCommon.isPc.version = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
				return eduCommon.isPc.version;
			},
			any:function(){
				return (eduCommon.isPc.msie() || eduCommon.isPc.ie11() || eduCommon.isPc.edge() || eduCommon.isPc.chrome());
			}
	}
}
eduCommon.isPc.chk();	//PC 체크