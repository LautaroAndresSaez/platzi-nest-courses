import {
  CreateOrderDto,
  AddProductsToOrderDto,
} from './../../../products/dtos/order.dto';
import { OrdersService } from './../../services/orders/orders.service';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  getOrdersByCustomer(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.ordersByCustomer(id);
  }

  @Post()
  addOrder(@Body() payload: CreateOrderDto) {
    return this.ordersService.addOrder(payload);
  }

  @Delete(':id/products/:productId')
  removeProduct(
    @Param('id', MongoIdPipe) id: string,
    @Param('productId', MongoIdPipe) praductId: string,
  ) {
    return this.ordersService.removeProduct(id, praductId);
  }

  @Put(':id/products/')
  addProduct(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: AddProductsToOrderDto,
  ) {
    return this.ordersService.addProducts(id, payload.productIds);
  }
}
