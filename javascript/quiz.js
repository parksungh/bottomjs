// JavaScript Document
var thisMunjeNum = 1;
var totalMunjeNum = quizDap.length - 1;
var currentSceneNum = 1;
var currentScene;

var myArray = new Array(quizDap.length);
var myAnsOX = new Array(quizDap.length);
var myScore = 0 ;
var myStep = 1;
var totalStep = 2;
var currentState = "confirm";

var isLastViewMunjeNum=0;



if(isExp && isIEVersion<9){
	
}else{
	var effectSnd = new Audio();
	effectSnd.autoplay = true;
	//effectSnd.volume=1.0;
}

var syncArray = new Array();
syncArray.push(["sync_1_1",0,9999,"LEFT"]);
syncArray.push(["sync_1_2",1,9999,"RIGHT"]);
syncArray.push(["sync_1_3",2,9999]);
syncArray.push(["sync_1_4",6,9999,"LEFT"]);
syncArray.push(["quiz_start",10,9999,"LEFT"]);

var isViewPrevFlag=false;
var isLastChkNum=0;

function _quizStart(){
	currentSceneNum = 1;
	currentScene = $("#scene_"+currentSceneNum);
	_doModuleChk();
	currentScene.show(function(){
		_quizInit();	
	});
	
	
}

// 퀴즈 페이지 초기화
function _quizInit(){

	$(".resultStr").scrollTop(0);	//스크롤 항상 top으로

	myStep = 1;

	currentState = "confirm";

	//이미 모두 푼경우 해설 마지막 다음버튼을 결과버튼으로 변경
	if (chk_QEND() && thisMunjeNum == totalMunjeNum)
	{
		currentState = "result";	

	} else {
		//현재 문제 푼경우 다음버튼 상태 next로
		if (myArray[thisMunjeNum])
		{
			currentState = "next";
		}

		confirmBtnInit();
	}


	

	$("#munje_"+thisMunjeNum).clearQueue();
	$("#munje_"+thisMunjeNum).stop();
	$("#munje_"+thisMunjeNum).fadeIn(300);

	//문제 풀지 않은때만 클릭가능하게 초기화
	if (!myArray[thisMunjeNum])
	{

			$("#ox_"+thisMunjeNum).removeClass("oo xx");
			$("#ox_"+thisMunjeNum).hide();
			$("#quizResult_"+thisMunjeNum).hide();
			
			$(".quizCheck_btn").each(function(){
				var tmpMunje = this.id.split("_")[1];
				var tmpNum = this.id.split("_")[2];
				if(tmpMunje == thisMunjeNum){
					$(this).removeClass("off");
					$(this).removeClass("off dap check _over");		
					$(this).focusable =true;
				}else{
				}
			});
			$(".block_mc").hide().css("DISPLAY", "").css("visibility", "hidden");	// for ie7 hide뒤에 css 속성 추가함
			$(".block_mc").css("display", "none");	//for ie7 : .hide() 동작하지 않아 명시적으로 추가 해줌

			_doChkLastQuizNum();

	}

	////////////////////////////////////////
	//이전버튼 처리
	$(".preQBtn").hide();
	if(thisMunjeNum==1){
		$("#prevQ_"+thisMunjeNum).hide();
		$("#prevQ_"+thisMunjeNum).css("display", "none");	//for ie7 : .hide() 동작하지 않아 명시적으로 추가 해줌
	}else{
		//문제 풀때만 보이게 수정
		if(myArray[thisMunjeNum]){
			$("#prevQ_"+thisMunjeNum).show();
			$("#prevQ_"+thisMunjeNum).css("display", "block");	//for ie7 : .show() 동작하지 않아 명시적으로 추가 해줌
		}
	}
	////////////////////////////////////////

	// 결과 페이지 초기화
		for(i=1;i<quizDap.length;i++){
				if (i == 1) {
					$("#resq_"+i).css({"background":"url(../common/img/quiz/result_q"+i+"_no.png)", 'background-repeat' : 'no-repeat', 'top':'401px','left':'384px'}); 
				} else if (i == 2) {
					$("#resq_"+i).css({"background":"url(../common/img/quiz/result_q"+i+"_no.png)", 'background-repeat' : 'no-repeat', 'top':'401px','left':'490px'}); 
				} else if (i == 3) {
					$("#resq_"+i).css({"background":"url(../common/img/quiz/result_q"+i+"_no.png)", 'background-repeat' : 'no-repeat', 'top':'401px','left':'595px'}); 
				}
		}
}

function _doChkLastQuizNum(){
	isLastChkNum = 0;
	for(i=1;i<myArray.length;i++){
		if(myArray[i]){
			isLastChkNum = i;
		}
	}
	//console.log("thisMunjeNum = "+thisMunjeNum+"/myArray = "+myArray+" / isLastChkNum = "+isLastChkNum);
	$(".goDBtn").each(function(){
		var tmp1 = Number(this.id.split("_")[1]);
		var tmp2 = Number(this.id.split("_")[2]);
		if(tmp2<=isLastChkNum+1){
			$(this).show();
		}else{
			$(this).show();
			
		}
	});
	
}

function confirmBtnInit(){
	//////////////////////////////////////////////////////////////////
	// 상위에서 정해진 currentState 들어와도 여기에서 다시체크 계산처리 추가함(마지막 결과버튼 퀴즈 완료시에만 보이게 변경)
	//////////////////////////////////////////////////////////////////
	//퀴즈 다 풀었는지 체크
	if (chk_QEND())
	{
		if (thisMunjeNum == totalMunjeNum)
		{
			currentState = "result";
		} else {
			
		}
	} else {
		if (thisMunjeNum == totalMunjeNum)
		{
			currentState = "none";
		} else {
			//currentState = "next";	
		}
	}
	//////////////////////////////////////////////////////////////////

	$("#confirm_"+thisMunjeNum).removeClass("confirm next none result");
	$("#confirm_"+thisMunjeNum).addClass(currentState);

	if (currentState == "none")
	{
		$("#confirm_"+thisMunjeNum).hide();
	} else {
		$("#confirm_"+thisMunjeNum).show();
	}
}

$(window).load(function(e){
	
	setTimeout(function(){
		$("body").show();	
	},500);
});

$(document).ready(function(e) {	
	$("body").hide();
	currentScene = $("#scene_"+currentSceneNum);
	
	
	$(".quizScene").each(function(idx){
		if(idx==0){
			$(this).show();
		}else{
			$(this).hide();
		}
	});
	
	$(".munPannel").each(function(idx){
		$(this).hide();
	});
	$(".resPannel").hide();
	$(".resultSet").hide();
	$(".resultSet").css("visibility", "hidden");	//for ie7

	$("#quiz_start").bind("click",function(){
		_quizStart();	
	})
	
	$(".quizCheck_btn").bind("click",function(){
		var tmpMunje = this.id.split("_")[1];
		var tmpNum = this.id.split("_")[2];
		if($(this).hasClass("off")){
			return;
		}
		btnCheckAct(tmpMunje,tmpNum);
	});
	
	$(".confirm_btn").bind("click",function(){
		var tmpMunje = this.id.split("_")[1];
		
		if(isViewPrevFlag && currentState!="result"){
			_nextAct2();
			return;
		}
		switch(currentState){
			case "confirm" :
				confirmAct();
			break;
				
			case "next" :
				_nextAct();
			break;
			
			case "result" :
				_endAct();
			break;
		}
		
	});
	
	$("#replayBtn").bind("click",function(){
		_replayAct();
	});

	//////////////////////////
	//IE 9이하 구버전 CSS3 transition 미동작 대응 Jquary Animate 코드
	if(isExp && isIEVersion < 10){
		$("#replayBtn").hover(function() {
		  $(this).animate({
			opacity: 0.9,
			marginLeft: "-5px"
		  }, 200, function() {
			// Animation complete.
		  });
		}, function(){
		  $(this).animate({
			opacity: 1,
			marginLeft: "0px"
		  }, 200, function() {
			// Animation complete.
		  });
		});
	}
	//////////////////////////
	
	$(".preQBtn").bind("click",function(){
		var tmp = Number(this.id.split("_")[1]);
		if(thisMunjeNum==1){
			return;
		}
		isViewPrevFlag=true;
		$("#munje_"+thisMunjeNum).hide();
		//currentState="next";
		thisMunjeNum = tmp-1;
		$("#munje_"+thisMunjeNum).clearQueue();
		$("#munje_"+thisMunjeNum).stop();
		$("#munje_"+thisMunjeNum).fadeIn(300);
		
		//currentState = "confirm";
		confirmBtnInit();
		
		_quizInit();
		
		
	});
	
	$(".goDBtn").bind("click",function(){
		var tmp1 = Number(this.id.split("_")[1]);
		var tmp2 = Number(this.id.split("_")[2]);
		_goMunjeAct(tmp2);
	});
	_quizStart();
	_do_IE8Chk();
	_do_IE7Chk();
	$("body").hide();
	
	$(document).bind("contextmenu", function(e){
        return false;
    });
});


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

$(document).ready(function(e) {
	$("#review_btn1").bind("click",function(){

			try{
				clickSnd.src="../common/mp3/click.mp3";
				clickSnd.load(function(){
				}); 
				clickSnd.onended = function() {
					_doNext2();
				};

			}catch(e){
				setTimeout(_doNext2,500);
			}


	});
	$("#review_btn2").bind("click",function(){

			try{
				clickSnd.src="../common/mp3/click.mp3";
				clickSnd.load(function(){
				}); 
				clickSnd.onended = function() {
					_doNext3();
				};

			}catch(e){
				setTimeout(_doNext3,500);
			}

	});
	$("#review_btn3").bind("click",function(){

			try{
				clickSnd.src="../common/mp3/click.mp3";
				clickSnd.load(function(){
				}); 
				clickSnd.onended = function() {
					_doNext4();
				};

			}catch(e){
				setTimeout(_doNext4,500);
			}

	});
	$("#review_btn4").bind("click",function(){

			try{
				clickSnd.src="../common/mp3/click.mp3";
				clickSnd.load(function(){
				}); 
				clickSnd.onended = function() {
					_doNext5();
				};

			}catch(e){
				setTimeout(_doNext5,500);
			}

	});
	$("#review_btn5").bind("click",function(){

			try{
				clickSnd.src="../common/mp3/click.mp3";
				clickSnd.load(function(){
				}); 
				clickSnd.onended = function() {
					_doNext6();
				};

			}catch(e){
				setTimeout(_doNext6,500);
			}

	});

		$(".syncObj").hide();
		thisParent._doSyncInit(syncArray,$(document));
	//}
	_doModuleChk();
	_do_IE8Chk();
	$(document).bind("contextmenu", function(e){
        return false;
    });

});

function _doNext2(){

}

function _doNext3(){

}

function _doNext4(){

}

function _doNext5(){

}

function _doNext6(){

}

function  _do_IE8Chk(){
	if(isExp && isIEVersion==8){
		$("body").addClass("ie8");
		$(".JiMun").addClass("ie8");
		$(".quizCheck_btn").addClass("ie8");
		$(".resultSet").addClass("ie8");
		$(".resultStr").addClass("ie8");
		$(".tb").addClass("ie8");
		$(".redLine").addClass("ie8");
		$("#scoreLine").addClass("ie8");
	}
	
	var agent = navigator.userAgent.toLowerCase();
	if (!isMobile && agent.indexOf("chrome") != -1) {
		$("button").css("outline",0);
	}
}
function  _do_IE7Chk(){
	if(isExp && isIEVersion==7){
		$(".resultStr").addClass("ie7");
		$(".quizCheck_btn").addClass("ie7");
		$(".munjeSet").addClass("ie7");
		$(".redLine").addClass("ie7");
		$(".testing").addClass("ie7");
	}
	
	var agent = navigator.userAgent.toLowerCase();
	if (!isMobile && agent.indexOf("chrome") != -1) {
		$("button").css("outline",0);
	}
}

function confirmAct(){
	//문제피드백 제시
	if(!myArray[thisMunjeNum]){
		_popAlert("chk");
		return;
	}
	
	if(myArray[thisMunjeNum] == quizDap[thisMunjeNum]){
		_popAlert("ok");     // 정답
		myAnsOX[thisMunjeNum]=true;
		resultAct(true,thisMunjeNum);	//해설 제시
	}else{
		if(myStep < totalStep){
			myStep ++;
			_popAlert("re");
			reAct();
		}else{
			_popAlert("no");
			myAnsOX[thisMunjeNum]=false;
			resultAct(false,thisMunjeNum);	//해설 제시
		}
	}
}

function _goMunjeAct(n){
	
	$("#munje_"+thisMunjeNum).hide();
	thisMunjeNum = n;
	if(thisMunjeNum == totalMunjeNum){
		currentState = "result";
	}else{
		currentState = "next";
	}
	confirmBtnInit();

	//문제 풀었을때만 이전버튼 보이게
	if(thisMunjeNum > 1 && myArray[thisMunjeNum]){
		$("#prevQ_"+thisMunjeNum).show();
		$("#prevQ_"+thisMunjeNum).css("display", "block");	//for ie7 : .show() 동작하지 않아 명시적으로 추가 해줌
	}

	$("#munje_"+thisMunjeNum).clearQueue();
	$("#munje_"+thisMunjeNum).stop();
	$("#munje_"+thisMunjeNum).fadeIn(300);
	//2017-12-13 요청으로 순차적으로 못풀게 수정됨
	//if(thisMunjeNum==isLastChkNum+1){
		_quizInit();
	//}
}

//퀴즈 다 풀었는지 체크
function chk_QEND(){
	var _CC = 0;
	for(i=1;i<quizDap.length;i++){
		if(!myArray[i]){
			_CC++;
		}
	}
	if (_CC == 0)
	{
		return true;
	} else {
		return false;
	}
}

function _nextAct2(){
	//퀴즈 다 풀었는지 체크
	if (chk_QEND())
	{
		currentState = "result";	
	} else {
		currentState = "next";	
	}
	
	
	$("#munje_"+thisMunjeNum).hide();
	
	if(thisMunjeNum<totalMunjeNum){
		thisMunjeNum++;

		//문제 풀었을때만 이전버튼 보이게
		if(thisMunjeNum > 1 && myArray[thisMunjeNum]){
			$("#prevQ_"+thisMunjeNum).show();
			$("#prevQ_"+thisMunjeNum).css("display", "block");	//for ie7 : .show() 동작하지 않아 명시적으로 추가 해줌
		}
		$("#munje_"+thisMunjeNum).clearQueue();
		$("#munje_"+thisMunjeNum).stop();
		$("#munje_"+thisMunjeNum).fadeIn(300);
		confirmBtnInit();

		if(!myArray[i]) {
			_quizInit();
		}
	}else{
		_endAct();
	}
	
}

function _nextAct(){
	$("#munje_"+thisMunjeNum).hide();
	
	thisMunjeNum++;
	$("#munje_"+thisMunjeNum).clearQueue();
	$("#munje_"+thisMunjeNum).stop();
	$("#munje_"+thisMunjeNum).fadeIn(300);
	confirmBtnInit();
	
	isViewPrevFlag=false;

	_quizInit();
}

function reAct(){
	isLastViewMunjeNum=0;
	$("#munje_"+thisMunjeNum).find(".quizCheck_btn").removeClass("_over");
	$("#munje_"+thisMunjeNum).find(".quizCheck_btn").removeClass("check");
	myArray[thisMunjeNum]=null;
}

// 모든 문제 다 풀었을 때
function _endAct(){
	$("#munje_"+thisMunjeNum).hide();
	$("#quizResult").clearQueue();
	$("#quizResult").stop();
	$("#quizResult").fadeIn();
	
	myScore = 0;
	$(".resQ").removeClass("oo xx");
	for(i=1;i<quizDap.length;i++){
		if(myArray[i] == quizDap[i]){
			myScore++;
			$("#resq_"+i).addClass("oo");
			if (i == 1) {
				$("#resq_"+i).css({"background":"url(../common/img/quiz/result_q"+i+"_ok.png)", 'background-repeat' : 'no-repeat', 'top':'401px','left':'384px'}); 
			} else if (i == 2) {
				$("#resq_"+i).css({"background":"url(../common/img/quiz/result_q"+i+"_ok.png)", 'background-repeat' : 'no-repeat', 'top':'401px','left':'490px'}); 
			} else if (i == 3) {
				$("#resq_"+i).css({"background":"url(../common/img/quiz/result_q"+i+"_ok.png)", 'background-repeat' : 'no-repeat', 'top':'401px','left':'595px'});
			}
		}else{
			$("#resq_"+i).addClass("xx");
		}
		
	}

		effectSnd.src = "../common/mp3/quiz/q_result.mp3";
		effectSnd.load(function(){

			effectSnd.play();			
		});
	
	$("#scoreLine").html(myScore+"문제");
	try{
		parent.endFlag = true;
		parent.toolTipFlag = true;
		setTimeout("parent.setBalloon()", 1300);

	}catch(e){
	}

	
	if(myScore == 3){
		$("#endresult").html("");
			try{
	
			}catch(e){
		}
	}else if( myScore == 2){		
		$("#endresult").html("");
			try{

			}catch(e){
		}
	}else if( myScore == 1){		
		$("#endresult").html("");
			try{

			}catch(e){
		}
	}
}

// 다시풀기
function _replayAct(){
	$("#quizResult").hide();
	$(".qOx").removeClass("oo xx");
	$(".qOx").hide();
	$(".chkArrow").hide();
	$(".resultSet").hide();
	$(".resultSet").css("visibility", "hidden");	//for ie7
	
	//$(".quizBtnSet").hide();
	
	
	$(".quizCheck_btn").each(function(){
		//$(this).prop("disabled",false);
		$(this).focusable =true;
		$(this).removeClass("_over check dap off");
	});
	thisMunjeNum = 1;
	$("#munje_"+thisMunjeNum).clearQueue();
	$("#munje_"+thisMunjeNum).stop();
	$("#munje_"+thisMunjeNum).fadeIn(300);
	myArray=new Array(quizDap.length);
	try{
		parent._isReplayActivity();
	}catch(e){}
	_quizInit();
}

function resultAct(v,n){
		reviewBtnAct(n);
	if(v){
		$("#ox_"+thisMunjeNum).addClass("oo");
		$("#ox_"+thisMunjeNum).clearQueue();
		$("#ox_"+thisMunjeNum).stop();
		$("#ox_"+thisMunjeNum).fadeIn();
	}else{
		$("#ox_"+thisMunjeNum).addClass("xx");
		$("#ox_"+thisMunjeNum).clearQueue();
		$("#ox_"+thisMunjeNum).stop();
		$("#ox_"+thisMunjeNum).fadeIn();
	}
	var tmpDapNum = quizDap[thisMunjeNum];
	var tmpDapObj = $("#chk_"+thisMunjeNum+"_"+tmpDapNum);
	var tmpSet = $("#munSet_"+1);
	var tmpX = tmpDapObj.offset().left - $("#munSet_"+thisMunjeNum).offset().left;
	var tmpY = tmpDapObj.offset().top - $("#munSet_"+thisMunjeNum).offset().top;
	
	var ttX = Number(tmpSet.css("left").split("px")[0]);
	var ttY = Number(tmpSet.css("top").split("px")[0]);
	
	// 정답 맞출 때
	$(".quizCheck_btn").each(function(){
		var tmpMunje = this.id.split("_")[1];
		var tmpNum = this.id.split("_")[2];
		if(tmpMunje == thisMunjeNum){
			//$(this).prop("disabled",true);
			$(this).focusable =false;
			if(tmpNum== quizDap[thisMunjeNum]){
				$(this).addClass("dap");

			}else{
				$(this).removeClass("dap");	
			}	
		}else{
			
		}
		
		$(this).addClass("off");
		
	});
	
	$("#arrow_"+thisMunjeNum).css("top",ttY+tmpY-20+"px");
	$("#arrow_"+thisMunjeNum).css("left",ttX+tmpX+"px");
	$("#arrow_"+thisMunjeNum).show();
	

	//문제 풀었을때만 이전버튼 보이게
	if(thisMunjeNum > 1 && myArray[thisMunjeNum]){
		$("#prevQ_"+thisMunjeNum).show();
		$("#prevQ_"+thisMunjeNum).css("display", "block");	//for ie7 : .show() 동작하지 않아 명시적으로 추가 해줌
	}

	$("#quizResult_"+thisMunjeNum).css("visibility", "visible");	//for ie7
	$("#quizResult_"+thisMunjeNum).css("marginLeft","-20px");
	$("#quizResult_"+thisMunjeNum).clearQueue();
	$("#quizResult_"+thisMunjeNum).stop();
	$("#quizResult_"+thisMunjeNum).fadeIn();
	new TweenMax($("#quizResult_"+thisMunjeNum), 0.6, {marginLeft:0,onComplete:function(){
	},ease: Power2.easeInOut});
	




	if(thisMunjeNum == totalMunjeNum){
		//퀴즈 다 풀었는지 체크
		if (chk_QEND())
		{
			currentState = "result";	
		} else {
			//currentState = "next";
			currentState = "none";
		}
		

	}else{
		currentState = "next";
	}





	confirmBtnInit();
	isLastViewMunjeNum = thisMunjeNum;
	_doChkLastQuizNum();
	
	$(".block_mc").show().css("visibility", "visible");	// for ie7 hide뒤에 css 속성 추가함
}

function reviewBtnAct(n)
{
	//관련학습보기 문제 정오답결과에 따라 노출
	var myOK = myAnsOX[n];
	if(myOK)
	{
		$("#review_btn"+n).hide();
	}else
	{
		$("#review_btn"+n).hide();
		//$("#review_btn"+n).show();
	}
	
}

function _popAlert(str){
	if(isExp && isIEVersion<9){
		if(str == "chk"){
			parent._doAlertSnd("../common/mp3/quiz/q_wrong.mp3");
		}else if(str == "re"){
			parent._doAlertSnd("../common/mp3/quiz/q_wrong.mp3");
		}else if(str == "no"){
			parent._doAlertSnd("../common/mp3/quiz/q_wrong.mp3");
		}else if(str == "ok"){
			parent._doAlertSnd("../common/mp3/quiz/q_right.mp3");
		}
	}else{
		//alert(parent.isMediaObj.volume+" / "+parent.isMediaObj+" / "+parent.isMediaObj.duration+" // "+parent.isVolDragPercent);

		if(str == "chk"){
			effectSnd.src = "../common/mp3/quiz/q_wrong.mp3";
		}else if(str == "re"){
			effectSnd.src = "../common/mp3/quiz/q_wrong.mp3";
		}else if(str == "no"){
			effectSnd.src = "../common/mp3/quiz/q_wrong.mp3";
		}else if(str == "ok"){
			effectSnd.src = "../common/mp3/quiz/q_right.mp3";
		}

		effectSnd.load(function(){
			effectSnd.play();
			
		});
		

	}
	$("#alertPop").removeClass("ok re no");
	if(str=="no"){
		
	}
	$("#alertPop").addClass(str);
	$("#alertPop").fadeIn(1000,function(){
		$(this).fadeOut(1000);
	})
}

//정오답 체크
function btnCheckAct(t,s){
	if(thisMunjeNum == t){
		$(".quizCheck_btn").each(function(){
			if ($(this).parents(".munPannel").attr("id") == "munje_"+thisMunjeNum)
			{
				var tmpMunje = this.id.split("_")[1];
				var tmpNum = this.id.split("_")[2];
				if(tmpMunje == t && tmpNum==s){
					$(this).addClass("check");
				}else{
					$(this).removeClass("check");
				}
			}
		});
		
		myArray[t] = s;
		confirmAct();
	}
}

