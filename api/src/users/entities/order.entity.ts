import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';
import { Customer } from './customers.entity';
import { User } from './user.entity';

@Schema()
export class Order extends Document {
  @Prop({ type: Date })
  date: Date;
  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true })
  customer: Types.ObjectId;
  @Prop({ type: [Types.ObjectId], ref: Product.name, required: true })
  products: Types.Array<Types.ObjectId>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
