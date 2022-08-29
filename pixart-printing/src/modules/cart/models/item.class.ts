export class Item {
  product_sku: string;

  product_name: string;

  file_type: string;

  quantity: number;

  delivery_date: Date;

  constructor(partial: Partial<Item>) {
    Object.assign(this, partial);
  }
}
