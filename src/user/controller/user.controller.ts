import {
  Controller,
  Get,
  Delete,
  Patch,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { User } from 'src/auth/entity/user.entity';
import { UserService } from './../service/user.service';
import { UserDTO } from '../dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  getAllUser(): Promise<User[]> {
    return this.userService.getAllUser();
  }

  @Get('/:id')
  getOneUser(id: number): Promise<User> {
    return this.userService.getOneUser(id);
  }

  @Patch('/')
  updateUser(@Param('id', ParseIntPipe) id: number, userDTO: UserDTO) {
    return this.userService.updateUser(id, userDTO);
  }
  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
