import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../../common/types';

export type CryptoDocument = User & Document;

@Schema()
export class User {

  // TODO
  // @Prop()
  // firstName: string;
  //TODO
  // @Prop()
  // lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  watchlist: string[];

  //TODO
  // @Prop([String])
  // role: UserRole
  //TODO
  // @Prop()
  // isActive: boolean

  @Prop()
  createAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
