import { AuthDTO } from '../dto/auth.dto';
import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { Auth } from '../entity/auth.entity';
import { UpdateResult } from '../types/updateResult.type';

@CustomRepository(Auth)
export class AuthRepository extends Repository<Auth> {
  async createUser(
    authDTO: AuthDTO,
    // user: User,
    //entity 전체를 옵셔널로 만들어야할까?
  ): Promise<Auth> {
    const { name, image, email, userId, provider } = authDTO;
    const user = await this.create({
      userId,
      name,
      email,
      image,
      provider,
    });
    console.log('여기서 문제가 생긴다.');
    await this.save(user);

    return user;
  }
  async updateUser(userId: string, user: Auth): Promise<UpdateResult> {
    const updateResult = await this.update(userId, user);
    const updatedAuth = await this.findOneBy({ userId: userId });

    //affect : 쿼리 결과로 업데이트된 행의 수를 리턴한다.
    // 1 : 성공 0 : 실패
    return { affectsRow: updateResult.affected, updatedAuth };
  }
}
