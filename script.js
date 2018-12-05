var app=angular.module("Contest",[]);
app.controller('ContestController',['$scope',function($scope){
  $scope.sere;
  $scope.tan;
  var root="http://mpatel98.gearhostpreview.com/";
  $.ajax({
    type:'POST',
    url:root+'db.php',
    data:{'name':'serena'},
    success:function(data){
      var result=JSON.parse(data)
      $scope.sere=result[0]['serena'];
      console.log($scope.sere);
    }
  });
  $.ajax({
    type:'POST',
    url:root+'db.php',
    data:{'name':'tanisa'},
    success:function(data){
      $scope.tan=data[0]['tanisa'];
    }
  });
  $scope.serena=function(){
    $.ajax({
      type:'POST',
      url:root+'otherdb.php',
      data:{'name':'serena','count':$scope.sere},
      success:function(data){
        $scope.sere++;
      }
    });
  }
  $scope.tanisa=function(){
    $.ajax({
      type:'POST',
      url:root+'otherdb.php',
      data:{'name':'tanisa','count':$scope.tan},
      success:(response)=>{
        $scope.tan++;
      }
    });
  }

}
]);
