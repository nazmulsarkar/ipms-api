import { Test, TestingModule } from '@nestjs/testing';
import { IpaddressController } from './ipaddress.controller';
import { IpaddressService } from './ipaddress.service';

describe('IpaddressController', () => {
  let controller: IpaddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IpaddressController],
      providers: [IpaddressService],
    }).compile();

    controller = module.get<IpaddressController>(IpaddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
