import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { UpdateUserRequest } from '../dto/request/user/update-request';
import { AuthRepository } from '../repository/auth.repository';
import { CreateUserRequest } from '../dto/request/user/create-request';
import { Token } from '../security/token.interface';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async createToken(id: number): Promise<string> {
    const payload = { id };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async refreshToken(id: number): Promise<string> {
    const payload = { id };
    const token = this.jwtService.sign(payload, { expiresIn: '30d' });
    return token;
  }

  async saveUser(authDTO: CreateUserRequest): Promise<Token> {
    const user = await this.authRepository.findOneBy({
      userId: authDTO.id,
    });
    console.log('authDto', authDTO);
    //Promise.all 은 배열로 리턴하기 때문에 굳이 비동기적인 동작이 필요하지 않다면 안써도 될듯

    if (user) {
      const accessToken = await this.createToken(user.id);

      const userId = user.id;

      return { accessToken, userId };
    }

    const newUser = await this.authRepository.createUser(authDTO);
    const accessToken = await this.createToken(newUser.id);
    const userId = newUser.id;
    return { accessToken, userId };
  }

  async updateUser(request: UpdateUserRequest) {
    return await this.authRepository.updateUser(
      request.userId,
      request.getAuthFields(),
    );
  }

  // 유저 확인. 다른곳들에도 쓰임 에러처리도 여기서하면 다른곳에서 사용할때 일일이 에러처리 안해도됨
  // Todo: checktExistingUser 문제 있음 수정 필요.

  async checkExistingUser(user: User): Promise<void> {
    const auth = await this.authRepository.findOneBy({ userId: user.userId });

    if (!auth) {
      throw new UnauthorizedException();
    }
  }
}
