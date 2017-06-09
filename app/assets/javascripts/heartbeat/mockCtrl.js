(function() {
    'use strict';
    angular.module('itsApp')
        .controller('mockCtrl', mockCtrlFn);

    mockCtrlFn.$inject = ['$scope', '$mdDialog', '$log', 'tickets'];

    function mockCtrlFn($scope, $mdDialog, $log, tickets) {
        $log.debug(tickets);
        $scope.tickets = tickets;
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

        $scope.services = [
            { id: 1, name: 'Обслуживание сети', img: '/assets/services/1.png', newMessage: true, disabled: false, description: 'Управление маршрутизаторами и коммутаторами сети' },
            { id: 2, name: 'Сервера', img: '/assets/services/2.jpg', newMessage: true, disabled: false, description: 'Обслуживание серверов компании: файловых, доменных котроллеров и т.п.' },
            { id: 3, name: 'Рабочие станции', img: '/assets/services/3.png', newMessage: true, disabled: false, description: 'Обслуживание станцйи пользователей, решение текущих проблем по обращениям' },
            { id: 4, name: 'Телефония', img: '/assets/services/4.png', newMessage: true, disabled: false, description: 'Обслуживание АТС и телефонных аппаратов' },
            { id: 5, name: 'Интернет', img: '/assets/services/5.png', newMessage: true, disabled: false, description: 'Взаимодействие с Вашим интернет провайдером' },
            { id: 6, name: 'ВПН', img: '/assets/services/6.png', newMessage: true, disabled: true, description: 'Предоставление защищенного доступа к сети' },
            { id: 7, name: 'Сервера 1С', img: '/assets/services/7.jpg', newMessage: true, disabled: true, description: 'Обслуживание виртуальных серверов 1С' },
            { id: 8, name: 'Видеонаблюдение', img: '/assets/services/8.jpg', newMessage: true, disabled: true, description: '' },
            { id: 9, name: 'Антивирус', img: '/assets/services/9.jpg', newMessage: true, disabled: true, description: 'Предоставления антивируса Dr.Web' },
            { id: 10, name: 'Почта', img: '/assets/services/10.png', newMessage: true, disabled: true, description: 'Предоставление, управление и обслуживани почтовыми доменами Вашей ораганизации' },
            { id: 11, name: 'Оргетехника', img: '/assets/services/11.png', newMessage: true, disabled: true, description: 'Услуги ремонта оргтехники и принтеров' },
            { id: 12, name: 'Резервное копирование', img: '/assets/services/12.png', newMessage: true, disabled: false, description: 'Обеспечение резервного копирования' },
        ];

        $scope.goToService = function(service, event) {
            $mdDialog.show(
                $mdDialog.alert()
                .title('Информация о сервисе')
                .textContent(service.name + '\n' + service.description)
                .ariaLabel('Person inspect demo')
                .ok('OK')
                .targetEvent(event)
            );
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

    }


    /**
    Copyright 2016 Google Inc. All Rights Reserved. 
    Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
    **/
})();