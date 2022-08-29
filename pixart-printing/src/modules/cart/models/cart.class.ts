import { Item } from './item.class';

export class Cart {
  cart_id: string;

  ecommerce_id: string;

  customer_id: string;

  status: CartStatus;

  created_at: Date;

  updated_at: Date;

  date_checkout: Date;

  item_list: Item[];

  constructor(partial: Partial<Cart>) {
    Object.assign(this, partial);
  }
}

export enum CartStatus {
  Created = 'CREATED',
  Building = 'BUILDING',
  Checkout = 'CHECKOUT',
}
