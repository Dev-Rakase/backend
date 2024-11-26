import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async findOneByEmail(email: string) {
    const user = this.userRepository.findOne(
      { email },
      { fields: ['id', 'email', 'password'] },
    );
    return user;
  }
}
