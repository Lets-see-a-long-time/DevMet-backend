import { Controller, ParseIntPipe, Param } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserResponse } from '../dto/response/user/users.response';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteApi,
  GetApi,
  PatchApi,
} from 'src/common/decorator/api.decorator';
import { User } from './../entity/user.entity';
import SuccessResponse from 'src/common/utils/success.response';

@ApiTags('User Management')
@Controller('auth/user')
export class UserController {
  constructor(private userService: UserService) {}

  @GetApi(() => [User], {
    path: '/',
    description: '유저 목록 조회',
    auth: false,
  })
  getAllUser(): Promise<User[]> {
    return this.userService.getAllUser();
  }

  @GetApi(() => User, {
    path: '/:id',
    description: '유저 한 명 조회',
    auth: false,
  })
  getOneUser(id: number): Promise<User> {
    return this.userService.getOneUser(id);
  }

  @PatchApi(() => SuccessResponse, {
    path: '/:id',
    description: '유저 정보 수정',
    auth: false,
  })
  updateUser(@Param('id', ParseIntPipe) id: number, userDTO: UserDTO) {
    return this.userService.updateUser(id, userDTO);
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
