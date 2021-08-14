import {
  Args,
  ArgsType,
  Field,
  FieldResolver,
  ID,
  Resolver,
} from 'type-graphql';

import { LobbyType } from '../../../types/LobbyType';
import { ViewerType } from '../../../types/ViewerType';

@ArgsType()
class LobbyArgs {
  @Field(() => ID)
  id!: string;
}

@Resolver(() => ViewerType)
export class Viewer_lobby_Resolver {
  @FieldResolver(() => LobbyType, { nullable: true })
  lobby(@Args() args: LobbyArgs): LobbyType | undefined {
    const { id } = args;

    return {
      id,
      title: 'Some lobby',
    };
  }
}
