function editCtrl($scope, TaskService, $state,$stateParams){
    $scope.event=JSON.parse($stateParams.name||null);
    $scope.save=function(){
       // for(var i in $scope.event){
            TaskService.setAllTask($scope.event.name,$scope.event);
            //console.log($scope.event[i], i);
        //}
        $state.go("task");
      /*    back();
      };*/
    };
    $scope.cancel=function(){
        $state.go("task");
      /*    back();
      };*/
    };
}