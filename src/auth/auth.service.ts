import { Injectable } from '@nestjs/common';
import { Auth } from './entity/auth.entity';
import { AuthRepository } from './repository/auth.repository';
import { CreateAuthDTO } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { Token } from './security/token.interface';
import { IAuthFields } from './dto/auth.fields';
import { UpdateAuthDTO } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async createToken(id: string): Promise<string> {
    const payload = { id };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async refreshToken(id: string): Promise<string> {
    const payload = { id };
    const token = this.jwtService.sign(payload, { expiresIn: '30d' });
    return token;
  }

  async saveUser(authDTO: CreateAuthDTO): Promise<Token> {
    const user = await this.authRepository.findOneBy({
      userId: authDTO.id,
    });

    //Promise.all 은 배열로 리턴하기 때문에 굳이 비동기적인 동작이 필요하지 않다면 안써도 될듯

    if (user) {
      const accessToken = await this.createToken(user.id);

      const userId = user.userId;

      return { accessToken, userId: userId };
    }

    const newUser = await this.authRepository.createUser(authDTO);
    const accessToken = await this.createToken(newUser.id);
    const userId = newUser.userId;
    return { accessToken, userId };
  }

  async updateUser(authDTO: UpdateAuthDTO) {
    //다양한 값을 업데이트 하기위해서 filter를 사용해보자
    //일단은 userId 만을 기준으로 update하기 위함.
    //const filter = { id: authDTO.userId };

    const fields: IAuthFields = {
      role: authDTO?.role,
      email: authDTO?.nickname,
      nickname: authDTO?.nickname,
      image: authDTO?.image,
      stack: authDTO?.stack,
    };
    //user => 해당되는 column만 수정해줘야 하는 부분이 헷갈리넹.
    //column을 전부 다 넣으면 .... 좀 비효율적이려나?
    //바꿀거만 넣으면됨.

    return await this.authRepository.updateUser(authDTO.userId, fields);
  }
}
