import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reviews } from './entities/review.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UsersService } from '#/users/users.service';
import { UpdateReviewDto } from './dto/update-reivew.dto';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Reviews)
        private reviewsRepository: Repository<Reviews>,
        private userService: UsersService
    ){}

    getAll() {
        return this.reviewsRepository.findAndCount({
            relations:{
                user: true
            }
        });
    }

    async create(createReviewDto: CreateReviewDto){
        try{
            // cek user id is valid
            const findOneUserId = await this.userService.findOne(createReviewDto.user_id)
            // kalau valid kita baru create review
            const reviewEntity = new Reviews
            reviewEntity.text = createReviewDto.text
            reviewEntity.user = findOneUserId

            const insertReview = await this.reviewsRepository.insert(reviewEntity)

            return this.reviewsRepository.findOneOrFail({
                where:{
                    id:insertReview.identifiers[0].id,
                },
            });
        }catch(e){
            throw e
        }
    }

    async findById(id: string){
        try{
            return await this.reviewsRepository.findOneOrFail({
                where:{id},
                relations: {user: true}
            })
        }catch(e){
            if (e instanceof EntityNotFoundError){
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: "data not found"
                    },
                    HttpStatus.NOT_FOUND
                )
            }else{
                throw e
            }
        }
    }

    async updateById( id: string, updateReviewDto: UpdateReviewDto){
        try{
            // cari idnya valid atau engga
            await this.findById(id)

            //kalau valid, update datanya
            const reviewEntity = new Reviews
            reviewEntity.text = updateReviewDto.text
            
            await this.reviewsRepository.update(id, reviewEntity)

            // return data yang sudah diupdate
            return await this.reviewsRepository.findOneOrFail({
                where:{id}
            })
        }catch(e){
            throw e
        }
    }

    async deleteById(id: string){
        try{
            // cari idnya valid atau engga
            await this.findById(id)

            // kalau valid langsung delete

            await this.reviewsRepository.softDelete(id)
            return "success"
        }catch(e){
            throw e
        }
    }
}
