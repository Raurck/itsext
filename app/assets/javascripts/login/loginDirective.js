(function () {
    'use strict';
    angular
        .module('login')
        .component('login', {
            bindings: {
                '$transition$': '<'
            },
            templateUrl: 'assets/login/login.tmpl.html',
            controller: LoginController,
            controllerAs: 'lc'
        });

    /**
     * Login controller for login app
     * @param $scope
     * @param $mdSidenav
     * @param $mdBottomSheet
     * @constructor
     */
    LoginController.$inject = ['login.loginService', '$mdSidenav', '$mdBottomSheet', '$log', '$state', '$scope'];

    function LoginController(loginService, $mdSidenav, $mdBottomSheet, $log, $state, $scope) {
        var self = this;

        self.phonenumber = '';
        self.sms = '';
        self.login = '';
        self.password = '';

        self.isLoggedin = loginService.isLoggedin;
        self.requestsms = requestsms;
        self.auth = auth;
        self.smsauth = smsauth;
        self.logoff = logoff;

        //////

        function requestsms() {
            $log.debug('requesting SMS for ', self.phonenumber);
            loginService.sendSms(self.phonenumber).then(
                function () {
                    self.passwordSent = loginService.isPasswordSent();
                },
                loginFailed
            );
        }

        function auth() {
            loginService.authorize(self.login, self.password).then(
                afterAuth,
                loginFailed
            );
        }

        function smsauth() {
            loginService.authorizePhone(self.sms).then(
                afterAuth,
                loginFailed
            );
        }


        function logoff() {
            loginService.clearAuth();
        }

        function afterAuth(result) {
            if (self.isLoggedin() === true) {
                $log.debug('Logged in');
                $log.debug(self.$transition$.params('to'));
                if (self.$transition$.params('to').backUrl) {
                    $state.go(self.$transition$.params('to').backUrl);
                }
            } else {
                loginFailed(result)
            }
        }

        function loginFailed(result) {
            $log.debug('Logged failed');
            $log.debug(result);
            loginService.clearAuth();
        }
    }

})();