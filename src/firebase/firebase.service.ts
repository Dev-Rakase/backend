import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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
    // can include more user info as second params that can show on profile in frontend
    const token = await this.fb.auth().createCustomToken(uid);
    return token;
  }

  async verifyToken(token: string) {
    try {
      const decodedToken = await this.fb.auth().verifyIdToken(token);
      return decodedToken;
    } catch (e) {
      throw new UnauthorizedException(
        'Token verification failed: ' + e.message,
      );
    }
  }
}
