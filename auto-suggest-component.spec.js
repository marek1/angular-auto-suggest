var maxNoOfResults = 10,
  noOfCharactersTyped = 3,
  searchResult = [{"place_id":"147041","licence":"Data © OpenStreetMap contributors, ODbL 1.0. http:\/\/www.openstreetmap.org\/copyright","osm_type":"node","osm_id":"27418664","boundingbox":["49.9506529","50.2706529","8.5220934","8.8420934"],"lat":"50.1106529","lon":"8.6820934","display_name":"Frankfurt am Main, Regierungsbezirk Darmstadt, Hesse, Germany","class":"place","type":"city","importance":0.79128445271289,"icon":"http:\/\/nominatim.openstreetmap.org\/images\/mapicons\/poi_place_city.p.20.png"},{"place_id":"127749226","licence":"Data © OpenStreetMap contributors, ODbL 1.0. http:\/\/www.openstreetmap.org\/copyright","osm_type":"relation","osm_id":"62400","boundingbox":["50.0155435","50.2271408","8.4718253","8.8004716"],"lat":"50.1213881","lon":"8.6620096369594","display_name":"Frankfurt am Main, Regierungsbezirk Darmstadt, Hesse, Germany","class":"place","type":"city","importance":0.79128445271289,"icon":"http:\/\/nominatim.openstreetmap.org\/images\/mapicons\/poi_place_city.p.20.png"},{"place_id":"740773","licence":"Data © OpenStreetMap contributors, ODbL 1.0. http:\/\/www.openstreetmap.org\/copyright","osm_type":"node","osm_id":"262894309","boundingbox":["49.6606061","49.7006061","10.5067235","10.5467235"],"lat":"49.6806061","lon":"10.5267235","display_name":"Frankfurt, Scheinfeld (VGem), Neustadt an der Aisch-Bad Windsheim, Middle Franconia, Free State of Bavaria, 91480, Germany","class":"place","type":"village","importance":0.375,"icon":"http:\/\/nominatim.openstreetmap.org\/images\/mapicons\/poi_place_village.p.20.png"},{"place_id":"737861","licence":"Data © OpenStreetMap contributors, ODbL 1.0. http:\/\/www.openstreetmap.org\/copyright","osm_type":"node","osm_id":"262720192","boundingbox":["-24.6477761","-24.6077761","30.7786057","30.8186057"],"lat":"-24.6277761","lon":"30.7986057","display_name":"Frankfurt, Ehlanzeni District Municipality, Mpumalanga, RSA","class":"place","type":"village","importance":0.375,"icon":"http:\/\/nominatim.openstreetmap.org\/images\/mapicons\/poi_place_village.p.20.png"},{"place_id":"121951143","licence":"Data © OpenStreetMap contributors, ODbL 1.0. http:\/\/www.openstreetmap.org\/copyright","osm_type":"way","osm_id":"293744967","boundingbox":["43.3273416","43.3279385","-8.404557","-8.4040609"],"lat":"43.3277044","lon":"-8.4043291","display_name":"Frankfurt, A Zapateira, A Coruña, La Corogne, Galicia, 15191, Spain","class":"highway","type":"living_street","importance":0.2},{"place_id":"116661732","licence":"Data © OpenStreetMap contributors, ODbL 1.0. http:\/\/www.openstreetmap.org\/copyright","osm_type":"way","osm_id":"261600904","boundingbox":["-22.4467611","-22.4459297","-68.9370611","-68.9368846"],"lat":"-22.4459297","lon":"-68.9368846","display_name":"Frankfurt, Calama, Provincia del Loa, II Región de Antofagasta, Chile","class":"highway","type":"residential","importance":0.2},{"place_id":"88793131","licence":"Data © OpenStreetMap contributors, ODbL 1.0. http:\/\/www.openstreetmap.org\/copyright","osm_type":"way","osm_id":"144813918","boundingbox":["-22.4455472","-22.4451686","-68.9368585","-68.9367863"],"lat":"-22.445324","lon":"-68.9368159","display_name":"Frankfurt, Calama, Provincia del Loa, II Región de Antofagasta, Chile","class":"highway","type":"living_street","importance":0.2},{"place_id":"57871797","licence":"Data © OpenStreetMap contributors, ODbL 1.0. http:\/\/www.openstreetmap.org\/copyright","osm_type":"way","osm_id":"20976325","boundingbox":["33.602035","33.640174","-102.4530899","-102.4523069"],"lat":"33.620877","lon":"-102.4528449","display_name":"Frankfurt, Hockley County, Texas, 79336, United States of America","class":"highway","type":"residential","importance":0.2},{"place_id":"74484463","licence":"Data © OpenStreetMap contributors, ODbL 1.0. http:\/\/www.openstreetmap.org\/copyright","osm_type":"way","osm_id":"93588041","boundingbox":["-37.811479","-37.8106896","-72.6976173","-72.6956534"],"lat":"-37.8110844","lon":"-72.6966396","display_name":"Frankfurt, Angol, Provincia de Malleco, IX Región de la Araucanía, Chile","class":"highway","type":"residential","importance":0.2},{"place_id":"117916371","licence":"Data © OpenStreetMap contributors, ODbL 1.0. http:\/\/www.openstreetmap.org\/copyright","osm_type":"way","osm_id":"275700680","boundingbox":["49.6784915","49.6791811","10.5250519","10.5258521"],"lat":"49.678698","lon":"10.5255736","display_name":"Frankfurt, Markt Taschendorf, Scheinfeld (VGem), Neustadt an der Aisch-Bad Windsheim, Middle Franconia, Free State of Bavaria, 91480, Germany","class":"highway","type":"residential","importance":0.2}],
  typeaheadTitle = 'display_name',
  url = {
    type : 'GET',
    base: 'http://nominatim.openstreetmap.org/search.php',
    query: '?q=',
    fragment: '&format=json&limit='+maxNoOfResults
  },
  types = ['GET', 'POST'];

describe('directive: auto-suggest-component', function() {
  var element,
    controller,
    scope,
    $scope,
    q,
    deferred,
    httpBackend,
    welldooSearchComponentService;

  beforeEach(module('autoSuggestComponent'));

  beforeEach(module("searchComponentTemplate")); // created in karma.conf.js with ngHtml2JsPreprocessor

  beforeEach(inject(function($rootScope, $compile, _$q_, _$httpBackend_) {

    q = _$q_;
    deferred = q.defer();
    httpBackend = _$httpBackend_;

    //welldooSearchComponentService = jasmine.createSpyObj('welldooSearchComponentService', ['retrieveResults']);

    scope = $rootScope.$new();

    element = '<auto-suggest-component data-url="searchParameters.url" data-typeahead-title="searchParameters.typeaheadTitle" data-result="searchParameters.searchResult" data-no-of-results-shown="searchParameters.noOfResultsShown" data-no-of-characters-typed="searchParameters.noOfCharactersTyped"></auto-suggest-component>';

    scope.searchParameters = {
      typeaheadTitle : typeaheadTitle,
      noOfResultsShown : maxNoOfResults,
      noOfCharactersTyped : noOfCharactersTyped,
      url: url,
      searchResult: searchResult
    };

    element = $compile(element)(scope);

    scope.$digest();

  }));

  describe('testing controller', function() {

    beforeEach(function(){
        $scope = element.isolateScope();
    });

    it("should create a ctrl object", function() {
      expect($scope.ctrl).toBeDefined();
    });

    it("typeaheadTitle to be 'display_name'", function() {
      expect($scope.ctrl.typeaheadTitle).toBe(typeaheadTitle);
    });

    it("noOfResultsShown to be 10", function() {
      expect($scope.ctrl.noOfResultsShown).toBe(maxNoOfResults);
    });

    it("noOfCharactersTyped to be 3", function() {
      expect($scope.ctrl.noOfCharactersTyped).toBe(noOfCharactersTyped);
    });

    it("url to be defined", function() {
      expect($scope.ctrl.url).toBeDefined();
    });

    it("url.type to be GET or POST", function() {
      expect(types.indexOf($scope.ctrl.url.type)).not.toBe(-1);
    });

    it("url.base to have a length > 0", function() {
      expect($scope.ctrl.url.base.length).toBeGreaterThan(0);
    });

    it("url.query to have a length > 0", function() {
      expect($scope.ctrl.url.query.length).toBeGreaterThan(0);
    });

    it("url.fragment to have a length > 0", function() {
      expect($scope.ctrl.url.fragment.length).toBeGreaterThan(0);
    });

    it("searchResult to be {}", function() {
      expect($scope.ctrl.result).toBe(searchResult);
    });

    it("active to be -1", function() {
      expect($scope.active).toBe(-1);
    });

    it("hideResultList to be true", function() {
      expect($scope.hideResultList).toBe(true);
    });

    it("error to be false", function() {
      expect($scope.error).toBe(false);
    });

    it("search to be a function", function() {
      expect(typeof $scope.search).toBe('function');
    });

    it("selectActive to be a function", function() {
      expect(typeof $scope.selectActive).toBe('function');
    });

    it("resetResults to be a function", function() {
      expect(typeof $scope.resetResults).toBe('function');
    });

    it("searchTerm to be empty", function() {
      expect($scope.searchTerm).toBe('');
    });

    it("search to have been called", function() {
      spyOn($scope, 'search');
      $scope.searchTerm = 'Deu';
      $scope.search();
      //console.log('welldooSearchComponentService : ',welldooSearchComponentService);
      //console.log('$scope.searchResults : ',$scope.searchResults);
      expect($scope.search).toHaveBeenCalled();
    });

    it("service to have been called with q='Fr' not to make a call", function() {
      $scope.searchTerm = 'Fr';
      $scope.search();
      expect($scope.searchResults).not.toBeDefined();
    });

    it("service to have been called with q='Frankfurt' and return with 5 results", function() {
      $scope.searchTerm = 'Frankfurt';
      $scope.search();
      httpBackend.expectGET('http://nominatim.openstreetmap.org/search.php?q=Frankfurt&format=json&limit='+maxNoOfResults).respond(searchResult);
      httpBackend.flush();
      expect($scope.searchResults.length).toBe(searchResult.length);
    });

  });
});