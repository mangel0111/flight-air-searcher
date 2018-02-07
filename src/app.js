import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Components from './components/components';
import { HomeComponent } from './home/home.component';
import { FlightsComponent } from './flights/flights.component';
import {
  CheapFlightService,
  AirportsService
} from './services';

angular.module('myApp', [
  uiRouter,
  Components
])
.component('homePage', HomeComponent)
.component('flightsPage', FlightsComponent)
.service('AirportsService', AirportsService)
.service('CheapFlightService', CheapFlightService)
.config(($stateProvider, $urlRouterProvider) => {
  'ngInject';

  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
      url: '',
      template: '<home-page></home-page>'
    }).state('flights', {
      url: '/flights?origin&destiny&start&end?',
      template: '<flights-page></flights-page>'
    });
});
