import { UUID_PATTERN } from '../../__utils__/constants';

import { createUser } from './createUser';

describe('core/users/createUser', () => {
  it('should create a valid user', () => {
    const user = createUser();

    expect(user).toEqual({
      id: expect.stringMatching(UUID_PATTERN),
    });
  });
});
