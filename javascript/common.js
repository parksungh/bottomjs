/**
	2017. 01. 23
	stroy21
	FunnsySky 
	funnysky@story21.co.kr
**/
///////////////////////////////////////////////////////////////////////////////////////////////////

var isLocal =  false;   // true 로컬, false 서버				
var vodPath;		       // 영상 주소
var controlcheck  = 1;     // 0:순차진행안함 1:순차진행

document.domain = "mdeduco.com"; // 포팅시 주석 풀어야 함.

/* 재생 시 로딩해야 할 함수 */ 
function studyOnLoad(){

var stdyFnlInfo;
var authKey;
var preViewLectYn;
var reviewYn;
	//alert("reviewYn : " + reviewYn)
}

studyOnLoad();
//alert("location.href : "+location.href)


if(isLocal){
	//console.log("개발")
	vodPath = "../mp4/";
	mp3Path = "../common/mp3/";

}else{
	//console.log("포팅");

	vodPath = "../mp4/";
	mp3Path = "../common/mp3/";
}

	

/** 
	CSS
**/
document.write('<link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet">');
document.write('<link href="../common/css/reset.css"  rel="stylesheet" />');
document.write('<link href="../common/css/style.css"  rel="stylesheet" />');
document.write('<link href="../common/css/bottom.css"  rel="stylesheet" />');
document.write('<link href="../common/css/font.css"  rel="stylesheet" type="text/css" charset="utf-8" />');


/**
	JS
**/


// 박성훈 : 수정
document.write('<script language="javascript" src="../common/javascript/mvSync.js"></script>');
document.write('<script language="javascript" src="../common/javascript/bottom.js"></script>');

document.write('<script language="javascript" src="./js/scriptInfo.js"></script>');
document.write('<script language="javascript" src="./js/index.js"></script>');

document.write('<script language="javascript" src="../common/javascript/top.js"></script>');
document.write('<script language="javascript" src="../common/javascript/ui.js"></script>');
document.write('<script language="javascript" src="../common/javascript/audio.js"></script>');

if(pageArray[curPage]['3'] == "Ot"){
	document.write('<script language="javascript" src="../common/javascript/ot.js"></script>');
}


function itostr(inum) {
    inum = parseInt(inum,10)
	return inum<10 ? "0"+inum : ""+inum;
}

// 시분초 초로 변환 
function timeToSecond(str){
	var timeArr = str.split(":");
	var SecondTime = Number(timeArr[0]*60) + Number(timeArr[1]);
	console.log("SecondTime : " + SecondTime + " str : " + str);
	return SecondTime;
}

function isMobilePlatform() {
	//return true;
	if (navigator.userAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null
		|| navigator.userAgent.match(/LG|SAMSUNG|Samsung/) != null)	{
		return true;
	}
	else {
		return false;
	}
}


function NextMove(next_page) {
	if(isLocal){
		location= next_page;
	} else {

		var pageNo = parseInt(next_page.substr(0,2), 10);
		if(progressControll==0){
            if(pageNo > ck_pg){
			alert("학습 완료 후 이동 가능 합니다.");
			return;
            }else{
       		//parent.parent.startProgress(pageNo);   // 식품산업협회 (진도체크용)
			location= next_page;
			}
	   	}else{
       		//parent.parent.startProgress(pageNo);   // 식품산업협회 (진도체크용)
			location= next_page;
		}
	}
}

//controlcheck  =   // 0:순차진행안함 1:순차진행
if(controlcheck == "1"){

	if (curChasi == 0){
		var chapternumber = "chapterNo=0001";
	} else {
		var chapternumber = "chapterNo=01" + itostr(curChasi);
	}

	function jindoCompleteChk(){

//		var jindoStr = "0"; // "0" = 학습 미완료 상태, "1" = 학습 완료상태? 
//		
//		$.ajax({
//		 type: "POST",
//		 url: "/study/ProgressCheck.aspx",
//		 async: false,
//		 data: chapternumber,
//		 success: function(current_study_frame){
//				if (current_study_frame > curPage || current_study_frame == curTol)
//				{
//				 jindoStr = 1;
//				 return jindoStr;
//				}
//		}
//		});
//		//alert("jindoCompleteChk : "+jindoStr)
//		return jindoStr;
			return 1;
	}
	jindoCompleteChk();
}

// 박성훈 : 추가
function _doQuizLoad(){

 setTimeout(function(){
  isStartWatchNum = -1;
  $("#mvEndContents").html('<iframe id="loadQuizFrame" src="quiz.html" frameborder="0" scrolling="no"></iframe>');
  $("#mvEndContents").fadeIn();
  $("#loadQuizFrame").load(function(){
   $("#mvEndContents").fadeIn();
  });  
 },600);

}

function _loadFrameAct(){
	if(loadFrameURL){
		$("#htmlContents").html('<iframe id="loadActFrame" src="'+loadFrameURL+'" frameborder="0" scrolling="no"></iframe>');
		$("#loadActFrame").load(function(){
			$("#htmlContents").fadeIn();
		});	
	}
}

function _doQuizFrameHide(){
	$("#mvEndContents").html("");
	$("#mvEndContents").hide();

}


// Wizi 비스콤 진도율체크 스크립트.

document.onreadystatechange = function () {
	 if (document.readyState === "complete") {
	   if(!!window.top.nonScormSavePage){
	  var file_name = location.href;
	
	  var tmp_loc = file_name.substring(0, file_name.lastIndexOf("/"));
	  var final_conn_page = file_name.replace(tmp_loc,"");
	
	  var numChasi = file_name.substring( file_name.lastIndexOf("/")+1, file_name.lastIndexOf(".html") ).split("_");
	   var numPage = numChasi[ numChasi.length -1 ];
	   
	   // 아래 마지막 true 부분은 모바일에서 접근시, 페이지별 진도율 체크인지 1개의 동영상으로 접근시 
	  // 진도율 100% 처리할지 여부임. true / false 선택.
	   window.top.nonScormSavePage(numPage,final_conn_page,"true");// 위지런 진도 스크립트 ( Page순번, 최종페이지, html5여부)
	   }
	 }
}