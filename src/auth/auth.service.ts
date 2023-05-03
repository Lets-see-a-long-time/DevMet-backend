import { Injectable } from '@nestjs/common';
import { Auth } from './entity/auth.entity';
import { AuthRepository } from './repositories/auth.repository';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async saveUser(authDTO: AuthDTO) {
    console.log(authDTO, 'service');
    return this.authRepository.saveUser(authDTO);
  }
}
