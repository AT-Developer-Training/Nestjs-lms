import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    async registerUser(registerUserDto: RegisterDto) {
        // Logic for registering a user would go here
        const saltRound = 10
        const hash = await bcrypt.hash(registerUserDto.password, saltRound);
        return this.userService.createUser({ ...registerUserDto, password: hash });
    }
}
