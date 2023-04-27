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
  register(@Body() authDTO: AuthDTO): Promise<Auth> {
    return this.authService.saveUser(authDTO);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  onTest(@GetUser() user: Auth) {
    return console.log(user);
  }
}
