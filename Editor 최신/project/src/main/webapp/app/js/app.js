
var app = angular.module('application', ['ngRoute','ngNewbieTools']);

app.controller('commonController', function($location,$window,$scope,$newbie){
	var checkStat = 'active';
	var inactiveOffset = $("#topnav").offset().top;
	//topnav의 항목 리스트
	$scope.navList = ['intro', 'manual', 'contact'];
	
	$scope.inactive = function(doClick){
		if(checkStat != 'inactive'){
			checkStat = 'inactive';
			$("#header").css("display","none");
			
			$("#topnav").addClass("inactive");
			$("#topnav>.navi").addClass("inactive");
			$("#topnav>.logo-navi").addClass("inactive");
			$("#content-wrap").addClass("inactive");
			if(doClick == null){
				window.scrollTo(0,100);	
			}; 

			setTimeout(function(){
				$("#header").addClass("inactive");
			},100);		
		}
	}
	$scope.active = function(){
		checkStat = 'active';
		$("#header").css("display","block");
		setTimeout(function(){
			$("#header").removeClass("inactive");
			$("#topnav").removeClass("inactive");
			$("#topnav>.navi").removeClass("inactive");
			$("#topnav>.logo-navi").removeClass("inactive");
			$("#content-wrap").removeClass("inactive");
		},100);
	}
	
	$scope.inactiveClicked = function(scroll){
		checkStat = 'inactive';
		scroll();
		$("#header").addClass("inactive");
		setTimeout(function(){
			$("#header").css("display","none");

			$("#content-wrap").addClass("inactive");
			$("#topnav").addClass("inactive");
			$("#topnav>.navi").addClass("inactive");
			$("#topnav>.logo-navi").addClass("inactive");
		},100);	
	}
	
	$scope.navClick = function(n){
		
		//클릭한 버튼이 첫번째가 아닐때 스크롤 위치를 제어한다.
		if(n == $scope.navList[0] && checkStat == 'active'){
			$scope.inactiveClicked(	function(){ window.scrollTo(0,200) })
		
		} else if(checkStat == "active"){
//			$($window).unbind('scroll');
			$scope.inactiveClicked( function(){ 
				$("html, body").animate(
					{ scrollTop: $('.content-' + n).offset().top - 280 },300);		
			});
			
//			$($window).bind('scroll',function(){
//				if($newbie.scrollLocator("Y").currLoc > 440){
//					$scope.inactive();
//				}
//				if($("#header").css("display")=="none"){
//					if($newbie.scrollLocator("Y").currLoc == 0){
//						$scope.active();
//					}
//				}
//			});
			
		} else{
			$scope.inactiveClicked( function(){ 
				$("html, body").animate(
					{ scrollTop: $('.content-' + n).offset().top  - 20 },300);		
			}); 
		}
		
	}
	
	$scope.logoClick = function(){
		$("html, body").animate(
				{ scrollTop: 0 },500);
	}
	
	window.scrollTo(0,0);
	$($window).bind('scroll', function(){
		
		if($newbie.scrollLocator("Y").currLoc > 440){
			$scope.inactive(100);
		}
		
		if($("#header").css("display")=="none"){
			if($newbie.scrollLocator("Y").currLoc == 0){
				$scope.active();
			}
		}
}	);

});