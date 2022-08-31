import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { CartStatus } from '../../constants';
import { Item } from '../entities/item.class';

export class CreateCartRo {
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

  @Exclude()
  price: number;

  @Exclude()
  item_list: Item[];

  @Exclude()
  date_checkout: Date;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
}
