var app=angular.module("Contest",[]);
app.controller('ContestController',['$scope',function($scope){
  $scope.sere;
  $scope.tan;
  $scope.trial=false;
  $scope.serslide=[1,2,3,4,5];
  $scope.uuid;
  $scope.username;
  function setCookie(){
    console.log("Setting Cookie");
    var uuid=Math.random();
    var date=new Date();
    date.setTime(date.getTime()+(100*24*60*60*1000));
    document.cookie="uuid="+uuid+";expires="+date.toGMTString()+";path=/";
    $scope.uuid=uuid;
    return uuid;
}
function getCookie(cookie){
  console.log(cookie);
  cookie.split(';').forEach(function(element){
    if(element.includes('uuid')){
      $scope.uuid= element.split('=')[1];
    }
    if (element.includes('username')){
      $scope.username=element.split('=')[2];
    }
  });
  return;
}
function checkCookie(){
  var cookie=decodeURIComponent(document.cookie);
  if(cookie.includes('uuid')){
    getCookie(cookie);
  } else{
      setCookie();
  }
}
checkCookie();
  var sercurr=1;
  var tancurr=1;
  $scope.tanslide=[1,2,3,4,5];
  var root="http://mpatel98.gearhostpreview.com/";
$scope.chosen;
      $.ajax({
        type:'POST',
        url:root+'ipcheck.php',
        data:{'uuid':$scope.uuid},
        success:function(data){
          data=JSON.parse(data);
          if(data.length>0){
          if(data[0]['chosen']===null|| typeof data[0]['chosen']==='undefined'){
            $scope.chosen="none";
          } else{
            $scope.chosen=data[0]['chosen'];
          }
        } else{
          $scope.chosen="none";
        }

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
  
  $scope.usernameChange=function(){
    $.ajax({
      type:'POST',
      data:{'uuid':$scope.uuid},
      url:root+'userdel.php',
      success:function(data){
        $scope.username="";
      }
    })
  }

  $scope.switch=function(){
    if(typeof $scope.chosen==='undefined'|| $scope.chosen===null){
      alert("Sorry looks like we couldn't quite figure out who you are. Have you tried turning off your adblocker/enabling cookies and reloading the page?")
    }else{
      if($scope.username==null && document.getElementById('username').value){
        $scope.username=document.getElementById('username').value;
        $.ajax({
          type:'POST',
          url:root+'username.php',
          data:{'username':$scope.username,'uuid':$scope.uuid},
          success:function(data){
            var cookie=decodeURIComponent(document.cookie);
            $scope.trial=true;
            console.log(cookie+";username="+$scope.username);
            document.cookie=cookie+";username="+$scope.username;
            console.log(document.cookie);
            $scope.$apply();
          }
        });
      }else{
      $scope.trial=true;
      }
  }
}
  
$scope.serena=function($event){
    if($event.target.id.includes('ser-')||$scope.chosen=='serena'){
      return;
    }
    $.ajax({
      type:'POST',
      url:root+'otherdb.php',
      data:{'name':'serena','count':1},
      success:function(data){
        $scope.sere++;
        $.ajax({
          type:'POST',
          url:root+'moredb.php',
          data:{'name':'serena','uuid':$scope.uuid},
          success:function(result){
            if($scope.chosen=='tanisa'){
              $.ajax({
                type:'POST',
                url:root+'otherdb.php',
                data:{'name':'tanisa','count':0},
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
      data:{'name':'tanisa','count':1},
      success:function(data){
        $scope.tan++;
        $.ajax({
          type:'POST',
          url:root+'moredb.php',
          data:{'name':'tanisa','uuid':$scope.uuid},
          success:function(result){
            if($scope.chosen=='serena'){
              $.ajax({
                type:'POST',
                url:root+'otherdb.php',
                data:{'name':'serena','count':0},
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
