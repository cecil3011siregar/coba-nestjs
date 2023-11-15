import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reviews } from './entities/review.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Reviews])]
})
export class ReviewsModule {}
