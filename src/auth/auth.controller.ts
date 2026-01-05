import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authservcie: AuthService) {}
    // this is the route for particular functions with method POST
    @Post('register')
    register( @Body() registerUserDto : RegisterDto) {
        const result = this.authservcie.registerUser(registerUserDto);
        return result;
    }
}
