angular.module('ngEditor.controller', []).controller('MainCtrl', function($scope, $document) {
	var ngcdn = "<script src='https://code.angularjs.org/1.2.10/angular.min.js'></script>";
  
  
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
	
	editor1.getSession().on("change", function() {
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
	editor2.getSession().on("change", function() {
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
	
	$scope.writeExample = function(examTitle) {
		$('#loading').css('display', 'block');
		switch(examTitle) {
			case 'todo'
			:
			$scope.bs = true;
			$scope.jq = true;
			editor1.setValue('<body ng-app>\n\t<div ng-controller="ctrl">\n\t<input class="form-control" style="width:200px; display:inline;" ng-model="val">\n\t<button class="btn btn-success" ng-click="add()">ADD</button>\n\t<hr>\n\t<table class="table table-striped">\n\t\t<tr style="">\n\t\t\t<th>No</th><th>TODO List</th><th>Delete</th>\n\t\t</tr>\n\t\t<tr ng-repeat="do in list">\n\t\t\t<td>{{$index + 1}}</td>\n\t\t\t<td><input class="form-control" ng-model="list[$index].il"></td>\n\t\t\t<td><button class="btn btn-danger" ng-click="remove($index)">X</button> </td>\n\t\t</tr>\n\t </table>\n\t</div>\n</body>');
			if(!$scope.je)
				$scope.je = true;
			$scope.jsEditor();
			editor2.setValue('var ctrl = function($scope) {\n\t$scope.val;\n\t$scope.add=function() {\n\t\tif($scope.val!==\"\") {\n\t\t\t$scope.list.push({il:$scope.val});\n\t\t\t$scope.val=\"\";\n\t\t}\n\t};\n\t$scope.list = [\n\t\t\t{il: \"Angular practice\"},\n\t\t\t{il: \"Buy Angular book\"},\n\t\t\t{il: \"Angular study\"}\n\t\t];\n\t$scope.remove = function(index){\n\t\t$scope.list.splice(index,1);\n\t}\n};');
			break;
			case 'bind':
			$scope.bs = false;
			$scope.jq = false;
			editor1.setValue('<body ng-app>\n\t<input ng-model="name"><br>\n\tHello, {{name}}\n</body>');
			editor2.setValue('');
			break;
		}
		$scope.run();
		$('#loading').css('display', 'none');
	};


	$scope.save = function() {
	  
	};
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
			$scope.run();
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
			doc.getElementById('editor1_div').style.height = "45%";
		} else {
			var rd = doc.getElementById('result-div');
			doc.getElementById('editor1_div').style.height = "94%";
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
		var bodyCode = editor1.getValue();
		var jsCode = editor2.getValue();
		
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
	
  $scope.download = function(){
    var zip = new JSZip();

    var htmlCode = editor1.getValue();
    var jsCode = editor2.getValue();
 
    var headCode = '';
    
    var headStart = htmlCode.indexOf('<head>');
    var headEnd = htmlCode.indexOf('</head>') - headStart + 7;
    
    var ngc = '';
    if($scope.ng)
      ngc = ngcdn;
    
    
    var idocHead = idoc.getElementsByTagName('head')[0];
    idocHead.removeChild(idocHead.firstChild);
    var tempCode = idocHead.innerHTML;
    
    
    var je = '';
    if($scope.je)
      je = '\n\t<script src="app.js"></script>\n';
    
    zip.file("test.html", tempCode);
    
    zip.file("index.html", htmlCode);
    if($scope.je)
      zip.file("app.js", editor2.getValue());
      
    var blob = zip.generate({type:"blob"});
    saveAs(blob, "example.zip");
  };
  
});

