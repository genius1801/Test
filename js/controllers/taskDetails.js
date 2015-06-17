function taskDetailCtrl($scope, TaskService, $state,$stateParams){
    //$scope.task=$stateParam.;
    
    //$scope.event=JSON.parse($stateParams.name;);
    $scope.event=JSON.parse($stateParams.name||null);
    console.log($scope.event);
    $scope.f=function(person){
        //console.log("person");
        console.log(person);
        $state.go('edittask',{name:JSON.stringify(person)});
    }
}