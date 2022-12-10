import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products/products.controller';
import { ProductsService } from './services/products/products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, Product } from './entities/product.entity';
import { BrandService } from './service/brand/brand.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, BrandService],
  exports: [ProductsService],
})
export class ProductsModule {}
