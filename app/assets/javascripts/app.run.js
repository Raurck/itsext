(function() {
    'use strict';
    angular
        .module('itsApp')
        .run(['$rootScope', '$state', '$log', '$transitions', appRunFn]);

    function appRunFn($rootScope, $state, $log, $transitions) {
        $log.debug("startApp running ");

        $transitions.onStart({ to: '*' }, function(trans) {
            //$log.debug(trans.params('to'));
            var login = trans.injector().get('login.loginService');
            if (!login.isLoggedin() && (trans.$to().name != 'login')) {
                return $state.go('login', { backUrl: trans.$to().name });
                //return trans.router.stateService.target('login', { backUrl: trans.$to().name });
            }
        });
    }
})();