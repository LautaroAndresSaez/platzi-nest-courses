import { CreateBrandDto } from './../../dtos/brand.dtos';
import { BrandsService } from './../../services/brands/brands.service';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  getBrands() {
    return this.brandsService.getBrands();
  }

  @Post()
  addBrand(@Body() payload: CreateBrandDto) {
    return this.brandsService.addBrand(payload);
  }
}
