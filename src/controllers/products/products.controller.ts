import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { CreateProduct, UpdateProduct } from 'src/dtos/products.dtos';

import { ProductsService } from '../../services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get('')
  products() {
    return this.productsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    const product = this.productsService.findOne(id);
    if (!product) {
      throw new HttpException("ID doesn't exist", HttpStatus.BAD_REQUEST);
    }
    return product;
  }

  @Post('')
  create(@Body() payload: CreateProduct) {
    this.productsService.create(payload);
    return this.productsService.findAll();
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProduct,
  ) {
    const result = this.productsService.update(id, payload);
    if (!result) {
      throw new HttpException("ID doesn't exist", HttpStatus.BAD_REQUEST);
    }
  }
}
