import { Injectable } from '@nestjs/common';
import { Auth } from './entity/auth.entity';
import { AuthRepository } from './repositories/auth.repository';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async saveUser(authDTO: AuthDTO): Promise<Auth> {
    const user = await this.authRepository.findOneBy({
      userId: authDTO.userId,
    });
    console.log('user', user);

    if (user) {
      console.log('이미있어');
      return;
    }

    return this.authRepository.saveUser(authDTO);
  }
}
