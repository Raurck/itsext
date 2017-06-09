(function() {
    'use strict';

    angular
        .module('itsApp')
        .directive('newTicketBtn', newTicketBtn);

    newTicketBtn.$inject = ['$window', '$mdDialog'];

    function newTicketBtn($window, $mdDialog) {
        // Usage:
        //     <directive></directive>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A'

        };
        return directive;

        function link(scope, element, attrs) {
            element.on('click', showNewTicketDiaolg);

            scope.$on('$destroy', onDestroy);

            function onDestroy() {

            }

            function showNewTicketDiaolg(evt) {
                $mdDialog.show({
                    template: '<new-ticket></new-ticket>',
                    targetEvent: evt,
                    clickOutsideToClose: false,
                    fullscreen: true,
                    parent: angular.element(document.body)
                }).then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
            }

        }
    }

})();