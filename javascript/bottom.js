/**
	2017. 03. 10
	stroy21
	FunnsySky 
	funnysky@story21.co.kr
	Bottom View 
	top.navi_frame.FnNextMove(next_page)
**/

///////////////////////////////////////////////////////////////////////////////////////////////////
var Player, _rect, _slide_bg, _sound_bar, _handleGap=11, speedNum, pictureNum, _dragWidth, _dragX;
var videoChk = false;
var scriptFlag = false;
var volume = 1;
var rateNum = 1;
var mapFlag = false;
var slideDownFlag = false;
var soundBarW ;
var enableScript = true;
var pictFlag = false;


//var ck_pg = parseInt(parent.ck_pg, 10);


//var progressControll = true;	//true : 제어 가능
//var progressControll = false;   //false : 제어 불가능

if(isLocal){
	var progressControll = 1;
} else {
//	if (parent.parent.controlYnFn() == true) {
//		var progressControll =  0;
//	} else {
//		var progressControll =  1;
//	}
	var progressControll =  1;
}

//var progressControll =  0;

function setBottom(){

	var footerStr = '';
	footerStr += '<div class="footer_inner"> ';
	footerStr += '	<div class="control"> ';
	//footerStr += '		<p class="logo" title="로고"  alt="로고" ></p> ';
	//footerStr += '		<p class="note tab over" title="교재다운로드"  alt="교재다운로드" ></p> ';
	//footerStr += '		<p class="index tab over" title="인덱스"  alt="인덱스" ></p> ';
	//footerStr += '		<p class="map tab over" title="용어사전"  alt="용어사전" ></p> ';
	//footerStr += '		<p class="" title="학습도우미"  alt="학습도우미" ></p> ';

	footerStr += '		<div class="time"> ';//시간
	footerStr += '			<ul class="cf"> ';
	footerStr += '				<li class="time_cur"> 00:00 </li> ';
	footerStr += '				<li> &nbsp;/ &nbsp; </li>';
	footerStr += '				<li class="time_tol"> 00:00 </li> ';
	footerStr += '			</ul> ';
	footerStr += '		</div> ';

	footerStr += '		<div class="slide"> ';//슬라이드 바
	footerStr += '			<div class="slide_inner"> ';
	footerStr += '				<p class="slide_bg" id="slide_bg"><span class="slide_current"></span></p> ';
	footerStr += '			</div> ';
	footerStr += '		</div> ';

	footerStr += '		<p class="play tab over" title="재생"  alt="재생" tabindex="2" ></p> ';
	footerStr += '		<p class="pause tab over" title="일시정지" alt="일시정지" tabindex="3" ></p> ';
	footerStr += '		<p class="replay tab over" title="다시보기" alt="다시보기" tabindex="4" ></p> ';

	
	//console.log("isMobilePlatform() : " + isMobilePlatform())
		//footerStr += '		<p class="script tab over" title="자막" alt="자막" tabindex="5"  ></p> ';
		//footerStr += '		<p class="full tab over" title="전체보기" alt="전체보기" tabindex="6"  ></p> ';
		
		footerStr += '		<p class="sound_btn tab over" title="소리끄기" alt="소리끄기"  tabindex="7" ></p> ';
		footerStr += '		<div class="sound"> ';//사운드 박스 
		footerStr += '			<span class="sound_bar_bg">';
		footerStr += '				<span class="sound_bar" id="sound_bar"> ';
		footerStr += '					<span class="sound_bar_mask"></span> ';
		footerStr += '				</span>';
		footerStr += '			</span>';
		footerStr += '		</div> ';
		footerStr += '<div class="scriptView"><div class="script_close">Close<span> ▼</span></div><div class="script_inner"></div></div> ';

		//footerStr += '		<div class="speed select" title="배속선택" alt="배속선택"> ';//배속
		//footerStr += '		<p class="q tab over" title="?" alt="?" tabindex="8"  ></p> ';

	//footerStr += '			<ul> ';
	//footerStr += '				<li class="low  tab over"  title="느리게" alt="느리게"  tabindex="8"></li> ';
	//footerStr += '				<li class="curRate"></li> ';
	//footerStr += '				<li class="high  tab over"  title="빠르게" alt="빠르게"  tabindex="9"></li> ';
	//footerStr += '			</ul>';
	//footerStr += '		</div> ';

		footerStr += '		<div class="paging"> ';

	footerStr += '			<ul> ';
	if(isMobilePlatform()){
	  footerStr += '				<li class="preM tab over"  title="이전페이지" alt="이전페이지"  tabindex="10"></li> ';
	  footerStr += '				<li class="page_current">1</li> ';
	  footerStr += '				<li class="dash"></li> ';
	  footerStr += '				<li class="page_total">1</li> ';
	  footerStr += '				<li class="nextM tab over"  title="다음페이지" alt="다음페이지"  tabindex="11"></li> ';
	}else{
	  footerStr += '				<li class="pre tab over"  title="이전페이지" alt="이전페이지"  tabindex="10"></li> ';
	  footerStr += '				<li class="page_current">1</li> ';
	  footerStr += '				<li class="dash"></li> ';
	  footerStr += '				<li class="page_total">1</li> ';
	  footerStr += '				<li class="next tab over"  title="다음페이지" alt="다음페이지"  tabindex="11"></li> ';
		
	}
	footerStr += '			</ul> ';
	footerStr += '		</div> ';
	//footerStr += '		<p class="close_btn tab over" title="닫기" alt="닫기"  tabindex="12" ></p> ';	
	footerStr += '	</div> ';//end control
	footerStr += '	<div class="next_tooltip"></div> ';
	if (isExp2==false) {
		footerStr += '	<div class="btn_clickCall"></div> ';
	}
	footerStr += '</div> ';

	$("#fs-footer").append(footerStr);

	setScript();
	
	/** 메인 비디오 || 오디오 장착**/
	if(pageArray[curPage][1] == "A"){		
		writeMedia(".mp3")
	}else{
		writeMedia(".mp4")
	}

	bottomEvent();
	

}


//하단 컨트롤러 이벤트
function bottomEvent(){

	$("#fs-footer .map").on("click", handleMapClick);
	$("#fs-footer .note").on("click", handleNoteClick);
	$("#fs-footer .index").on("click", handleOpenHideIndex);//index
	$("#fs-footer .help").on("click", handleGuideClick);
	$("#fs-footer .play").on("click", handlePlayClick);
	$("#fs-footer .pause").on("click", handlePauseClick);
	$("#fs-footer .replay").on("click", handleReplayClick);
	$("#fs-footer .sound_btn").on("click", handleSoundClick);	
		
	$("#fs-footer .script").on("click", handleScriptClick);
	$("#fs-footer .full").on("click", handleFullClick);

	$("#fs-footer .speed .low").on("click",handleSpeedLowClick);
	$("#fs-footer .speed .high").on("click",handleSpeedHighClick);
	
	$("#fs-footer .picture span").on("click",handlePictureClick);

	$("#fs-footer .control .pre").on("click", handlePrevClick);
	$("#fs-footer .control .next").on("click", handleNextClick);
	$("#fs-footer .close_btn").on("click", handleCloseClick);

	$("#fs-footer .control .preM").on("click", handlePrevClick);
	$("#fs-footer .control .nextM").on("click", handleNextClick);

	$(".script_close").on("click",function(){
		$(".scriptView").stop().animate({"top":"50px"},600);
		scriptFlag = !scriptFlag;
	});

	$("#fs-footer .page_current").text(itostr(curPage));
	$("#fs-footer .page_total").text(itostr(curTol));

	$('.control .tab').on('keypress', function(e) {
		if (e.which == 13) {
			switch($(this).attr("tabindex")){
				case 1 : handleNoteClick();//교재다운로드
					break;
				case 2 : handleOpenHideIndex();//handleGuideClick();//학습도우미
					break;
				case 3 : handleGuideClick();//학습도우미
					break;
				case 4 : handlePlayClick();//재생
					break;
				case 5 : handlePauseClick();//일시정지
					break;
				case 6 : handleReplayClick();//다시 재생
					break;
				case 7 : handleScriptClick();//자막
					break;
				case 8 : handleSoundClick();//사운드 on/off
					break;
				case 9 : handleSpeedLowClick();//배속 느리게
					break;
				case 10 : handleSpeedHighClick();//배속 빠르게
					break;
				case 11 : handlePrevClick();//이전 페이지 이동
					break;
				case 12 : handleNextClick();//다음페이지 이동
					break;
			}
		}
	});
	
	$(".over").on("mouseover", {state  : "u"}, HandlechangeBg);
	$(".over").on("mouseout", {state  : "d"},HandlechangeBg);

	function HandlechangeBg(e){
		var state = e.data.state ;
		var thisBg = $(this).css("background-image");
		thisBg = thisBg.substr(0,thisBg.length-8);
		$(this).css("background-image", thisBg + '_' + state + '.png")')
	}
	
	
	if(isMobilePlatform()){
		//$(".paging").css("right", "120px");
		$(".speed").css("left", "714px");
		$("#fs-footer .next_tooltip").css("left", "840px");
	}

	if (getCookie('volume')=='1')	{
		$(".sound_btn").css("background-image","url(../common/css/img/footer/footer_sound_on_d.png)");
		SoundFlag = false;
		Player.muted = false;
	} else if (getCookie('volume')=='0')	{
		$(".sound_btn").css("background-image","url(../common/css/img/footer/footer_sound_off_d.png)");
		Player.muted = true;
		SoundFlag = true;
	}

}


//비디오 or 오디오 셋팅
function writeMedia(obj){	
	if(pageArray[curPage][1] == "A"){		
		$("#fs-content").append('	<div id="mediaObj" />	');
		$("#mediaObj").append('	<audio id="MPlayer"/> ');
	}else{
		$("#fs-content").append('	<div id="mediaObj" />	');
		$("#mediaObj").append('	<video id="MPlayer" contextmenu="false" playsinline webkitplaysinline autoplay="autoplay"/> ');
	}

	// 박성훈 추가
	if (obj=='.mp3') {
		pathMp4 = mp3Path + itostr(curChasi) + "_" + itostr(curPage) + obj;
	} else {
		if (getCookie('mp4of') && (curChasi=='04') && (curPage=='06') )	{
			pathMp4 = vodPath + getCookie('mp4of') + obj;
		} else {
			pathMp4 = vodPath + itostr(curChasi) + "_" + itostr(curPage) + obj;
		}
	}

	//alert("pathMp4 : "+pathMp4)
	Player = document.getElementById("MPlayer");
	Player.controls = false;
	Player.src = pathMp4;	
	Player.volume = volume;	
	soundBarW = $('.sound_bar_bg').width();
	if(document.cookie.indexOf("volume") == -1 ){
		//console.log("쿠키 없음")
		$('.sound_bar').css("width", volume*soundBarW);
	}else{
		$('.sound_bar').css("width", getCookie('volume')*soundBarW);
	}

	commonControl();

}


//슬라이더 드래그 이벤트 
function sliderEvent(){

	$(".slide_inner").on("mouseup",sliderGo);
	$(".slide_inner").on("mouseleave",sliderGo);

	$(".slide_inner").on("mousedown", function(e){//무브 true로
        
	if(progressControll==0 ){
        if(curPage >= ck_pg){
			 alert("학습 완료 후 이동 가능 합니다.");        
    	} else{
 	       slideDownFlag = true;//드래그 가능성 있음	
			var cX = e.clientX;
			var slideX = e.clientX-_dragX;//슬라이더 상에 마우스 x값
			var _dragPerc = slideX/(_rect.width);
			var seekto = Player.duration * _dragPerc;//현재 시간
			setPause();//일시정지
	
			if( cX < _dragX ){
				seekto = 0;
			}else if( cX > _dragWidth ){
				seekto = Player.duration;//마지막시간으로 보내기

			}else{
				slideX = e.clientX-_dragX;//슬라이더 상에 마우스 x값
				_dragPerc = slideX/(_rect.width);
				seekto = Player.duration * _dragPerc;//현재 시간
			}
			Player.currentTime = seekto;//재생할 시간으로 보내서
        
    	}
	} else{
 	       slideDownFlag = true;//드래그 가능성 있음	
			var cX = e.clientX;
			var slideX = e.clientX-_dragX;//슬라이더 상에 마우스 x값
			var _dragPerc = slideX/(_rect.width);
			var seekto = Player.duration * _dragPerc;//현재 시간
			setPause();//일시정지
	
			if( cX < _dragX ){
				seekto = 0;
			}else if( cX > _dragWidth ){
				seekto = Player.duration;//마지막시간으로 보내기

			}else{
				slideX = e.clientX-_dragX;//슬라이더 상에 마우스 x값
				_dragPerc = slideX/(_rect.width);
				seekto = Player.duration * _dragPerc;//현재 시간
			}
			Player.currentTime = seekto;//재생할 시간으로 보내서
        
	}
        
	});
	
	$(".slide_inner").on("mousemove",function(e){//무브 잡기

		if(slideDownFlag){
			setPause();//정지
			var cX = e.clientX;//마우스 위치값
			var slideX = cX-_dragX;//슬라이더 상에 마우스 x값 _drage = 슬라이더 left좌표값
			var _dragPerc = slideX/(_rect.width);//슬라이더 너비값
			var seekto = Player.duration * _dragPerc;//현재 시간

			if( cX < _dragX ){
				seekto = 0;
			//	setPlay();//재생
			}else if( cX > _dragWidth ){
				seekto = Player.duration;//마지막시간으로 보내기
			}else{
			//	setPlay();//재생
			}
			Player.currentTime = seekto;//재생할 시간으로 보내서

		}

	});
}

/** 슬라이더 터치시 움직임 **/
function sliderGo(e){

	var cX = e.clientX;
	var slideX = e.clientX-_dragX;//슬라이더 상에 마우스 x값
	var _dragPerc = slideX/(_rect.width);
	var seekto = Player.duration * _dragPerc;//현재 시간

	if(slideDownFlag){//일단 슬라이드에 마우스 누르는중

		if( cX < _dragX ){
			seekto = 0;
			Player.currentTime = seekto;//재생할 시간으로 보내서
			setPlay();//재생
			$(".play").hide();
			$(".pause").show();
		}else if( cX > _dragWidth ){
			seekto = Player.duration;//마지막시간으로 보내기
			Player.currentTime = seekto;//재생할 시간으로 보내서
			setPause()
		}else{
			slideX = e.clientX-_dragX;//슬라이더 상에 마우스 x값
			_dragPerc = slideX/(_rect.width);
			seekto = Player.duration * _dragPerc;//현재 시간
			Player.currentTime = seekto;//재생할 시간으로 보내서
			setPlay();//재생
			$(".play").hide();
			$(".pause").show();
		}
		
	}
	slideDownFlag = false;//드래그 끝
}

function commonControl(){
	_slide_bg = document.getElementById("slide_bg");
	if(!isMobilePlatform()){
		_sound_bar = document.getElementById("sound_bar");
	}
	

	var _interval = window.setInterval(function() {
		if(Player.readyState > 0) {//비디오 들어왔을때
			if(!isMobilePlatform()){
				_sound_bar.addEventListener("mousedown", volSeek, false);//사운드
			}			

				Player.addEventListener("timeupdate", seekTimeUpdate, false);//비디오 시간체크
				_rect = _slide_bg.getBoundingClientRect();
				_dragX = _rect.left;//슬라이더 시작점
				//if(isLocal){ _dragX = 242; }    // 로컬에서 타이머바 이상한 문제
				
				_dragWidth = _rect.left+_rect.width;//슬라이더 끝점
				slideDownFlag = false;
				sliderEvent();

				clearInterval(_interval);			
				videoChk = true;
				if(isMobilePlatform()){
					setPause();
					//setPlay();
				}else{
					//setPause();				
					setPlay();
					$(".play").hide();
					$(".pause").show();
				}
		}else{
			//console.log("loading!!!");
		}
	}, 200);
	
}

/** 러닝맵 클릭 **/
function handleMapClick(e){
	//protoAlt();
	//return;
	//msg("러닝맵");
	/*******새창*******/	
	window.open("../common/dic/dic.html", "", "width=800, height=500")

	/*******
	레이어팝업
	if(!mapFlag){//false
		//console.log("열릴때 "+mapFlag);
		setPause();	
		$(".chap_"+ currentPath).addClass("active");
		$("#map").fadeIn(800);
		mapFlag = true;
		//console.log("열고 "+mapFlag);
	}
	*******/	
	
}

/** 강의 자료 다운 클릭 **/
function handleNoteClick(e){
//	alert("강의 노트")
	var fileName = "../common/down/note.zip";
	window.open(fileName);
}

/** 학습도우미 클릭 **/
function handleGuideClick(){
	//protoAlt();
	//return;
	window.open("./help.html", "", "width=803, height=513")
}

/** play 클릭 **/
function handlePlayClick(e){
	setPlay();
	$(".play").hide();
	$(".pause").show();
}

/** pause 클릭 **/
function handlePauseClick(e){
	setPause();
	$(".pause").hide();
	$(".play").show();
}

/** 리플레이 클릭 **/
function handleReplayClick(e){
	Player.currentTime = 0;
	setPlay();
	$(".play").hide();
	$(".pause").show();
	$(".btn_clickCall").hide();
	if ($("#loadActFrame")[0].contentWindow) {
		$("#htmlContents").html('');
		$("#mvEndContents").hide();
		_loadFrameAct();
	}

}

/** 스크립트 셋팅 **/
function setScript(){
	
	if(scriptArr[curPage]['1'] ==  ""){
		$(".script").css({"background":"url(../common/css/img/footer/script_enable_d.png) 50% 50% no-repeat", "cursor":"default"});
		enableScript = false;
	}else{
		var levelof = getCookie('levelof');
		if (levelof && (curChasi=='04') && (curPage=='06') )	{
				$(".script_inner").append('<span>'+scriptArr[curPage][levelof]+'</span>');
		} else {
			for (var i=1;i<scriptArr[curPage].length ; i++){
				$(".script_inner").append('<span>'+scriptArr[curPage][i]+'</span>');
			}
		}
	}
}

/** 스크립트 클릭 **/
function handleScriptClick(e){
	
	if(enableScript){
		if(!scriptFlag){
			$(".scriptView").show().stop().animate({"top":"-110px"},600);	
					//scriptFlag = true
		}else{
			$(".scriptView").stop().animate({"top":"20px"},600,function(){
				$(this).hide();
			});
			//$(".script_inner span").remove();
		}
		scriptFlag = !scriptFlag;
	}
}

/** fullscreen 클릭 **/
function handleFullClick(e){
	fullScreen();
}

var rate = 1;
var rateArr = [0.8, 1, 1.2, 1.5, 2];
var rateArrText = ["x0.8", "x1.0", "x1.2", "x1.5", "x2.0"];
var rateFlag = false;

/**  배속 왼쪽 버튼 클릭**/
function handleSpeedLowClick(){
	if(rateFlag == false){
		if(rate > 0){
			rate--;
		}
		if(rate == 0){
			rate = 0;
			rateFlag = true;
		}
		$(".curRate").text( rateArrText[rate]);
		fnRate(rate);
	}else{
		if(rate >= 0 || rate <= 4){
			rateFlag = false;
		}
	}
}
/**  배속 오른쪽 버튼 클릭**/
function handleSpeedHighClick(){
	
	if(rateFlag == false){		
		if(rate < 4){
			rate++;
		}else{
			rate =4;
			rateFlag = true;
		}
		$(".curRate").text( rateArrText[rate]);
		fnRate(rate);
	}else{
		if(rate >= 0 || rate <= 4){
			rateFlag = false;
		}
	}
}
// 배속 변경 
function fnRate(num){
	try{
		Player.playbackRate  = rateArr[num];
		rateNum = rateArr[num];
	}catch(e){
		//console.log(e);
	}		
}

/** 화질 선택 버튼 클릭  **/
function handlePictureClick(){	
	if(!pictFlag){
		$("#fs-footer .footer_inner .picture ul").append('<li>800k</li>');
		$("#fs-footer .footer_inner .picture ul").append('<li>1000k</li>');
		$("#fs-footer .footer_inner .picture ul").show();
		$("#fs-footer .footer_inner .picture span").css("color","#D29364");
		pictFlag = true;
		$("#fs-footer .footer_inner .picture ul li").on("click",function(){
			fnReMov($(this).index());
			pictureNum = $(this).text();
			$("#fs-footer .footer_inner .picture ul").show();
			$("#fs-footer .footer_inner .picture ul").empty();
			$("#fs-footer .footer_inner .picture span").text(pictureNum);
			$("#fs-footer .footer_inner .picture span").css("color","#999");
			$("#fs-footer .footer_inner .picture span").hover(function(){
			if(!PC_MODE){
				$(this).css("color","#D29364");
			}
			},function(){
				$(this).css("color","#999");
			});
			pictFlag = false;
		});
	}else if(pictFlag){
		pictFlag = false;
		$("#fs-footer .footer_inner .picture ul").empty();
		$("#fs-footer .footer_inner .picture span").hover(function(){
			$(this).css("color","#D29364");
		},function(){
			$(this).css("color","#999");
		});
		pictFlag = false;
	}
}
// 화질 변경
function fnReMov(num){
	var removArr = [ "800k", "1000k"];
	try{
		changeVod(removArr[num],  Player.currentTime);
		rateNum = rateArr[num];
	}catch(e){
		//console.log(e);
	}	
}

function changeVod(_fileName, _time){
	pathMp4 = vodPath + itostr(curChasi) + "_" + itostr(curPage) + "_" + _fileName + ".mp4";
	Player.src = pathMp4;
	//console.log("Player.src : "+Player.src);

	var _interval = window.setInterval(function() {
		if(Player.readyState >= 4) {		
			Player.play();
			Player.currentTime = _time
			Player.playbackRate = rateNum;
			clearInterval(_interval);
		}else{
			//console.log("loading!!!");
		}
	}, 200);
}


/** 이전버튼 클릭 **/
function handlePrevClick(){
	var _targetUrl;
	if(curPage != 1){
		curPage--;
		_targetUrl=itostr(curPage)+'.html';
		if(!isLocal){
			NextMove(_targetUrl) 			
		} else {
			location= _targetUrl;
		}
	}else{
		alert("처음 페이지입니다.");
	}
	
}

/** 다음버튼 클릭 **/
function handleNextClick(){
	if(progressControll==0){
      if(curPage >= ck_pg){
		 alert("학습 완료 후 이동 가능 합니다.");
		 return;
      }else{
	       var _targetUrl;
		   if(curPage != curTol){	
			curPage++;
			_targetUrl=itostr(curPage)+'.html';
			NextMove(_targetUrl);
		   }else{
			alert("마지막 페이지 입니다.");
			return;
		   }
       }
	}else{
	       var _targetUrl;
		   if(curPage != curTol){	
			curPage++;
			_targetUrl=itostr(curPage)+'.html';
			NextMove(_targetUrl);
		   }else{
			alert("마지막 페이지 입니다.");
			return;
		   }
	}
	
}


//재생 일시정지 동시에 
function playPause(){
	if (Player.paused) {		
		setPlay();
	} else {
		setPause();
	}	
}

function setPause(){	
	Player.pause();
}

function setPlay(){
	Player.play();
}

function replayBtn(){	
	Player.currentTime = 0;
	Player.play();
}
var soundW;
/** 볼륨조절 **/
function volSeek(e){
	var _dragX = $("#sound_bar").offset().left;	
	var xx = (e.clientX - _dragX );
	soundBarW = $('.sound_bar_bg').width();
	soundW = $("#sound_bar").width();//현재 볼륨 너비

	if(xx < 3){//음소거
		xx = 0;	
		Player.muted = true;
		$(".sound_btn").css("background-image","url(../common/css/img/footer/footer_sound_off_d.png)");
		$(this).attr("alt","소리켜기");
		$(this).attr("title","소리켜기");

		SoundFlag = true;
	}else{
		console.log("소리조절, 쿠키 저장")
		Player.muted = false;
		$(".sound_btn").css("background-image","url(../common/css/img/footer/footer_sound_on_d.png)");
		$(this).attr("alt","소리끄기");
		$(this).attr("title","소리끄기");
		volume = xx/soundBarW;//0.xxxx  현재 너비//전체너비
		Player.volume = volume;
		document.cookie = "volume="+volume;//쿠키에 저장
		SoundFlag = false;
	}

	$('.sound_bar').css("width", xx);
	
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

// 쿠키 가져오기
function getCookie(cName) {
		cName = cName + '=';
		var cookieData = document.cookie;
		var start = cookieData.indexOf(cName);
		var cValue = '';
		if(start != -1){
				 start += cName.length;
				 var end = cookieData.indexOf(';', start);
				 if(end == -1)end = cookieData.length;
				 cValue = cookieData.substring(start, end);
		}
		return unescape(cValue);
}
var SoundFlag = false;
/** 사운드 on,off **/
function handleSoundClick(e){
	
	soundBarW = $('.sound_bar_bg').width();
	$(this).removeClass("over");
	 if (!SoundFlag) {
			soundW = $("#sound_bar").width();
			$('.sound_bar').css("width", 0);
			Player.muted = true;
			$(".sound_btn").css("background-image","url(../common/css/img/footer/footer_sound_off_d.png)");
			$(this).attr("alt","소리켜기");
			$(this).attr("title","소리켜기");
			setCookie("volume","0",360); //쿠키에 저장
			//console.log(' 소리끔 >> '+document.cookie)
			if ($("#loadActFrame")[0]) {
						$('#loadActFrame')[0].contentWindow.isNextSnd.muted = true;
			}

	} else {
			Player.muted = false;
			$(".sound_bar").width(soundW)
			$(".sound_btn").css("background-image","url(../common/css/img/footer/footer_sound_on_d.png)");
			$(this).attr("alt","소리끄기");
			$(this).attr("title","소리끄기");
			setCookie("volume",volume,360);//쿠키에 저장
			
			if ($("#loadActFrame")[0]) {
						$('#loadActFrame')[0].contentWindow.isNextSnd.muted = false;
			}
			//console.log(' 소리켬 >> '+Player.muted+' cookie >> '+document.cookie)

    }
	SoundFlag = !SoundFlag;	
}

function handleCloseClick(e){
	setPause();
	if(isMobilePlatform()){
		//window.location ="close://";
		window.open('','_top').close();
	}else{
		top.close();	
	}
}

function HandlechangeBg(e){
	var state = e.data.state ;
	var thisBg = $(this).css("background-image");
	thisBg = thisBg.substr(0,thisBg.length-8);
	$(this).css("background-image", thisBg + '_' + state + '.png")')
}
var endFlag = false;
var toolTipFlag = false;
var eventFlag = false;
var timeLimit = pageArray[curPage][2];

/** 시간 표시 **/
function seekTimeUpdate() {
	//var mov_curTime = document.getElementsByClassName("mov_curTime");
	//var mov_tolTime = document.getElementsByClassName("mov_tolTime");
	if(Player.duration){		
		var nt = Player.currentTime * (100 / Player.duration);
		var curmins = Math.floor(Player.currentTime / 60);
		var cursecs = Math.floor(Player.currentTime - curmins * 60);
		var durmins = Math.floor(Player.duration / 60);
		var dursecs = Math.floor(Player.duration - durmins * 60);
		if (cursecs < 10) { cursecs = "0" + cursecs; }
		if (dursecs < 10) { dursecs = "0" + dursecs; }
		if (curmins < 10) { curmins = "0" + curmins; }
		if (durmins < 10) { durmins = "0" + durmins; }
		
		$(".time .time_cur").text(curmins + ":" + cursecs);
		$(".time .time_tol").text(durmins + ":" + dursecs);
		
		
		
		
	if(isSkipTime>0){
		if(Player.currentTime>isSkipTime && $("#btn_skip") && $("#btn_skip").length){
			$("#btn_skip").hide();
		}
	}
	if(stoptime){
		for(i=1;i<stoptime.length;i++){
			if(Player.currentTime>=stoptime[i][0] && Player.currentTime<=stoptime[i][1]){
				for(j=1;j<btn_namearr[i].length;j++){
					$("#"+btn_namearr[i][j]).css("visibility","visible");
					//$("#btn_stopm01_01").css("visibility","visible");
				}
			}else{
				for(j=1;j<btn_namearr[i].length;j++){
					$("#"+btn_namearr[i][j]).css("visibility","hidden");
				}
			}
		}
	}
	
	
	
	
	
	
	
	
	
		if(videoChk){			

			/** 슬라이드바 제어 **/
			var xW = $(".slide_bg").width()* (Player.currentTime / Player.duration) ;			
			$(".slide_current").css("width", xW);			
			
			//일단 영상 끝났는지 체크
			if(Player.currentTime >= Player.duration ){
				endFlag = true;
				setBalloon();//이래나 저래나 nexttooltip 나옴
			}else{
				endFlag = false;
				$(".next_tooltip").hide();
			}
			//html show 
			if( pageArray[curPage][1] == "V3" || pageArray[curPage][1] == "A" ){ 
				if( Player.currentTime <= timeLimit ){
					$("#htmlShow").hide();
						//console.log(pageArray[curPage][3])
						/** 이벤트 페이지 초기화 **/
						if(pageArray[curPage][3] == "Check"){
							//quizInit();
						}	
						if(pageArray[curPage][3] == "Summary"){
							//initSummary();
						}
						if(pageArray[curPage][3] == "Ot"){
							//otInit2();
						}	
						endFlag = false;

						toolTipFlag = false;

						$(".next_tooltip").hide();

				}else{
					$("#htmlShow").show();	
				}
			}
			
		}//end if(videoChk){
		// 박성훈 추가
		try{_doSync(Player.currentTime,Player.duration);}catch(e){}

	}//end if(Player.duration){
}

/** 다음페이지 이동 툴팁 **/
function setBalloon(){

	if(curPage == curTol){
		$('.next_tooltip').css({"background":"url('../common/css/img//footer/footer_last_tooltip1.png') 100% 50% no-repeat"});			
	}else{
		$('.next_tooltip').css({"background":"url('../common/css/img//footer/footer_next_tooltip1.png') 100% 50% no-repeat"});	
	}
	if(isMobilePlatform()){
		$(".next_tooltip").css("left", "840px");
	}
	if( pageArray[curPage][1] == "V1"){
		if( endFlag ){
			progressControll = 1;
			$(".next_tooltip").fadeIn(1000,function(){
				playSound("chimes");
			});
			
		}else{
			$(".next_tooltip").hide();
		}
	}else if( pageArray[curPage][1] == "V3" ||  pageArray[curPage][1] == "A" ){	
		if( endFlag && toolTipFlag ){
			progressControll = 1;
			$(".next_tooltip").fadeIn(1000,function(){
				playSound("chimes");
			});
		}
		if( pageArray[curPage][3] == "Practice" ){
			if( endFlag ){
				progressControll = 1;
				$(".next_tooltip").fadeIn(1000,function(){
					playSound("chimes");
				});
				
			}else{
				$(".next_tooltip").hide();
			}
		}
	}  
}

/***학습지원도구**/
function otherEvent(_str)
{
	switch (_str)
	{
		case "mcOther1" :

		//urls= z+"/index.html";
	//window.open(urls, "winpopRe", "width="+w+",height="+h+",'toolbar=no,location=no,directories=no,status=no,menubar=no, scrollbars=no,resizable=no,copyhistory=no, resizable=yes,toolbars=yes,menubars=0");	

			nPopupWidth = 803;
			nPopupHeight = 513;
			var strFPopupPath =  "./help.html"

			window.open(strFPopupPath, "_help", "width=" + nPopupWidth + ", height=" + nPopupHeight+',toolbar=no,location=no,directories=no,status=no,menubar=no, scrollbars=no');
			popup.document.title = "학습도우미";

			break;

		case "learningMap" :
			nPopupWidth = 803;
			nPopupHeight = 513;
			strFPopupPath = "./Map.html";
			var popup = window.open(strFPopupPath, "_note", "width=" + nPopupWidth + ", height=" + nPopupHeight+', toolbar=no,location=no,directories=no,status=no,menubar=no, scrollbars=no');
			popup.document.title = "러닝맵";
			break;

		case "lecture" :
			
			window.open("../common/down/lecture_"+itostr(curChasi)+".zip");
			break;
			
		case "summaryDown" : 
			location.href="../common/down/summary_"+itostr(curChasi)+".zip";
			
			break;
	}
}

function fullScreen() {

	// 확대보기 시전 안하는 페이지 지정 
	if ($.inArray(curPage, notPageHuge)<0) {
			if (Player.requestFullscreen) {
			  	Player.requestFullscreen();
			} else if (Player.mozRequestFullScreen) {
			  	Player.mozRequestFullScreen();
			} else if (Player.webkitRequestFullscreen) {
			  	Player.webkitRequestFullscreen();
			}else if (Player.msRequestFullscreen) {
	    		Player.msRequestFullscreen();
			} else if (Player.webkitEnterFullscreen){
       		Player.webkitEnterFullscreen(); // 아이폰 풀스크린
      }
	}
}

function getInternetExplorerVersion2() {
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
var isIEVersion2 =getInternetExplorerVersion2();
var isExp2;
if(isIEVersion2==-1 && curPage==1){
	isExp2=false;
}else{
	isExp2=true;
}