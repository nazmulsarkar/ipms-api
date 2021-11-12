import { Test, TestingModule } from '@nestjs/testing';
import { IpaddressResolver } from './ipaddress.resolver';
import { IpaddressService } from './ipaddress.service';

describe('IpaddressResolver', () => {
  let resolver: IpaddressResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IpaddressResolver, IpaddressService],
    }).compile();

    resolver = module.get<IpaddressResolver>(IpaddressResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
