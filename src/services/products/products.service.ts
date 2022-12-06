import { CreateProduct, UpdateProduct } from './../../dtos/products.dtos';
import { Injectable } from '@nestjs/common';
import { Product } from 'src/types/Product';

type ID = number;

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'remera',
      description: 'daeuao',
      price: 25,
      stock: 5,
      image: 'eunshaoheu',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: ID) {
    return this.products.find((item) => item.id === id);
  }

  create(payload: CreateProduct) {
    this.counterId++;
    this.products.push({
      id: this.counterId,
      ...payload,
    });
  }

  update(id: ID, payload: UpdateProduct) {
    let isProductExist = false;
    this.products = this.products.map((item) => {
      if (item.id === id) {
        isProductExist = true;
        return {
          ...item,
          ...payload,
        };
      }
      return item;
    });
    return isProductExist;
  }

  delete(id: ID) {
    this.products = this.products.filter((item) => item.id != id);
  }
}
