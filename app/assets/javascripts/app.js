(function() {
    'use strict';
    // Load libraries
    /*
    import angular from 'angular';

    import 'angular-animate';
    import 'angular-aria';
    import 'angular-material';

    export default angular.module( 'itsApp', [ 'ngMaterial','login' ] )
      .run(() => {
        console.log(`Starting the 'its-app' module`);
      });
    */

    angular
        .module('itsApp', ['ngMaterial', 'ui.mask', 'ui.router', 'ui.autofocus', 'login']);


})();