import { Body, Controller, Post } from '@nestjs/common';
import { registerUserDTO } from './dtos/register.dto';
import { loginUserDTO } from './dtos/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  registerUser(@Body() user: registerUserDTO) {
    return this.authService.signUp(user);
  }

  @Post('/login')
  loginUser(@Body() user: loginUserDTO) {
    return this.authService.signIn(user);
  }
}
