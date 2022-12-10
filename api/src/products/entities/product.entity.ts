import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({
    required: true,
  })
  name: string;
  @Prop({
    required: true,
  })
  description: string;
  @Prop({
    type: Number,
    min: 0,
    required: true,
  })
  price: number;
  @Prop({
    type: Number,
    min: 0,
    required: true,
  })
  stock: number;
  @Prop()
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
