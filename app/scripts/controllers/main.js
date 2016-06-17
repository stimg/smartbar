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

         $scope.floatMenu = [
           {
             name: 'item #1'
           },
           {
             name: 'item #2'
           },
           {
             name: 'item #3'
           },
           {
             name: 'item #4'
           }
         ];

         this.alert = function (item) {
           alert(item.name);
         }

       });
