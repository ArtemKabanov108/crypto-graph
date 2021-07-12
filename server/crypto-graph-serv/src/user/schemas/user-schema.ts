import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {UserRole} from "../../common/types";

export type CryptoDocument = User & Document;

@Schema()
export class User {

    // @Prop()
    // firstName: string;
    //
    // @Prop()
    // lastName: string;

    @Prop()
    email: string;

    @Prop()
    password: string


    @Prop()
    watchlist: string[];
    //
    // @Prop()
    // country: string;
    //
    // @Prop([String])
    // role: UserRole
    //
    // @Prop()
    // isActive: boolean

    @Prop()
    createAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User);