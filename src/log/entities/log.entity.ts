import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Log {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
