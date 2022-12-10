import { Brand } from './../../entities/brand.entity';
import { CreateBrandDto } from './../../dtos/brand.dtos';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  getBrands() {
    return this.brandModel.find();
  }

  addBrand(payload: CreateBrandDto) {
    const brand = new this.brandModel(payload);
    return brand.save();
  }
}
