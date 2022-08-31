<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

## Testing cURLs with examples

```bash
  Login:
    returns an JWT token, the available credentials can be found inside pixart-printing/src/modules/auth/constants.ts

    curl --request POST \
  --url http://localhost:3000/auth/login \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "piaseckiwd@gmail.com",
	"password": "randomString123!"
}'


  Cart creation:
    create a new cart with status that can be chosen between "CREATED","BUILDING" and "CHECKOUT".

  curl --request POST \
  --url http://localhost:3000/cart/create \
  --header 'Content-Type: application/json' \
  --data '{
	"ecommerce_id": "12",
	"customer_id": "1",
	"status": "CREATED"
}'


  Add items to the cart:
    Adds new product into the users cart that has not been checked out. If there isn't a cart available it creates one.
    Permitted file types can be found in pixart-printing/src/modules/cart/constants.ts
    All the other parameters are for user to choose.

  curl --request POST \
  --url http://localhost:3000/cart/add-items \
  --header 'Content-Type: application/json' \
  --data '{
	"ecommerce_id": "12",
	"customer_id": "1",
	"item_list": [
		{  "product_sku": "AAA123131AAA",
  "product_name": "Quaderno",
  "file_type": "PDF",
  "quantity": 300,
  "delivery_date": "2022-09-03T21:20:56.188Z"}
	]
}'


  Getting the active cart:
    Return users active cart (created or in building) if present, otherwise throws an error.

  curl --request GET \
  --url http://localhost:3000/cart/view-content/${ecommerce_id}/${customer_id}


  Cart checkout:
    returns the cart with its calculated price based on the checkout date.

  curl --request GET \
  --url http://localhost:3000/cart/checkout/${cart_id}
```

## Stay in touch

- Author - Wiktor Dariusz Piasceki

## License

Nest is [MIT licensed](LICENSE).
