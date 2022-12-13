import { AddUser } from './../../dtos/User.dtos';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { Order } from '../../entities/order.entity';
import { User } from '../../entities/user.entity';

import { ProductsService } from '../../../products/services/products/products.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private productsService: ProductsService,
  ) {}

  async findOne(id: string) {
    const user = this.userModel.findById(id);
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async addUser(payload: AddUser) {
    const hashPassword = await bcrypt.hash(payload.password, 10);
    const user = new this.userModel({ ...payload, password: hashPassword });
    const model = await user.save();
    const { password, ...rest } = model.toJSON();
    return rest;
  }
}
