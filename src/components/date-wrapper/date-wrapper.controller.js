import moment from 'moment';

export default function DateWrapperController($scope, CheapFlightService) {
  'ngInject';

  $scope.startDate = '';
  $scope.endDate = '';

  const saveDates = () => {
    if (this.startDate && this.endDate) {
      CheapFlightService.setStartDate(moment(this.startDate).format('YYYY-MM-DD'));
      CheapFlightService.setEndDate(moment(this.endDate).format('YYYY-MM-DD'));
    }
  };

  $scope.$watch('$ctrl.startDate', () => {
    if (moment(this.startDate) > moment(this.endDate)) {
      this.endDate = moment(this.startDate).add(2, 'd').toDate();
    }
    saveDates();
  });

  $scope.$watch('$ctrl.endDate', () => {
    if (moment(this.endDate) < moment(this.startDate)) {
      this.startDate = moment(this.endDate).subtract(2, 'd').toDate();
    }
    saveDates();
  });
}
