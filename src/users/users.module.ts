import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users-entity';
import { LevelUsersModule } from '#/level_users/level_users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), LevelUsersModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
