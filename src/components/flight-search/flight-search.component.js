import template from './flight-search.component.html';
import controller from './flight-search.controller';
import './flight-search.scss';

export const FlightSearchComponent = {
  bindings: {
    originCity: '<',
    destinyCity: '<'
  },
  template,
  controller
};
