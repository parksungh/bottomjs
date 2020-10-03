		
	$(document).ready(function(){

		// 퀴즈 정답 세팅
		var oxquizDap = new Array();
			oxquizDap[0] = 1;		// 1 : yes , 2 : no
			oxquizDap[1] = 1;		// 1 : yes , 2 : no
			oxquizDap[2] = 1;
			oxquizDap[3] = 1;
			oxquizDap[4] = 1;
			oxquizDap[5] = 1;
			oxquizDap[6] = 1;


		var myScore = 0 ;
		var tmp1 = '';			
		var oxmyArray = new Array();		

//		for(i=1;i<=oxquizDap.length;i++) {
//			
//			$(".ox"+i+"").bind("click",function(){
//
//					$("#ox_btn"+i+"_1").removeClass("ochoice");
//					$("#ox_btn"+i+"_2").removeClass("xchoice");
//					
//					tmp1 = Number(this.id.split("_")[2]);
//					if (tmp1 == 1) $("#ox_btn"+i+"_1").addClass("ochoice");
//					else $("#ox_btn"+i+"_2").addClass("xchoice");
//						
//						oxmyArray[i] = tmp1;
//						console.log("oxmyArray >>> "+oxmyArray)
//						playSound("click");   // 사운드 파일 경로 : common/sound ,  확장자는 꼭 mp3 여야 함.
//				
//			});
//			
//		}

			$(".ox1").bind("click",function(){

					$("#ox_btn1_1").removeClass("ochoice");
					$("#ox_btn1_2").removeClass("xchoice");
					
					tmp1 = Number(this.id.split("_")[2]);
					if (tmp1 == 1) $("#ox_btn1_1").addClass("ochoice");
					else $("#ox_btn1_2").addClass("xchoice");
						
						oxmyArray[0] = tmp1;
						console.log("oxmyArray >>> "+oxmyArray)
						playSound("click");   // 사운드 파일 경로 : common/sound ,  확장자는 꼭 mp3 여야 함.
				
			});

			$(".ox2").bind("click",function(){

					$("#ox_btn2_1").removeClass("ochoice");
					$("#ox_btn2_2").removeClass("xchoice");
					
					tmp1 = Number(this.id.split("_")[2]);
					if (tmp1 == 1) $("#ox_btn2_1").addClass("ochoice");
					else $("#ox_btn2_2").addClass("xchoice");
						
						oxmyArray[1] = tmp1;
						console.log("oxmyArray >>> "+oxmyArray)
						playSound("click");   // 사운드 파일 경로 : common/sound ,  확장자는 꼭 mp3 여야 함.
				
			});

			$(".ox3").bind("click",function(){

					$("#ox_btn3_1").removeClass("ochoice");
					$("#ox_btn3_2").removeClass("xchoice");
					
					tmp1 = Number(this.id.split("_")[2]);
					if (tmp1 == 1) $("#ox_btn3_1").addClass("ochoice");
					else $("#ox_btn3_2").addClass("xchoice");
						
						oxmyArray[2] = tmp1;
						console.log("oxmyArray >>> "+oxmyArray)
						playSound("click");   // 사운드 파일 경로 : common/sound ,  확장자는 꼭 mp3 여야 함.
				
			});

			$(".ox4").bind("click",function(){

					$("#ox_btn4_1").removeClass("ochoice");
					$("#ox_btn4_2").removeClass("xchoice");
					
					tmp1 = Number(this.id.split("_")[2]);
					if (tmp1 == 1) $("#ox_btn4_1").addClass("ochoice");
					else $("#ox_btn4_2").addClass("xchoice");
						
						oxmyArray[3] = tmp1;
						console.log("oxmyArray >>> "+oxmyArray)
						playSound("click");   // 사운드 파일 경로 : common/sound ,  확장자는 꼭 mp3 여야 함.
				
			});
			
			$(".ox5").bind("click",function(){

					$("#ox_btn5_1").removeClass("ochoice");
					$("#ox_btn5_2").removeClass("xchoice");
					
					tmp1 = Number(this.id.split("_")[2]);
					if (tmp1 == 1) $("#ox_btn5_1").addClass("ochoice");
					else $("#ox_btn5_2").addClass("xchoice");
						
						oxmyArray[4] = tmp1;
						console.log("oxmyArray >>> "+oxmyArray)
						playSound("click");   // 사운드 파일 경로 : common/sound ,  확장자는 꼭 mp3 여야 함.
				
			});
			
			$(".ox6").bind("click",function(){

					$("#ox_btn6_1").removeClass("ochoice");
					$("#ox_btn6_2").removeClass("xchoice");
					
					tmp1 = Number(this.id.split("_")[2]);
					if (tmp1 == 1) $("#ox_btn6_1").addClass("ochoice");
					else $("#ox_btn6_2").addClass("xchoice");
						
						oxmyArray[5] = tmp1;
						console.log("oxmyArray >>> "+oxmyArray)
						playSound("click");
				
			});
			
			$(".ox7").bind("click",function(){

					$("#ox_btn7_1").removeClass("ochoice");
					$("#ox_btn7_2").removeClass("xchoice");
					
					tmp1 = Number(this.id.split("_")[2]);
					if (tmp1 == 1) $("#ox_btn7_1").addClass("ochoice");
					else $("#ox_btn7_2").addClass("xchoice");
						
						oxmyArray[6] = tmp1;
						//console.log("oxmyArray >>> "+oxmyArray)
						playSound("click");
				
			});
			
			$(".Confirm").bind("click",function(){
			
				if (oxmyArray.length != oxquizDap.length) {
					alert('문제를 풀어 보세요.');
					return false;
				} else {
				
					$(this).hide();
					$(".resPannel").fadeIn();
					
					for(i=0;i<oxquizDap.length;i++){
						if(oxmyArray[i] == oxquizDap[i]){
							myScore++;
						}
					}
					
					$("#scoreText").text("("+myScore+")");
					
					
					// 점수에 따른 결과물
					if (myScore >= 0 && myScore <=2) {
						$(".playBtn").append("<div class='playBtn3 next'></div>");
						
						setCookie("levelof","3",360);// 레벨 쿠키에 저장 (ㅅ크립트용)
						setCookie("mp4of","04_06-1",360);// mp4 파일  쿠키에 저장
						
					} else if (myScore >= 3 && myScore <=4) {
						$(".playBtn").append("<div class='playBtn2 next'></div>");
						
						setCookie("levelof","2",360);//쿠키에 저장
						setCookie("mp4of","04_06-2",360);// mp4 파일  쿠키에 저장
						
					} else if (myScore >= 5 && myScore <=7) {
						$(".playBtn").append("<div class='playBtn1 next'></div>");
						
						setCookie("levelof","1",360);//쿠키에 저장
						setCookie("mp4of","04_06-3",360);// mp4 파일  쿠키에 저장
						
					}
						
						
					
					playSound("right");
					
						try{
							parent.endFlag = true;
							parent.toolTipFlag = true;
							setTimeout("parent.setBalloon()", 500);
					
						}catch(e){
						}
					}
								
			});	
			
			// 학습하기 클릭하면 다음페이지 가는 부분 (안쓰다면 주석 처리 하면 됨)
			$("#scene1_2 > div.resPannel > div.playBtn").on("click", parent.handleNextClick);


		});