import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Brand } from './brand.entity';

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
    index: true,
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

  @Prop(
    raw({
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
    }),
  )
  category: Record<string, any>;

  @Prop({
    type: Types.ObjectId,
    ref: Brand.name,
  })
  brand: Brand | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: 1, stock: -1 });
