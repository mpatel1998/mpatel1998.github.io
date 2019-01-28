var app=angular.module("Facebook",[]);
app.controller('FaceBookController',['$scope',function($scope){


function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

FB.login(function(response){
  if(response.status==='connected'{

  } else{
    alert('Not logged in');
  })
});


}]);
