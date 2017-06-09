(function() {
    'use strict';

    // Prepare the 'users' module for subsequent registration of controllers and delegates
    angular.module('login', ['ngMaterial', 'ui.router', 'ui.mask', 'ui.autofocus'])
        .config(['uiMask.ConfigProvider', function(uiMaskConfigProvider) {
            uiMaskConfigProvider.addDefaultPlaceholder(false);
        }])
        .config(['$mdIconProvider', function($mdIconProvider) {
            $mdIconProvider
                .icon("person", "./assets/svg/person.svg", 24)
                .icon("phonelink", "./assets/svg/phonelink.svg", 24);
        }]);

})();