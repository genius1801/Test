function Task($http, $q) {

	return {
		// user data
		user: {
			task: [],
			login: null,
			password: null,
            isAuth:false
		},

        getTask: function (){
            var user=this.user;
            var t;
            var deferred = $q.defer();
            $http.get(Const.device+ "/js/json/task-odl.json').then(function (response) {
                t = response.data;
                for(var i=0; i<t.length;i++){
                    if (t[i].login==user.login){
                        user.task =t[i].tasklist;
                    }
                }
                deferred.resolve(response);
			}, function (response) {
				deferred.reject(response);
			});
			return deferred.promise;
           
        },
        getAuth: function (){
            var deferred = $q.defer();
            var bool=false;
            var user=this.user;
            $http.get(Const.device+ "/js/json/auth.json').then(function (response) {
                var y=response.data;
                for(var i in y){
                    console.log(user.login+"   "+y[i].login);
                    if (user.login==y[i].login){
                        user.isAuth=true;
                    }
                }
                deferred.resolve(response);
			}, function (response) {
				user.isAuth=false;
                deferred.reject(response);
			});
            user.isAuth=bool;
			return deferred.promise;
        },
        setTask: function(id,atr,value){
            var t=this.user.task;
            console.log(atr,value);
            for(var i=0; i<t.length;i++){
                if(id==t[i].name){
                    for(var j=0; j<atr.length; j++){
                        t[i].status=value;
                    }
                }
            };
            console.log(t);
        },
        
        setAllTask: function(id,detail){
            var t=this.user.task;
            //console.log(atr,value);
            for(var i=0; i<t.length;i++){
                if(id==t[i].name){
                    t[i]=detail;
                }
            };
            console.log(t);
        },
        
        init: function(){
            var t=this;
            var deferred = $q.defer();
            t.getTask().then(function (response) {
                 deferred.resolve(response);
            }, function(){
                deferred.reject(response);
            });
            console.log("sdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            return deferred.promise;
        }
        
    }
};