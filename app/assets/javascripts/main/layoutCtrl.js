(function() {
    'use strict';

    angular.module('itsApp')
        .controller('layoutCtrl', layoutFn);

    layoutFn.$inject = ['$log', '$scope', '$mdDialog', '$state', 'login.loginService', 'ticketService'];

    function layoutFn($log, $scope, $mdDialog, $state, loginService, ticketService) {
        var layuotVm = this;
        layuotVm.loggedin = loginService.isLoggedin;
        layuotVm.user = loginService.user;
        $log.debug(layuotVm.loggedin());
        $scope.toppings = [
            { name: 'Pepperoni', wanted: true },
            { name: 'Sausage', wanted: false },
            { name: 'Black Olives', wanted: true },
            { name: 'Green Peppers', wanted: false }
        ];

        $scope.settings = [
            { name: 'Wi-Fi', extraScreen: 'Wi-fi menu', icon: 'device:network-wifi', enabled: true },
            { name: 'Bluetooth', extraScreen: 'Bluetooth menu', icon: 'device:bluetooth', enabled: false },
        ];

        $scope.messages = [
            { id: 1, title: "Message A", selected: false },
            { id: 2, title: "Message B", selected: true },
            { id: 3, title: "Message C", selected: true },
        ];

        $scope.menuitems = [
            { id: 1, name: 'Пульс', state: 'home' },
            { id: 2, name: 'Подразделения', state: 'offices' },
            { id: 3, name: 'Заявки', state: 'tickets' },
        ];

        $scope.goToState = function(service, event) {
            $state.go(service.state);
        };

        $scope.navigateTo = function(to, event) {
            $mdDialog.show(
                $mdDialog.alert()
                .title('Navigating')
                .textContent('Imagine being taken to ' + to)
                .ariaLabel('Navigation demo')
                .ok('Neat!')
                .targetEvent(event)
            );
        };

        $scope.doPrimaryAction = function(event) {
            $mdDialog.show(
                $mdDialog.alert()
                .title('Primary Action')
                .textContent('Primary actions can be used for one click actions')
                .ariaLabel('Primary click demo')
                .ok('Awesome!')
                .targetEvent(event)
            );
        };

        $scope.doSecondaryAction = function(event) {
            $mdDialog.show(
                $mdDialog.alert()
                .title('Secondary Action')
                .textContent('Secondary actions can be used for one click actions')
                .ariaLabel('Secondary click demo')
                .ok('Neat!')
                .targetEvent(event)
            );
        };

    };


    /**
    Copyright 2016 Google Inc. All Rights Reserved. 
    Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
    **/
})();