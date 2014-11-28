angular.module('sampleApp', []).
controller('Ctrl',function($scope, $http) {
  
  $scope.add = function() {
    
    var reqPromise = $http({
     method : 'POST',
     url : '../ngbot/add.json',
     params: {
       html: edit.getValue(),
       js: edit1.getValue()
     }
    });
    
    reqPromise.success(function(data,status,headers,config) {
      location.href = "../edit/list.do";
    });
 };
 
 $scope.list = function() {
   
   var reqPromise = $http({
     method : 'POST',
     url : "../edit/"+ 7 +".json"
    });
   
   reqPromise.success(function(ngbot) {
     edit.setValue(ngbot[0].html);
     edit1.setValue(ngbot[0].js);
   });
  };
});