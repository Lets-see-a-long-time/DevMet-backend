import { Injectable } from '@nestjs/common';
import { Auth } from './entity/auth.entity';
import { AuthRepository } from './repositories/auth.repository';
import { AuthDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { Payload } from './security/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async createToken(user: any) {
    const payload: Payload = { username: user.id, id: user.id };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async refreshToken(user: any): Promise<string> {
    const payload: Payload = { username: user.id, id: user.id };
    const token = this.jwtService.sign(payload, { expiresIn: '30d' });
    return token;
  }

  async saveUser(
    authDTO: AuthDTO,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.authRepository.findOneBy({
      userId: authDTO.userId,
    });
    console.log('user', user);

    const accessToken = await this.createToken(user);
    const refreshToken = await this.refreshToken(user);
    if (user) {
      console.log('이미있어');
      return { accessToken, refreshToken };
    }
    // return token;
    await this.authRepository.saveUser(authDTO);

    return { accessToken, refreshToken };
  }
}
