import { Brand, BrandSchema } from './entities/brand.entity';
import { BrandsController } from './controllers/brands/brands.controller';
import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products/products.controller';
import { ProductsService } from './services/products/products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, Product } from './entities/product.entity';
import { BrandsService } from './services/brands/brands.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
  ],
  controllers: [ProductsController, BrandsController],
  providers: [ProductsService, BrandsService],
  exports: [ProductsService],
})
export class ProductsModule {}
