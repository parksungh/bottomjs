/**
	2017. 03. 10
	stroy21
	FunnsySky 
	funnysky@story21.co.kr
	UI View 
**/

	var w_h;
	var w_w;
	var container_scale = 1;
	var dev = true;// true 개발중 //false 검수
	var mobileReadyFlag = false;//모바일 재생 확인
	var samsung_Browser_4;
	var deviceMobile; 
	var device_Android_4;
	var device_iPhone;
	var samsung_Browser_4;

/** onload **/
window.onload = function(){
	if(isMobilePlatform()){
		responsive();
		console.log(" 모바일 ");
		movileAlertView();
		M_chage();	
	}
	responsive();
		/*1페이지 스킵버튼*/

	var isBSkipFlag=false;
	if($("#btn_skip").length){
		var bSkipWidth = $("#btn_skip")[0].clientWidth;
		var bSkipHeight = $("#btn_skip")[0].clientHeight;
		isBSkipFlag=true;
		$("#btn_skip").bind("click",function(){
			$("#btn_skip").hide();
			isBSkipFlag=false;
			Player.play();
			Player.currentTime = isSkipTime;
		})

	}

	$("#btn_skip").bind("mouseover",function(){
		var thisBg = $(this).css("background-image");
		thisBg = thisBg.substr(0,thisBg.length-8);
		$(this).css("background-image", thisBg + '_u.png")')
	})
	
	$("#btn_skip").bind("mouseout",function(){
		var thisBg = $(this).css("background-image");
		thisBg = thisBg.substr(0,thisBg.length-8);
		$(this).css("background-image", thisBg + '_d.png")')
	})
	
	if(mnumarr){
	for(i=1;i<=mnumarr.length;i++){
	for(j=1;j<=mnumarr[i];j++){

	$("#"+btn_namearr[i][j]).bind("mouseover",function(){
		var thisBg = $(this).css("background-image");
		thisBg = thisBg.substr(0,thisBg.length-6);
		$(this).css("background-image", thisBg + '_over.png")')
	})
	
	$("#"+btn_namearr[i][j]).bind("mouseout",function(){
		var thisBg = $(this).css("background-image");
		thisBg = thisBg.substr(0,thisBg.length-11);
		$(this).css("background-image", thisBg + '.png")')
	})
	
	$("#"+btn_namearr[i][j]).bind("click",function(){
		handlePauseClick();
			for(k=1;k<=mnumarr.length;k++){
			for(y=1;y<=mnumarr[k];y++){

				$("#"+win_namearr[k][y]).css("visibility","hidden");
				$("#"+win_namearr[k][y]+"_close").css("visibility","hidden");
			}}
			var thisId =$(this).attr('id').substr(9);
			$("#win_stopm"+thisId).css("visibility","visible");
			$("#win_stopm"+thisId+"_close").css("visibility","visible");


	})
	
	
	$("#"+win_namearr[i][j]+"_close").bind("mouseover",function(){
		var thisBg = $(this).css("background-image");
		thisBg = thisBg.substr(0,thisBg.length-6);
		$(this).css("background-image", thisBg + '_over.png")')
	})
	
	$("#"+win_namearr[i][j]+"_close").bind("mouseout",function(){
		var thisBg = $(this).css("background-image");
		thisBg = thisBg.substr(0,thisBg.length-11);
		$(this).css("background-image", thisBg + '.png")')
	})
	
	
	$("#"+win_namearr[i][j]+"_close").bind("click",function(){
			handlePlayClick();
			for(k=1;k<=mnumarr.length;k++){
			for(y=1;y<=mnumarr[k];y++){
				$("#"+win_namearr[k][y]).css("visibility","hidden");
				$("#"+win_namearr[k][y]+"_close").css("visibility","hidden");
			}}
	})
	
	
	}}
	}


};

/** resizing **/
$(window).resize(function(e){
	M_chage();
	responsive();
});

/** 모바일 화면 돌릴때 **/
$( window ).on( "orientationchange", function( event ) { 
	
	M_chage();
	responsive();
});

/** 페이지 초기화 **/
function initialize(){
	if(!dev){//개발 아닐때 
		$("body").attr("oncontextmenu","return false");
		$("body").attr("ondragstart","return false");
		$("body").attr("onselectstart","return false");
	}
	
	/** menu **/	
	setIndex();

	/** bottom **/
	setBottom();	
		
	/** top **/
	setTop();

	/** 효과음 장착 **/
	writeEffectAudio();
	
	// 박성훈 : 수정
	_loadFrameAct();

}
//반응형 scale 조정
function responsive(){
	
	w_h = $(window).height();
	w_w = $(window).width();
	//alert(w_h);
	//alert(w_w);
	$("#wrap").height(w_h);
	$("#wrap").width(w_w);
	if (isMobilePlatform())
	{
		if( w_w < _cw || w_h < _ch){
			var h_scale = w_h/_ch;			
			//alert(h_scale);
			var w_scale = w_w/_cw;
			//alert(w_scale);
			if(h_scale>w_scale){//w 기준
				container_scale = w_scale;
			}else{//h 기준
				container_scale = h_scale;
			}
		}
		//alert(container_scale);
		if(device_Android_4){//안드로이드 버전 4 일때
			//alert("안드로이드 버전 4 -webkit-transform")
			//
			$("#fs-container").css("-webkit-transform",'scale('+container_scale+','+container_scale+')')
			$("#fs-container").css("-webkit-transform-origin",'50%')
			$("#fs-container").css("margin-top", "-280px");
			
		}else{//그외 기기들
			//$("#fs-container").css({position: 'absolute',top: '0px',right: '0px'})
			$("#fs-container").css("transform",'scale('+container_scale+','+container_scale+')')
			$("#fs-container").css("transform-origin",'50%')
			$("#fs-container").css("margin-top", "-317px");
		}

	}else{
		$("#fs-container").css({position: 'absolute',top: '0px',left: '0px',marginTop:'0px',marginLeft:'0px'})		
	}	
	//console.log($("#wrap").height() - 650 + h_scale);
	
}

//모바일 화면 가로 세로 체크 
function M_chage(){
//	if(window.orientation == 0 ){//세로
//		//alert("세로");
//		$("#mobile_ready img").attr("src","../common/css/img/m_horizontal.png")
//		$("#mobile_ready").show();
//		setPause();
//		$("#mobile_ready").off("click");
//	}else{//가로
		//alert("가로")
		if( !mobileReadyFlag ){
			$("#mobile_ready img").attr("src","../common/css/img/m_ready.png");
			$("#mobile_ready").show();
		}else{
			$("#mobile_ready").hide();
		}
		$("#mobile_ready").on("click",function(){
			$(this).hide();
			setPlay();
			mobileReadyFlag = true;
		});
//	}
}

//모바일 view
function movileAlertView(){
	var m_view = '';
	m_view += '<div id="mobile_ready" style="z-index:999;width:100%;height:100%;position:fixed;background: rgb(255, 255, 255);left:0;top:0;text-align:center;display:none;">';
	m_view += '	<img style="position:absolute;left:50%;top:50%;margin-left:-160px;margin-top:-61.5px">';
	m_view += '</div>';
	$("#wrap").append(m_view);

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

function MobileCheck(){
	//alert('화면접속'+navigator.userAgent); 
	//return true;
	deviceMobile = true;
	device_Android_4 = false;
	device_iPhone = false;
	samsung_Browser_4 = false;
	if(/Android/i.test(navigator.userAgent) || /iPhone/i.test(navigator.userAgent) || /Mobile/i.test(navigator.userAgent) ){
		//mobile 
		//alert('mobile 접속'); 
		if( /SamsungBrowser\/4.0/i.test(navigator.userAgent)) {
			//alert("삼성내장브라우저 버전 4.0")
			alert("배속을 지원하지 않는 브라우저 입니다. ")
			samsung_Browser_4 = true;
		}
		if( /Android 4./i.test(navigator.userAgent)) {
			//alert("안드로이드 버전 4.")
			device_Android_4 = true;
			// 안드로이드 4
		} else {
			device_Android_4 = false;
			device_iPhone = false;
			if(/iPhone/i.test(navigator.userAgent)){
				device_iPhone = true;
			}
			//alert("안드로이드4.버전이 아닌")
			// 그 외 디바이스
		}
		//return true;
	} else { 
		//pc 
		deviceMobile = false;
		//return false;
	} 
}