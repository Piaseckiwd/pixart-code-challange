import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AddItemsDto {
  @IsNotEmpty()
  @IsString()
  ecommerce_id: string;

  @IsNotEmpty()
  @IsString()
  customer_id: string;

  @Type(() => ItemDto)
  @ValidateNested({ each: false })
  item_list: ItemDto[];
}

class ItemDto {
  @IsString()
  product_sku: string;

  @IsString()
  product_name: string;

  @IsString()
  file_type: string;

  @IsNumber()
  quantity: number;

  @IsDate()
  delivery_date: Date;
}
