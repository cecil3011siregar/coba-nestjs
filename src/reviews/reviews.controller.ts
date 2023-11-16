import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-reivew.dto';

@Controller('reviews')
export class ReviewsController {
    constructor(
        private reviewsService: ReviewsService,
    ){}

    @Get()
    async findAllReviews(){
        const [data, count] =  await this.reviewsService.getAll();

        return {
            data,
            count,
            statusCode: HttpStatus.OK,
            message: "Success",
        };
    }

    @Post()
    async create(@Body() createReviewDto:CreateReviewDto ){
        const data =  await this.reviewsService.create(createReviewDto)
        return {
            data,
            statusCode: HttpStatus.CREATED,
            message:"Success"
        }
    }
    
    @Get('/:id')
    async getDetailReview(@Param('id', ParseUUIDPipe) id:string){
        return {
            data : await this.reviewsService.findById(id),
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Put('/:id')
    async updateReview(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto){
        const data  = await this.reviewsService.updateById(id, updateReviewDto)
        return{
            data,
            statusCode: HttpStatus.OK,
            message:"Success"
        }
    }

    @Delete('/:id')
    async deleteReview(@Param('id') id: string){
        return{
            statusCode:HttpStatus.OK,
            message: await this.reviewsService.deleteById(id)
        }
    }

}
