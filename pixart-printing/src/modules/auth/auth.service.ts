import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants, users } from './constants';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(username: string, password: string) {
    try {
      //normalmente i dati necessari per il login dell'utente sono presenti su un database esterno
      //per questo ho deciso di utilizzare async/await nonostante la funzione sottostante sia già sincrona
      const user = await users.find(
        (user) => user.username === username && user.password === password,
      );
      if (!user) throw new UnauthorizedException();

      return {
        access_token: this.jwtService.sign(user, {
          secret: jwtConstants.secret,
        }),
      };
    } catch (error) {
      console.error('Context AuthService: login()', error.message);
      throw error;
    }
  }
}
