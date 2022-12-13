import { ProductsModule } from 'src/products/products.module';
import { UsersController } from './controllers/users/users.controller';
import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { CustomersService } from './services/customers/customers.service';
import { CustomersController } from './controllers/customers/customers.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { OrdersService } from './services/orders/orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './entities/customers.entity';
import { User, UserSchema } from './entities/user.entity';
import { Order, OrderSchema } from './entities/order.entity';

@Module({
  controllers: [UsersController, CustomersController, OrdersController],
  providers: [UsersService, CustomersService, OrdersService],
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: User.name, schema: UserSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
