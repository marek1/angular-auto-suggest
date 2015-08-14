'use strict';


var exampleApp = angular.module('exampleApp', [
  'autoSuggestComponent'
])
.controller('MainController', function() {
  var maxNoOfResults = 10;
  this.searchParameters = {
    /*
     * typeaheadTitle is the title of the result shown in the typeahead
     */
    typeaheadTitle : 'display_name',
    /*
     * Number of results shown in the result list
     */
    noOfResultsShown : maxNoOfResults,
    /*
     * Number of characters , that need to be typed before a request is sent
     */
    noOfCharactersTyped : 2,
    /*
     * This is the URL which is requested
     * NOTE : It is contructed by adding the following :
     * base  =  protocol + host + port + domain + path
     * query =  how the query string is constructed
     * fragment = offset , format etc.
     */
    searchUrl : {
      type : 'GET',
      base: 'http://nominatim.openstreetmap.org/search.php',
      query: '?q=',
      fragment: '&format=json&limit='+maxNoOfResults
    },
    /*
     * the searchResult is the object returned from the component
     */
    searchResult : {}
  };
});