import { Module } from '@nestjs/common';
import { FirebaseController } from './firebase.controller';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from './firebase.service';
import admin from 'firebase-admin';

@Module({
  controllers: [FirebaseController],
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: (config: ConfigService) => {
        const firebaseConfig = {
          type: config.get<string>('firebase.type'),
          project_id: config.get<string>('firebase.project_id'),
          private_key_id: config.get<string>('firebase.private_key_id'),
          private_key: config.get<string>('firebase.private_key'),
          client_email: config.get<string>('firebase.client_email'),
          client_id: config.get<string>('firebase.client_id'),
          auth_uri: config.get<string>('firebase.auth_uri'),
          token_uri: config.get<string>('firebase.token_uri'),
          auth_provider_x509_cert_url: config.get<string>(
            'firebase.auth_provider_x509_cert_url',
          ),
          client_x509_cert_url: config.get<string>(
            'firebase.client_x509_cert_url',
          ),
          universe_domain: config.get<string>('firebase.universe_domain'),
        } as admin.ServiceAccount;
        return admin.initializeApp({
          credential: admin.credential.cert(firebaseConfig),
          databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
          storageBucket: `${firebaseConfig.projectId}.appspot.com`,
        });
      },
      inject: [ConfigService],
    },
    FirebaseService,
  ],
  exports: [FirebaseService],
})
export class FirebaseModule {}
