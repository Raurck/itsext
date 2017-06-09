(function() {
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
                loggedUser.login = value.login;
                loggedUser.loginPhone = value.loginPhone;
                loggedUser.name = value.name;
                loggedUser.token = value.token;
                loggedUser.roles = value.roles;
                loggedUser.groupId = value.groupId;
            }
        }

        loginService.$inject = ['$q', '$http', '$log'];

        function loginService($q, $http, $log) {
            return new LoginServiceFn($q, $http, $log, loginUserPasswordPath, loginSMSRequestPath, loginSMSResponcePath, loggedUser);
        }
    }

    /**
     * Login Service
     * Uses embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{loadAll: Function}}
     * @constructor
     */

    function LoginServiceFn($q, $http, $log, loginUserPasswordPath, loginSMSRequestPath, loginSMSResponcePath, loggedUser) {
        var self = this;
        self.currentUser = new ActiveUser();
        self.passwordSent = null;
        self.loginPhone = null;
        onInit();

        var users = [{
                login: 'agkufko',
                password: 'Test1234',
                name: 'Куфко Антон',
                loginPhone: '9122359000',
                sms: '1234',
                token: 'ABCDEF',
                roles: ['admin', 'its_user'],
                groupId: 1
            },
            {
                login: 'lyapilin',
                name: 'Ляпилин Виталий',
                password: 'Test1234',
                loginPhone: '9222009132',
                sms: '1234',
                token: 'FEDCBA',
                roles: ['user', 'group_admin'],
                groupId: 22
            }
        ];


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
            if (loggedUser) {
                self.currentUser.assignCurrent(loggedUser);
            }
        }

        function getCurrentUser() {
            return self.currentUser;
        }

        function isLoggedin() {
            return !!(self.currentUser.login);
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

            var sendResult = (users.filter(function(element) {
                if (element.loginPhone == number) {
                    return value;
                }
            }, self)).pop();
            if (sendResult != null) {

            }
        }

        //Try to authorize using user name and password
        function authorize(userName, userPassword) {
            return $http.post('auth_user', { email: userName, password: userPassword }).then(
                function(responce) {
                    console.log(responce);
                }
            );
            /*
            var current = users.find(function(item) {
                if (item.login == userName && item.password == userPassword) {
                    return true;
                }
                return false;
            });

            current = Array.isArray(current) ? current[0] : current;
            if (current) {
                self.currentUser.assignCurrent(current);
                $log.debug('Login success');
                return $q.when(true);
            }
            return $q.when(false);
            */
        }

        //Try to authorize using user SMS code
        function authorizePhone(userSms) {
            var current = users.find(function(item) {
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
        auModel.login = null;
        auModel.token = null;
        auModel.roles = [];
        auModel.assignCurrent = assignCurrent;

        /*
                return {
                    name: auModel.name,
                    login: auModel.login,
                    token: auModel.token,
                    roles: auModel.roles,
                    assignCurrent: assignCurrent
                };*/

        //////Realisation
        function assignCurrent(dataObj) {
            auModel.name = dataObj.name;
            auModel.loginPhone = dataObj.loginPhone;
            auModel.login = dataObj.login;
            auModel.roles = dataObj.roles;
            auModel.token = dataObj.token;
        }

    }
})();