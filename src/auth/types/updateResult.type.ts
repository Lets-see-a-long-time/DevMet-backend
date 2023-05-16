import { Auth } from '../entity/auth.entity';

export interface UpdateResult {
  affectsRow: number;
  updatedAuth: Auth;
}
