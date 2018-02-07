import { FlightsComponent } from './flights.component';

// This tests isn't done
xdescribe('Flights Component List', () => {
  let $compile;
  let scope;
  let flightList;

  beforeEach(angular.mock.module());

  describe('Render', () => {
    it('should list all flights', inject(($rootScope, _$compile_) => {
      scope = $rootScope.$new();
      $compile = _$compile_;
      flightList = new FlightsComponent($compile, scope);
      flightList.render();
    }));
  });
})
;
