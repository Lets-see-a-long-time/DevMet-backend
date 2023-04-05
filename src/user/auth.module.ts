import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/configs/typeorm.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from './repository/user.repository';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from 'src/common/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository]),
    JwtModule.register({
      global: true,
      secret: '1234',
      signOptions: {
        expiresIn: 60 * 60 * 60,
      },
    }),
    // jwt모듈 설정 secret키 및 유효기간 지정
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  // 프로바이더에 jwtstrategy를 넣어줘야함.
  exports: [JwtStrategy, PassportModule],
  //다른 모듈에서도 사용하기 위함
})
export class AuthModule {}
