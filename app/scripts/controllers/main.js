'use strict';

/**
 * @ngdoc function
 * @name smartbarApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the smartbarApp
 */
angular.module('smartbarApp')

       .controller('MainCtrl', function ($scope, $http, $timeout, $mdDialog) {

         var $ = angular.element;

         $scope.activeSpaceIndex = 0;
         $scope.activeSubmenu = {};
         $scope.compactMode = false;
         $scope.floatMenuHidden = true;
         this.hideMenuTID = null;

         var originatorEv;

         this.openMenu = function ($mdOpenMenu, ev) {

           originatorEv = ev;
           $mdOpenMenu(ev);

         };

         this.openFuncMenu = function ($mdOpenMenu, ev, func) {

           if (func && func.items) {

             originatorEv = ev;
             $mdOpenMenu(ev);

           }

         };

         $http.get('menu.json').then(function (menu) {
           $scope.spaces = menu.data.spaces;
           $scope.functiongroups = menu.data.functiongroups;
           $scope.activeSpace = menu.data.spaces[0].items;
         });

         this.setActiveSubmenu = function (index, submenu) {
           $scope.activeSpaceIndex = index;
           $scope.activeSubmenu = submenu.items;
         };

         this.toggleSet = function (item) {

           var iset = $scope.spaces[$scope.activeSpaceIndex].items,
             idx = iset.indexOf(item.id);

           if (idx === -1) {

             iset.push(item.id);

           } else {

             iset.splice(idx, 1);

           }

         };

         this.toggleComplactMode = function () {
           $scope.compactMode = !$scope.compactMode;
         };

         this.getFunction = function (id) {

           var fg = $scope.functiongroups,
             fglen = fg.length, fn,
             sf = function (f) {

               return f.id === id;

             };

           for (var i = 0; i < fglen; i++) {

             fn = fg[i].items.find(sf);

             if (fn) {

               break;

             }

           }

           return fn;

         };

         this.hideFloatMenu = function (evt) {

           evt.stopPropagation();
           this.hideMenuTID = $timeout(function () {

             $scope.floatMenuHidden = true;
             $('#float-menu').css('opacity', 0.2);

           }, 1000);

         };

         this.showFloatMenu = function (evt) {

           evt.stopPropagation();
           if (this.hideMenuTID) {

             $timeout.cancel(this.hideMenuTID);

           }
           $scope.floatMenuHidden = false;
           $('#float-menu').css('opacity', 1);

         };

         this.openDialog = function (name, ev) {
           $mdDialog.show($mdDialog.alert()
                                   .title(name)
                                   .textContent('You triggered the "' + name + '" action')
                                   .ok('Great')
                                   .targetEvent(ev)
           );
         };

         this.fmenuDragStop = function (evt) {

           $(evt.target).css('width', '');

         };

       });
