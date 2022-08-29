import { Exclude } from 'class-transformer';
import { CartStatus } from '../models/cart.class';
import { Item } from './item.class';

export class CreateCartRo {
  cart_id: string;

  ecommerce_id: string;

  customer_id: string;

  status: CartStatus;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  @Exclude()
  item_list: Item[];
}
