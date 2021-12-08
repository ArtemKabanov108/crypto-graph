import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from '../../common/types';
import { IsJWT, IsMongoId } from 'class-validator';
import { User } from './user-schema';

export type JwtRefreshDocument = JwtRefreshToken & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class JwtRefreshToken {
  @Prop({ type: Types.ObjectId, ref: User.name })
  @IsMongoId()
  user: Types.ObjectId;

  @Prop()
  email: string;

  @Prop()
  @IsJWT()
  refreshToken: string;

  @Prop()
  role: UserRole;
  //TODO
  // @Prop()
  // isActive: boolean;
}

export const JwtSchema = SchemaFactory.createForClass(JwtRefreshToken);
