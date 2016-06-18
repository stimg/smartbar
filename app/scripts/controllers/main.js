'use strict';

/**
 * @ngdoc function
 * @name smartbarApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the smartbarApp
 */
angular.module('smartbarApp')

       .controller('MainCtrl', function ($scope, $http, $mdDialog) {

         $scope.activeMenuIndex = 0;

         var originatorEv;

         this.openMenu = function ($mdOpenMenu, ev) {
           originatorEv = ev;
           $mdOpenMenu(ev);
         };

         $http.get('menu.json').then(function (menu) {
           $scope.floatMenu = menu.data;
         });

         this.alert = function (item) {
           alert(item.name);
         }

       });
