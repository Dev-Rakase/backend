import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractAuthToken(request);

    if (!token) {
      throw new UnauthorizedException('You are not authorized');
    }

    const decodedToken = await this.firebaseService.verifyToken(token);

    if (decodedToken) {
      request['user'] = decodedToken.uid;
    }

    return true;
  }

  private extractAuthToken(request: Request): string | null {
    const authHeader = request.headers['authorization'];
    if (!authHeader) return null;
    return authHeader.split(' ')[1];
  }
}
