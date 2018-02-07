export const AirportsService = function($http) {
  'ngInject';

  this.getAirports = function () {
    return $http.get('https://murmuring-ocean-10826.herokuapp.com/en/api/2/forms/flight-booking-selector/');
  };
};

