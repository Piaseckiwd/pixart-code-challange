import { Exclude } from 'class-transformer';
import { Item } from './item.class';

export class AddItemsRo {
  cart_id: string;

  ecommerce_id: string;

  customer_id: string;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  @Exclude()
  item_list: Item[];
}
