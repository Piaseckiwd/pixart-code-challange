import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { cartsData } from '../data/carts-data';
import {
  CartStatus,
  priceDiscountPercentageByQuantity,
  priceIncreasePercentageByDeliveryDate,
  PriceIncreasePercentageByFormat,
} from './constants';
import { Cart } from './models/entities/cart.class';
import { Item } from './models/entities/item.class';

@Injectable()
export class CartService {
  private findDiscountByItemQuantity(itemQuantity: number): number {
    const discountPercentage = priceDiscountPercentageByQuantity.find(
      (discount) =>
        discount.min < itemQuantity && discount.max
          ? discount.max >= itemQuantity
          : true,
    )?.discount;

    //considerando che il calcolo dello sconto comprende numeri da 0 ad infinito, se non è stata travata una percentuale
    //deve essersi verificato un errore interno al server
    if (!discountPercentage && discountPercentage !== 0)
      throw new InternalServerErrorException();
    return discountPercentage;
  }

  private findActiveCart(
    customer_id: string,
    ecommerce_id: string,
  ): Cart | null {
    const cartFound = cartsData.find(
      (cart) =>
        cart.customer_id == customer_id &&
        cart.ecommerce_id == ecommerce_id &&
        cart.status !== CartStatus.Checkout,
    );
    return cartFound ?? null;
  }

  private findPriceIncreasePercentageByCheckoutDate(
    delivery_date: Date,
    date_checkout: Date,
  ) {
    const deliveryDateInMillis = Date.UTC(
      delivery_date.getFullYear(),
      delivery_date.getMonth(),
      delivery_date.getDate(),
    );
    const dateCheckoutInMillis = Date.UTC(
      date_checkout.getFullYear(),
      date_checkout.getMonth(),
      date_checkout.getDate(),
    );

    //la data di consegna non può essere minore della data di checkout
    if (deliveryDateInMillis < dateCheckoutInMillis) {
      throw new BadRequestException(
        'The checkout_date is greater than the delivery_date',
      );
    }

    //calcolo la differenza delle due date in ore e trovo la percentuale di aumento
    const dateDifferenceInHours =
      (deliveryDateInMillis - dateCheckoutInMillis) / (1000 * 60 * 60);

    const priceIncreasePercentage = priceIncreasePercentageByDeliveryDate.find(
      (increasePercentage) =>
        increasePercentage.minHours < dateDifferenceInHours &&
        increasePercentage.maxHours
          ? increasePercentage.maxHours >= dateDifferenceInHours
          : true,
    )?.increment;
    if (!priceIncreasePercentage && priceIncreasePercentage !== 0)
      throw new InternalServerErrorException();

    return priceIncreasePercentage;
  }

  private calculateCartPrice(items: Item[], date_checkout?: Date): number {
    let totalCartPrice = 0;

    for (const item of items) {
      //trovo la quantità dei prodotti di un tipo nel carrello
      const itemQuantity = items
        .filter((element) => element.product_sku == item.product_sku)
        .reduce(
          (accumulator, currentItem) => accumulator + currentItem.quantity,
          0,
        );

      //verifico se deve essere applicato un aumento di prezzo in base al formato del prodotto
      const formatPriceIncreasePercentage =
        PriceIncreasePercentageByFormat[item.file_type];

      //la il prezzo può essere calcolato in questo modo in quanto il prezzo unitario è sempre uguale a 1;
      let itemPrice = formatPriceIncreasePercentage
        ? (formatPriceIncreasePercentage * item.quantity) / 100 + item.quantity
        : item.quantity;

      if (date_checkout) {
        const checkoutDatePriceIncreasePercentage =
          this.findPriceIncreasePercentageByCheckoutDate(
            item.delivery_date,
            date_checkout,
          );
        if (checkoutDatePriceIncreasePercentage) {
          itemPrice =
            itemPrice + (itemPrice * checkoutDatePriceIncreasePercentage) / 100;
        }
      }
      //calcolo lo sconto in base alla quantità dello stesso prodotto
      const discountByQuantity = this.findDiscountByItemQuantity(itemQuantity);

      //applico lo sconto se necessario e aggiungo il prezzo dell'articolo al totale del carrello
      if (discountByQuantity) {
        totalCartPrice += itemPrice - (itemPrice * discountByQuantity) / 100;
      } else {
        totalCartPrice += itemPrice;
      }
    }
    return totalCartPrice;
  }

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

  public addItemsToCart(
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

  public async getCart(
    customer_id: string,
    ecommerce_id: string,
  ): Promise<Cart> {
    try {
      //il carrello non dovrebbe essere disponibile nel caso fosse vuoto, quindi supponiamo la richiesta sia arrivata per errore
      const activeCart = this.findActiveCart(customer_id, ecommerce_id);
      if (!activeCart)
        throw new BadRequestException('There is no cart available');
      //se sono presenti oggetti nel carrello calcolo il suo prezzo
      if (activeCart.item_list) {
        activeCart.price = this.calculateCartPrice(activeCart.item_list);
      }
      return activeCart;
    } catch (error) {
      console.error('Context AuthService: getCart()', error.message);
      throw error;
    }
  }

  public async checkoutCart(cart_id: string): Promise<Cart> {
    try {
      const cartToCheckout = cartsData.find((cart) => cart.cart_id == cart_id);
      if (!cartToCheckout) throw new BadRequestException();
      const date_checkout = new Date();
      cartToCheckout.price = this.calculateCartPrice(
        cartToCheckout.item_list,
        date_checkout,
      );
      //imposto la data di checkout e cambio lo stato del carrello
      cartToCheckout.date_checkout = date_checkout;
      cartToCheckout.status = CartStatus.Checkout;
      return cartToCheckout;
    } catch (error) {
      console.error('Context AuthService: checkoutCart()', error.message);
      throw error;
    }
  }
}
