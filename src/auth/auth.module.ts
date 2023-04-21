import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmExModule } from 'src/configs/typeorm.module';
import { AuthRepository } from './repositories/auth.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [TypeOrmExModule.forCustomRepository([AuthRepository])],
})
export class AuthModule {}
