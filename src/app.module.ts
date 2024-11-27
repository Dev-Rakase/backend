import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import mikroOrmConfig from './mikro-orm.config';
import firebaseConfig from './firebase/config/firebase.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, firebaseConfig],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      cache: process.env.NODE_ENV === 'production',
      validationSchema: Joi.object({
        // #database
        DATABASE_HOST: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),

        // #firebase
        TYPE: Joi.string().required(),
        PROJECT_ID: Joi.string().required(),
        PRIVATE_KEY_ID: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
        CLIENT_EMAIL: Joi.string().required(),
        CLIENT_ID: Joi.string().required(),
        AUTH_URI: Joi.string().required(),
        TOKEN_URI: Joi.string().required(),
        AUTH_CERT_URL: Joi.string().required(),
        CLIENT_CERT_URL: Joi.string().required(),
        UNIVERSAL_DOMAIN: Joi.string().required(),
      }),
    }),
    MikroOrmModule.forRoot({ ...mikroOrmConfig }),
    UserModule,
    AuthModule,
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
