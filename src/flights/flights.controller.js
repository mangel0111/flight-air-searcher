import moment from 'moment';

function FlightsController($scope, $http, $state, CheapFlightService, $stateParams, AirportsService) {
  'ngInject';

  const vm = this;

  $scope.airports = [];
  $scope.hideResults = true;
  $scope.flights = [];
  $scope.origin = '';
  $scope.destiny = '';
  $scope.results = 0;

  const getHeader = () => {
    const originAirport = $scope.airports.find(airport => airport.iataCode === $stateParams.origin);
    const destinyAirport = $scope.airports.find(airport => airport.iataCode === $stateParams.destiny) || '';
    $scope.origin = (originAirport && originAirport.name) || '';
    $scope.destiny = (destinyAirport && destinyAirport.name) || '';
  };

  vm.$onInit = function() {
    AirportsService.getAirports().then(function (response) {
      if (response.data && response.data.airports && response.data.routes) {
        $scope.airports = response.data.airports;
        getHeader();
      }
    });
    CheapFlightService.getFlights($stateParams).then((response) => {
      $scope.flights = response.data.flights.map((flight) => {
        const time = moment.duration(moment(flight.dateTo).diff(flight.dateFrom));
        const duration = `${time.hours()} hours ${time.minutes()} minuts`;
        return Object.assign({ duration }, flight, {
          dateFrom: moment(flight.dateFrom).format('HH:mm'),
          dateTo: moment(flight.dateTo).format('HH:mm'),
          price: Math.round(flight.price * 100) / 100
        });
      });
      $scope.results = $scope.flights.length;
      $scope.hideResult = $scope.results === 0;
    });
  };
}

export default FlightsController;
