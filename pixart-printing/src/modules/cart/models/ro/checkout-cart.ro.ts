import { Exclude } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CartStatus } from '../../constants';
import { Item } from '../entities/item.class';

export class CheckoutCartRo {
  @IsNotEmpty()
  @IsString()
  cart_id: string;

  @IsNotEmpty()
  @IsString()
  ecommerce_id: string;

  @IsNotEmpty()
  @IsString()
  customer_id: string;

  @IsNotEmpty()
  status: CartStatus;

  @IsOptional()
  item_list: Item[];

  @IsNumber()
  price: number;

  @IsDate()
  date_checkout: Date;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
}
