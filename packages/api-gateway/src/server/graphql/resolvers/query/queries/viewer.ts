import { Ctx, Query, Resolver } from 'type-graphql';

import { Context } from '../../../Context';
import { ViewerType } from '../../../types/ViewerType';

@Resolver()
export class Query_viewer_Resolver {
  @Query()
  viewer(@Ctx() context: Context): ViewerType {
    const { userId } = context;
    return {
      id: userId,
    };
  }
}
