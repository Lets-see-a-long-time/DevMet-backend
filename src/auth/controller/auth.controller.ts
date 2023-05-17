import { Body, Controller, Post, Get, UseGuards, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { AuthService } from '../service/auth.service';
import { UpdateAuthDTO } from '../dto/update-auth.dto';
import { CreateAuthDTO } from '../dto/create-auth.dto';
import { Token } from '../security/token.interface';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { Auth } from '../entity/auth.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Patch('/register')
  @ApiOperation({ summary: '유저 정보 수정', description: '유저 정보 수정' })
  updateUser(@Body() authDTO: UpdateAuthDTO): Promise<boolean> {
    //TODO : accessTOken type설정
    return this.authService.updateUser(authDTO);
  }
  // Todo: 처음에 유저정보만 가지고 create -> register채워서 update
  @Post()
  @ApiOperation({ summary: '유저 생성', description: '유저 생성' })
  @ApiCreatedResponse({ description: '유저를 생성한다.', type: CreateAuthDTO })
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
