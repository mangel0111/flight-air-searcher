import { inject, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, BaseRequestOptions, ResponseOptions, Response } from '@angular/http';
import { AirportsService } from './airports.service';

const url = '';
describe('Airport service', () => {
  const mockedResponse = {
    closures: {},
    routes: {},
    airports: [
      {
        iataCode: 'AAR',
        name: 'Aarhus',
        base: false,
        latitude: 56.3,
        longitude: 10.619,
        country: {
          code: 'dk', name: 'Denmark', seoName: 'denmark', englishSeoName: 'denmark', currency: 'DKK', url: 'denmark'
        }
      },
      {
        iataCode: 'AGA',
        name: 'Agadir',
        base: false,
        latitude: 30.325,
        longitude: -9.41307,
        country: {
          code: 'ma', name: 'Morocco', seoName: 'morocco', englishSeoName: 'morocco', currency: 'MAD', url: 'morocco'
        }
      }],
    discounts: {},
    countries: [],
    messages: {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [{ useValue: { apiUrls: { airports: url } } },
        AirportsService,
        { provide: Http,
          useFactory: (mockBackend, options) => new Http(mockBackend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions
      ] });
  });

  it('should fetch correctly', () => {
    inject([AirportsService, MockBackend], (airportsService, mockBackend) => {
      expect(airportsService).toBeDefined();

      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.url).toBe(url);
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockedResponse)
        })));
      });

      airportsService.getAirports().subscribe((response) => {
        expect(response).toEqual(mockedResponse);
      });
    });
  });
});
