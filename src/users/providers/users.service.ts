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

    public async createUser(createUserDto: CreateUserDto) {
        const existingUser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        let newUser = this.usersRepository.create(createUserDto);
        newUser = await this.usersRepository.save(newUser);
        return newUser;
    }

    public async findAll(
        GetUsersParamDto: GetUsersParamDto,
        page: number,
        limit: number
    ) {
        let users = await this.usersRepository.find({
            relations: ['posts'],
        });
        return users;
    }

    public async findOneById(id: number) {
        return await this.usersRepository.findOneBy({ id });
    }

    public async delete(id: number) {

        let user = await this.usersRepository.findOneBy({ id });
        this.usersRepository.softDelete(id);

        return {
            message: "User deleted successfully with id " + id,
        };
    }
}