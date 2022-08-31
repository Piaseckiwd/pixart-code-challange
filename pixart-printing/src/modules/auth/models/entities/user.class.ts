export class User {
  customer_id: string;

  user_id: string;

  username: string;

  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
