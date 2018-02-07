import { inject, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, BaseRequestOptions, ResponseOptions, Response } from '@angular/http';
import { CheapFlightService } from './cheapflights.service';

const url = '';
describe('Cheap Flight Service', () => {
  const mockedResponse = {
    flights: [
      {
        dateFrom: '2018-02-15T01:58:27.911Z',
        dateTo: '2018-02-15T18:32:35.798Z',
        currency: '€',
        price: 84.22296815458685
      },
      {
        dateFrom: '2018-02-15T00:00:22.771Z',
        dateTo: '2018-02-17T23:52:15.968Z',
        currency: '€',
        price: 35.6072826650925
      },
      {
        dateFrom: '2018-02-17T19:19:37.040Z',
        dateTo: '2018-02-18T00:16:08.003Z',
        currency: '€',
        price: 236.90907047037035
      },
      {
        dateFrom: '2018-02-13T21:43:09.494Z',
        dateTo: '2018-02-14T09:33:04.651Z',
        currency: '€',
        price: 190.9229065165855
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [{ useValue: { apiUrls: { airports: url } } },
        CheapFlightService,
        { provide: Http,
          useFactory: (mockBackend, options) => new Http(mockBackend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions
      ] });
  });

  it('should fetch correctly', () => {
    inject([CheapFlightService, MockBackend], (cheapFlightService, mockBackend) => {
      expect(cheapFlightService).toBeDefined();

      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.url).toBe(url);
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockedResponse)
        })));
      });

      cheapFlightService.getFlights().subscribe((response) => {
        expect(response).toEqual(mockedResponse);
      });
    });
  });
});
