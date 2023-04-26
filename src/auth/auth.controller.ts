import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { Auth } from './entity/auth.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  register(@Body() authDTO: AuthDTO): Promise<Auth> {
    return this.authService.saveUser(authDTO);
  }

  @Get('')
  onTest() {
    return 'hi';
  }
}
