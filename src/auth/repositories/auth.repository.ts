import { AuthDTO } from '../dto/auth.dto';
import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { Auth } from '../entity/auth.entity';

@CustomRepository(Auth)
export class AuthRepository extends Repository<Auth> {
  async createUser(
    authDTO: AuthDTO,
    // user: User,
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
  async updateUser(
    authDTO: AuthDTO,
    // user: User,
  ): Promise<Auth> {
    const { name, image, expires, role, email, stack, nickname, userId } =
      authDTO;
    const user = await this.create({
      userId,
      name,
      email,
      image,
      expires,
      role,
    });

    await this.update({ id: user.id }, { role: user.role, email: user.email });

    return user;
  }
}
