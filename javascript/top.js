/**
	2017. 03. 10
	stroy21
	FunnsySky 
	funnysky@story21.co.kr
	Top View 
**/

var aShowHeaderData = [
	// 상단 이미지가 보여질 차시와 페이지를 배열로 입력
	{ chasi: 1, pages: [1,2,3,7,8,9,10] },
];

function checkShowHeader(nChasi, nPage) {
	nChasi = +nChasi;
	nPage = +nPage;
	var data, i, tmpObj;
	for (i = 0; i < aShowHeaderData.length; i += 1) {
		tmpObj = aShowHeaderData[i];
		if (tmpObj.chasi === nChasi) {
			data = tmpObj;
			break;
		}
	}
	if (data == null) {
		return false;
	}
	var j, tPage;
	for (j = 0; j < data.pages.length; j += 1) {
		tPage = data.pages[j];
		if (tPage === nPage) {
			return true
		}
	}
	return false;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
function setTop(){
	/** set top **/
	var headerStr = '';
	headerStr += '<div class="header_inner"> ';

	headerStr += '	<div class="header_left"> ';
	headerStr += '		<div class="top_title"> ';
	//headerStr += '			<img src="../common/css/img/top/subject.png"> ';
	headerStr += '		</div> ';

	// console.log(curChasi, curPage, checkShowHeader(curChasi, curPage));
	if (checkShowHeader(curChasi, curPage)) {
		headerStr += '		<div class="sub_title">';
		// headerStr += '			<img src="../common/css/img/top/chaci.png"> ';
		headerStr += '			<img src="../common/css/img/top/chaci_' + itostr(curChasi)+ '.png"> ';
		headerStr += '		</div> ';
	}

	headerStr += '	</div> ';
	headerStr += '</div> ';

	//$("#fs-header .header_inner").append('<div class="header_right">'+ rightChasiTitle +'</div>');
	$("#fs-header").append(headerStr)
	var imgName = "";
	var subTitleText = "";

	if( pageArray[curPage][3] == "Intro" || pageArray[curPage][3] == "Ot" ){
		imgName = "x";
		//$("#fs-header .header_inner").hide();
		//$("#fs-index").hide() // 인트로에 인덱스메뉴 감추기
	}else if( pageArray[curPage][3] == "Preview" ){
		//imgName = "preview";
		//subTitleText =  "";
	}else if( pageArray[curPage][3] == "Goal" ){
		//imgName = "goal";
		subTitleText =  "▶ 이번 시간에 학습할 학습내용과 학습목표를 확인해 보세요.";
		//console.log(imgName+"//"+pageArray[curPage][3])
	}else if( pageArray[curPage][3] == "본영상" ){
		//imgName = "x";
	}else if( pageArray[curPage][3] == "Check" ){
		//imgName = "x";
		//subTitleText =  "※ 총 2번의 기회가 제시됩니다. 제시된 문제를 잘 읽고 정답을 선택하세요.";
	}else if( pageArray[curPage][3] == "Outro" ){
		//imgName = "outro";
		//subTitleText =  "※ 이번 Chapter의 학습이 끝났습니다. 학습자 여러분 수고하셨습니다. ";
	}
	
	if(imgName == "x"){		
		$("#fs-header .header_inner .sub_title").hide();
		$("#fs-header .header_inner .top_title").hide();
	}else if( pageArray[curPage][3] == "Check Up Quiz" ){
	//	$("#fs-header .header_inner .header_left .sub_title img").attr("src","../common/css/img/top/sub_title_"+ imgName +".png");
	//	$("#fs-header .header_inner .header_left .page_infor").text( subTitleText ).hide();
		//$("#fs-header .header_inner .header_left .sub_title").show();
	}else{
	//	$("#fs-header .header_inner .header_left .sub_title").text(pageArray[curPage][3])
	//	$("#fs-header .header_inner .header_left .sub_title img").attr("src","../common/css/img/top/sub_title_"+ imgName +".png");
	//	$("#fs-header .header_inner .header_left .page_infor").text( subTitleText );
		//$("#fs-header .header_inner .header_left .sub_title").show();
	}
	//$("#fs-header .header_inner .sub_title").hide();
	setHeadText();
}
//상단 텍스트 pageInfo에서 받아와 출력
function setHeadText(){
	$(".header_left .chapter_num").text(itostr(curChasi));//왼쪽 챕터 넘버
	$(".header_left .header_right").append(rightChasiTitle);//오른쪽 차시명
	$(".header_left .chapter_title").append(leftChapterTitle);//왼쪽 챕터명
}