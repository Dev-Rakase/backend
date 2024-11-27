import { Controller, Get, UseGuards, Request, Put, Body } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  getCurrentLoginUser(@Request() req) {
    return this.userService.findOne(req.user);
  }

  @Put('')
  updateUser(@Request() req, @Body('bio') bio: string) {
    return this.userService.updateUserBio(req.user, bio);
  }
}
