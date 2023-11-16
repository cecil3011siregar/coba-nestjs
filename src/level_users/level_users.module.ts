import { Module } from '@nestjs/common';
import { LevelUsersController } from './level-users.controller';
import { LevelUsersService } from './level-users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelUsers } from './entitites/level-users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LevelUsers])],
  controllers: [LevelUsersController],
  providers: [LevelUsersService],
  exports: [LevelUsersService]
})
export class LevelUsersModule {}
