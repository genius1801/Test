angular.module('taskApp', ['angular-repeat-n', 'ui.router','dndLists'])
    //.directive('dndBetweenList', ['$parse', dndlist])
.service('TaskService',['$http', '$q', Task])
.directive('taskdedail',function() {
        return {
            restrict: 'AE',
            replace: true,
            scope: true
           /* {
                item:"=",
            }*/,
            template:"<div><div>{{item.name}}</div><div><span>Time data - {{item.data}}</span><div><span>Plan data - {{item.plan}}<span><div><span>Priority - {{item.priority}}</span></div>"/*class='border alert alert-danger nomargin'*/

    };
    })
/*.directive('draggable', function() {
        return function(scope, element) {
            // this gives us the native JS object
            var el = element[0];

            el.draggable = true;

            el.addEventListener(
                'dragstart',
                function(e) {
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('Text', this.id);
                    this.classList.add('drag');
                    return false;
                },
                false
            );

            el.addEventListener(
                'dragend',
                function(e) {
                    this.classList.remove('drag');
                    return false;
                },
                false
            );
            
        }
    })

    .directive('droppable', function() {
        
        return {
            scope: {
                drop: '&' // parent
            },
            link: function(scope, element) {
                // again we need the native object
                var el = element[0];
                el.addEventListener(
                    'dragover',
                    function(e) {
                        e.dataTransfer.dropEffect = 'move';
                        // allows us to drop
                        if (e.preventDefault) e.preventDefault();
                        this.classList.add('over');
                        return false;
                    },
                    false
                );
                el.addEventListener(
                    'dragenter',
                    function(e) {
                        this.classList.add('over');
                        return false;
                    },
                    false
                );

                el.addEventListener(
                    'dragleave',
                    function(e) {
                        this.classList.remove('over');
                        return false;
                    },
                    false
                );
                
                el.addEventListener(
                    'drop',
                    function(e) {
                        // Stops some browsers from redirecting.
                        if (e.stopPropagation) e.stopPropagation();

                        this.classList.remove('over');

                        var item = document.getElementById(e.dataTransfer.getData('Text'));
                        this.appendChild(item);

                        return false;
                    },
                    false
                );
            }
        }
        
    })*/
    //.filter('langOrderByAsc', langOrderByAsc)
    
    //.service('SessionService', ['$injector',route])
    .service('SessionService', ['TaskService','$location','$state',routing])
    .controller('loginCtrl',['$scope', 'TaskService', '$state',loginCtrl])
    .controller('taskCtrl',['$scope', 'TaskService', '$state',taskCtrl])
    .controller('taskDetailCtrl',['$scope', 'TaskService', '$state','$stateParams',taskDetailCtrl])
    .controller('editDetailCtrl',['$scope', 'TaskService', '$state','$stateParams',editCtrl])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
	    // enable CORS credentials
	    //$httpProvider.interceptors.push('CorsRequestInterceptor');
	    // default route
	    $urlRouterProvider.otherwise('/login');
	    // routes
	    $stateProvider
			.state('login', {
			    url: '/login',
			    controller: 'loginCtrl',//['$scope', 'TaskService', '$state',loginCtrl],
			    templateUrl: 'view/login.html',
			})
			.state('task', {
			    url: '/task',
                /*views:{
                    "table": {
                        template: "task.table",
                        templateUrl: 'view/task.html'
                    },
                    "scrum": {
                        template: "task.sctum",
                        templateUrl: 'view/task.html'
                    }
                },*/
			    templateUrl: 'view/task.html',
                controller:'taskCtrl'// ['$scope', 'TaskService', '$state',taskCtrl],
			    
			})
            .state('taskevent', {
                parent: 'task',
			    //url: '/taskevent/:name',
                params:{'name':null},
                templateUrl: 'view/taskevent.html',
			    controller:'taskDetailCtrl'// ['$scope', 'TaskService', '$state',taskCtrl],
			    
			})
            .state('edittask', {
			    url: '/edit/:name',
               // params: ['name'],
                
			    controller:'editDetailCtrl',// ['$scope', 'TaskService', '$state',taskCtrl],
			    templateUrl: 'view/edit.html'
			});;
      /*  $httpProvider
            .when('/login', {
                templateUrl: 'login.html',
                controller: ['$scope', 'TaskService', '$state',loginCtrl]
            })
            .when('/task', {
                templateUrl: 'task.html',
                 controller: ['$scope', 'TaskService', '$state',loginCtrl]
            });*/
        }])

	.run(['$document', '$q', '$rootScope', '$state', '$window', 'SessionService', function ($document, $q, $rootScope, $state, $window, SessionService) {
        
	    // on state change
	    $rootScope.$on('$stateChangeSuccess', function (e, toState, toParams, fromState, fromParams) {
	        var state = toState.name.match(/\.(.*)/);
	        $rootScope.prevState = fromState.name;
	        $rootScope.stateName = toState.name;
	        $rootScope.state = state ? state[1] : toState.name;
            
            SessionService.checkAccess(event, toState, toParams, fromState, fromParams);
            
	    });
        //$rootScope.$on('$stateChangeStart', function (e){ e.preventDefault();SessionService.checkAccess();});

	}]);