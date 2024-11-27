import { EntityRepository } from '@mikro-orm/postgresql';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreateUserDto } from './dtos/create-user.dto';
import { EntityManager } from '@mikro-orm/core';
import { FirebaseService } from 'src/firebase/firebase.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,

    private readonly em: EntityManager,

    private readonly fb: FirebaseService,
  ) {}

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne(
      { email },
      { fields: ['id', 'email', 'password'] },
    );
    return user;
  }

  async createUser(payload: CreateUserDto) {
    try {
      const hashPassword = await bcrypt.hash(payload.password, 12);

      // save in database
      const user = this.em.create(User, { ...payload, password: hashPassword });

      // save in firebase auth service, can use firebase (cloud function  or event ) to insert also or server as subscriber
      await this.fb.registerUser({
        uid: user.id,
        displayName: user.name,
        email: user.email,
        password: user.password,
      });

      await this.em.persistAndFlush(user);

      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ id });
    return user;
  }

  async updateUserBio(id: string, bio: string) {
    const user = await this.em.findOne(User, { id });
    user.bio = bio;
    await this.em.persistAndFlush(user);
    return user;
  }
}
