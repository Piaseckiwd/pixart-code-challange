import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { User } from './models/user.interface';

@Injectable()
export class AuthService {
  private readonly users: User[];

  constructor(private jwtService: JwtService) {
    this.users = [
      {
        user_id: 1,
        username: 'piaseckiwd@gmail.com',
        password: 'randomString123!',
      },
      {
        user_id: 2,
        username: 'anotherUser@gmail.com',
        password: 'stringRandom321!',
      },
    ];
  }

  async login(username: string, password: string) {
    try {
      //normalmente i dati necessari per il login dell'utente sono presenti su un database esterno
      //per questo ho deciso di utilizzare async/await nonostante la funzione sottostante sia già sincrona
      const user = await this.users.find(
        (user) => user.username === username && user.password === password,
      );
      if (!user) {
        throw new UnauthorizedException();
      }
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
