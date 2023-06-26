import {
  Controller,
  ParseIntPipe,
  Param,
  Query,
  Body,
  Get,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UsersResponse } from '../dto/response/user/users.response';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteApi,
  GetApi,
  PatchApi,
} from 'src/common/decorator/api.decorator';
import { User } from './../entity/user.entity';
import SuccessResponse from 'src/common/utils/success.response';
import { UserListRequest } from '../dto/request/user/users.request';
import { UpdateUserRequest } from '../dto/request/user/update-request';
import UserResponse from '../dto/response/user/user.reponse';

@ApiTags('User Management')
@Controller('auth/user')
export class UserController {
  constructor(private userService: UserService) {}

  @GetApi(() => UsersResponse, {
    path: '/',
    description: '유저 목록 조회',
    auth: false,
  })
  getAllUser(@Query('') userRequest: UserListRequest): Promise<UsersResponse> {
    return this.userService.getAllUser(userRequest);
  }

  @GetApi(() => UserResponse, {
    path: '/:id',
    description: '유저 한 명 조회',
    auth: false,
  })
  getOneUser(id: number): Promise<UserResponse> {
    return this.userService.getUserbyId(id);
  }

  @PatchApi(() => SuccessResponse, {
    path: '/:id',
    description: '유저 정보 수정',
    auth: false,
  })
  updateUser(
    @Body() request: UpdateUserRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updateUser(id, request);
  }

  @DeleteApi(() => SuccessResponse, {
    path: '/:id',
    description: '유저 정보 삭제',
    auth: false,
  })
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
