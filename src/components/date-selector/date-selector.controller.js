import moment from 'moment';

export default function DateSelectorController($scope, $attrs) {
  'ngInject';

  $scope.$watch('$ctrl.date', () => {
    if ($scope.$ctrl.date && $attrs.datetype) {
      $scope.$parent.$ctrl[$attrs.datetype] = $scope.$ctrl.date;
    }
  });
}
