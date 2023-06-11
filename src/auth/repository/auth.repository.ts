import { CreateAuthDTO } from '../dto/request/user/create-request';
import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { IAuthFields } from '../dto/auth.fields';

@CustomRepository(User)
export class AuthRepository extends Repository<User> {
  async createUser(authDTO: CreateAuthDTO): Promise<User> {
    const { name, image, email, id, provider } = authDTO;
    const user = await this.create({
      userId: id,
      name,
      email,
      image,
      provider,
    });

    await this.save(user);

    return user;
  }

  async updateUser(userId: string, fields: IAuthFields): Promise<boolean> {
    const updateResult = await this.update({ userId: userId }, fields);
    //affect : 쿼리 결과로 업데이트된 행의 수를 리턴한다.
    // 1 : 성공 0 : 실패
    return updateResult.affected == 1;
  }
}
