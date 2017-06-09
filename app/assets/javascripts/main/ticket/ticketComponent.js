(function() {
    'use strict';

    angular
        .module('itsApp')
        .component('itsTicket', {
            bindings: {
                ticket: '<'
            },
            templateUrl: 'script/app/main/ticket/ticketTemplate.html',
            controller: itsTicketFn
        });



    function itsTicketFn() {
        console.log(this.ticket);
    }
})();