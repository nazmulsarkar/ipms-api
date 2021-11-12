import { CreateIpaddressInput } from './create-ipaddress.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateIpaddressInput extends PartialType(CreateIpaddressInput) {
  @Field(() => Int)
  id: number;
}
