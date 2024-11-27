import {
  ConflictException,
  HttpCode,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { loginUserDTO } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { registerUserDTO } from './dtos/register.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @HttpCode(HttpStatus.OK)
  async signIn(body: loginUserDTO): Promise<any> {
    const user = await this.usersService.findOneByEmail(body.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashMatch = await bcrypt.compare(body.password, user.password);

    if (!hashMatch) {
      throw new UnauthorizedException('Password not match!');
    }

    const token = await this.firebaseService.generateToken(user.id);
    delete user.password;

    return { ...user, token: token };
  }

  async signUp(payload: registerUserDTO) {
    const user = await this.usersService.findOneByEmail(payload.email);
    if (user) {
      throw new ConflictException('email already in use');
    }
    const createdUser = await this.usersService.createUser(payload);
    return createdUser;
  }
}
