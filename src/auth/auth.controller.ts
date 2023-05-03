import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { Auth } from './entity/auth.entity';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport/dist';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { TokenDTO } from './dto/token.dto';
import { Token } from './entity/token.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/testing')
  check(@Body() response) {
    return console.log(response);
  }
  @Post('/register')
  register(@Body() authDTO: AuthDTO): Promise<Auth> {
    return this.authService.saveUser(authDTO);
  }
}
