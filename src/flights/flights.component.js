import template from './flights.component.html';
import controller from './flights.controller';
import './flights.component.scss';

export const FlightsComponent = {
  bindings: {
    origin: '<',
    destiny: '<',
    results: '<'
  },
  template,
  controller
};
