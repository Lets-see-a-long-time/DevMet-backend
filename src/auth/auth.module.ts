import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { UserService } from './service/user.service';
import { TypeOrmExModule } from 'src/configs/typeorm.module';
import { AuthRepository } from './repository/auth.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([AuthRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '300m' },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, JwtStrategy],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
