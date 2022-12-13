import { Public } from './../../../auth/decorators/public.decorator';
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
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/auth/guards/api-key/api-key.guard';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../../dtos/products.dtos';

import { ProductsService } from '../../services/products/products.service';

@ApiTags('products')
@UseGuards(ApiKeyGuard)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('')
  @Public()
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
