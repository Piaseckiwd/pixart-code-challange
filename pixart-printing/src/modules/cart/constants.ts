export enum AllowedProductsFormats {
  PDF = 'PDF',
  PSD = 'PSD',
  AI = 'AI',
  JPEG = 'JPEG',
  BMP = 'BMP',
}

export enum PriceIncreasePercentageByFormat {
  PDF = 15,
  PSD = 35,
  AI = 25,
  JPEG = 0,
  BMP = 0,
}

export enum CartStatus {
  Created = 'CREATED',
  Building = 'BUILDING',
  Checkout = 'CHECKOUT',
}

export const priceDiscountPercentageByQuantity = [
  { min: 0, max: 100, discount: 0 },
  { min: 100, max: 250, discount: 5 },
  { min: 250, max: 500, discount: 10 },
  { min: 500, max: 1000, discount: 15 },
  { min: 1000, max: null, discount: 20 },
];

export const priceIncreasePercentageByDeliveryDate = [
  { minHours: 0, maxHours: 24, increment: 30 },
  { minHours: 24, maxHours: 48, increment: 20 },
  { minHours: 48, maxHours: 72, increment: 10 },
  { minHours: 72, maxHours: null, increment: 0 },
];
