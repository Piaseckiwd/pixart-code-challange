import { User } from './models/entities/user.class';

export const jwtConstants = {
  secret: 'secretKey',
};

export const users: User[] = [
  {
    user_id: '1',
    customer_id: '1',
    username: 'piaseckiwd@gmail.com',
    password: 'randomString123!',
  },
  {
    user_id: '2',
    customer_id: '2',
    username: 'anotherUser@gmail.com',
    password: 'stringRandom321!',
  },
];
