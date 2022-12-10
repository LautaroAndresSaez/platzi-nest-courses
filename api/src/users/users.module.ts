import { ProductsModule } from 'src/products/products.module';
import { CustomersController } from './controllers/customers/customers.controller';
import { UsersController } from './controllers/users/users.controller';
import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';

@Module({
  controllers: [UsersController, CustomersController],
  providers: [UsersService],
  imports: [ProductsModule],
})
export class UsersModule {}
