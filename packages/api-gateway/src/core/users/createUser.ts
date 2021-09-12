import { v4 as uuid } from 'uuid';

import { User } from './types';

export function createUser(): User {
  return {
    id: uuid(),
  };
}
