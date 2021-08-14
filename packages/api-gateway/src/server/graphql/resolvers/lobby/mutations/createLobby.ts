import { Arg, Field, InputType, Mutation, Resolver } from 'type-graphql';

import { LobbyType } from '../../../types/LobbyType';

@InputType()
class CreateLobbyInput {
  @Field()
  title!: string;
}

@Resolver()
export class Lobby_mutation_createLobby_Resolver {
  @Mutation(() => LobbyType)
  async createLobby(@Arg('input') input: CreateLobbyInput): Promise<LobbyType> {
    const { title } = input;

    return {
      id: 'some-new-lobby-id',
      title: title,
    };
  }
}
