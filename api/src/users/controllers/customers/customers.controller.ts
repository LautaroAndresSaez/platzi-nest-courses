import { CreateCustomerDto } from './../../dtos/customers.dtos';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomersService } from 'src/users/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  getCustomers() {
    return this.customersService.findAll();
  }

  @Post()
  addCustomer(@Body() payload: CreateCustomerDto) {
    console.log(payload);
    return this.customersService.addCustomer(payload);
  }
}
