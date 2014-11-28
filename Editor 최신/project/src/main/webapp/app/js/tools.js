angular.module('ngNewbieTools', [])
  .factory('$newbie', function(){
    return {
      sectionArr: [],
      currLoc: 0,
      preLoc:0,

      
      simpleToggle: function(selector){
        if( $(selector).css("display") == "block" ){
          $(selector).css("display","none");
        } else 
          $(selector).css("display","block");
      }

      /**
      * scrollHider
      * + 스크롤 내리면 사라지고 올리면 나타나는.. 연습용이었음...
      * + paramenters
      *   -selector : 숨길거(선택자)
      *   -doNotHide : 숨기지 않을 범위(좌표 2차원배열)
      *     -> [ [min,max],[min,max],[min,max],[min,max],[min,max],[min,max],...]
      *   -preLoc, currLoc : 이전, 현재 
      */
      ,scrollHider: function(selector, doNotHideSection){
      	this.preLoc = this.currLoc;
      	this.currLoc = window.pageYOffset;
      	for(var i=0 ; i<doNotHideSection.length ; i++){
      		this.sectionArr.push(doNotHideSection[i]);
      	}

      	// 지정한 범위가 아닌경우 - 스크롤 위로 : none
      	if(this.currLoc>this.preLoc){
      		$(selector).css("display","none");
      	} else 
			// (나머지)지정한 범위가 아닌경우 - 스크롤 아래로 : block
			$(selector).css("display","block");

      	for(var i=0 ; i<this.sectionArr.length ; i++){
	      	// 지정 범위 안에 속할 경우 : block
	      	if(this.currLoc>this.sectionArr[i][0] && this.currLoc<this.sectionArr[i][1]){
	      		$(selector).css("display","block");
	      	} 
      	}

      	// 최상단 opacity
      	if(this.currLoc==0){
      		$(selector+" *").css("color","white");
      		$(selector).css("background","rgba(255,255,255,0)");
      	} else {
      		$(selector+" *").css("color","black");
      	}
      }
      
      /**
       * classAdder,classRemover
       * 
       * + parameters
       * 	- classname : 지우거나 추가할 클래스 이름
       * 	- selectorArr : 지우거나 추가될 선택자들의 배열
       */
      ,classAdder:function(classname,selectorArr){
		  for(var i=0;i<selectorArr.length;i++){
			$(selectorArr[i]).addClass(classname);
		  }
      }
      
      ,classRemover:function(classname,selectorArr){
    	  for(var i=0;i<selectorArr.length;i++){
			$(selectorArr[i]).removeClass(classname);
    	  }
      }
      
      /**
      * toggler
      *
      * + 선행작업(css)
      *   -before: element{ ... }
      *   -after : element.[유저가 지정한 클래스이름]{ ... }
      * + parameters
      *   -standardSelector : 기준 element
      *   -classname : after 지정 클래스명
      *   -selectorArr : toggle 대상 선택자 배열
      */
      ,toggler:function(standardSelector,classname,selectorArr){
		  if( $(standardSelector).hasClass(classname) ){
			this.classRemover(classname,selectorArr);
		  } else {
		    this.classAdder(classname,selectorArr);
		  }
    	  
       }
      
      /**
       * scrollLocator
       * 
       * + parameters
       * 	- direction : 방향. x 또는 y 입력, 입력안하면 y, 기타입력 예외출력
       * + return object - location
       * 	:$newbie.scrollLocator().preLoc / $newbie.scrollLocator().currLoc
       *   	:또는 scrollLocator함수 수행 후 $newbie서비스의 preLoc/currLoc으로 접근
       */
      ,scrollLocator:function(direction){
    	  var preLoc = '';
    	  var currLoc = '';
    	  var location = {};
    	  if( direction==null || direction=="y" || direction=="Y" ){
    		  this.preLoc = this.currLoc;
    	      this.currLoc = window.pageYOffset;
    	  } else if( direction=="x" || direction=="X" ){
    		  this.preLoc = this.currLoc;
    	      this.currLoc = window.pageXOffset;
    	  } else{
    		  console.log("$newbie.scrollLocator - direction exception");
    		  this.preLoc = null;
    	      this.currLoc = null;
    	  }
	      preLoc = this.preLoc;
	      currLoc = this.currLoc;
	      location = {"preLoc": preLoc, "currLoc": currLoc};
	      
    	  return location;
      }
      


    }
  })