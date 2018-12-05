var app=angular.module("Contest",[]);
app.controller('ContestController',['$scope',function($scope){
  $scope.sere;
  $scope.tan;
  $scope.trial=false;
  var root="http://mpatel98.gearhostpreview.com/";
  $.ajax({
    type:'POST',
    url:root+'db.php',
    data:{'name':'serena'},
    success:function(data){
      var result=JSON.parse(data)
      $scope.sere=result[0]['serena'];
    }
  });
  $.ajax({
    type:'POST',
    url:root+'db.php',
    data:{'name':'tanisa'},
    success:function(data){
      var result=JSON.parse(data)
      $scope.tan=result[0]['tanisa'];
    }
  });
  $scope.switch=function(){
    $scope.trial=true;
  }
  $scope.serena=function(){
    $.ajax({
      type:'POST',
      url:root+'otherdb.php',
      data:{'name':'serena','count':parseInt($scope.sere)+1},
      success:function(data){
        $scope.sere++;
        $scope.$apply();
      }
    });
  }
  $scope.tanisa=function(){
    $.ajax({
      type:'POST',
      url:root+'otherdb.php',
      data:{'name':'tanisa','count':parseInt($scope.tan)+1},
      success:(response)=>{
        $scope.tan++;
        $scope.$apply();
      }
    });
  }
}

]);
