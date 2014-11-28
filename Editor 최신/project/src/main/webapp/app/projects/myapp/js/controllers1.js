angular.module('ngEditor.controller', []).controller('MainCtrl', function($scope, $document, $http, $sce) {
  
  // 저장한 값들 전역으로 관리
	$scope.savehtml = '';
	$scope.savejs = '';
	
	// init
  var hashArray = location.hash.split('#');
  var urlhash = hashArray[1];
	$(function(){
	  $scope.labelAnimate();
	  $('#savebtn').attr('disabled', true);
	  $('#downloadbtn').attr('disabled', true);
	  
	  // urlhash가 null이라면 새 에디터로
	  if(urlhash == null) {
	    return 'editor.html';
	  } else{ // urlhash가 있다면은 서버로 넘김
  	   $http({
         method : "POST",
         url : "/project/edit/" + hashArray[1] + ".json",
         params : {
          urlhash : urlhash    
         }
       })
       .success(function(result) {
        //$('#loading').css('display', 'block');
        //$('#cover').css('display', 'block');
        
        $scope.errorCheck = false;
        
  	    var config = eval('(' + result.config + ')');
  
  	    $scope.savejs = result.js;
  	    $scope.savehtml = result.html;

  	    // 저장된 urlhash가 없다면은
        if(result.status == 'success') {
          $scope.clearCode();
          $scope.errorCheck = true;
          location.href = 'editor.html';
        } else {
          // 저장된 urlhash가 있다면은
          $scope.clearCode();
          
          $scope.ng = config.ng;
          $scope.ngani = config.ngani;
          $scope.ngrt = config.ngrt;
          $scope.je = config.je;
          $scope.jq = config.jq;
          $scope.jqui = config.jqui;
          $scope.bs = config.bs;
          $scope.as = config.as;
          $scope.ub = config.ub;ㄷ
  
          editor2.setValue($scope.savejs);
          editor1.setValue($scope.savehtml);
           
          $('#savebtn').attr('disabled', true);
          
          $scope.errorCheck = true;
  	    };
  	    setTimeout(function() {
  	      $('#loading').css('display', 'none');
  	      $('#cover').css('display', 'none');
  	      $scope.update();
  	      console.clear();
  	    }, 2000);
      });
	  };
	});//init
	
  var doc = document;
	var iframe = doc.getElementById('result');
	var idoc = (iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document;
	var preContent = 0;
	var currentContent = 0;
	editor1.setFontSize($scope.fontSize);
	editor1.setAnimatedScroll();
	editor2.setFontSize($scope.fontSize);
	editor2.setAnimatedScroll();
	
	$scope.preEditor1_ValueLength = 0;
	$scope.preEditor2_ValueLength = 0;
	
  // editor1 change Event
	editor1.getSession().on("change", function() {
	  
	  if(location.hash != ""){
      if($scope.savehtml != editor1.getValue()){
        $('#savebtn').attr('disabled', false);
      } else {
        $('#savebtn').attr('disabled', true);
      }
    }
	  if(editor1.getValue()=='' && editor2.getValue()==''){
	    $('#savebtn').attr('disabled', true);
	    $('#downloadbtn').attr('disabled', true);
	  } else {
	    $('#savebtn').attr('disabled', false);
	    $('#downloadbtn').attr('disabled', false);
	  }
	  
	  
	  
		if($scope.dynamicResult) {
			var currentLength = editor1.getValue().length;
			var diff = Math.abs($scope.preEditor1_ValueLength - currentLength);
			
			if(editor1.getValue().length == 0 || diff > 3) {
				$scope.run();
			}
			$scope.update('e1');
		}
		$scope.preEditor1_ValueLength = editor1.getValue().length;
	});
	// editor2 change Event
	editor2.getSession().on("change", function() {
	  if(location.hash != ""){
      if($scope.savejs != editor2.getValue()){
        $('#savebtn').attr('disabled', false);
      } else {
        $('#savebtn').attr('disabled', true);
      }
    }
	  if(editor1.getValue()=='' && editor2.getValue()==''){
      $('#savebtn').attr('disabled', true);
      $('#downloadbtn').attr('disabled', true);
    } else {
      $('#savebtn').attr('disabled', false);
      $('#downloadbtn').attr('disabled', false);
    }
	  
		if($scope.dynamicResult) {
			var currentLength = editor2.getValue().length;
			var diff = Math.abs($scope.preEditor2_ValueLength - currentLength);
			if(editor2.getValue().length == 0 || diff > 3) {
				$scope.run();
			}
			$scope.update('e2');
		}
		$scope.preEditor2_ValueLength = editor2.getValue().length;
	});
	
	$scope.run = function() {
		var temp;
		if($('#result').hasClass('result-full')) {
			temp = true;
		}
		rd.removeChild(doc.getElementById('result'));
		iframe = rd.appendChild(doc.createElement('iframe'));
		iframe.setAttribute('id', 'result');
		if(temp) 
			iframe.setAttribute('class', 'result-full');
		idoc = (iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document;
	 
		$scope.labelAnimate();
		$scope.update();
	}
	
	$scope.ng = true;
	$scope.ngani = false;
	$scope.ngrt = false;
	$scope.je = true;
	$scope.jq = false;
	$scope.jqui = false;
	$scope.bs = false;
	$scope.as = false;
	$scope.ub = false;
	$scope.fontSize = 16;
	$scope.tabSize = 2;
	$scope.dynamicResult = true;
	$scope.errorCheck = true;
	$scope.preContentSize = 0;
	$scope.configDisplay = false;
	$scope.cdnDisplay = false;
	
	// 예제소스 불러오기
	$scope.writeExample = function(parameter) {
	  $('#loading').css('display', 'block');
	  $('#cover').css('display', 'block');
	  //$scope.dynamicResult = false;
	  $scope.errorCheck = false;
	  $http({
      method : "POST",
      url : "/project/ngnewbie/" + parameter + ".json",
    })
    .success(function(result) {
      
      var config = eval('(' + result.config + ')');
      
      // hash값 확인 부분
      if (result.urlhash != null){
        //urlhash값이 null이면 hsah값 출력 안함
        if(urlhash == null){
          $scope.clearCode();
          
          $scope.ng = config.ng;
          $scope.ngani = config.ngani;
          $scope.ngrt = config.ngrt;
          $scope.je = config.je;
          $scope.jq = config.jq;
          $scope.jqui = config.jqui;
          $scope.bs = config.bs;
          $scope.as = config.as;
          $scope.ub = config.ub;
          
          editor2.setValue(result.js); 
          editor1.setValue(result.html);
          
        }
        else if(urlhash != null){
          $scope.clearCode();
          
          location.hash=urlhash;
          
          $scope.ng = config.ng;
          $scope.ngani = config.ngani;
          $scope.ngrt = config.ngrt;
          $scope.je = config.je;
          $scope.jq = config.jq;
          $scope.jqui = config.jqui;
          $scope.bs = config.bs;
          $scope.as = config.as;
          $scope.ub = config.ub;
          
          editor2.setValue(result.js);
          editor1.setValue(result.html);
          
        }
      };
      $scope.update();
      $scope.errorCheck = true;
      
      setTimeout(function() {
        $('#loading').css('display', 'none');
        $('#cover').css('display', 'none');
        $scope.update();
        $scope.errorCheck = true;
        console.clear();
      }, 300);
      
      
    });
    
	};// 예제소스 불러오기

  // save
	$scope.save = function() {
    // 문자열 랜덤 생성
    var ar  = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var urlhash = '';       
    for(var i = 0; i < 6; i++) {
      var randTnum = Math.floor(Math.random() * ar.length);
      urlhash += ar[randTnum];
    }; 
    
    var config = {ng : $scope.ng, ngani : $scope.ngani, ngrt : $scope.ngrt, 
        je : $scope.je, jq : $scope.jq, jqui : $scope.jqui, bs : $scope.bs, 
        as : $scope.as, ub : $scope.ub};
    
    var reqPromise = $http({
     method : 'POST',
     url : '/project/ngnewbie/add.json',
     params: {
       urlhash : urlhash,
       config : config,
       html: editor1.getValue(),
       js: editor2.getValue()
     }
    });
    
    reqPromise.success(function(result) {
      // 중복되면 다시 불려지고 중복 안되면 등록
      if(result.status == 'success'){
        location.hash = result.urlhash;
        
        urlhash = location.hash;
        
        if(urlhash != null){
          location.hash=urlhash;
          $scope.savejs = editor2.getValue();
          $scope.savehtml = editor1.getValue();
          //$('#savebtn').css('display', 'none');
          $('#savebtn').attr('disabled', true);
        }
      }
      else if (result.status == 'faild') {
        $scope.add();
      };
      $('#msgDiv').stop(true, true);
      $('#msgDiv').fadeIn(300);
      $('#msgDiv').delay(500).fadeOut(1000);
 
    });
    
    
  };// save
  
	$scope.share = function() {
		alert('share()');
	};

	// Ctrl + s 막기
	$document.on('keydown', function(e) {
		if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
			e.preventDefault();
			$scope.save();
		}
	});
	// Ctrl + d 막기
	$document.on('keydown', function(e) {
		if (e.keyCode == 68 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
			e.preventDefault();
		}
	});
	// F5 key
	$document.on('keydown', function(e) {
		if (e.keyCode == 116) {
		  e.preventDefault();
		  if($scope.dynamicResult) {
		    $scope.update();
		    return;
		  }else {
		    $scope.run();
		    return;
		  } 
		}
	});

	$scope.$watch('fontSize', function(num) {
		if ( typeof($scope.fontSize) == 'string') {
			$scope.fontSize = parseInt($scope.fontSize);
		}
		editor1.setFontSize($scope.fontSize);
		editor2.setFontSize($scope.fontSize);
	});
	$scope.$watch('tabSize', function(num) {
		if ( typeof($scope.tabSize) == 'string') {
			$scope.tabSize = parseInt(tabSize.fontSize);
		}
		editor1.getSession().setTabSize($scope.tabSize);
		editor2.getSession().setTabSize($scope.tabSize);
	});

	$scope.jsEditor =  function() {
		if ($scope.je) { 
			doc.getElementById('editor1_div').style.height = "50%";
		} else {
			var rd = doc.getElementById('result-div');
			doc.getElementById('editor1_div').style.height = "100%";
		}
		$scope.run();
		editor1.setTheme($scope.theme.value);
	};

	$scope.changeTheme = function() {
		editor1.setTheme($scope.theme.value);
		editor2.setTheme($scope.theme.value);
	};

	$scope.close = function() {
		var rs = $('#result');
		rs.removeClass('result-full');
		$scope.fullResult = true;
	};

	$scope.full = function() {
		var rs = $('#result');
		rs.addClass('result-full');
		$scope.fullResult = false;
	};

	$scope.update = function() {
	  var jsCode = editor2.getValue();
		var bodyCode = editor1.getValue();
		
//		if(jsCode.length == 0) {
//			currentContent = bodyCode.length;
//		} else {
//			currentContent = bodyCode.length + jsCode.length;
//		}
//		if(preContent - currentContent > 4) {
//			console.info('remove frame');
//			rd.removeChild(doc.getElementById('result'));
//		}
//		preContent = currentContent;
		
//		if(iframe == null) {
//			iframe = doc.createElement('iframe');
//			iframe.setAttribute('id', 'result');
//			iframe.setAttribute('target', '_blank');
//			rd.appendChild(iframe);
//		}
		
		idoc.open();
		
		if ($scope.errorCheck) {
			window.frames[0].onerror =  function(errmsg) {
				window.parent['showError'](errmsg);
			};
			$(window.frames[0]).ready(function() {
				errorDiv.hide();
			});
		}
		if ($scope.ng) {
			idoc.writeln('<script src="https://code.angularjs.org/1.2.10/angular.min.js" defer="defer"></script>');
			if ($scope.ngrt)
				idoc.writeln('<script src="https://code.angularjs.org/1.2.23/angular-route.min.js"></script>');
			if ($scope.ngani)
				idoc.writeln('<script src="https://code.angularjs.org/1.2.23/angular-animate.min.js"></script>');
			if ($scope.ub)
				idoc.writeln('<script src="http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.11.0.js"></script>');
			if ($scope.as) {
				idoc.writeln('<script src="//oss.maxcdn.com/angular.strap/2.0.0/angular-strap.min.js"></script>');
				idoc.writeln('<script src="//oss.maxcdn.com/angular.strap/2.0.0/angular-strap.tpl.min.js"></script>');
			}
		}
		if ($scope.jq) {
			idoc.writeln('<script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>');
			if ($scope.jqui)
				idoc.writeln('<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>');
		}
		if ($scope.bs) {
			idoc.writeln('<link href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet">');
			idoc.writeln('<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0-wip/js/bootstrap.min.js"></script>');
		}
		
		idoc.writeln(bodyCode);
		
		
		if(idoc.body != null) {
			if ($scope.je && jsCode != '') {
				var scriptTag = null;
//				jsCode = jsCode.replace(/(?:\r\n|\r|\n|\t)/g, '');
				scriptTag = idoc.createElement('script');
				scriptTag.text = jsCode;
				idoc.body.appendChild(scriptTag);
			} 
		}
		idoc.close();
		var anchors = idoc.getElementsByTagName('a');
		if (anchors !== null) {
			for (var i = 0, anchorsLength = anchors.length; i < anchorsLength; i++)
				anchors[i].target = '_blank';
		}

		// HTML태그안 속성 뽑기
		// console.log((idoc.documentElement).attributes[0]);
		// body태그 속성
		// console.log((idoc.body).attributes[0]);
	};

	// Editor Theme List
	$scope.themeOptions = [{
		value : "ace/theme/ambiance",
		name : "ambiance "
	}, {
		value : "ace/theme/chaos",
		name : "chaos "
	}, {
		value : "ace/theme/chrome",
		name : "chrome "
	}, {
		value : "ace/theme/clouds",
		name : "clouds "
	}, {
		value : "ace/theme/clouds_midnight",
		name : "clouds_midnight "
	}, {
		value : "ace/theme/cobalt",
		name : "cobalt "
	}, {
		value : "ace/theme/crimson_editor",
		name : "crimson_editor "
	}, {
		value : "ace/theme/dawn",
		name : "dawn "
	}, {
		value : "ace/theme/dreamweaver",
		name : "dreamweaver "
	}, {
		value : "ace/theme/eclipse",
		name : "eclipse "
	}, {
		value : "ace/theme/github",
		name : "github "
	}, {
		value : "ace/theme/idle_fingers",
		name : "idle_fingers "
	}, {
		value : "ace/theme/katzenmilch",
		name : "katzenmilch "
	}, {
		value : "ace/theme/kr_theme",
		name : "kr_theme "
	}, {
		value : "ace/theme/kuroir",
		name : "kuroir "
	}, {
		value : "ace/theme/merbivore",
		name : "merbivore "
	}, {
		value : "ace/theme/merbivore_soft",
		name : "merbivore_soft "
	}, {
		value : "ace/theme/mono_industrial",
		name : "mono_industrial "
	}, {
		value : "ace/theme/monokai",
		name : "monokai "
	}, {
		value : "ace/theme/pastel_on_dark",
		name : "pastel_on_dark "
	}, {
		value : "ace/theme/solarized_dark",
		name : "solarized_dark "
	}, {
		value : "ace/theme/solarized_light",
		name : "solarized_light "
	}, {
		value : "ace/theme/terminal",
		name : "terminal "
	}, {
		value : "ace/theme/textmate",
		name : "textmate "
	}, {
		value : "ace/theme/tomorrow",
		name : "tomorrow "
	}, {
		value : "ace/theme/tomorrow_night",
		name : "tomorrow_night "
	}, {
		value : "ace/theme/tomorrow_night_blue",
		name : "tomorrow_night_blue "
	}, {
		value : "ace/theme/tomorrow_night_bright",
		name : "tomorrow_night_bright "
	}, {
		value : "ace/theme/tomorrow_night_eighties",
		name : "tomorrow_night_eighties "
	}, {
		value : "ace/theme/twilight",
		name : "twilight "
	}, {
		value : "ace/theme/vibrant_ink",
		name : "vibrant_ink "
	}, {
		value : "ace/theme/xcode",
		name : "xcode"
	}];
	// default value : monokai
	$scope.theme = $scope.themeOptions[18];

	// setting menu animate (show)
	$scope.configActive = function() {
		$scope.configDisplay = !$scope.configDisplay;
		if($scope.configDisplay) {
			if($('#modal2').hasClass('opened')) {
				$scope.cdnDisplay = !$scope.cdnDisplay;
				$('#modal2').removeClass('opened');
			}
			$('#modal').addClass('opened');
		}
		else {
			$('#modal').removeClass('opened');
		}
	}
	$scope.cdnActive = function() {
		$scope.cdnDisplay = !$scope.cdnDisplay;
		if($scope.cdnDisplay) {
			if($('#modal').hasClass('opened')) {
				$scope.configDisplay = !$scope.configDisplay;
				$('#modal').removeClass('opened');
			}
			$('#modal2').addClass('opened');
		}
		else {
			$('#modal2').removeClass('opened');
		}
	};
	$scope.clearCode = function() {
		editor1.setValue('');
		editor2.setValue('');
	};
	
	$scope.resetCode = function() {
    location.href = 'editor.html';
  };
	
	$scope.download = function(){
    var zip = new JSZip();

    var ed1 = editor1.getValue();
    
    var hd = idoc.getElementsByTagName('head')[0].cloneNode(true);
    
    var idocHTML = idoc.getElementsByTagName('html')[0];
    
//    console.log(idocHTML.className.indexOf('ng-scope'));
//      idoc.getElementsByTagName('html')[0].innerHTML);
    
    if(idoc.getElementsByTagName('html')[0].innerHTML.indexOf('ng-scope') != -1 ||
        idocHTML.className.indexOf('ng-scope') != -1 || $scope.ng) {
      
      hd.removeChild(hd.firstChild);
    }
    
      
      
    var headChildTab = '';
    
    for (var k = 0; k < $scope.tabSize; k++) {
      headChildTab = headChildTab + ' ';
    }
    
    
    var headChildCode = hd.innerHTML.replace('<', headChildTab + '<');   
      
    // head 태그 추출
    var headCode = '<head>\n' + headChildCode + '</head>\n'; 
    
    var headStart = ed1.indexOf('<head>');
    var headEnd = ed1.indexOf('</head>') + 7;
    var doctypeStart = ed1.indexOf('<!DOCTYPE');
    var htmlStart = ed1.indexOf('<html');
    
    if(htmlStart == -1) { // html tag 없을 경우
      ed1 = '<html>\n' + ed1 + '\n</html>';
    }
    
    if(headStart == -1) { // head 없을 경우 
      var cnt = htmlStart;
      while(true) {
        if(ed1.charAt(++cnt) == '>') {
          var htmlTag = ed1.substring(htmlStart, cnt+1); // <html 추출
          ed1 = ed1.replace(htmlTag, htmlTag + '\n' + headCode);
          break;
        }
      }
    } else { // head 있을 경우
      ed1 = ed1.replace(ed1.substring(headStart, headEnd), headCode);
      if(htmlStart == -1) {
        
      }
    }
    
    if(ed1.indexOf('<body') == -1) {
      ed1 = ed1.replace('</head>', '</head>\n<body>');
      ed1 = ed1.replace('</html>', '\n</body>\n<html>');
    }
    
    if(doctypeStart == -1) {
      ed1 = '<!DOCTYPE html>\n' + ed1;
    }
    
    if($scope.je) {
      var i = ed1.indexOf('</body>');
      var tabcnt = 0;
      var tabs = '';

      while(true) {
        if(ed1.charCodeAt(--i) != 32)
          break;
        tabcnt++;
      }
      for (var c = 0; c < tabcnt; c++) {
        tabs = tabs + ' ';          
      }
      ed1 = ed1.replace('</body>', tabs + '<script src="app.js"></script>\n' + tabs +'</body>')      
      zip.file("app.js", editor2.getValue());
    }
    
    //console.info('html 완성 : \n' + ed1 + '\n');
    
    zip.file("index.html", ed1);
      
    var blob = zip.generate({type:"blob"});
    saveAs(blob, "example.zip");
  };
  $scope.labelAnimate = function() {
    $('#editor1_div').mouseover(function() {
      $('.editor1_label').stop();
      $('.editor1_label').fadeOut(500);
    });
    $('#editor2_div').mouseover(function() {
      $('.editor2_label').stop();
      $('.editor2_label').fadeOut(500);
    });
    $('#editor1_div').mouseout(function() {
      $('.editor1_label').stop();
      $('.editor1_label').fadeIn(300);
    });
    $('#editor2_div').mouseout(function() {
      $('.editor2_label').stop();
      $('.editor2_label').fadeIn(300);
    });
    $('#result').mouseover(function() {
      $('.result_label').stop();
      $('.result_label').fadeOut(500);
    });
    $('#result').mouseout(function() {
      $('.result_label').stop();
      $('.result_label').fadeIn(300);
    });
  }
  $scope.modalTitle = '';
  $scope.modalContent = '';
  $scope.modalFooter = '';
  
  var http = ['$http', '$q'];
  
  $scope.pager = function(parameter){
    switch(parameter) {
    case '$http' :
      $scope.modalTitle = '$http / $q';
      $scope.modalFooter = http;
      break;
    case 'bind' :
      $scope.modalTitle = '양방향 데이터 바인딩';
      break;
    case 'filter' :
      $scope.modalTitle = '필터';
      break;
    }
    
    var reqPromise = $http({
      method : "POST",
      url : "/project/ngnewbie/page-" + parameter + "-list.json",
    });
    reqPromise.success(function(result) {
      $scope.modalContent = $sce.trustAsHtml(result.html);
    });
    //$('ul.pagination > li')[0].setAttribute('class', 'active');
  };
  
  $scope.changeContent = function(parameter) {
    $http({
      method : "POST",
      url : "/project/ngnewbie/page-" + parameter + "-list.json",
    })
    .success(function(result) {
      $scope.modalContent = $sce.trustAsHtml(result.html);
    });
  };
  
  $scope.contentMove = function() {
    if($('#sidebar-resizer').hasClass('fullContent')) {
      $('#content').removeClass('fullContent');  
      $('#sidebar-resizer').removeClass('fullContent'); 
    } else {
      $('#sidebar-resizer').addClass('fullContent'); 
      $('#content').addClass('fullContent');
    }
  };
});

