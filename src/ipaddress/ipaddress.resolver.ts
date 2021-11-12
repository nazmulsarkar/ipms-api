import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IpaddressService } from './ipaddress.service';
import { Ipaddress } from './entities/ipaddress.entity';
import { CreateIpaddressInput } from './dto/create-ipaddress.input';
import { UpdateIpaddressInput } from './dto/update-ipaddress.input';

@Resolver(() => Ipaddress)
export class IpaddressResolver {
  constructor(private readonly ipaddressService: IpaddressService) {}

  @Mutation(() => Ipaddress)
  createIpaddress(@Args('createIpaddressInput') createIpaddressInput: CreateIpaddressInput) {
    return this.ipaddressService.create(createIpaddressInput);
  }

  @Query(() => [Ipaddress], { name: 'ipaddress' })
  findAll() {
    return this.ipaddressService.findAll();
  }

  @Query(() => Ipaddress, { name: 'ipaddress' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ipaddressService.findOne(id);
  }

  @Mutation(() => Ipaddress)
  updateIpaddress(@Args('updateIpaddressInput') updateIpaddressInput: UpdateIpaddressInput) {
    return this.ipaddressService.update(updateIpaddressInput.id, updateIpaddressInput);
  }

  @Mutation(() => Ipaddress)
  removeIpaddress(@Args('id', { type: () => Int }) id: number) {
    return this.ipaddressService.remove(id);
  }
}
