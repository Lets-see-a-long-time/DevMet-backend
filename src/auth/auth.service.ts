import { Injectable } from '@nestjs/common';
import { Auth } from './entity/auth.entity';
import { AuthRepository } from './repositories/auth.repository';
import { AuthDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { Token } from './security/token.interface';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async createToken(userId: string): Promise<string> {
    const payload = { id: userId };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async refreshToken(userId: string): Promise<string> {
    const payload = { id: userId };
    const token = this.jwtService.sign(payload, { expiresIn: '30d' });
    return token;
  }

  async saveUser(authDTO: AuthDTO): Promise<Token> {
    const user = await this.authRepository.findOneBy({
      userId: authDTO.userId,
    });
    console.log('user', user);

    //Promise.all 은 배열로 리턴하기 때문에 굳이 비동기적인 동작이 필요하지 않다면 안써도 될듯

    if (user) {
      const accessToken = await this.createToken(user.id);
      const refreshToken = await this.refreshToken(user.id);
      console.log('이미있어');
      return { accessToken, refreshToken };
    }

    const newUser = await this.authRepository.saveUser(authDTO);
    const accessToken = await this.createToken(newUser.id);
    const refreshToken = await this.refreshToken(newUser.id);

    return { accessToken, refreshToken };
  }

  async updateUser(authDTO: AuthDTO) {
    const filter = { id: authDTO.userId };
    const fields = { role: authDTO.role };

    await this.authRepository.updateUser(filter, fields);
  }
}
