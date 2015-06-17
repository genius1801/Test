function loginCtrl($scope, LoginService, $state){
    $scope.user=LoginService.user;
    $scope.send=function(){
        LoginService.getAuth().then(function(){
           // console.log(bool);   
            if($scope.user.isAuth) {
                LoginService.init().then(function(){
		          $state.go('task');
                });
            }
            else {
                alert('Error');
            };
        },function(){
            alert('Error');
        });
	};
       /* if($scope.user.login=='login' && $scope.user.password=='pass'){
            $state.go('task');
        }
        else {
            alert('Error');
        }*/
   
}