/*
 * Version : 0.0.2
 * Author : Marek Sonnabend
 */

'use strict';

var autoSuggestComponent = angular.module('autoSuggestComponent', [
])
.service('autoSuggestComponentService', ['$http', function($http) {
  this.retrieveResults = function (url, term) {
    if (typeof url === 'undefined' || !url) {
      return false;
    }
    switch(url.type) {
      case 'GET' :
        return $http.get(url.base + url.query + term + url.fragment);
      case 'POST' :
        return $http.post(url.base + url.query + term + url.fragment, term);
    }
  };
}])
.controller('autoSuggestComponentController', ['$scope', 'autoSuggestComponentService', function($scope, autoSuggestComponentService) {
    $scope.searchTerm = '';
    $scope.active = -1;
    $scope.hideResultList = true;
    $scope.loading = false;
    $scope.error = false;
    $scope.search = function() {
      /*
       * call service
       */
      if ($scope.searchTerm.toString().length >= $scope.ctrl.noOfCharactersTyped) {
        $scope.searchResults = [];
        autoSuggestComponentService.retrieveResults($scope.ctrl.url, $scope.searchTerm).then(function(results){
          if (typeof results === 'object' && results.length>0) {
            $scope.searchResults = results;
          } else if (typeof results === 'object' && typeof results.data === 'object' && results.data.length>0) {
            $scope.searchResults = results.data;
          }
          if ($scope.searchResults.length>0) {
            $scope.hideResultList = false;
            $scope.error = false;
            //$scope.searchTerm=$scope.searchResults[0][$scope.ctrl.typeaheadTitle];
          } else {
            $scope.hideResultList = true;
            $scope.error = true;
          }
        }, function(){
          $scope.hideResultList = true;
          $scope.error = true;
        });
      }
    };
    $scope.selectActive = function() {

      $scope.hideResultList = true;
      $scope.searchTerm = '';
      if ($scope.active > -1) {
        $scope.ctrl.result = $scope.searchResults[$scope.active];
        $scope.active = -1;
      } else {
        $scope.error = true;
      }
    };

    $scope.resetResults = function() {
      $scope.hideResultList = true;
      $scope.searchResults = [];
      $scope.active = -1;
    };
}])
.directive('autoSuggestComponent', function() {
    return {
      restrict: 'EA',
      controller: 'autoSuggestComponentController',
      controllerAs: 'ctrl',
      bindToController : true,
      scope: {
        url: '=',
        typeaheadTitle : '=',
        result: '=',
        noOfResultsShown: '=',
        noOfCharactersTyped: '='
      },
      templateUrl: 'auto-suggest-component.html',
      link: function (scope, element, attr) {
        // DOM manipulation/events here!
        element.bind('keyup', function (e) {
          if (e.keyCode === 13) {
            scope.$apply(function () {
              scope.selectActive();
            });
          } else if (e.keyCode === 27) {
            scope.$apply(function () {
              scope.hide = true;
            });
          } else if (e.keyCode === 8 || e.keyCode === 46) {
            scope.$apply(function () {
              scope.resetResults();
            });
          }
        });
        element.bind('keydown', function (e) {
          if (e.keyCode === 13 || e.keyCode === 27) {
            e.preventDefault();
          }
          if (e.keyCode === 40) {
            e.preventDefault();
            scope.$apply(function () {
              scope.active++;
            });
          }
          if (e.keyCode === 38) {
            e.preventDefault();
            scope.$apply(function () {
              scope.active--;
            });
          }
        });
      }
    };
  });