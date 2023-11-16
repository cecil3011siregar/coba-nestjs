import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users-entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
import { LevelUsersService } from '#/level_users/level-users.service';
import { UpdateUsersDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepo: Repository<Users>,
        private levelUsersService: LevelUsersService
    ){}

    getAll(){
        return this.usersRepo.findAndCount()
    }
    
    async getUsersById(id: string){
        try{
            return await this.usersRepo.findOneOrFail({where:{id}})
        }catch(e){
            if(e instanceof EntityNotFoundError){
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: "Data not found"
                    },
                    HttpStatus.NOT_FOUND
                )
            }else{
                throw e
            }
        }
    }

    // async createUsers(createUsersDto: CreateUsersDto){
    //     try{
    //         const findLevelUsersId = await this.levelUsersService.getLevelById(createUsersDto.level_id)
    //         const usersEntity = new Users
    //         usersEntity.name = createUsersDto.name
    //         usersEntity.email = createUsersDto.email
    //         // usersEntity.salt = createUsersDto.salt
    //         usersEntity.password = createUsersDto.password
    //         usersEntity.dateOfBirth = new Date(createUsersDto.dateOfBirth)
    //         usersEntity.gender = createUsersDto.gender
    //         usersEntity.phoneNumber = createUsersDto.phoneNumber
    //         usersEntity.photo = createUsersDto.photo
    //         usersEntity.address = createUsersDto.address
    //         // usersEntity.status = createUsersDto.status
    //         usersEntity.level = findLevelUsersId

    //         const insertUsers = await this.usersRepo.insert(usersEntity)
    //         return this.usersRepo.findOneOrFail({
    //             where:{id: insertUsers.identifiers[0].id}
    //         })
    //     }catch(e){
    //     throw e
    //     }
    // }

    async updateUsers(id: string, updateUsersDto: UpdateUsersDto){
        try{
            await this.getUsersById(id)

            const usersEntity = new Users
            usersEntity.name = updateUsersDto.name
            usersEntity.email = updateUsersDto.email
            // usersEntity.salt = updateUsersDto.salt
            usersEntity.password = updateUsersDto.password
            usersEntity.dateOfBirth = new Date(updateUsersDto.dateOfBirth)
            usersEntity.gender = updateUsersDto.gender
            usersEntity.phoneNumber = updateUsersDto.phoneNumber
            usersEntity.photo = updateUsersDto.photo
            usersEntity.address = updateUsersDto.address
            // usersEntity.status = updateUsersDto.status

            await this.usersRepo.update(id, usersEntity)

            return await this.usersRepo.findOneOrFail({
                where:{id}
            })
        }catch(e){
            throw e
        }
    }

    async deleteUsers(id: string){
        try{
            await this.getUsersById(id)

            await this.usersRepo.softDelete(id)
            return "Success"
        }catch(e){
            throw e
        }
    }
}