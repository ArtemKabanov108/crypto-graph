import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user-schema';
import { Model, Types } from 'mongoose';
import {
  JwtRefreshToken,
  JwtRefreshDocument,
} from '../schemas/jwt-session-schema';
import { IUserList } from '../../common/interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(JwtRefreshToken.name)
    private readonly jwtModel: Model<JwtRefreshDocument>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    try {
      return this.userModel.findOne({ email: email }).lean().exec();
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async findUser(id: string): Promise<User> {
    try {
      return this.userModel.findById(Types.ObjectId(id)).lean().exec();
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  // TODO not correct method (str. 36 mast will be id)
  async getFavoriteList(id: string): Promise<IUserList> {
    try {
      const { watchlist, _id } = await this.userModel.findOne({ _id: Types.ObjectId(id) }).exec();
      return { watchlist, userId: _id };
    } catch (err) {
      throw new NotFoundException(err, 'The favorite list not found or problems with DB');
    }
    // variant response server with all data user
    // return await this.userModel.findOne({ email: email }).exec();
  }

  async setFavorite(id: string, cryptoFavorite: string): Promise<IUserList> {
    try {
      const { watchlist, _id } = await this.userModel
        .findOneAndUpdate({ _id: Types.ObjectId(id) }, { $push: { watchlist: cryptoFavorite } })
        .exec();
      return { watchlist, userId: _id };
    } catch (err) {
      throw new NotFoundException(err, 'The favorite list not found or problems with DB');
    }
  }

  async deleteFavoriteCrypto(id: string, cryptoFavorite: string) {
    try {
      const { watchlist, _id } = await this.userModel
        .findOneAndUpdate({ _id: Types.ObjectId(id) }, { $remove: { watchlist: cryptoFavorite } })
        .exec();
    } catch (err) {
      throw new NotFoundException(err, 'The favorite list not found or problems with DB');
    }

  }
}
