import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { Users, statusUser } from '#/users/entities/users-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { LevelUsersService } from '#/level_users/level-users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from '#/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private usersRepo: Repository<Users>,
        private levelUsersService: LevelUsersService,
        private usersService: UsersService
    ){}
    async register(registerUserDto: RegisterUserDto){
        try{
            const findLevelUsersId = await this.levelUsersService.getLevelById(registerUserDto.level_id)
            const usersEntity = new Users
            usersEntity.name = registerUserDto.name
            usersEntity.email = registerUserDto.email
            // usersEntity.salt = registerUserDto.salt
            usersEntity.password = registerUserDto.password
            usersEntity.dateOfBirth = new Date(registerUserDto.dateOfBirth)
            usersEntity.gender = registerUserDto.gender
            usersEntity.phoneNumber = registerUserDto.phoneNumber
            usersEntity.photo = registerUserDto.photo
            usersEntity.address = registerUserDto.address
            // usersEntity.status = registerUserDto.status
            usersEntity.level = findLevelUsersId

            const insertUsers = await this.usersRepo.insert(usersEntity)
            return this.usersRepo.findOneOrFail({
                where:{id: insertUsers.identifiers[0].id}
            })
        }catch(e){
        throw e
        }
    }

    async login(loginUserDto: LoginUserDto){
        try {
          const user = await this.usersRepo.findOneOrFail({
            where: {
              email: loginUserDto.email,
              password: loginUserDto.password,
            },
          });
          if(user){
            user.status = statusUser.ACTIVE
          }
          return user;
        } catch (e) {
            if(e instanceof EntityNotFoundError){
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: "Email or Password incorrect"
                    },
                    HttpStatus.NOT_FOUND
                )
            }else{
                throw e
            }
        }
      }
    // async login(loginUserDto: LoginUserDto){
    //     const loginEntity = new Users
    //     loginEntity.email = loginUserDto.email
    //     loginEntity.password = loginUserDto.password
    //     const loginyuk = await this.usersRepo.findOneOrFail({
    //         where:{email:loginUserDto.email,
    //         password: loginUserDto.password}
    //     })
    //     return loginyuk
    // }
}
