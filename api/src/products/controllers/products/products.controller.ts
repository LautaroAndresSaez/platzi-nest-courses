import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../../dtos/products.dtos';

import { ProductsService } from '../../services/products/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get('')
  products(@Query() params: FilterProductDto) {
    return this.productsService.findAll(params);
  }

  @Get(':id')
  getOne(@Param('id', MongoIdPipe) id: string) {
    const product = this.productsService.findOne(id);
    if (!product) {
      throw new HttpException("ID doesn't exist", HttpStatus.BAD_REQUEST);
    }
    return product;
  }

  @Post('')
  async create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    const result = this.productsService.update(id, payload);
    if (!result) {
      throw new HttpException("ID doesn't exist", HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id', MongoIdPipe) id: string) {
    await this.productsService.delete(id);
    return 'ok';
  }
}
