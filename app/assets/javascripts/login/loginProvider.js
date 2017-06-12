(function () {
    'use strict';
    angular
        .module('login')
        .provider('login.loginService',
            loginServiceProvider
        );

    loginServiceProvider.$inject = [];

    function loginServiceProvider() {
        var provVM = this;
        var loginUserPasswordPath = '\login',
            loginSMSRequestPath = '\loginSMS',
            loginSMSResponcePath = '\login',
            loggedUser = null;
        provVM.setLoginSMSRequestPath = setLoginSMSRequestPath;
        provVM.setLoginSMSResponcePath = setLoginSMSResponcePath;
        provVM.setLoginUserPasswordPath = setLoginUserPasswordPath;
        provVM.setLoggedUser = setLoggedUser;
        provVM.$get = loginService;

        function setLoginSMSRequestPath(value) {
            loginSMSRequestPath = value;
        }

        function setLoginSMSResponcePath(value) {
            loginSMSResponcePath = value;
        }

        function setLoginUserPasswordPath(value) {
            loginUserPasswordPath = value;
        }

        function setLoggedUser(value) {
            if (value) {
                loggedUser = {};
                loggedUser.name = value.name;
                loggedUser.access_token = value.access_token;
                loggedUser.expires = value.expires;
                loggedUser.roles = value.roles;
            }
        }

        loginService.$inject = ['$q', '$http', '$log', '$rootScope', '$window'];

        function loginService($q, $http, $log, $rootScope, $window) {
            return new LoginServiceFn($q, $http, $log, $rootScope, $window, loginUserPasswordPath, loginSMSRequestPath, loginSMSResponcePath, loggedUser);
        }
    }

    /**
     * Login Service
     */

    function LoginServiceFn($q, $http, $log, $rootScope, $window, loginUserPasswordPath, loginSMSRequestPath, loginSMSResponcePath, loggedUser) {
        var self = this;
        self.currentUser = new ActiveUser();
        self.passwordSent = null;
        self.loginPhone = null;
        onInit();

        // exports Service object
        var service = {
            isPasswordSent: isPasswordSent,
            isLoggedin: isLoggedin,
            getLoginPhone: getLoginPhone,
            sendSms: sendSms,
            authorize: authorize,
            authorizePhone: authorizePhone,
            clearAuth: clearAuth,
            user: getCurrentUser
        };
        return service;

        //////Realistaion

        function onInit() {
            try {
                var curUser = JSON.parse($window.sessionStorage.getItem('user'));
                if (curUser && (new Date(curUser.expires)).valueOf() >= (new Date()).valueOf()) {
                    self.currentUser.assignCurrent(curUser);
                    return;
                }
            } catch (ex) {

            }
            if (loggedUser) {
                saveTokenData({data:loggedUser});
            }
        }

        function getCurrentUser() {
            return self.currentUser;
        }

        function isLoggedin() {
            return !!(self.currentUser.access_token && self.currentUser.expires >= (new Date()).valueOf());
        }
        // Check nuber is 10 digit number, whithout any other chars
        function isPasswordSent() {
            return self.passwordSent;
        }

        // Check nuber is 10 digit number, whithout any other chars
        function getLoginPhone() {
            return self.loginPhone;
        }

        // Check nuber is 10 digit number, whithout any other chars
        function checkNumber(number) {
            return true;
        }

        //Request SMS for number
        function requestSms(number) {
            $http({
                method: 'POST',
                url: loginSMSRequestPath
            }).then();

            var sendResult = (users.filter(function (element) {
                if (element.loginPhone == number) {
                    return value;
                }
            }, self)).pop();
            if (sendResult != null) {

            }
        }

        function graceReject(responce) {
            return $q.when({
                success: false,
                responce: responce
            });
        }

        function saveTokenData(responce) {
            var data = responce.data;
            if (!data || !data.access_token) {
                return $q.reject({
                    response: responce,
                    success: false
                });
            }
            $log.debug(data);
            self.currentUser.assignCurrent(data);
            $rootScope.$broadcast('loginService:loggedin');
            $window.sessionStorage.setItem('user', JSON.stringify(self.currentUser));
            return $q.resolve({
                response: responce,
                success: true
            });
        };

        //Try to authorize using user name and password
        function authorize(userName, userPassword) {
            return $http.post('auth_user', {
                email: userName,
                password: userPassword
            }).then(saveTokenData, graceReject);
        }

        //Try to authorize using user SMS code
        function authorizePhone(userSms) {
            var current = users.find(function (item) {
                if (item.loginPhone == self.loginPhone && item.sms == userSms) {
                    return true;
                }
                $log.debug('Login failed');
                return false;
            });
            current = Array.isArray(current) ? current[0] : current;
            if (current) {
                self.currentUser.assignCurrent(current);
                $log.debug('Login success');
                return $q.when(true);
            }
            $log.debug('Login failed');
            return $q.when(false);
        }

        //Clear aothentication data
        function clearAuth() {
            self.currentUser = new ActiveUser();
            $window.sessionStorage.setItem('user', null);
            self.passwordSent = null;
            self.loginPhone = null;
        }

        //Send an SMS to user
        function sendSms(number) {
            if (checkNumber(number)) {
                self.passwordSent = true;
                self.loginPhone = number;
                return $q.when(true);
            }
        }

    }

    /**
     * Object represents currently logged user
     */
    function ActiveUser() {
        var auModel = this;
        auModel.name = null;
        auModel.access_token = null;
        auModel.expires = new Date();
        auModel.roles = [];
        auModel.assignCurrent = assignCurrent;

        //////Realisation
        function assignCurrent(dataObj) {
            auModel.name = dataObj.name;
            auModel.loginPhone = dataObj.loginPhone;
            auModel.expires = new Date(dataObj.expires);
            auModel.roles = dataObj.roles;
            auModel.access_token = dataObj.access_token;
        }

    }
})();