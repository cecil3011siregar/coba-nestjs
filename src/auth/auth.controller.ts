import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}
    
    @Post()
    async registerUsers(@Body()registerUsersDto: RegisterUserDto){
        const data = await this.authService.register(registerUsersDto)
        return{
            data,
            statusCode: HttpStatus.CREATED,
            message: "Success"
        }
    }
    @Get()
    async loginUsers(@Body() loginUserDto: LoginUserDto){
        const data = await this.authService.login(loginUserDto)
        return{
            data,
            statusCode: HttpStatus.OK,
            message: "Success Login"
        }
    }
}
