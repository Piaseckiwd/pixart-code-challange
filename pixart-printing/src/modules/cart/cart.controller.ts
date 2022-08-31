import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddItemsToCartDto } from './models/dto/add-items-to-cart.dto';
import { CreateCartDto } from './models/dto/create-cart.dto';
import { AddItemsToCartRo } from './models/ro/add-items-to-cart.ro';
import { CheckoutCartRo } from './models/ro/checkout-cart.ro';
import { CreateCartRo } from './models/ro/create-cart.ro';
import { GetCartRo } from './models/ro/get-cart.ro';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('create')
  async createCart(
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
  async addItemsToCart(
    @Body() addItemsToCartDto: AddItemsToCartDto,
  ): Promise<HttpException | AddItemsToCartRo> {
    try {
      return this.cartService.addItemsToCart(
        addItemsToCartDto.ecommerce_id,
        addItemsToCartDto.customer_id,
        addItemsToCartDto.item_list,
      );
    } catch (error) {
      console.error('Context: CartController(): addItems()', error.message);
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('view-content/:ecommerce_id/:customer_id')
  async getCart(
    @Param('ecommerce_id') ecommerce_id: string,
    @Param('customer_id') customer_id: string,
  ): Promise<HttpException | GetCartRo> {
    try {
      return this.cartService.getCart(customer_id, ecommerce_id);
    } catch (error) {
      console.error('Context: CartController(): getContent()', error.message);
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('checkout/:cart_id')
  async checkoutCart(
    @Param('cart_id') cart_id: string,
  ): Promise<CheckoutCartRo> {
    try {
      return await this.cartService.checkoutCart(cart_id);
    } catch (error) {
      console.error('Context: CartController(): checkoutCart()', error.message);
      throw new HttpException(error.message, error.status);
    }
  }
}
