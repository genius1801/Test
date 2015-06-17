function taskCtrl($scope, TaskService, $state){
    
    $scope.handleDrop = function() {
        alert('Item has been dropped');
    };

     $scope.sortableOptions  = {
        connectWith: '.connector'
    };
    
    $scope.getT=function(){
        //TaskService.getTask().then(function () {
           // TaskService.init();
        $scope.task = TaskService.user.task;
	    //});
    };
    $scope.getT();
    
    $scope.update=function(){
/*        $scope.add=TaskService.user.task.filter(function(element, index, array){
            if(element.status=='Add'){
            return true;}
            else {return false;};
        });
        $scope.process=TaskService.user.task.filter(function(element, index, array){
            if(element.status=='Process'){
            return true;}
            else {return false;};
        });
        $scope.complite=TaskService.user.task.filter(function(element, index, array){
            if(element.status=='Complite'){
            return true;}
            else {return false;};
        });*/
        $scope.task = TaskService.user.task;
    };
   // $scope.update();
    //$interval($scope.getT, 5000);
    setInterval($scope.update,10000);
    
    $scope.checked=true;
    $scope.f=function(person){
        $state.go('taskevent',{name:JSON.stringify(person)});
    }
    
/////////////////////////////////////////////////////////////////////////////////////    
    $scope.sortables = [];
    $scope.sortables2 = [];

            for(var i = 0; i < 5; i++){
                $scope.sortables[i] = {
                    index: i,
                    name: 'item1-'+(i),
                    sortable: true
                };

                $scope.sortables2[i] = {
                    index: i,
                    name: 'item2-'+(i),
                    sortable: true
                };
            }

            $scope.onSortStart = function () {
                console.log('sort start');
            }

            $scope.onSort = function () {
                console.log('sort');
            }

            $scope.onSortChange = function () {
                console.log('sortchange');
            }

            $scope.onSortEnd = function () {
                console.log('sort end');
            }
            $scope.onSortEnter = function () {
                console.log('sortenter');
            }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
   /* //add to the real data holder
    $scope.addRandomItem = function addRandomItem() {
        $scope.rowCollection.push(generateRandomItem(id));
        id++;
    };

    //remove to the real data holder
    $scope.removeItem = function removeItem(row) {
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }
    };
    function generateRandomItem(id) {

        var firstname = firstnames[Math.floor(Math.random() * 3)];
        var lastname = lastnames[Math.floor(Math.random() * 3)];
        var birthdate = dates[Math.floor(Math.random() * 3)];
        var balance = Math.floor(Math.random() * 2000);

        return {
            id: id,
            firstName: firstname,
            lastName: lastname,
            birthDate: new Date(birthdate),
            balance: balance
        }
    }*/
}