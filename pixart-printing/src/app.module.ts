import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [AuthModule, CartModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
