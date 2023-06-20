import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { TypeOrmExModule } from 'src/configs/typeorm.module';
import { AuthRepository } from './repository/auth.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/jwt/jwt.strategy';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([AuthRepository, UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '300m' },
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, JwtStrategy],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
