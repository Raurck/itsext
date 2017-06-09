(function() {
    'use strict';

    angular
        .module('itsApp')
        .component('newTicket', {
            bindings: {
                services: '<'
            },
            templateUrl: 'assets/newTicket/newTicket.tmpl.html',
            controller: newTicketCtrl,
            controllerAs: 'ntVm'
        });


    newTicketCtrl.$inject = ['$mdDialog', 'login.loginService', 'ticketService'];

    function newTicketCtrl($mdDialog, loginService, ticketService) {
        var ntVm = this;
        ntVm.$onInit = onInit;
        ntVm.closeDialog = closeDialog;
        ntVm.checkIpAddress = checkIpAddress;
        ntVm.ticket = new ticketService.Ticket();

        //////
        function checkIpAddress() {
            return false;
        }


        function onInit() {
            ntVm.services = ['Cеть', 'Телефония', 'Прописка нового пользователя', 'Поддержка рабочих мест',
                'Работа 1С', 'Работа серверов', 'VPN доступ', 'Видеонаблюдение', 'Оргтехника', 'Почта', 'Прочее'
            ];
            ntVm.ticket.assignPerson(loginService.user());
        }


        function closeDialog(result) {
            if (result) {
                //todo save ticket
                ticketService.save(ntVm.ticket);
            }
            $mdDialog.hide();
        }
    }

})();