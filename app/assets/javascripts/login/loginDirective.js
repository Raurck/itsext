(function() {
    'use strict';
    angular
        .module('login')
        .component('login', {
            bindings: {
                '$transition$': '<'
            },
            templateUrl: 'assets/login/login.tmpl.html',
            controller: ['login.loginService', '$mdSidenav', '$mdBottomSheet', '$log', '$state', '$scope', LoginController],
            controllerAs: 'lc'
        });

    /**
     * Login controller for login app
     * @param $scope
     * @param $mdSidenav
     * @param $mdBottomSheet
     * @constructor
     */
    function LoginController(loginService, $mdSidenav, $mdBottomSheet, $log, $state, $scope) {
        var self = this;

        self.phonenumber = '';
        self.sms = '';
        self.login = '';
        self.password = '';
        self.isLoggedin = loginService.isLoggedin;

        this.requestsms = function() {
            $log.debug('requesting SMS for ', this.phonenumber);
            loginService.sendSms(this.phonenumber).then(
                function(data) {
                    self.passwordSent = loginService.isPasswordSent();
                },
                function(data) {
                    loginFailed('SMS request filed');
                }
            );

        };

        this.auth = function() {
            loginService.authorize(this.login, this.password).then(
                function() {
                    if (self.isLoggedin) {
                        $log.debug('Logged in');
                        if (self.$transition$.params('to').backUrl) {
                            $state.go(self.$transition$.params('to').backUrl);
                        }
                    } else {
                        loginFailed('Logged failed');
                    }
                },
                function() {
                    loginFailed('Logged failed');

                }
            );

        };

        this.smsauth = function() {
            loginService.authorizePhone(this.sms).then(
                function() {
                    $log.debug('Logged in');
                    $log.debug(self.$transition$.params('to'));
                    if (self.$transition$.params('to').backUrl) {
                        $state.go(self.$transition$.params('to').backUrl);
                    }
                },
                function() { loginService.clearAuth(); }
            );
        };

        this.logoff = function() {
            loginService.clearAuth();
        };


        function loginFailed(message) {
            $log.debug(message);
            loginService.clearAuth();
        }
    }

})();