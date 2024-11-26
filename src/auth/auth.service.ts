import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { loginUserDTO } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signIn(body: loginUserDTO): Promise<any> {
    const user = await this.usersService.findOneByEmail(body.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const hashMatch = await bcrypt.compare(body.password, user.password);

    if (!hashMatch) {
      throw new UnauthorizedException('Password not match!');
    }

    delete user.password;

    return user;
  }
}
