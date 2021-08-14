import { Query, Resolver } from 'type-graphql';

import { ViewerType } from '../../../types/ViewerType';

@Resolver()
export class Query_viewer_Resolver {
  @Query()
  viewer(): ViewerType {
    return {
      id: 'some-user-id',
      name: 'Adam',
    };
  }
}
