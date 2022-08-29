import {
  Body,
  Controller,
  HttpException,
  ParseArrayPipe,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddItemsDto } from './dto/add-items.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { AddItemsRo } from './models/add-items.ro';
import { CreateCartRo } from './models/create-cart.ro';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @Post('create')
  async create(
    @Body() createCartDto: CreateCartDto,
  ): Promise<HttpException | CreateCartRo> {
    try {
      return this.cartService.createCart(
        createCartDto.ecommerce_id,
        createCartDto.customer_id,
        createCartDto.status,
      );
    } catch (error) {
      console.error('Context: CartController(): create()', error.message);
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('add-items')
  async addItems(
    @Body()
    addItemsDto: AddItemsDto,
  ): Promise<HttpException | AddItemsRo> {
    try {
      return this.cartService.addItems(
        addItemsDto.ecommerce_id,
        addItemsDto.customer_id,
        addItemsDto.item_list,
      );
    } catch (error) {
      console.error('Context: CartController(): addItems()', error.message);
      throw new HttpException(error.message, error.status);
    }
  }
}
