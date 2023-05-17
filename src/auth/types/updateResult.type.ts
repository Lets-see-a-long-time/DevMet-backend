import { Auth } from '../entity/user.entity';

export interface UpdateResult {
  affectsRow: number;
  updatedAuth: Auth;
}
