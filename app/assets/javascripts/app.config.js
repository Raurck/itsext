(function() {
    'use strict';
    angular
        .module('itsApp')
        .config(['$mdIconProvider', function($mdIconProvider) {
            $mdIconProvider
                .icon("menu", "assets/svg/menu.svg", 24)
                .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
                .iconSet('device', 'img/icons/sets/device-icons.svg', 24)
                .icon('contract', 'assets/svg/file-document.svg', 24)
                .icon('ticket', 'assets/svg/ticket-account.svg', 24)
                .iconSet('communication', 'assets/svg/communication-icons.svg', 24);
        }])
        .config(['$mdThemingProvider', function($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('green')
                .accentPalette('red');
        }])
        .config(['uiMask.ConfigProvider', function(uiMaskConfigProvider) {
            uiMaskConfigProvider.addDefaultPlaceholder(false);
        }])
        .config(loginConfigFn)
        .config(stateConfigFn);

    loginConfigFn.$inject = ['login.loginServiceProvider'];

    function loginConfigFn(loginServiceProvider) {
        loginServiceProvider.setLoginSMSRequestPath('/sms/');
        loginServiceProvider.setLoggedUser({
            login: 'agkufko',
            password: 'Test1234',
            loginPhone: '9122359000',
            name: 'Куфко Антон',
            sms: '1234',
            token: 'ABCDEF',
            roles: ['admin', 'its_user'],
            groupId: 1
        });
    }

    stateConfigFn.$inject = ['$stateProvider', '$urlRouterProvider', '$transitionsProvider'];

    function stateConfigFn($stateProvider, $urlRouterProvider, $transitionsProvider) {
        var loginState = {
                name: 'login',
                url: '/login',
                component: 'login',
                params: {
                    backUrl: ''
                }
            },
            defaultState = {
                name: 'home',
                url: '/home',
                resolve: {
                    tickets: tickeFn
                },
                controller: 'mockCtrl',
                templateUrl: 'assets/heartbeat/heartbeat.tmpl.html'
            },
            ticketState = {
                name: 'tickets',
                url: '/tickets',
                templateUrl: 'assets/heartbeat/heartbeat.tmpl.html'
            },

            ticketStateOpen = {
                name: 'tickets.open',
                url: '/open',
                templateUrl: 'assets/heartbeat/heartbeat.tmpl.html'
            };


        $stateProvider.state(loginState)
            .state(defaultState)
            .state(ticketState)
            .state(ticketStateOpen);
        $urlRouterProvider.otherwise('/home');

        tickeFn.$inject = ['ticketService'];

        function tickeFn(ticketService) { return ticketService.getData(); }

    }
})();