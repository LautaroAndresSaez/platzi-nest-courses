import { CreateProductDto, UpdateProductDto } from '../../dtos/products.dtos';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll() {
    return this.productModel.find().exec();
  }

  findOne(id: string) {
    return this.productModel.findById(id).exec();
  }

  create(payload: CreateProductDto) {
    const product = new this.productModel(payload);
    return product.save();
  }

  async update(id: string, payload: UpdateProductDto) {
    const product = await this.productModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`the product with id: ${id} doesn't exist`);
    }
    return product;
  }

  async delete(id: string) {
    await this.productModel.findByIdAndDelete(id);
  }
}
