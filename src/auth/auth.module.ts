import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '#/users/users.module';
import { LevelUsersModule } from '#/level_users/level_users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '#/users/entities/users-entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([Users]),UsersModule, LevelUsersModule]
})
export class AuthModule {}
