function route($injector) {
      "use strict";

      this.checkAccess = function(event, toState, toParams, fromState, fromParams) {
        var $scope = $injector.get('$rootScope'),
            $sessionStorage = $injector.get('$sessionStorage');

        if (toState.data !== undefined) {
          if (toState.data.noLogin !== undefined && toState.data.noLogin) {
            // если нужно, выполняйте здесь какие-то действия 
            // перед входом без авторизации
          }
        } else {
          // вход с авторизацией
          if ($sessionStorage.user) {
            $scope.$root.user = $sessionStorage.user;
          } else {
            // если пользователь не авторизован - отправляем на страницу авторизации
            event.preventDefault();
            $scope.$state.go('login');
          }
        }
      };
}