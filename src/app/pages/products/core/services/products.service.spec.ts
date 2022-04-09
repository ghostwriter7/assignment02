import { ProductsService } from './ProductsService';
import { TestBed } from '@angular/core/testing';
import { EventsService, NotificationService } from '../../../../core/services';

describe('ProductsService', () => {

  let productsService: ProductsService;
  let notificationService: NotificationService;
  let eventsService: EventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService, NotificationService, EventsService]
    });

    TestBed.overrideProvider(EventsService,
      {useValue: jasmine.createSpyObj('EventsService', ['startLoading', 'stopLoading']) });
    TestBed.overrideProvider(NotificationService,
      { useValue: jasmine.createSpyObj('NotificationService', ['onSuccess', 'onError']) });
    productsService = TestBed.get(ProductsService);
    eventsService = TestBed.get(EventsService);
    notificationService = TestBed.get(NotificationService);
  });

  it('should trigger a loading spinner', () => {
    productsService.fetchProducts();

    expect(eventsService.startLoading).toHaveBeenCalledTimes(1);
  });
});
