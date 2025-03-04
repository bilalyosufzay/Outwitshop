import { Test, TestingModule } from '@nestjs/testing';
import { ExternalProductsService } from './external-products.service';

describe('ExternalProductsService', () => {
  let service: ExternalProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalProductsService],
    }).compile();

    service = module.get<ExternalProductsService>(ExternalProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
