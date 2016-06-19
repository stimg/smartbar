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
    $scope.activeSubmenu = {};
    $scope.compactMode = true;
    this.hideMenuTID = null;

    var originatorEv;

    this.openMenu = function ($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $http.get('menu.json').then(function (menu) {
      $scope.floatMenu = menu.data;
      $scope.activeSubmenu = menu.data[0].items;
    });

    this.setActiveSubmenu = function (index, submenu) {
      $scope.activeMenuIndex = index;
      $scope.activeSubmenu = submenu.items;
    };

    this.toggleSet = function (item) {
      item.inset = !item.inset;
    };

    this.toggleComplactMode = function () {
      $scope.compactMode = !$scope.compactMode;
    };

    this.hideFloatMenu = function () {
      this.hideMenuTID = setTimeout(function () {
        $('#float-menu').fadeOut();
      }, 300);
    };

    this.showFloatMenu = function () {
      clearTimeout(this.hideMenuTID);
      $('#float-menu').fadeIn();
    };

    this.openDialog = function (name, ev) {
      $mdDialog.show($mdDialog.alert()
        .title(name)
        .textContent('You triggered the "' + name + '" action')
        .ok('Great')
        .targetEvent(ev)
      );
    };

  });
