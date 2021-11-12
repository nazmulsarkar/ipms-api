import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Ipaddress {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
