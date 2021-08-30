import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from '../../common/types';

export type UserDocument = User & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class User {
  // TODO
  // @Prop()
  // firstName: string;
  //TODO
  // @Prop()
  // nickName: string;

  @Prop()
  _id: Types.ObjectId;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  watchlist: string[];

  @Prop()
  role: UserRole;

  @Prop()
  currentHashedRefreshToken?: string;

  //TODO
  // @Prop()
  // isActive: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);
