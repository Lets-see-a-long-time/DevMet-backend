import { AuthDTO } from '../dto/auth.dto';
import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { Auth } from '../entity/auth.entity';

@CustomRepository(Auth)
export class AuthRepository extends Repository<Auth> {
  async saveUser(
    authDTO: AuthDTO,
    // user: User,
  ): Promise<Auth> {
    const { name, image, expires, role, email, stack, nickname } = authDTO;
    const user = await this.create({
      name,
      email,
      image,
      role,
      nickname,
      stack,
      expires,
    });

    await this.save(user);

    return user;
  }
}
