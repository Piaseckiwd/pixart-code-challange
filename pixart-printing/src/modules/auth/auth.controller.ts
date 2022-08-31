import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './models/dto/login.dto';
import { LoginRo } from './models/ro/login.ro';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<HttpException | LoginRo> {
    try {
      return await this.authService.login(loginDto.username, loginDto.password);
    } catch (error) {
      console.error('Context: AuthController(): login()', error.message);
      throw new HttpException(error.message, error.status);
    }
  }
}
