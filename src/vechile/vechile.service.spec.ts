import { Test, TestingModule } from '@nestjs/testing';
import { VechileService } from './vechile.service';

describe('VechileService', () => {
  let service: VechileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VechileService],
    }).compile();

    service = module.get<VechileService>(VechileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
