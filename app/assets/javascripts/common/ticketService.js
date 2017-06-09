(function() {
    'use strict';

    angular
        .module('itsApp')
        .service('ticketService', ticketService);

    ticketService.$inject = ['$http'];

    function ticketService($http) {
        var ticketServiceVm = this;
        ticketServiceVm.getData = getData;
        ticketServiceVm.Ticket = ticket;
        ticketServiceVm.save = save;
        ticketServiceVm.Ip = '';
        getLocalIp();

        function save(newTciket) {
            $http.post('tickets.json', newTciket);
        }

        function getLocalIp() {

            window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection; //compatibility for firefox and chrome
            var pc = new RTCPeerConnection({ iceServers: [] }),
                noop = function() {};
            pc.createDataChannel(""); //create a bogus data channel
            pc.createOffer(pc.setLocalDescription.bind(pc), noop); // create offer and set local description
            pc.onicecandidate = function(ice) { //listen for candidate events
                if (!ice || !ice.candidate || !ice.candidate.candidate) return;
                var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];

                ticketServiceVm.Ip = myIP;
                pc.onicecandidate = noop;
            };

        }

        function getData() {
            $http.get('tickets.json').then(function() {
                console.log(data);
            });
        }

        function ticket() {
            var tck = this;
            tck.serviceId = null;
            tck.massive = false;
            tck.ipaddress = '0.0.0.0';
            tck.contact = '';
            tck.contact_phone = '';
            tck.assignPerson = assignPerson;
            return tck;
            /////
            function assignPerson(obj) {
                tck.ipaddress = ticketServiceVm.Ip;
                tck.contact = obj.name;
                tck.contact_phone = obj.loginPhone;
            }

        }
    }
})();