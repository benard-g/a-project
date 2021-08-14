import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType('Lobby')
export class LobbyType {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;
}
