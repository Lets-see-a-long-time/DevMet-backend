import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { Auth } from './entity/auth.entity';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport/dist';
import { GetUser } from 'src/common/decorator/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  updateUser(
    @Body() authDTO: AuthDTO,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    //TODO : accessTOken type설정
    return this.authService.saveUser(authDTO);
  }
  // Todo: 처음에 유저정보만 가지고 create -> register채워서 update
  @Post()
  async createUser(@Body() authDTO: AuthDTO): Promise<void> {
    // console.log('hihi', authDTO);
    await this.authService.saveUser(authDTO);
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  onTest(@GetUser() user: Auth) {
    return console.log(user, test);
  }
}
