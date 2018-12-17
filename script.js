var app=angular.module("Contest",[]);
app.controller('ContestController',['$scope',function($scope){
  $scope.sere;
  $scope.tan;
  $scope.trial=false;
  $scope.serslide=[1,2,3,4,5];
  var sercurr=1;
  var tancurr=1;
  $scope.tanslide=[1,2,3,4,5];
  var root="http://mpatel98.gearhostpreview.com/";
$scope.ip;
  $.ajax({
    type:'GET',
    url:'http://gd.geobytes.com/GetCityDetails',
    success:function(result){
      $scope.ip=JSON.parse(result)['geobytesipaddress'];
    }
  });
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
      url:root+'ipcheck.php',
      data:{'ip':$scope.ip},
      success:function(data){
        if(data){
          alert("You have already voted!");
        }else{
          $.ajax({
            type:'POST',
            url:root+'otherdb.php',
            data:{'name':'serena','count':parseInt($scope.sere)+1},
            success:function(data){
              $scope.sere++;
              document.getElementById('confirm').style.display="block";
              $scope.$apply();
            }
          });
        }
      }
    });

  }
  $scope.tanisa=function(){
    $.ajax({
      type:'POST',
      url:root+'ipcheck.php',
      data:{'ip':$scope.ip},
      success:function(data){
        if (data){
          alert("You have already voted!");
        } else{
          $.ajax({
            type:'POST',
            url:root+'otherdb.php',
            data:{'name':'tanisa','count':parseInt($scope.tan)+1},
            success:(response)=>{
              $scope.tan++;
              document.getElementById('confirm').style.display="block";
              $scope.$apply();
            }
          });
        }
      }
    });
  }
  window.onclick=function(event){
    if(event.target==document.getElementById('confirm')){
      document.getElementById('confirm').style.display="none";
    }
  }
  $scope.forward=function($event){
    if($event.target.id.includes('ser')){
      if($scope.serslide.length!=sercurr){
        sercurr++;
        $event.target.parentNode.parentNode.style.backgroundImage="url('ser"+sercurr+".jpg')";
      }
    } else{
      if($scope.serslide.length!=tancurr){
        tancurr++;
        $event.target.parentNode.parentNode.style.backgroundImage="url('tan"+tancurr+".jpg')";
    }
  }
}
$scope.backward=function($event){
  if($event.target.id.includes('ser')){
    if($scope.serslide.length>0){
      sercurr--;
      $event.target.parentNode.parentNode.style.backgroundImage="url('ser"+sercurr+".jpg')";
    }
  } else{
    if($scope.serslide.length>0){
      tancurr--;
      $event.target.parentNode.parentNode.style.backgroundImage="url('tan"+tancurr+".jpg')";
  }
}
}
}
]);
