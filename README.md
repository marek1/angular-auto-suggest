## Angular auto-suggest ##

--- How to use ---

To retrieve the component use bower. Thus, include this in your bower.json

    "dependencies": {
        ...
        "angular-auto-suggest" : "git@github.com:marek1/angular-auto-suggest.git#x.x.x"
        ...
    }

NOTE : Change the version (x.x.x) accordingly.

Then run 

    bower install
    

To use in your project load the minified JS like so : 

    <script src="BOWER_PATH/angular-auto-suggest/dist/angular-auto-suggest.min.js"></script>

NOTE : replace BOWER_PATH/angular-auto-suggest with the correct path.

In your app inject the auto-suggest-component as follows 

    var exampleApp = angular.module('exampleApp', ['autoSuggestComponent'])

In the DOM template use it as follows

    <auto-suggest-component
            data-url="someCtrl.searchParameters.searchUrl"
            data-typeahead-title="someCtrl.searchParameters.typeaheadTitle"
            data-result="someCtrl.searchParameters.searchResult"
            data-no-of-results-shown="someCtrl.searchParameters.noOfResultsShown"
            data-no-of-characters-typed="someCtrl.searchParameters.noOfCharactersTyped">
    </auto-suggest-component>

NOTE : you are passing variables (someCtrl.searchParameters.xxx) into the directive. The variables are properties of an object (searchParameters), which is a scope variable of a controller. The controller would in this case be initialised as follows : 

Javascript : 
	
    exampleApp.controller('SomeController', function() {
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

HTML : 

    <div data-ng-controller="SomeController as someCtrl">
        <auto-suggest-component
                data-url="someCtrl.searchParameters.searchUrl"
                data-typeahead-title="someCtrl.searchParameters.typeaheadTitle"
                data-result="someCtrl.searchParameters.searchResult"
                data-no-of-results-shown="someCtrl.searchParameters.noOfResultsShown"
                data-no-of-characters-typed="someCtrl.searchParameters.noOfCharactersTyped">
        </auto-suggest-component>
    </div>

The result returned is 

    someCtrl.searchParameters.searchResult

To see an example / demo run

    grunt

NOTE : this requires you to install bower and npm.

    bower install
    npm install

--- Versions ---

Version 0.0.2
- Paramater : 
  - Min number of chars typed 
  - Max number of results displayed 
  
Version 0.0.1
- Basic Setup & Tests