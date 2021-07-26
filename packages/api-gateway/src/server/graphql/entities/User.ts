import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType('User')
export class UserEntity {
  @Field(() => ID)
  id!: string;
}
