function FlightSearchController($scope, $http, $state, AirportsService, CheapFlightService) {
  'ngInject';

  const vm = this;

  vm.$onInit = function() {
    ////////////////////////////
  // Service
  ////////////////////////////
    AirportsService.getAirports().then(function (response) {
      if (response.data && response.data.airports && response.data.routes) {
        $scope.citiesToSearch = response.data;
      }
    });
  };

  ////////////////////////////
  // Init variables
  ////////////////////////////
  $scope.originCity = '';
  $scope.destinyCity = '';
  $scope.startDate = '';
  $scope.endDate = '';
  $scope.citiesToSearch = [];
  $scope.routes = [];

  $scope.airport = {
    originCity: {
      airport: null,
      filter: ({ cityToSearch, city }) => !!city &&
            (cityToSearch.iataCode.toLowerCase().indexOf(city.toLowerCase()) >= 0
            || cityToSearch.name.toLowerCase().indexOf(city.toLowerCase()) >= 0)
    },
    destinyCity: {
      airport: null,
      filter: ({ cityToSearch, city }) => {
        const routes = $scope.citiesToSearch.routes[$scope.airport.originCity.airport.iataCode];
        const isAllowedRoute = !!routes.find(route =>
          cityToSearch.iataCode.toLowerCase().indexOf(route.toLowerCase()) >= 0);
        return isAllowedRoute && (cityToSearch.iataCode.toLowerCase().indexOf(city.toLowerCase()) >= 0
        || cityToSearch.name.toLowerCase().indexOf(city.toLowerCase()) >= 0);
      }
    }
  };


  ////////////////////////////
  // Filter Airport
  ////////////////////////////
  const filterAirport = ({ key, city, cityToSearch }) => $scope.airport[key].filter({ cityToSearch, city, key });

  ////////////////////////////
  // Get A list of Airports
  ////////////////////////////
  const getAirports = ({ key, city }) => $scope.citiesToSearch.airports
  .filter(cityToSearch => filterAirport({ key, city, cityToSearch }));

  ////////////////////////////
  // Get an Airport
  ////////////////////////////
  const getAirport = ({ key, city }) => $scope.citiesToSearch.airports
  .find(cityToSearch => filterAirport({ key, city, cityToSearch }));


  ////////////////////////////
  // Funtion to autocomplete
  ////////////////////////////
  $scope.complete = ({ city, key }) => {
    $scope.hidethisOrigin = key !== 'originCity';
    $scope.hidethisDestiny = key === 'originCity';
    const output = getAirports({ key, city }).map(cityToSearch => `${cityToSearch.name}`);
    $scope[`${key}Filter`] = output;
  };

  ////////////////////////////
  // Select Airport
  ////////////////////////////
  $scope.fillTextbox = ({ city, key }) => {
    $scope[key] = city;
    if (key === 'originCity') {
      $scope.destinyCity = '';
    }
    $scope.airport[key].airport = getAirport({ key, city });
    $scope.hidethisOrigin = true;
    $scope.hidethisDestiny = true;
  };

  ////////////////////////////
  // Find flights
  ////////////////////////////
  $scope.findFlights = () => {
    const start = CheapFlightService.getStartDate();
    const end = CheapFlightService.getEndDate();
    if ($scope.airport.originCity && $scope.airport.destinyCity.airport && !!start && !!end) {
      const params = {
        origin: $scope.airport.originCity.airport.iataCode,
        destiny: $scope.airport.destinyCity.airport.iataCode,
        start,
        end
      };
      $state.go('flights', params);
    }
  };
}

export default FlightSearchController;
