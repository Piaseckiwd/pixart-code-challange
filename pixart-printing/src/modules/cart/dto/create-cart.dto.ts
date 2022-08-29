import { IsNotEmpty, IsString } from 'class-validator';
import { CartStatus } from '../models/cart.class';

export class CreateCartDto {
  @IsNotEmpty()
  @IsString()
  readonly ecommerce_id: string;

  @IsNotEmpty()
  @IsString()
  readonly customer_id: string;

  @IsNotEmpty()
  @IsString()
  readonly status: CartStatus;
}
