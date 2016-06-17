'use strict';

/**
 * @ngdoc overview
 * @name smartbarApp
 * @description
 * # smartbarApp
 *
 * Main module of the application.
 */
angular
  .module('smartbarApp', [
    'ngDragDrop',
    'ngMaterial'
  ])

  .config(function($mdIconProvider) {
  $mdIconProvider
    .iconSet("call", 'img/icons/sets/communication-icons.svg', 24)
    .iconSet("social", 'img/icons/sets/social-icons.svg', 24);
});
