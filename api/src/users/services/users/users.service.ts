import { AddUser } from './../../dtos/User.dtos';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Order } from '../../entities/order.entity';
import { User } from '../../entities/user.entity';

import { ProductsService } from '../../../products/services/products/products.service';
import { Task } from '../../../entities/Task.entity';

@Injectable()
export class UsersService {
  private userId = 1;
  private users: User[] = [
    {
      id: 1,
      birthday: new Date(1997, 5, 13),
      email: 'Lautaro@gmail.com',
      name: 'Lautaro',
    },
  ];

  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @Inject('TASKS') private tasks: Task[],
  ) {}

  async findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async addUser(user: AddUser) {
    this.users.push({
      ...user,
      id: ++this.userId,
    });
    return this.userId;
  }

  async getOrderById(id: number): Promise<Order> {
    const user = await this.findOne(id);
    const products = await this.productsService.findAll();
    console.log(this.configService.get('API_KEY'));
    return {
      date: new Date(),
      user,
      products,
    };
  }
}
