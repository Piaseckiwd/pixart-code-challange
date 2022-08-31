import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AllowedProductsFormats } from '../../constants';

export class AddItemsToCartDto {
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

  @IsEnum(AllowedProductsFormats)
  file_type: AllowedProductsFormats;

  @IsNumber()
  quantity: number;

  @IsDate()
  delivery_date: Date;
}
