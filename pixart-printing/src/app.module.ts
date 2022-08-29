import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [AuthModule, CartModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
