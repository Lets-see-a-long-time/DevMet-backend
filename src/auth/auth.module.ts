import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { TypeOrmExModule } from 'src/configs/typeorm.module';
import { AuthRepository } from './repository/auth.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [TypeOrmExModule.forCustomRepository([AuthRepository])],
})
export class AuthModule {}
