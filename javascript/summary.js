// JavaScript Document
var thisNum = 1;
var totalNum = maxNum;
var currentPanel = null;
var lastNum=0;
var lastTab=null;

var thisMain = this;
var thisParent=null;
if(this!=parent){
	thisParent = parent;
}

var isConImgURL;
var nextkkam = true;

	var isNextSnd = new Audio();
	isNextSnd.autoplay = false;
	isNextSnd.controls = false;

	isNextSnd.src="../common/mp3/summary/summary_"+itostr(thisChapNum)+".mp3";
		if (!parent.SoundFlag)
			isNextSnd.volume = 1;
		else
			isNextSnd.volume = 0;
	//isNextSnd.load=function(){
			//isNextSnd.play();
	//}
		
$(document).ready(function(e) {
	$("#summaryContainer").css("opacity",0);

	$(".sumPannel").each(function(idx){
		if(idx==0){
			currentPanel = $(this);
			$(this).show();
		}else{
			$(this).hide();
		}

	});
	
//	alert(totalNum);
	
	$("#printBtn").bind("click",function(){
		_doPrint();
	});
		
	_do_IE8Chk();
	_do_IE7Chk();

	tabInit();

//			isNextSnd.onloadedmetadata = function() {
//    		var isEndSnd = parseInt(isNextSnd.duration);
//				isEndSnd = (isEndSnd * 1000) + 100;
//				
//					if (thisNum != totalNum) {
//						setTimeout(function(){
//							$('#nextBn').fadeIn();
//						},isEndSnd);
//					}
//				
//			};	

	/*백넥*/
	var btnBack = $('#prevBtn');
	var btnNext = $('#nextBtn');
	btnNext.bind("click",function(){

		next_go();
		tabInit();
	  });
	
	btnBack.bind("click",function(){
		prev_go();
		tabInit();
	  });

	$(document).bind("contextmenu", function(e){
        return false;
    });

	$("#downBtn").bind("click",function(){
		//alert('#downBtn');
		parent.otherEvent("summaryDown");
	});

});


$(window).load(function(e){
	setTimeout(function(){
		$("#summaryContainer").css("opacity",1);
	},50);
	
});


function  _do_IE8Chk(){
	if(isExp && isIEVersion==8){
		$("body").addClass("ie8");
		$(".tNumber").addClass("ie8");
		$(".tStr").addClass("ie8");
		$("#conSubject").addClass("ie8");
		$(".d2Li").addClass("ie8");
		$(".d4").addClass("ie8");
		$(".d3").addClass("ie8");
		$(".tbl_top").addClass("ie8");
		$(".tbl_top2").addClass("ie8");
		$(".tbl-table").addClass("ie8");
		$(".tbl-type1").addClass("ie8");
		$(".tbl-type2").addClass("ie8");
		$(".tbl-type3").addClass("ie8");
		$(".tbl-type4").addClass("ie8");
		$(".d2_line").addClass("ie8");
		$(".vis_line").addClass("ie8");
	}
	
	var agent = navigator.userAgent.toLowerCase();
	if (!isMobile && agent.indexOf("chrome") != -1) {
		$("button").css("outline",0);
	}
}

function  _do_IE7Chk(){
	if(isExp && isIEVersion==7){
		$(".depth2").find("ul").addClass("ie7");
		$(".d4").addClass("ie7");
		$(".d3").addClass("ie7");
		$("#conSubject").addClass("ie7");
		$(".tbl_top").addClass("ie7");
		$(".tbl_top2").addClass("ie7");
		$(".tbl_bottom").addClass("ie7");
		$(".d3").find("ul").addClass("ie7");
		$(".tbl-type1").addClass("ie7");
		$(".tbl-type2").addClass("ie7");
		$(".tbl-type3").addClass("ie7");
		$(".tbl-type4").addClass("ie7");
		$(".d2_line").addClass("ie7");
		$(".vis_line").addClass("ie7");
	}
	
	var agent = navigator.userAgent.toLowerCase();
	if (!isMobile && agent.indexOf("chrome") != -1) {
		$("button").css("outline",0);
	}
}

function tabInit(){

	// 차시별로 써머리가 달라서 /차시/js/summary_mp3.js 로 변경
	//summary_mp3(thisNum, lastNum);

	$("#curNum").html(itostr(thisNum));
	$("#toNum").html(itostr(totalNum));

	//$("#sum_"+thisNum).fadeIn();
	$("#sum_"+thisNum).show();
	isConImgURL = "../common/img/summary/summary_"+itostr(thisChapNum)+"_"+itostr(thisNum)+".png"
	$("#img_"+thisNum).attr("src",isConImgURL);


	/*if (parent.getCookie('noteComplete')!='1')	{
		$('#nextBtn').hide();
	} else {
		$('#nextBtn').show();
	}*/

	if(thisNum==1 ) {
		$('#prevBtn').hide();
		$('#nextBtn').show();

	}else if(thisNum == totalNum) {
		$('#nextBtn').hide();
		$('#prevBtn').show();

		//parent.endFlag = true;
		parent.toolTipFlag = true;

		if (nextkkam ==true)
		{
			nextkkam = false;
			parent.setBalloon();
		}		
		//parent.setCookie("noteComplete","1",360); //쿠키에 저장

	}else{
		$('#nextBtn').show();
		$('#prevBtn').show();
	}
	
	/*else if (thisNum < totalNum){
			if (parent.getCookie('noteComplete')!='1')	{
				$('#prevBtn').hide();
			} else {
				$('#prevBtn').show();
			}
	}*/
		//parent.setPause();
			
	//alert(":::: tabInit ::::"+"\n"+"isConImgURL : " + isConImgURL + "\n"+"thisNum : " + thisNum + "\n");



}

function next_go(){
	$("#sum_"+thisNum).hide();
 	if (thisNum < totalNum) {
		lastNum = thisNum;
		thisNum++;
	}

}

function prev_go(){
	$("#sum_"+thisNum).hide();
	if (thisNum > 1) {
		lastNum = thisNum;
		thisNum--;
	}

}

function _doPrint(){
	window.open("summary_print.html");
}


function itostr(n){
	if(n<10){
		return "0"+n;
	}else{
		return ""+n;
	}
}

