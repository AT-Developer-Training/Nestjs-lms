import { Injectable } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { Users } from "../users.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";

@Injectable()
export class UsersService {

    // injecting usesr Entity
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) { }

    public async createUser(createUserDto: CreateUserDto)
    {
        const existingUser = await this.usersRepository.findOne({where: {email: createUserDto.email}});
        if(existingUser) {
            throw new Error('User with this email already exists');
        }
        let newUser = this.usersRepository.create(createUserDto);
        newUser = await this.usersRepository.save(newUser);
        return newUser;
    }

    public findAll(
        GetUsersParamDto: GetUsersParamDto, 
        page: number,
        limit: number
    ) {
        return [
            {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com"
            },
            {
                firstName: "raj",
                lastName: "Doe",
                email: "raj.doe@example.com"
            },
            {
                firstName: "rahul",
                lastName: "Doe",
                email: "rahul.doe@example.com"
            }
        ];
    }

    public findOneById(id: number) {
        return [
            {
                id: 1,
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com"
            },
        ];
    }
}