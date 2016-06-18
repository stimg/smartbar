'use strict';

/**
 * @ngdoc function
 * @name smartbarApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the smartbarApp
 */
angular.module('smartbarApp')

       .controller('MainCtrl', function ($scope, $mdDialog) {

         var originatorEv;

         this.openMenu = function ($mdOpenMenu, ev) {
           originatorEv = ev;
           $mdOpenMenu(ev);
         };

         $.getJSON('menu.json').then(function (menu) {
           $scope.floatMenu = menu; 
         });

         this.alert = function (item) {
           alert(item.name);
         }

       });
