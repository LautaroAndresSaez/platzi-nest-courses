import { CreateCustomerDto } from './../../dtos/customers.dtos';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from 'src/users/entities/customers.entity';
import { Model } from 'mongoose';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  findAll() {
    return this.customerModel.find().exec();
  }

  addCustomer(payload: CreateCustomerDto) {
    const customer = new this.customerModel(payload);
    return customer.save();
  }
}
