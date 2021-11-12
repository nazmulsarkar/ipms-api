import { Test, TestingModule } from '@nestjs/testing';
import { IpaddressService } from './ipaddress.service';

describe('IpaddressService', () => {
  let service: IpaddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IpaddressService],
    }).compile();

    service = module.get<IpaddressService>(IpaddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
