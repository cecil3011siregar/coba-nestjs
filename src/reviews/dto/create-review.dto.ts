import { IsNotEmpty } from "class-validator";

export class CreateReviewDto{
    @IsNotEmpty()
    user_id: string;

    @IsNotEmpty()
    text: string;

}