import { Injectable } from '@nestjs/common';
import { Auth } from './entity/auth.entity';
import { AuthRepository } from './repositories/auth.repository';
import { AuthDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async createToken() {
    const payload = { username: 'user' };
    const token = this.jwtService.sign(payload, { expiresIn: '30m' });
    return token;
  }

  async refreshToken(token: string): Promise<string> {
    const decoded = this.jwtService.decode(token);
    //const user = await this.authRepository.findOne(decoded.sub)
  }

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
