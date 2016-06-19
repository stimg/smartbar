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

    $scope.activeMenuIndex = 0;
    $scope.activeSubmenu = {};
    $scope.compactMode = false;
    $scope.floatMenuHidden = true;
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
