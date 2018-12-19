var app=angular.module("Contest",[]);
app.controller('ContestController',['$scope',function($scope){
  $scope.sere;
  $scope.tan;
  $scope.trial=false;
  $scope.serslide=[1,2,3,4,5];
  $scope.uid;
  function setCookie(){
    var uid=Math.random();
    var date=new Date();
    date.setTime(date.getTime()+(100*24*60*60*1000));
    document.cookie="uid="+uid+";expires="+date.toGMTString()+";path=/";
    return uid;
}
function getCookie(cookie){
  return cookie.split(';').forEach(function(element){
    if(element.includes('uid')){
      return element.split('=')[1];
    }
  });
}
function checkCookie(){
  var cookie=decodeURIComponent(document.cookie);
  if(cookie.includes('uid')){
    $scope.uid=getCookie();
  } else{
    $scope.uid=setCookie(cookie);
  }
}
checkCookie();
  var sercurr=1;
  var tancurr=1;
  $scope.tanslide=[1,2,3,4,5];
  var root="http://mpatel98.gearhostpreview.com/";
$scope.chosen;
  $.ajax({
    type:'GET',
    url:'https://api.ipify.org?format=json',
    success:function(result){
      $.ajax({
        type:'POST',
        url:root+'ipcheck.php',
        data:{'ip':$scope.uid},
        success:function(data){
          data=JSON.parse(data);
          console.log(data);
          if(data.length>0){
          if(data[0]['chosen']===null|| typeof data[0]['chosen']==='undefined'){
            $scope.chosen="none";
            console.log('hey');
          } else{
            $scope.chosen=data[0]['chosen'];
          }
        }

        }
      });
    },
    error: function(){
      alert("Please turn adblock off for this website and try again.");
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
    if(typeof $scope.chosen==='undefined'|| $scope.chosen===null){
      alert("Sorry looks like we couldn't quite figure out who you are. Have you tried turning of your adblocker?")
    }else{
      $scope.trial=true;
  }
}
  $scope.serena=function($event){
    if($event.target.id.includes('ser-')||$scope.chosen=='serena'){
      return;
    }
    $.ajax({
      type:'POST',
      url:root+'otherdb.php',
      data:{'name':'serena','count':parseInt($scope.sere)+1},
      success:function(data){
        $scope.sere++;
        $.ajax({
          type:'POST',
          url:root+'moredb.php',
          data:{'name':'serena','ip':$scope.uid},
          success:function(result){
            if($scope.chosen=='tanisa'){
              $.ajax({
                type:'POST',
                url:root+'otherdb.php',
                data:{'name':'tanisa','count':parseInt($scope.tan)-1},
                success:function(){
                  $scope.tan--;
                  $scope.$apply();
                }
              });
            }
            $scope.chosen='serena';
            $scope.$apply();
          }
        });
        }
    });
  }
  $scope.tanisa=function($event){
    if($event.target.id.includes('tan-')||$scope.chosen=='tanisa'){
      return;
    }
    $.ajax({
      type:'POST',
      url:root+'otherdb.php',
      data:{'name':'tanisa','count':parseInt($scope.tan)+1},
      success:function(data){
        $scope.tan++;
        $.ajax({
          type:'POST',
          url:root+'moredb.php',
          data:{'name':'tanisa','ip':$scope.uid},
          success:function(result){
            if($scope.chosen=='serena'){
              $.ajax({
                type:'POST',
                url:root+'otherdb.php',
                data:{'name':'serena','count':parseInt($scope.sere)-1},
                success:function(){
                  $scope.sere--;
                  $scope.$apply();
                }
              });
            }
            $scope.chosen='tanisa';
            $scope.$apply();
          }
        });
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
    if(sercurr>1){
      sercurr--;
      $event.target.parentNode.parentNode.style.backgroundImage="url('ser"+sercurr+".jpg')";
    }
  } else{
    if(tancurr>1){
      tancurr--;
      $event.target.parentNode.parentNode.style.backgroundImage="url('tan"+tancurr+".jpg')";
  }
}
}
}
]);
