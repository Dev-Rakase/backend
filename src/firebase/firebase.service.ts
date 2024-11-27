import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import { CreateUserDTO } from './dtos/create-user.dtos';

@Injectable()
export class FirebaseService {
  constructor(@Inject('FIREBASE_ADMIN') private fb: app.App) {}

  async registerUser(payload: CreateUserDTO) {
    const user = await this.fb.auth().createUser(payload);
    return user;
  }

  async generateToken(uid: string) {
    const token = await this.fb.auth().createCustomToken(uid);
    return token;
  }
}
