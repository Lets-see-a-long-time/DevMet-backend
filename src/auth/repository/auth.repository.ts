import { CreateAuthDTO } from '../dto/create-auth.dto';
import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { Auth } from '../entity/auth.entity';
import { IAuthFields } from '../dto/auth.fields';

@CustomRepository(Auth)
export class AuthRepository extends Repository<Auth> {
  async createUser(authDTO: CreateAuthDTO): Promise<Auth> {
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
