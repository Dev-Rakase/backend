import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [UserModule, FirebaseModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
