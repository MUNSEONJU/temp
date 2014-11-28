
ace.require("ace/ext/language_tools");

var editor1 = ace.edit("editor1");
var editor2 = ace.edit("editor2");
var rd = document.getElementById('result-div');
var errorDiv = $('#error-div');
var ed = document.getElementById('error-div');
var errorText = document.getElementById('error-text');

editor1.getSession().setMode("ace/mode/html");
editor1.setTheme("ace/theme/monokai");
editor1.getSession().setTabSize(2);


// enable autocompletion and snippets
editor1.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: false
});

editor2.setTheme("ace/theme/monokai");
editor2.getSession().setMode("ace/mode/javascript");

// enable autocompletion and snippets
editor2.setOptions({
	enableBasicAutocompletion: true,
	enableSnippets: true,
	enableLiveAutocompletion: false
});


var showError = function(errMessage){
//	ed.style.visiblity = 'visible';
	errorDiv.show();
	errorText.innerText = errMessage;
};


$('.btn.btn-black').tooltip({placement : 'bottom'});
$('#st').tooltip({placement : 'right'});

var app = angular.module('ngEditor', 
	['ngEditor.Directive', 
	'ngEditor.controller']);

