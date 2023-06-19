import { User } from '../entity/user.entity';

export interface UpdateResult {
  affectsRow: number;
  updatedAuth: User;
}
