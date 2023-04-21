import { Body, Controller, Post } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { Auth } from './entity/auth.entity';
import { AuthService } from './auth.service';

@Controller('register')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  register(@Body() authDTO: AuthDTO): Promise<Auth> {
    return this.authService.saveUser(authDTO);
  }
}
