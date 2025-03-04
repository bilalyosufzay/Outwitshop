import { Test, TestingModule } from '@nestjs/testing';
import { ExternalProductsController } from './external-products.controller';

describe('ExternalProductsController', () => {
  let controller: ExternalProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalProductsController],
    }).compile();

    controller = module.get<ExternalProductsController>(ExternalProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
