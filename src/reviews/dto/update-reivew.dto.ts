import { IsNotEmpty} from "class-validator";

export class UpdateReviewDto{
    @IsNotEmpty()
    text :string;
}