import { Query, Resolver } from 'type-graphql';

import { UserEntity } from '../../entities/User';

@Resolver()
export class Query_viewer_Resolver {
  @Query()
  viewer(): UserEntity {
    return { id: 'some-viewer-id' };
  }
}
