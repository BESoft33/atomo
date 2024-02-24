import { Test, TestingModule } from '@nestjs/testing';
import { VechileController } from './vechile.controller';

describe('VechileController', () => {
  let controller: VechileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VechileController],
    }).compile();

    controller = module.get<VechileController>(VechileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
