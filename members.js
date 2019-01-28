var app=angular.module("Facebook",[]);
app.controller('FaceBookController',['$scope',function($scope){
  window.fbAsyncInit = function() {
    FB.init({
      appId            : '795779494109932',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v3.2'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

$scope.login=function(){FB.login(function(response){
  if(response.status==='connected'){
console.log('Logged in');
  } else{
    console.log('Not logged in');
  }
});}


}]);
