export const CheapFlightService = function($http) {
  'ngInject';

  const url = 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/flights/';
  this.startDate = '';
  this.endDate = '';

  this.getFlights = function ({ origin, destiny, start, end }) {
    return $http.get(`${url}from/${origin}/to/${destiny}/${start}/${end}/250/unique/?limit=15&offset-0`);
  };

  this.setStartDate = (startDate) => { this.startDate = startDate; };
  this.getStartDate = () => this.startDate;

  this.setEndDate = (endDate) => { this.endDate = endDate; };
  this.getEndDate = () => this.endDate;
};
