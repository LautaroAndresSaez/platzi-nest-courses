import { Product } from 'src/products/entities/product.entity';
import {
  CreateOrderDto,
  UpdateOrderDto,
} from './../../../products/dtos/order.dto';
import { Order } from './../../entities/order.entity';
import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  private referencesKeys = ['products', 'customer'];
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  findAll() {
    return this.orderModel.find().populate(this.referencesKeys).exec();
  }

  addOrder(payload: CreateOrderDto) {
    const order = new this.orderModel(payload);
    return order.save();
  }

  ordersByCustomer(id: string) {
    return this.orderModel
      .find()
      .where({
        customer: id,
      })
      .populate(this.referencesKeys)
      .exec();
  }

  updateOrder(id: string, payload: UpdateOrderDto) {
    return this.orderModel.findByIdAndUpdate(id, { $set: payload });
  }

  async removeProduct(id: string, productId: string) {
    const order = await this.orderModel.findById(id);
    order.products.pull(productId);
    return order.save();
  }

  async addProducts(id: string, productIds: string[]) {
    const order = await this.orderModel.findById(id);
    order.products.push(...productIds);
    return order.save;
  }
}
