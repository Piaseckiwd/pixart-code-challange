import { BadRequestException, Injectable } from '@nestjs/common';
import { cartsData } from '../data/carts-data';
import { Cart, CartStatus } from './models/cart.class';
import { Item } from './models/item.class';

@Injectable()
export class CartService {
  public createCart(
    ecommerce_id: string,
    customer_id: string,
    status: CartStatus,
  ): Cart {
    try {
      //controllo che per l'utente non sia già presente un carrello che non abbia eseguito il checkout.
      const activeCart = this.findActiveCart(customer_id, ecommerce_id);

      //nel caso fosse trovato un carrello "attivo" mando l'errore al client.
      if (activeCart) {
        throw new BadRequestException(
          'User cannot have more than one active cart at the time',
        );
      }

      //procedo con la creazione del carrello
      const cartToCreate = new Cart({ ecommerce_id, customer_id, status });
      cartToCreate.created_at = new Date();
      cartToCreate.updated_at = new Date();
      cartToCreate.item_list = [];

      //Per generare un nuovo id prendo l'elemento dell'array contenete i cart attualmente salvati avente l'id con il valore più grande.
      //il nuovo id sarà dato dall'id dell'elemento trovato + 1
      if (cartsData.length == 0) {
        cartToCreate.cart_id = '1';
      } else {
        cartToCreate.cart_id = (
          Math.max(...cartsData.map((cart) => +cart.cart_id)) + 1
        ).toString();
      }
      //simulo la creazione di un cart aggiungendolo alla lista dei cart salvati nella variabile cartsData
      cartsData.push(cartToCreate);

      return cartToCreate;
    } catch (error) {
      console.error('Context AuthService: createCart()', error.message);
      throw error;
    }
  }

  public addItems(
    ecommerce_id: string,
    customer_id: string,
    item_list: Item[],
  ): Cart {
    try {
      //troviamo il carrello dell'utente
      let activeCart = this.findActiveCart(customer_id, ecommerce_id);
      //nel caso non trovassimo un carrello attivo ne creiamo uno nuovo
      if (!activeCart) {
        activeCart = this.createCart(
          ecommerce_id,
          customer_id,
          CartStatus.Building,
        );
        //nel caso il carrello trovato avesse ancora lo stato created lo cambiamo in building
      } else if (activeCart.status == CartStatus.Created) {
        activeCart.status = CartStatus.Building;
      }
      activeCart.updated_at = new Date();
      activeCart.item_list.push(...item_list);

      return activeCart;
    } catch (error) {
      console.error('Context AuthService: addItems()', error.message);
      throw error;
    }
  }

  private findActiveCart(customer_id: string, ecommerce_id: string) {
    return cartsData.find(
      (cart) =>
        cart.customer_id == customer_id &&
        cart.ecommerce_id == ecommerce_id &&
        cart.status !== CartStatus.Checkout,
    );
  }
}
