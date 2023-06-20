import { UpdateUserRequest } from './../dto/request/user/update-request';
import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';

import { CreateUserRequest } from '../dto/request/user/create-request';
import { Token } from '../security/token.interface';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import SuccessResponse from 'src/common/utils/success.response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Patch('/register')
  @ApiOperation({ summary: '유저 정보 수정', description: '유저 정보 수정' })
  updateUser(
    @Param() id: number,
    @Body() request: UpdateUserRequest,
  ): Promise<SuccessResponse> {
    //TODO : accessTOken type설정
    return this.userService.updateUser(id, request);
  }
  // Todo: 처음에 유저정보만 가지고 create -> register채워서 update
  @Post()
  @ApiOperation({ summary: '유저 생성', description: '유저 생성' })
  @ApiCreatedResponse({
    description: '유저를 생성한다.',
    type: CreateUserRequest,
  })
  async createUser(@Body() authDTO: CreateUserRequest): Promise<Token> {
    // console.log('hihi', authDTO);
    return this.authService.saveUser(authDTO);
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  onTest(@GetUser() user: any) {
    return console.log('user', user);
  }
}
