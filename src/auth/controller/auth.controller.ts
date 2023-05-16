import { Body, Controller, Post, Get, UseGuards, Patch } from '@nestjs/common';
import { CreateAuthDTO } from './dto/create-auth.dto';
import { Auth } from './entity/auth.entity';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport/dist';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { UpdateAuthDTO } from './dto/update-auth.dto';
import { Token } from './security/token.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Patch('/register')
  updateUser(@Body() authDTO: UpdateAuthDTO): Promise<boolean> {
    //TODO : accessTOken type설정
    return this.authService.updateUser(authDTO);
  }
  // Todo: 처음에 유저정보만 가지고 create -> register채워서 update
  @Post()
  async createUser(@Body() authDTO: CreateAuthDTO): Promise<Token> {
    // console.log('hihi', authDTO);
    return this.authService.saveUser(authDTO);
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  onTest(@GetUser() user: any) {
    return console.log('user', user);
  }
}
